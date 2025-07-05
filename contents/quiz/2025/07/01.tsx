import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Stream", "Snowpark", "Snowpipe", "Kafka", "Data Processing"],
    created_at: new Date("2025-07-01"),
    updated_at: new Date("2025-07-01"),

    // ----- quiz -----
    title: "Snowflake: Stream、Snowpark、Snowpipe、Kafka Connectorの役割と機能",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Snowflake Streamはテーブルの変更（INSERT、UPDATE、DELETE）を追跡し、変更されたデータを記録するオブジェクトである。",
      1: "Snowparkは、Python、Scala、JavaでSnowflakeデータを処理するためのライブラリであり、SQLの代わりにプログラミング言語を使用してデータ処理を行うことができる。",
      2: "Snowpipeは、外部ステージに新しいファイルがアップロードされた際に自動的にデータを読み込むサービスで、サーバーレスでリアルタイムなデータ取り込みを実現する。",
      3: "Snowflake Connector for Kafkaは、KafkaトピックからSnowflakeにデータを自動的に取り込むためのツールであり、ストリーミングデータの処理に特化している。",
    },
    answers: [0, 1, 2, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Streams | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/streams",
      },
      {
        title: "Snowpark Developer Guide | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/developer-guide/snowpark/index",
      },
      {
        title: "Snowpipe | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/data-load-snowpipe",
      },
      {
        title: "Kafka Connector | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/kafka-connector",
      },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        SnowflakeのStream、Snowpark、Snowpipe、Snowflake Connector for Kafkaについて、
        <strong className="text-emerald-500">正しいもの</strong>を全て選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflakeには、データの処理・取り込み・監視を効率的に行うための様々なサービスとツールが用意されています。
        それぞれの役割と機能を理解することで、適切なデータパイプラインを構築できます。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            Snowflake Streamはテーブルの変更（INSERT、UPDATE、DELETE）を追跡し、変更されたデータを記録するオブジェクトである。：
          </strong>
          <br />
          これは<strong className="text-emerald-500">正しい</strong>
          です。Streamは、テーブルまたはビューに対するDML操作（INSERT、UPDATE、DELETE）を追跡し、
          変更されたデータ（Change Data Capture）を記録するオブジェクトです。
          <code>CREATE STREAM my_stream ON TABLE my_table</code>で作成します。
        </li>
        <li className="pt-2">
          <strong>
            Snowparkは、Python、Scala、JavaでSnowflakeデータを処理するためのライブラリであり、SQLの代わりにプログラミング言語を使用してデータ処理を行うことができる。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。Snowparkは、Python、Scala、JavaでSnowflakeデータを処理するためのライブラリセットです。
          DataFrameAPIを使用してデータ変換・分析を行い、UDF（User Defined Function）やストアドプロシージャも作成できます。
        </li>
        <li className="pt-2">
          <strong>
            Snowpipeは、外部ステージに新しいファイルがアップロードされた際に自動的にデータを読み込むサービスで、サーバーレスでリアルタイムなデータ取り込みを実現する。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。Snowpipeは、外部ステージ（S3、Azure Blob、GCS）に新しいファイルが追加されると
          自動的にデータを読み込むサーバーレスサービスです。ファイルイベント通知を使用してトリガーされます。
        </li>
        <li className="pt-2">
          <strong>
            Snowflake Connector for Kafkaは、KafkaトピックからSnowflakeにデータを自動的に取り込むためのツールであり、ストリーミングデータの処理に特化している。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。Kafka ConnectorはApache Kafkaのトピックから直接Snowflakeにデータを取り込むためのツールです。
          リアルタイムでストリーミングデータを処理し、JSON、Avro、Protobuf形式をサポートしています。
        </li>
      </ul>

      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400">
        <p className="font-semibold text-blue-800">各コンポーネントの使い分け：</p>
        <ul className="list-disc pl-4 text-blue-700 text-xs">
          <li><strong>Stream</strong>: テーブルの変更追跡、CDC（Change Data Capture）パターン</li>
          <li><strong>Snowpark</strong>: 複雑なデータ処理、機械学習、プログラミング言語でのデータ操作</li>
          <li><strong>Snowpipe</strong>: バッチファイルの自動取り込み、イベント駆動型データローディング</li>
          <li><strong>Kafka Connector</strong>: リアルタイムストリーミングデータの取り込み</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
        <p className="font-semibold text-yellow-800">実践的な使用例：</p>
        <ul className="list-disc pl-4 text-yellow-700 text-xs">
          <li>Stream + Task: 定期的な変更データの処理とETL</li>
          <li>Snowpark + Streamlit: インタラクティブなデータアプリケーション</li>
          <li>Snowpipe + Cloud Storage: 継続的なデータ取り込みパイプライン</li>
          <li>Kafka Connector + Stream: リアルタイムイベント処理</li>
        </ul>
      </div>
    </div>
  );
}