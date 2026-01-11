import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Performance", "Operation", "Snowflake Basic"],
    created_at: new Date("2026-01-12"),
    updated_at: new Date("2026-01-12"),

    // ----- quiz -----
    title: "マルチクラスターウェアハウスの使い所",
    question_jsx: <QuizQuestion />,
    options: {
      0: "多数のユーザーやダッシュボード更新などで同時実行が増え、クエリがキューイングしやすい状況で有効である。",
      1: "単一の重いクエリの実行時間を短縮するために、まずマルチクラスター化するのが最適である。",
      2: "同一サイズの複数クラスターにスケールアウトすることで、同時実行性を高めて待ち時間を減らすことが主目的である。",
      3: "ピーク時のみクラスター数を増やし、負荷が下がれば減らす運用により、混雑時の体験を保ちつつコストを最適化できる。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "マルチクラスターウェアハウス | Snowflake ドキュメント",
        url: "https://docs.snowflake.com/ja/user-guide/warehouses-multicluster",
      },
      {
        title: "ウェアハウスに関する考慮事項（同時実行性・スケーリング）| Snowflake ドキュメント",
        url: "https://docs.snowflake.com/ja/user-guide/warehouses-considerations",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeのマルチクラスターウェアハウス（Multi-cluster Warehouse）の使い所に関する次の説明のうち、
        <strong className="text-red-600">誤っているもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-emerald-600">正しい説明:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          マルチクラスターウェアハウスは、同一サイズのクラスターを複数起動してスケールアウトし、同時実行性の高いワークロードで発生しがちなキューイング（待ち行列）を減らす用途に向きます。
        </li>
        <li>
          典型例として、BIのダッシュボード更新や多数ユーザーによる短いクエリが同時に流入するケースがあります。追加クラスターに処理を分散できるため、待ち時間を抑えやすくなります。
        </li>
        <li>
          需要に応じてクラスター数を増減させる設定により、ピーク時の同時実行性を確保しつつ、ピークが過ぎればクラスター数を減らしてクレジット消費を抑える運用が可能です（稼働中のクラスター分だけ課金されます）。
        </li>
      </ul>

      <p className="font-semibold text-red-500">誤っている説明（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          マルチクラスター化は「同時実行性（スケールアウト）」のための仕組みであり、単一クエリの処理を速くしたい場合の第一選択ではありません。単一クエリの実行時間を短縮したいなら、ウェアハウスのサイズ変更（スケールアップ）やクエリ/テーブル設計の改善を検討します。
        </li>
      </ul>
    </div>
  );
}

