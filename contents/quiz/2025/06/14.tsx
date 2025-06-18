import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
// import { CodeBlock } from "@/components/ui/code-block"; // 未使用のためコメントアウト

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Orchestration", "Workflow Management", "ETL", "Data Management"],
    created_at: new Date("2025-06-14"),
    updated_at: new Date("2025-06-14"),

    // ----- quiz -----
    title: "データオーケストレーションの理解度チェック",
    question_jsx: <QuizQuestion />,
    options: {
      0: "複数のデータ処理タスクの依存関係を定義し、実行スケジュールを管理・自動化するプロセスである。",
      1: "大量のストリーミングデータをリアルタイムで処理し、分析するためのフレームワークを指す。",
      2: "物理的なデータ移動を伴わずに、複数の異種データソースを統合し、単一の仮想的なデータビューを提供する技術である。",
      3: "単一のデータベース内で、クエリの実行計画を最適化する機能のことである。",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "効率的なデータ運用の鍵⁠⁠、データオーケストレーションとは何か", url: "https://gihyo.jp/article/2024/07/what-is-a-dataorchestration" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-2">
        データオーケストレーション（Data Orchestration）に関する説明のうち、<strong className="text-green-500">最も適切なもの</strong>を一つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        正解は <strong className="text-green-500">「複数のデータ処理タスクの依存関係を定義し、実行スケジュールを管理・自動化するプロセスである。」</strong> です。
      </p>
      <p className="py-2">
        データオーケストレーションは、複雑なデータワークフロー（パイプライン）を構成する個々のタスク（例: データの抽出、変換、ロード、モデルの学習、レポート生成など）の実行順序、依存関係、エラーハンドリングを一元的に管理し、自動化する役割を担います。これにより、データパイプラインの信頼性、保守性、可観測性が向上します。代表的なツールにApache Airflow, Prefect, Dagsterなどがあります。
      </p>
      <p className="py-2">
        各選択肢の解説：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>大量のストリーミングデータをリアルタイムで処理し、分析するためのフレームワークを指す。：</strong>これは誤りです。
          この説明は、Apache FlinkやKafka Streamsなどのストリーム処理エンジンの役割を指しています。データオーケストレーションツールがストリーム処理ジョブの実行をトリガーすることはありますが、リアルタイムのデータ処理そのものを行うわけではありません。
        </li>
        <li className="pb-2">
          <strong>物理的なデータ移動を伴わずに、複数の異種データソースを統合し、単一の仮想的なデータビューを提供する技術である。：</strong>これは誤りです。
          この説明は、データ仮想化（Data Virtualization）やデータフェデレーションに関するものです。データオーケストレーションは、実際にデータを移動・処理するパイプラインの管理に焦点を当てます。
        </li>
        <li className="pb-2">
          <strong>単一のデータベース内で、クエリの実行計画を最適化する機能のことである。：</strong>これは誤りです。
          これはデータベース管理システム（DBMS）が持つクエリオプティマイザの機能です。データオーケストレーションは、データベースの内部処理ではなく、複数のシステムやサービスにまたがる、より高レベルなタスクの連携と自動化を扱います。
        </li>
      </ul>
      <p className="py-2">
        <strong>まとめ:</strong>
      </p>
      <p className="py-2">
        データオーケストレーションは、データエンジニアリングのバックボーンであり、モダンなデータスタックにおいて不可欠な要素です。手作業でのスクリプト実行やcronによる単純なスケジューリングとは異なり、タスク間の複雑な依存関係の管理、再試行やアラートなどの高度なエラーハンドリング、実行状況の可視化といった機能を提供し、信頼性の高いデータパイプラインの運用を実現します。
      </p>
    </div>
  );
} 
