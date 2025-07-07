import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Date Functions", "SQL", "Data Modeling"],
    created_at: new Date("2025-07-09"),
    updated_at: new Date("2025-07-09"),

    // ----- quiz -----
    title: "Snowflake日付処理関数による月次売上集計",
    question_jsx: <QuizQuestion />,
    options: {
      0: "DATE_TRUNC('MONTH', ORDER_DATE) + INTERVAL '1 MONTH' - INTERVAL '1 DAY'",
      1: "LAST_DAY(ORDER_DATE, 'MONTH')",
      2: "DATEADD('DAY', -1, DATEADD('MONTH', 1, DATE_TRUNC('MONTH', ORDER_DATE)))",
      3: "TO_DATE(YEAR(ORDER_DATE) || '-' || MONTH(ORDER_DATE) || '-01') + INTERVAL '1 MONTH' - INTERVAL '1 DAY'",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "LAST_DAY - Snowflake Documentation", url: "https://docs.snowflake.com/en/sql-reference/functions/last_day" },
      { title: "Date & Time Functions - Snowflake Documentation", url: "https://docs.snowflake.com/en/sql-reference/functions-date-time" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-2">
        eコマースサイトの売上データから<strong>月末日付での月次集計</strong>を行いたいと考えています。
        以下のテーブル構造があります：
      </p>
      <CodeBlock 
        code={`-- SALES_ORDERS テーブル
CREATE TABLE SALES_ORDERS (
    ORDER_ID INT,
    CUSTOMER_ID INT,
    ORDER_DATE DATE,     -- 例: '2024-03-15'
    AMOUNT DECIMAL(10,2)
);

-- サンプルデータ
INSERT INTO SALES_ORDERS VALUES
(1, 101, '2024-03-15', 25000.00),
(2, 102, '2024-03-22', 18500.00),
(3, 103, '2024-04-05', 32000.00),
(4, 104, '2024-04-18', 14800.00),
(5, 105, '2024-04-30', 27500.00);`}
        showLineNumbers={false}
      />
      <p className="py-2">
        ORDER_DATEを基に、<strong>各注文が発生した月の月末日</strong>を求めて月次売上レポートを作成したいと考えています。
        例: &#39;2024-03-15&#39; → &#39;2024-03-31&#39;、&#39;2024-04-05&#39; → &#39;2024-04-30&#39;
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
        正解は <strong className="text-emerald-500">LAST_DAY関数</strong> です。
      </p>
      
      <p className="py-2">
        <strong>各選択肢の解説：</strong>
      </p>
      
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>DATE_TRUNC + INTERVAL計算：</strong> 複雑で非効率
          <CodeBlock 
            code={`DATE_TRUNC('MONTH', ORDER_DATE) + INTERVAL '1 MONTH' - INTERVAL '1 DAY'`}
            showLineNumbers={false} 
          />
          月初に切り詰めてから1ヶ月足して1日引く方法ですが、複数のステップが必要で可読性が低く、処理効率も劣ります。
        </li>
        
        <li className="pb-2">
          <strong className="text-emerald-500">LAST_DAY：</strong> 最も適切で効率的（正解）
          <CodeBlock 
            code={`LAST_DAY(ORDER_DATE, 'MONTH')`}
            showLineNumbers={false}
          />
          専用の関数として最適化されており、シンプルで高効率です。指定した日付の月末日を直接取得できる最も適切な方法です。
        </li>
        
        <li className="pb-2">
          <strong>DATEADD + DATE_TRUNC：</strong> 冗長な処理
          <CodeBlock 
            code={`DATEADD('DAY', -1, DATEADD('MONTH', 1, DATE_TRUNC('MONTH', ORDER_DATE)))`}
            showLineNumbers={false}
          />
          複数の関数を組み合わせており、計算ステップが多く非効率です。LAST_DAY関数と同じ結果ですが、より複雑で読みにくいです。
        </li>
        
        <li className="pb-2">
          <strong>TO_DATE + 文字列結合：</strong> 非推奨の方法
          <CodeBlock 
            code={`TO_DATE(YEAR(ORDER_DATE) || '-' || MONTH(ORDER_DATE) || '-01') + INTERVAL '1 MONTH' - INTERVAL '1 DAY'`}
            showLineNumbers={false}
          />
          文字列結合を使用しており、型変換のオーバーヘッドがあります。また、ゼロパディングの問題もあり、実用的ではありません。
        </li>
      </ul>
      
      <p className="py-2">
        <strong>実際の使用例：</strong>
      </p>
      <CodeBlock 
        code={`SELECT 
    LAST_DAY(ORDER_DATE, 'MONTH') AS 月末日,
    COUNT(*) AS 注文数,
    SUM(AMOUNT) AS 月次売上合計
FROM SALES_ORDERS
GROUP BY LAST_DAY(ORDER_DATE, 'MONTH')
ORDER BY 月末日;

-- 結果：
-- 月末日      | 注文数 | 月次売上合計
-- 2024-03-31 |   2   |   43500.00
-- 2024-04-30 |   3   |   74300.00`}
        showLineNumbers={false}
      />
      
      <p className="py-2">
        <strong>LAST_DAY関数の様々な使用例：</strong>
      </p>
      <CodeBlock 
        code={`-- 月末日
SELECT LAST_DAY(ORDER_DATE, 'MONTH') AS 月末日;

-- 四半期末日
SELECT LAST_DAY(ORDER_DATE, 'QUARTER') AS 四半期末日;

-- 年末日
SELECT LAST_DAY(ORDER_DATE, 'YEAR') AS 年末日;

-- 週末日（日曜日）
SELECT LAST_DAY(ORDER_DATE, 'WEEK') AS 週末日;`}
        showLineNumbers={false}
      />
      
      <p className="py-2">
        <strong>その他の便利な日付関数：</strong>
      </p>
      <CodeBlock 
        code={`-- 月初日
SELECT DATE_TRUNC('MONTH', ORDER_DATE) AS 月初日;

-- 前月末日
SELECT LAST_DAY(DATEADD('MONTH', -1, ORDER_DATE), 'MONTH') AS 前月末日;

-- 日付の差分（日数）
SELECT DATEDIFF('DAY', ORDER_DATE, CURRENT_DATE()) AS 経過日数;

-- 曜日名
SELECT DAYNAME(ORDER_DATE) AS 曜日名;`}
        showLineNumbers={false}
      />
      
      <p className="py-2">
        <strong>重要なポイント：</strong>
      </p>
      <ul className="list-disc pl-4">
        <li>LAST_DAY関数は月末日計算に最適化された専用関数</li>
        <li>第2パラメータで期間単位（MONTH、QUARTER、YEAR等）を指定可能</li>
        <li>複雑な計算を組み合わせるより、専用関数を使用する方が効率的</li>
        <li>日付関数は時系列分析において必須のスキル</li>
        <li>GROUP BYと組み合わせることで強力な集計処理が可能</li>
      </ul>
    </div>
  );
}