import { NextResponse } from "next/server"
import path from 'path'
import fs from 'fs'
import { sendQuizNotification } from '@/lib/quiz-notification-sender'

// クイズファイルの内容を解析してメタデータを取得する関数
async function getQuizMetadata(filePath: string) {
  try {
    // ファイルパスからクイズIDを生成（既存のライブラリを使用）
    const fileName = path.basename(filePath, '.tsx')
    const filePathParts = filePath.split(path.sep)
    const year = filePathParts[filePathParts.length - 4] // contents/quiz/YYYY/MM/DD.tsx
    const month = filePathParts[filePathParts.length - 3]
    const day = fileName
    
    // 既存のgenerateQuizId関数のロジックに合わせてIDを生成
    // パスから日付部分を抽出してIDを生成
    const datePath = `${year}/${month}/${day}`
    const id = `Q${datePath.replace(/\//g, "")}`
    
    // ファイルの内容を読み込み
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    // 既存のQuizクラスの構造に合わせてメタデータを抽出
    const titleMatch = fileContent.match(/title:\s*['"`]([^'"`]+)['"`]/)
    const tagsMatch = fileContent.match(/tags:\s*\[([^\]]+)\]/)
    const createdAtMatch = fileContent.match(/created_at:\s*new\s+Date\(['"`]([^'"`]+)['"`]\)/)
    
    if (!titleMatch) {
      console.log(`クイズファイルのメタデータが不完全: ${filePath}`)
      return null
    }
    
    const title = titleMatch[1]
    const tags = tagsMatch ? tagsMatch[1].split(',').map(tag => tag.trim().replace(/['"`]/g, '')) : []
    const created_at = createdAtMatch ? new Date(createdAtMatch[1]) : new Date()
    
    return {
      id,
      title,
      tags,
      created_at,
      file_path: filePath
    }
  } catch (error) {
    console.error(`クイズファイルの読み込みエラー: ${filePath}`, error)
    return null
  }
}

// JST（日本標準時）での現在時刻を取得
function getJSTNow(): Date {
  const now = new Date();
  // UTC+9時間でJSTに変換
  return new Date(now.getTime() + (9 * 60 * 60 * 1000));
}

// 今日作成されたクイズをチェックする関数
async function getTodaysQuizzes() {
  const today = getJSTNow() // JST基準で今日の日付を取得
  const year = today.getFullYear()
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  const day = today.getDate().toString().padStart(2, '0')
  
  const quizDir = path.join(process.cwd(), 'contents', 'quiz', year.toString(), month)
  const quizFilePath = path.join(quizDir, `${day}.tsx`)
  
  // ファイルが存在するかチェック
  if (!fs.existsSync(quizFilePath)) {
    return []
  }
  
  try {
    // クイズメタデータを取得
    const metadata = await getQuizMetadata(quizFilePath)
    
    if (metadata) {
      return [metadata]
    }
  } catch (error) {
    console.error('クイズメタデータの取得エラー:', error)
  }
  
  return []
}

export async function POST() {
  try {
    const jstNow = getJSTNow()
    console.log('日次クイズ通知スケジューリング開始:', {
      currentJSTTime: jstNow.toISOString(),
      currentJSTLocal: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
    })
    
    // 今日作成されたクイズを取得
    const todaysQuizzes = await getTodaysQuizzes()
    
    if (todaysQuizzes.length === 0) {
      return NextResponse.json({
        success: true,
        message: "今日作成されたクイズはありません",
        quizzesFound: 0,
        currentJSTTime: jstNow.toISOString()
      })
    }
    
    // 各クイズについて通知をスケジュール
    const notificationResults = []
    
    for (const quiz of todaysQuizzes) {
      try {
        // 直接ライブラリ関数を呼び出し
        const result = await sendQuizNotification({
          quizTitle: quiz.title,
          quizTags: quiz.tags,
          quizDate: quiz.created_at.toISOString().split('T')[0],
          quizId: quiz.id
        })
        
        notificationResults.push({
          quizId: quiz.id,
          success: result.success,
          message: result.message
        })
        
      } catch (error) {
        console.error(`クイズ ${quiz.id} の通知送信エラー:`, error)
        notificationResults.push({
          quizId: quiz.id,
          success: false,
          message: "通知送信に失敗しました"
        })
      }
    }
    
    return NextResponse.json({
      success: true,
      message: "日次クイズ通知のスケジューリングが完了しました",
      quizzesFound: todaysQuizzes.length,
      notificationResults: notificationResults,
      currentJSTTime: getJSTNow().toISOString()
    })
    
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