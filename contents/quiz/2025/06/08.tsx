import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Data Engineering", "Apache NiFi", "Datatech News"],
    created_at: new Date("2025-06-08"),
    updated_at: new Date("2025-06-08"),

    // ----- quiz -----
    title: "Snowflake Openflowの特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "OpenflowはApache NiFiをベースに構築されており、使い慣れたNiFiのプロセッサやコントローラサービスを活用できる。",
      1: "構造化データだけでなく、非構造化データも扱うことができ、Snowflake CortexのLLM機能と連携して前処理を行うパイプラインを構築できる。",
      2: "デプロイモデルとして、顧客自身のVPC内で実行するBYOC（Bring Your Own Cloud）モデルと、Snowflakeが管理するSnowpark Container Services（SPCS）モデルが提供されている。",
      3: "Openflowは、全ての主要なクラウドプロバイダー（AWS, Azure, GCP）の全リージョンで一般提供（GA）されている。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake Openflow | Snowflake", url: "https://www.snowflake.com/en/product/features/openflow/" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Snowflakeが発表したOpenflowに関する記述として、<span className="text-red-500">間違っている</span>ものはどれですか？
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        選択肢の中で間違っているものは次のとおりです。
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>「Openflowは、全ての主要なクラウドプロバイダー（AWS, Azure, GCP）の全リージョンで一般提供（GA）されている。」</strong>：これは間違った記述です。
          公式情報によると、2025年6月3日時点でOpenflowのBYOC（Bring Your Own Cloud）モデルはAWSの商用リージョンで一般提供（GA）されており、Snowpark Container Services（SPCS）での提供はプライベートプレビュー段階です。全てのクラウドプロバイダーおよび全リージョンでGAとなっているわけではありません。
        </li>
      </ul>
      <p className="py-2">
        その他の選択肢は正しい記述です：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>「OpenflowはApache NiFiをベースに構築されており、使い慣れたNiFiのプロセッサやコントローラサービスを活用できる。」</strong>：
          これは正しい記述です。OpenflowはApache NiFiの堅牢なデータフロー機能を活用しており、Snowflake固有のコンポーネントと合わせて利用できます。
        </li>
        <li className="pb-2">
          <strong>「構造化データだけでなく、非構造化データも扱うことができ、Snowflake CortexのLLM機能と連携して前処理を行うパイプラインを構築できる。」</strong>：
          これは正しい記述です。Openflowは、Google DriveやSharePointなどのソースから非構造化データを取り込み、Cortex LLM関数を使用してETLパイプライン内で直接前処理を行う機能を提供します。
        </li>
        <li className="pb-2">
          <strong>「デプロイモデルとして、顧客自身のVPC内で実行するBYOC（Bring Your Own Cloud）モデルと、Snowflakeが管理するSnowpark Container Services（SPCS）モデルが提供されている。」</strong>：
          これは正しい記述です。Openflowは、顧客がデータとネットワークをより詳細に制御できるBYOCモデルと、Snowflakeがインフラを管理するSPCSモデルの2つのデプロイオプションを提供しています。
        </li>
      </ul>
      <p className="pt-2">
        Snowflake Openflowは、データ統合の柔軟性と拡張性を高め、特にAIユースケースに向けたデータ準備を効率化するための強力なサービスです。
      </p>
    </div>
  );
} 
