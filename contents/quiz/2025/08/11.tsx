import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Basic"],
    created_at: new Date("2025-08-11"),
    updated_at: new Date("2025-08-11"),

    // ----- quiz -----
    title: "Snowflakeにおけるオブジェクトのクローン",
    question_jsx: <QuizQuestion />,
    options: {
      0: "データベースやスキーマをクローンすると、その中に含まれる子オブジェクト（テーブルやビューなど）の権限もクローンされる。",
      1: "Time Travel機能を利用して、過去の特定の時点のオブジェクトをクローンすることができる。",
      2: "CREATE TABLE ... CLONE文にCOPY GRANTS句を指定すると、ソーステーブルの権限（OWNERSHIPを除く）を新しいテーブルにコピーできる。",
      3: "Java UDF（ユーザー定義関数）は、いかなる条件下でもクローンすることはできない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Cloning considerations — Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/object-clone",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeの<code>CLONE</code>コマンドに関する記述として、<b className="text-red-500">誤っているもの</b>はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflakeのクローン機能は、オブジェクトのメタデータとデータをコピーして新しいオブジェクトを作成する強力な機能ですが、その動作にはいくつかのルールと制限があります。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong>データベースやスキーマをクローンすると、その中に含まれる子オブジェクト（テーブルやビューなど）の権限もクローンされる。</strong>
          ：これは正しい説明です。ソースがデータベースまたはスキーマの場合、クローンはその中に含まれるすべての子オブジェクトのクローンの権限を継承します。ただし、コンテナ自体の権限は継承されません。
        </li>
        <li>
          <strong>Time Travel機能を利用して、過去の特定の時点のオブジェクトをクローンすることができる。</strong>
          ：これも正しい説明です。<code>AT</code>または<code>BEFORE</code>句を使用して、過去の特定の時点のデータベース、スキーマ、テーブルなどをクローンできます。ただし、その時点がオブジェクトのデータ保持期間内である必要があります。
        </li>
        <li>
          <strong>CREATE TABLE ... CLONE文にCOPY GRANTS句を指定すると、ソーステーブルの権限（OWNERSHIPを除く）を新しいテーブルにコピーできる。</strong>
          ：これも正しい説明です。<code>CREATE &lt;object&gt;</code>コマンドが<code>COPY GRANTS</code>句をサポートしている場合（例: <code>CREATE TABLE</code>）、この句を指定することで権限をコピーできます。
        </li>
        <li>
          <strong className="text-red-500">
            Java UDF（ユーザー定義関数）は、いかなる条件下でもクローンすることはできない。
          </strong>
          ：これが誤りです。ドキュメントには「A Java UDF can be cloned when the database or schema containing the Java UDF is cloned. To be cloned, the Java UDF must meet certain conditions.」と記載されており、特定の条件を満たせば、データベースやスキーマのクローン時にJava UDFもクローンされます。
        </li>
      </ul>
      <p className="pt-2">
        このように、クローン機能は非常に便利ですが、権限の継承ルール、Time Travelとの連携、そしてJava UDFのような特殊なオブジェクトの扱いについて正しく理解しておくことが重要です。
      </p>
    </div>
  );
}