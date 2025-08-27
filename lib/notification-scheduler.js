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
      console.error('❌ スケジューラー状態ファイルの読み込みでエラーが発生しましたが、処理を継続します:', error)
    }
  }

  // 10分間隔で通知対象をチェック
  #startSchedulerInternal() {
    if (this.#isRunning) {
      console.log('⚠️  通知スケジューラーは既に実行中です')
      return
    }

    console.log('🚀 通知スケジューラーを開始します（10分間隔）')

    // 10分間隔で実行
    const job = cron.schedule('*/10 * * * *', async () => {
      try {
        console.log('📅 定期通知チェックを実行中...')

        // 今日のクイズ通知をスケジュール
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
        const response = await fetch(`${baseUrl}/api/notifications/schedule-daily-quiz`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        const result = await response.json()

        if (result.success) {
          if (result.quizzesFound > 0) {
            console.log(`✅ ${result.quizzesFound}件のクイズ通知をスケジュールしました`)
          } else {
            console.log('ℹ️  今日作成されたクイズはありません')
          }
        } else {
          console.error('❌ 通知スケジューリングエラー:', result.error)
        }

      } catch (error) {
        console.error('❌ スケジューラー実行エラー:', error)
      }
    })

    this.#jobs.push(job)
    job.start()
    this.#isRunning = true

    console.log('⏰ 10分間隔で通知チェックを開始しました')
  }
}
