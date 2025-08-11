import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Modeling", "Snowflake", "Data Integration"],
    created_at: new Date("2025-02-12"),
    updated_at: new Date("2025-02-12"),

    // ----- quiz -----
    title: "SnowflakeのCOPY INTOコマンドの使用方法",
    question_jsx: <QuizQuestion />,
    options: {
      0: "COPY INTOコマンドでデータをロードする際、VALIDATION_MODEを使用してエラーチェックを行うことができる",
      1: "外部ステージからデータをロードする場合、STORAGE_INTEGRATIONの指定は必須である",
      2: "ロード中にデータを変換するSELECT文であっても、MATCH_BY_COLUMN_NAMEオプションを使用すると、ソースとターゲットのカラム名が一致する場合に自動的にマッピングされる",
      3: "PURGE=TRUEを指定すると、ロード成功後にステージ上のファイルは自動的に削除される",
    },
    answers: [0, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "COPY INTO <table>", url: "https://docs.snowflake.com/en/sql-reference/sql/copy-into-table" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        SnowflakeのCOPY INTOコマンドを使用してデータをロードする際の説明として、
        以下の選択肢の中から正しい説明を2つ選んでください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        SnowflakeのCOPY INTOコマンドの機能と使用方法に関する問題です。
      </p>
      <p className="pt-2">
        それぞれの選択肢について説明します：
      </p>
      <ul className="list-disc pl-6 pt-2">
        <li className="pb-2">
          VALIDATION_MODEオプションを使用することで、実際のデータロードを行う前にデータの検証を行うことができます。
          以下の3つのモードがあります：
          <ul className="list-disc pl-6">
            <li>RETURN_N_ROWS：指定した行数分のデータを検証</li>
            <li>RETURN_ERRORS：エラーのある行のみを返す</li>
            <li>RETURN_ALL_ERRORS：すべてのエラーを返す</li>
          </ul>
        </li>
        <li className="pb-2">
          外部ステージからデータをロードする場合、STORAGE_INTEGRATIONの指定は必須ではありません。
          代わりにCREDENTIALSパラメータを使用して認証情報を直接指定することもできます。
          ただし、セキュリティの観点からSTORAGE_INTEGRATIONの使用が推奨されます。
        </li>
        <li className="pb-2">
          MATCH_BY_COLUMN_NAMEオプションを使用すると、ソースファイルとターゲットテーブルのカラム名が
          一致する場合に自動的にマッピングされます。CASE_SENSITIVEまたはCASE_INSENSITIVEを
          指定して、大文字小文字の区別の有無を制御できます。
        </li>
        <li>
          PURGE=TRUEを指定すると、データのロードが成功した後にステージ上のソースファイルが
          自動的に削除されます。これにより、不要なファイルの蓄積を防ぎ、ストレージコストを
          削減することができます。
        </li>
      </ul>
      <p className="pt-2">
        COPY INTOコマンドは、Snowflakeでデータをロードする際の主要なコマンドの1つです。
        様々なオプションが用意されているので、ユースケースに応じて適切なオプションを
        選択することが重要です。
      </p>
    </div>
  );
} 

