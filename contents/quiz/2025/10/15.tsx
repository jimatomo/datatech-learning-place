import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "SQL", "Data Integration", "Data Modeling"],
    created_at: new Date("2025-10-15"),
    updated_at: new Date("2025-10-15"),

    // ----- quiz -----
    title: "Snowflakeの半構造化データのクエリ基礎（VARIANT/FLATTEN）",
    question_jsx: <QuizQuestion />,
    options: {
      0: "VARIANT/OBJECT/ARRAYに格納したJSONは、col:obj.key や col:arr[0] のようなパス表記で参照でき、キーに特殊文字がある場合は col:\"x-y\" のように二重引用符で囲む。",
      1: "配列の要素を行として扱うには LATERAL FLATTEN(input => col:path) を使うのが一般的で、展開後は value 列に各要素が入る。",
      2: "パス抽出の結果は基本的にVARIANT型のままなので、比較・集計には ::NUMBER や ::STRING、または TRY_TO_NUMBER などで明示的にキャストする。",
      3: "FLATTENは配列にしか使用できず、OBJECT型の展開には対応していない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Querying Semi-Structured Data | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/querying-semistructured",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeの半構造化データ（VARIANT/OBJECT/ARRAY）のクエリ方法に関して、<strong className="text-red-600">誤っているもの</strong>を1つ選んでください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>各選択肢の解説です。</p>
      <p className="font-semibold text-red-500 pt-2">誤っている記述（解答）:</p>
      <p>
        「FLATTENは配列にしか使用できず、OBJECT型の展開には対応していない。」は誤りです。FLATTENは
        配列だけでなく、OBJECT（およびVARIANT）にも適用でき、各キー（key）と値（value）を行として展開できます。
      </p>

      <p className="font-semibold text-green-600 pt-2">正しい記述:</p>
      <ul className="list-disc pl-4 py-2 space-y-1">
        <li>
          パス表記は col:obj.key や col:arr[0] のように記述します。キーにスペースやハイフンなどの特殊文字が含まれる場合は
          col:&quot;x-y&quot; のように二重引用符で囲みます。
        </li>
        <li>
          ネスト配列の要素を行として取り出す典型手段は LATERAL FLATTEN(input =&gt; col:path) です。展開後は value 列（および
          index/key などのメタ列）を使って参照します。
        </li>
        <li>
          パス抽出の結果はVARIANT型のままです。数値の比較や集計・文字列操作では ::NUMBER や ::STRING、TRY_TO_NUMBER などで
          明示的にキャストするのが実務上の定石です。
        </li>
      </ul>
    </div>
  );
}
