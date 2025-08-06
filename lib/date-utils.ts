/**
 * 日付関連のユーティリティ関数
 */

/**
 * 現在の日時をJST（日本標準時）で取得します
 * @returns JST基準の現在日時
 */
export function getJSTNow(): Date {
  const now = new Date();
  // UTC+9時間でJSTに変換
  return new Date(now.getTime() + (9 * 60 * 60 * 1000));
}

/**
 * 指定された日時がJST基準の現在時刻より前かどうかを判定します
 * 将来日付の除外などに使用します
 * @param date 判定したい日時
 * @returns 現在時刻より前の場合true、将来の場合false
 */
export function isBeforeJSTNow(date: Date): boolean {
  const jstNow = getJSTNow();
  return date.getTime() <= jstNow.getTime();
}

/**
 * 日付配列から将来日付を除外したフィルタリング済み配列を返します
 * @param items created_atプロパティを持つオブジェクトの配列
 * @returns 将来日付が除外された配列
 */
export function filterFutureDates<T extends { created_at: Date | null }>(items: T[]): T[] {
  return items.filter(item => 
    item.created_at && isBeforeJSTNow(item.created_at)
  );
}