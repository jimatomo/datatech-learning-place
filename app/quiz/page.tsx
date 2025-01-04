import path from 'path'
import { getAllQuizFiles } from '@/app/quiz/lib/get-files'
import { getPathInfos } from '@/app/quiz/lib/get-path-info'
import { QuizFileList } from '@/app/quiz/ui/quiz-file-list'
import QuizFileListTagFiltered from '@/app/quiz/ui/quiz-file-list-tag-filtered'

export default async function QuizList() {
  // クイズディレクトリのパスを取得
  const quiz_dir = path.join(process.cwd(), 'contents', 'quiz')

  // クイズディレクトリ内の全てのクイズファイルを取得
  const quiz_files = await getAllQuizFiles(quiz_dir)

  // 全てのクイズのパス情報を取得
  const path_infos = await getPathInfos(quiz_files)
  const path_infos_full_path = await getPathInfos(quiz_files, [], true)

  // 最新のクイズ(3つ分)を取得（作成日順に降順で並び替える）
  const latest_path_infos_full_path = path_infos_full_path.slice(-3)
  latest_path_infos_full_path.sort((a, b) => {
    if (!a.created_at || !b.created_at) return 0;
    return b.created_at.getTime() - a.created_at.getTime()
  })

  // パスの重複を削除
  const unique_path_infos = Array.from(
    new Map(path_infos.map(info => [info.path, info]))
    .values()
  );

  return (
    <div>
      <div className="text-sm">
        <p>Quizの間違いを見つけた際にはGitHubのIssueもしくはPull Requestを作成してください。</p>
      </div>
      <div>
        <h2 className="scroll-m-20 pt-5 pb-2 text-lg font-semibold tracking-tight">
          <p>最新のQuiz</p>
        </h2>
        <div className="px-2">
          <QuizFileList pathInfos={latest_path_infos_full_path} currentPath={[]} />
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
        <QuizFileListTagFiltered quizPathInfos={path_infos_full_path} />
      </div>
    </div>
  )
}
