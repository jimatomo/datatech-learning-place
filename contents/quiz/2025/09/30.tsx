import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Data Integration", "Data Architecture", "Snowflake Advanced"],
    created_at: new Date("2025-09-30"),
    updated_at: new Date("2025-09-30"),

    // ----- quiz -----
    title: "クロスリージョンSnowflake統合の最適手順",
    question_jsx: <QuizQuestion />,
    options: {
      0: "B社のAzure東京アカウントでアカウント複製を有効化し、統合したいデータベースと共有を含むレプリケーショングループを作成してAWS東京リージョンへ複製する。A社のAWS東京アカウントではセカンダリレプリケーショングループを作成して手動リフレッシュし、複製された共有にA社のローカルアカウントを追加する。",
      1: "B社のデータをAzure Blob Storageへアンロードし、外部ステージを介してA社がCOPY INTOでロードするパイプラインを構築する。リージョン間のSnowflake機能は使用しない。",
      2: "A社のAWS東京アカウントからB社のAzure東京テーブルを直接CLONEし、クローンをリフレッシュするためにリソースモニターを設定する。",
      3: "Snowflake MarketplaceでB社がプライベートリスティングを作成し、A社は同一リージョンのコンシューマとして購読する。リージョン差異は考慮しない。",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Share data securely across regions and cloud platforms",
        url: "https://docs.snowflake.com/en/user-guide/secure-data-sharing-across-regions-platforms",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        A社はAWS東京リージョン、B社はAzure東京リージョン上のSnowflakeを利用しています。買収後にA社のSnowflake環境からB社データを継続的に利用するための手順として、
        <strong className="text-green-600">正しいもの</strong>
        を1つ選んでください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        複数クラウド・リージョン間でSnowflakeデータを共有する場合は、クロスクラウドレプリケーションとセキュアデータシェアリングを組み合わせるのが推奨手順です。
      </p>
      <br />
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          B社（ソース）は組織管理者がレプリケーションを有効化し、共有したいデータベースと共有オブジェクトをまとめたレプリケーショングループを作成します。許可アカウントにA社のAWS東京アカウントを指定して、対象リージョンへ複製します。
        </li>
        <li>
          A社（ターゲット）はセカンダリレプリケーショングループを作成して手動もしくはスケジュールでリフレッシュし、複製された共有に自社アカウントを追加することで、リージョンをまたいだ安全なデータ統合が可能になります。
        </li>
      </ul>
      <p className="font-semibold text-red-500">間違っている記述（正答以外）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          単なるファイルアンロードとCOPYパイプラインでは、Snowflakeが提供する自動同期や権限管理を活用できず、複製・共有の手間と遅延が大きくなります。
        </li>
        <li>
          CLONEは同一リージョン・同一クラウド内でのゼロコピー複製機能であり、クロスクラウドには対応していません。
        </li>
        <li>
          Marketplaceやリージョン固定の共有では、リージョン差異を越えた直接共有ができないため、AzureからAWSへの提供にはクロスクラウドレプリケーションが必要です。
        </li>
      </ul>
    </div>
  );
}