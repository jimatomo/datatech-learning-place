import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "COALESCE", "Data Modeling"],
    created_at: new Date("2025-07-23"),
    updated_at: new Date("2025-07-23"),

    // ----- quiz -----
    title: "複数ソースの企業データをCOALESCEで統合する実践的テクニック",
    question_jsx: <QuizQuestion />,
    options: {
      0: "SELECT company_name, COALESCE(system_industry, manual_input_industry, ai_inferred_industry, 'Industry not found') AS industry FROM company_profiles;",
      1: "SELECT company_name, COALESCE(ai_inferred_industry, manual_input_industry, system_industry, 'Industry not found') AS industry FROM company_profiles;",
      2: "SELECT company_name, NVL(NVL(system_industry, manual_input_industry), ai_inferred_industry) AS industry FROM company_profiles;",
      3: "SELECT company_name, IFNULL(system_industry, manual_input_industry) AS industry FROM company_profiles;",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "COALESCE - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/sql-reference/functions/coalesce",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-2">
        企業の業種データが、複数の異なるソースから取得され、<code>company_profiles</code>テーブルに格納されています。
        信頼性の高い業種データを取得するため、以下の優先度でデータを採用したいと考えています。
      </p>
      <ol className="list-decimal pl-6 my-2">
        <li>
          <strong>基幹システムの業種</strong> (<code>system_industry</code>):
          最も信頼性が高い
        </li>
        <li>
          <strong>手入力された業種</strong> (<code>manual_input_industry</code>
          ): 次に信頼性が高い
        </li>
        <li>
          <strong>AIが推定した業種</strong> (<code>ai_inferred_industry</code>):
          上記2つがない場合のフォールバック
        </li>
      </ol>
      <p className="pb-2">
        もし全てのカラムが <code>NULL</code> の場合は、{" "}
        <code>&apos;Industry not found&apos;</code> を表示します。
        このロジックを実装するために、以下の <code>CASE</code>{" "}
        文を用いたクエリを作成しました。
      </p>
      <CodeBlock
        code={`-- テーブル定義とデータ
CREATE OR REPLACE TABLE company_profiles (
    company_id INT,
    company_name VARCHAR(50),
    system_industry VARCHAR(100),      -- 基幹システムから取得した業種
    manual_input_industry VARCHAR(100), -- オペレーターが手動で入力した業種
    ai_inferred_industry VARCHAR(100)    -- WebサイトなどからAIが推定した業種
);

INSERT INTO company_profiles VALUES
(1, 'TechCorp', 'IT Services', 'Technology', 'Software'),
(2, 'Innovate Inc.', NULL, 'Manufacturing', 'Robotics'),
(3, 'RetailGlobal', NULL, NULL, 'E-commerce'),
(4, 'DataDriven Co.', NULL, NULL, NULL);

-- 優先度付けを行うCASE文クエリ
SELECT
    company_name,
    CASE
        WHEN system_industry IS NOT NULL THEN system_industry
        WHEN manual_input_industry IS NOT NULL THEN manual_input_industry
        WHEN ai_inferred_industry IS NOT NULL THEN ai_inferred_industry
        ELSE 'Industry not found'
    END AS industry
FROM company_profiles;`}
        showLineNumbers={false}
      />
      <p className="py-2">
        上記の <code>CASE</code> 文を使ったクエリと{" "}
        <strong className="text-emerald-500">
          全く同じ結果を返し、かつ最も簡潔なクエリ
        </strong>{" "}
        は、次のうちどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        正解は{" "}
        <strong className="text-emerald-500">
          <code>
            SELECT company_name, COALESCE(system_industry,
            manual_input_industry, ai_inferred_industry, &apos;Industry not
            found&apos;) AS industry FROM company_profiles;
          </code>
        </strong>{" "}
        です。
      </p>

      <p className="py-2">
        <strong>
          <code>COALESCE</code>関数による優先順位付け
        </strong>
      </p>
      <p>
        このような「複数のデータソースから優先度を付けて最初の有効な値を選ぶ」というシナリオは、データクレンジングやデータ統合の現場で非常によく見られます。
        <code>COALESCE</code>
        関数は、まさにこの目的のために設計された関数です。
      </p>
      <p className="py-2">
        <code>COALESCE</code>は、引数を左から順番に評価し、最初に現れた非
        <code>NULL</code>
        の値を返します。 これにより、冗長な<code>CASE</code>
        文を一行で、かつ直感的に記述することができます。
      </p>
      <CodeBlock
        code={`-- 冗長なCASE文
CASE
    WHEN system_industry IS NOT NULL THEN system_industry
    WHEN manual_input_industry IS NOT NULL THEN manual_input_industry
    WHEN ai_inferred_industry IS NOT NULL THEN ai_inferred_industry
    ELSE 'Industry not found'
END

-- COALESCEで簡潔に表現
COALESCE(system_industry, manual_input_industry, ai_inferred_industry, 'Industry not found')`}
        showLineNumbers={false}
      />

      <p className="py-2">
        <strong>各選択肢の解説：</strong>
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong className="text-emerald-500">
            <code>
              COALESCE(system_industry, manual_input_industry, ...)
            </code>
            ：正解
          </strong>
          <br />
          指定された優先度（<code>system_industry</code> →{" "}
          <code>manual_input_industry</code> → <code>ai_inferred_industry</code>
          ）の順に引数が並んでおり、最後にデフォルト値が設定されています。
          これは
          <code>CASE</code>文のロジックと完全に一致し、最も簡潔です。
        </li>
        <li className="pb-2">
          <strong>
            <code>
              COALESCE(ai_inferred_industry, manual_input_industry, ...)
            </code>
            ：誤答
          </strong>
          <br />
          引数の順序が優先度と異なります。この場合、
          <code>company_id = 2</code>（Innovate Inc.）のデータでは、
          <code>manual_input_industry</code>よりも信頼度の低い
          <code>ai_inferred_industry</code>
          が先に評価され、意図しない結果（
          <code>Robotics</code>が返る）となります。
        </li>
        <li className="pb-2">
          <strong>
            <code>NVL(NVL(system_industry, manual_input_industry), ...)</code>
            ：誤答
          </strong>
          <br />
          <code>NVL</code>
          関数は引数を2つしか取れないため、3つ以上の値を扱うにはネストが必要です。これは可読性を損ないます。また、この選択肢では最後のフォールバック値（
          <code>&apos;Industry not found&apos;</code>）が考慮されていません。
        </li>
        <li className="pb-2">
          <strong>
            <code>IFNULL(system_industry, manual_input_industry)</code>：誤答
          </strong>
          <br />
          <code>IFNULL</code>も引数は2つまでです。このクエリでは
          <code>system_industry</code>が<code>NULL</code>の場合に
          <code>manual_input_industry</code>を返すだけで、
          <code>ai_inferred_industry</code>
          や最終的なデフォルト値を全く考慮できていません。
        </li>
      </ul>
    </div>
  );
}