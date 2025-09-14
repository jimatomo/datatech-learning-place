import { EnhancedCard } from "@/components/ui/enhanced-card"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datatech Learning Place",
  description: "データエンジニアのための学習サイトです。毎日更新されるクイズやコラム、テキストを通じてデータエンジニアとしての基礎を鍛えましょう。",
  keywords: "データエンジニア, データエンジニアリング, 学習, クイズ, テキスト, データ基盤, データアナリティクス",
  authors: [{ name: "Datatech Learning Place Team" }],
  creator: "Datatech Learning Place",
  robots: "index, follow",
  metadataBase: new URL("https://datatech-learning-place.net"),
  alternates: {
    canonical: "https://datatech-learning-place.net",
  },
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "Datatech Learning Place",
    description: "データエンジニアのための学習サイトです。毎日更新されるクイズやコラム、テキストを通じてデータエンジニアとしての基礎を鍛えましょう。",
    url: "https://datatech-learning-place.net",
    siteName: "Datatech Learning Place",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://datatech-learning-place.net/logo/logo-with-title.png",
        width: 820,
        height: 820,
        alt: "Datatech Learning Place ロゴ",
      },
    ],
  },
  twitter: {
    card: "summary"
  },
}

export default function Home() {
  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-lg sm:text-xl font-bold tracking-tight">
        Datatech Learning Place β版
      </h1>
      <div className="flex flex-col gap-2 md:text-base text-sm">
        <p>
          データエンジニアのための学習サイトです。<br />
        </p>
      </div>
      <div className="flex flex-col gap-2 pt-8">
        <h2 className="scroll-m-20 pb-2 text-lg sm:text-xl font-bold tracking-tight">
          コンテンツ
        </h2>
        <div className="flex flex-col lg:flex-row gap-6">
          <EnhancedCard 
            title="Quiz"
            description="データエンジニアリングのクイズ"
            imageSrc="https://datatech-learning-place.net/logo/quiz_card.jpg"
            href="/quiz"
          />
          <EnhancedCard 
            title="Text"
            description="データエンジニアリングのテキスト"
            imageSrc="https://datatech-learning-place.net/logo/book.png"
            href="/text"
          />
        </div>
        <p className="text-sm md:text-base pt-2">
          <a href="https://github.com/jimatomo/dtsb-learning-place" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">
            GitHub
          </a>
          でコンテンツ含めてソースを公開しております。
        </p>
      </div>
      <div className="flex flex-col gap-2 pt-8 md:text-base text-sm">
        <h2 className="scroll-m-20 pb-2 text-lg sm:text-xl font-bold tracking-tight">
          学習状況の保存
        </h2>
        <p>
          サインインすることで、学習状況の保存やお気に入り登録などの機能が利用できるようになります。<br />
          個人情報に関する取り扱いに関しては<a href="/global/privacy" className="underline hover:text-blue-500">プライバシーポリシー</a>をご参照ください。
        </p>
      </div>
    </div>
  );
}
