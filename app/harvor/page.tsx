import QuizDashboard from '@/app/harvor/ui/quiz-dashboard';

export default async function Harvor() {
  return (
    <div>
      <h2 className="scroll-m-20 pb-2 text-lg font-bold tracking-tight">
        学習状況ダッシュボード
      </h2>
      <div>
        <h3>最新のクイズの進捗</h3>
        <QuizDashboard />
      </div>
    </div>
  );
}
