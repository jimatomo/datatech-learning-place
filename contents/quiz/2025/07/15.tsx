import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Advanced", "Snowflake Performance"],
    created_at: new Date("2025-07-15"),
    updated_at: new Date("2025-07-15"),

    // ----- quiz -----
    title: "Snowflake: クエリコンパイル時間が長くなる原因",
    question_jsx: <QuizQuestion />,
    options: {
      0: "複雑なJOIN条件やサブクエリが含まれるクエリでは、クエリプランナーが最適な実行計画を見つけるために時間がかかる。",
      1: "大量のテーブルやビューを参照するクエリでは、メタデータの収集と検証に時間がかかる。",
      2: "クエリに含まれるテーブルやカラムの数が多い場合、オプティマイザーがスキーマと統計情報を分析して最適なクエリプランを作成するために時間がかかる。",
      3: "コンパイル時間は常に実行時間より短く、パフォーマンスに影響を与えることはない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Understanding Why Compilation Time in Snowflake Can Be Higher than Execution Time",
        url: "https://community.snowflake.com/s/article/Understanding-Why-Compilation-Time-in-Snowflake-Can-Be-Higher-than-Execution-Time",
      },
      {
        title: "クエリプロファイル | Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/ui-query-profile",
      },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeのクエリコンパイル時間が長くなる原因について、
        <strong className="text-red-500">間違っているもの</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflakeでは、クエリのコンパイル時間が実行時間を上回ることがあります。
        これは、クエリプランナーが最適な実行計画を決定するために必要な処理が複雑であるためです。
        コンパイル時間の長さは、クエリの複雑さや参照するオブジェクトの数に大きく依存します。
      </p>

      <p className="py-2 font-semibold text-red-500">間違った選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            コンパイル時間は常に実行時間より短く、パフォーマンスに影響を与えることはない。：
          </strong>
          <br />
          これは<strong className="text-red-500">間違い</strong>
          です。Snowflakeでは、クエリの複雑さによってはコンパイル時間が実行時間を大幅に上回ることがあります。
          特に複雑なJOIN、多数のテーブル参照、または統計情報が不足している場合、
          クエリプランナーが最適な実行計画を決定するために数秒から数分かかることもあります。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            複雑なJOIN条件やサブクエリが含まれるクエリでは、クエリプランナーが最適な実行計画を見つけるために時間がかかる。：
          </strong>
          <br />
          これは<strong className="text-emerald-500">正しい</strong>
          です。複雑なJOIN条件やネストしたサブクエリがある場合、
          クエリプランナーは最適な結合順序や実行戦略を決定するために
          より多くの時間を必要とします。
        </li>
        <li className="pt-2">
          <strong>
            大量のテーブルやビューを参照するクエリでは、メタデータの収集と検証に時間がかかる。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。多数のテーブルやビューを参照するクエリでは、
          各オブジェクトのメタデータ（スキーマ、統計情報、権限など）を
          収集・検証する必要があり、これがコンパイル時間を増加させます。
        </li>
        <li className="pt-2">
          <strong>
            クエリに含まれるテーブルやカラムの数が多い場合、オプティマイザーがスキーマと統計情報を分析して最適なクエリプランを作成するために時間がかかる。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。クエリに含まれるテーブルやカラムの数が多い場合、
          オプティマイザーは各テーブルのスキーマと統計情報を分析して
          最適なクエリプランを作成する必要があり、
          これがコンパイル時間を延長させます。
        </li>
      </ul>

      <div className="mt-4">
        特にWindow関数などを多用するクエリでは飛躍的にコンパイル時間が実行時間よりも多くなったりする体感があります。
      </div>
    </div>
  );
}