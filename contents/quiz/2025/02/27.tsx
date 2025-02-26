import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "VPC", "S3", "エンドポイント"],
    created_at: new Date("2025-02-27"),
    updated_at: new Date("2025-02-27"),

    // ----- quiz -----
    title: "Amazon S3のゲートウェイエンドポイント",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "ゲートウェイエンドポイントは追加料金なしで使用でき、インターネットゲートウェイやNATデバイスを必要とせずにVPCからS3にアクセスできる",
      1: "ゲートウェイエンドポイントはVPN接続、VPCピアリング接続、トランジットゲートウェイを通じて他のネットワークからアクセスできる",
      2: "ゲートウェイエンドポイントを使用する場合、バケットポリシーでaws:SourceIp条件を使用してアクセス制御を行うことができる",
      3: "ゲートウェイエンドポイントはIPv6トラフィックをサポートしている"
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Amazon S3のゲートウェイエンドポイント", url: "https://docs.aws.amazon.com/ja_jp/vpc/latest/privatelink/vpc-endpoints-s3.html" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Amazon S3のゲートウェイエンドポイントに関する説明として、正しいものを選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Amazon S3のゲートウェイエンドポイントに関する正しい説明は以下の通りです：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          ゲートウェイエンドポイントは追加料金なしで使用でき、インターネットゲートウェイやNATデバイスを必要とせずにVPCからS3にアクセスできます
        </li>
        <li>
          ゲートウェイエンドポイントを利用する際には、VPCからS3へのトラフィックのルートテーブルにターゲットとして追加する必要があります。
        </li>
      </ul>
      <p>
        誤った選択肢の解説：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-2">
          ゲートウェイエンドポイントは、VPN接続、VPCピアリング接続、トランジットゲートウェイ、またはAWS Direct Connect経由でVPCの外部から拡張することはできません。このようなシナリオでは、インターフェイスエンドポイントを使用する必要があります
        </li>
        <li className="pb-2">
          VPCエンドポイントを通過するS3へのリクエストには、aws:SourceIp条件を使用することはできません。代わりにaws:VpcSourceIp条件を使用する必要があります
        </li>
        <li>
          ゲートウェイエンドポイントはIPv4トラフィックのみをサポートし、IPv6トラフィックはサポートしていません
        </li>
      </ul>
    </div>
  );
} 

