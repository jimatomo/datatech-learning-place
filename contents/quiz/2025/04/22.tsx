import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AI", "Cortex", "Snowflake", "Snowflake Advanced"],
    created_at: new Date("2025-04-22"),
    updated_at: new Date("2025-04-22"),

    // ----- quiz -----
    title: "Snowflake Cortexのクロスリージョン推論パラメータについて",
    question_jsx: <QuizQuestion />,
    options: {
      0: "CORTEX_ENABLED_CROSS_REGION はユーザーレベルまたはセッションレベルで設定できる。",
      1: "デフォルト値は 'ANY_REGION' であり、Snowflakeがサポートする任意のリージョンで推論リクエストが処理される。",
      2: "'DISABLED' に設定すると、推論リクエストはアカウントのデフォルトリージョンでのみ処理される。",
      3: "クロスリージョン推論を使用した場合、データ転送に追加の egress 料金が発生する。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Cross-region inference", url: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/cross-region-inference#label-use-cross-region-inference" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflake Cortexの機能を利用する際に、クロスリージョン推論を制御するパラメータ CORTEX_ENABLED_CROSS_REGION に関する説明として、<strong>正しいもの</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflake Cortexのクロスリージョン推論パラメータ CORTEX_ENABLED_CROSS_REGION について解説します。このパラメータは、LLM FunctionsなどのCortex機能において、推論リクエストがアカウントのデフォルトリージョン外で処理されることを許可するかどうかを制御します。
      </p>

      <p className="py-2 font-semibold text-green-600">正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>&apos;DISABLED&apos; に設定すると、推論リクエストはアカウントのデフォルトリージョンでのみ処理される。:</strong>
          <br />
          これは正しい説明です。CORTEX_ENABLED_CROSS_REGION パラメータのデフォルト値は &apos;DISABLED&apos; であり、この設定では推論リクエストはアカウントが存在するデフォルトのリージョン内でのみ処理されます。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-600">不正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>CORTEX_ENABLED_CROSS_REGION はユーザーレベルまたはセッションレベルで設定できる。:</strong>
          <br />
          これは誤りです。このパラメータはアカウントレベルでのみ設定可能であり、ACCOUNTADMIN ロールを持つユーザーのみが ALTER ACCOUNT コマンドを使用して変更できます。
        </li>
        <li className="pt-2">
          <strong>デフォルト値は &apos;ANY_REGION&apos; であり、Snowflakeがサポートする任意のリージョンで推論リクエストが処理される。:</strong>
          <br />
          これも誤りです。前述の通り、デフォルト値は &apos;DISABLED&apos; です。&apos;ANY_REGION&apos; に設定すると、クロスリージョン推論をサポートするSnowflakeの任意のリージョンでリクエストが処理される可能性があります。
        </li>
        <li className="pt-2">
          <strong>クロスリージョン推論を使用した場合、データ転送に追加の egress 料金が発生する。:</strong>
          <br />
          これも誤りです。クロスリージョン推論を使用しても、データ egress に関する追加料金は発生しません。ただし、LLMの使用に対するクレジットは通常通り消費され、これはリクエストを発行したリージョンで計上されます。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        CORTEX_ENABLED_CROSS_REGION パラメータは、Cortex機能の推論リクエストをどのリージョンで処理するかを制御するための重要な設定です。アカウントレベルでのみ設定可能で、デフォルトでは無効になっています。クロスリージョン推論を有効にする場合は、レイテンシや利用可能なリージョンについて考慮する必要があります。
      </p>
    </div>
  );
} 
