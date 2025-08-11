import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Basic", "Security"],
    created_at: new Date("2025-04-07"),
    updated_at: new Date("2025-04-07"),

    // ----- quiz -----
    title: "Snowflakeのリーダーアカウントに関する知識",
    question_jsx: <QuizQuestion />,
    options: {
      0: "リーダーアカウントは、プロバイダーアカウントによって作成・管理され、共有データのクエリのみが可能である",
      1: "リーダーアカウントは、新しいデータのアップロードや既存データの変更が可能である",
      2: "リーダーアカウントは、プロバイダーアカウントと同じSnowflake Editionを使用し、同じリージョンで作成される",
      3: "リーダーアカウントのユーザーは、Snowflakeとのライセンス契約に署名する必要がある",
    },
    answers: [0, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { 
        title: "リーダーアカウントを管理する - Snowflake Documentation", 
        url: "https://docs.snowflake.com/ja/user-guide/data-sharing-reader-create"
      },
      
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Snowflakeのリーダーアカウントに関する説明として、正しい選択肢を2つ選んでください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeのリーダーアカウントは、データ共有の重要なコンポーネントであり、以下の特徴を持ちます：
      </p>
      <p className="py-2">
        <strong>基本的な機能</strong>：
        <ul className="list-disc pl-4">
          <li>プロバイダーアカウントによって作成・管理される専用のSnowflakeアカウント</li>
          <li>共有データのクエリのみが可能で、データの変更はできない</li>
          <li>プロバイダーアカウントと同じSnowflake Editionを使用し、同じリージョンで作成される</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>主な制限事項</strong>：
        <ul className="list-disc pl-4">
          <li>データの変更やアップロードは不可（読み取り専用）</li>
          <li>データベースやスキーマの作成はできない</li>
          <li>データメトリック関数の設定は不可</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>利点</strong>：
        <ul className="list-disc pl-4">
          <li>コンシューマーはSnowflakeとのライセンス契約が不要</li>
          <li>設定や使用コストが不要（プロバイダーが負担）</li>
          <li>セキュリティとアクセス制御が一元管理される</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>主なユースケース</strong>：
        <ul className="list-disc pl-4">
          <li>データプロバイダーが顧客にデータを提供する場合</li>
          <li>企業グループ内やパートナー企業間でのデータ共有</li>
        </ul>
      </p>
    </div>
  );
} 
