import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "AI_COMPLETE", "Cortex AISQL", "LLM", "SQL"],
    created_at: new Date("2025-06-25"),
    updated_at: new Date("2025-06-25"),

    // ----- quiz -----
    title: "Snowflake AI_COMPLETE関数の基本的な使用方法",
    question_jsx: <QuizQuestion />,
    options: {
      0: "AI_COMPLETE('llama3.1-70b', 'この顧客メールの感情を分析してください。' || EMAIL_CONTENT)",
      1: "AI_COMPLETE('llama3.1-70b', 'この顧客メールの感情を分析してください。' + EMAIL_CONTENT)",
      2: "AI_COMPLETE('llama3.1-70b', CONCAT('この顧客メールの感情を分析してください。', EMAIL_CONTENT))",
      3: "AI_COMPLETE('llama3.1-70b', 'この顧客メールの感情を分析してください。' || EMAIL_CONTENT, {'max_tokens': 50, 'temperature': 0.3})",
    },
    answers: [0, 2, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake Cortex AISQL Documentation", url: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql" },
      { title: "AI_COMPLETE Function Reference", url: "https://docs.snowflake.com/en/sql-reference/functions/ai_complete-snowflake-cortex" },
      { title: "Snowflake Service Consumption Table", url: "https://www.snowflake.com/legal-files/CreditConsumptionTable.pdf" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-2">
        Snowflake Cortex AISQLの<strong>AI_COMPLETE関数</strong>を使用して、顧客メールの感情分析を行いたいと考えています。
        以下のテーブル構造があります：
      </p>
      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
        <code>{`-- CUSTOMER_EMAILS テーブル
CREATE TABLE CUSTOMER_EMAILS (
    EMAIL_ID INT,
    CUSTOMER_NAME STRING,
    EMAIL_CONTENT STRING,
    RECEIVED_DATE DATE
);`}</code>
      </pre>
      <p className="py-2">
        以下のSQL文のうち、<strong className="text-green-500">正しく動作するもの</strong>をすべて選んでください。
        （複数選択可）
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        正解は <strong className="text-green-500">選択肢0、2、3</strong> です。
      </p>
      
      <p className="py-2">
        <strong>各選択肢の解説：</strong>
      </p>
      
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong className="text-green-500">選択肢0：</strong> <code>||</code> 演算子を使用した文字列連結
          <CodeBlock language="sql" showLineNumbers={false}>
            {`AI_COMPLETE('llama3.1-70b', 'この顧客メールの感情を分析してください。' || EMAIL_CONTENT)`}
          </CodeBlock>
          SQLの標準的な文字列連結演算子 <code>||</code> を使用しており、正しく動作します。
        </li>
        
        <li className="pb-2">
          <strong className="text-red-500">選択肢1：</strong> <code>+</code> 演算子を使用した連結（エラー）
          <CodeBlock language="sql" showLineNumbers={false}>
            {`AI_COMPLETE('llama3.1-70b', 'この顧客メールの感情を分析してください。' + EMAIL_CONTENT)`}
          </CodeBlock>
          Snowflakeでは <code>+</code> 演算子は数値の加算にのみ使用され、文字列連結では使用できません。
          このクエリはエラーになります。
        </li>
        
        <li className="pb-2">
          <strong className="text-green-500">選択肢2：</strong> CONCAT関数を使用した連結
          <CodeBlock language="sql" showLineNumbers={false}>
            {`AI_COMPLETE('llama3.1-70b', CONCAT('この顧客メールの感情を分析してください。', EMAIL_CONTENT))`}
          </CodeBlock>
          CONCAT関数は文字列連結の標準的な方法の一つで、正しく動作します。
        </li>
        
        <li className="pb-2">
          <strong className="text-green-500">選択肢3：</strong> パラメータ付きの高度な使用
          <CodeBlock language="sql" showLineNumbers={false}>
            {`AI_COMPLETE('llama3.1-70b', 'この顧客メールの感情を分析してください。' || EMAIL_CONTENT, 
           {'max_tokens': 50, 'temperature': 0.3})`}
          </CodeBlock>
          文字列連結も正しく、オプションパラメータ（最大トークン数と温度設定）も適切に指定されており、
          正しく動作します。
        </li>
      </ul>
      
      <p className="py-2">
        <strong>AI_COMPLETE関数の基本構文：</strong>
      </p>
      <CodeBlock language="sql" showLineNumbers={false}>
        {`AI_COMPLETE(model, prompt_or_history [, options])

-- パラメータ：
-- model: 使用するAIモデル（例：'llama3.1-70b'、'claude-3-5-sonnet'）
-- prompt_or_history: プロンプト文字列または会話履歴
-- options: オプション設定（max_tokens、temperature、top_p など）`}
      </CodeBlock>
      
      <p className="py-2">
        <strong>重要なポイント：</strong>
      </p>
      <ul className="list-disc pl-4">
        <li>Snowflakeでは文字列連結に <code>||</code> 演算子またはCONCAT関数を使用</li>
        <li><code>+</code> 演算子は数値演算専用で、文字列連結には使用不可</li>
        <li>AI_COMPLETE関数の第3引数でオプションパラメータを指定可能</li>
        <li>推奨ウェアハウスサイズはMEDIUM以下（コスト効率のため）</li>
        <li>エラーハンドリングが必要な場合はTRY_COMPLETE関数を使用</li>
      </ul>
      
      <p className="py-2">
        <strong>補足情報：</strong>
      </p>
      <p className="py-2">
        AI_COMPLETE関数は2025年に導入されたCortex AISQLの中核機能で、SQLクエリ内で直接大規模言語モデルを
        使用できる革新的な機能です。従来の外部API呼び出しと比較して、最大60%のコスト削減と30%の
        パフォーマンス向上を実現しています。
      </p>
    </div>
  );
}