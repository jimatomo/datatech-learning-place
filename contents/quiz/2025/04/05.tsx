import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Storage", "Database", "Data Management"],
    created_at: new Date("2025-04-05"),
    updated_at: new Date("2025-04-05"),

    // ----- quiz -----
    title: "行指向と列指向データベースの特性と適切なワークロード",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "行指向データベースは、1つのレコードの全カラムを連続して格納するため、1レコードの読み書きが高速で、OLTP（オンライントランザクション処理）に適している",
      1: "列指向データベースは、同じカラムのデータを連続して格納するため、特定のカラムに対する集計や分析が高速で、OLAP（オンライン分析処理）に適している",
      2: "列指向データベースは、データの圧縮率が高く、ストレージ効率が良いが、1レコードの更新には複数のカラムストアへのアクセスが必要なため、更新処理は行指向データベースより遅い",
      3: "行指向データベースは、データの圧縮率が低く、ストレージ効率が悪いが、複数のカラムを横断する複雑な集計クエリの実行が高速である",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "データベース実践入門", url: "https://www.amazon.co.jp/dp/4297127470" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        行指向と列指向データベースの特性と適切なワークロードについて、<span className="text-red-500">間違っている</span>選択肢を選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        行指向データベースは、複数のカラムを横断する複雑な集計クエリの実行には適していません。
        複雑な集計クエリの実行には、特定のカラムに対する高速な集計や分析が可能な列指向データベースが適しています。
      </p>
      <p className="py-2">
        その他の選択肢は正しい記述です。
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>行指向データベース</strong>は、1つのレコードの全カラムを連続して格納するため、1レコードの読み書きが高速です。
          これはOLTP（オンライントランザクション処理）に適しており、頻繁な更新やトランザクション処理が必要なシステムで使用されます。
        </li>
        <li className="pb-2">
          <strong>列指向データベース</strong>は、同じカラムのデータを連続して格納するため、特定のカラムに対する集計や分析が高速です。
          また、同じデータ型の値が連続して格納されるため、圧縮率が高く、ストレージ効率が良いという特徴があります。
        </li>
        <li className="pb-2">
          列指向データベースは、1レコードの更新には複数のカラムストアへのアクセスが必要なため、更新処理は行指向データベースより遅くなります。
          そのため、バッチ処理や分析クエリが主な用途となるOLAP（オンライン分析処理）に適しています。
        </li>
      </ul>
      <p className="pt-2">
        最近は、両方の特性を組み合わせたハイブリッド型のデータベースやZero-ETL型の統合機能を提供するデータベースサービスも増えてきています。
        また、RDBMS以外にも多様なデータベースがあるので、用途に合わせたデータベースを選択することがデータエンジニアにとって重要な役割なのでアンテナを広げていきましょう。
      </p>
    </div>
  );
} 
