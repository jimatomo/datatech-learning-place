//コンテンツをDynamo DBに置いたりするなど、性能が悪くなってきたらAPI + SSGを検討する

import path from 'path'
import { getAllQuizFiles } from '@/app/quiz/lib/get-files'
import { getPathInfos } from '../lib/get-path-info'

import { QuizContent } from '../ui/quiz-content'
import { QuizFileList } from '../ui/quiz-file-list'
import { ErrorDisplay } from '../ui/error-display'

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string[] }>;
}) {
  const id = (await params).id;
  
  try {
    const folderPath = path.join(process.cwd(), 'contents/quiz', ...id);
    const quizModule = await import(`@/contents/quiz/${id.join("/")}.tsx`).catch(() => null);
    
    // Quizページの場合はQuizContentsを表示
    if (quizModule) {
      const quiz = quizModule.default();
      return <QuizContent quiz={quiz} folderId={id.join("/")} />;
    }

    // Quizページでない場合はQuizFileListを表示するためのデータを取得
    const files = await getAllQuizFiles(folderPath);
    const pathInfos = await getPathInfos(files, id);

    // パスの重複を削除
    const unique_path_infos = Array.from(
      new Map(pathInfos.map(info => [info.path, info]))
      .values()
    );

    // QuizFileListを表示
    if (files && files.length > 0) {
      return (
      <div>
        <h2 className="scroll-m-20 pt-5 pb-2 text-lg font-semibold tracking-tight">
          {id.join("/")}のQuiz一覧
        </h2>
        <QuizFileList pathInfos={unique_path_infos} currentPath={id} />
      </div>);
    }
    
    // コンテンツが見つからない場合はエラーを表示
    throw new Error('コンテンツが見つかりません');
    
  } catch (error) {
    console.error('General error:', error);
    return <ErrorDisplay message={error instanceof Error ? error.message : '不明なエラー'} />;
  }
}
