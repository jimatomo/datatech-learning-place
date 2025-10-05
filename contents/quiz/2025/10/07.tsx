import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

const clusteringInfoQuery = `SELECT *
FROM TABLE(
  SYSTEM$CLUSTERING_INFORMATION(
    'MARKETING.FACT_EVENTS',
    '(EVENT_DATE, CAMPAIGN_ID)'
  )
);`;

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Performance", "SQL", "Snowflake Advanced"],
    created_at: new Date("2025-10-07"),
    updated_at: new Date("2025-10-07"),

    // ----- quiz -----
    title: "SYSTEM$CLUSTERING_INFORMATIONで読むクラスタリング深度",
    question_jsx: <QuizQuestion />,
    options: {
      0: "average_depthの値は指定した列に対する平均クラスタリング深度を示し、値が小さいほどマイクロパーティションのプルーニング効率が高い。",
      1: "テーブルにクラスタリングキーが設定されていない場合は、SYSTEM$CLUSTERING_INFORMATIONへ列リストを渡すとエラーになり、結果は返されない。",
      2: "average_depthは常に整数値で、結果の解釈には四捨五入前提の丸め処理を追加で行う必要がある。",
      3: "SYSTEM$CLUSTERING_INFORMATIONをTABLE()で呼び出すと、テーブルのマイクロパーティションが再編成されるため、クエリ後に統計が変化する。",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "SYSTEM$CLUSTERING_INFORMATION | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/sql-reference/functions/system_clustering_information",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        データエンジニアが`MARKETING.FACT_EVENTS`テーブルのクラスタリング品質を確認するために、次のクエリを実行しました。
      </p>
      <div className="my-4">
        <CodeBlock code={clusteringInfoQuery} showLineNumbers={false} />
      </div>
      <p>
        出力の読み取りに関する説明のうち、
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
        SYSTEM$CLUSTERING_INFORMATIONは、テーブルに定義済みのクラスタリングキーがなくても、評価したい列リストを引数で指定することで、その組み合わせに対するクラスタリング統計を返します。
      </p>
      <br />
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          average_depthは指定列における平均クラスタリング深度を示し、値が大きいほどテーブルが適切にクラスタリングされていないことを示すため、逆に値が小さいほどマイクロパーティションのプルーニングが効いている＝データ分布が望ましいことを意味します。
        </li>
      </ul>
      <p className="font-semibold text-red-500">間違っている記述（正答以外）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          テーブルにクラスタリングキーがなくても列の組み合わせを渡せるため、エラーにはなりません。これにより一時的な分析や候補列の評価が可能です。
        </li>
        <li>
          average_depthは浮動小数を返すため、追加の丸め処理は不要です。値の変動幅がそのまま改善余地の指標になります。
        </li>
        <li>
          この関数はメタデータを読み取るだけでテーブルを再編成しません。実際のクラスタリング変更はRECLUSTERやタスクで別途実行する必要があります。
        </li>
      </ul>
    </div>
  );
}
