import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Modeling", "SQL", "Snowflake"],
    created_at: new Date("2025-04-23"),
    updated_at: new Date("2025-04-23"),

    // ----- quiz -----
    title: "SnowflakeのTIMESTAMP型について",
    question_jsx: <QuizQuestion />,
    options: {
      0: "TIMESTAMP_NTZ はタイムゾーン情報を考慮せず、「wallclock」の時間を指定された精度で内部的に格納する。",
      1: "TIMESTAMP_LTZ はUTC時間を指定された精度で内部的に格納するが、全ての操作はセッションのタイムゾーンで行われる。",
      2: "TIMESTAMP_TZ はUTC時間と関連するタイムゾーンオフセットの両方を内部的に格納し、各レコードに固有のタイムゾーンオフセットで操作が実行される。",
      3: "TIMESTAMP_TZ 型の値は、セッションのタイムゾーンに基づいて比較される。",
    },
    answers: [3], // 誤っている選択肢
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "日付と時刻のデータ型 | Snowflake ドキュメント", url: "https://docs.snowflake.com/ja/sql-reference/data-types-datetime" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeは、TIMESTAMP_LTZ、TIMESTAMP_NTZ、TIMESTAMP_TZ という3種類のタイムスタンプデータ型をサポートしています。
        これらのデータ型に関する説明のうち、<strong className="text-red-500">誤っているもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  const code1 = `
SELECT '2024-01-01 00:00:00 +0000'::TIMESTAMP_TZ = '2024-01-01 01:00:00 +0100'::TIMESTAMP_TZ;
-- 結果: TRUE (どちらも同じUTC時間を表すため)
  `.trim();

  const code2 = `
-- TIMEZONE = 'America/Los_Angeles' (-0800) のセッションで実行
SELECT '2024-01-01 12:00:00'::TIMESTAMP_TZ;
-- 結果: 2024-01-01 12:00:00.000 -0800

SELECT DATEADD(MONTH, 6, '2024-01-01 12:00:00'::TIMESTAMP_TZ);
-- 結果: 2024-07-01 12:00:00.000 -0800
-- (7月は本来-0700だが、保存されたオフセット-0800が維持される)
  `.trim();

  return (
    <div className="text-xs md:text-sm">
      <p>
        SnowflakeのTIMESTAMP型は、タイムゾーンの扱い方によって3種類に分かれます。それぞれの特徴を理解することが重要です。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>TIMESTAMP_NTZ はタイムゾーン情報を考慮せず、「wallclock」の時間を指定された精度で内部的に格納する:</strong>
          <br />
          これは正しい説明です。TIMESTAMP_NTZ（No Time Zone）は、タイムゾーン情報を一切持ちません。記録されたそのままの時刻（例えば会議の開始時刻など）を表します。操作もタイムゾーンの影響を受けません。
        </li>
        <li>
          <strong>TIMESTAMP_LTZ はUTC時間を指定された精度で内部的に格納するが、全ての操作はセッションのタイムゾーンで行われる:</strong>
          <br />
          これも正しい説明です。TIMESTAMP_LTZ（Local Time Zone）は、内部的にはUTC（協定世界時）でデータを保持しますが、表示や操作時には現在のセッションで設定されているタイムゾーン (TIMEZONE パラメータ) に変換されます。ユーザーが見ているローカル時間に合わせた表示が必要な場合に適しています。
        </li>
        <li>
          <strong>TIMESTAMP_TZ はUTC時間と関連するタイムゾーンオフセットの両方を内部的に格納し、各レコードに固有のタイムゾーンオフセットで操作が実行される:</strong>
          <br />
          これも正しい説明です。TIMESTAMP_TZ（Time Zone）は、UTC時間と、そのデータが入力された時点でのタイムゾーンオフセット（例: -0700 や +0900）をペアで格納します。これにより、元のタイムゾーン情報を保持したままデータを扱うことができます。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">誤った選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong className="text-red-500">TIMESTAMP_TZ 型の値は、セッションのタイムゾーンに基づいて比較される:</strong>
          <br />
          これは誤りです。TIMESTAMP_TZ 型の値は、格納されているUTC時間に基づいて比較されます。タイムゾーンオフセットが異なっていても、それらが示すUTC時間が同じであれば等しいと評価されます。セッションのタイムゾーンは比較には影響しません。
          <CodeBlock code={code1} /> {/* classNameを削除 */}
        </li>
      </ul>

      <p className="pt-4">
        <strong>補足: TIMESTAMP_TZ の注意点</strong>
      </p>
      <p className="pt-2">
        TIMESTAMP_TZ は値が作成された時点の「タイムゾーンオフセット」のみを保存し、実際の「タイムゾーン名」（例: America/Los_Angeles）は保存しません。このため、夏時間（DST）の境界をまたぐような日付計算を行う際に注意が必要です。オフセットは元の値のものが維持されるため、計算後の日付が夏時間期間に入っていても、オフセットは自動的に調整されません。
      </p>
      <CodeBlock code={code2} /> {/* classNameを削除 */}

      <p className="pt-4">
        <strong>まとめ:</strong>
      </p>
      <p className="pt-2">
        TIMESTAMP_NTZ はタイムゾーンなし、TIMESTAMP_LTZ はセッションのローカルタイムゾーン、TIMESTAMP_TZ は個別のタイムゾーンオフセット付き、と覚えておくと良いでしょう。特に TIMESTAMP_TZ の比較はUTC基準で行われる点と、オフセットのみが保存される点に注意が必要です。
      </p>
    </div>
  );
} 
