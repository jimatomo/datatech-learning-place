import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "SQL", "Performance", "Snowflake Advanced"],
    created_at: new Date("2026-07-21"),
    updated_at: new Date("2026-07-21"),

    title: "VOLATILE UDFとDynamic Tableの増分リフレッシュ",
    question_jsx: <QuizQuestion />,
    options: {
      0: "2026年7月以降、Python/Java/Scala/JavaScript/SQLのスカラーVOLATILE UDFは、INCREMENTAL・AUTO・ADAPTIVEの増分リフレッシュで使える。",
      1: "増分リフレッシュでVOLATILEスカラーUDFを使う場合、配置できるのはSELECT句に限られる。",
      2: "UDTFはvolatilityに関係なく常にフルリフレッシュになり、lateral joinでのみサポートされる。",
      3: "VOLATILEスカラーUDFをWHERE句やGROUP BY句に置いても、INCREMENTALモードのまま増分リフレッシュできる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Release Notes - VOLATILE scalar UDFs with incremental refresh",
        url: "https://docs.snowflake.com/en/release-notes/2026/other/2026-07-16-volatile-udf-incremental-dynamic-tables",
      },
      {
        title: "Snowflake Documentation - Supported queries for dynamic tables",
        url: "https://docs.snowflake.com/en/user-guide/dynamic-tables/supported-queries",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Dynamic Tableの増分リフレッシュとUDFの関係について、
        <strong className="text-red-600">誤っているもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        以前はVOLATILEスカラーUDFが増分を阻む要因でしたが、2026年7月のGAでSELECT句での利用が解禁されました。
        それでも句の置き場所には制限があります。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          VOLATILEスカラーUDFをWHERE / GROUP BY / HAVING / QUALIFYに置く増分リフレッシュはサポートされません。
          SELECT句での利用に限られます。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>INCREMENTAL / AUTO / ADAPTIVEで、主要言語のスカラーVOLATILE UDFが増分対応になりました。</li>
        <li>UDTFは常にフルリフレッシュ要因で、lateral joinのみが対象です。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        UDFをDynamic Tableに入れるときは「volatility」だけでなく「どの句に置くか」を先に確認する。
        変換はSELECT、絞り込みは増分可能な組み込み式、という分担にするとフルリフレッシュへ落ちにくいです。
      </p>
    </div>
  );
}
