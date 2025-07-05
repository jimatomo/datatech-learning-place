import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "AI_COMPLETE", "Cortex AISQL", "Data Modeling"],
    created_at: new Date("2025-06-25"),
    updated_at: new Date("2025-06-25"),

    // ----- quiz -----
    title: "Snowflake AI_COMPLETE関数の最新構文と使用方法",
    question_jsx: <QuizQuestion />,
    options: {
      0: "AI_COMPLETE('llama3.1-70b', 'この顧客メールの感情を分析してください。' || EMAIL_CONTENT)",
      1: "AI_COMPLETE(model => 'claude-3-5-sonnet', prompt => 'この顧客メールの感情を分析してください。' || EMAIL_CONTENT)",
      2: "AI_COMPLETE('mistral-large2', 'この顧客メールの感情を分析してください。' || EMAIL_CONTENT, {'temperature': 0.3, 'max_tokens': 100})",
      3: "AI_COMPLETE('claude-3-5-sonnet', 'この顧客メールの感情を分析してください。' + EMAIL_CONTENT)",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "AI_COMPLETE (Single string) - Snowflake Documentation", url: "https://docs.snowflake.com/en/sql-reference/functions/ai_complete-single-string" },
      { title: "Snowflake Cortex AISQL Documentation", url: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-2">
        Snowflake Cortex AISQLの<strong>AI_COMPLETE関数</strong>（2025年最新版）を使用して、顧客メールの感情分析を行いたいと考えています。
        以下のテーブル構造があります：
      </p>
      <CodeBlock 
        code={`-- CUSTOMER_EMAILS テーブル
CREATE TABLE CUSTOMER_EMAILS (
    EMAIL_ID INT,
    CUSTOMER_NAME STRING,
    EMAIL_CONTENT STRING,
    RECEIVED_DATE DATE
);`}
        showLineNumbers={false}
      />
      <p className="py-2">
        以下のSQL文のうち、<strong className="text-red-500">AI_COMPLETE関数の構文として間違っているもの</strong>を選んでください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        正解は <strong className="text-red-500">+演算子を使用している選択肢</strong> です（間違っているもの）。
      </p>
      
      <p className="py-2">
        <strong>各選択肢の解説：</strong>
      </p>
      
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong className="text-emerald-500">llama3.1-70bモデルを使用した基本構文：</strong> 正しい構文
          <CodeBlock 
            code={`AI_COMPLETE('llama3.1-70b', 'この顧客メールの感情を分析してください。' || EMAIL_CONTENT)`}
            showLineNumbers={false} 
          />
          最新のAI_COMPLETE関数の基本構文で、位置引数を使用した正しい記述です。
        </li>
        
        <li className="pb-2">
          <strong className="text-emerald-500">名前付き引数を使用した構文：</strong> 正しい構文
          <CodeBlock 
            code={`AI_COMPLETE(model => 'claude-3-5-sonnet', prompt => 'この顧客メールの感情を分析してください。' || EMAIL_CONTENT)`}
            showLineNumbers={false}
          />
          最新のAI_COMPLETE関数では名前付き引数もサポートされており、この記述は正しい構文です。
        </li>
        
        <li className="pb-2">
          <strong className="text-emerald-500">パラメータ付きの構文：</strong> 正しい構文
          <CodeBlock 
            code={`AI_COMPLETE('mistral-large2', 'この顧客メールの感情を分析してください。' || EMAIL_CONTENT, {'temperature': 0.3, 'max_tokens': 100})`}
            showLineNumbers={false}
          />
          Mistral-large2モデルを使用し、model_parametersでtemperatureとmax_tokensを指定する正しい構文です。
        </li>
        
        <li className="pb-2">
          <strong className="text-red-500">+演算子を使用した構文：</strong> 文字列連結演算子が間違っている（間違い）
          <CodeBlock 
            code={`AI_COMPLETE('claude-3-5-sonnet', 'この顧客メールの感情を分析してください。' + EMAIL_CONTENT)`}
            showLineNumbers={false}
          />
          SnowflakeのSQLでは文字列連結に<code>+</code>演算子ではなく<code>||</code>演算子を使用する必要があります。JavaScriptやPythonと異なり、Snowflakeでは<code>+</code>は数値の加算にのみ使用されます。
        </li>
      </ul>
      
      <p className="py-2">
        <strong>AI_COMPLETE関数の正しい構文（2025年版）：</strong>
      </p>
      <CodeBlock 
        code={`AI_COMPLETE(
    <model>, <prompt> 
    [, <model_parameters>, <response_format>, <show_details>]
)

-- または名前付き引数で：
AI_COMPLETE(
    model => '<model_name>',
    prompt => '<prompt_text>',
    model_parameters => {...},
    response_format => {...},
    show_details => true/false
)`}
        showLineNumbers={false}
      />
      
      <p className="py-2">
        <strong>Snowflakeでの文字列連結：</strong>
      </p>
      <CodeBlock 
        code={`-- 正しい例（Snowflake SQL）
AI_COMPLETE(
    'claude-3-5-sonnet',
    'この顧客メールの感情を分析してください。' || EMAIL_CONTENT
)

-- 間違った例（他の言語の記法）
AI_COMPLETE(
    'claude-3-5-sonnet',
    'この顧客メールの感情を分析してください。' + EMAIL_CONTENT  -- これは間違い
)`}
        showLineNumbers={false}
      />
      
      <p className="py-2">
        <strong>重要なポイント：</strong>
      </p>
      <p className="py-2 text-red-500">
        <strong>注意：</strong> SnowflakeのSQLでは文字列連結に<code>||</code>演算子を使用します。
        多くのプログラミング言語で使われる<code>+</code>演算子は、Snowflakeでは数値の加算専用です。
      </p>
      
      <p className="py-2">
        <strong>正しい構造化出力の例：</strong>
      </p>
      <CodeBlock 
        code={`SELECT AI_COMPLETE(
    'claude-4-sonnet',
    'この顧客メールの感情を分析: ' || EMAIL_CONTENT,
    {'temperature': 0.1},
    {
        'type': 'json',
        'schema': {
            'type': 'object',
            'properties': {
                'sentiment': {'type': 'string'},
                'confidence': {'type': 'number'},
                'key_topics': {'type': 'array', 'items': {'type': 'string'}}
            }
        }
    }
) FROM CUSTOMER_EMAILS;`}
        showLineNumbers={false}
      />
    </div>
  );
}