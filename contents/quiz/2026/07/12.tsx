import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Codex",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Cortex", "AI", "Datatech News"],
    created_at: new Date("2026-07-12"),
    updated_at: new Date("2026-07-12"),

    title: "Cortex Senseが提供する共有コンテキスト",
    question_jsx: <QuizQuestion />,
    options: {
      0: "企業データだけでなく、業務定義や運用知識もまとめ、AIエージェントが利用できる共有コンテキスト層を構成する。",
      1: "Snowflake CoWorkとSnowflake CoCoの双方が、組織固有の業務コンテキストを利用するための基盤となる。",
      2: "役割別の事前構築済みプラグインでは、スキル、業務ロジック、MCPコネクタを組み合わせられる。",
      3: "構造化テーブルだけを対象とする一般提供済みの検索機能であり、業務定義やダッシュボードなどの情報は利用しない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake - CoWork Powers the Agentic Enterprise",
        url: "https://www.snowflake.com/en/news/press-releases/snowflake-cowork-powers-the-agentic-enterprise-as-the-personal-agent-for-knowledge-workers-to-work-smarter/",
      },
      {
        title: "Snowflake for AI: Put Enterprise AI to Work",
        url: "https://www.snowflake.com/en/blog/snowflake-for-ai-enterprise-ai-platform/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        2026年にSnowflakeが発表したCortex Senseについて、
        <strong className="text-red-600">誤っているもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Cortex Senseは、企業データ、業務定義、運用知識をまとめ、AIエージェントが利用できる共有コンテキストを構成するための機能です。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          構造化テーブルだけを対象とする一般提供済み機能ではありません。公式情報ではプライベートプレビュー予定とされ、
          クエリ履歴、ダッシュボード、エージェントの実行履歴なども組織固有のコンテキスト形成に利用すると説明されています。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>CoWorkとCoCoが共通の業務コンテキストを利用できるようにします。</li>
        <li>事前構築済みプラグインは、役割に応じたスキル、業務ロジック、MCPコネクタを組み合わせます。</li>
      </ul>
    </div>
  );
}
