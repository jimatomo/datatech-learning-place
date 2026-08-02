import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Composer",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "Data Architecture", "DevOps", "Data Application"],
    created_at: new Date("2026-08-07"),
    updated_at: new Date("2026-08-07"),

    title: "dbt exposuresで下流利用を宣言する",
    question_jsx: <QuizQuestion />,
    options: {
      0: "exposuresはダッシュボード、ノートブック、アプリケーションなど、dbtプロジェクトの下流利用を定義・記述するための仕組みである。",
      1: "手動定義ではYAMLのexposuresキー配下に、name・type・ownerなどを宣言する。",
      2: "定義後は dbt run --select \"+exposure:weekly_kpis\" のように、そのexposureの上流リソースを選択して実行・テストできる。",
      3: "exposuresはウェアハウス上に実テーブルを作成するdbtのマテリアライズ種別の一つであり、定義すると対応する物理テーブルが必ず作られる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "dbt Docs - Add Exposures to your DAG",
        url: "https://docs.getdbt.com/docs/build/exposures",
      },
      {
        title: "dbt Docs - Exposure properties",
        url: "https://docs.getdbt.com/reference/exposure-properties",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        dbtのexposuresについて、
        <strong className="text-red-600">誤っているもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        exposuresは「このモデルはどのダッシュボード／アプリに使われているか」をDAG上で明示するメタデータです。
        下流影響の把握や、重要ダッシュボード向けのビルド対象絞り込みに使います。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          exposuresはtable / view / incrementalのようなマテリアライズではありません。
          物理テーブルを作るのではなく、下流利用の宣言とドキュメント／選択のためのノードです。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>typeはdashboard / notebook / analysis / ml / applicationなどです。</li>
        <li>YAMLで手動定義でき、対応インテグレーションでは自動生成もあります。</li>
        <li>
          <code>+exposure:...</code>
          セレクタで上流モデルをまとめてrun / testできます。
        </li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「重要KPIダッシュボード」をexposureとして宣言しておくと、変更影響の説明とデプロイ前テストの範囲決めが同じ定義で回せます。
        モデル単体の正しさだけでなく、誰が何に使うかをDAGに載せるのがポイントです。
      </p>
    </div>
  );
}
