import { Metadata } from "next"

import path from 'path'
import { getQuizFiles } from '@/app/quiz/lib/get-files'
import { getPathInfos, PathInfo } from '@/app/quiz/lib/get-path-info'
import { QuizFileList } from '@/app/quiz/ui/quiz-file-list'
import QuizFileListTagFiltered from '@/app/quiz/ui/quiz-file-list-tag-filtered'
import { getSession } from '@auth0/nextjs-auth0';
import QuizWeeklyContents from '@/app/quiz/ui/quiz-weekly-contents'
import { getJSTNow, filterFutureDates } from '@/lib/date-utils'

export const metadata: Metadata = {
  title: "DTLP Quiz",
  description: "Datatech Learning PlaceのQuizページです。毎日更新されるクイズを通じてデータエンジニアとしての基礎を鍛えましょう。",
  keywords: ["データエンジニア", "クイズ", "学習", "データ基盤", "DTLP"],
  authors: [{ name: "Datatech Learning Place Team" }],
  creator: "Datatech Learning Place",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://datatech-learning-place.net/quiz",
  },
  openGraph: {
    title: "DTLP Quiz",
    description: "Datatech Learning PlaceのQuizページです。毎日更新されるクイズを通じてデータエンジニアとしての基礎を鍛えましょう。",
    url: "https://datatech-learning-place.net/quiz",
    siteName: "Datatech Learning Place",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "https://datatech-learning-place.net/logo/logo-with-title.png",
        width: 820,
        height: 820,
        alt: "Datatech Learning Place Logo",
      },
    ],
  },
  twitter: {
    card: "summary"
  },
  icons: {
    icon: "/favicon.ico"
  },
}

// SearchParamsの型定義を追加
type Props = {
  searchParams: { limit?: string }
}

// searchParamsを受け取るように修正
export default async function QuizList({ searchParams }: Props) {
  // クイズディレクトリのパスを取得
  const quiz_dir = path.join(process.cwd(), 'contents', 'quiz')

  // ユーザー情報を取得
  const session = await getSession()
  const userId = session?.user?.sub

  // searchParamsからlimitを取得し、デフォルト値を7に設定
  const { limit } = await searchParams
  const limit_count = limit ? parseInt(limit) : 7

  // クイズディレクトリ内のクイズファイルを取得する際にlimitを使用
  const quiz_files = await getQuizFiles({
    dir: quiz_dir,
    limit_count: limit_count
  })

  // 全てのクイズのパス情報を取得
  const path_infos_full_path = await getPathInfos(quiz_files, [], true, userId)

  // 将来日付のクイズを除外（JST基準で判定）
  const path_infos_full_path_filtered = filterFutureDates(path_infos_full_path)

  // 最新のクイズ(3つ分)を取得
  const latest_path_infos_full_path = path_infos_full_path_filtered.slice(-3)
  // 作成日順に降順で並び替える
  latest_path_infos_full_path.sort((a, b) => {
    if (!a.created_at || !b.created_at) return 0;
    return b.created_at.getTime() - a.created_at.getTime()
  })

  // Topの階層のパス情報を生成（JST基準で年を判定）
  const top_path_infos: PathInfo[] = []
  let year_info = 2025
  const jstNow = getJSTNow()
  while (year_info <= jstNow.getFullYear()) {
    top_path_infos.push({
      path: year_info.toString(),
      is_endpoint: false,
      title: year_info.toString(),
      tags: [],
      created_at: null,
      updated_at: null,
      author: null,
      is_correct: null,
      is_liked: null
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
        <QuizFileListTagFiltered quizPathInfos={path_infos_full_path_filtered} defaultLimit={limit_count.toString()} />
      </div>

      <div>
        <h2 className="scroll-m-20 pt-5 pb-2 text-lg font-semibold tracking-tight">
          <p>曜日別のコンテンツ</p>
        </h2>
        <div className="px-2">
          <QuizWeeklyContents />
        </div>
      </div>
    </div>
  )
}
