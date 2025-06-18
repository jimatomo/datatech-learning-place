import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Clone", "Time Travel", "Snowflake Advanced"],
    created_at: new Date("2025-06-18"),
    updated_at: new Date("2025-06-18"),

    // ----- quiz -----
    title: "Snowflake: データベースのクローニングとTime Travelに関する制限",
    question_jsx: <QuizQuestion />,
    options: {
      0: "データベースをクローンする際、子オブジェクトのデータ保持期間が親データベースより短く、指定した時点のデータがTime Travelで利用できない場合でも、クローン操作は常に成功する。",
      1: "IGNORE TABLES WITH INSUFFICIENT DATA RETENTION パラメータは、Time Travelでデータが利用できないテーブルが存在する場合に、それらのテーブルを空の状態でクローンするためのものである。",
      2: "データベース db1 (データ保持期間7日) とその中のテーブル t1 (データ保持期間1日) がある状況で、3日前の時点の db1 をクローンしようとすると、t1 のデータがTime Travelの範囲外のため、デフォルトではクローン操作は失敗する。",
      3: "AUTO_INGEST = TRUE のパイプが再作成された場合でも、Time Travel を使用してそのパイプを含むスキーマを任意の過去の時点にクローンすることができる。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "クローニングに関する考慮事項 | Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/object-clone",
      },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeでデータベースをクローンする際のTime Travelの利用に関する説明として、
        <strong className="text-emerald-500">正しいもの</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflakeのクローニング機能は非常に強力ですが、Time Travelと組み合わせる際にはいくつかの制限事項があります。特に、親子関係にあるオブジェクト間でデータ保持期間が異なる場合の挙動を理解しておくことは、意図しないエラーを避けるために重要です。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            データベース db1 (データ保持期間7日)
            とその中のテーブル t1 (データ保持期間1日)
            がある状況で、3日前の時点の db1 をクローンしようとすると、t1
            のデータがTime Travelの範囲外のため、デフォルトではクローン操作は失敗する。：
          </strong>
          <br />
          これは<strong className="text-emerald-500">正しい</strong>
          説明です。子オブジェクト（テーブル
          t1）のデータ保持期間が親オブジェクト（データベース
          db1）より短く、クローンしようとする時点（3日前）が子オブジェクトの保持期間（1日）を超えているため、t1の履歴データは利用できません。そのため、クローン操作は失敗します。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">誤っている選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            データベースをクローンする際、子オブジェクトのデータ保持期間が親データベースより短く、指定した時点のデータがTime
            Travelで利用できない場合でも、クローン操作は常に成功する。：
          </strong>
          <br />
          これは誤りです。上記で説明した通り、子オブジェクトの履歴データが利用できない場合、クローン操作はデフォルトで失敗します。
        </li>
        <li className="pt-2">
          <strong>
            IGNORE TABLES WITH INSUFFICIENT DATA RETENTION
            パラメータは、Time
            Travelでデータが利用できないテーブルが存在する場合に、それらのテーブルを空の状態でクローンするためのものである。：
          </strong>
          <br />
          これも誤りです。このパラメータは、履歴データが利用できないテーブルをクローン対象から
          <strong className="text-emerald-500">スキップ</strong>
          するためのものです。空の状態でクローンされるわけではありません。
        </li>
        <li className="pt-2">
          <strong>
            AUTO_INGEST = TRUE
            のパイプが再作成された場合でも、Time Travel
            を使用してそのパイプを含むスキーマを任意の過去の時点にクローンすることができる。：
          </strong>
          <br />
          これも誤りです。AUTO_INGEST = TRUE
          のパイプが再作成またはドロップされた場合、その時点より前の状態にスキーマやデータベースをクローンすることはできません。これはクローニングの制限事項の一つです。
        </li>
      </ul>
    </div>
  );
} 
