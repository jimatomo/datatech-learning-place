#!/bin/bash -e

[ ! -d '/tmp/cache' ] && mkdir -p /tmp/cache

# サーバーを起動
exec node server.js &

# サーバーが起動するまで少し待機
sleep 60

# 環境変数を読み込み
echo "🔧 環境変数を読み込み中..."
source .env.production.local

# 通知スケジューラーを初期化（API経由）
echo "🚀 通知スケジューラーを初期化中..."
if [ -n "$INTERNAL_API_KEY" ]; then
  response=$(curl -s -X POST ${AUTH0_BASE_URL}api/init-scheduler \
    -H "Content-Type: application/json" \
    -H "X-Internal-Key: $INTERNAL_API_KEY")
  echo "📋 レスポンス: $response"
else
  echo "⚠️  INTERNAL_API_KEYが設定されていないため、通知スケジューラーの初期化をスキップします"
fi

# フォアグラウンドでサーバーを維持
wait
