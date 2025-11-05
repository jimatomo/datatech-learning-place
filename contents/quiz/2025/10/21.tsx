import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Performance", "S3", "Snowflake Advanced"],
    created_at: new Date("2025-10-21"),
    updated_at: new Date("2025-10-21"),

    // ----- quiz -----
    title: "External Table のスキャン量を最も減らす方法は？",
    question_jsx: <QuizQuestion />,
    options: {
      0: "外部テーブルをパーティション分割し、ディレクトリ階層に対応するパーティション列を定義。WHERE 句の条件で一致するパーティションのみを読み取り、不要なファイルのスキャンを回避する。",
      1: "ウェアハウスのサイズを上げて並列度を増やす。スキャン対象は変えずに処理時間だけ短縮を狙う。",
      2: "CLUSTER BY を設定してパーティションの代替とする（外部テーブルでも同様に効く）。",
      3: "ファイルフォーマットの圧縮方式を変更して I/O を削減すれば、読み取るファイル数自体も減らせる。",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Partitioned external tables | Snowflake ドキュメント", url: "https://docs.snowflake.com/ja/user-guide/tables-external-intro#partitioned-external-tables" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        データレイク上（例: S3）の多数ファイルを参照する <strong>External Table</strong> に対し、
        日付や地域などの条件でクエリすることが多い状況を想定します。
      </p>
      <p>
        <strong className="text-green-600">スキャン対象とリスト処理を最も減らす有効な対策</strong>を 1 つ選んでください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-emerald-500">Correct statement:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          外部テーブルを<strong>パーティション分割</strong>し、ディレクトリ階層（例: <code>/dt=YYYY-MM-DD/region=APAC/</code>）に対応する
          <strong>パーティション列</strong>を定義すると、WHERE 句の条件に一致するパーティションだけを読み取るため、
          不要なファイルの列挙・スキャンを大幅に削減できます（パーティションプルーニング）。
        </li>
      </ul>
      <p className="font-semibold text-red-500">Why other choices are wrong:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          ウェアハウスを大型化しても<strong>対象データ量は減りません</strong>。並列度や処理時間に影響はあっても、不要ファイルの読み取りは避けられません。
        </li>
        <li>
          <code>CLUSTER BY</code> は<strong>内部テーブル向け</strong>のデータ配置ヒントであり、外部テーブルのファイル列挙やリモート読み取りの削減には使えません。
        </li>
        <li>
          圧縮方式の変更は<strong>読み取るバイト量</strong>を左右する可能性はありますが、<strong>読むファイル数や範囲</strong>は変えられません。根本対策にはなりません。
        </li>
      </ul>
      <p>補足:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          パーティション列はディレクトリパスから抽出して定義します。クエリではその列を WHERE 句で指定することでプルーニングが働きます。
        </li>
      </ul>
    </div>
  );
}
