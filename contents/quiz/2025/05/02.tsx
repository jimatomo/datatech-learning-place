import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["DuckDB", "Window Functions", "Stream Processing", "Data Application"],
    created_at: new Date("2025-05-02"),
    updated_at: new Date("2025-05-02"),
    title: "DuckDBにおけるタンブリングウィンドウの実装",
    question_jsx: <QuizQuestion />,
    options: {
      0: "date_trunc 関数を使用して、指定した時間単位でタイムスタンプを切り捨てる。",
      1: "time_bucket 関数を使用して、指定したバケット幅とオフセットでタイムスタンプをバケット化する。",
      2: "LAG ウィンドウ関数を使用して、前のレコードとの時間差に基づいてウィンドウを定義する。",
      3: "GROUP BY 句と時間抽出関数（例: hour()）を組み合わせて集計する。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Temporal Analysis with Stream Windowing Functions in DuckDB", url: "https://duckdb.org/2025/05/02/stream-windowing-functions.html" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        DuckDBにおいて、タイムスタンプデータを固定サイズの非重複期間（タンブリングウィンドウ）に分割して集計する場合、使用できるSQL関数として<span className="text-red-500">適切でないもの</span>はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  const dateTruncCode = `
SELECT
    date_trunc('hour', station_service_time) AS window_start,
    window_start + INTERVAL 1 HOUR AS window_end,
    count(*) AS number_of_services
FROM ams_traffic_v
WHERE year(station_service_time) = 2024
GROUP BY ALL
ORDER BY 1;
  `;

  const timeBucketCode = `
SELECT
    time_bucket(
        INTERVAL 15 MINUTE, -- bucket width
        station_service_time,
        INTERVAL 0 MINUTE -- offset
    ) AS window_start,
    window_start + INTERVAL 15 MINUTE as window_end,
    count(*) AS number_of_services
FROM ams_traffic_v
WHERE year(station_service_time) = 2024
GROUP BY ALL
ORDER BY 1;
  `;

  return (
    <div className="text-xs md:text-sm">
      <p>
        DuckDB でタイムスタンプ付きデータを分析する際、タンブリングウィンドウはデータを固定長の連続した非重複期間に分割するのに役立ちます。これにより、特定の時間単位での集計や時系列データへの変換が可能になります。
      </p>

      <p className="py-2 font-semibold text-emerald-500">適切な選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>date_trunc 関数を使用して、指定した時間単位でタイムスタンプを切り捨てる：</strong>
          <br />
          これは正しい記載です。date_trunc 関数は、タイムスタンプを指定された精度（&apos;year&apos;, &apos;month&apos;, &apos;day&apos;, &apos;hour&apos; など）に切り捨てます。これにより、簡単にタンブリングウィンドウを作成できます。
          <CodeBlock code={dateTruncCode} />
        </li>
        <li className="pt-2">
          <strong>time_bucket 関数を使用して、指定したバケット幅とオフセットでタイムスタンプをバケット化する：</strong>
          <br />
          これも正しい記載です。time_bucket 関数は、より柔軟なタンブリングウィンドウを作成できます。任意の時間間隔（バケット幅）と開始点（オフセット）を指定できます。例えば、15分ごとのウィンドウを作成する場合に便利です。ただし、time_bucket はデータが存在するタイムスタンプに基づいてバケットを生成するため、データがない期間はバケットが生成されないことに注意が必要です。
          <CodeBlock code={timeBucketCode} />
        </li>
        <li className="pt-2">
          <strong>GROUP BY 句と時間抽出関数（例: hour()）を組み合わせて集計する：</strong>
          <br />
          これもタンブリングウィンドウによる集計を実現する方法の一つです。GROUP BY date_trunc(&apos;hour&apos;, timestamp_col) と同様の結果を得られますが、date_trunc や time_bucket を使用する方が、ウィンドウの定義がより明確になります。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">適切でない選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>LAG ウィンドウ関数を使用して、前のレコードとの時間差に基づいてウィンドウを定義する：</strong>
          <br />
          これは適切ではありません。LAG 関数はウィンドウ関数の一つで、現在の行より前の行の値を取得するために使用されます。前のイベントとの時間差（ギャップ）を計算し、セッションウィンドウ（非アクティブな期間に基づいたウィンドウ）を識別するためには役立ちますが、固定サイズのタンブリングウィンドウを直接作成する関数ではありません。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        DuckDBでタンブリングウィンドウを実装するには、主に `date_trunc` 関数や `time_bucket` 関数が使用されます。`date_trunc` は標準的な時間単位での切り捨てに、`time_bucket` はより柔軟な時間間隔でのバケット化に適しています。`LAG` 関数は異なる種類の時間ベース分析（セッション化など）に使用されます。
      </p>
    </div>
  );
} 