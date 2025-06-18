import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "AI", "Business Intelligence", "Datatech News"],
    created_at: new Date("2025-06-15"),
    updated_at: new Date("2025-06-15"),

    // ----- quiz -----
    title: "Snowflake Intelligenceの特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ビジネスユーザーが自然言語を用いてデータと対話し、タイムリーにインサイトを得られるように支援する。",
      1: "データチームがアドホックなリクエスト対応に追われる現状を改善し、ビジネスとのギャップを埋めることを目的としている。",
      2: "Snowflake Cortex AIを活用し、構造化・非構造化データを横断してインサイトを引き出す。",
      3: "利用には、外部の主要な大規模言語モデル（LLM）との別途契約が必須となる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title:
          "Snowflake Intelligence:データと対話し、真のビジネスインサイトを獲得",
        url: "https://www.snowflake.com/ja/blog/intelligence-snowflake-summit-2025/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Snowflakeが発表したSnowflake
        Intelligenceに関する記述として、
        <span className="text-red-500">間違っている</span>ものはどれですか？
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        選択肢の中で間違っているものは次のとおりです。
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>
            「利用には、外部の主要な大規模言語モデル（LLM）との別途契約が必須となる。」
          </strong>
          ：これは間違った記述です。Snowflake IntelligenceはSnowflake
          Cortex
          AIの機能を基盤としており、ユーザーはプラットフォームに組み込まれたLLMを活用できます。別途外部のLLMと契約する必要はありません。
        </li>
      </ul>
      <p className="py-2">その他の選択肢は正しい記述です：</p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>
            「ビジネスユーザーが自然言語を用いてデータと対話し、タイムリーにインサイトを得られるように支援する。」
          </strong>
          ：これは正しい記述です。Snowflake
          Intelligenceは、ビジネスユーザーがダッシュボードやレポートを介さず、自然言語での対話を通じて直接データから回答を得られるように設計されています。
        </li>
        <li className="pb-2">
          <strong>
            「データチームがアドホックなリクエスト対応に追われる現状を改善し、ビジネスとのギャップを埋めることを目的としている。」
          </strong>
          ：これは正しい記述です。ビジネスユーザー自身がインサイトを得られるようになることで、データチームはアドホックなリクエストから解放され、より戦略的な業務に集中できるようになります。
        </li>
        <li className="pb-2">
          <strong>
            「Snowflake Cortex
            AIを活用し、構造化・非構造化データを横断してインサイトを引き出す。」
          </strong>
          ：これは正しい記述です。Snowflake
          Intelligenceは、Cortex
          AIを活用して、構造化データだけでなく非構造化データも理解し、それに基づいた行動を促すAIエージェントのように機能します。
        </li>
      </ul>
      <p className="pt-2">
        Snowflake
        Intelligenceは、組織内の誰もがデータと対話し、信頼できるインサイトを迅速に得られるようにすることで、データ活用のあり方を根本から変えることを目指しています。
      </p>
    </div>
  );
} 
