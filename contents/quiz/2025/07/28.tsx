import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Basic", "Performance"],
    created_at: new Date("2025-07-28"),
    updated_at: new Date("2025-07-28"),

    // ----- quiz -----
    title: "Snowflakeウェアハウスのサイズ変更の挙動",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ウェアハウスのサイズを大きくすると、主に同時実行ユーザー数が増加する。",
      1: "現在実行中のクエリは変更前のサイズで完了し、キュー内のクエリと新しいクエリが新しいサイズで処理される。",
      2: "実行中のすべてのクエリは即座に中断され、新しいサイズで再実行される必要がある。",
      3: "ウェアハウスのサイズを大きくしても、1時間あたりのクレジット消費レートは変わらない。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "ウェアハウスの概要 - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/warehouses-overview",
      },
      {
        title: "ALTER WAREHOUSE - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/sql-reference/sql/alter-warehouse",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        実行中の仮想ウェアハウスのサイズを ALTER WAREHOUSE
        コマンドで大きくした場合、その挙動として最も適切な説明はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflakeの仮想ウェアハウスのサイズ変更は、パフォーマンスチューニングにおける重要な操作ですが、その際の挙動を正しく理解しておくことが重要です。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-red-500">
            ウェアハウスのサイズを大きくすると、主に同時実行ユーザー数が増加する。
          </strong>
          ：これは間違いです。ウェアハウスのサイズ変更は、主に単一クエリのパフォーマンス（処理速度）を向上させることを目的としています。より多くのクエリを同時に処理する、つまり同時実行性を高めるには、マルチクラスターウェアハウスの設定が推奨されます。
        </li>
        <li>
          <strong className="text-emerald-500">
            現在実行中のクエリは変更前のサイズで完了し、キュー内のクエリと新しいクエリが新しいサイズで処理される。
          </strong>
          ：これが正しい説明です。ALTER WAREHOUSE を実行しても、すでに実行中のクエリは中断されません。
          それらのクエリは変更前のウェアハウスサイズで完了します。キューに入っているクエリや、コマンド実行後に新たに開始されるクエリから、新しいウェアハウスサイズが適用されます。これにより、運用中でも安全にサイズ変更が可能です。
        </li>
        <li>
          <strong className="text-red-500">
            実行中のすべてのクエリは即座に中断され、新しいサイズで再実行される必要がある。
          </strong>
          ：これも間違いです。実行中のクエリは中断されず、最後まで実行されるため、ダウンタイムは発生しません。
        </li>
        <li>
          <strong className="text-red-500">
            ウェアハウスのサイズを大きくしても、1時間あたりのクレジット消費レートは変わらない。
          </strong>
          ：これも間違いです。ウェアハウスのサイズを1段階大きくすると（例: SからMへ）、1時間あたりのクレジット消費レートは2倍になります。パフォーマンスとコストはトレードオフの関係にあります。
        </li>
      </ul>
      <p className="pt-2">
        結論として、ウェアハウスのサイズ変更は実行中の処理に影響を与えることなく、今後のクエリのパフォーマンスを向上させるための柔軟な機能です。ただし、コストとのバランスを常に考慮する必要があります。
      </p>
    </div>
  );
}