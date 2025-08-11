import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "Infrastructure", "RDS", "S3", "Data Integration"],
    created_at: new Date("2025-04-03"),
    updated_at: new Date("2025-04-03"),

    // ----- quiz -----
    title: "Amazon RDSのS3へのスナップショットエクスポートについて",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "スナップショットエクスポートはバックグラウンドで実行されるため、アクティブなDBクラスターのパフォーマンスに影響しない",
      1: "エクスポートされたスナップショットデータは、S3から新しいDBインスタンスに直接復元することができる",
      2: "スナップショットエクスポートでは、特定のデータベース、スキーマ、またはテーブルのセットのみをエクスポートすることも可能である",
      3: "エクスポートされたデータは、Amazon AthenaやAmazon Redshift Spectrumなどのツールで直接分析することができる",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Amazon RDS の Amazon S3 への DB スナップショットデータのエクスポート", url: "https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/UserGuide/USER_ExportSnapshot.html" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Amazon RDSでは、DBスナップショットデータをAmazon S3バケットにエクスポートすることができます。
        スナップショットエクスポートの機能に関する説明として、<span className="text-red-500">間違っているもの</span>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Amazon RDSのスナップショットエクスポート機能は、データ分析やバックアップの柔軟性を高める重要な機能です。
        各選択肢について解説します。
      </p>

      <p className="py-2 font-semibold text-red-500">間違っている選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>エクスポートされたスナップショットデータは、S3から新しいDBインスタンスに直接復元することができる:</strong>
          <br />
          これは誤りです。エクスポートされたスナップショットデータをS3から新しいDBインスタンスに直接復元することはできません。
          ただし、AWS Glueを使用してデータを変換し、AWS DMSやカスタムスクリプトなどのツールを使用してAmazon RDSにインポートすることは可能です。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>スナップショットエクスポートはバックグラウンドで実行されるため、アクティブなDBクラスターのパフォーマンスに影響しない:</strong>
          <br />
          これは正しい説明です。エクスポートプロセスはバックグラウンドで実行されるため、アクティブなDBクラスターのパフォーマンスには影響しません。
        </li>
        <li className="pt-2">
          <strong>スナップショットエクスポートでは、特定のデータベース、スキーマ、またはテーブルのセットのみをエクスポートすることも可能である:</strong>
          <br />
          これも正しい説明です。デフォルトではスナップショット内のすべてのデータがエクスポートされますが、特定のデータベース、スキーマ、またはテーブルのセットを選択してエクスポートすることも可能です。
        </li>
        <li className="pt-2">
          <strong>エクスポートされたデータは、Amazon AthenaやAmazon Redshift Spectrumなどのツールで直接分析することができる:</strong>
          <br />
          これも正しい説明です。エクスポートされたデータはApache Parquet形式で保存されるため、Amazon AthenaやAmazon Redshift Spectrumなどのツールで直接分析することができます。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        Amazon RDSのスナップショットエクスポート機能は、データ分析の柔軟性を高める重要な機能です。
        エクスポートされたデータはApache Parquet形式で保存され、様々な分析ツールで直接利用することができます。
        ただし、エクスポートされたデータを直接DBインスタンスに復元することはできないため、その点は注意が必要です。
      </p>
      <p className="pt-2">
        実際にはプレフィックスがやや複雑になるので、追加でエクスポートされたファイルを正規表現などを駆使して検索しながら使う必要があります。
      </p>
    </div>
  );
} 
