import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Iceberg"],
    created_at: new Date("2025-02-11"),
    updated_at: new Date("2025-02-11"),

    // ----- quiz -----
    title: "SnowflakeのApache Icebergテーブルのベストプラクティス",
    question_jsx: <QuizQuestion />,
    options: {
      0: "外部管理テーブルのリフレッシュは、メンテナンス作業の頻度に関係なく定期的に行えばよい",
      1: "COPY INTOでデータをロードする際は、特別なフォーマットオプションを意識する必要はない",
      2: "Parquetファイルには、最小値・最大値、NULL値の数、個別値の数（NDV）などの統計情報を含めるべき",
      3: "大量のデータファイルをスキャンする場合、大きなウェアハウスを使用するとパフォーマンスが良くなる",
    },
    answers: [2, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Apache Iceberg™テーブルのベストプラクティス", url: "https://docs.snowflake.com/ja/user-guide/tables-iceberg-best-practices" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        SnowflakeでApache Icebergテーブルを使用する際のベストプラクティスについて、
        以下の選択肢の中から正しい説明を2つ選んでください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        SnowflakeのApache Icebergテーブルのベストプラクティスに関する問題です。
      </p>
      <p className="pt-2">
        それぞれの選択肢について説明します：
      </p>
      <ul className="list-disc pl-6 pt-2">
        <li className="pb-2">
          長いリフレッシュ時間を防ぎ、最新のテーブルデータをすばやく取得するには、外部カタログを使用するIcebergテーブルで頻繁にリフレッシュを実行します。
          外部管理テーブルのリフレッシュは、スナップショットの期限切れやコンパクションなどのテーブルのメンテナンス操作に合わせて行うと効率的です。
        </li>
        <li className="pb-2">
          COPY INTOやSnowpipeでデータをロードする際は、以下のフォーマットオプションを使用することが推奨されています：
          <ul className="list-disc pl-6">
            <li>BINARY_AS_TEXT = FALSE</li>
            <li>USE_LOGICAL_TYPE = TRUE</li>
            <li>USE_VECTORIZED_SCANNER = TRUE</li>
            <li>REPLACE_INVALID_CHARACTERS = TRUE</li>
          </ul>
        </li>
        <li className="pb-2">
          クエリのパフォーマンスを最適化するために、Parquetファイルには以下の統計情報を含める必要があります：
          <ul className="list-disc pl-6">
            <li>最小値と最大値</li>
            <li>NULL値の数</li>
            <li>個別値の数（NDV）：特に複雑な結合での結合順序の決定に重要</li>
          </ul>
        </li>
        <li>
          Snowflakeはテーブルの列スキャンを並列化しないため、より大きなウェアハウスに切り替えても
          クエリのランタイムは速くなりません。ただし、大量のデータファイルを並行してスキャンする場合は、
          大規模なウェアハウスを使用することでテーブル作成プロセスを高速化できます。
        </li>
      </ul>
      <p className="pt-2">
        Snowflakeが管理するIcebergテーブルと外部で管理されるIcebergテーブルで多少扱いが異なります。
        Icebergのユースケースは基本的には外部で管理されるテーブルを利用することが多いと思いますので、
        本格的に利用する前にしっかりと検証しましょう。
      </p>
    </div>
  );
} 

