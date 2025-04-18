import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "AI", "Snowflake Basic"],
    created_at: new Date("2025-04-15"),
    updated_at: new Date("2025-04-18"),

    // ----- quiz -----
    title: "Snowflake Cortex Analystについて",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "Cortex Analystは、デフォルトでMetaのLlama 3とMistral Largeモデルを使用しており、Azure OpenAIモデルもオプションで使用可能である",
      1: "Cortex Analystは、すべてのSnowflakeリージョンで利用可能で、クロスリージョン推論の設定は不要である",
      2: "Cortex Analystのセマンティックモデルは、YAMLファイルもしくはSemantic viewで定義され、ビジネスユーザーとデータベースの間のギャップを埋める役割を果たす",
      3: "Cortex Analystは、デフォルトで1分あたり100リクエストまで処理可能である",
    },
    answers: [0, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Cortex Analyst Overview", url: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst" },
      { title: "Overview of semantic views", url: "https://docs.snowflake.com/en/user-guide/views-semantic/overview" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflake Cortex Analystは、構造化データに対して自然言語で質問し、SQLを書かずに直接回答を得ることができる機能です。
        Cortex Analystに関する説明として、<strong>正しいもの全て</strong>を選択してください。
        （まだ新しい機能なので、すぐに記載が古くなる可能性があるので、古い場合はIssueを作成していただけると幸いです）
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflake Cortex Analystの特徴と制限について解説します。（作成日時点のEnglish版のドキュメントの情報をベースにしていますので、最新の情報とは異なる場合があるので違う場合はIssueを作成していただけると幸いです）
      </p>

      <p className="py-2 font-semibold text-green-600">正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>Cortex Analystは、デフォルトでMetaのLlama 3とMistral Largeモデルを使用しており、Azure OpenAIモデルもオプションで使用可能である:</strong>
          <br />
          これは正しい説明です。Cortex AnalystはデフォルトでSnowflakeがホストするMetaのLlama 3とMistral Largeモデルを使用しますが、ACCOUNTADMINロールがENABLE_CORTEX_ANALYST_MODEL_AZURE_OPENAIパラメータをTRUEに設定することで、Azure OpenAIモデルも使用可能になります。
        </li>
        <li className="pt-2">
          <strong>Cortex Analystのセマンティックモデルは、YAMLファイルで定義され、ビジネスユーザーとデータベースの間のギャップを埋める役割を果たす:</strong>
          <br />
          これも正しい説明です。セマンティックモデルは、データベーススキーマだけでは表現できないビジネスプロセスの定義やメトリクスの扱い方などの重要な知識を補完する役割を果たします。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-600">不正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>Cortex Analystは、すべてのSnowflakeリージョンで利用可能で、クロスリージョン推論の設定は不要である:</strong>
          <br />
          これは誤りです。Cortex Analystは特定のリージョン（AWS ap-northeast-1、AWS ap-southeast-2、AWS us-east-1、AWS us-west-2、AWS eu-central-1、AWS eu-west-1、Azure East US 2、Azure West Europe）でネイティブに利用可能です。他のリージョンでは、クロスリージョン推論の設定が必要です。
        </li>
        <li className="pt-2">
          <strong>Cortex Analystは、デフォルトで1分あたり100リクエストまで処理可能である:</strong>
          <br />
          これも誤りです。Cortex Analystはデフォルトで1分あたり20リクエストまでに制限されています。より高い制限が必要な場合は、Sales Engineerに連絡する必要があります。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        Cortex Analystは、複数のLLMモデルをサポートし、セマンティックモデルを使用して高精度な回答を提供します。
        ただし、リージョンの可用性やレート制限には注意が必要で、特定のリージョンではクロスリージョン推論の設定が必要となります。
      </p>
    </div>
  );
} 
