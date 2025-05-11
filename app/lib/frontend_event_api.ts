// app/lib/api.ts
export const sendEventPostRequest = async (data?: unknown) => {
  try {
    // ローカル環境の場合はリクエストをスキップ
    if (process.env.NODE_ENV === 'development') {
      const request_body = JSON.stringify(data);
      console.log('Skipping event post in development environment:', request_body);
      return true;
    }

    const request_body = JSON.stringify(data);

    const response = await fetch('/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // オプショナルな data 引数を受け取り、body に設定
      body: request_body,
    });

    if (!response.ok) {
      console.error('Failed to post event:', response.status, response.statusText);
      const errorData = await response.text();
      console.error('Error details:', errorData);
      // エラーオブジェクトやメッセージを返すなど、より詳細なエラーハンドリングも可能
      throw new Error(`Failed to post event: ${response.statusText}`);
    }

    return true; // 成功したことを示す値を返す例

  } catch (error) {
    console.error('Error posting event:', error);
    // エラーを再スローするか、特定の値を返す
    throw error; // 呼び出し元でエラーを処理できるように再スロー
  }
}; 

export const handleTrackEvent = async ({
  user_id,
  event_name,
  properties,
  path,
}: {
  user_id: string;
  path: string;
  event_name: string;
  properties: Record<string, unknown>;
}) => {
  const eventData = {
    user_id,
    path,
    event_name,
    properties,
  };

  try {
    await sendEventPostRequest(eventData);
    return true;
  } catch (error) {
    console.error(`Error tracking event '${event_name}':`, error);
    return false;
  }
}; 

