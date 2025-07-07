import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "String Functions", "Data Manipulation", "Data Modeling"],
    created_at: new Date("2025-07-02"),
    updated_at: new Date("2025-07-02"),

    // ----- quiz -----
    title: "Snowflake文字列操作関数の選択と使用方法",
    question_jsx: <QuizQuestion />,
    options: {
      0: "SUBSTRING(SENDER_EMAIL, REGEXP_INSTR(SENDER_EMAIL, '@') + 1, CHARINDEX('.', SENDER_EMAIL) - REGEXP_INSTR(SENDER_EMAIL, '@') - 1)",
      1: "REGEXP_SUBSTR(SENDER_EMAIL, '@([a-zA-Z0-9-]+)\\.', 1, 1, 'e', 1)",
      2: "SPLIT_PART(REPLACE(SENDER_EMAIL, '@', '|'), '|', 2)",
      3: "TRIM(SUBSTR(SENDER_EMAIL, POSITION('@' IN SENDER_EMAIL) + 1, POSITION('.' IN SENDER_EMAIL) - POSITION('@' IN SENDER_EMAIL) - 1))",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "REGEXP_SUBSTR - Snowflake Documentation", url: "https://docs.snowflake.com/en/sql-reference/functions/regexp_substr" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-2">
        顧客メールデータからメールアドレスの<strong>ドメイン名部分</strong>を抽出したいと考えています。
        以下のテーブル構造があります：
      </p>
      <CodeBlock 
        code={`-- CUSTOMER_EMAILS テーブル
CREATE TABLE CUSTOMER_EMAILS (
    EMAIL_ID INT,
    CUSTOMER_NAME STRING,
    EMAIL_CONTENT STRING,
    SENDER_EMAIL STRING  -- 例: 'tanaka@example.com'
);

-- サンプルデータ
INSERT INTO CUSTOMER_EMAILS VALUES
(1, '田中太郎', 'お問い合わせ内容...', 'tanaka@example.com'),
(2, '佐藤花子', 'サポート依頼...', 'sato@company.co.jp'),
(3, 'スミスジョン', 'Product inquiry...', 'smith@global-tech.org');`}
        showLineNumbers={false}
      />
      <p className="py-2">
        SENDER_EMAILカラムから、<strong>@マークの直後から最初の.（ドット）まで</strong>のドメイン名部分を抽出したいと考えています。
        例: &#39;tanaka@example.com&#39; → &#39;example&#39;
      </p>
      <p className="py-2">
        以下のSQL関数のうち、<strong className="text-emerald-500">最も適切で効率的な方法</strong>を選んでください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        正解は <strong className="text-emerald-500">REGEXP_SUBSTR関数</strong> です。
      </p>
      
      <p className="py-2">
        <strong>各選択肢の解説：</strong>
      </p>
      
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>SUBSTRING + REGEXP_INSTR + CHARINDEX：</strong> 複雑すぎる組み合わせ
          <CodeBlock 
            code={`SUBSTRING(SENDER_EMAIL, REGEXP_INSTR(SENDER_EMAIL, '@') + 1, CHARINDEX('.', SENDER_EMAIL) - REGEXP_INSTR(SENDER_EMAIL, '@') - 1)`}
            showLineNumbers={false} 
          />
          複数の関数を組み合わせているため、可読性が低く、処理効率も劣ります。また、CHARINDEXは最初の&#39;.&#39;を見つけるため、メールアドレスが複雑な場合に誤動作する可能性があります。
        </li>
        
        <li className="pb-2">
          <strong className="text-emerald-500">REGEXP_SUBSTR：</strong> 最も適切で効率的（正解）
          <CodeBlock 
            code={`REGEXP_SUBSTR(SENDER_EMAIL, '@([a-zA-Z0-9-]+)\\.', 1, 1, 'e', 1)`}
            showLineNumbers={false}
          />
          正規表現を使用して、@マークの直後から最初の.までの文字列を一度に抽出します。パフォーマンスが良く、可読性も高い最適な方法です。
        </li>
        
        <li className="pb-2">
          <strong>SPLIT_PART + REPLACE：</strong> 回りくどい方法
          <CodeBlock 
            code={`SPLIT_PART(REPLACE(SENDER_EMAIL, '@', '|'), '|', 2)`}
            showLineNumbers={false}
          />
          @マークを|に置換してから分割する方法ですが、.までの抽出ができていません。また、2つの関数を組み合わせているため効率的ではありません。
        </li>
        
        <li className="pb-2">
          <strong>TRIM + SUBSTR + POSITION：</strong> 複雑で非効率
          <CodeBlock 
            code={`TRIM(SUBSTR(SENDER_EMAIL, POSITION('@' IN SENDER_EMAIL) + 1, POSITION('.' IN SENDER_EMAIL) - POSITION('@' IN SENDER_EMAIL) - 1))`}
            showLineNumbers={false}
          />
          複数の関数を組み合わせており、可読性が低く、処理効率も劣ります。また、POSITION関数を2回呼び出しているため、パフォーマンスが悪くなります。
        </li>
      </ul>
      
      <p className="py-2">
        <strong>実際の使用例：</strong>
      </p>
      <CodeBlock 
        code={`SELECT 
    CUSTOMER_NAME,
    SENDER_EMAIL,
    REGEXP_SUBSTR(SENDER_EMAIL, '@([a-zA-Z0-9-]+)\\.', 1, 1, 'e', 1) AS DOMAIN_NAME
FROM CUSTOMER_EMAILS;

-- 結果：
-- CUSTOMER_NAME | SENDER_EMAIL           | DOMAIN_NAME
-- 田中太郎      | tanaka@example.com     | example
-- 佐藤花子      | sato@company.co.jp     | company
-- スミスジョン   | smith@global-tech.org  | global-tech`}
        showLineNumbers={false}
      />
      
      <p className="py-2">
        <strong>正規表現の説明：</strong>
      </p>
      <CodeBlock 
        code={`'@([a-zA-Z0-9-]+)\\.'

解説：
- @          : @マークにマッチ
- (...)      : キャプチャグループ（抽出対象）
- [a-zA-Z0-9-]+ : 英数字、ハイフンの1文字以上
- \\.        : リテラルのドット（エスケープが必要）`}
        showLineNumbers={false}
      />
      
      <p className="py-2">
        <strong>その他の便利な文字列関数：</strong>
      </p>
      <CodeBlock 
        code={`-- メールアドレス全体のドメイン部分（@以降全て）
SELECT REGEXP_SUBSTR(SENDER_EMAIL, '@(.+)', 1, 1, 'e') AS FULL_DOMAIN;

-- ユーザー名部分（@より前）
SELECT REGEXP_SUBSTR(SENDER_EMAIL, '([^@]+)@', 1, 1, 'e') AS USERNAME;`}
        showLineNumbers={false}
      />
      
      <p className="py-2">
        <strong>重要なポイント：</strong>
      </p>
      <ul className="list-disc pl-4">
        <li>正規表現関数は文字列操作において最も柔軟で強力</li>
        <li>REGEXP_SUBSTR は一度の実行で複雑な抽出が可能</li>
        <li>複数の関数を組み合わせるより、単一の適切な関数を選択する方が効率的</li>
        <li>正規表現のパフォーマンスは非常に高い</li>
      </ul>
    </div>
  );
}