import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowpark", "Python", "Snowflake Advanced"],
    created_at: new Date("2025-03-11"),
    updated_at: new Date("2025-03-11"),

    // ----- quiz -----
    title: "Snowpark Pythonでのパラメータバインディングの使用方法",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "session.sql関数では名前付きパラメータ形式（:name）のみサポートされている",
      1: "session.sql関数ではQmark形式（?）と数値形式（:1, :2）の両方のバインディングがサポートされている",
      2: "session.sql関数では文字列補間（f-string）が推奨されている",
      3: "session.sql関数ではSequence型のparamsパラメータを使用したQmark形式（?）のバインディングのみがサポートされている",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowpark Python API リファレンス - Session.sql", url: "https://docs.snowflake.com/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.Session.sql" },
      { title: "Pythonコネクタの例", url: "https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-example" },
      { title: "Snowpark Python プログラミングガイド", url: "https://docs.snowflake.com/ja/developer-guide/snowpark/python/index" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowpark PythonでSQLクエリを実行する際、パラメータバインディングを使用してパラメータ化されたクエリを作成できます。
        以下のコード例を見てください：
      </p>

      <CodeBlock 
        code={`# 例1: Qmark形式のバインディング
session.sql("SELECT * FROM customers WHERE customer_id = ?", params=[123])

# 例2: 複数パラメータのバインディング
session.sql("SELECT * FROM values (?, ?), (?, ?)", params=[1, "a", 2, "b"])

# 例3: 文字列置換
customer_id = 123
session.sql(f"SELECT * FROM customers WHERE customer_id = {customer_id}")`} 
        showLineNumbers={false}
      />

      <p className="pt-2">
        Snowpark Pythonの<code>session.sql</code>関数でのパラメータバインディングの使用方法について、正しい説明はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowpark Pythonの <strong>session.sql</strong> 関数では、
        Qmark形式（?）のバインディングのみがサポートされており、
        paramsパラメータを使用して値を渡します。
      </p>

      <p className="py-2">
        例1では、単一のパラメータをリストとして<code>params</code>に渡しています：
      </p>
      <CodeBlock 
        code={`session.sql("SELECT * FROM customers WHERE customer_id = ?", params=[123])`} 
        showLineNumbers={false}
      />

      <p className="py-2">
        例2では、複数のパラメータをリストとして<code>params</code>に渡しています：
      </p>
      <CodeBlock 
        code={`session.sql("SELECT * FROM values (?, ?), (?, ?)", params=[1, "a", 2, "b"])`} 
        showLineNumbers={false}
      />

      <p className="py-2">
        例3は文字列置換（f-string）を使用していますが、これはパラメータバインディングではなく、
        SQLインジェクション攻撃のリスクがあるため、推奨されません。
        代わりにQmarkバインディングを使用するべきです。
      </p>

      <p>
        パラメータバインディングを使用することで、SQLインジェクション攻撃を防ぎ、クエリのパフォーマンスを向上させることができます。
        Snowpark Pythonでは、Qmark形式（?）のバインディングのみがサポートされています。
        一方で通常のpythonのコネクタを利用する分には数値形式（:1, :2）のバインディングもサポートされています。
      </p>
    </div>
  );
} 
