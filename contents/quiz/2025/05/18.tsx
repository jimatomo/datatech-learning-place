import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["DuckDB", "SQL", "MotherDuck", "Datatech News"],
    created_at: new Date("2025-05-18"),
    updated_at: new Date("2025-05-18"),

    // ----- quiz -----
    title: "MotherDuck の Instant SQL の特徴と仕組み",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Instant SQL は、SQLクエリの入力中にリアルタイムで結果プレビューを更新し、クエリ実行の待ち時間をなくすことを目指している。",
      1: "Instant SQL は、CTEのデバッグを容易にし、変更がクエリ全体に与える影響を即座に確認できる。",
      2: "Instant SQL の利用は MotherDuck の有料プランユーザーに限定されており、DuckDB Local UI からは利用できない。",
      3: "Instant SQL を実現する重要な技術要素の一つに、DuckDBのローカル実行能力と、クエリのAST (Abstract Syntax Tree) を取得できる機能が含まれる。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Instant SQL is here: Speedrun ad-hoc queries as you type", url: "https://motherduck.com/blog/introducing-instant-sql/" },
      { title: "[新機能] 入力しながら即座にクエリ結果確認ができるInstant SQLをDuckDB Local UIから試してみた", url: "https://dev.classmethod.jp/articles/instant-sql-duckdb-local-ui/" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        MotherDuck が発表した Instant SQL に関する記述として、<span className="text-red-500">間違っている</span>選択肢を選んでください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        選択肢の中で間違っているものは次のとおりです。
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>「Instant SQL の利用は MotherDuck の有料プランユーザーに限定されており、DuckDB Local UI からは利用できない。」</strong>：これは間違った記述です。
          Instant SQL は MotherDuck と DuckDB Local UI の両方で利用可能であるとブログ記事に記載されています (「Instant SQL is now available in MotherDuck and the DuckDB Local UI.」)。
          また、有料プラン限定であるという情報も記事中にはありません。
        </li>
      </ul>
      <p className="py-2">
        その他の選択肢は正しい記述です：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>「Instant SQL は、SQLクエリの入力中にリアルタイムで結果プレビューを更新し、クエリ実行の待ち時間をなくすことを目指している。」</strong>：
          これは正しい記述です。記事では「updates your result set as you type to expedite query building and debugging – all with zero-latency, no run button required.」と説明されています。
        </li>
        <li className="pb-2">
          <strong>「Instant SQL は、CTEのデバッグを容易にし、変更がクエリ全体に与える影響を即座に確認できる。」</strong>：
          これは正しい記述です。記事には「click around and instantly visualize any CTE in seconds... changes you make to a CTE are immediately reflected in all dependent select nodes」とあり、CTEのリアルタイムな可視化と変更の即時反映について言及されています。
        </li>
        <li className="pb-2">
          <strong>「Instant SQL を実現する重要な技術要素の一つに、DuckDBのローカル実行能力と、クエリのAST (Abstract Syntax Tree) を取得できる機能が含まれる。」</strong>：
          これは正しい記述です。記事の「Why hasn&apos;t anyone done this before?」セクションで、DuckDBのローカルファースト設計、SQLからASTを取得する機能などがInstant SQLを実現する上で不可欠な要素として説明されています。
        </li>
      </ul>
      <p className="pt-2">
        Instant SQL は、SQLクエリの作成とデバッグの体験を大幅に向上させる可能性を秘めた機能です。
      </p>
    </div>
  );
} 
