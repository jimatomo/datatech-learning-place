// カスタムService Worker for プッシュ通知

// 未読通知数を管理するためのキー
const UNREAD_COUNT_KEY = 'unreadNotificationCount';

// 通知履歴のIndexedDB操作
const HISTORY_DB_NAME = 'NotificationHistoryDB';
const HISTORY_DB_VERSION = 1;
const HISTORY_STORE_NAME = 'notifications';

// 通知履歴をIndexedDBに保存
async function saveNotificationToHistory(notification) {
  try {
    const db = await openHistoryDB();
    const transaction = db.transaction([HISTORY_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(HISTORY_STORE_NAME);
    await store.put(notification);
    console.log('通知履歴を保存しました:', notification.title);
  } catch (error) {
    console.error('通知履歴の保存に失敗:', error);
  }
}

// IndexedDBを開く
function openHistoryDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(HISTORY_DB_NAME, HISTORY_DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(HISTORY_STORE_NAME)) {
        const store = db.createObjectStore(HISTORY_STORE_NAME, { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

// 未読通知数を取得
async function getUnreadCount() {
  try {
    const count = await self.caches.open('badge-cache').then(cache => 
      cache.match(UNREAD_COUNT_KEY).then(response => 
        response ? response.text().then(text => parseInt(text) || 0) : 0
      )
    );
    return count;
  } catch (error) {
    console.warn('未読通知数の取得に失敗:', error);
    return 0;
  }
}

// 未読通知数を保存
async function setUnreadCount(count) {
  try {
    const cache = await self.caches.open('badge-cache');
    await cache.put(UNREAD_COUNT_KEY, new Response(count.toString()));
  } catch (error) {
    console.warn('未読通知数の保存に失敗:', error);
  }
}

// バッジを更新
async function updateBadge(count) {
  // Badge APIの対応確認
  if (navigator.setAppBadge) {
    try {
      if (count > 0) {
        await navigator.setAppBadge(count);
        console.log('バッジを更新しました:', count);
      } else {
        await navigator.clearAppBadge();
        console.log('バッジをクリアしました');
      }
    } catch (error) {
      console.warn('バッジの更新に失敗:', error);
    }
  }
}

// プッシュイベントを受信した時の処理
self.addEventListener('push', function(event) {
  console.log('プッシュ通知を受信しました:', event);
  
  if (event.data) {
    try {
      const data = event.data.json();
      console.log('通知データ:', data);
      
      const options = {
        body: data.body,
        icon: data.icon || '/icon-192x192.png',
        badge: data.badge || '/icon-192x192.png',
        data: data.data || {},
        vibrate: [100, 50, 100],
        requireInteraction: true,
        actions: [
          {
            action: 'open',
            title: 'クイズを見る',
            icon: '/icon-192x192.png'
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
            id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            title: data.title,
            body: data.body,
            timestamp: Date.now(),
            read: false,
            url: data.data?.url,
            quizId: data.data?.quizId,
            icon: data.icon || '/icon-192x192.png'
          })
        ])
      );
    } catch (error) {
      console.error('プッシュ通知データの解析エラー:', error);
      
      // エラーが発生した場合のフォールバック通知
      event.waitUntil(
        Promise.all([
          self.registration.showNotification('新しいクイズが投稿されました', {
            body: 'DTLP - Datatech Learning Place',
            icon: '/icon-192x192.png',
            badge: '/icon-192x192.png'
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
            id: `fallback_notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            title: '新しいクイズが投稿されました',
            body: 'DTLP - Datatech Learning Place',
            timestamp: Date.now(),
            read: false,
            icon: '/icon-192x192.png'
          })
        ])
      );
    }
  }
});

// 通知がクリックされた時の処理
self.addEventListener('notificationclick', function(event) {
  console.log('通知がクリックされました:', event);
  
  event.notification.close();
  
  const action = event.action;
  const data = event.notification.data || {};
  
  if (action === 'close') {
    // 閉じるボタンがクリックされた場合もバッジを減少
    event.waitUntil(
      (async () => {
        const currentCount = await getUnreadCount();
        const newCount = Math.max(0, currentCount - 1);
        await setUnreadCount(newCount);
        await updateBadge(newCount);
      })()
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
      // 通知をクリックした場合もバッジを減少
      (async () => {
        const currentCount = await getUnreadCount();
        const newCount = Math.max(0, currentCount - 1);
        await setUnreadCount(newCount);
        await updateBadge(newCount);
      })()
    ])
  );
});

// iOS PWA対応の通知クリック処理関数
async function handleNotificationClick(targetUrl) {
  try {
    const clientList = await clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    });
    
    console.log('アクティブクライアント数:', clientList.length);
    
    // iOS Safari PWA対策：アプリが起動中でも常に新しいウィンドウで開く
    // これにより、通知からの遷移が確実に動作する
    console.log('iOS PWA対策で新しいウィンドウを開きます:', targetUrl);
    await clients.openWindow(targetUrl);
    
  } catch (error) {
    console.error('通知処理エラー:', error);
    // フォールバック処理
    try {
      console.log('フォールバック：新しいウィンドウを開きます');
      await clients.openWindow(targetUrl);
    } catch (fallbackError) {
      console.error('フォールバック処理も失敗:', fallbackError);
    }
  }
}

// 通知が閉じられた時の処理（スワイプで削除など）
self.addEventListener('notificationclose', function(event) {
  console.log('通知が閉じられました（削除）:', event);
  
  // 通知が無視/削除された場合もバッジを減少
  event.waitUntil(
    (async () => {
      const currentCount = await getUnreadCount();
      const newCount = Math.max(0, currentCount - 1);
      await setUnreadCount(newCount);
      await updateBadge(newCount);
      console.log('通知削除によりバッジを減少:', newCount);
    })()
  );
  
  // 必要に応じて分析データを送信
  // analytics.track('notification_closed', event.notification.data);
});

// Service Workerがインストールされた時の処理
self.addEventListener('install', function() {
  console.log('Custom Service Worker がインストールされました');
  self.skipWaiting();
});

// Service Workerがアクティブになった時の処理
self.addEventListener('activate', function(event) {
  console.log('Custom Service Worker がアクティブになりました');
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // アクティブ時にバッジ状態を初期化
      (async () => {
        try {
          const count = await getUnreadCount();
          await updateBadge(count);
          console.log('バッジ状態を初期化しました:', count);
        } catch (error) {
          console.warn('バッジ初期化に失敗:', error);
        }
      })()
    ])
  );
});

// メッセージを受信した時の処理（クライアントからの操作）
self.addEventListener('message', function(event) {
  console.log('Service Worker がメッセージを受信:', event.data);
  
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  
  // バッジ関連の操作
  if (event.data && event.data.action === 'clearBadge') {
    event.waitUntil(
      (async () => {
        await setUnreadCount(0);
        await updateBadge(0);
        console.log('クライアントからの要求でバッジをクリアしました');
      })()
    );
  }
  
  if (event.data && event.data.action === 'getBadgeCount') {
    event.waitUntil(
      (async () => {
        const count = await getUnreadCount();
        event.ports[0]?.postMessage({ badgeCount: count });
      })()
    );
  }
});

// アプリがフォーカスされた時にバッジをクリア（visibilitychange対応）
self.addEventListener('focus', function() {
  console.log('アプリがフォーカスされました - バッジをクリア');
  setUnreadCount(0).then(() => updateBadge(0));
});

// クライアントがアクティブになった時の処理
self.addEventListener('windowclient', function() {
  console.log('クライアントがアクティブになりました - バッジをクリア');
  setUnreadCount(0).then(() => updateBadge(0));
});

