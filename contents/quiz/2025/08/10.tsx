import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake Copilot", "Snowflake Intelligence", "Cortex", "Datatech News"],
    created_at: new Date("2025-08-10"),
    updated_at: new Date("2025-08-11"),

    // ----- quiz -----
    title: "Snowflake CopilotとSnowflake Intelligence",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Snowflake Copilotは、Cortexを基盤とするLLM搭載アシスタントで、SQL生成などを支援する。Snowflake Intelligenceは、Copilotを含むより広範な分析・インサイト抽出機能群を指す。",
      1: "Snowflake IntelligenceはCopilotの旧称であり、現在ではすべての機能がCopilotに統合されている。",
      2: "Snowflake CopilotはSQL開発者向け、Snowflake Intelligenceはビジネスユーザー向けの全く別の製品である。",
      3: "Snowflake Copilotが外部の大規模言語モデルを利用するのに対し、Snowflake IntelligenceはSnowflake内部のモデルのみを利用する。",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Using Snowflake Copilot",
        url: "https://docs.snowflake.com/en/user-guide/snowflake-copilot",
      },
      {
        title: "Overview of Snowflake Intelligence",
        url: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/snowflake-intelligence",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>Snowflake CopilotとSnowflake Intelligenceの関係性について、最も正確に説明しているものを1つ選択してください。</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflake CopilotとSnowflake Intelligenceは密接に関連していますが、その役割と範囲が異なります。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong>Snowflake Copilot</strong>は、LLMを搭載したAIアシスタントで、自然言語での対話を通じてSQLクエリの生成、修正、最適化などを支援します。これはSnowsightに統合されており、主に開発者やデータアナリストの生産性を向上させるための具体的なツールです。
        </li>
        <li>
          <strong>Snowflake Intelligence</strong>は、CopilotやCortex Analyst、Cortex SearchなどのAI機能を組み合わせ、より広範なビジネスインサイトの発見やデータ活用を可能にする包括的なフレームワークまたは機能群を指します。構造化データと非構造化データを横断して分析し、自然言語で問いかけることでインサイトを得ることができます。
        </li>
      </ul>
      <p>
        したがって、「CopilotはIntelligenceの一部であり、IntelligenceはCopilotを含むより大きな概念である」という関係性が最も正確です。
      </p>
    </div>
  );
}


