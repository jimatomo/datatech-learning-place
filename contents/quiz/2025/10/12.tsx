import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Cortex", "Infrastructure", "Datatech News"],
    created_at: new Date("2025-10-14"),
    updated_at: new Date("2025-10-14"),

    // ----- quiz -----
    title: "Snowflake Managed MCP Serverの特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Snowflakeが運用・スケールを担うMCP Serverを利用でき、ホスティング管理は不要である",
      1: "Cortex Agentsのツールとして登録し、外部のMCPクライアントからCortex機能を安全に呼び出せる（OAuth/RBACで統制）",
      2: "任意のカスタムMCPサーバーをソースコードのアップロードだけでSnowflake内に直接デプロイできる（自前ホスティング不要）",
      3: "対応プロバイダは限定的で、独自機能が必要な場合は自前でMCPサーバーをホストして接続する必要がある",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake Docs - Cortex Agents MCP", url: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        <a
          className="text-blue-500 hover:underline"
          href="https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp"
          target="_blank"
          rel="noopener noreferrer"
        >
          SnowflakeのManaged MCP Server（Model Context Protocol）の説明
        </a>
        に関して、<strong className="text-red-600">誤っているもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>以下が各選択肢の説明です：</p>
      <p className="font-semibold text-red-500 pt-2">誤っている記述（解答）:</p>
      <p>
        「任意のカスタムMCPサーバーをソースコードのアップロードだけでSnowflake内に直接デプロイできる」という点は誤りです。
        Managed MCP ServerはSnowflakeが提供・運用するサーバーを利用する仕組みで、独自実装のMCPは基本的に<strong>自前でホスト</strong>し、
        Cortex Agentsから接続・利用します。
      </p>

      <p className="font-semibold text-green-600 pt-2">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>Snowflakeが運用とスケールを担うため、ユーザーはサーバーのホスティング管理が不要になります。</li>
        <li>Managed MCP ServerをCortex Agentsのツールとして登録し、外部のMCPクライアントからSnowflakeのCortex機能を安全に呼び出せます（OAuth/RBACで統制）。</li>
        <li>対応プロバイダは限定され、独自機能が必要な場合は自前でMCPサーバーを実装・ホストして接続します。</li>
      </ul>
    </div>
  );
}
