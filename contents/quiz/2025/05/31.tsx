import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
// import { CodeBlock } from "@/components/ui/code-block"; // 未使用のためコメントアウト

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Integration", "EAI", "ESB", "SOA", "CEP", "Data Management"],
    created_at: new Date("2025-05-31"),
    updated_at: new Date("2025-05-31"),

    // ----- quiz -----
    title: "データ統合戦略における主要技術の理解度チェック",
    question_jsx: <QuizQuestion />,
    options: {
      0: "EAI (Enterprise Application Integration) は、企業内に散在する様々な業務システムやアプリケーションを連携させ、データやプロセスを効率的に統合するための仕組み、またはそれを実現するシステムのことである。",
      1: "ESB (Enterprise Service Bus) は、SOAの概念に基づき、アプリケーション間の連携を仲介するハブとして機能し、メッセージルーティングやプロトコル変換などの機能を提供する。",
      2: "SOA (Service-Oriented Architecture) は、ビジネスプロセスを構成する機能を、特定のベンダーの製品や技術に依存せず、標準化されたインターフェースを通じて連携可能な「サービス」の集合体としてシステムを構築する設計思想である。",
      3: "CEP (Complex Event Processing) は、主にバッチ処理環境において、大量の履歴データから複雑なイベントパターンを分析し、ビジネスインサイトを抽出する技術である。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "データマネジメント知識体系ガイド 第二版", url: "https://www.amazon.co.jp/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E7%9F%A5%E8%AD%98%E4%BD%93%E7%B3%BB%E3%82%AC%E3%82%A4%E3%83%89-%E7%AC%AC%E4%BA%8C%E7%89%88-DAMA-International/dp/4296100491" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-2">
        データ統合戦略で利用される以下の技術に関する説明のうち、<strong className="text-red-500">間違っているもの</strong>を一つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        正解は <strong className="text-red-500">「CEP (Complex Event Processing) は、主にバッチ処理環境において、大量の履歴データから複雑なイベントパターンを分析し、ビジネスインサイトを抽出する技術である。」</strong> です。これは間違った説明です。
        CEPは、リアルタイムまたはニアリアルタイムで発生する多数のイベントストリームを処理・分析し、その中から意味のある複雑なパターン（複合イベント）を検出して即座に対応するための技術です。
        不正検知、リアルタイムマーケティング、センサーデータ分析などに活用されます。バッチ処理ではなく、ストリーム処理が中心となります。
      </p>
      <p className="py-2">
        各選択肢の解説：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>EAI (Enterprise Application Integration) は、企業内に散在する様々な業務システムやアプリケーションを連携させ、データやプロセスを効率的に統合するための仕組み、またはそれを実現するシステムのことである。：</strong>これは正しい記載です。
          EAIは、企業内のサイロ化されたシステム群を連携させ、ビジネスプロセス全体の効率化やデータの一貫性確保を目指します。
          主にアプリケーション間のリアルタイムに近いデータ交換や業務プロセスの連携・自動化に用いられます。
          これに対し、ETLは主に分析目的で大量データをDWH（データウェアハウス）等へバッチ処理で集約することに焦点を当てます。
          EAIはメッセージング、API連携、ワークフロー制御などを通じて、システム間の協調動作やより動的なプロセス連携を実現する点が異なります。
          ポイントツーポイント接続、ハブアンドスポーク型、バス型など様々なアーキテクチャパターンがあります。
        </li>
        <li className="pb-2">
          <strong>ESB (Enterprise Service Bus) は、SOAの概念に基づき、アプリケーション間の連携を仲介するハブとして機能し、メッセージルーティングやプロトコル変換などの機能を提供する。：</strong>これは正しい記載です。
          ESBは、サービス間の疎結合な連携を実現するための基盤ソフトウェアであり、メッセージング、サービスディスカバリ、トランスフォーメーション、セキュリティなどの機能を提供します。
        </li>
        <li className="pb-2">
          <strong>SOA (Service-Oriented Architecture) は、ビジネスプロセスを構成する機能を、特定のベンダーの製品や技術に依存せず、標準化されたインターフェースを通じて連携可能な「サービス」の集合体としてシステムを構築する設計思想である。：</strong>これは正しい記載です。
          SOAは、再利用可能で独立したサービスを組み合わせることで、柔軟性と拡張性の高いシステム構築を可能にします。
          Webサービス（SOAPやREST）などが代表的な実現技術です。
        </li>
      </ul>
      <p className="py-2">
        データ統合戦略においては、これらの技術を適切に理解し、ビジネス要件やシステムの特性に応じて最適なものを選択・組み合わせることが重要です。
      </p>
      <ul className="list-disc pl-4">
        <li className="py-1"><strong>EAI:</strong> 企業内の多様なアプリケーションを「つなぐ」ことに主眼。</li>
        <li className="py-1"><strong>ESB:</strong> SOA実現のための中核となる「バス」として、より標準化され柔軟な連携基盤を提供。</li>
        <li className="py-1"><strong>SOA:</strong> システム全体を「サービス」の組み合わせとして捉える設計思想。</li>
        <li className="py-1"><strong>CEP:</strong> 大量の「イベントの流れ」からリアルタイムに知見を得る技術。</li>
      </ul>
    </div>
  );
} 
