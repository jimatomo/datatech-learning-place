import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "STRIP_OUTER_ARRAY", "Snowflake Basic"],
    created_at: new Date("2025-07-14"),
    updated_at: new Date("2025-07-14"),

    // ----- quiz -----
    title: "SnowflakeのSTRIP_OUTER_ARRAYオプションの特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "STRIP_OUTER_ARRAYは半構造化データの列指向化を制御するオプションである",
      1: "STRIP_OUTER_ARRAYをTRUEに設定すると、JSONファイルの最外層の配列が削除され、配列内の各レコードが個別のテーブル行にロードされる",
      2: "STRIP_OUTER_ARRAYは数値データのフォーマットを制御するオプションである",
      3: "STRIP_OUTER_ARRAYは日付とタイムスタンプの形式を指定するオプションである",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "データファイルの準備 - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/data-load-considerations-prepare"
      },
      {
        title: "CREATE FILE FORMAT - Snowflake Documentation", 
        url: "https://docs.snowflake.com/ja/sql-reference/sql/create-file-format"
      }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        SnowflakeのSTRIP_OUTER_ARRAYオプションについて、正しい説明はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        SnowflakeのSTRIP_OUTER_ARRAYオプションに関する各選択肢の説明と正解の理由を説明します。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-red-500">STRIP_OUTER_ARRAYは半構造化データの列指向化を制御するオプションである</strong>：
          これは間違いです。半構造化データの列指向化は、Snowflakeが自動的に行う処理であり、STRIP_OUTER_ARRAYオプションとは異なります。列指向化はVARIANT列に挿入された半構造化データに対して、最大200個の要素を抽出する処理です。
        </li>
        <li>
          <strong className="text-emerald-500">STRIP_OUTER_ARRAYをTRUEに設定すると、JSONファイルの最外層の配列が削除され、配列内の各レコードが個別のテーブル行にロードされる</strong>：
          これが正しい答えです。STRIP_OUTER_ARRAYオプションは、JSONファイルの最外層の配列を削除するために使用されます。これにより、配列内の各オブジェクトが個別の行としてロードされるようになります。
        </li>
        <li>
          <strong className="text-red-500">STRIP_OUTER_ARRAYは数値データのフォーマットを制御するオプションである</strong>：
          これは間違いです。数値データのフォーマット制御は、埋め込み文字の処理や小数点の指定など、別のオプションで制御されます。STRIP_OUTER_ARRAYはJSON配列の処理に関するオプションです。
        </li>
        <li>
          <strong className="text-red-500">STRIP_OUTER_ARRAYは日付とタイムスタンプの形式を指定するオプションである</strong>：
          これは間違いです。日付とタイムスタンプの形式は、DATE_FORMATやTIME_FORMATなどの別のオプションで指定されます。STRIP_OUTER_ARRAYはJSON配列の処理に関するオプションです。
        </li>
      </ul>
      <p className="pt-2">
        STRIP_OUTER_ARRAYオプションは、JSONファイル形式で使用されるオプションで、ファイル形式の作成時に指定できます。このオプションをTRUEに設定すると、JSONファイルの最外層の配列が削除され、配列内の各オブジェクトが個別の行としてロードされます。これは、複数のJSONオブジェクトが配列として格納されているファイルを効率的にロードする際に非常に有用です。
      </p>
    </div>
  );
}