import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Amazon Athena", "AWS", "Serverless", "Infrastructure"],
    created_at: new Date("2025-07-31"),
    updated_at: new Date("2025-07-31"),

    // ----- quiz -----
    title: "Amazon Athenaの主な用途",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Amazon S3に保存されているデータに対し、サーバーやクラスターを管理することなく、標準SQLを用いてアドホックなインタラクティブクエリを実行する。",
      1: "複数の業務システムからデータを集約して共通フォーマットで長期間保存し、複雑なBIレポートを作成する。",
      2: "SparkやHadoopなどのフレームワーク上でカスタムコードを実行し、大規模なデータ変換や機械学習タスクを処理する。",
      3: "リアルタイムのトランザクション処理（OLTP）をミリ秒単位のレイテンシで高速に実行する。",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "When should I use Athena? - Amazon Athena",
        url: "https://docs.aws.amazon.com/athena/latest/ug/when-should-i-use-ate.html",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Amazon Athenaの主なユースケースとして、
        <strong className="text-emerald-500">最も適切なもの</strong>
        はどれですか？
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        Amazon Athenaは、Amazon
        S3に保存された非構造化、半構造化、構造化データを、サーバーをセットアップしたり管理したりすることなく、標準SQLを使用して簡単に分析できるインタラクティブなクエリサービスです。
      </p>
      <p className="py-2">選択肢の中で正しいものは次のとおりです。</p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>
            「Amazon
            S3に保存されているデータに対し、サーバーやクラスターを管理することなく、標準SQLを用いてアドホックなインタラクティブクエリを実行する。」
          </strong>
          ：これは正しい記述です。Athenaはサーバーレスであり、S3上のデータに対して直接アドホックなクエリを実行するのに最適です。インフラ管理が不要なため、すぐにクエリを開始できます。
        </li>
      </ul>
      <p className="py-2">
        その他の選択肢は、他のAWSサービスや異なるユースケースを説明しています：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>
            「複数の業務システムからデータを集約して共通フォーマットで長期間保存し、複雑なBIレポートを作成する。」
          </strong>
          ：これはデータウェアハウスの役割であり、AWSでは
          <strong className="text-red-500">Amazon Redshift</strong>
          がこのユースケースに適しています。多数のデータソースを統合し、高度な分析やレポーティングを行うのに向いています。
        </li>
        <li className="pb-2">
          <strong>
            「SparkやHadoopなどのフレームワーク上でカスタムコードを実行し、大規模なデータ変換や機械学習タスクを処理する。」
          </strong>
          ：これは
          <strong className="text-red-500">
            Amazon EMR (Elastic MapReduce)
          </strong>{" "}
          の主なユースケースです。EMRは、ビッグデータ処理フレームワークのクラスターを簡単にプロビジョニングし、カスタムコードを実行する柔軟性を提供します。
        </li>
        <li className="pb-2">
          <strong>
            「リアルタイムのトランザクション処理（OLTP）をミリ秒単位のレイテンシで高速に実行する。」
          </strong>
          ：これはOLTP（オンライントランザクション処理）データベースの役割です。Athenaは分析クエリ（OLAP）向けであり、このユースケースには適していません。AWSではAmazon
          DynamoDBやAmazon Auroraなどが該当します。
        </li>
      </ul>
      <p className="py-2">
        <strong>各サービスの使い分け:</strong>
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-1">
          <strong>Amazon Athena:</strong>
          <ul className="list-disc pl-4">
            <li className="pb-1">
              <strong>主な用途:</strong> S3データに対するインタラクティブなアドホックSQLクエリ
            </li>
            <li className="pb-1">
              <strong>アーキテクチャ:</strong> サーバーレス
            </li>
            <li className="pb-1">
              <strong>データ準備:</strong> 不要（スキーマオンリード）
            </li>
          </ul>
        </li>
        <li className="pb-1">
          <strong>Amazon Redshift:</strong>
          <ul className="list-disc pl-4">
            <li className="pb-1">
              <strong>主な用途:</strong> データウェアハウジング、BIレポーティング
            </li>
            <li className="pb-1">
              <strong>アーキテクチャ:</strong> クラスターベース
            </li>
            <li className="pb-1">
              <strong>データ準備:</strong> 必要（ETL/ELTによる構造化）
            </li>
          </ul>
        </li>
        <li className="pb-1">
          <strong>Amazon EMR:</strong>
          <ul className="list-disc pl-4">
            <li className="pb-1">
              <strong>主な用途:</strong> 大規模データ処理、機械学習（Spark/Hadoop）
            </li>
            <li className="pb-1">
              <strong>アーキテクチャ:</strong> フルコントロール可能なクラスター
            </li>
            <li className="pb-1">
              <strong>データ準備:</strong> カスタムコードによる柔軟な処理
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}