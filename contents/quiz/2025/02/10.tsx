import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Temporary Table", "Transient Table", "Snowflake Basic"],
    created_at: new Date("2025-02-10"),
    updated_at: new Date("2025-02-10"),

    // ----- quiz -----
    title: "Snowflakeの仮テーブルと一時テーブル",
    question_jsx: <QuizQuestion />,
    options: {
      0: "仮テーブルはセッション終了後も保持され、一時テーブルはセッション終了時に削除される",
      1: "仮テーブルと一時テーブルの両方でTime Travel保持期間は最大1日",
      2: "仮テーブルと一時テーブルの両方でFail-safe機能が利用可能",
      3: "一時テーブルは永続テーブルのクローン元として使用できる",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "仮テーブルと一時テーブルの使用", url: "https://docs.snowflake.com/ja/user-guide/tables-temp-transient" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeは、テーブルを作成する際のデフォルトのテーブルタイプである永続テーブルに加えて、
        仮テーブル（Temporary Table）または一時テーブル（Transient Table）をサポートしています。
        これらのタイプのテーブルは、長期間維持する必要のないデータ（つまり、一時データ）を保存するのに特に役立ちます。
        以下の選択肢の中から、これらのテーブルタイプに関する説明として正しいものを選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeの仮テーブルと一時テーブルの特徴に関する問題です。
      </p>
      <p className="pt-2">
        それぞれの選択肢について説明します：
      </p>
      <ul className="list-disc pl-6 pt-2">
        <li className="pb-2">
          仮テーブル（Temporary Table）はセッション内でのみ存在し、セッション終了時に削除されます。
          一方、一時テーブル（Transient Table）は明示的に削除されるまで保持されます。
        </li>
        <li className="pb-2">
          仮テーブルと一時テーブルの両方で、Time Travel保持期間は0または1日（デフォルトは1日）です。
        </li>
        <li className="pb-2">
          仮テーブルと一時テーブルの両方でFail-safe機能は利用できません。
          Fail-safe機能は永続テーブルでのみ利用可能で、7日間のデータ保護を提供します。
        </li>
        <li>
          一時テーブルは永続テーブルのクローン元としては使用できません。
          ただし、永続テーブルのクローンとして一時テーブルを作成することは可能です。
        </li>
      </ul>
      <p className="pt-2">
        仮テーブルはETLやセッション固有のデータなど、セッション内でのみ必要な一時的なデータに適しています。
        例えば、ETLプロセスでステージからファイルをCOPY iNTOなどを利用してロードする際に利用される場合があります。
      </p>
      <p className="pt-2">
        一時テーブルは、Fail-safe保護は必要ないものの、セッションを超えて保持する必要がある一時的なデータに適しています。
        dbtを利用すると明示的に指定しない限り、tableなどのモデルはTransient Tableとして作成されます。
      </p>
    </div>
  );
} 

