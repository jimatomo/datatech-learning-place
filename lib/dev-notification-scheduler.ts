import * as cron from 'node-cron'

// 開発環境でのみ使用する通知スケジューラー
export class DevNotificationScheduler {
  private jobs: cron.ScheduledTask[] = []
  
  constructor() {
    console.log('🔔 開発環境用通知スケジューラーを初期化しました')
  }

  // 毎分実行して通知対象をチェック
  startScheduler() {
    if (process.env.NODE_ENV !== 'development') {
      console.log('本番環境では開発用スケジューラーは実行されません')
      return
    }

    console.log('🚀 開発環境用通知スケジューラーを開始します')
    
    // 毎分実行（実際の運用では毎日10分ごとにしますが、開発では頻度を上げています）
    const job = cron.schedule('*/10 * * * *', async () => {
      try {
        console.log('📅 定期通知チェックを実行中...')
        
        // 今日のクイズ通知をスケジュール
        const response = await fetch('http://localhost:3000/api/notifications/schedule-daily-quiz', {
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

    this.jobs.push(job)
    job.start()
    
    console.log('⏰ 毎分通知チェックを開始しました（開発環境）')
  }

  // 本番用：毎日特定の時刻に実行
  startProductionScheduler() {
    if (process.env.NODE_ENV !== 'production') {
      console.log('開発環境では本番用スケジューラーは実行されません')
      return
    }

    // 毎日午前8時に実行
    const job = cron.schedule('0 8 * * *', async () => {
      try {
        console.log('📅 日次クイズ通知チェックを実行中...')
        
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/notifications/schedule-daily-quiz`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        
        const result = await response.json()
        console.log('通知スケジューリング結果:', result)
        
      } catch (error) {
        console.error('日次通知スケジューリングエラー:', error)
      }
    }, {
      timezone: 'Asia/Tokyo'
    })

    this.jobs.push(job)
    job.start()
    
    console.log('⏰ 日次通知スケジューラーを開始しました（本番環境）')
  }

  // スケジューラーを停止
  stopScheduler() {
    this.jobs.forEach(job => {
      job.stop()
    })
    this.jobs = []
    console.log('⏹️  通知スケジューラーを停止しました')
  }

  // 手動でテスト実行
  async runTestNotification() {
    try {
      console.log('🧪 テスト通知を実行中...')
      
      const response = await fetch('http://localhost:3000/api/notifications/send-quiz-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizTitle: 'テスト通知 - 開発環境',
          quizTags: ['Snowflake Basic', 'Data Modeling'],
          quizDate: new Date().toISOString().split('T')[0],
          quizId: `test-${Date.now()}`
        })
      })
      
      const result = await response.json()
      console.log('📧 テスト通知結果:', result)
      
      return result
      
    } catch (error) {
      console.error('❌ テスト通知エラー:', error)
      throw error
    }
  }
}

// グローバルインスタンス
let schedulerInstance: DevNotificationScheduler | null = null

export function getNotificationScheduler(): DevNotificationScheduler {
  if (!schedulerInstance) {
    schedulerInstance = new DevNotificationScheduler()
  }
  return schedulerInstance
}
