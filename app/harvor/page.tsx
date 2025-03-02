import QuizDashboard from '@/app/harvor/ui/quiz-dashboard';
import LearningTracker from '@/app/harvor/ui/learning_tracker';

export default async function Harvor() {
  return (
    <div>
      <h2 className="scroll-m-20 pb-2 text-lg font-bold tracking-tight">
        学習状況ダッシュボード
      </h2>
      <h3 className="scroll-m-20 pb-2 font-semibold tracking-tight">クイズの進捗状況</h3>
      <QuizDashboard />
      <h3 className="scroll-m-20 pb-2 font-semibold tracking-tight">学習トラッカー</h3>
      <LearningTracker />
    </div>
  );
}
