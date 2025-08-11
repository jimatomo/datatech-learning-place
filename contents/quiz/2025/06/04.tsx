import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Cortex", "Data Modeling", "Snowflake"],
    created_at: new Date("2025-06-04"),
    updated_at: new Date("2025-06-04"),

    // ----- quiz -----
    title: "Snowflake AI_CLASSIFY関数の機能について",
    question_jsx: <QuizQuestion />,
    options: {
      0: "AI_CLASSIFY関数は、テキストデータのみを分類でき、画像データの分類はサポートしていない。",
      1: "AI_CLASSIFY関数を使用するために特別なロールは必要なく、どのロールでも利用可能である。",
      2: "AI_CLASSIFY関数は、指定したカテゴリのリストに基づいて、入力されたテキストや画像を分類する。",
      3: "AI_CLASSIFY関数は、最大10個のカテゴリまでしか指定できない。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "AI_CLASSIFY | Snowflake Documentation", url: "https://docs.snowflake.com/en/sql-reference/functions/ai_classify" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        SnowflakeのAI_CLASSIFY関数に関する説明のうち、<strong>正しいもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        AI_CLASSIFY関数は、ユーザーが指定したカテゴリのリストに基づいて、入力されたテキストデータまたは画像データを分類します。
      </p>

      <p className="py-2 font-semibold text-red-500">誤った選択肢：</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>AI_CLASSIFY関数は、テキストデータのみを分類でき、画像データの分類はサポートしていない。:</strong>
          <br />
          これは誤りです。AI_CLASSIFY関数はテキストと画像の両方の分類をサポートしています。ただし、画像分類が利用可能なリージョンには制限があります。
        </li>
        <li>
          <strong>AI_CLASSIFY関数を使用するために特別なロールは必要なく、どのロールでも利用可能である。:</strong>
          <br />
          これは誤りです。AI_CLASSIFY関数を使用するには、<code>SNOWFLAKE.CORTEX_USER</code> データベースロールが必要です。
        </li>
        <li>
          <strong>AI_CLASSIFY関数は、最大10個のカテゴリまでしか指定できない。:</strong>
          <br />
          これは誤りです。AI_CLASSIFY関数では、少なくとも1つ、最大で500個の一意なカテゴリを指定できます。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong className="text-emerald-500">AI_CLASSIFY関数は、指定したカテゴリのリストに基づいて、入力されたテキストや画像を分類する。:</strong>
          <br />
          これは正しい説明です。関数は入力データとカテゴリのリストを引数に取り、分類結果を返します。
        </li>
      </ul>

      <p className="pt-4">
        <strong>補足:</strong>
      </p>
      <p className="pt-2">
        AI_CLASSIFY関数は、Snowflake Cortexの強力なAI機能の一つです。
        この関数を利用することで、SQLを使って簡単にテキストや画像の分類タスクを実行できます。
        例えば、顧客からのフィードバックを感情（ポジティブ、ネガティブ、ニュートラル）で分類したり、
        製品画像をカテゴリ（例：衣類、電子機器、食品）に分類したりするのに役立ちます。
        さらに、オプションの引数でタスクの説明や例を提供することで、分類の精度を向上させることも可能です。
      </p>
    </div>
  );
} 
