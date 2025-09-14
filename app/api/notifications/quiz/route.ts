import { NextResponse } from "next/server"
import { processDailyQuizNotifications } from '@/app/notifications/lib/quiz-notification-sender'
import { headers } from 'next/headers'
import { randomBytes } from 'crypto'

// サーバー起動時に自動生成されるAPIキー
// 環境変数で上書き可能（本番環境での固定化用）
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY || randomBytes(32).toString('hex')

// セキュリティチェック関数
function validateInternalRequest(request: Request): { isValid: boolean; error?: string } {
  // 1. APIキー認証 - EventBridge Connectionの両方のヘッダー形式に対応
  const headersList = headers()
  
  // デバッグ用: リクエストヘッダーをログ出力
  console.log('🔍 リクエスト受信 - デバッグ情報:')
  console.log('  - HTTP Method:', request.method)
  console.log('  - User-Agent:', headersList.get('user-agent'))
  console.log('  - Content-Type:', headersList.get('content-type'))
  console.log('  - X-Internal-Key:', headersList.get('x-internal-key') ? '***設定済み***' : '未設定')
  console.log('  - Authorization:', headersList.get('authorization') ? '***設定済み***' : '未設定')
  
  // EventBridge ConnectionでAPI_KEY認証を使用した場合の両方のヘッダー形式に対応
  const internalKey = 
    headersList.get('x-internal-key') || 
    headersList.get('authorization')?.replace('X-Internal-Key ', '') ||
    headersList.get('authorization')

  console.log('  - 抽出されたAPI Key:', internalKey ? '***設定済み***' : '未設定')

  if (!internalKey || internalKey !== INTERNAL_API_KEY) {
    console.log('❌ API Key認証失敗')
    return { isValid: false, error: '無効な内部APIキー' }
  }

  // 2. リクエストメソッド制限
  if (request.method !== 'POST') {
    console.log('❌ HTTP Method認証失敗:', request.method)
    return { isValid: false, error: '許可されていないHTTPメソッド' }
  }

  console.log('✅ 認証成功')
  return { isValid: true }
}

export async function POST(request: Request) {
  console.log('🚀 /api/notifications/quiz エンドポイントにPOSTリクエスト受信')
  
  try {
    // セキュリティチェック
    const securityCheck = validateInternalRequest(request)
    if (!securityCheck.isValid) {
      console.warn(`セキュリティ違反の試行: ${securityCheck.error}`)
      return NextResponse.json(
        {
          success: false,
          error: 'アクセスが拒否されました',
          details: securityCheck.error
        },
        { status: 403 }
      )
    }

    // console.log('内部API呼び出しを検証: 有効なAPIキーでリクエスト')

    // 主な処理をライブラリ関数に委譲
    const result = await processDailyQuizNotifications()

    // デバッグようにログを出す
    // console.log('日次クイズ通知スケジューリング結果:', result)
    
    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "日次クイズ通知のスケジューリングに失敗しました",
        },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error("日次クイズ通知スケジューリングエラー:", error)
    
    return NextResponse.json(
      {
        success: false,
        error: "日次クイズ通知のスケジューリングに失敗しました",
      },
      { status: 500 }
    )
  }
}

// 他のHTTPメソッドを拒否
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}