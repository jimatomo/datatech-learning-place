import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "Snowflake", "Data Modeling"],
    created_at: new Date("2025-04-16"),
    updated_at: new Date("2025-04-16"),

    // ----- quiz -----
    title: "dbtのSnowflake専用設定について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "dbtで作成されるSnowflakeのテーブルは、デフォルトでtransient tableとして作成される",
      1: "Snowflakeのdynamic tableは、dbtのmaterialized viewと完全に同じ機能を提供する",
      2: "dbtのincremental modelで使用されるmerge strategyは、Snowflakeでは常に'merge'がデフォルトである",
      3: "Snowflakeのquery tagは、dbtのprofile.ymlでのみ設定可能で、モデルレベルでは設定できない",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake configurations", url: "https://docs.getdbt.com/reference/resource-configs/snowflake-configs" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        dbtには、Snowflake専用の設定がいくつか存在します。これらの設定に関する説明として、正しいものを選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        dbtのSnowflake専用設定には、様々な特徴があります。各選択肢について解説します。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>dbtで作成されるSnowflakeのテーブルは、デフォルトでtransient tableとして作成される:</strong>
          <br />
          これは正しい説明です。Snowflakeでは、dbtによって作成されるテーブルはデフォルトでtransient tableとして作成されます。
          これは、Snowflakeのストレージコストを削減するための設計です。transient tableはタイムトラベル機能が制限されており、
          デフォルトの保持期間は1日で、フェイルセーフ期間はありません。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">不正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>Snowflakeのdynamic tableは、dbtのmaterialized viewと完全に同じ機能を提供する:</strong>
          <br />
          これは誤りです。dynamic tableはmaterialized viewと似ていますが、完全に同じ機能ではありません。
          dynamic tableには独自の制限があり、例えば、dynamic tableのSQLは更新できず、--full-refreshによる再作成が必要です。
        </li>
        <li className="pt-2">
          <strong>dbtのincremental modelで使用されるmerge strategyは、Snowflakeでは常に&apos;merge&apos;がデフォルトである:</strong>
          <br />
          これも誤りです。Snowflakeでは、incremental modelのデフォルトのstrategyは&apos;merge&apos;ですが、
          状況に応じて&apos;append&apos;、&apos;delete+insert&apos;、&apos;insert_overwrite&apos;、&apos;microbatch&apos;などの選択肢があります。
        </li>
        <li className="pt-2">
          <strong>Snowflakeのquery tagは、dbtのprofile.ymlでのみ設定可能で、モデルレベルでは設定できない:</strong>
          <br />
          これも誤りです。query tagはprofile.ymlでデフォルト値を設定できますが、モデルレベルでも設定可能です。
          また、set_query_tag マクロをオーバーライドすることで、より柔軟な設定が可能です。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
      </p>
      <p className="pt-2">
        dbtのSnowflake専用設定は、Snowflakeの特性を活かした最適化や制御を可能にします。
        transient tableのデフォルト設定は、リカバリにかかるコストとストレージコストを天秤にかけて最適化するための重要な設計選択です。
        また、dynamic tableやincremental modelの設定など、Snowflake特有の機能を活用するための様々なオプションが提供されています。
      </p>
      <p className="pt-2">
        実務においては、これらの設定を適切に理解し、プロジェクトの要件に応じて最適な設定を選択することが重要です。
      </p>
    </div>
  );
} 
