import { LinkCard } from '@/components/ui/link-card'
import { fetchOGPs } from '@/components/actions/fetchOGPs'

const url = "https://wiry-act-a67.notion.site/171d816a693580008c4cef8fbdc9b5ea";

// データを取得するための関数を改善
async function fetchData() {
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
  const data = await fetchData();

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
    </div>
  )
}
