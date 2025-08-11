import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "COPY INTO", "Data Loading", "Snowflake Advanced"],
    created_at: new Date("2025-08-12"),
    updated_at: new Date("2025-08-12"),

    // ----- quiz -----
    title: "Snowflake: COPY INTOでのデータ変換",
    question_jsx: <QuizQuestion />,
    options: {
      0: "SELECT句を使用した列の並べ替え、省略、キャスト",
      1: "TRUNCATECOLUMNSオプションによる文字列の切り捨て",
      2: "シーケンスを使用した自動インクリメント値の割り当て",
      3: "FLATTEN関数を使用した半構造化データのフラット化",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Transforming data during a load | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/data-load-transform",
      },
      {
        title: "Snowflake TRUNCATECOLUMNSについて | Zenn",
        url: "https://zenn.dev/kyami/articles/17bc37b7bd3086",
      },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeの<code>COPY INTO &lt;table&gt;</code>
        コマンドを使用してデータをロードする際に、サポートされていないデータ変換操作を
        <strong>1つ</strong>選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflakeの<code>COPY INTO</code>
        コマンドは、データをテーブルにロードする際に、ETLパイプラインを簡素化できる多くの変換機能をサポートしています。しかし、全てのSQL関数や操作が同等にサポートされているわけではありません。
      </p>

      <p className="py-2 font-semibold text-red-500">不正解の選択肢（正答）：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>FLATTEN関数を使用した半構造化データのフラット化：</strong>
          これが<strong className="text-red-500">正解</strong>です。<code>COPY INTO</code>の<code>FROM</code>句でサブクエリを使い、その中で<code>FLATTEN</code>関数を利用することは可能ですが、これはサブクエリの機能であり、<code>COPY INTO</code>コマンドが直接提供する変換オプションとは見なされません。そのため、サポートされていない操作としてこの選択肢が正解となります。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい操作（不正解の選択肢）：</p>
      <ul className="list-disc pl-6">
        <li className="pt-2">
          <strong>SELECT句を使用した列の並べ替え、省略、キャスト：</strong>
          これはサポートされています。COPY元のSELECT句で、列の順序を変更したり、特定の列のみを選択したり、データ型をキャストしたりすることが可能です。
        </li>
        <li className="pt-2">
          <strong>TRUNCATECOLUMNSオプションによる文字列の切り捨て：</strong>
          これもサポートされています。
          <code>TRUNCATECOLUMNS = TRUE</code>
          を指定すると、ターゲットカラムの長さを超える文字列が自動的に切り捨てられます。
        </li>
        <li className="pt-2">
          <strong>シーケンスを使用した自動インクリメント値の割り当て：</strong>
          これもサポートされています。<code>FROM</code>句のSELECTサブクエリで<code>シーケンス名.nextval</code>を呼び出すことで、ターゲット列に一意の連番を割り当てることができます。
        </li>
      </ul>
    </div>
  );
}