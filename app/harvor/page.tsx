import QuizDashboard from '@/app/harvor/ui/quiz-dashboard';
import LearningTracker from '@/app/harvor/ui/learning_tracker';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function Harvor() {
  return (
    <div className="w-full">
      <h2 className="scroll-m-20 pb-2 text-lg font-bold tracking-tight">
        学習状況ダッシュボード
      </h2>

      <h3 className="scroll-m-20 pb-2 font-semibold tracking-tight">クイズの進捗状況</h3>
      <QuizDashboard />
      
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
      <LearningTracker />
    </div>
  );
}
