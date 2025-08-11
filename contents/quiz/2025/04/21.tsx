import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["SQL", "Snowflake", "Snowflake Basic", "Data Integration"],
    created_at: new Date("2025-04-21"),
    updated_at: new Date("2025-04-21"),

    // ----- quiz -----
    title: "COPY INTO <table> のオプション",
    question_jsx: <QuizQuestion />,
    options: {
      0: "PURGE = TRUEオプションを指定すると、正常にロードされたファイルはステージから自動的に削除される。",
      1: "VALIDATION_MODEオプションを使用すると、実際にデータをロードせずにファイルの検証のみを行うことができる。",
      2: "FILESパラメータで指定したファイルが存在しない場合、エラーとはならずに処理がスキップされる。",
      3: "PATTERNオプションで正規表現を使用し、ロードするファイルをフィルタリングできる。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "COPY INTO <table> - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/sql-reference/sql/copy-into-table#copy-options-copyoptions"
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        SnowflakeのCOPY INTO &lt;table&gt;コマンド実行時の動作について説明しています。これらのうち、<span className="text-red-500">誤っている</span>ものを1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        各選択肢の解説は以下の通りです。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong>PURGE = TRUEオプションを指定すると、正常にロードされたファイルはステージから自動的に削除される。</strong>：これは正しい記載です。
          PURGE = TRUE は、ロード成功後にステージングファイルを削除するためのオプションです。
        </li>
        <li>
          <strong>VALIDATION_MODEオプションを使用すると、実際にデータをロードせずにファイルの検証のみを行うことができる。</strong>：これも正しい記載です。
          VALIDATION_MODE は、データロードプロセスを実行する前に、データファイルのエラーをチェックするために使用されます。
          RETURN_ERRORS や RETURN_n_ROWS といった値を指定できます。
        </li>
        <li>
          <strong className="text-green-600">FILESパラメータで指定したファイルが存在しない場合、エラーとはならずに処理がスキップされる。</strong>：<span className="text-red-500">これは誤った記載です。</span>
          デフォルトの動作では、FILESパラメータで指定されたファイルが存在しない場合、COPY INTO コマンドはエラーを返して停止します。
          エラーを無視して処理を続行させたい場合は、ON_ERROR = CONTINUE オプションを明示的に指定する必要があります。
        </li>
        <li>
          <strong>PATTERNオプションで正規表現を使用し、ロードするファイルをフィルタリングできる。</strong>：これも正しい記載です。
          PATTERNオプションを使うことで、ステージ内のファイル名に対して正規表現マッチングを行い、ロード対象のファイルを絞り込むことができます。
        </li>
      </ul>
    </div>
  );
} 
