import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["DuckDB", "Database", "SQL", "Datatech News"],
    created_at: new Date("2025-09-28"),
    updated_at: new Date("2025-09-28"),

    // ----- quiz -----
    title: "DuckDB 1.4.0の新機能",
    question_jsx: <QuizQuestion />,
    options: {
      0: "データベース全体の暗号化機能",
      1: "MERGEステートメントのサポート",
      2: "JSONデータ型に対するネイティブなGraphQLクエリのサポート",
      3: "欠損値を線形補間するFILLウィンドウ関数",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Announcing DuckDB 1.4.0 LTS", url: "https://duckdb.org/2025/09/16/announcing-duckdb-140.html" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        2025年9月16日にリリースされたDuckDB 1.4.0 LTS (コードネーム: “Andium”)で導入された新機能に関する記述のうち、<strong className="text-red-600">誤っているもの</strong>は次のうちどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        DuckDB 1.4.0では、長期サポート（LTS）リリースとして、データベース暗号化、MERGEステートメント、Icebergへの書き込みサポートなど、多くの新機能が導入されました。
      </p>
      <p className="font-semibold text-red-500 pt-2">間違っている記述（正答）:</p>
      <p>
        JSONデータ型に対するネイティブなGraphQLクエリのサポートは、DuckDB 1.4.0のリリースノートには含まれておらず、このバージョンでは導入されていません。
      </p>

      <p className="font-semibold text-green-600 pt-2">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li><strong>データベース全体の暗号化機能</strong>: AES-GCM 256ビット暗号化を使用して、データベースファイル、WAL、一時ファイルを保護する機能が追加されました。</li>
        <li><strong>MERGEステートメントのサポート</strong>: プライマリキーを必要としないカスタムマージ条件に基づいて、UPSERT（UPDATE + INSERT）操作を実行できるようになりました。</li>
        <li><strong>FILLウィンドウ関数</strong>: 順序付けられたウィンドウ内の欠損値を補間（interpolate）するための新しいウィンドウ関数です。</li>
      </ul>
    </div>
  );
}


