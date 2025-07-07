import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "INFORMATION_SCHEMA", "Snowflake Basic"],
    created_at: new Date("2025-07-07"),
    updated_at: new Date("2025-07-07"),

    // ----- quiz -----
    title: "SnowflakeのINFORMATION_SCHEMAの特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "INFORMATION_SCHEMAはユーザーが手動で作成する必要がある",
      1: "INFORMATION_SCHEMAのビューとテーブル関数は変更可能である",
      2: "INFORMATION_SCHEMAは各データベースに自動的に作成される読み取り専用のスキーマである",
      3: "INFORMATION_SCHEMAにはSnowflake固有のオブジェクトの情報は含まれない",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Information Schema - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/sql-reference/info-schema"
      },
      {
        title: "Information Schema Views - Snowflake Documentation", 
        url: "https://docs.snowflake.com/ja/sql-reference/info-schema#information-schema-views-and-table-functions"
      }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        SnowflakeのINFORMATION_SCHEMAについて、正しい説明はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        SnowflakeのINFORMATION_SCHEMAに関する各選択肢の説明と正解の理由を説明します。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-red-500">INFORMATION_SCHEMAはユーザーが手動で作成する必要がある</strong>：
          これは間違いです。INFORMATION_SCHEMAは、Snowflakeがアカウント内のすべてのデータベースに自動的に作成するスキーマです。ユーザーが手動で作成する必要はありません。
        </li>
        <li>
          <strong className="text-red-500">INFORMATION_SCHEMAのビューとテーブル関数は変更可能である</strong>：
          これは間違いです。INFORMATION_SCHEMAスキーマは読み取り専用であり、スキーマ内のすべてのビューとテーブル関数は変更または削除できません。これはシステムによって管理されているためです。
        </li>
        <li>
          <strong className="text-emerald-500">INFORMATION_SCHEMAは各データベースに自動的に作成される読み取り専用のスキーマである</strong>：
          これが正しい答えです。アカウントで作成された各データベースには、INFORMATION_SCHEMAという名前の組み込み、読み取り専用スキーマが自動的に含まれます。このスキーマは、データベースに含まれるすべてのオブジェクトのビュー、およびアカウントレベルのオブジェクトのビューを提供します。
        </li>
        <li>
          <strong className="text-red-500">INFORMATION_SCHEMAにはSnowflake固有のオブジェクトの情報は含まれない</strong>：
          これは間違いです。INFORMATION_SCHEMAには、ANSI標準のビューに加えて、Snowflakeがサポートする非標準オブジェクト（ステージ、ファイル形式など）のSnowflake固有のビューも含まれています。
        </li>
      </ul>
      <p className="pt-2">
        INFORMATION_SCHEMAは、アカウントで作成されたオブジェクトに関する広範なメタデータ情報を提供するシステム定義のビューとテーブル関数のセットです。SQL-92 ANSI情報スキーマに基づいていますが、Snowflakeに固有のビューと機能が追加されており、データディクショナリとしても知られています。
      </p>
    </div>
  );
}