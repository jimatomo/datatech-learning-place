import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Cortex", "Snowflake", "Snowflake Advanced"],
    created_at: new Date("2025-02-18"),
    updated_at: new Date("2025-02-18"),

    // ----- quiz -----
    title: "Snowflake Cortex Analystの特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Cortex Analystは、デフォルトでAzure OpenAIのGPTモデルのみを使用する",
      1: "Cortex Analystは、顧客データを使用してモデルの訓練や微調整を行う",
      2: "Cortex Analystは、セマンティックモデルを使用してビジネスプロセスやメトリクスの理解を深める",
      3: "Cortex Analystを使用すると、ユーザーは自然言語で質問し、正確な回答を受け取ることができる",
    },
    answers: [2, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Cortex Analyst", url: "https://docs.snowflake.com/ja/user-guide/snowflake-cortex/cortex-analyst" },
      { title: "Your Enterprise Data Needs an Agent", url: "https://www.snowflake.com/en/blog/ai-data-agents-snowflake-cortex/" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflake Cortex Analystは、LLM-poweredな機能で、Snowflakeの構造化データに基づいて
        ビジネス上の質問に確実に回答できるアプリケーションの作成を支援します。
        Cortex Analystの特徴について、以下の説明のうち正しいものを選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflake Cortex Analystの主要な機能と特徴に関する問題です。
      </p>
      <p className="pt-2">
        それぞれの選択肢について説明します：
      </p>
      <ul className="list-disc pl-6 pt-2">
        <li className="pb-2">
          デフォルトでは、Cortex AnalystはMeta LlamaとMistralモデルを搭載しています。
          オプションでAzure OpenAI GPTモデルへのアクセス権を付与することもできますが、
          デフォルトではAzure OpenAIモデルのみを使用するわけではありません。
          また、2025年2月時点では、Claude 3.5 Sonnetも利用できるロードマップが示唆されています。
        </li>
        <li className="pb-2">
          Cortex Analystは、顧客データに関する訓練は一切行いません。顧客ベース全体で
          使用できるようにするためのモデルの訓練や微調整に、顧客データを使用することは
          ありません。
        </li>
        <li className="pb-2">
          Cortex Analystは、セマンティックモデルを使用して、データベーススキーマだけでは
          不足しがちなビジネスプロセスの定義やメトリクスの取り扱いといった重要な知識を
          補完します。これにより、より正確なテキストからSQLへの変換が可能になります。
        </li>
        <li>
          Cortex Analystの主要な特徴の一つは、ユーザーがSQLを記述することなく、
          自然言語で質問し、直接回答を受け取ることができる点です。これにより、
          ビジネスユーザーやSQLを使用しないユーザーでも簡単にデータ分析が可能になります。
        </li>
      </ul>
      <p className="pt-2">
        Cortex Analystは、高精度のテキストからSQLへの応答を生成する完全管理型の
        エージェント型AIシステムとして、ビジネスチームへの高精度なセルフサービス
        会話型分析の提供を加速することができます。
      </p>
    </div>
  );
} 

