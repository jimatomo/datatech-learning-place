import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, DeleteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = 'user_settings';

interface PushSubscriptionKeys {
  p256dh: string;
  auth: string;
}

interface PushSubscriptionData {
  endpoint: string;
  keys: PushSubscriptionKeys;
}

export interface NotificationSubscription {
  user_id: string;
  setting_type: string;
  endpoint: string;
  p256dh_key: string;
  auth_key: string;
  enabled: boolean;
  selected_tags: string[];
  notification_time: string;
  created_at: string;
  updated_at: string;
}

export interface NotificationSettings {
  enabled: boolean;
  selected_tags: string[];
  notification_time: string;
}



// 通知設定を保存
export async function saveNotificationSubscription(
  userId: string,
  subscription: PushSubscriptionData,
  settings: NotificationSettings
): Promise<boolean> {
  try {
    const now = new Date().toISOString();
    
    const item: NotificationSubscription = {
      user_id: userId,
      setting_type: 'push_notification',
      endpoint: subscription.endpoint,
      p256dh_key: subscription.keys.p256dh,
      auth_key: subscription.keys.auth,
      enabled: settings.enabled,
      selected_tags: settings.selected_tags,
      notification_time: settings.notification_time,
      created_at: now,
      updated_at: now
    };

    await ddbDocClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: item
    }));

    console.log('通知設定を保存しました:', { userId, endpoint: subscription.endpoint });
    return true;
  } catch (error) {
    console.error('通知設定の保存エラー:', error);
    return false;
  }
}

// 通知設定を取得
export async function getNotificationSubscription(userId: string): Promise<NotificationSubscription | null> {
  try {
    // console.log('DynamoDB取得開始:', { userId, tableName: TABLE_NAME })
    
    const result = await ddbDocClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        user_id: userId,
        setting_type: 'push_notification'
      }
    }));

    // console.log('DynamoDB取得結果:', {
    //   hasItem: !!result.Item,
    //   item: result.Item ? {
    //     user_id: result.Item.user_id,
    //     notification_time: result.Item.notification_time,
    //     enabled: result.Item.enabled,
    //     selected_tags: result.Item.selected_tags?.length || 0
    //   } : null
    // })

    return result.Item as NotificationSubscription || null;
  } catch (error) {
    console.error('通知設定の取得エラー:', error);
    return null;
  }
}

// 通知設定を更新
export async function updateNotificationSettings(
  userId: string,
  settings: NotificationSettings
): Promise<boolean> {
  try {
    // console.log('updateNotificationSettings開始:', { userId, settings })
    
    const existingSubscription = await getNotificationSubscription(userId);
    
    if (!existingSubscription) {
      console.error('更新対象の通知設定が見つかりません:', userId);
      return false;
    }

    // console.log('既存の設定:', existingSubscription)

    const updatedItem: NotificationSubscription = {
      ...existingSubscription,
      enabled: settings.enabled,
      selected_tags: settings.selected_tags,
      notification_time: settings.notification_time,
      updated_at: new Date().toISOString()
    };

    // console.log('更新予定のアイテム:', updatedItem)

    await ddbDocClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: updatedItem
    }));

    console.log('通知設定を更新しました:', { userId, settings });
    return true;
  } catch (error) {
    console.error('通知設定の更新エラー:', error);
    return false;
  }
}

// 通知設定を削除（購読解除）
export async function deleteNotificationSubscription(userId: string): Promise<boolean> {
  try {
    await ddbDocClient.send(new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        user_id: userId,
        setting_type: 'push_notification'
      }
    }));

    console.log('通知設定を削除しました:', userId);
    return true;
  } catch (error) {
    console.error('通知設定の削除エラー:', error);
    return false;
  }
}

// 有効な通知購読者を全て取得（GSIなしの最適化戦略）
export async function getActiveNotificationSubscribers(): Promise<NotificationSubscription[]> {
  try {
    // パーティションキーを活用した効率的なクエリ戦略
    // 1. まず全てのユーザーIDを取得（ユーザー管理テーブルから、または既存の通知設定から）
    // 2. 各ユーザーIDに対して個別にクエリを実行
    // 3. 結果をフィルタリングして有効な購読者のみを返す
    
    // 既存の通知設定からユーザーIDのリストを取得
    const allSubscriptions = await getAllNotificationSubscriptions();
    
    // 有効な購読者のみをフィルタリング
    const activeSubscribers = allSubscriptions.filter(sub => 
      sub.enabled && sub.setting_type === 'push_notification'
    );
    
    return activeSubscribers;
  } catch (error: unknown) {
    console.error('購読者の取得エラー:', error);
    return [];
  }
}

// 全ての通知設定を取得（効率的なバッチ処理）
async function getAllNotificationSubscriptions(): Promise<NotificationSubscription[]> {
  try {
    // ScanCommandを使用して全ての通知設定を取得
    // フィルタリングはアプリケーションレベルで行う
    const result = await ddbDocClient.send(new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: 'setting_type = :setting_type',
      ExpressionAttributeValues: {
        ':setting_type': 'push_notification'
      }
    }));
    
    return (result.Items as NotificationSubscription[]) || [];
  } catch (error) {
    console.error('通知設定の一括取得エラー:', error);
    return [];
  }
}

// 特定の時間帯の通知購読者を取得（時間ベースの最適化）
export async function getSubscribersForTimeRange(startTime: string, endTime: string): Promise<NotificationSubscription[]> {
  try {
    const allSubscriptions = await getAllNotificationSubscriptions();
    
    // 時間範囲内で有効な購読者をフィルタリング
    return allSubscriptions.filter(sub => {
      if (!sub.enabled || sub.setting_type !== 'push_notification') {
        return false;
      }
      
      // 通知時刻が指定された時間範囲内かチェック
      const notificationTime = sub.notification_time;
      return notificationTime >= startTime && notificationTime <= endTime;
    });
  } catch (error) {
    console.error('時間範囲での購読者取得エラー:', error);
    return [];
  }
}

// 特定のタグに興味がある購読者を取得（最適化版）
export async function getSubscribersForTags(tags: string[]): Promise<NotificationSubscription[]> {
  try {
    const allSubscribers = await getActiveNotificationSubscribers();
    
    return allSubscribers.filter(subscriber => {
      // selected_tagsが存在しない、またはnull/undefinedの場合は空配列として扱う
      const selectedTags = subscriber.selected_tags || [];
      
      // 選択タグが空の場合は全てのクイズで通知
      if (selectedTags.length === 0) {
        return true;
      }
      
      // 指定されたタグのいずれかが購読者の選択タグに含まれているか
      return tags.some(tag => selectedTags.includes(tag));
    });
  } catch (error) {
    console.error('タグ別購読者の取得エラー:', error);
    return [];
  }
}

// 特定の時刻に通知すべき購読者を取得（通知スケジューリング用）
export async function getSubscribersForNotificationTime(targetTime: string, timeWindowMinutes: number = 5): Promise<NotificationSubscription[]> {
  try {
    const allSubscriptions = await getAllNotificationSubscriptions();
    
    // 指定された時刻の前後±timeWindowMinutes分の範囲内で有効な購読者をフィルタリング
    return allSubscriptions.filter(sub => {
      if (!sub.enabled || sub.setting_type !== 'push_notification') {
        return false;
      }
      
      const notificationTime = sub.notification_time;
      const targetMinutes = timeToMinutes(targetTime);
      const notificationMinutes = timeToMinutes(notificationTime);
      
      // 時間範囲内かチェック（±timeWindowMinutes分）
      const diff = Math.abs(targetMinutes - notificationMinutes);
      return diff <= timeWindowMinutes;
    });
  } catch (error) {
    console.error('時刻別購読者の取得エラー:', error);
    return [];
  }
}

// 時刻文字列（HH:MM）を分単位の数値に変換するヘルパー関数
function timeToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

// PushSubscriptionオブジェクトを再構築
export function reconstructPushSubscription(subscription: NotificationSubscription) {
  return {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.p256dh_key,
      auth: subscription.auth_key
    }
  };
}

// 通知設定を取得するための高レベルな関数（API用）
export interface GetNotificationSettingsResult {
  success: boolean;
  hasSubscription: boolean;
  message?: string;
  error?: string;
  settings?: {
    enabled: boolean;
    selectedTags: string[];
    notificationTime: string;
  };
}

export async function getNotificationSettings(userId: string): Promise<GetNotificationSettingsResult> {
  try {
    if (!userId) {
      return {
        success: true,
        hasSubscription: false,
        message: "認証されていません"
      };
    }

    // DynamoDBから購読情報を取得
    const subscriptionData = await getNotificationSubscription(userId);

    if (!subscriptionData) {
      return {
        success: true,
        hasSubscription: false,
        message: "通知設定が見つかりません"
      };
    }

    return {
      success: true,
      hasSubscription: true,
      settings: {
        enabled: subscriptionData.enabled,
        selectedTags: subscriptionData.selected_tags,
        notificationTime: subscriptionData.notification_time
      }
    };
  } catch (error) {
    console.error("通知設定の取得エラー:", error);

    return {
      success: false,
      hasSubscription: false,
      error: "通知設定の取得に失敗しました"
    };
  }
}

// 認証に依存しない純粋な通知設定取得関数（クライアントサイド用）
export async function getNotificationSettingsPure(userId: string): Promise<{
  hasSubscription: boolean;
  settings?: {
    enabled: boolean;
    selectedTags: string[];
    notificationTime: string;
  };
} | null> {
  try {
    if (!userId) {
      return null;
    }

    const subscriptionData = await getNotificationSubscription(userId);
    
    if (!subscriptionData) {
      return {
        hasSubscription: false
      };
    }

    return {
      hasSubscription: true,
      settings: {
        enabled: subscriptionData.enabled,
        selectedTags: subscriptionData.selected_tags,
        notificationTime: subscriptionData.notification_time
      }
    };
  } catch (error) {
    console.error("通知設定の取得エラー:", error);
    return null;
  }
}


