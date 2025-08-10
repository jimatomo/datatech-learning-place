import { Metadata } from "next"

export const metadata: Metadata = {
  title: "DTLP Terms",
  description: "Datatech Learning Placeの利用規約ページです。",
  openGraph: {
    title: "DTLP Terms",
    description: "Datatech Learning Placeの利用規約ページです。",
    url: "https://datatech-learning-place.net/global/terms",
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

export default function BillingPage() {
  return (
    <div>
      <p className="mb-6">本ページはDatatech Learning Placeの利用規約です。</p>

      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-3">利用規約</h2>
        <div className="space-y-4">
          <section>
            <h3 className="mb-2">1. フィードバックの投稿と削除</h3>
            <p className="text-sm">当サービスのクイズ等に付されたフィードバック（コメント）について、以下のポリシーを定めます。</p>
            <ul className="list-disc pl-6 mt-2 text-sm">
              <li>公序良俗に反する内容、誹謗中傷・差別的表現、スパム、違法または不適切と当サービスが判断する内容は、予告なく削除する場合があります。</li>
              <li>匿名のユーザー（ログインしていないユーザー）によるフィードバックは、他の利用者によって削除可能です。</li>
              <li>ログインユーザーによるフィードバックは、原則として本人のみが削除できます。</li>
            </ul>
          </section>

          <p className="mt-6">最終更新日：2025年8月10日</p>
        </div>
      </div>
    </div>
  )
}
