import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Advanced", "Data Integration"],
    created_at: new Date("2025-08-05"),
    updated_at: new Date("2025-08-05"),

    // ----- quiz -----
    title: "Snowflake: 外部テーブルの標準カラム",
    question_jsx: <QuizQuestion />,
    options: {
      0: "VALUE",
      1: "METADATA$FILENAME",
      2: "METADATA$FILE_ROW_NUMBER",
      3: "METADATA$FILE_SIZE",
    },
    answers: [0, 1, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Introduction to external tables | Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/tables-external-intro",
      },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeの外部テーブルを作成した際に、デフォルトで利用可能なカラムを
        <strong>全て</strong>選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflakeの外部テーブルは、外部ステージに保存されたデータファイルをクエリするための機能です。
        テーブル定義時にカラムを明示的に指定しなくても、デフォルトでいくつかの特別なカラムが利用可能になります。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>VALUE：</strong>
          これは<strong className="text-emerald-500">正しい</strong>
          です。VALUE列はVARIANT型で、ステージングされたファイル内の1行全体を表します。JSONなどの半構造化データを扱う際に特に有用です。
        </li>
        <li className="pt-2">
          <strong>METADATA$FILENAME：</strong>
          これも<strong className="text-emerald-500">正しい</strong>
          です。この疑似列は、各レコードがどのファイルから読み込まれたかを示すファイル名（ステージ内のパスを含む）を返します。
        </li>
        <li className="pt-2">
          <strong>METADATA$FILE_ROW_NUMBER：</strong>
          これも<strong className="text-emerald-500">正しい</strong>
          です。この疑似列は、ステージングされたファイル内での各レコードの行番号を返します。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">間違った選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>METADATA$FILE_SIZE：</strong>
          <br />
          これは<strong className="text-red-500">間違い</strong>です。
          ファイルサイズを取得するための`METADATA$FILE_SIZE`という疑似列は、外部テーブルの標準カラムとしては提供されていません。
          ファイルに関するメタデータは`METADATA$FILENAME`や`METADATA$FILE_ROW_NUMBER`などに限定されます。
        </li>
      </ul>
    </div>
  );
}