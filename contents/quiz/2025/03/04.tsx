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
    created_at: new Date("2025-03-04"),
    updated_at: new Date("2025-03-04"),

    // ----- quiz -----
    title: "Snowflakeのデータシェアリング機能について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "データプロバイダーは共有するデータのコピーを作成し、コンシューマーアカウントに転送する",
      1: "データ共有はSnowflakeアカウント間でのみ可能で、異なるリージョンやクラウドプラットフォーム間では共有できない",
      2: "共有されたデータに対してコンシューマーは読み取り専用アクセス権を持つ",
      3: "データ共有を使用するにはすべてのアカウントでBusiness Critical Editionが必要である",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "共有の作成と設定", url: "https://docs.snowflake.com/ja/user-guide/data-sharing-provider" },
      { title: "共有データの消費", url: "https://docs.snowflake.com/ja/user-guide/data-sharing-consumer" },
      { title: "Secure Data Sharing", url: "https://docs.snowflake.com/ja/user-guide/data-sharing-intro" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Snowflakeのデータシェアリング（Secure Data Sharing）機能について、正しい選択肢を選択してください。
      </span>
    </div>
  );
}

const sample_code_create_share = `-- 共有の作成例
CREATE SHARE sales_share;

-- 共有にデータベースオブジェクトへの権限を付与
GRANT USAGE ON DATABASE sales_db TO SHARE sales_share;
GRANT USAGE ON SCHEMA sales_db.public TO SHARE sales_share;
GRANT SELECT ON TABLE sales_db.public.monthly_sales TO SHARE sales_share;

-- コンシューマーアカウントを共有に追加
ALTER SHARE sales_share ADD ACCOUNTS = xy12345;`

const sample_code_consumer = `-- コンシューマー側での共有データベースの作成
CREATE DATABASE sales_shared FROM SHARE provider_account.sales_share;

-- 共有データへのアクセス
SELECT * FROM sales_shared.public.monthly_sales
WHERE sale_date >= DATEADD(month, -3, CURRENT_DATE())
ORDER BY sale_date DESC;`

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeのデータシェアリング（Secure Data Sharing）は、Snowflakeアカウント間でデータを安全に共有するための機能です。
        この機能を使用すると、データのコピーを作成したり転送したりすることなく、リアルタイムのデータへのアクセスを提供できます。
      </p>
      <p className="py-2">
        データシェアリングの主な特徴：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">データのコピーは作成されず、データプロバイダーのアカウントに保存されたデータへの安全なアクセスが提供されます</li>
        <li className="pb-2">コンシューマーは共有されたデータに対して読み取り専用アクセス権を持ちます</li>
        <li className="pb-2">異なるリージョンやクラウドプラットフォーム（AWS、Azure、GCP）間でもデータを共有できます</li>
        <li className="pb-2">データプロバイダーは共有するオブジェクト（テーブル、ビュー、UDFなど）を細かく制御できます</li>
        <li className="pb-2">Business Critical Editionは必須ではありませんが、Business Criticalアカウントから非Business Criticalアカウントへの共有には追加の設定が必要な場合があります</li>
      </ul>
      <p className="py-2">
        以下は、データプロバイダー側で共有を作成する例です：
      </p>
      <CodeBlock showLineNumbers={false} code={sample_code_create_share} />
      <p className="py-2">
        以下は、コンシューマー側で共有データにアクセスする例です：
      </p>
      <CodeBlock showLineNumbers={false} code={sample_code_consumer} />      
      <p className="pt-2">
        データシェアリングを使用すると、組織間でデータを安全かつ効率的に共有できます。データプロバイダーは共有するデータを完全に制御でき、
        コンシューマーは常に最新のデータにアクセスできます。また、コンシューマーはデータを保存するためのストレージコストを負担する必要がなく、
        クエリを実行するためのコンピューティングリソース（仮想ウェアハウス）のみを提供します。
      </p>
    </div>
  );
} 
