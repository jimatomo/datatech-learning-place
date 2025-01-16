import { ContentCard } from "@/components/ui/content-card"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datatech Learning Place",
  description: "データエンジニアのための学び舎です。毎日更新されるクイズやコラム、テキストを通じてデータエンジニアとしての基礎を鍛えましょう。",
  openGraph: {
    title: "Datatech Learning Place",
    description: "データエンジニアのための学び舎です。毎日更新されるクイズやコラム、テキストを通じてデータエンジニアとしての基礎を鍛えましょう。",
    url: "https://datatech-learning-place.net",
    siteName: "Datatech Learning Place",
    images: [
      {
        url: "https://datatech-learning-place.net/logo/logo-with-title.png",
        width: 820,
        height: 820,
      },
    ],
  },
}

export default function Home() {
  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-bold tracking-tight">
        Datatech Learning Place (alpha)
      </h1>
      <div className="flex flex-col gap-2 md:text-base text-sm">
        <p>
          ここはデータエンジニアのための学び舎です。<br />
          今後以下のコンテンツを追加予定です。
        </p>
        <ul className="list-disc pl-6">
          <li>一日一問出題されるクイズ（完全無料）</li>
          <li>データアプリケーションを構築しながら学んでいくテキスト（完全無料）</li>
          <li>運用費の足しにするのための広告・アフェリエイト（無料ユーザに表示）</li>
          <li>学習の進捗を分析するダッシュボード機能（有償予定）</li>
          <li>企業・チームで利用しやすくする組織管理機能（有償予定）</li>
          <li>スポンサー紹介コンテンツ（スポンサーになってもいいよという場合はフッターのお問い合わせページよりお願いします）</li>
        </ul>
      </div>
      <div className="flex flex-col gap-2 pt-8 md:text-base text-sm">
        <h2 className="scroll-m-20 pb-2 text-xl font-bold tracking-tight">
          学習状況の保存
        </h2>
        <p>
          学習状況を保存できますので、サインインを推奨しています。<br />
          サインイン自体は無料ですので、ぜひご利用ください。
        </p>
        <p className="pt-2 text-muted-foreground text-xs md:text-sm">
        Auth0の無料プランを利用しているのでドメイン名がデフォルトのままで利用しています。将来的に有料プランに移行してカスタムドメインにする予定です。
        </p>
      </div>
      <div className="flex flex-col gap-2 pt-8">
        <h2 className="scroll-m-20 pb-2 text-xl font-bold tracking-tight">
          コンテンツ
        </h2>
        <div className="flex flex-col lg:flex-row gap-2">
          <p className="text-sm md:text-base">
            <a href="https://github.com/jimatomo/dtsb-learning-place" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">
              GitHub
            </a>
            でコンテンツ含めてソースを公開しております。
          </p>
          <ContentCard 
            title="Quiz"
            description="データ基盤に関するクイズ"
            imageSrc="/quiz_card.jpg"
            href="/quiz"
          />
        </div>
      </div>
    </div>
  );
}
