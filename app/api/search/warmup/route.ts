import { NextResponse } from "next/server"
import { headers } from 'next/headers'
import { randomBytes } from 'crypto'
import { getSearchClient } from '@/lib/search/orama-client'
import { getEmbeddingPipeline } from '@/lib/search/embedder'
import { serverWarmState, isFullyWarmed } from '@/lib/search/warm-state'

// サーバー起動時に自動生成されるAPIキー
// 環境変数で上書き可能（本番環境での固定化用）
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY || randomBytes(32).toString('hex')

// セキュリティチェック関数
async function validateInternalRequest(request: Request): Promise<{ isValid: boolean; error?: string }> {
  // 1. APIキー認証 - EventBridge Connectionの両方のヘッダー形式に対応
  const headersList = await headers()
  
  // EventBridge ConnectionでAPI_KEY認証を使用した場合の両方のヘッダー形式に対応
  const internalKey = 
    headersList.get('x-internal-key') || 
    headersList.get('authorization')?.replace('X-Internal-Key ', '') ||
    headersList.get('authorization')

  if (!internalKey || internalKey !== INTERNAL_API_KEY) {
    return { isValid: false, error: '無効な内部APIキー' }
  }

  // 2. リクエストメソッド制限
  if (request.method !== 'POST') {
    return { isValid: false, error: '許可されていないHTTPメソッド' }
  }

  return { isValid: true }
}

/**
 * warm up処理をバックグラウンドで実行する
 * エラーはログに記録するが、呼び出し元には影響しない
 */
function executeWarmupInBackground(): void {
  // 既にwarm up済みの場合は何もしない
  if (isFullyWarmed()) {
    return
  }

  // バックグラウンドでwarm up処理を実行（awaitしない）
  const tasks: Promise<unknown>[] = []

  if (!serverWarmState.searchClient) {
    tasks.push(
      getSearchClient()
        .then(() => {
          serverWarmState.searchClient = true
          console.log('Search client warmed up successfully')
        })
        .catch((error) => {
          console.error('Search client warmup failed:', error)
        })
    )
  }

  if (!serverWarmState.embedding) {
    tasks.push(
      getEmbeddingPipeline()
        .then(() => {
          serverWarmState.embedding = true
          console.log('Embedding pipeline warmed up successfully')
        })
        .catch((error) => {
          // 失敗しても検索自体は後でリトライできるため握りつぶす
          console.warn('Embedding warmup failed:', error)
        })
    )
  }

  if (tasks.length > 0) {
    Promise.all(tasks)
      .then(() => {
        console.log('Search warmup completed:', { ...serverWarmState })
      })
      .catch((error) => {
        console.error('Search warmup error:', error)
      })
  }
}

export async function POST(request: Request) {
  try {
    // セキュリティチェック
    const securityCheck = await validateInternalRequest(request)
    if (!securityCheck.isValid) {
      console.warn(`Search warmup API セキュリティ違反の試行: ${securityCheck.error}`)
      return NextResponse.json(
        {
          success: false,
          error: 'アクセスが拒否されました',
          details: securityCheck.error
        },
        { status: 403 }
      )
    }

    // 既にwarm up済みの場合は即座にレスポンス
    if (isFullyWarmed()) {
      return NextResponse.json({
        success: true,
        skipped: true,
        warmed: { ...serverWarmState },
        message: '既にwarm up済みです',
      })
    }

    // warm up処理をバックグラウンドで開始（非同期）
    executeWarmupInBackground()

    // 即座に202 Acceptedを返す（処理はバックグラウンドで継続）
    return NextResponse.json(
      {
        success: true,
        skipped: false,
        message: 'warm up処理を開始しました',
        warmed: { ...serverWarmState },
      },
      { status: 202 } // 202 Accepted: リクエストは受理されたが、処理はまだ完了していない
    )
    
  } catch (error) {
    console.error("Search warmup API エラー:", error)
    
    return NextResponse.json(
      {
        success: false,
        error: "Search warmup API でエラーが発生しました",
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
