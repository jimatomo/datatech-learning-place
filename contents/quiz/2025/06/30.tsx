import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "COPY INTO", "Data Loading", "File Loading Options", "Snowflake Basic"],
    created_at: new Date("2025-06-30"),
    updated_at: new Date("2025-06-30"),

    // ----- quiz -----
    title: "SnowflakeのCOPY INTOコマンドのファイルロードオプション",
    question_jsx: <QuizQuestion />,
    options: {
      0: "FORCE = TRUE を使用する",
      1: "LOAD_UNCERTAIN_FILES = TRUE を使用する",
      2: "PATTERN オプションを使用する",
      3: "PURGE = TRUE を使用する",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "COPY INTO <table> - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/sql-reference/sql/copy-into-table"
      },
      {
        title: "古いファイルをロードする - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/data-load-considerations-load#label-loading-older-files"
      }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeで64日以上前にステージングされた古いファイルで、ロード状態が不明なファイルをCOPY INTOコマンドでロードしたい場合、どのオプションを使用すべきですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflakeの古いファイルのロードに関する各オプションの説明と正解の理由を説明します。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong>FORCE = TRUE を使用する</strong>：
          このオプションは、以前にロードされたファイルや変更されていないファイルを含め、すべてのファイルをロードします。ロードメタデータが存在する場合でもそれを無視し、ファイルを再ロードします。これによりテーブル内でデータが重複する可能性があります。古いファイルをロードすることはできますが、データ重複のリスクが高いため推奨されません。
        </li>
        <li>
          <strong className="text-emerald-500">LOAD_UNCERTAIN_FILES = TRUE を使用する</strong>：
          これが正しい答えです。このオプションは、ロード状態が不明なファイルをロードするために特別に設計されています。ロード状態が不明になるのは、ファイルのLAST_MODIFIED日付が64日より古く、初期データセットのロードが64日以上前に行われた場合です。<code>LOAD_UNCERTAIN_FILES = TRUE</code>は、利用可能な場合はロードメタデータを参照してデータの重複を避けますが、期限切れのロードメタデータを持つファイルもロードを試行します。これは古いファイルの安全なロード方法です。
        </li>
        <li>
          <strong>PATTERN オプションを使用する</strong>：
          このオプションは正規表現パターンを使用して特定のファイルを識別するためのものです。ファイルの年齢やロード状態とは関係なく、単にファイル名のパターンマッチングを行います。古いファイルのロード問題を解決するものではありません。
        </li>
        <li>
          <strong>PURGE = TRUE を使用する</strong>：
          このオプションは、データが正常にロードされた後にステージからデータファイルを自動的に削除するかどうかを指定します。ファイルのロード自体とは関係なく、ロード後のクリーンアップに関するオプションです。
        </li>
      </ul>
      <p className="pt-2">
        Snowflakeはロードメタデータを64日間保持し、この期間を過ぎると古いファイルのロード状態が不明になります。<code>LOAD_UNCERTAIN_FILES = TRUE</code>を使用することで、データ重複のリスクを最小限に抑えながら、これらの古いファイルを安全にロードできます。
      </p>
    </div>
  );
}