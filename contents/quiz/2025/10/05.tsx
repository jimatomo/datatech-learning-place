import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Architecture", "Performance", "Data Integration", "Datatech News"],
    created_at: new Date("2025-10-05"),
    updated_at: new Date("2025-10-05"),

    // ----- quiz -----
    title: "Stripe BillingのリアルタイムOLAP基盤の構成",
    question_jsx: <QuizQuestion />,
    options: {
      0: "イベント駆動のストリーミングで更新をFlinkの状態としてインクリメンタル管理し、低遅延化した",
      1: "Apache Pinot v2のウィンドウ集計により事前集計を省き、複雑な時系列集計をダッシュボードで高速に実行する",
      2: "メトリクス定義を変更する際は整合性のためダッシュボードを停止し、リアルタイム処理も一時停止する必要がある",
      3: "初期状態はSparkで履歴を再計算して生成し、Flinkの状態へパッチ適用することでローリング移行を行った",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "How we built it: Real-time analytics for Stripe Billing", url: "https://stripe.com/blog/how-we-built-it-real-time-analytics-for-stripe-billing" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Stripeが公開したリアルタイム課金分析（Billing）のOLAP基盤に関する説明
        <a className="text-blue-500 hover:underline" href="https://stripe.com/blog/how-we-built-it-real-time-analytics-for-stripe-billing" target="_blank" rel="noopener noreferrer">
          How we built it: Real-time analytics for Stripe Billing
        </a>
        として、
        <strong className="text-red-600">誤っているもの</strong>を1つ選択してください。
        このクイズは一般的なデータエンジニアリングにも通用する設計上の学び（イベント駆動、状態管理、事前集計の有無、バックフィルと互換性維持など）に焦点を当てています。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>以下が各選択肢の説明です：</p>
      <p className="font-semibold text-red-500 pt-2">間違っている記述（正答）:</p>
      <p>
        メトリクス定義の変更時にダッシュボードやストリーミング処理を<strong>停止する必要はありません</strong>。履歴の再計算はバッチで進行しつつ、
        新着イベントは旧定義でリアルタイム処理し、Flink側に一時バッファリングします。完了後に再計算結果で状態をパッチし、
        バッファを再適用してシームレスに切り替えます（可用性と一貫性の両立）。
      </p>

      <p className="font-semibold text-green-600 pt-2">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong>イベント駆動 + 状態管理</strong>: Apache Flink の<strong>状態</strong>にサブスクリプション履歴を高圧縮で保持し、
          新規イベントをインクリメンタル適用することで、更新レイテンシを約15分まで短縮します。
        </li>
        <li>
          <strong>事前集計の撤廃</strong>: Apache Pinot v2 の<strong>ウィンドウ集計</strong>や結合機能により、
          事前集計なしでダッシュボードの時系列集計を高速に実行します（多くのクエリが300ms未満）。
        </li>
        <li>
          <strong>バックフィルと両利き運用</strong>: 長期利用顧客の初期状態は Spark のバッチ処理で並列再計算し、
          フラットファイル出力を検証・エクスポートにも活用。Flink の状態へパッチ適用してストリーミングに滑らかに統合します。
        </li>
      </ul>

      <p>一般的なデータエンジニアリングへの示唆：</p>
      <ul className="list-disc pl-4 py-2">
        <li>オフライン事前集計は俊敏性を阻害しやすい。可能なら<strong>オンライン集計</strong>へ移行する。</li>
        <li><strong>状態フルなストリーミング</strong>で履歴を圧縮保持し、増分適用で再計算を避ける。</li>
        <li><strong>定義変更</strong>（スキーマ/ビジネスルール）は、バックフィルとリアルタイムを分離して可用性を維持しつつ後で整合させる。</li>
      </ul>
    </div>
  );
}


