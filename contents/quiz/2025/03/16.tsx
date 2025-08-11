import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "Data Lakehouse", "Datatech News", "S3 Tables", "SageMaker"],
    created_at: new Date("2025-03-16"),
    updated_at: new Date("2025-03-16"),

    // ----- quiz -----
    title: "Amazon SageMaker Lakehouseの特徴について",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Amazon SageMaker Lakehouseは、S3データレイクとRedshiftデータウェアハウスを統合し、データの単一コピーで分析とAI/MLを実行できる",
      1: "SageMaker Lakehouseでは、Apache Iceberg互換のツールのみが使用可能で、他のデータ形式やエンジンはサポートしていない",
      2: "運用データベースやアプリケーションからのデータ取り込みには、必ずETL処理が必要となる",
      3: "複数のRedshiftデータウェアハウス間でのデータ共有や結合が可能で、マルチウェアハウスアーキテクチャを構築できる",
    },
    answers: [0, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Amazon SageMaker Lakehouse", url: "https://aws.amazon.com/jp/sagemaker/lakehouse/" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Amazon SageMaker Lakehouseに関する説明として、正しい選択肢を全て選んでください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Amazon SageMaker Lakehouseは、以下の主要な特徴を持つサービスです：
      </p>
      <p className="py-2">
        <strong>統合されたデータアクセス</strong>：
        <ul className="list-disc pl-4">
          <li>S3データレイクとRedshiftデータウェアハウスの統合</li>
          <li>データの単一コピーでの分析とAI/ML実行が可能</li>
          <li>マルチウェアハウスアーキテクチャのサポート</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>柔軟なデータ統合</strong>：
        <ul className="list-disc pl-4">
          <li>ゼロETL統合による運用データのリアルタイム取り込み</li>
          <li>Apache Iceberg互換ツールに加え、様々なデータ形式やエンジンをサポート</li>
          <li>フェデレーテッドクエリ機能によるサードパーティデータソースへのアクセス</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>AWS Lake Formationをベースとしたきめ細やかなセキュリティとガバナンス</strong>：
        <ul className="list-disc pl-4">
          <li>きめ細かなアクセス制御</li>
          <li>組織全体での安全なデータ共有</li>
          <li>統合されたセキュリティポリシーの適用</li>
        </ul>
      </p>
      <p className="pt-2">
        これらの機能により、組織は効率的なデータ管理と分析を実現し、データドリブンな意思決定を促進することができます。
      </p>
      <p className="pt-2">
        ちなみに当サイトのバックエンドにもS3 Tablesを使用していて、SageMaker Lakehouseを利用して集計処理をAthenaなどで実行しています。
      </p>
    </div>
  );
} 
