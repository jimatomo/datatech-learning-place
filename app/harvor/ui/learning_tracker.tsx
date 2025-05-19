import { queryLearningTrackers } from '@/app/harvor/lib/query-learning-trackers';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import * as React from "react";

// 活動データの型定義
type Activity = {
  d: string; // 日付
  a: number; // 取り組んだ問題数
  c: number; // 正解した問題数
};

// 日付をフォーマットする関数
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// 色の強度を計算する関数（ダークモード対応）
function getColorIntensity(count: number): string {
  if (count === 0) return 'bg-gray-50 dark:bg-gray-900';
  if (count <= 1) return 'bg-green-100 dark:bg-green-900';
  if (count <= 3) return 'bg-green-300 dark:bg-green-700';
  if (count <= 5) return 'bg-green-500 dark:bg-green-500';
  return 'bg-green-700 dark:bg-green-300';
}

// 日付から曜日を取得する関数（0: 日曜日, 1: 月曜日, ..., 6: 土曜日）
function getDayOfWeek(dateStr: string): number {
  return new Date(dateStr).getDay();
}

// 英語の月名を取得する関数
function getMonthName(month: number): string {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return monthNames[month];
}

// 週ごとにデータをグループ化する関数
function groupByWeek(activities: Activity[]): Record<string, Activity[]> {
  const weeks: Record<string, Activity[]> = {};
  
  // 日付でソート
  const sortedActivities = [...activities].sort((a, b) => new Date(a.d).getTime() - new Date(b.d).getTime());
  
  // 過去3ヶ月分のデータを生成（存在しない日付は空データで埋める）
  const today = new Date();
  
  // 今月の1日を取得
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  
  // 6ヶ月前の同じ月の1日を取得
  const sixMonthsAgo = new Date(currentMonthStart);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  // 日付ごとのアクティビティをマップに変換
  const activityMap: Record<string, Activity> = {};
  sortedActivities.forEach(activity => {
    activityMap[activity.d] = activity;
  });
  
  // 過去6ヶ月分の日付を生成
  const allDates: Activity[] = [];
  const currentDate = new Date(sixMonthsAgo);
  
  while (currentDate <= today) {
    const dateStr = formatDate(currentDate.toISOString().split('T')[0]);
    const activity = activityMap[dateStr] || { d: dateStr, a: 0, c: 0 };
    allDates.push(activity);
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // 週ごとにグループ化
  allDates.forEach(activity => {
    const date = new Date(activity.d);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = formatDate(weekStart.toISOString().split('T')[0]);
    
    if (!weeks[weekKey]) {
      weeks[weekKey] = [];
    }
    
    weeks[weekKey].push(activity);
  });
  
  return weeks;
}

export default async function LearningTracker() {
  const result = await queryLearningTrackers();
  const activities = result?.Item?.activities || [];
  
  // 週ごとにグループ化
  const weeklyActivities = groupByWeek(activities);
  
  // 週のキーを取得して日付順にソート
  const weekKeys = Object.keys(weeklyActivities).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );
  
  // 曜日のラベル
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const displayDays = [false, true, false, true, false, true, false]; // 月、水、金だけを表示
  
  // 各週の中央の日付を取得して月を決定
  const weekMonths: Record<string, number> = {};
  const monthLabels: Record<string, string> = {};
  
  // 表示済みの月を追跡
  const displayedMonths = new Set<string>(); // 年と月の組み合わせを追跡するために文字列に変更
  
  // 現在の日付を取得
  const today = new Date();
  
  // 月の表示位置を追跡
  const monthPositions: { week: string; month: number; year: number }[] = [];
  
  // まず月の位置を記録
  weekKeys.forEach(week => {
    const weekStart = new Date(week);
    const midWeek = new Date(weekStart);
    midWeek.setDate(weekStart.getDate() + 3); // 週の中央（水曜日）
    
    const month = midWeek.getMonth();
    const year = midWeek.getFullYear();
    weekMonths[week] = month;
    
    // 月が変わる位置を記録
    if (monthPositions.length === 0 || 
        monthPositions[monthPositions.length - 1].month !== month ||
        monthPositions[monthPositions.length - 1].year !== year) {
      monthPositions.push({ week, month, year });
    }
  });
  
  // 月のラベルを設定
  weekKeys.forEach(week => {
    const weekStart = new Date(week);
    const midWeek = new Date(weekStart);
    midWeek.setDate(weekStart.getDate() + 3);
    
    const month = midWeek.getMonth();
    const year = midWeek.getFullYear();
    const yearMonthKey = `${year}-${month}`;
    
    // 月の位置を取得
    const monthIndex = monthPositions.findIndex(mp => mp.week === week);
    if (monthIndex === -1) {
      monthLabels[week] = '';
      return;
    }
    
    // 前後の月との距離を計算
    const prevMonth = monthIndex > 0 ? monthPositions[monthIndex - 1] : null;
    const nextMonth = monthIndex < monthPositions.length - 1 ? monthPositions[monthIndex + 1] : null;
    
    // 前後の月との距離が近すぎる場合は表示を抑制
    // 距離の閾値を3週に変更し、さらに月が変わる位置でのみ判定を行う
    const weekIndex = weekKeys.indexOf(week);
    const isMonthChange = monthIndex > 0 && monthPositions[monthIndex - 1].month !== month;
    const shouldSuppress = isMonthChange && (
      (prevMonth && weekIndex - weekKeys.indexOf(prevMonth.week) < 3) ||
      (nextMonth && weekKeys.indexOf(nextMonth.week) - weekIndex < 3)
    );
    
    // 去年のひとつ前の月は表示しない
    const isPreviousYearPreviousMonth = year === today.getFullYear() - 1 && month === (today.getMonth() + 11) % 12;
    
    if (!displayedMonths.has(yearMonthKey) && !isPreviousYearPreviousMonth && !shouldSuppress) {
      monthLabels[week] = getMonthName(month);
      displayedMonths.add(yearMonthKey);
    } else {
      monthLabels[week] = '';
    }
  });
  
  return (
    <div className="p-2 dark:bg-gray-950 dark:text-white border-2 max-w-[30rem]">
      
      {/* スクロール可能なコンテナ */}
      <ScrollArea className="w-full">
        <div className="w-full px-2 pb-6">
          <div className="flex mb-1">
            <div className="w-8 flex-shrink-0"></div>
            {weekKeys.map(week => (
              <div key={week} className="w-3 mx-[1px] text-xs text-center flex-shrink-0">
                {monthLabels[week]}
              </div>
            ))}
          </div>
          
          <div>
            {dayLabels.map((day, dayIndex) => (
              <div key={day} className="flex items-center min-w-fit">
                <div className="w-8 text-xs text-right pr-2 flex-shrink-0">{displayDays[dayIndex] ? day : ''}</div>
                {weekKeys.map(week => {
                  const dayActivities = weeklyActivities[week].find(
                    a => getDayOfWeek(a.d) === dayIndex
                  );
                  
                  return (
                    <div 
                      key={`${week}-${dayIndex}`} 
                      className={`w-3 h-3 mx-[1px] rounded-[3px] flex-shrink-0 ${dayActivities ? getColorIntensity(dayActivities.a) : 'bg-gray-50 dark:bg-gray-900'}`}
                      title={dayActivities ? `${dayActivities.d}: ${dayActivities.c}/${dayActivities.a} 正解` : ''}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      
      {/* 凡例をスクロールエリアの外に移動 */}
      <div className="flex items-center justify-end mt-3 text-xs">
        <div className="mr-2">少ない</div>
        <div className="w-2 h-2 bg-gray-50 dark:bg-gray-900 rounded-none mx-0.25"></div>
        <div className="w-2 h-2 bg-green-100 dark:bg-green-900 rounded-none mx-0.25"></div>
        <div className="w-2 h-2 bg-green-300 dark:bg-green-700 rounded-none mx-0.25"></div>
        <div className="w-2 h-2 bg-green-500 dark:bg-green-500 rounded-none mx-0.25"></div>
        <div className="w-2 h-2 bg-green-700 dark:bg-green-300 rounded-none mx-0.25"></div>
        <div className="ml-2">多い</div>
      </div>
    </div>
  );
}
