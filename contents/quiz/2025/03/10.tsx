import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Basic"],
    created_at: new Date("2025-03-10"),
    updated_at: new Date("2025-03-10"),

    // ----- quiz -----
    title: "Snowflakeのストアドプロシージャの所有者権限と呼び出し元権限について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "所有者権限のストアドプロシージャは、呼び出し元の権限ではなく所有者の権限で実行される",
      1: "呼び出し元権限のストアドプロシージャは、呼び出し元のセッション変数やセッションパラメータにアクセスできる",
      2: "所有者権限のストアドプロシージャを呼び出すには、呼び出し元はそのプロシージャがアクセスするテーブルに対する権限を持っている必要がある",
      3: "所有者権限のストアドプロシージャでは、呼び出し元はプロシージャのソースコードを閲覧できる",
    },
    answers: [0, 1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "ストアドプロシージャの概要", url: "https://docs.snowflake.com/ja/developer-guide/stored-procedure/stored-procedures-overview" },
      { title: "呼び出し元権限と所有者権限のストアドプロシージャについて", url: "https://docs.snowflake.com/ja/developer-guide/stored-procedure/stored-procedures-rights" },
      { title: "ストアドプロシージャの使用", url: "https://docs.snowflake.com/ja/developer-guide/stored-procedure/stored-procedures-usage" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Snowflakeのストアドプロシージャの所有者権限と呼び出し元権限について、正しい選択肢を選択してください。
      </span>
    </div>
  );
}

const sample_code_owner = `-- 所有者権限のストアドプロシージャの例
CREATE OR REPLACE PROCEDURE delete_old_data()
  RETURNS VARCHAR
  LANGUAGE SQL
  EXECUTE AS OWNER
  AS
  BEGIN
    DELETE FROM sales_data WHERE sale_date < DATEADD(month, -12, CURRENT_DATE());
    RETURN 'Old data deleted successfully';
  END;`

const sample_code_caller = `-- 呼び出し元権限のストアドプロシージャの例
CREATE OR REPLACE PROCEDURE get_user_session_info()
  RETURNS VARCHAR
  LANGUAGE SQL
  EXECUTE AS CALLER
  AS
  BEGIN
    RETURN 'Current user: ' || CURRENT_USER() || ', Session ID: ' || CURRENT_SESSION();
  END;`

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeのストアドプロシージャには、「所有者権限（owner）」と「呼び出し元権限（caller）」の2つの実行モードがあります。
        これらの違いを理解することは、適切なセキュリティモデルを設計する上で重要です。
      </p>
      <p className="py-2">
        所有者権限と呼び出し元権限の主な違い：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">所有者権限のストアドプロシージャは、呼び出し元の権限ではなく所有者の権限で実行されます。これにより、プロシージャの所有者は、呼び出し元が直接アクセスできないデータに対する操作を委任できます。</li>
        <li className="pb-2">呼び出し元権限のストアドプロシージャは、呼び出し元のセッション変数やセッションパラメータにアクセスできます。これは、呼び出し元の環境に依存するプロシージャを作成する場合に便利です。</li>
        <li className="pb-2">所有者権限のストアドプロシージャを呼び出すには、呼び出し元はそのプロシージャに対するUSAGE権限と、プロシージャが含まれるデータベースとスキーマに対するUSAGE権限が必要ですが、プロシージャがアクセスするテーブルに対する権限は必要ありません。</li>
        <li className="pb-2">所有者権限のストアドプロシージャでは、呼び出し元はプロシージャのソースコードを閲覧できません（呼び出し元が所有者でない限り）。これにより、ビジネスロジックを保護できます。</li>
        <li className="pb-2">呼び出し元権限のストアドプロシージャは、呼び出し元が直接アクセスできるオブジェクトにのみアクセスできます。</li>
      </ul>
      <p className="py-2">
        以下は、所有者権限のストアドプロシージャの例です：
      </p>
      <CodeBlock showLineNumbers={false} code={sample_code_owner} />
      <p className="py-2">
        以下は、呼び出し元権限のストアドプロシージャの例です：
      </p>
      <CodeBlock showLineNumbers={false} code={sample_code_caller} />      
      <p className="pt-2">
        一部のテーブルの削除の運用を委任したい際に所有者の権限が必要なのでそのロールを渡すのが理想であるが、
        そのロールの権限が強すぎる場合はそのままロールを渡すわけにはいかない場面も多いです。
        そんな時に所有者権限で実行可能なストアドプロシージャで渡してあげると安全だったりします。
      </p>
    </div>
  );
} 
