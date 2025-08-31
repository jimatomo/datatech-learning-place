import { NotificationScheduler } from '@/app/global/notifications/lib/notification-scheduler.js';

export async function POST(request) {
  try {
    // 内部APIキーをチェック
    const internalApiKey = process.env.INTERNAL_API_KEY;
    const requestApiKey = request.headers.get('X-Internal-Key');
    
    if (!internalApiKey || requestApiKey !== internalApiKey) {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // 通知スケジューラーを初期化
    new NotificationScheduler();
    
    return Response.json({ 
      success: true, 
      message: '通知スケジューラーが初期化されました' 
    });
    
  } catch (error) {
    console.error('通知スケジューラー初期化エラー:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
