import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Lightdash", "dbt", "Semantic Layer", "Data Application"],
    created_at: new Date("2025-09-26"),
    updated_at: new Date("2025-09-26"),

    // ----- quiz -----
    title: "Lightdashとセマンティックレイヤーの関係性",
    question_jsx: <QuizQuestion />,
    options: {
      0: "dbtで定義したメトリクスやディメンションを再利用でき、指標定義をコードで一元管理できる。",
      1: "SQLの知識がなくても、GUI操作でデータを探索し、可視化を作成できる。",
      2: "dbtでデータモデルを変更すると、その内容がLightdashのダッシュボードに自動的に反映される。",
      3: "Lightdashは独自の強力なセマンティックレイヤーを持っており、dbtとは独立して指標を定義・管理する。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Lightdashとは？dbtと連携できるLookerライクなBIツールを解説",
        url: "https://stable.co.jp/blog/introduction-lightdash",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        BIツールであるLightdashが、dbtと連携してセマンティックレイヤーを構築する際の利点や特徴について、
        <strong className="text-red-600">間違っているもの</strong>
        を一つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Lightdashは、dbtで定義されたデータモデルを直接セマンティックレイヤーとして活用することに大きな特徴があります。
      </p>
      <br />
      <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
      <p>
        「Lightdashは独自の強力なセマンティックレイヤーを持っており、dbtとは独立して指標を定義・管理する」は間違いです。Lightdashの最大の特徴は、dbtプロジェクトを直接読み込み、dbtで定義されたモデルや指標（メトリクス）をセマンティックレイヤーとして利用する点にあります。これにより、指標定義の二重管理を防ぎ、dbtに一元化できます。
      </p>
      <br />
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          dbtで管理されている指標定義（ディメンションやメトリクス）をLightdashが自動で解釈し、UI上に表示します。これにより、データアナリストやビジネスユーザーは定義を再確認することなく分析を開始できます。
        </li>
        <li>
          Lookerライクな操作性を持ち、ユーザーはSQLを書かずにGUIでデータを探索し、グラフやダッシュボードを作成できます。
        </li>
        <li>
          dbtリポジトリと連携しているため、dbtでモデルが更新されると、その変更はLightdashにも自動的に反映されます。これにより、常に最新のデータ定義に基づいた分析が可能になります。
        </li>
      </ul>
    </div>
  );
}

