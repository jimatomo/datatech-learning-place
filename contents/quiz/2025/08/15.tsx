import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Application", "MLOps", "Snowpark"],
    created_at: new Date("2025-08-15"),
    updated_at: new Date("2025-08-15"),

    // ----- quiz -----
    title: "Snowflake内で完結するMLOpsの主要機能",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Snowflake Notebooks はブラウザ上でSQLとPythonを併用でき、素早い仮説検証に向く",
      1: "ML Jobs はSnowpark Container Services上で実行され、実行時間中のみ課金される",
      2: "Feature Store は学習用と推論用で別々の特徴量定義を持つことが推奨される",
      3: "Model Registry はモデルのバージョン管理やデプロイ管理を一元化できる",
      4: "モデルモニターはドリフトや精度指標を追跡し、ダッシュボードを自動生成できる",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflakeだけで完結するMLOps", url: "https://zenn.dev/takikomi/articles/091914b9b60b23" },
      { title: "Snowflake ML 概要", url: "https://docs.snowflake.com/ja/developer-guide/snowflake-ml/overview?utm_source=openai" },
      { title: "モデル可観測性（Model Observability）", url: "https://docs.snowflake.com/ja/developer-guide/snowflake-ml/model-registry/model-observability?utm_source=openai" },
      { title: "Feature Store の紹介（ブログ）", url: "https://www.snowflake.com/ja/blog/build-manage-production-ml-snowflake-feature-store/?utm_source=openai" },
      { title: "モデル管理の拡張（ブログ）", url: "https://www.snowflake.com/ja/blog/ml-enhances-mlops-streaming-feature-model-management/?utm_source=openai" },
    ],
  });
  return quiz;
}

const codeMLJobs = `# ML Jobs の最小例（Snowpark Container Services上で実行）
@remote("POOL_XS", stage_name="JOBS", session=session)
def process():
    pass

job = process()`;

const codeModelMonitor = `-- モデルモニターの作成例（指標・ドリフトの監視）
CREATE MODEL MONITOR FOR_DEMO_MODEL
WITH
    MODEL = DEMO_MODEL
    VERSION = WONDERFUL_VAMPIREBAT_1
    FUNCTION = predict
    SOURCE = PRED_DATA_WITH_ACT
    BASELINE = TRAIN_DATA
    TIMESTAMP_COLUMN = TRANSACTIONDATE
    PREDICTION_SCORE_COLUMNS = (PRED)
    ACTUAL_SCORE_COLUMNS = (TARGET)
    WAREHOUSE = COMPUTE_XSMALL
    REFRESH_INTERVAL = '1 day'
    AGGREGATION_WINDOW = '1 day';`;

function QuizQuestion() {
  return (
    <div>
      <p>Snowflake内でMLOpsを完結させるための機能に関して、<strong className="text-red-600">誤っているもの</strong>を全て選択してください。</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>以下が正解（誤っている記述）の説明です：</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <span className="text-red-600">Feature Store は学習用と推論用で別々の特徴量定義を持つことが推奨される</span>：誤りです。
          Feature Store の目的は、学習と推論で<strong>同一の特徴量定義を共有</strong>し、<strong>training-serving skew</strong>（学習時と推論時の不一致）を防ぐことにあります。
          
          <ul className="list-disc pl-6 py-1">
            <li>単一のソース・オブ・トゥルース：特徴量生成ロジックを一元管理してロジックの分岐やドリフトを防止</li>
            <li>再現性：学習時点の特徴量定義・計算条件に基づく再学習・検証が容易</li>
            <li>運用効率：オンライン／バッチを跨いだ一貫性により、監視や不具合時の原因切り分けが簡便</li>
          </ul>
        </li>
      </ul>
      <p>他の選択肢が正しい理由：</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong>Snowflake Notebooks</strong>：SQLとPythonの併用で、ブラウザ上から素早く仮説検証が可能。
          <ul className="list-disc pl-6 py-1">
            <li>管理された実行環境（主要なDS/MLライブラリが事前インストール）</li>
            <li>ウェアハウス選択により計算資源とコストを調整可能</li>
          </ul>
        </li>
        <li>
          <strong>ML Jobs</strong>：SPCS上でジョブを実行し、<span className="text-green-600">実行中のみ課金</span>。
          <ul className="list-disc pl-6 py-1">
            <li><code>@remote</code> デコレータでローカル開発コードをSnowflake側で実行</li>
            <li>ノートブックよりライブラリ制約が緩く、重い前処理や学習に適する</li>
          </ul>
        </li>
        <li>
          <strong>Model Registry</strong>：モデル登録・バージョン管理・デプロイを一元化。
          <ul className="list-disc pl-6 py-1">
            <li>チーム間でのモデル共有・権限管理・監査（ガバナンス）</li>
            <li><code>predict</code> や <code>explain</code>（SHAP等）のインターフェースを提供</li>
          </ul>
        </li>
        <li>
          <strong>モデルモニター</strong>：ドリフトや精度の指標を追跡し、ダッシュボードを自動生成。
          <ul className="list-disc pl-6 py-1">
            <li>リフレッシュ間隔やアグリゲーションウィンドウを指定可能</li>
            <li>メトリクスはSQLでクエリでき、定時ジョブでのアラート連携が容易</li>
          </ul>
        </li>
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div>
          <p className="font-semibold pb-2">ML Jobs の例</p>
          <CodeBlock code={codeMLJobs} showLineNumbers={false} />
        </div>
        <div>
          <p className="font-semibold pb-2">モデルモニターの例</p>
          <CodeBlock code={codeModelMonitor} showLineNumbers={false} />
        </div>
      </div>
    </div>
  );
}

