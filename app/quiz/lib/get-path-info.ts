import { batchGetQuizData } from '@/app/quiz/lib/batch-get-quiz-data';

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
  quiz_id: string | null;
}

interface QuizBasicInfo {
  file: string;
  path: string;
  is_endpoint: boolean;
  title: string;
  tags: string[];
  created_at: Date | null;
  updated_at: Date | null;
  author: string | null;
  quiz_id: string | null;
}

export async function getPathInfos(
  files: string[],
  id: string[] = [],
  find_full_path: boolean = false,
  userId: string | null = null
) {
  // 第1段階: 全ファイルの基本情報を並列取得（動的インポート）
  const basicInfos = await Promise.all(files.map(async (file): Promise<QuizBasicInfo> => {
    let path = '';
    let title = '';
    let tags: string[] = [];
    let created_at: Date | null = null;
    let updated_at: Date | null = null;
    let author: string | null = null;
    let is_endpoint = false;
    let quiz_id: string | null = null;

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
        quiz_id = quiz.getId();
      } catch (error) {
        console.error(`Failed to load quiz for ${file}:`, error);
      }
    }

    return {
      file,
      path,
      is_endpoint,
      title,
      tags,
      created_at,
      updated_at,
      author,
      quiz_id
    };
  }));

  // 第2段階: ログイン済みユーザーの場合、全quiz_idを一括取得
  let resultsMap = new Map<string, { is_correct: string }>();
  let likesMap = new Map<string, { like: boolean }>();

  if (userId) {
    const quizIds = basicInfos
      .filter(info => info.quiz_id !== null)
      .map(info => info.quiz_id as string);

    if (quizIds.length > 0) {
      const batchData = await batchGetQuizData(userId, quizIds);
      resultsMap = batchData.results;
      likesMap = batchData.likes;
    }
  }

  // 第3段階: 基本情報とDB結果をマージして返す
  return basicInfos.map(info => {
    let is_correct: boolean | null = null;
    let is_liked: boolean | null = null;

    if (userId && info.quiz_id) {
      const result = resultsMap.get(info.quiz_id);
      const like = likesMap.get(info.quiz_id);
      is_correct = result?.is_correct === "true";
      is_liked = like?.like ?? false;
    }

    return {
      path: info.path,
      is_endpoint: info.is_endpoint,
      title: info.title,
      tags: info.tags,
      created_at: info.created_at,
      updated_at: info.updated_at,
      author: info.author,
      is_correct,
      is_liked,
      quiz_id: info.quiz_id
    };
  });
}
