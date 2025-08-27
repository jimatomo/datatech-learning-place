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
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(function(clientList) {
      // 既に開いているタブがあるかチェック
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus().then(() => {
            if ('navigate' in client) {
              return client.navigate(targetUrl);
            } else {
              return client.postMessage({
                action: 'navigate',
                url: targetUrl
              });
            }
          });
        }
      }
      
      // 開いているタブがない場合は新しいウィンドウを開く
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

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

