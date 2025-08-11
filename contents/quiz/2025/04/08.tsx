import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AI", "Cortex", "Snowflake", "Snowflake Advanced"],
    created_at: new Date("2025-04-08"),
    updated_at: new Date("2025-04-08"),

    // ----- quiz -----
    title: "Snowflake Cortex Search Serviceについて",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "Cortex Search Serviceのベーステーブルサイズは、最適なパフォーマンスのために50M行未満である必要がある",
      1: "Cortex Search Serviceは、snowflake-arctic-embed-l-v2.0、snowflake-arctic-embed-m-v1.5、voyage-multilingual-2の3つの埋め込みモデルをサポートしている",
      2: "Cortex Search Serviceは、すべてのSnowflakeリージョンで利用可能で、クロスリージョン推論の設定は不要である",
      3: "Cortex Search Serviceでは、ウェアハウスサイズはMEDIUM以下を推奨している",
    },
    answers: [1, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Cortex Search Overview", url: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/cortex-search-overview" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflake Cortex Search Serviceは、Snowflakeデータに対して低遅延で高品質な「ファジー」検索を可能にする機能です。
        Cortex Search Serviceに関する説明として、<strong>正しいもの全て</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflake Cortex Search Serviceの特徴と制限について解説します。（作成日時点のEnglish版のドキュメントの情報をベースにしていますので、最新の情報とは異なる場合があるので違う場合はIssueを作成していただけると幸いです）
      </p>

      <p className="py-2 font-semibold text-green-600">正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>Cortex Search Serviceは、snowflake-arctic-embed-l-v2.0、snowflake-arctic-embed-m-v1.5、voyage-multilingual-2の3つの埋め込みモデルをサポートしている:</strong>
          <br />
          これは正しい説明です。Cortex Searchは、これら3つの埋め込みモデルをサポートしており、リージョンによって利用可能なモデルが異なります。例えば、voyage-multilingual-2は一部のリージョン（US West 2、US East 1、Europe Central 1など）でのみ利用可能です。
        </li>
        <li className="pt-2">
          <strong>Cortex Search Serviceでは、ウェアハウスサイズはMEDIUM以下を推奨している:</strong>
          <br />
          これも正しい説明です。Snowflakeは、各サービスに対して専用のMEDIUM以下のサイズのウェアハウスを使用することを推奨しています。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-600">不正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>Cortex Search Serviceのベーステーブルサイズは、最適なパフォーマンスのために50M行未満である必要がある:</strong>
          <br />
          これは誤りです。最新の制限では、検索サービスのマテリアライズドクエリの結果は100M行未満である必要があります（50M行ではありません）。この制限を超える場合は、Snowflakeアカウントチームに連絡することで制限を緩和できる可能性があります。
        </li>
        <li className="pt-2">
          <strong>Cortex Search Serviceは、すべてのSnowflakeリージョンで利用可能で、クロスリージョン推論の設定は不要である:</strong>
          <br />
          これも誤りです。一部のリージョン（AWS Europe (Paris)、AWS Europe (Zurich)、AWS Asia Pacific (Singapore)など）では、クロスリージョン推論の設定が必要です。また、クロスリージョン推論を使用する場合、リージョン間のクエリレイテンシはクラウドプロバイダーのインフラストラクチャとネットワークステータスに依存します。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        Cortex Search Serviceは、複数の埋め込みモデルをサポートし、適切なウェアハウスサイズの選択が重要です。
        ただし、行数制限やリージョンの可用性には注意が必要で、特定のリージョンではクロスリージョン推論の設定が必要となります。
      </p>
    </div>
  );
} 
