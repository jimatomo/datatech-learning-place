import { NextResponse } from "next/server"
import { headers } from 'next/headers'
import { randomBytes } from 'crypto'
import { getLexicalSearchIndex } from '@/lib/search-lite/client'
import { serverWarmState, isFullyWarmed } from '@/lib/search/warm-state'

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY || randomBytes(32).toString('hex')

async function validateInternalRequest(request: Request): Promise<{ isValid: boolean; error?: string }> {
  const headersList = await headers()
  const internalKey =
    headersList.get('x-internal-key') ||
    headersList.get('authorization')?.replace('X-Internal-Key ', '') ||
    headersList.get('authorization')

  if (!internalKey || internalKey !== INTERNAL_API_KEY) {
    return { isValid: false, error: '無効な内部APIキー' }
  }

  if (request.method !== 'POST') {
    return { isValid: false, error: '許可されていないHTTPメソッド' }
  }

  return { isValid: true }
}

function executeWarmup(): void {
  if (isFullyWarmed()) {
    return
  }

  getLexicalSearchIndex()
  serverWarmState.searchIndex = true
}

export async function POST(request: Request) {
  try {
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

    if (isFullyWarmed()) {
      return NextResponse.json({
        success: true,
        skipped: true,
        warmed: { ...serverWarmState },
        message: '既にwarm up済みです',
      })
    }

    executeWarmup()

    return NextResponse.json({
      success: true,
      skipped: false,
      message: '軽量検索インデックスをロードしました',
      warmed: { ...serverWarmState },
    })
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

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
