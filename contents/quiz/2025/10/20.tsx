import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "SQL", "Data Management", "Snowflake Basic"],
    created_at: new Date("2025-10-20"),
    updated_at: new Date("2025-10-20"),

    // ----- quiz -----
    title: "Snowflake の DDL / DML を正しく分類できる？",
    question_jsx: <QuizQuestion />,
    options: {
      0: "DDL: CREATE TABLE, CREATE VIEW, ALTER TABLE, DROP SCHEMA / DML: INSERT, UPDATE, DELETE, MERGE",
      1: "DDL: CREATE TABLE, INSERT, CREATE SCHEMA / DML: UPDATE, DELETE, DROP VIEW",
      2: "DDL: CREATE TEMPORARY TABLE, ALTER WAREHOUSE, DROP PIPE, TRUNCATE TABLE / DML: MERGE, UPDATE",
      3: "DDL: CREATE OR REPLACE VIEW, ALTER TABLE, RENAME TABLE / DML: SELECT, INSERT, UPDATE",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "SQL DDL 概要 | Snowflake ドキュメント", url: "https://docs.snowflake.com/ja/sql-reference/sql-ddl-summary" },
      { title: "SQL DML | Snowflake ドキュメント", url: "https://docs.snowflake.com/ja/sql-reference/sql-dml" },
      { title: "TRUNCATE TABLE | Snowflake ドキュメント", url: "https://docs.snowflake.com/ja/sql-reference/sql/truncate-table" },
      { title: "ALTER TABLE | Snowflake ドキュメント", url: "https://docs.snowflake.com/ja/sql-reference/sql/alter-table" },
      { title: "ALTER VIEW | Snowflake ドキュメント", url: "https://docs.snowflake.com/ja/sql-reference/sql/alter-view" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflake では、テーブルやビューなどの<strong>オブジェクト定義・変更</strong>は DDL、
        データの<strong>追加・更新・削除</strong>は DML に分類されます。
        次の分類ペアのうち、<strong className="text-green-600">DDL と DML の組み合わせが正しいもの</strong>を 1 つ選んでください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-emerald-500">Correct mapping:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          DDL は <code>CREATE</code>/<code>ALTER</code>/<code>DROP</code> などのオブジェクト定義・管理操作。
          DML は <code>INSERT</code>/<code>UPDATE</code>/<code>DELETE</code>/<code>MERGE</code> のデータ操作です。
          よって「CREATE/ALTER/DROP 系 → DDL」「INSERT/UPDATE/DELETE/MERGE → DML」の組み合わせが正解です。
        </li>
      </ul>
      <p className="font-semibold text-red-500">Why other options are wrong:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          「INSERT」や「DROP VIEW」はそれぞれ DML と DDL であり、オプション内の分類が逆になっています（誤り）。
        </li>
        <li>
          「TRUNCATE TABLE」を DDL 側に置くのは誤りです。Snowflake 公式「一般 DML」一覧に <strong>TRUNCATE TABLE</strong> が含まれています（DML）。
        </li>
        <li>
          「SELECT」はデータ取得（DQL）であり、DML には含めません（誤り）。
        </li>
      </ul>
      <p className="pt-2">補足:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          一般論として、他の RDBMS では <code>TRUNCATE</code> を DDL に分類する例が多く、権限やトランザクション挙動も実装により異なります。
          Snowflake では公式ドキュメント上、<strong>一般 DML</strong> に <code>TRUNCATE TABLE</code> が含まれる点に注意してください。
        </li>
        <li>
          <code>RENAME</code> は Snowflake では独立コマンドではなく、各オブジェクトの <code>ALTER</code> オプションとして提供されます（例: <code>ALTER TABLE ... RENAME TO ...</code>、<code>ALTER VIEW ... RENAME TO ...</code>）。従って DDL の一部として扱います。
        </li>
      </ul>
    </div>
  );
}
