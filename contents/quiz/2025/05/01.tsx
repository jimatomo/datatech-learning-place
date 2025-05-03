import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "S3", "Infrastructure"],
    created_at: new Date("2025-05-01"),
    updated_at: new Date("2025-05-01"),

    // ----- quiz -----
    title: "Amazon S3 Express One Zone の特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "単一のアベイラビリティーゾーン (AZ) 内にデータを保存する",
      1: "オブジェクトストレージとして最も低いレイテンシを提供するように設計されている",
      2: "高い耐久性を保証するために複数のAZにデータを冗長化する",
      3: "コンピューティングリソースと同じAZにストレージを配置することでパフォーマンスを最適化する",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Amazon S3 Express One Zone | Black Belt Online Seminar", url: "https://pages.awscloud.com/rs/112-TZM-766/images/AWS-Black-Belt_2024_AmazonS3-ExpressOneZone_0531_v1.pdf" },
      { title: "高性能ワークロード", url: "https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/directory-bucket-high-performance.html" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Amazon S3 Express One Zone ストレージクラスの主な特徴として<span className="text-red-500">誤っている</span>ものはどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm space-y-2">
      <p>
        正解は「<span className="text-red-500">高い耐久性を保証するために複数のAZにデータを冗長化する</span>」です。Amazon S3 Express One Zone は、その名の通り、データを<strong className="text-emerald-500">単一のアベイラビリティーゾーン (AZ) 内</strong>に保存します。これにより、ミリ秒単位のリクエストレイテンシを実現しています。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          単一のアベイラビリティーゾーン (AZ) 内にデータを保存する:
          これは正しい記載です。S3 Express One Zone は、コンピューティングインスタンスと同じ AZ にデータを配置することで、データアクセスを高速化します。
        </li>
        <li>
          オブジェクトストレージとして最も低いレイテンシを提供するように設計されている:
          これも正しい記載です。S3 Express One Zone は、S3 標準と比較して最大10倍高速なデータアクセス速度を提供し、レイテンシの影響を受けやすいアプリケーション向けに設計されています。
        </li>
        <li>
          <span className="text-red-500">高い耐久性を保証するために複数のAZにデータを冗長化する</span>:
          これが<strong className="text-red-500">誤った</strong>記載です。S3 Express One Zone はデータを単一の AZ 内に保存するため、AZ 障害時にはデータが失われる可能性があります。標準の S3 ストレージクラス (Standard, Standard-IA など) は、複数の AZ にデータを複製することで高い耐久性を実現しています。
        </li>
        <li>
          コンピューティングリソースと同じAZにストレージを配置することでパフォーマンスを最適化する:
          これも正しい記載です。ストレージとコンピューティングリソースを同じ AZ に配置することで、データ転送のレイテンシが最小限に抑えられます。
        </li>
      </ul>
      <p>
        <strong>まとめ:</strong><br />
        S3 Express One Zone は、超低レイテンシと高スループットが要求されるワークロード（機械学習のトレーニング、インタラクティブな分析など）に最適化されたストレージクラスです。ただし、データは単一の AZ に保存されるため、耐久性よりもパフォーマンスを優先する場合に適しています。高い耐久性が必要な場合は、他の S3 ストレージクラスを検討する必要があります。
      </p>
      <p>
        可用性とコストの面で通常のS3と比較して不利な面があるので、低いレイテンシーが要求される非構造化データの一時的な処理などで利用するといいと思います。
      </p>
    </div>
  );
} 
