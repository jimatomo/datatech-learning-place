import { CircleCheckBig, CircleHelp } from "lucide-react";
import { Quiz } from "@/contents/quiz";
import { getQuizResult } from '@/app/quiz/lib/get-quiz-result';

// ユーザが精化しているかどうかで表示を変えるアイコン
export async function QuizIcon({ quiz, userId }: { quiz: Quiz, userId: string | undefined }) {
  // ログイン済みユーザーの場合のみクイズ結果を取得
  const quizResult = userId ? await getQuizResult(userId, quiz.getId()) : null;

  return (
    <>
      {quizResult?.Item?.is_correct === "true" ? (
        <CircleCheckBig className="my-5 w-full text-emerald-500" size={40}/>
      ) : (
        <CircleHelp className="my-5 w-full" size={40}/>
      )}
    </>
  );
}
