import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Cortex", "AI", "Datatech News"],
    created_at: new Date("2025-02-23"),
    updated_at: new Date("2025-02-23"),

    // ----- quiz -----
    title: "Snowflake Cortex Agentの特徴について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: `構造化データと非構造化データの両方に対応するスケーラブルな処理と検索が可能になる`,
      1: `エンドツーエンドの統合ガバナンスにより、アクセスとプライバシーを制御しながらスケーラブルなソリューションを構築できる`,
      2: `Cortex Analyst、Cortex Search、AnthropicのClaudeモデル、AI Observabilityなどの機能を統合している`,
      3: `Sharepointとの統合は簡単には行えないので、別途ソリューションを検討する必要がある`
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "エンタープライズデータに必要なのはエージェント", url: "https://www.snowflake.com/ja/blog/ai-data-agents-snowflake-cortex/" },
      { title: "SharePoint 用 Snowflake コネクタについて", url: "https://docs.snowflake.com/en/connectors/unstructured-data-connectors/sharepoint/about" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflake Cortex Agentは、企業のデータ活用を支援するAIエージェントになりうる候補として注目を集めています。
        Cortex Agentの特徴について、以下の選択肢から<span className="text-red-500">間違っているもの</span>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflake Cortex Agentは、構造化データと非構造化データの両方を効率的に処理できる統合プラットフォームです。
      </p>
      <p className="pt-2">
        主な特徴として、エンドツーエンドの統合ガバナンス機能を備え、データのアクセス制御とプライバシー保護を
        実現しながら、スケーラブルなソリューションを構築することができます。
      </p>
      <p className="pt-2">
        誤りである選択肢は、「Sharepointとの統合は簡単には行えないので、別途ソリューションを検討する必要がある」という記述です。
        実際には、SharePoint用Snowflakeコネクタがパブリックプレビューとして提供されており、簡単な設定でSharepointとCortex Searchの統合が可能です。
      </p>
      <p className="pt-2">
        Cortex AgentはCortex Analyst、Cortex Search、AnthropicのClaudeモデル、AI Observabilityなどの
        機能を統合し、REST APIインターフェイスを通じて任意のアプリケーションに統合できる柔軟性を持っています。
        そのため、UIの選択肢は幅が広く、企業で利用しているチャットサービスなどのツールに統合することも可能です。
      </p>
      <p className="pt-2">
        このような特徴により、企業は既存のデータインフラストラクチャを活用しながら、
        高度なAI機能を安全かつ効率的に導入することができます。
      </p>
    </div>
  );
} 

