import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "AI", "Datatech News"],
    created_at: new Date("2025-09-07"),
    updated_at: new Date("2025-09-07"),

    // ----- quiz -----
    title: "Snowflake MCP ServerとCursorの統合",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Cortex Search、Cortex Analyst、SQL実行、オブジェクト管理の4つの主要機能を提供している。",
      1: "現在のバージョンはクラウドベースで動作し、Snowflake側のサーバーで実行される。",
      2: "複数のCortex SearchやCortex Analystサービスを同時に設定することができる。",
      3: "SELECT文のみ許可するなど、SQL実行時の権限を細かく制御することが可能である。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake MCP Server で Cursor から高度なデータ分析を実現する",
        url: "https://zenn.dev/tsubasa_tech/articles/70ab5fb2b5ed99",
      },
      {
        title: "Snowflake Cortex AI Model Context Protocol (MCP) Server | GitHub",
        url: "https://github.com/Snowflake-Labs/mcp",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflake MCP Serverの技術的特徴に関する説明として、
        <strong className="text-red-600">誤っているもの</strong>
        を一つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">
        間違っている記述（正答）:
      </p>
      <p>
        「現在のバージョンはクラウドベースで動作し、Snowflake側のサーバーで実行される。」は誤りです。記事によると、現在のバージョンは<strong>ローカル実行型</strong>で、MCPクライアントによってローカルで起動される形式となっています。
      </p>
      <br />
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <b>主要機能:</b> Snowflake MCP Serverは、Cortex Search（非構造化データの検索）、Cortex Analyst（セマンティックモデルによる構造化データの分析）、SQL実行（LLMが生成したSQLの実行）、オブジェクト管理（データベース、スキーマ、テーブルなどの作成・削除・更新）の4つの機能を提供しています。
        </li>
        <li>
          <b>マルチサービス対応:</b> 複数のCortex SearchやCortex Analystサービスを同時に設定することができ、柔軟な構成が可能です。
        </li>
        <li>
          <b>権限制御:</b> SELECT文のみ許可するなど、SQL実行時の権限を細かく制御することが可能で、セキュアな実行環境を提供しています。
        </li>
      </ul>
    </div>
  );
}


