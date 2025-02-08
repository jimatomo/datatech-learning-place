import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Python", "pandas", "CSV"],
    created_at: new Date("2025-02-07"),
    updated_at: new Date("2025-02-07"),

    // ----- quiz -----
    title: "pandasでCSVファイルを正しく読み込む方法",
    question_jsx: <QuizQuestion />,
    options: {
      0: "df = pd.read_csv('data/sample.csv')",
      1: "df = pd.read_csv('data/sample.csv', header=None)",
      2: "df = pd.read_csv('data/sample.csv', index_col='name')",
      3: "df = pd.read_csv('data/sample.csv', skiprows=[1])",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "pandas.read_csv — pandas documentation", url: "https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html" },
      { title: "pandasでCSV/TSVファイル読み込み", url: "https://note.nkmk.me/python-pandas-read-csv-tsv/" },
    ],
  });
  return quiz;
}

const csv_data = `name,age,city
Alice,30,Tokyo
Bob,25,Osaka
Charlie,35,Nagoya`

function QuizQuestion() {
  return (
    <div>
      <CodeBlock code={csv_data} title="data/sample.csv" />
      <p className="pt-4 pb-4">
        このCSVデータをpandasでDataFrameに正しく読み込むためのコードはどれでしょうか？
        正しいコードを選択してください。なお、import pandas as pdは実行済みであるとします。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        CSVファイルをpandasのDataFrameに正しく読み込む方法に関しての問題です。
        与えられたCSVファイルは、ヘッダー行があり、カンマ区切りであるため、
        最もシンプルな`pd.read_csv(&apos;./sample.csv&apos;)`で正しく読み込むことができます。
      </p>
      <p className="pt-2">
        各選択肢の説明：
      </p>
      <ul className="list-disc pl-6 pt-2">
        <li>選択肢（header=None）: ヘッダー行を無視してしまうため、間違いです。</li>
        <li className="py-2">選択肢（index_col=&apos;name&apos;）: このCSVファイルにはインデックスがないので不要な処理です。</li>
        <li>選択肢（skiprows=[1]）: スキップする行は要らないので不要な処理です。</li>
      </ul>
    </div>
  );
} 

