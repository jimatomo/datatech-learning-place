export default function Home() {
  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-extrabold tracking-tight">
        Datatech Learning Place (alpha)
      </h1>
      <p>
        このサイトは、データエンジニアリングに関する学習を目的として作成されたサイトです。
        今後コンテンツを追加予定です。
      </p>
      <ul className="list-disc pl-6">
        <li>ユーザの認証機能（学習状況をクラウド側に保存できるようにする）</li>
        <li>学習の進捗を分析するダッシュボード機能</li>
        <li>データアプリケーションを一から構築するテキスト</li>
        <li>広告枠の募集（個別問い合わせ）</li>
        <li>組織管理機能（有償予定）</li>
      </ul>
    </div>
  );
}
