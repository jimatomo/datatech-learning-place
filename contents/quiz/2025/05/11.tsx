import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AI", "Datatech News", "dbt"],
    created_at: new Date("2025-05-11"),
    updated_at: new Date("2025-05-11"),

    // ----- quiz -----
    title: "dbt MCPサーバーの機能と特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "dbt MCPサーバーは、dbtプロジェクトのデータ資産の発見、dbt Semantic Layerを介したデータクエリ、dbtプロジェクトの実行という3つの主要な機能を提供する。",
      1: "dbt MCPサーバーは、dbt Cloudユーザーのみが利用可能で、dbt Coreユーザーは利用できない。",
      2: "dbt MCPサーバーは、LLMやAIエージェントがdbtプロジェクトのコンテキストを理解し、構造化データにアクセスするための標準的なインターフェースを提供する。",
      3: "dbt MCPサーバーは、本番環境のデータに直接アクセスすることを推奨しており、サンドボックス環境でのテストは不要である。",
    },
    answers: [1, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Introducing the dbt MCP Server", url: "https://docs.getdbt.com/blog/introducing-dbt-mcp-server" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        dbt MCPサーバーに関する記述として、<span className="text-red-500">間違っている</span>選択肢を全て選んでください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        以下の2つの選択肢が間違っています：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>「dbt MCPサーバーは、dbt Cloudユーザーのみが利用可能で、dbt Coreユーザーは利用できない。」</strong>：これは間違った記述です。
          dbt MCPサーバーは、dbt Cloudユーザーとdbt Coreユーザーの両方が利用可能です。記事では「No - there is functionality for both dbt Cloud and dbt Core users included in the MCP.」と明確に述べられています。
        </li>
        <li className="pb-2">
          <strong>「dbt MCPサーバーは、本番環境のデータに直接アクセスすることを推奨しており、サンドボックス環境でのテストは不要である。」</strong>：これも間違った記述です。
          記事では「Remember, as with any AI workflows, to make sure that you are taking appropriate caution in terms of giving these access to production systems and data. Consider starting in a sandbox environment or only granting read permissions.」と警告されており、
          むしろサンドボックス環境でのテストを推奨しています。
        </li>
      </ul>
      <p className="py-2">
        その他の選択肢は正しい記述です：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>「dbt MCPサーバーは、dbtプロジェクトのデータ資産の発見、dbt Semantic Layerを介したデータクエリ、dbtプロジェクトの実行という3つの主要な機能を提供する。」</strong>：
          記事では「There are three primary functions of the dbt MCP server today」として、これらの機能が明確に説明されています。
        </li>
        <li className="pb-2">
          <strong>「dbt MCPサーバーは、LLMやAIエージェントがdbtプロジェクトのコンテキストを理解し、構造化データにアクセスするための標準的なインターフェースを提供する。」</strong>：
          記事では「MCP is showing increasing promise as the standard for providing context to LLMs to allow them to function at a high level in real world, operational scenarios」と説明されており、
          dbt MCPサーバーがLLMやAIエージェントのための標準的なインターフェースとして機能することが述べられています。
        </li>
      </ul>
      <p className="pt-2">
        dbt MCPサーバーは、AIとデータの統合において重要な役割を果たす新しい技術であり、その利用にあたっては適切なセキュリティ考慮と段階的な導入が推奨されています。
      </p>
    </div>
  );
} 
