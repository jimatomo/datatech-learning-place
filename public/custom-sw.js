// カスタムService Worker for プッシュ通知

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
        self.registration.showNotification(data.title, options)
      );
    } catch (error) {
      console.error('プッシュ通知データの解析エラー:', error);
      
      // エラーが発生した場合のフォールバック通知
      event.waitUntil(
        self.registration.showNotification('新しいクイズが投稿されました', {
          body: 'DTLP - Datatech Learning Place',
          icon: '/icon-192x192.png',
          badge: '/icon-192x192.png'
        })
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
    handleNotificationClick(targetUrl)
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
    
    // PWAクライアントを探す
    let pwaClient = null;
    for (const client of clientList) {
      if (client.url.includes(self.location.origin)) {
        pwaClient = client;
        break;
      }
    }
    
    if (pwaClient) {
      console.log('既存PWAクライアント使用:', pwaClient.url);
      
      // フォーカス後にナビゲーション
      await pwaClient.focus();
      
      // iOS対策：複数回試行
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          await new Promise(resolve => setTimeout(resolve, 100 * (attempt + 1)));
          
          pwaClient.postMessage({
            type: 'NOTIFICATION_NAVIGATE',
            url: targetUrl,
            timestamp: Date.now(),
            attempt: attempt + 1
          });
          
          break; // 成功したらループを抜ける
        } catch (error) {
          console.warn(`ナビゲーション試行 ${attempt + 1} 失敗:`, error);
        }
      }
    } else {
      console.log('新しいウィンドウを開きます');
      await clients.openWindow(targetUrl);
    }
  } catch (error) {
    console.error('通知処理エラー:', error);
    // 最後の手段として新しいウィンドウを開く
    try {
      await clients.openWindow(targetUrl);
    } catch (fallbackError) {
      console.error('フォールバック処理も失敗:', fallbackError);
    }
  }
}

// 通知が閉じられた時の処理
self.addEventListener('notificationclose', function(event) {
  console.log('通知が閉じられました:', event);
  
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
  event.waitUntil(self.clients.claim());
});

// メッセージを受信した時の処理（クライアントからの操作）
self.addEventListener('message', function(event) {
  console.log('Service Worker がメッセージを受信:', event.data);
  
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

