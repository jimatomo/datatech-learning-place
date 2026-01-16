/// <reference lib="webworker" />

import { CacheableResponsePlugin, CacheFirst, ExpirationPlugin, NetworkFirst, Serwist, StaleWhileRevalidate } from "serwist";

declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: Array<{ url: string; revision?: string | null }>;
};

/**
 * iOS Safari(PWA) は Service Worker の install/precache が重いと
 * activated まで時間がかかり、`navigator.serviceWorker.ready` や
 * 「SW ready待ち」のUIがタイムアウトしやすい。
 *
 * そのため precache 対象は「PWA成立に必要な最小限」に絞り、
 * それ以外（大量の Next chunk 等）は runtimeCaching に任せる。
 *
 * また、Safari PWA では importScripts がブロックして installing 状態のまま
 * 進まないことがあるため、push通知ロジックは直接このファイルに記述する。
 */
const PRECACHE_ALLOWLIST: RegExp[] = [
  // App entry
  /^\/$/,
  // Manifest (Next が /manifest.webmanifest として配信)
  /^\/manifest\.webmanifest$/,
  // Icons / meta
  /^\/favicon\.ico$/,
  /^\/browserconfig\.xml$/,
  /^\/icon-.*\.png$/,
  /^\/icon-square\.png$/,
  /^\/logo\.png$/,
  // Keep lightweight Next static metadata (optional but helps)
  /^\/_next\/static\/[^/]+\/_buildManifest\.js$/,
  /^\/_next\/static\/[^/]+\/_ssgManifest\.js$/,
  /^\/_next\/static\/css\/.*\.css$/,
];

const shouldPrecache = (url: string) => PRECACHE_ALLOWLIST.some((re) => re.test(url));

// ============================================
// Push通知/バッジ/通知履歴ロジック
// （旧 custom-sw.js の内容を統合）
// ============================================

// 未読通知数を管理するためのキー
const UNREAD_COUNT_KEY = 'unreadNotificationCount';

// 通知履歴のIndexedDB操作
const HISTORY_DB_NAME = 'NotificationHistoryDB';
const HISTORY_DB_VERSION = 1;
const HISTORY_STORE_NAME = 'notifications';

// IndexedDBを開く
function openHistoryDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(HISTORY_DB_NAME, HISTORY_DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(HISTORY_STORE_NAME)) {
        const store = db.createObjectStore(HISTORY_STORE_NAME, { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

// 通知履歴をIndexedDBに保存
async function saveNotificationToHistory(notification: {
  id: string;
  title: string;
  body: string;
  timestamp: number;
  read: boolean;
  url?: string;
  quizId?: string;
  icon: string;
}) {
  try {
    const db = await openHistoryDB();
    const transaction = db.transaction([HISTORY_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(HISTORY_STORE_NAME);
    await new Promise<void>((resolve, reject) => {
      const request = store.put(notification);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    console.log('通知履歴を保存しました:', notification.title);
  } catch (error) {
    console.error('通知履歴の保存に失敗:', error);
  }
}

// 通知を既読にマークする関数
async function markNotificationAsRead(notificationId: string) {
  try {
    const db = await openHistoryDB();
    const transaction = db.transaction([HISTORY_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(HISTORY_STORE_NAME);
    
    const notification = await new Promise<{ id: string; read: boolean } | undefined>((resolve, reject) => {
      const request = store.get(notificationId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    if (notification) {
      const updatedNotification = { ...notification, read: true };
      await new Promise<void>((resolve, reject) => {
        const request = store.put(updatedNotification);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
      console.log('通知を既読にマークしました:', notificationId);
    }
  } catch (error) {
    console.error('通知の既読マーク処理に失敗:', error);
  }
}

// 未読通知数を取得
async function getUnreadCount(): Promise<number> {
  try {
    const cache = await caches.open('badge-cache');
    const response = await cache.match(UNREAD_COUNT_KEY);
    if (response) {
      const text = await response.text();
      return parseInt(text) || 0;
    }
    return 0;
  } catch (error) {
    console.warn('未読通知数の取得に失敗:', error);
    return 0;
  }
}

// 未読通知数を保存
async function setUnreadCount(count: number) {
  try {
    const cache = await caches.open('badge-cache');
    await cache.put(UNREAD_COUNT_KEY, new Response(count.toString()));
  } catch (error) {
    console.warn('未読通知数の保存に失敗:', error);
  }
}

// バッジを更新
async function updateBadge(count: number) {
  // Badge APIの対応確認
  if ('setAppBadge' in navigator) {
    try {
      if (count > 0) {
        await (navigator as Navigator & { setAppBadge: (n: number) => Promise<void> }).setAppBadge(count);
        console.log('バッジを更新しました:', count);
      } else {
        await (navigator as Navigator & { clearAppBadge: () => Promise<void> }).clearAppBadge();
        console.log('バッジをクリアしました');
      }
    } catch (error) {
      console.warn('バッジの更新に失敗:', error);
    }
  }
  
  // クライアントにバッジ更新を通知
  try {
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'BADGE_UPDATE',
        count: count
      });
    });
  } catch (error) {
    console.warn('クライアントへのバッジ更新通知に失敗:', error);
  }
}

// iOS PWA対応の通知クリック処理関数
async function handleNotificationClick(targetUrl: string) {
  try {
    const clientList = await self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    });
    
    console.log('アクティブクライアント数:', clientList.length);
    
    // iOS Safari PWA対策：アプリが起動中でも常に新しいウィンドウで開く
    console.log('iOS PWA対策で新しいウィンドウを開きます:', targetUrl);
    await self.clients.openWindow(targetUrl);
    
  } catch (error) {
    console.error('通知処理エラー:', error);
    try {
      console.log('フォールバック：新しいウィンドウを開きます');
      await self.clients.openWindow(targetUrl);
    } catch (fallbackError) {
      console.error('フォールバック処理も失敗:', fallbackError);
    }
  }
}

// プッシュイベントを受信した時の処理
self.addEventListener('push', function(event: PushEvent) {
  console.log('プッシュ通知を受信しました:', event);
  
  if (event.data) {
    try {
      const data = event.data.json() as {
        title: string;
        body: string;
        icon?: string;
        badge?: string;
        data?: { url?: string; quizId?: string };
      };
      console.log('通知データ:', data);
      
      // 通知履歴ID を生成
      const notificationHistoryId = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Service Worker の NotificationOptions は DOM の型定義より広い
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options: any = {
        body: data.body,
        icon: data.icon || '/icon-square.png',
        badge: data.badge || '/icon-square.png',
        data: {
          ...(data.data || {}),
          _notificationHistoryId: notificationHistoryId
        },
        vibrate: [100, 50, 100],
        requireInteraction: true,
        actions: [
          {
            action: 'open',
            title: 'クイズを見る',
          },
          {
            action: 'close',
            title: '閉じる'
          }
        ]
      };

      event.waitUntil(
        Promise.all([
          // 通知を表示
          self.registration.showNotification(data.title, options),
          // 未読通知数を増加してバッジを更新
          (async () => {
            const currentCount = await getUnreadCount();
            const newCount = currentCount + 1;
            await setUnreadCount(newCount);
            await updateBadge(newCount);
          })(),
          // 通知履歴をIndexedDBに保存
          saveNotificationToHistory({
            id: notificationHistoryId,
            title: data.title,
            body: data.body,
            timestamp: Date.now(),
            read: false,
            url: data.data?.url,
            quizId: data.data?.quizId,
            icon: data.icon || '/icon-square.png'
          })
        ])
      );
    } catch (error) {
      console.error('プッシュ通知データの解析エラー:', error);
      
      // エラーが発生した場合のフォールバック通知
      const fallbackNotificationId = `fallback_notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      event.waitUntil(
        Promise.all([
          self.registration.showNotification('新しいクイズが投稿されました', {
            body: 'DTLP - Datatech Learning Place',
            icon: '/icon-square.png',
            badge: '/icon-square.png',
            data: {
              _notificationHistoryId: fallbackNotificationId
            }
          }),
          // フォールバック時もバッジを更新
          (async () => {
            const currentCount = await getUnreadCount();
            const newCount = currentCount + 1;
            await setUnreadCount(newCount);
            await updateBadge(newCount);
          })(),
          // フォールバック通知も履歴に保存
          saveNotificationToHistory({
            id: fallbackNotificationId,
            title: '新しいクイズが投稿されました',
            body: 'DTLP - Datatech Learning Place',
            timestamp: Date.now(),
            read: false,
            icon: '/icon-square.png'
          })
        ])
      );
    }
  }
});

// 通知がクリックされた時の処理
self.addEventListener('notificationclick', function(event: NotificationEvent) {
  console.log('通知がクリックされました:', event);
  
  event.notification.close();
  
  const action = event.action;
  const data = (event.notification.data || {}) as { url?: string; quizId?: string; _notificationHistoryId?: string };
  
  if (action === 'close') {
    // 閉じるボタンがクリックされた場合もバッジを減少し、既読にマーク
    event.waitUntil(
      Promise.all([
        (async () => {
          const currentCount = await getUnreadCount();
          const newCount = Math.max(0, currentCount - 1);
          await setUnreadCount(newCount);
          await updateBadge(newCount);
        })(),
        // 通知履歴を既読にマーク
        (async () => {
          if (data._notificationHistoryId) {
            await markNotificationAsRead(data._notificationHistoryId);
          }
        })()
      ])
    );
    return;
  }
  
  // デフォルトアクションまたは'open'アクション
  let targetUrl = '/';
  
  if (data.url) {
    targetUrl = data.url;
  } else if (data.quizId) {
    targetUrl = `/quiz/${data.quizId}`;
  }
  
  event.waitUntil(
    Promise.all([
      handleNotificationClick(targetUrl),
      // 通知をクリックした場合もバッジを減少し、既読にマーク
      (async () => {
        const currentCount = await getUnreadCount();
        const newCount = Math.max(0, currentCount - 1);
        await setUnreadCount(newCount);
        await updateBadge(newCount);
      })(),
      // 通知履歴を既読にマーク
      (async () => {
        if (data._notificationHistoryId) {
          await markNotificationAsRead(data._notificationHistoryId);
        }
      })()
    ])
  );
});

// 通知が閉じられた時の処理（スワイプで削除など）
self.addEventListener('notificationclose', function(event: NotificationEvent) {
  console.log('通知が閉じられました（削除）:', event);
  
  const data = (event.notification.data || {}) as { _notificationHistoryId?: string };
  
  // 通知が無視/削除された場合もバッジを減少し、既読にマーク
  event.waitUntil(
    Promise.all([
      (async () => {
        const currentCount = await getUnreadCount();
        const newCount = Math.max(0, currentCount - 1);
        await setUnreadCount(newCount);
        await updateBadge(newCount);
        console.log('通知削除によりバッジを減少:', newCount);
      })(),
      // 通知履歴を既読にマーク
      (async () => {
        if (data._notificationHistoryId) {
          await markNotificationAsRead(data._notificationHistoryId);
          console.log('通知削除により既読にマーク:', data._notificationHistoryId);
        }
      })()
    ])
  );
});

// メッセージを受信した時の処理（クライアントからの操作）
self.addEventListener('message', function(event: ExtendableMessageEvent) {
  console.log('Service Worker がメッセージを受信:', event.data);
  
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  
  // バッジ関連の操作
  if (event.data && event.data.action === 'getBadgeCount') {
    event.waitUntil(
      (async () => {
        try {
          const count = await getUnreadCount();
          // MessageChannelを使ってレスポンスを送信
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ badgeCount: count });
          }
        } catch (error) {
          console.warn('バッジ数取得に失敗:', error);
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ badgeCount: 0 });
          }
        }
      })()
    );
  }
  
  if (event.data && event.data.action === 'clearBadge') {
    event.waitUntil(
      (async () => {
        await setUnreadCount(0);
        await updateBadge(0);
        console.log('クライアントからの要求でバッジをクリアしました');
      })()
    );
  }
});

// ============================================
// Serwist PWA キャッシュ設定
// ============================================

const serwist = new Serwist({
  precacheEntries: (self.__SW_MANIFEST || []).filter((entry) => shouldPrecache(entry.url)),
  precacheOptions: {
    // next-pwa の `ignoreURLParametersMatching: []` 相当
    ignoreURLParametersMatching: [],
    cleanupOutdatedCaches: true,
  },
  skipWaiting: true,
  clientsClaim: true,
  // Safari PWA では importScripts がブロックすることがあるため、
  // push通知ロジックは上記に直接記述
  runtimeCaching: [
    {
      matcher: "/",
      handler: new NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            // next-pwa 生成SWの "opaqueredirect" 対応を踏襲
            cacheWillUpdate: async ({ response }: { response?: Response }) => {
              if (response && response.type === "opaqueredirect") {
                return new Response(response.body, {
                  status: 200,
                  statusText: "OK",
                  headers: response.headers,
                });
              }
              return response;
            },
          },
        ],
      }),
    },
    {
      matcher: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: new CacheFirst({
        cacheName: "google-fonts",
        plugins: [new ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 })],
      }),
    },
    {
      matcher: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: new CacheFirst({
        cacheName: "google-fonts-static",
        plugins: [new ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 })],
      }),
    },
    {
      matcher: /\.(?:eot|otf|ttc|ttf|woff|woff2|font\.css)$/i,
      handler: new StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [new ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 7 * 24 * 60 * 60 })],
      }),
    },
    {
      matcher: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: new StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [new ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 24 * 60 * 60 })],
      }),
    },
    {
      matcher: /\/_next\/image\?url=.+$/i,
      handler: new StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [new ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 24 * 60 * 60 })],
      }),
    },
    {
      matcher: /\.(?:js)$/i,
      handler: new StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 })],
      }),
    },
    {
      matcher: /\.(?:css|less)$/i,
      handler: new StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 })],
      }),
    },
    {
      matcher: /^https:\/\/.*/i,
      handler: new NetworkFirst({
        cacheName: "offlineCache",
        plugins: [
          new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 }),
          new CacheableResponsePlugin({ statuses: [0, 200] }),
        ],
      }),
    },
  ],
});

serwist.addEventListeners();


