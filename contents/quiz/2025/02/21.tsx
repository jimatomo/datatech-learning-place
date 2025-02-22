import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Python", "pandas"],
    created_at: new Date("2025-02-21"),
    updated_at: new Date("2025-02-21"),

    // ----- quiz -----
    title: "pandasでのデータソート処理",
    question_jsx: <QuizQuestion />,
    options: { 
      0: `df.sort_values(['age', 'state'], ascending=[False, True])`,
      1: `df.sort_values('age', ascending=False).sort_values('state', ascending=True)`,
      2: `df.sort_index(['age', 'state'], ascending=[False, True])`,
      3: `df.sort(['age', 'state'], ascending=[False, True])`
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "pandas.DataFrame, Seriesをソートするsort_values, sort_index", url: "https://note.nkmk.me/python-pandas-sort-values-sort-index/" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        以下のようなDataFrameがあります：
      </p>
      <CodeBlock
        code={`      name   age state  point
0    Alice   24    NY     64
1      Bob   42    CA     92
2  Charlie   18    CA     70
3     Dave   68    TX     70
4    Ellen   24    CA     88
5    Frank   30    NY     57`}
      />
      <p className="py-4">
        このDataFrame（dfとして実体化しているとします）に対して、以下の条件でソートを行いたい場合、正しいコードを選んでください：
      </p>
      <ul className="text-left">
        <li>・ageカラムを降順（大きい順）で並べ替え</li>
        <li>・ageが同じ場合は、stateカラムを昇順（アルファベット順）で並べ替え</li>
      </ul>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        pandasでの複数条件によるソートのポイントは以下の通りです：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-2">
          複数列でソートする場合は、sort_values()の引数byにリストで列名を指定します
        </li>
        <li className="pb-2">
          昇順・降順の指定は、ascendingパラメータに真偽値のリストを渡すことで、各列ごとに設定できます
        </li>
        <li className="pb-2">
          sort()メソッドは古いバージョンのpandasにあった機能で、現在は廃止されています（pandas2.2.2ではエラーになりました）
        </li>
        <li className="pb-2">
          sort_index()はインデックス（行名・列名）でソートする際に使用するメソッドで、この場合は不適切です（エラーになります）
        </li>
      </ul>
      <p className="pb-2">
        正解のコードを実行すると、以下のような結果が得られます：
      </p>
      <CodeBlock
        code={`      name   age state  point
3     Dave   68    TX     70
1      Bob   42    CA     92
5    Frank   30    NY     57
4    Ellen   24    CA     88
0    Alice   24    NY     64
2  Charlie   18    CA     70`}
      />
    </div>
  );
} 

