'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function NotificationHandler() {
  const router = useRouter();

  useEffect(() => {
    // Service Workerからのメッセージを受信
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', function(event) {
        console.log('Service Workerからメッセージ受信:', event.data);
        
        if (event.data && event.data.type === 'NOTIFICATION_NAVIGATE') {
          const targetUrl = event.data.url;
          console.log('通知からの遷移要求:', targetUrl);
          
          // 現在のページが異なる場合のみ遷移
          if (window.location.pathname !== targetUrl) {
            // Next.jsのルーターを使用して遷移
            router.push(targetUrl);
          }
        }
      });
    }
  }, [router]);

  return null; // このコンポーネントはUIを表示しない
}
