import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Iceberg", "Data Integration", "Datatech News"],
    created_at: new Date("2026-07-26"),
    updated_at: new Date("2026-07-26"),

    title: "Snowflake Datastreamの位置づけ",
    question_jsx: <QuizQuestion />,
    options: {
      0: "SnowflakeネイティブのApache Kafka互換ストリーミングで、既存のKafkaクライアントから設定変更で接続できることを目指している。",
      1: "トピックのデータを、Snowflakeのガバナンス境界内にあるSnowflakeテーブルやApache Icebergテーブルへ取り込める。",
      2: "Kafkaが倉庫への取り込み専用で、他の複数消費者を持たない構成では、ブローカー運用を減らす選択肢になり得る。",
      3: "Datastreamはすでに全リージョンでGAであり、複数システムへファンアウトする社内イベントバス用途でも、常に既存Kafkaクラスタの完全置換が公式に推奨される。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake - Datastream product page",
        url: "https://www.snowflake.com/en/product/features/datastream/",
      },
      {
        title: "Snowflake Builders Blog - Your Kafka Infrastructure Just Became Optional",
        url: "https://medium.com/snowflake/your-kafka-infrastructure-just-became-optional-8b72a40250e2",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflake Summit 2026前後で注目されているDatastreamについて、
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
        Datastreamは、Kafkaプロトコルで話すプロデューサーをSnowflake側のネイティブエンドポイントへ直接つなぐ構想のプロダクトです。
        公式ページ時点ではPrivate Preview Soonであり、可用性や適用範囲はこれから固まる段階です。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          全リージョンGAでも、イベントバスとして複数消費者がいる構成の「常時完全置換推奨」でもありません。
          複数消費者があるならKafkaを残し、倉庫への取り込み側だけOpenflow等で簡略化する判断が現実的です。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>Kafka互換を掲げ、既存クライアントからの接続を想定しています。</li>
        <li>取り込んだデータはSnowflake/Icebergテーブルとしてガバナンス配下に置けます。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「Kafkaを消せるか」はプロトコル互換より、消費者が何人いるかで決まる。
        倉庫専用パイプならDatastream検討、社内バスならKafka維持＋取り込み最適化、が使い分けの出発点です。
      </p>
    </div>
  );
}
