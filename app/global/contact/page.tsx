import { LinkCard } from '@/components/ui/link-card'
import { fetchOGPs, OgpObjects } from '@/components/actions/fetchOGPs'

const url = "https://wiry-act-a67.notion.site/171d816a693580008c4cef8fbdc9b5ea";

// データを取得するための関数を追加
async function fetchData() {
  const res = await fetchOGPs(url);
  return { ogps: res.ogps || null };
}

// SSGのためのデータを取得
export default async function ContactPage() {
  const data = await fetchData(); // データを取得

  return (
    <div className="flex flex-col mx-auto p-2">
      <p className="pb-2">お問い合わせは下記の Notion Form からお願いします</p>
      <LinkCard
        url={url}
        ogps={data.ogps as OgpObjects}
      />
    </div>
  )
}
