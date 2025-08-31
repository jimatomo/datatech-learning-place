// クイズ通知のスケジューラー（このファイルはnext.config.mjsで呼び出されるのでtypescriptではなくjavascriptで記述）
import * as cron from 'node-cron'

// 10分間隔で実行する通知スケジューラー
export class NotificationScheduler {
  #jobs = []
  #isRunning = false

  constructor() {
    // 起動時に状態ファイルをチェック（安全に実行）
    this.#initializeScheduler()
  }

  // スケジューラーの初期化
  async #initializeScheduler() {
    try {
      this.#startSchedulerInternal()
    } catch (error) {
      console.error('❌ スケジューラー起動に失敗しました:', error)
    }
  }

  // 10分間隔で通知対象をチェック
  #startSchedulerInternal() {
    if (this.#isRunning) {
      return
    }

    // 10分間隔で実行
    const job = cron.schedule('*/10 * * * *', async () => {
      try {
        // 内部APIキーを取得
        const internalApiKey = process.env.INTERNAL_API_KEY
        if (!internalApiKey) {
          console.error('❌ INTERNAL_API_KEY環境変数が設定されていません')
          return
        }

        // 今日のクイズ通知をスケジュール
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
        const response = await fetch(`${baseUrl}/api/notifications/quiz`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Internal-Key': internalApiKey
          }
        })

        const result = await response.json()

        if (!result.success) {
          console.error('❌ 通知スケジューリングエラー:', result.error)
        }

      } catch (error) {
        console.error('❌ スケジューラー実行エラー:', error)
      }
    })

    this.#jobs.push(job)
    job.start()
    this.#isRunning = true
  }
}
