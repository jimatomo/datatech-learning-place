import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "Jinja", "Data Modeling"],
    created_at: new Date("2025-09-24"),
    updated_at: new Date("2025-09-24"),

    // ----- quiz -----
    title: "dbtで利用されるJinjaの空白制御(whitespace control)",
    question_jsx: <QuizQuestion />,
    options: {
      0: "1 2 3",
      1: "123",
      2: "1, 2, 3",
      3: "エラーが発生する",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Whitespace Control - Template Designer Documentation", url: "https://jinja.palletsprojects.com/en/3.1.x/templates/#whitespace-control" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        dbtで利用されるJinjaテンプレートにおいて、次のコードがレンダリングする結果として<strong className="text-green-600">正しいもの</strong>はどれですか？
      </p>
      <SQLCodeBlock />
    </div>
  );
}

const code = `{% for item in [1, 2, 3] -%}
    {{ item }}
{%- endfor %}`;

function SQLCodeBlock() {
  return (
    <CodeBlock code={code} showLineNumbers={false} />
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Jinjaの空白制御機能により、<code>123</code>が出力されます。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li><code>-%{'}'}</code>: タグの直後にある改行や空白を取り除きます。この例では <code>for</code> ループの後の改行が削除されます。</li>
        <li><code>{'{'}%-</code>: タグの直前にある空白や改行を取り除きます。この例では <code>endfor</code> の前のインデントと改行が削除されます。</li>
      </ul>
      <p>
        これにより、ループの各イテレーションで生成される数値の間の空白がすべてなくなり、<code>123</code>という連続した文字列が生成されます。
        dbtモデルを記述する際、この機能は不要な空白や改行を制御し、可読性の高いSQLを生成するために非常に役立ちます。
      </p>
    </div>
  );
}