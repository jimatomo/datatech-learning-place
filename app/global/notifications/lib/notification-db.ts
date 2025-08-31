// 通知設定のDynamoDBの操作を集約したファイル
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = 'user_settings';
const SETTING_TYPE = 'push_notification';

// テーブル構造の定義
// パーティションキー: setting_type
// ソートキー: notification_time

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
      setting_type: SETTING_TYPE,
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
        setting_type: SETTING_TYPE
      }
    }));

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
    const existingSubscription = await getNotificationSubscription(userId);
    
    if (!existingSubscription) {
      console.error('更新対象の通知設定が見つかりません:', userId);
      return false;
    }

    const updatedItem: NotificationSubscription = {
      ...existingSubscription,
      enabled: settings.enabled,
      selected_tags: settings.selected_tags,
      notification_time: settings.notification_time,
      updated_at: new Date().toISOString()
    };

    await ddbDocClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: updatedItem
    }));

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
        setting_type: SETTING_TYPE
      }
    }));

    console.log('通知設定を削除しました:', userId);
    return true;
  } catch (error) {
    console.error('通知設定の削除エラー:', error);
    return false;
  }
}

// 特定の時刻に通知すべき購読者を取得（完全一致版）
export async function getSubscribersForNotificationTime(targetTime: string): Promise<NotificationSubscription[]> {
  try {
    // setting_typeをパーティションキー、notification_timeをソートキーとして使用
    // notification_timeは文字列なので完全一致でクエリ
    const result = await ddbDocClient.send(new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: 'setting_type-notification_time-index', // GSIを使用
      KeyConditionExpression: 'setting_type = :setting_type AND notification_time = :notification_time',
      FilterExpression: 'enabled = :enabled',
      ExpressionAttributeValues: {
        ':setting_type': SETTING_TYPE,
        ':notification_time': targetTime,
        ':enabled': true
      }
    }));
    
    return (result.Items as NotificationSubscription[]) || [];
  } catch (error) {
    console.error('時刻別購読者の取得エラー:', error);
    return [];
  }
}

// タグで絞り込んだ購読者を取得する関数
export function filterSubscribersByTags(subscribers: NotificationSubscription[], quizTags: string[]): NotificationSubscription[] {
  return subscribers.filter(subscriber => {
    // 購読者がタグを選択していない場合は全てのクイズに通知
    if (!subscriber.selected_tags || subscriber.selected_tags.length === 0) {
      return true;
    }
    
    // クイズのタグと購読者の選択タグに重複があるかチェック
    const hasMatchingTag = quizTags.some(quizTag => 
      subscriber.selected_tags.includes(quizTag)
    );
    
    return hasMatchingTag;
  });
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

// TODO: 認証に依存しない純粋な通知設定取得関数（クライアントサイド用）は必要性を見直して削除したい
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


