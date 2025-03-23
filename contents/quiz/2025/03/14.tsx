import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Python", "Data Visualization", "Data Application"],
    created_at: new Date("2025-03-14"),
    updated_at: new Date("2025-03-14"),

    // ----- quiz -----
    title: "Pythonのグラフ描画ライブラリの特徴",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "Matplotlibは最も基本的なライブラリで、細かいカスタマイズが可能",
      1: "Seabornは統計的データ可視化に特化し、美しいデフォルトスタイルを提供",
      2: "Plotlyはインタラクティブな可視化が得意で、ウェブアプリケーションとの統合が容易",
      3: "PyGWalkerは3Dグラフの作成に特化し、高度なアニメーション機能を提供",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Matplotlib 公式ドキュメント", url: "https://matplotlib.org/" },
      { title: "Seaborn 公式ドキュメント", url: "https://seaborn.pydata.org/" },
      { title: "Plotly 公式ドキュメント", url: "https://plotly.com/python/" },
      { title: "PyGWalker 公式ドキュメント", url: "https://docs.kanaries.net/pygwalker" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <>
      <p className="pb-4">
        Pythonでデータ可視化を行う際によく使用される4つの主要なライブラリ（Matplotlib、Seaborn、Plotly、PyGWalker）について、
        それぞれの特徴を示した説明のうち、<span className="text-red-500">誤っているもの</span>を選んでください。
      </p>
    </>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>Pythonのグラフ描画ライブラリの特徴に関する問題です。</p>
      <p className="py-2">選択肢の解説:</p>
      <ul className="list-disc pl-4">
        <li className="pt-2"><strong>Matplotlib</strong>は最も基本的なPythonのグラフ描画ライブラリで、非常に細かい部分までカスタマイズできる柔軟性を持っています。</li>
        <li className="pt-2"><strong>Seaborn</strong>はMatplotlibをベースにしており、統計的なデータ可視化に特化し、デフォルトで美しいスタイルを提供します。</li>
        <li className="pt-2"><strong>Plotly</strong>はインタラクティブな可視化を作成でき、ユーザーがグラフ上でズーム、パン、ホバーなどの操作を行えます。また、Dashなどのウェブフレームワークと組み合わせて使用することが容易です。</li>
        <li className="pt-2"><strong>PyGWalker</strong>の説明が誤りです。PyGWalkerはTableauのようなGUIインターフェースを提供し、コードを書かなくてもデータの探索や可視化が可能なツールです。3Dグラフやアニメーションに特化しているわけではありません。</li>
      </ul>
      <p className="py-2">
        これらのライブラリはそれぞれ異なる特徴と用途を持っており、プロジェクトの要件に応じて適切なものを選択することが重要です。
      </p>
    </div>
  );
} 
