import { Suspense } from 'react';
import QuizDashboard from '@/app/harvor/ui/quiz-dashboard';
import LearningTracker from '@/app/harvor/ui/learning_tracker';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// QuizDashboardのローディングスケルトン
function QuizDashboardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 pt-2 pb-4">
        <Skeleton className="h-48 w-48 rounded-full" />
        <Skeleton className="h-24 w-64" />
      </div>
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}

// LearningTrackerのローディングスケルトン
function LearningTrackerSkeleton() {
  return (
    <div className="p-2 border-2 max-w-[30rem]">
      <Skeleton className="h-24 w-full" />
    </div>
  );
}

export default function Harvor() {
  return (
    <div className="w-full">
      <h2 className="scroll-m-20 pb-2 text-lg font-bold tracking-tight">
        学習状況ダッシュボード
      </h2>

      <h3 className="scroll-m-20 pb-2 font-semibold tracking-tight">クイズの進捗状況</h3>
      <Suspense fallback={<QuizDashboardSkeleton />}>
        <QuizDashboard />
      </Suspense>
      
      <div className="mb-6">
        <h3 className="scroll-m-20 pb-2 font-semibold tracking-tight">セルフ問題集</h3>
        <p className="text-sm text-muted-foreground mb-3">
          自分専用の問題集を作成・管理して、効率的な学習を進めましょう
        </p>
        <Link href="/harvor/self-quiz">
          <Button variant="outline" className="flex items-center gap-2">
            セルフ問題集を管理する
          </Button>
        </Link>
      </div>
      <h3 className="scroll-m-20 pb-2 font-semibold tracking-tight">学習トラッカー</h3>
      <Suspense fallback={<LearningTrackerSkeleton />}>
        <LearningTracker />
      </Suspense>
    </div>
  );
}
