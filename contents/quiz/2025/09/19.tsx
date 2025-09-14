import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "AI", "Cortex", "SQL", "Data Application"],
    created_at: new Date("2025-09-19"),
    updated_at: new Date("2025-09-19"),

    // ----- quiz -----
    title: "Snowflake AI_SENTIMENT関数の日本語利用における考慮点",
    question_jsx: <QuizQuestion />,
    options: {
      0: "日本語は公式サポート対象であり、アスペクトラベルも日本語で指定できる。",
      1: "日本語テキストは分析できず、常にエラーが返されるため利用できない。",
      2: "アスペクトベース分析を行う際、アスペクトラベルを英語で指定することが推奨される。",
      3: "従来のENTITY_SENTIMENT関数の方が、日本語分析の精度が高い。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake AI_SENTIMENT 関数を用いた高精度な感情分析",
        url: "https://zenn.dev/tsubasa_tech/articles/972c86d2ac2702",
      },
      {
        title: "AI_SENTIMENT (Snowflake Cortex) - Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/ai-sentiment",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflake CortexのAI_SENTIMENT関数を日本語テキストに対して使用する際の考慮事項として、
        <strong className="text-green-600">最も適切なもの</strong>
        を選択してください。（問題作成時の言語のサポート状態を前提としています）
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        AI_SENTIMENT関数は、日本語テキストの感情分析に高い精度で対応可能ですが、いくつかの考慮点があります。
      </p>
      <br />
      <p className="font-semibold text-green-600">正しい記述:</p>
      <p>
        「アスペクトベース分析を行う際、アスペクトラベルを英語で指定することが推奨される」は正しい記述です。日本語コンテンツ自体は高精度で理解されますが、アスペクト（評価の側面、例: Price, Quality）は英語のラベルを使用することで、より正確な分析結果が期待できます。
      </p>
      <br />
      <p className="font-semibold text-red-500">間違っている記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <b>日本語の公式サポート:</b>
          2025年9月現在、AI_SENTIMENT関数は多言語に対応していますが、日本語はまだ正式なサポート対象言語には含まれていません。しかし、非公式ながらも高い精度で動作することが報告されています。
        </li>
        <li>
          <b>日本語テキストの分析可否:</b>
          前述の通り、日本語テキストは分析可能です。エラーは返されません。
        </li>
        <li>
          <b>ENTITY_SENTIMENTとの比較:</b>
          AI_SENTIMENT関数は、従来のENTITY_SENTIMENT関数と比較して大幅に精度が向上した、新しい感情分析機能です。
        </li>
      </ul>
    </div>
  );
}

