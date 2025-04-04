import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Python", "Pandas", "Data Processing", "Data Application"],
    created_at: new Date("2025-04-04"),
    updated_at: new Date("2025-04-04"),

    // ----- quiz -----
    title: "pandasのデータフレーム操作について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "df.loc[]は行と列のラベルを指定してデータを取得するが、df.iloc[]は行と列のインデックス番号を指定してデータを取得する",
      1: "df.groupby()メソッドは、指定した列の値に基づいてデータをグループ化し、各グループに対して集計処理を行うことができる",
      2: "df.merge()メソッドは、2つのデータフレームを結合する際に、結合キーとして使用する列を指定する必要がない",
      3: "df.pivot_table()メソッドは、データフレームをピボット形式に変換する際に、集計関数を指定する必要がない",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "pandas documentation - merge", url: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.merge.html" },
      { title: "pandas documentation - groupby", url: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.groupby.html" },
      { title: "pandas.DataFrameを結合するmerge, join（列・インデックス基準）", url: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.pivot_table.html" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        pandasのデータフレーム操作に関する説明として、<span className="text-red-500">間違っているもの</span>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        pandasのデータフレーム操作は、データ分析において非常に重要な機能です。
        各選択肢について解説します。
      </p>

      <p className="py-2 font-semibold text-red-500">間違っている選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>df.merge()メソッドは、2つのデータフレームを結合する際に、結合キーとして使用する列を指定する必要がない:</strong>
          <br />
          これは誤りです。df.merge()メソッドを使用する際は、onパラメータまたはleft_on/right_onパラメータで結合キーを指定する必要があります。
          結合キーを指定しない場合、デフォルトでは共通の列名を使用しますが、共通の列名がない場合はエラーが発生します。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>df.loc[]は行と列のラベルを指定してデータを取得するが、df.iloc[]は行と列のインデックス番号を指定してデータを取得する:</strong>
          <br />
          これは正しい説明です。locはラベルベースのインデックス指定、ilocは位置ベースのインデックス指定を行います。
        </li>
        <li className="pt-2">
          <strong>df.groupby()メソッドは、指定した列の値に基づいてデータをグループ化し、各グループに対して集計処理を行うことができる:</strong>
          <br />
          これも正しい説明です。groupby()はデータのグループ化と集計を行う強力な機能です。
        </li>
        <li className="pt-2">
          <strong>df.pivot_table()メソッドは、データフレームをピボット形式に変換する際に、集計関数を指定する必要がない:</strong>
          <br />
          これも正しい説明です。集計関数を指定しない場合、デフォルトでmean（平均）が使用されます。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        pandasのデータフレーム操作は、データ分析において非常に重要な機能です。
        特にmerge()メソッドを使用する際は、適切な結合キーを指定することが重要です。
        また、locとilocの違いや、groupby()やpivot_table()の使用方法を理解しておくことで、効率的なデータ分析が可能になります。
      </p>
    </div>
  );
} 
