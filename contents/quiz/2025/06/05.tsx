import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Infrastructure", "Linux"],
    created_at: new Date("2025-06-05"),
    updated_at: new Date("2025-06-05"),

    // ----- quiz -----
    title: "Linux環境変数の一覧表示",
    question_jsx: <QuizQuestion />,
    options: {
      0: "env",
      1: "printenv",
      2: "set",
      3: "echo $PATH",
    },
    answers: [0, 1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Man page of env", url: "https://man7.org/linux/man-pages/man1/env.1.html" },
      { title: "Man page of printenv", url: "https://man7.org/linux/man-pages/man1/printenv.1.html" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-3">Linuxシステムで現在設定されているすべての環境変数の一覧を表示するコマンドとして正しいものを、以下の選択肢から全て選んでください。</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm space-y-2">
      <p>
        Linuxシステムで環境変数を確認するには、いくつかのコマンドが利用できます。それぞれのコマンドには特徴があります。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-emerald-500">env</strong>：これは正しい選択肢です。このコマンドは、現在の環境で定義されているすべての環境変数をキーと値のペアのリストとして表示します。最も一般的に使用されるコマンドの一つです。
        </li>
        <li>
          <strong className="text-emerald-500">printenv</strong>：これも正しい選択肢です。<code>env</code> コマンドと非常によく似ており、環境変数を表示します。引数なしで実行するとすべての環境変数を表示し、引数として変数名を渡すとその変数の値のみを表示します。
        </li>
        <li>
          <strong className="text-red-500">set</strong>：これは誤った選択肢です。<code>set</code> コマンドは環境変数だけでなく、定義済みのすべてのシェル変数（ローカル変数）やシェル関数も表示します。そのため、「すべての環境変数の一覧」という要件に対しては、余分な情報が含まれることになります。
        </li>
        <li>
          <strong className="text-red-500">echo $PATH</strong>：これは誤った選択肢です。このコマンドは <code>PATH</code> という単一の環境変数の値を表示するだけで、すべての環境変数の一覧を表示するものではありません。
        </li>
      </ul>
      <p>
        <strong>解説:</strong><br />
        環境変数は、プロセスが実行される環境を定義するための動的な値のセットです。これには、シェルの設定、システムのロケール、実行可能ファイルの検索パスなどが含まれます。
      </p>
      <p>
        <code>env</code> と <code>printenv</code> は、純粋に環境変数のみを表示するための標準的なコマンドです。一方、<code>set</code> はより広範な情報（シェル固有の変数など）を含むため、特定の状況では意図しない出力が得られる可能性があります。したがって、環境変数の一覧を確認したい場合には <code>env</code> または <code>printenv</code> を使用するのが最も確実です。
      </p>
    </div>
  );
} 
