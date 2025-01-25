import { Metadata } from "next"
import { LinkCard } from '@/components/ui/link-card'
import { fetchOGPs } from '@/components/actions/fetchOGPs'

const url = "https://wiry-act-a67.notion.site/171d816a693580008c4cef8fbdc9b5ea";
const xUrl = "https://x.com/jimatomo93";

export const metadata: Metadata = {
  title: "DTLP Contact",
  description: "Datatech Learning PlaceのContactページです。お問い合わせに関する情報を記載しています。",
  openGraph: {
    title: "DTLP Contact",
    description: "Datatech Learning PlaceのContactページです。お問い合わせに関する情報を記載しています。",
    url: "https://datatech-learning-place.net/global/contact",
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

// データを取得するための関数を改善
async function fetchData(url: string) {
  try {
    const res = await fetchOGPs(url);
    if (!res || !res.ogps) {
      throw new Error('OGPデータの取得に失敗しました');
    }
    return { ogps: res.ogps };
  } catch (error) {
    console.error('データ取得エラー:', error);
    return { ogps: null };
  }
}

export default async function ContactPage() {
  const data = await fetchData(url);

  if (!data.ogps) {
    return (
      <div className="flex flex-col mx-auto p-2">
        <p className="pb-2">お問い合わせは下記のURLからお願いします</p>
        <a href={url} className="text-blue-500 hover:underline">{url}</a>
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-auto p-2">
      <p className="pb-2">お問い合わせは下記の Notion Form からお願いします</p>
      <LinkCard
        url={url}
        ogps={data.ogps}
      />
      <p className="pt-4">最新のお知らせは以下のXで告知します</p>
      <a href={xUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{xUrl}</a>
      <p className="pt-4">不具合があればIssueを立てていただけると幸いです</p>
      <a href="https://github.com/jimatomo/datatech-learning-place/issues" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub Issue</a>
    </div>
  )
}
