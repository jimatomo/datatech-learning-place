import path from 'path'
import { getAllQuizFiles } from '@/app/quiz/lib/get-files'
import { getPathInfos } from '@/app/quiz/lib/get-path-info'
import { QuizFileList } from '@/app/quiz/ui/quiz-file-list'
import QuizFileListTagFiltered from '@/app/quiz/ui/quiz-file-list-tag-filtered'

export default async function QuizList() {
  // クイズディレクトリのパスを取得
  const quizDir = path.join(process.cwd(), 'contents', 'quiz')

  // クイズディレクトリ内の全てのクイズファイルを取得
  const quizFiles = await getAllQuizFiles(quizDir)

  // 全てのクイズのパス情報を取得
  const pathInfos = await getPathInfos(quizFiles)
  const pathInfos_full_path = await getPathInfos(quizFiles, [], true)

  // 最新のクイズ(3つ分)を取得（作成日順に降順で並び替える）
  const latestPathInfos_full_path = pathInfos_full_path.slice(-3)
  latestPathInfos_full_path.sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0;
    return b.createdAt.getTime() - a.createdAt.getTime()
  })

  // パスの重複を削除
  const unique_path_infos = Array.from(
    new Map(pathInfos.map(info => [info.path, info]))
    .values()
  );

  return (
    <div>
      <div>
        <h2 className="scroll-m-20 pt-5 pb-2 text-lg font-semibold tracking-tight">
          <p>最新のQuiz</p>
        </h2>
        <div className="px-2">
          <QuizFileList pathInfos={latestPathInfos_full_path} currentPath={[]} />
        </div>
      </div>

      <div>
        <h2 className="scroll-m-20 pt-5 pb-2 text-lg font-semibold tracking-tight">
          <p>Quiz一覧</p>
        </h2>
        <div className="px-2">
          <QuizFileList pathInfos={unique_path_infos} currentPath={[]} />
        </div>
      </div>

      <div>
        <h2 className="scroll-m-20 pt-5 pb-2 text-lg font-semibold tracking-tight">
          <p>タグ別Quiz一覧</p>
        </h2>
        <QuizFileListTagFiltered quizPathInfos={pathInfos_full_path} />
      </div>
    </div>
  )
}
