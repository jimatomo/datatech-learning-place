import { Metadata } from "next"

import path from 'path'
import { getQuizFiles } from '@/app/quiz/lib/get-files'
import { getPathInfos, PathInfo } from '@/app/quiz/lib/get-path-info'
import QuizFileListTagFiltered from '@/app/quiz/ui/quiz-file-list-tag-filtered'
import { getSession } from '@auth0/nextjs-auth0';
import { getJSTNow, filterFutureDates } from '@/lib/date-utils'
import Link from "next/link"
import { Settings, BookOpen, CircleCheckBig, TrendingUp, Calendar, Users, Sparkles } from "lucide-react"

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

  // searchParamsからlimitを取得し、デフォルト値を14に設定
  const { limit } = await searchParams
  const limit_count = limit ? parseInt(limit) : 14

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
      is_liked: null,
      quiz_id: null
    })
    year_info++
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* ヒーローセクション */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
        <div className="relative mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8 sm:py-8">
          <div className="text-center">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-white/20 dark:bg-white/30 rounded-full backdrop-blur-sm">
                <BookOpen className="h-8 w-8 sm:h-12 sm:w-12" />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              <span className="block">DTLP Quiz</span>
            </h1>
            <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-sm sm:text-base opacity-90 px-4 relative z-10">
              毎日更新されるクイズでデータエンジニアとしての基礎を鍛えましょう
            </p>
          </div>
        </div>
      </div>

      {/* フィードバック通知 */}
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 lg:px-8 sm:py-4">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 p-3 sm:p-4">
          <div className="flex items-start sm:items-center gap-2">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
              間違いを見つけた際には各クイズページのフィードバックボタン（吹き出し）からお知らせ下さい
            </p>
          </div>
        </div>
      </div>
      {/* 最新のクイズセクション */}
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl lg:text-4xl">
            最新のQuiz
          </h2>
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest_path_infos_full_path.map((pathInfo, index) => (
            <Link 
              key={pathInfo.path}
              href={`/quiz/${pathInfo.path}`}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-md dark:shadow-gray-900/20 transition-all duration-200 hover:shadow-xl dark:hover:shadow-gray-900/40 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 dark:from-blue-400/10 dark:via-indigo-400/10 dark:to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 rounded-lg">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
                      Quiz #{index + 1}
                    </span>
                  </div>
                  {pathInfo?.is_correct?.toString() === "true" && (
                    <div className="p-1 bg-emerald-100/50 dark:bg-emerald-900/50 rounded-full">
                      <CircleCheckBig className="h-5 w-5 sm:h-7 sm:w-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                  {pathInfo.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
                  {pathInfo.created_at && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="truncate">
                        {pathInfo.created_at.toLocaleDateString('ja-JP', { 
                          month: '2-digit', 
                          day: '2-digit' 
                        })}
                      </span>
                    </div>
                  )}
                  {pathInfo.author && (
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="truncate">{pathInfo.author}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {pathInfo.tags?.slice(0, 3).map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 通知設定セクション */}
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8 sm:py-8">
        <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-green-900 dark:text-green-100 mb-1 sm:mb-2">通知設定</h3>
              <p className="text-sm sm:text-base text-green-700 dark:text-green-300 leading-relaxed">新しいクイズの通知を受け取って学習を継続しましょう</p>
            </div>
            <Link 
              href="/notifications/settings" 
              className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors text-sm sm:text-base font-medium min-w-fit"
            >
              <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
              設定を管理
            </Link>
          </div>
        </div>
      </div>

      {/* 年別クイズ一覧セクション */}
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl lg:text-4xl">
            Quiz一覧
          </h2>
          <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 px-4">
            年別でクイズを探してみましょう
          </p>
        </div>
        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {top_path_infos.map((pathInfo) => (
            <Link 
              key={pathInfo.path}
              href={`/quiz/${pathInfo.path}`}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 text-center hover:shadow-lg dark:hover:shadow-gray-900/40 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-400/10 dark:to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="mx-auto mb-3 sm:mb-4 p-2 sm:p-3 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 rounded-full w-fit">
                  <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {pathInfo.title}年
                </h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  この年のクイズを見る
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* タグ別クイズ一覧セクション */}
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl lg:text-4xl">
            タグ別Quiz一覧
          </h2>
          <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 px-4">
            興味のあるトピックでクイズを絞り込んで学習しましょう
          </p>
        </div>
        <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm dark:shadow-gray-900/20">
          <QuizFileListTagFiltered quizPathInfos={path_infos_full_path_filtered} defaultLimit={limit_count.toString()} />
        </div>
      </div>

      {/* 曜日別コンテンツセクション */}
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl lg:text-4xl">
            曜日別のコンテンツ
          </h2>
          <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 px-4">
            毎日異なるテーマでスキルアップ！計画的な学習で着実に成長しましょう
          </p>
        </div>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700 p-4 sm:p-6 hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-200">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-blue-500 dark:bg-blue-600 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-lg font-semibold text-blue-900 dark:text-blue-100 truncate">月曜日</h3>
                <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 truncate">Snowflake Basic</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 leading-relaxed">ドキュメントからの出題（目指せSnowPro Core！）</p>
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/30 border border-indigo-200 dark:border-indigo-700 p-4 sm:p-6 hover:shadow-lg dark:hover:shadow-indigo-900/20 transition-all duration-200">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-indigo-500 dark:bg-indigo-600 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-lg font-semibold text-indigo-900 dark:text-indigo-100 truncate">火曜日</h3>
                <p className="text-xs sm:text-sm text-indigo-700 dark:text-indigo-300 truncate">Snowflake Advanced</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed">ちょっと踏み込んだSnowflakeの機能からの出題</p>
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 border border-purple-200 dark:border-purple-700 p-4 sm:p-6 hover:shadow-lg dark:hover:shadow-purple-900/20 transition-all duration-200">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-purple-500 dark:bg-purple-600 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-lg font-semibold text-purple-900 dark:text-purple-100 truncate">水曜日</h3>
                <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 truncate">Data Modeling</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-purple-800 dark:text-purple-200 leading-relaxed">dbt, SQLなどデータの準備に必要な知識を鍛える</p>
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 border border-green-200 dark:border-green-700 p-4 sm:p-6 hover:shadow-lg dark:hover:shadow-green-900/20 transition-all duration-200">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-green-500 dark:bg-green-600 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                <Settings className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-lg font-semibold text-green-900 dark:text-green-100 truncate">木曜日</h3>
                <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 truncate">Infrastructure</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-green-800 dark:text-green-200 leading-relaxed">AWS, Linuxなどエンジニアの基礎を鍛える</p>
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/30 border border-yellow-200 dark:border-yellow-700 p-4 sm:p-6 hover:shadow-lg dark:hover:shadow-yellow-900/20 transition-all duration-200">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-yellow-500 dark:bg-yellow-600 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-lg font-semibold text-yellow-900 dark:text-yellow-100 truncate">金曜日</h3>
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 truncate">Data Application</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-200 leading-relaxed">Streamlit, Pythonなど蓄積したデータを利活用するために必要な知識を鍛える</p>
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30 border border-red-200 dark:border-red-700 p-4 sm:p-6 hover:shadow-lg dark:hover:shadow-red-900/20 transition-all duration-200">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-red-500 dark:bg-red-600 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                <Users className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-lg font-semibold text-red-900 dark:text-red-100 truncate">土曜日</h3>
                <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 truncate">Data Management</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 leading-relaxed">DMBOKなどデータの管理に必要な知識を鍛える</p>
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30 border border-orange-200 dark:border-orange-700 p-4 sm:p-6 hover:shadow-lg dark:hover:shadow-orange-900/20 transition-all duration-200">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-orange-500 dark:bg-orange-600 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                <CircleCheckBig className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-lg font-semibold text-orange-900 dark:text-orange-100 truncate">日曜日</h3>
                <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 truncate">Datatech News</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-orange-800 dark:text-orange-200 leading-relaxed">データ技術の最新動向を追いましょう</p>
          </div>
        </div>
      </div>
    </div>
  )
}
