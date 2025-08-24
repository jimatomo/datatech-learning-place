import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { ListOrderedIcon } from "lucide-react";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "SQL", "Data Quality", "Data Modeling"],
    created_at: new Date("2025-08-27"),
    updated_at: new Date("2025-08-27"),

    // ----- quiz -----
    title: "dbtのsourcesの役割",
    question_jsx: <QuizQuestion />,
    options: {
      0: "モデルのSQLファイル内でソーステーブルを直接 {{ source('schema', 'table') }} の形式で参照できるようになり、コードの可読性が向上する。",
      1: "ソースデータに対してテスト（例：not_null, unique）を直接定義し、データ品質を早期に検証できる。",
      2: "dbt docs を生成した際に、ソースデータからモデルへのデータリネージ（依存関係）が自動的に可視化される。",
      3: "上記のすべて",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "dbt Docs: Sources", url: "https://docs.getdbt.com/docs/build/sources" },
      { title: "dbt Docs: Testing", url: "https://docs.getdbt.com/docs/build/tests" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        dbtプロジェクトにおいて、<code>sources.yml</code> を使用する主な利点として
        <strong className="text-green-600">最も適切なもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm space-y-4">
      <p className="font-semibold text-green-600">正解: 上記のすべて</p>
      <p>
        <code>sources.yml</code> は、dbtプロジェクトの入り口となるソースデータを定義するための非常に重要なファイルです。
        これを適切に設定することは、dbtプロジェクトの堅牢性、保守性、可読性を高めるためのベストプラクティスとされています。
      </p>

      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <ListOrderedIcon className="h-5 w-5 text-blue-600" />
          <p className="font-semibold text-blue-800 dark:text-blue-300">主な利点:</p>
        </div>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>コードの可読性と保守性の向上:</strong><br />
            <code>{'{{ source(\'schema\', \'table\') }}'}</code> というJinja関数を使用することで、
            SQLモデルからスキーマ名やテーブル名をハードコーディングするのを防ぎます。
            これにより、環境ごと（開発、本番など）に参照するソースを動的に切り替えることが容易になります。
          </li>
          <li>
            <strong>データ品質の早期検証:</strong><br />
            ソースデータの段階で、<code>not_null</code>, <code>unique</code>, <code>relationships</code>, <code>accepted_values</code> などの
            基本的なデータテストを定義できます。これにより、データ変換パイプラインのできるだけ早い段階でデータの品質問題を検知し、
            下流のモデルへの影響を防ぐことができます。
          </li>
          <li>
            <strong>データリネージの可視化:</strong><br />
            <code>dbt docs</code>コマンドでドキュメントを生成すると、<code>sources.yml</code>で定義されたソースから
            各dbtモデルへのデータの流れ（DAG: 有向非巡回グラフ）が自動的に可視化されます。
            これにより、プロジェクト全体のデータフローを直感的に理解し、影響範囲の調査などが容易になります。
          </li>
          <li>
            <strong>ソースデータの鮮度チェック:</strong><br />
            <code>freshness</code> プロパティを設定することで、ソースデータが期待通りに更新されているかを監視できます。
            <code>dbt source freshness</code>コマンドでチェックし、データ更新の遅延を警告させることが可能です。
          </li>
        </ul>
      </div>
      
      <p>
        これらの機能により、<code>sources.yml</code>はdbtプロジェクトにおける「信頼できる唯一の情報源」として機能し、
        データパイプライン全体のガバナンスを強化します。
      </p>
    </div>
  );
}