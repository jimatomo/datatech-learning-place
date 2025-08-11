import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Lakehouse", "Infrastructure"],
    created_at: new Date("2025-07-24"),
    updated_at: new Date("2025-07-24"),

    // ----- quiz -----
    title: "スキーマオンリードとスキーマオンライト",
    question_jsx: <QuizQuestion />,
    options: {
      0: "データを書き込む（Write）際にスキーマを定義し、データが高い構造化と一貫性を持つことを保証するアプローチ。",
      1: "JSONやAVROのような半構造化データをリレーショナルデータベースにロードする前に、厳密なETLプロセスで構造化データに変換する必要がある。",
      2: "データを読み取る（Read）際にスキーマを適用するアプローチで、データレイクのように多様な形式のデータをそのままの形で保存できる柔軟性を持つ。",
      3: "クエリパフォーマンスを最大化するため、全てのデータを事前に定義されたリレーショナルスキーマにマッピングする。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Part I: Making Schema-on-Read a Reality - Snowflake Blog",
        url: "https://www.snowflake.com/en/blog/snowflake-sql-making-schema-on-read-a-reality-part-1-2/",
      },
      {
        title: "データレイクとは？| Talend",
        url: "https://www.talend.com/jp/resources/what-is-data-lake/",
      },
      {
        title: "データレイクとデータウェアハウスの7つの主な違い | Integrate.io",
        url: "https://www.integrate.io/jp/blog/7-key-differences-between-data-lakes-vs-data-warehouses-ja/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        スキーマオンリード（Schema-on-Read）のコンセプトに関する記述として、
        <strong className="text-emerald-500">最も適切な</strong>
        ものはどれですか？
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        スキーマオンリード（Schema-on-Read）は、データを読み取る時点でスキーマを適用するアプローチです。これにより、データレイクのように、構造化、半構造化、非構造化など、さまざまな形式のデータを未加工のまま保存できます。
      </p>
      <p className="py-2">
        選択肢の中で正しいものは次のとおりです。
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>
            「データを読み取る（Read）際にスキーマを適用するアプローチで、データレイクのように多様な形式のデータをそのままの形で保存できる柔軟性を持つ。」
          </strong>
          ：これは正しい記述です。スキーマオンリードは、ロード時にスキーマを強制せず、分析クエリを実行する際にデータを解釈します。このため、スキーマが変動しやすい半構造化データ（JSON、Avroなど）を扱うのに非常に適しています。
        </li>
      </ul>
      <p className="py-2">その他の選択肢は間違った記述です：</p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>
            「データを書き込む（Write）際にスキーマを定義し、データが高い構造化と一貫性を持つことを保証するアプローチ。」
          </strong>
          ：これは<strong className="text-red-500">スキーマオンライト（Schema-on-Write）</strong>の説明です。従来のデータウェアハウスで採用されているアプローチで、データのロード前にスキーマを定義し、ETLプロセスでデータを整形します。
        </li>
        <li className="pb-2">
          <strong>
            「JSONやAVROのような半構造化データをリレーショナルデータベースにロードする前に、厳密なETLプロセスで構造化データに変換する必要がある。」
          </strong>
          ：これはスキーマオンライトのアプローチで必要とされることが多い処理であり、スキーマオンリードが解決しようとする課題です。SnowflakeのVARIANT型のように、スキーマオンリードを実装したシステムでは、半構造化データを直接ロードしてクエリできます。
        </li>
        <li className="pb-2">
          <strong>
            「クエリパフォーマンスを最大化するため、全てのデータを事前に定義されたリレーショナルスキーマにマッピングする。」
          </strong>
          ：これはスキーマオンライトの利点の一つです。事前にデータが構造化されているため、クエリのパフォーマンスは高くなる傾向にありますが、スキーマオンリードの柔軟性とはトレードオフの関係にあります。
        </li>
      </ul>
      <p className="py-2">
        <strong>スキーマオンリード vs スキーマオンライト:</strong>
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-1">
          <strong>スキーマオンリード:</strong>
          <ul className="list-disc pl-4">
            <li className="pb-1"><strong>適用タイミング:</strong> 読み取り時</li>
            <li className="pb-1"><strong>柔軟性:</strong> 高い。多様なデータ形式をそのまま保存可能。</li>
            <li className="pb-1"><strong>主な用途:</strong> データレイク、ビッグデータ分析</li>
            <li className="pb-1"><strong>代表的な技術:</strong> Hadoop, Snowflake (VARIANT)</li>
          </ul>
        </li>
        <li className="pb-1">
          <strong>スキーマオンライト:</strong>
          <ul className="list-disc pl-4">
            <li className="pb-1"><strong>適用タイミング:</strong> 書き込み時</li>
            <li className="pb-1"><strong>データ品質:</strong> 高い。一貫性が保証される。</li>
            <li className="pb-1"><strong>主な用途:</strong> 従来型データウェアハウス、BIレポート</li>
            <li className="pb-1"><strong>代表的な技術:</strong> 従来のリレーショナルデータベース</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}