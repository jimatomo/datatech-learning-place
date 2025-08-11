import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Advanced", "Snowflake Performance"],
    created_at: new Date("2025-01-28"),
    updated_at: new Date("2025-01-28"),

    // ----- quiz -----
    title: "Snowflakeのハイブリッドテーブルの特徴について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "ハイブリッドテーブルは、主キーの設定が任意であり、一意性の強制は不要である",
      1: "分析クエリのパフォーマンスを向上させるため、データは非同期的にオブジェクトストレージにコピーされる",
      2: "ハイブリッドテーブルは、列指向のマイクロパーティションをプライマリデータレイアウトとして使用する",
      3: "ハイブリッドテーブルは、他のSnowflakeテーブルと結合でき、同じクエリエンジンで実行される",
      4: "ハイブリッドテーブルは、高同時実行性のランダムなRead/Writeや巨大テーブルの少数レコードの行全体の取得などのワークロードに適している",
    },
    answers: [1, 3, 4],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake - ハイブリッドテーブル", url: "https://docs.snowflake.com/ja/user-guide/tables-hybrid" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeのハイブリッドテーブルに関する説明として、正しいものを選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        以下が正解の説明です：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          分析クエリのパフォーマンスを向上させるため、データは非同期的にオブジェクトストレージにコピーされます。
          これにより、進行中の運用ワークロードに影響を与えることなく、大規模なスキャンのパフォーマンスとワークロードの分離が向上します。
          また、分析クエリのパフォーマンスを向上させるために、一部のデータはウェアハウスに列形式でキャッシュされる場合もあります。
        </li>
        <li className="pb-1">
          ハイブリッドテーブルは他のSnowflakeテーブルと結合でき、クエリは同じクエリエンジンでネイティブかつ効率的に実行されます。
          フェデレーションは必要なく、アトミックトランザクションも実行可能です。
        </li>
        <li>
          Snowflake標準テーブルでは大規模な分析クエリでより優れたパフォーマンスが期待できますが、
          ハイブリッドテーブルでは実行時間の短い操作クエリでより高速に結果を得ることができます。
          列志向のストレージと行志向のストレージの違いを意識してみると強みがわかりやすいです。
        </li>
      </ul>
      <p>
        誤った選択肢の説明：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          ハイブリッドテーブルでは、主キーの設定は必須であり、一意性が強制されます。
          これは標準テーブルとは異なる特徴です。
        </li>
        <li>
          ハイブリッドテーブルは、行ストアをプライマリデータストアとして活用します。
          これにより、優れた運用クエリパフォーマンスを提供します。
          標準テーブルとは異なり、列指向のマイクロパーティションは使用しません。
        </li>
      </ul>
    </div>
  );
} 
