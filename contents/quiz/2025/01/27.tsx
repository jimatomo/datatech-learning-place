import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Warehouse"],
    created_at: new Date("2025-01-27"),
    updated_at: new Date("2025-01-27"),

    // ----- quiz -----
    title: "Snowflakeのウェアハウスの特徴について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "ウェアハウスのサイズを大きくすると、データロードのパフォーマンスは必ず向上する",
      1: "実行時間が1秒でクエリが終了した場合でも60秒のクレジットが消費される",
      2: "クエリの同時実行性がボトルネックになっている場合には、ウェアハウスのサイズを大きくすることが推奨されている",
      3: "デフォルトでは、自動中断(600秒)と自動再開の両方が有効になっている",
      4: "ウェアハウスのサイズを一つ上げると単位時間あたりに消費されるクレジットは2倍になる",
    },
    answers: [1, 3, 4],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake - ウェアハウスの概要", url: "https://docs.snowflake.com/ja/user-guide/warehouses-overview" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeのウェアハウスに関する説明として、正しいものを選択してください。
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
        <li>
          Snowflakeの請求は1秒単位ですが、ウェアハウスが起動するたびに最小60秒が課金されます。
          細切れで長期間実行される処理に利用するウェアハウスの場合はサイズをなるべく小さくすることが重要です。
        </li>
        <li>
          デフォルトでは、自動中断(600秒)と自動再開の両方が有効になっています。
          これにより、アクティビティがない場合は自動的に中断され、必要な時に自動的に再開されます。
          必要に応じて60秒などの短い時間に設定することも可能なので、調整することを推奨します。
        </li>
        <li>
          ウェアハウスのサイズを一つ上げると単位時間あたりに消費されるクレジットは2倍になります。
          課金体系をしっかりと理解して、コストパフォーマンスの最大化を目指しましょう。
          特にストレージやS3へのスピルが大きくなっている場合はウェアハウスのサイズを大きくすることが効果的な場合もあります。
          もちろんクエリのパフォーマンスチューニングも必要です。
        </li>
      </ul>
      <p>
        誤った選択肢の説明：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          データロードのパフォーマンスは、ウェアハウスのサイズよりも、
          ロードされるファイルの数と各ファイルのサイズの影響を大きく受けます。
          また、小さくてシンプルなクエリの場合はリソースの多さの恩恵があまり受けられません。
        </li>
        <li>
          クエリの同時実行性がボトルネックになっている場合には、
          ウェアハウスのサイズを大きくすることよりもマルチクラスターを利用することが推奨されています。
        </li>
      </ul>
    </div>
  );
} 
