import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Datatech News", "Snowflake", "Performance"],
    created_at: new Date("2025-07-20"),
    updated_at: new Date("2025-07-20"),

    // ----- quiz -----
    title: "Snowflake QUERY_INSIGHTS ビュー: クエリパフォーマンス分析機能の理解",
    question_jsx: <QuizQuestion />,
    options: {
      0: "QUERY_INSIGHTSビューは、WHERE句の絞り込み効果やJOINの結合条件、リモートスピレージなどのパフォーマンス問題を自動検出し、改善提案を提供する。",
      1: "QUERY_INSIGHT_FILTER_WITH_CLUSTERING_KEYは、クラスタリングキーが有効活用されている良い状態を示すインサイトで、改善が不要である。",
      2: "QUERY_INSIGHTSビューでは、セキュアビューやEXPLAINクエリ、結果キャッシュを利用したクエリを含む全てのクエリに対してインサイトが生成される。",
      3: "QUERY_INSIGHTSビューのquery_id列を使用することで、QUERY_HISTORYなどの他のACCOUNT_USAGEビューと簡単に結合できる。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "QUERY_INSIGHTS ビュー | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/sql-reference/account-usage/query_insights",
      },
      {
        title: "[新機能]Snowflake内で実行したクエリのパフォーマンス分析・改善提案の情報がまとまった「QUERY_INSIGHTS」ビューがリリースされました | Classmethod",
        url: "https://dev.classmethod.jp/articles/snowflake-query-insights-view/",
      },
      {
        title: "Query insights | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/query-insights",
      },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflake QUERY_INSIGHTSビューについて、
        <strong className="text-red-500">間違ったもの</strong>を全て選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        QUERY_INSIGHTSビューは、Snowflakeのアカウント使用状況（ACCOUNT_USAGE）ビューの1つで、
        実行されたクエリのパフォーマンス問題を自動検出し、改善提案を提供する機能です。
        2025年7月時点で5種類のインサイトを提供し、クエリの最適化に役立ちます。
      </p>

      <p className="py-2 font-semibold text-red-500">間違った選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong className="text-red-500">
            QUERY_INSIGHTSビューでは、セキュアビューやEXPLAINクエリ、結果キャッシュを利用したクエリを含む全てのクエリに対してインサイトが生成される。：
          </strong>
          <br />
          これは<strong className="text-red-500">間違い</strong>
          です。以下のケースではインサイトが生成されません：
          <ul className="list-disc pl-6 mt-2 text-xs">
            <li>セキュアオブジェクト（Secure Viewなど）を含むクエリ</li>
            <li>ハイブリッドテーブル（Unistore）に対するクエリ</li>
            <li>Native Appsが生成したクエリ</li>
            <li>EXPLAINクエリ</li>
            <li>結果キャッシュ（Query Result Cache）を利用したクエリ</li>
          </ul>
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            QUERY_INSIGHTSビューは、WHERE句の絞り込み効果やJOINの結合条件、リモートスピレージなどのパフォーマンス問題を自動検出し、改善提案を提供する。：
          </strong>
          <br />
          これは<strong className="text-emerald-500">正しい</strong>
          です。5種類のインサイトでパフォーマンス問題を検出します：
          <ul className="list-disc pl-6 mt-2 text-xs">
            <li>QUERY_INSIGHT_INAPPLICABLE_FILTER_ON_TABLE_SCAN: WHERE句が全く機能していない</li>
            <li>QUERY_INSIGHT_UNSELECTIVE_FILTER: WHERE句の絞り込みが甘い</li>
            <li>QUERY_INSIGHT_JOIN_WITH_NO_JOIN_CONDITION: JOINの結合条件が抜けている</li>
            <li>QUERY_INSIGHT_REMOTE_SPILLAGE: メモリ不足でストレージに退避</li>
          </ul>
        </li>
        <li className="pt-2">
          <strong>
            QUERY_INSIGHT_FILTER_WITH_CLUSTERING_KEYは、クラスタリングキーが有効活用されている良い状態を示すインサイトで、改善が不要である。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。このインサイトは、クラスタリングキーが適切に使用されており、
          パフォーマンスが良好であることを示しています。
        </li>
        <li className="pt-2">
          <strong>
            QUERY_INSIGHTSビューのquery_id列を使用することで、QUERY_HISTORYなどの他のACCOUNT_USAGEビューと簡単に結合できる。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。query_id列を共通キーとして、QUERY_HISTORYビューや他のアカウント使用状況ビューと
          結合することで、より詳細なクエリ分析が可能になります。
        </li>
      </ul>

      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400">
        <p className="font-semibold text-blue-800">QUERY_INSIGHTSビューの活用方法：</p>
        <ul className="list-disc pl-4 text-blue-700 text-xs">
          <li><strong>パフォーマンス監視</strong>: 定期的なクエリパフォーマンス問題の検出</li>
          <li><strong>クエリ最適化</strong>: インサイトを基にしたクエリ改善計画の策定</li>
          <li><strong>データ分析</strong>: 他のビューとの結合による包括的な分析</li>
          <li><strong>アラート設定</strong>: 特定のインサイトが生成された際の通知機能</li>
          <li><strong>チューニング指針</strong>: 具体的な改善点の特定と対策立案</li>
        </ul>
      </div>
    </div>
  );
}