import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Advanced", "Security"],
    created_at: new Date("2025-03-18"),
    updated_at: new Date("2025-03-18"),

    // ----- quiz -----
    title: "Snowflakeのデータ共有に関する権限の移譲について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "ACCOUNTADMINロールのみがデータ共有の権限を持つことができ、他のロールへの権限移譲は不可能である",
      1: "ACCOUNTADMINロールは、CREATE SHARE権限を他のロールに付与することができ、それにより他のロールもデータ共有を作成・管理できる",
      2: "データ共有の権限は、データベースロールにのみ付与することができ、アカウントレベルのロールには付与できない",
      3: "データ共有の権限は、SECURITYADMINロールにのみ付与することができ、他のロールには付与できない",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "ACCOUNTADMIN 以外のロールによる、データ共有タスクの実行の有効化", url: "https://docs.snowflake.com/ja/user-guide/security-access-privileges-shares" },
      { title: "ポリシーで保護されたデータを共有する", url: "https://docs.snowflake.com/ja/user-guide/data-sharing-policy-protected-data" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeでは、データ共有の作成と管理に関する権限を適切に管理することが重要です。
        Snowflakeのデータ共有に関する権限の移譲について、正しい説明はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeでは、データ共有の権限移譲には主に2つの方法があります：
      </p>

      <p className="py-2">
        1. データベースロールへの権限付与：
      </p>
      <CodeBlock 
        code={`USE ROLE ACCOUNTADMIN;
GRANT CREATE DATABASE ROLE ON DATABASE database_name TO SYSADMIN;
GRANT CREATE SHARE ON ACCOUNT TO SYSADMIN;`} 
        showLineNumbers={false}
      />
      <p className="py-2">
        この方法では、以下の権限が必要です：
      </p>
      <ul className="list-disc pl-6">
        <li>CREATE DATABASE ROLE権限：データベースロールを作成するための権限</li>
        <li>CREATE SHARE権限：データ共有を作成するための権限</li>
      </ul>

      <p className="py-2">
        2. データ共有への権限付与：
      </p>
      <CodeBlock 
        code={`USE ROLE ACCOUNTADMIN;
GRANT OWNERSHIP ON SHARE share_name TO ROLE role_name;`} 
        showLineNumbers={false}
      />
      <p className="py-2">
        この方法では、以下の点に注意が必要です：
      </p>
      <ul className="list-disc pl-6">
        <li>データ共有のOWNERSHIP権限が必要です</li>
        <li>権限を付与されたロールは、そのデータ共有の完全な管理権限を持つことになります</li>
        <li>Business CriticalアカウントからBusiness Critical以外のアカウントへの共有には、追加の設定が必要です</li>
      </ul>

      <p className="py-2">
        マスキングポリシーなどで保護されたデータを共有するときはdatabase roleを利用する共有の仕方が望ましいです。
      </p>
    </div>
  );
} 
