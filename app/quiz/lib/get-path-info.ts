import { getQuizResult } from '@/app/quiz/lib/get-quiz-result';
import { headers } from 'next/headers';

export interface PathInfo {
  path: string;
  is_endpoint: boolean;
  title: string;
  tags: string[];
  created_at: Date | null;
  updated_at: Date | null;
  author: string | null;
  is_correct: boolean | null;
  is_liked: boolean | null;
}

export async function getPathInfos(
  files: string[],
  id: string[] = [],
  find_full_path: boolean = false,
  userId: string | null = null
) {
  return await Promise.all(files.map(async (file) => {
    let path = '';
    let title = '';
    let tags: string[] = [];
    let created_at: Date | null = null;
    let updated_at: Date | null = null;
    let author: string | null = null;
    let is_endpoint = false;
    let is_correct: boolean | null = null;
    let is_liked: boolean | null = null;
    if (find_full_path) {
      path = file;
      is_endpoint = true;
    } else {
      path = file.split('/')[0];
      is_endpoint = !file.includes('/');
    }

    if (is_endpoint) {
      try {
        const quizModule = await import(`@/contents/quiz/${[...id, file].join('/')}.tsx`);
        const quiz = quizModule.default();
        title = quiz.getTitle();
        tags = quiz.getTags();
        created_at = quiz.getCreatedAt();
        updated_at = quiz.getUpdatedAt();
        author = quiz.getAuthor();
        // ログイン済みユーザーの場合のみクイズ結果を取得
        if (userId) {
          const quizResult = await getQuizResult(userId, quiz.getId());
          is_correct = quizResult?.Item?.is_correct === "true";
          // いいねステータスの取得
          const encodedUserId = encodeURIComponent(userId);
          const headersList = await headers();
          const protocol = headersList.get('x-forwarded-proto') || 'http';
          const host = headersList.get('host') || '';
          const baseUrl = `${protocol}://${host}`;
          const statusResponse = await fetch(`${baseUrl}/api/quiz/like?quizId=${quiz.getId()}&userId=${encodedUserId}`)
          const statusResult = await statusResponse.json()
          is_liked = statusResult.Item?.like ?? false
        }
      } catch (error) {
        console.error(`Failed to load quiz for ${file}:`, error);
      }
    }


    return {
      path,
      is_endpoint,
      title,
      tags,
      created_at,
      updated_at,
      author,
      is_correct,
      is_liked
    };
  }));
}
