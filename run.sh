#!/bin/bash -x

[ ! -d '/tmp/cache' ] && mkdir -p /tmp/cache

# 通知スケジューラーを初期化
echo "🚀 通知スケジューラーを初期化中..."
node -e "
import('./app/global/notifications/lib/notification-scheduler.js').then(module => {
  new module.NotificationScheduler();
  console.log('✅ 通知スケジューラーが初期化されました');
}).catch(error => {
  console.error('❌ 通知スケジューラーの初期化に失敗しました:', error);
});
"

exec node server.js
