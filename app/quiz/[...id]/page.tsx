//コンテンツをDynamo DBに置いたりするなど、性能が悪くなってきたらAPI + SSGを検討する
import { Metadata } from "next"

import path from 'path'
import { getQuizFiles } from '@/app/quiz/lib/get-files'
import { getPathInfos } from '@/app/quiz/lib/get-path-info'

import { QuizContent } from '@/app/quiz/ui/quiz-content'
import { QuizFileList } from '@/app/quiz/ui/quiz-file-list'
import { ErrorDisplay } from '@/app/quiz/ui/error-display'
import { getSession } from '@auth0/nextjs-auth0';
import { UpperNavigation } from '@/app/quiz/ui/upper-navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string[] }> }): Promise<Metadata> {
  const { id } = await params;
  const QuizModule = await import(`@/contents/quiz/${id.join("/")}.tsx`).catch(() => null);
  
  // Quizページの場合はQuizContentsのメタデータを取得
  if (QuizModule) {
    const quiz = QuizModule.default();
    return {
      title: quiz.getTitle() + " | DTLP Quiz",
      description: quiz.getCreatedAt().toLocaleDateString('ja-JP') + "のQuiz。" + quiz.getTags().join(", "),
      authors: [{ name: "Datatech Learning Place Team" }],
      creator: "Datatech Learning Place",
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: "https://datatech-learning-place.net/quiz/" + id.join("/"),
      },
      icons: {
        icon: "/favicon.ico"
      },
      openGraph: {
        title: quiz.getTitle() + " | DTLP Quiz",
        description: quiz.getCreatedAt().toLocaleDateString('ja-JP') + "のQuiz。Tags:" + quiz.getTags().join(", "),
        url: "https://datatech-learning-place.net/quiz/" + id.join("/"),
        siteName: "Datatech Learning Place",
        type: 'article',
        images: [
          {
            url: "https://datatech-learning-place.net/logo/logo-with-title.png",
            width: 820,
            height: 820,
          },
        ],
      },
      twitter: {
        card: "summary"
      },
    };
  };

  return {
    title: "DTLP Quiz list",
    description: "Datatech Learning PlaceのQuizページです。毎日更新されるクイズを通じてデータエンジニアとしての基礎を鍛えましょう。",
    openGraph: {
      title: "DTLP Quiz list",
      description: "Datatech Learning PlaceのQuizページです。毎日更新されるクイズを通じてデータエンジニアとしての基礎を鍛えましょう。",
      url: "https://datatech-learning-place.net/quiz/" + id.join("/"),
      siteName: "Datatech Learning Place",
      images: [
        {
          url: "https://datatech-learning-place.net/logo/logo-with-title.png",
          width: 820,
          height: 820,
        },
      ],
    },
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string[] }>;
}) {
  const { id } = await params;
  
  try {
    const folder_path = path.join(process.cwd(), 'contents/quiz', ...id);
    const QuizModule = await import(`@/contents/quiz/${id.join("/")}.tsx`).catch(() => null);
    
    // Quizページの場合はQuizContentsを表示
    if (QuizModule) {
      const quiz = QuizModule.default();
      return <QuizContent quiz={quiz} folderId={id.join("/")} />;
    }
    
    // Quizページでない場合はQuizFileListを表示するためのデータを取得
    const session = await getSession();
    const userId = session?.user?.sub;
    const files = await getQuizFiles({ dir: folder_path });
    const path_infos = await getPathInfos(files, id, false, userId);

    
    // 将来日付のパス情報を削除
    const today = new Date();
    const path_infos_filtered = path_infos.filter(info => 
      !info.created_at || info.created_at.getTime() <= today.getTime()
    );

    // パスの重複を削除
    const unique_path_infos = Array.from(
      new Map(path_infos_filtered.map(info => [info.path, info]))
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
        <div className="flex justify-center pt-5">
          <UpperNavigation folderId={id.join("/")} />
        </div>
      </div>);
    }
    
    // コンテンツが見つからない場合はエラーを表示
    throw new Error('コンテンツが見つかりません');
    
  } catch (error) {
    console.error('General error:', error);
    return <ErrorDisplay message={error instanceof Error ? error.message : '不明なエラー'} />;
  }
}
