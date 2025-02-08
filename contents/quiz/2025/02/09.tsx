import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Copilot"],
    created_at: new Date("2025-02-09"),
    updated_at: new Date("2025-02-09"),

    // ----- quiz -----
    title: "Snowflake Copilotの制限事項",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Copilotの権限は管理ができず全ユーザが利用可能な状態から変更ができない",
      1: "新規作成されたデータベース・スキーマ・テーブルの認識に3-4時間かかる",
      2: "Copilotはテーブル内のデータに直接アクセスすることはできない",
      3: "AWSのap-northeast-1リージョンでは利用不可",
    },
    answers: [1, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Using Snowflake Copilot", url: "https://docs.snowflake.com/en/user-guide/snowflake-copilot" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflake Copilotは、LLMを活用してデータ分析を支援するSnowflakeの新機能です。
        以下の選択肢の中から、Snowflake Copilotの説明として正しいものを選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflake Copilotの機能と制限に関する問題です。
      </p>
      <p className="pt-2">
        それぞれの選択肢について説明します：
      </p>
      <ul className="list-disc pl-6 pt-2">
        <li className="pb-2">
          Copilotへのアクセスは、COPILOT_USERデータベースロールを介して制限が可能です。
          デフォルトではPUBLICロールに付与されていますが、権限をはく奪することで制限をすることができます。
        </li>
        <li className="pb-2">
          新しく作成されたデータベース、スキーマ、テーブルは、Copilotのメタデータインデックスに反映されるまでに3-4時間かかります。
          これは、Copilotが正確な応答を提供するために必要な処理時間です。
        </li>
        <li className="pb-2">
          Copilotはテーブル内のデータに直接アクセスすることはできません。
          代わりに、メタデータ（テーブル名、カラム名、データ型など）のみを参照して応答を生成します。
          列の特定の値でフィルタリングしたい場合は、その値を提供する必要があります。
        </li>
        <li>
          AWS ap-northeast-1（東京）リージョンは、Snowflake Copilotがネイティブにサポートされているリージョンの1つです。
        </li>
      </ul>
      <p className="pt-2">
        Copilotは自然言語でデータ分析を支援する強力なツールですが、
        セキュリティとプライバシーを確保するため、適切な権限管理と利用制限が設けられています。
      </p>
      <p className="pt-2">
        この問題を作成時点の2025年2月上旬時点では無料で利用できるので、積極的に利用してユースケースを検討してみてください。
      </p>
    </div>
  );
} 

