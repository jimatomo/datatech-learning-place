import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Advanced", "Snowflake Performance"],
    created_at: new Date("2025-07-08"),
    updated_at: new Date("2025-07-08"),

    // ----- quiz -----
    title: "Snowflake: クエリプロファイルとクエリ履歴によるパフォーマンス監視",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Snowsightのクエリ履歴ページでは、過去14日間にアカウントで実行されたクエリを調べることができる。",
      1: "クエリプロファイルで「爆発」結合を特定するには、Join演算子が消費するよりも大幅に多くのタプルを生成しているかを確認する。",
      2: "TableScan演算子の「スキャンされたパーティション」と「パーティションの合計」の比較により、プルーニングの効率性を確認できる。",
      3: "UNIONとUNION ALLは同じパフォーマンスを持ち、クエリプロファイルでは区別できない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "クエリ履歴でクエリのアクティビティをモニターする | Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/ui-snowsight-activity",
      },
      {
        title: "クエリプロファイル | Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/ui-query-profile",
      },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeのクエリプロファイルとクエリ履歴機能について、
        <strong className="text-red-500">間違っているもの</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflakeのクエリプロファイルとクエリ履歴機能は、パフォーマンス監視と最適化において重要な役割を果たします。
        これらのツールを適切に活用することで、クエリのボトルネックを特定し、効率的なデータ処理を実現できます。
      </p>

      <p className="py-2 font-semibold text-red-500">間違った選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            UNIONとUNION ALLは同じパフォーマンスを持ち、クエリプロファイルでは区別できない。：
          </strong>
          <br />
          これは<strong className="text-red-500">間違い</strong>
          です。UNIONとUNION ALLには大きな違いがあります。
          UNION ALLは単純に入力を連結するのに対し、UNIONは連結後に重複排除も行います。
          クエリプロファイルでは、UNIONの場合にUnionAll演算子に加えて
          重複排除を実行するAggregate演算子が追加で表示されるため、明確に区別できます。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            Snowsightのクエリ履歴ページでは、過去14日間にアカウントで実行されたクエリを調べることができる。：
          </strong>
          <br />
          これは<strong className="text-emerald-500">正しい</strong>
          です。Snowsightの Query History ページでは、過去14日間にSnowflakeアカウントで実行されたクエリを
          調べることができます。<code>Monitoring » Query History</code>からアクセスし、
          Individual QueriesまたはGrouped Queriesを表示できます。
        </li>
        <li className="pt-2">
          <strong>
            クエリプロファイルで「爆発」結合を特定するには、Join演算子が消費するよりも大幅に多くのタプルを生成しているかを確認する。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。「爆発」結合（デカルト積）では、Join演算子によって生成される記録の数が
          消費するよりも大幅に（多くの場合、桁違いに）多くなります。
          これはクエリプロファイルで容易に確認でき、Join演算子が多くの時間を消費することにも反映されます。
        </li>
        <li className="pt-2">
          <strong>
            TableScan演算子の「スキャンされたパーティション」と「パーティションの合計」の比較により、プルーニングの効率性を確認できる。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。プルーニングの効率は、TableScan演算子の「スキャンされたパーティション」と
          「パーティションの合計」統計を比較することで確認できます。
          前者が後者のごく一部である場合、プルーニングは効率的に機能しています。
        </li>
      </ul>

      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400">
        <p className="font-semibold text-blue-800">クエリプロファイルで特定できる主な問題：</p>
        <ul className="list-disc pl-4 text-blue-700 text-xs">
          <li><strong>「爆発」結合</strong>: Join演算子が大量のタプルを生成している</li>
          <li><strong>ALLなしのUNION</strong>: 不要な重複排除処理が発生している</li>
          <li><strong>メモリ不足</strong>: データがローカル/リモートディスクにスピルしている</li>
          <li><strong>非効率なプルーニング</strong>: 大量のパーティションがスキャンされている</li>
        </ul>
      </div>
    </div>
  );
}