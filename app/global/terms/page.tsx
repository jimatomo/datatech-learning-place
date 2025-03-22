import { Metadata } from "next"

export const metadata: Metadata = {
  title: "DTLP Terms",
  description: "Datatech Learning PlaceのTermsページです。プライバシーポリシーなどを記載しております。",
  openGraph: {
    title: "DTLP Terms",
    description: "Datatech Learning PlaceのTermsページです。プライバシーポリシーなどを記載しております。",
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
      <p className="mb-6">各種規約を記載しております。</p>

      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-3">プライバシーポリシー</h2>
        <div className="space-y-4">
          <section>
            <h3 className="mb-2">1. はじめに</h3>
            <p className="text-sm">
              当サービスは、お客様の個人情報の重要性を認識し、個人情報保護に関する法令及びその他の規範を遵守し、本プライバシーポリシーに従って個人情報を適切に取り扱います。
            </p>
          </section>

          <section>
            <h3 className="mb-2">2. 収集する情報</h3>
            <p className="text-sm">当サービスでは、以下の情報を収集することがあります：</p>
            <ul className="list-disc pl-6 mt-2 text-sm">
              <li>氏名、メールアドレスなどの連絡先情報</li>
              <li>ユーザーID、パスワードなどのアカウント情報</li>
              <li>IPアドレス、クッキー情報、アクセスログなどの利用状況に関する情報</li>
              <li>デバイス情報、ブラウザ情報などの技術的情報</li>
              <li>その他サービス提供に必要な情報（ユーザーの学習状況、お気に入り登録など）</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-2">3. 情報の利用目的</h3>
            <p className="text-sm">収集した情報は、以下の目的で利用します：</p>
            <ul className="list-disc pl-6 mt-2 text-sm">
              <li>サービスの提供・運営・改善</li>
              <li>ユーザーサポートの提供</li>
              <li>不正アクセス、不正利用の防止</li>
              <li>利用状況の分析、新機能の開発</li>
              <li>お知らせやマーケティング情報の配信</li>
              <li>法令に基づく対応</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-2">4. 情報の共有</h3>
            <p className="text-sm">当サービスは、以下の場合を除き、お客様の個人情報を第三者に提供することはありません：</p>
            <ul className="list-disc pl-6 mt-2 text-sm">
              <li>お客様の同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>サービス提供に必要な業務委託先に提供する場合（この場合、委託先に対し適切な管理を要求します）</li>
              <li>合併、会社分割など事業承継に伴い提供する場合</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-2">5. クッキーとトラッキング技術</h3>
            <p className="text-sm">
              当サービスでは、クッキーおよび類似の技術を使用して、お客様の利用状況に関する情報を収集することがあります。
              これらの技術により、サービスの利用状況の分析、サービスの改善、広告の最適化などを行います。
              ブラウザの設定からクッキーを無効化することも可能ですが、一部機能が利用できなくなる場合があります。
            </p>
          </section>

          <section>
            <h3 className="mb-2">6. 情報の保護</h3>
            <p className="text-sm">
              当サービスは、お客様の個人情報を不正アクセス、紛失、破壊、改ざん、漏洩などから保護するため、適切な安全対策を講じます。
              ただし、インターネット上の通信は完全に安全ではないことをご理解ください。
            </p>
          </section>

          <section>
            <h3 className="mb-2">7. 情報の管理</h3>
            <p className="text-sm">
              お客様は、当サービスが保有する個人情報について、開示、訂正、削除、利用停止などを請求することができます。
              請求方法については、下記のお問い合わせ先までご連絡ください。法令に基づき、ご請求に応じられない場合があります。
            </p>
          </section>

          <section>
            <h3 className="mb-2">8. プライバシーポリシーの変更</h3>
            <p className="text-sm">
              当サービスは、必要に応じて本プライバシーポリシーを変更することがあります。
              変更した場合は、サービス上でお知らせします。
              変更後も当サービスを継続して利用される場合、変更後のプライバシーポリシーに同意したものとみなします。
            </p>
          </section>

          <section>
            <h3 className="mb-2">9. お問い合わせ</h3>
            <p className="text-sm">
              本プライバシーポリシーに関するお問い合わせは、問い合わせフォームからお願いします。
            </p>
          </section>

          <p className="mt-6">最終更新日：2025年3月22日</p>
        </div>
      </div>
    </div>
  )
}
