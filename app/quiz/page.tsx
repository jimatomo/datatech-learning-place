import path from 'path'
import { getAllQuizFiles } from '@/app/quiz/lib/get-files'
import { getPathInfos, PathInfo } from '@/app/quiz/lib/get-path-info'
import { QuizFileList } from '@/app/quiz/ui/quiz-file-list'
import QuizFileListTagFiltered from '@/app/quiz/ui/quiz-file-list-tag-filtered'
import { getSession } from '@auth0/nextjs-auth0';

export default async function QuizList() {
  // クイズディレクトリのパスを取得
  const quiz_dir = path.join(process.cwd(), 'contents', 'quiz')

  const session = await getSession()
  const userId = session?.user?.sub

  // クイズディレクトリ内の全てのクイズファイルを取得
  const quiz_files = await getAllQuizFiles(quiz_dir)

  // 全てのクイズのパス情報を取得
  const path_infos_full_path = await getPathInfos(quiz_files, [], true, userId)

  // 将来日付のクイズを除外
  const today = new Date()
  const path_infos_full_path_filtered = path_infos_full_path.filter(info => 
    info.created_at && info.created_at.getTime() <= today.getTime()
  )

  // 最新のクイズ(3つ分)を取得
  const latest_path_infos_full_path = path_infos_full_path_filtered.slice(-3)
  // 作成日順に降順で並び替える
  latest_path_infos_full_path.sort((a, b) => {
    if (!a.created_at || !b.created_at) return 0;
    return b.created_at.getTime() - a.created_at.getTime()
  })

  // Topの階層のパス情報を生成
  const top_path_infos: PathInfo[] = []
  let year_info = 2025
  while (year_info <= today.getFullYear()) {
    top_path_infos.push({
      path: year_info.toString(),
      is_endpoint: false,
      title: year_info.toString(),
      tags: [],
      created_at: null,
      updated_at: null,
      author: null,
      is_correct: null
    })
    year_info++
  }

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
          <QuizFileList pathInfos={top_path_infos} currentPath={[]} />
        </div>
      </div>

      <div>
        <h2 className="scroll-m-20 pt-5 pb-2 text-lg font-semibold tracking-tight">
          <p>タグ別Quiz一覧</p>
        </h2>
        <QuizFileListTagFiltered quizPathInfos={path_infos_full_path_filtered} />
      </div>
    </div>
  )
}
