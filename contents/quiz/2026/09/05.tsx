import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Governance", "Data Quality", "Data Architecture", "Data Management"],
    created_at: new Date("2026-09-05"),
    updated_at: new Date("2026-09-05"),

    title: "データ契約（Data Contract）の役割",
    question_jsx: <QuizQuestion />,
    options: {
      0: "提供側と利用側が、データセットの構造・意味・品質・所有・配置を文書化したインターフェース合意である。",
      1: "Open Data Contract Standard（ODCS）では、1つのYAMLにスキーマ、品質、SLA、チーム、サーバ接続先などを書ける。",
      2: "契約をリポジトリに置けば、スキーマ変更は自動で本番テーブルへ適用され、権限設定やパイプラインも置き換わる。",
      3: "logicalTypeとphysicalTypeを分けることで、倉庫固有の型に縛られず移植可能な定義を残せる。",
      4: "CLIなどで実データに対してスキーマと品質を検証し、ドリフトを検知する用途に使える。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Data Contract CLI - Open Data Contract Standard",
        url: "https://docs.datacontract.com/open-data-contract-standard",
      },
      {
        title: "datacontract.com - Data Contracts overview",
        url: "https://datacontract.com/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        データ契約（Data Contract）について、
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
        データ契約は「このデータ製品は何を保証するか」を提供側と利用側で固定する文書です。デプロイ装置ではありません。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          YAMLを置いただけではDDLも権限も変わりません。
          変更はバージョニングとレビューを経て、パイプライン側で適用します。契約は期待値の宣言です。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>構造だけでなく意味・品質・所有者・置き場まで一枚にまとめるのがODCSの形です。</li>
        <li>論理型を先に決め、物理型はサーバごとにマップします。</li>
        <li><code>datacontract test</code> のように実データ照合でドリフトを見つけられます。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        まず壊れると困る下流（ダッシュボードや他チームのモデル）がある表から契約を書く。
        カタログが「探す」、契約が「壊さない約束」、テストが「約束を測る」です。
      </p>
    </div>
  );
}
