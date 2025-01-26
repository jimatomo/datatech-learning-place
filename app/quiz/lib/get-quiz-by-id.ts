import { transformQuizIdToUrl } from "@/contents/quiz";

export async function getQuizById(quizId: string) {
  const folder_path = transformQuizIdToUrl(quizId, false)
  const QuizModule = await import(`@/contents/quiz/${folder_path}.tsx`).catch(() => null);

  // Quizページの場合はQuizContentsを表示
  if (QuizModule) {
    return QuizModule.default();
  }

  // Quizページでない場合はnullを返す
  return QuizModule;
}
