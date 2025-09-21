import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Kafka", "Snowpipe", "Snowpipe Streaming", "Snowflake Advanced"],
    created_at: new Date("2025-09-23"),
    updated_at: new Date("2025-09-23"),

    // ----- quiz -----
    title: "Snowflake Kafka Connectorの仕様",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Kafkaコネクタは、SnowpipeとSnowpipe Streamingの2つのデータロード方法をサポートしている。",
      1: "データをロードするテーブルは、デフォルトでRECORD_CONTENTとRECORD_METADATAという2つのVARIANT型のカラムを持つ。",
      2: "RECORD_METADATAカラムには、Kafkaのtopic名、partition番号、offset値などが含まれる。",
      3: "複数のKafkaコネクタインスタンスを同じトピックで実行すると、自動的に負荷分散され、重複なくデータがロードされる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Overview of the Kafka connector",
        url: "https://docs.snowflake.com/en/user-guide/kafka-connector-overview",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        SnowflakeのKafkaコネクタに関する説明として、<strong className="text-red-600">誤っているもの</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        SnowflakeのKafkaコネクタは、KafkaとSnowflakeを連携させるための重要なコンポーネントですが、その設計や仕様にはいくつかの注意点があります。
      </p>
      <br />
      <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong>複数のKafkaコネクタインスタンスを同じトピックで実行すると、自動的に負荷分散され、重複なくデータがロードされる。:</strong><br/>
          これは誤りです。公式ドキュメントには「Kafkaコネクタのインスタンスは互いに通信しません。同じトピックまたはパーティションで複数のコネクタインスタンスを開始すると、同じ行の複数のコピーがテーブルに挿入される可能性があります。」と記載されています。そのため、各トピックは単一のコネクタインスタンスによって処理されることが推奨されます。
        </li>
      </ul>
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong>Kafkaコネクタは、SnowpipeとSnowpipe Streamingの2つのデータロード方法をサポートしている。:</strong><br/>
          これは正しい記載です。Kafkaコネクタは、マイクロバッチでロードするSnowpipeと、低レイテンシーなストリーミング取り込みを実現するSnowpipe Streamingの両方をサポートしています。
        </li>
        <li>
          <strong>データをロードするテーブルは、デフォルトでRECORD_CONTENTとRECORD_METADATAという2つのVARIANT型のカラムを持つ。:</strong><br/>
          これも正しい記載です。RECORD_CONTENTにはKafkaメッセージ本体が、RECORD_METADATAにはトピック名やパーティション、オフセットなどのメタデータが格納されます。
        </li>
        <li>
          <strong>RECORD_METADATAカラムには、Kafkaのtopic名、partition番号、offset値などが含まれる。:</strong><br/>
          これも正しい記載です。これにより、Snowflake側でデータの出所や順序を特定することが可能になります。
        </li>
      </ul>
    </div>
  );
}