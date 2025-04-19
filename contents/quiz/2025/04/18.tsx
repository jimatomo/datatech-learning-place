import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

const lineChartCode = "st.line_chart(df['sales'])";
const barChartCode = "st.bar_chart(df.groupby('category')['sales'].agg('sum'))";
const areaChartCode = "st.area_chart(df['sales'])";
const scatterPlotCode = "st.scatter(df[['sales', 'profit']])";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Streamlit", "Pandas", "Data Visualization", "Data Application"],
    created_at: new Date("2025-04-18"),
    updated_at: new Date("2025-04-18"),
    title: "Streamlitでのデータ可視化",
    question_jsx: <QuizQuestion />,
    options: { 
      0: lineChartCode,
      1: barChartCode,
      2: areaChartCode,
      3: scatterPlotCode,
    },
    answers: [0, 1, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Streamlit documentation - Charts", url: "https://docs.streamlit.io/library/api-reference/charts" },
      { title: "Streamlit documentation - Data visualization", url: "https://docs.streamlit.io/library/api-reference/data" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  const code = `import streamlit as st
import pandas as pd

# サンプルデータの作成
df = pd.DataFrame({
    'date': pd.date_range(start='2024-01-01', periods=5),
    'category': ['A', 'B', 'A', 'B', 'A'],
    'sales': [100, 150, 200, 250, 300],
    'profit': [20, 30, 40, 50, 60]
})

# データの可視化
# ここに可視化コードを記述`;

  return (
    <div>
      <p className="pb-4">
        以下のコードは、Streamlitを使用してPandasのデータフレームを可視化するものです。
        可視化方法として正常に動作するものを全て選択してください。
      </p>
      <CodeBlock code={code} />
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Streamlitでは、Pandasのデータフレームを簡単に可視化するための様々なチャート関数が提供されています。
        各選択肢について解説します。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>{lineChartCode}:</strong>
          <br />
          時系列データのトレンドを表示するのに適しています。
          この場合、売上の時系列変化を線グラフで表示できます。
        </li>
        <li className="pt-2">
          <strong>{areaChartCode}:</strong>
          <br />
          線グラフと同様に時系列データのトレンドを表示できますが、
          線の下の領域が塗りつぶされるため、量の変化をより強調できます。
        </li>
        <li className="pt-2">
          <strong>{barChartCode}:</strong>
          <br />
          カテゴリごとの売上合計を棒グラフで表示できます。この場合、df.groupby(&apos;category&apos;)[&apos;sales&apos;].agg(&apos;sum&apos;)でカテゴリごとに売上の合計を計算し、st.bar_chartで可視化します。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">間違っている選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>{scatterPlotCode}:</strong>
          <br />
          Streamlitには`st.scatter`という関数は存在しません。散布図を作成する場合は`st.scatter_chart`を使用してください。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        Streamlitでは、データの特性や目的に応じて適切なチャート関数を選択することが重要です。
        時系列データには`line_chart`や`area_chart`、カテゴリーごとの比較には`bar_chart`が適しています。
        散布図を作成する場合は`st.scatter_chart`を使用する必要があります。
        また、より高度な可視化が必要な場合は、PlotlyやAltairなどのライブラリを組み合わせて使用することもできます。
      </p>
    </div>
  );
} 
