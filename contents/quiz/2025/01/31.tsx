import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Application", "Pandas", "Python"],
    created_at: new Date("2025-01-31"),
    updated_at: new Date("2025-01-31"),

    // ----- quiz -----
    title: "pandasの基本機能について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "DataFrameは表形式のデータを扱うための基本的なデータ構造である",
      1: "read_csv()やread_excel()などの関数を使用して、様々な形式のファイルからデータを読み込むことができる",
      2: "データの集計には必ずforループを使用する必要がある",
      3: "時系列データの処理は非常によくサポートされており、豊富なツール群が用意されている",
      4: "複数のテーブルを結合する場合、必ず同じ列数である必要がある",
    },
    answers: [0, 1, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Getting started with pandas", url: "https://pandas.pydata.org/docs/getting_started/index.html" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Pythonのpandasライブラリの基本機能について、正しい説明を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        以下が正解の説明です：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          DataFrameは、pandasの中心的なデータ構造で、表形式（行と列）のデータを効率的に
          扱うことができます。
        </li>
        <li className="pb-1">
          pandasは様々なファイル形式（CSV、Excel、SQL、JSON、Parquetなど）からデータを
          読み込むための関数を提供しています。これらの関数は`read_*`というプレフィックスを持ちます。
        </li>
        <li>
          pandasは時系列データを扱うための豊富な機能セットを提供しており、日付や時刻のデータを
          効率的に処理することができます。
        </li>
      </ul>
      <p>
        誤った選択肢の説明：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          データの集計にforループを使用する必要はありません。pandasは列単位での演算や
          集計機能（mean、median、min、maxなど）を提供しており、これらを使用することで
          効率的に処理を行うことができます。
        </li>
        <li>
          複数のテーブルの結合には、concat()やmerge()などの関数が用意されており、
          列単位でも行単位でもデータベースのように結合することが可能です。
        </li>
      </ul>
      <p>
        pandasは、Pythonでデータ分析を行う際の基本的なライブラリとして広く使用されています。
        特に、データの読み込み、加工、分析の一連の作業を効率的に行うことができます。
      </p>
    </div>
  );
} 
