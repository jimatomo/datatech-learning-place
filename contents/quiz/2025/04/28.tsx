import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Performance", "Snowflake Basic"],
    created_at: new Date("2025-04-28"),
    updated_at: new Date("2025-04-28"),

    // ----- quiz -----
    title: "Snowflakeのクラスタリングキー設定",
    question_jsx: <QuizQuestion />,
    options: {
      0: "クラスタリングキーは、主に非常に大きなテーブルにおいて、特定のクエリのパフォーマンスを向上させるために定義される。",
      1: "WHERE句で頻繁にフィルタリングされる列や、JOIN操作でよく使用される列をクラスタリングキーとして選択することが推奨される。",
      2: "クラスタリングキーの定義と維持にはコストがかかるため、クエリパフォーマンスの向上がそのコストを上回るか、テーブルの特性（サイズ、クエリパターン等）を考慮して慎重に判断する必要がある。",
      3: "テーブルにクラスタリングキーを定義した後、Snowflakeは自動的にデータの再クラスタリングを行い、最適な状態を維持しようとする（自動クラスタリングが有効な場合）。",
      4: "クラスタリングキーに含める列数に技術的な上限はないが、一般的に列数が多いほどプルーニング効果が高まるため、関連性の高い列は5つ以上指定することが推奨される。",
    },
    answers: [4],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "クラスタリングキーとクラスタ化されたテーブル - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/tables-clustering-keys"
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeのテーブルにおけるクラスタリングキーの設定に関する記述のうち、<span className="text-red-500">誤っているもの</span>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        各選択肢の解説は以下の通りです。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-emerald-500">クラスタリングキーは、主に非常に大きなテーブルにおいて、特定のクエリのパフォーマンスを向上させるために定義される。</strong>：これは正しい記載です。
          クラスタリングは特に大規模テーブル（テラバイト級など）で効果を発揮します。小さなテーブルでは、クラスタリングの維持にかかるオーバーヘッドの方が大きくなる可能性があります。
        </li>
        <li>
          <strong className="text-emerald-500">WHERE句で頻繁にフィルタリングされる列や、JOIN操作でよく使用される列をクラスタリングキーとして選択することが推奨される。</strong>：これも正しい記載です。
          クエリで頻繁に使用される述語（フィルターや結合条件）に関連する列をキーにすることで、Snowflakeがスキャンするマイクロパーティションの数を減らし、パフォーマンスを向上させることが期待できます。
        </li>
        <li>
          <strong className="text-emerald-500">クラスタリングキーの定義と維持にはコストがかかるため、クエリパフォーマンスの向上がそのコストを上回るか、テーブルの特性（サイズ、クエリパターン等）を考慮して慎重に判断する必要がある。</strong>：これも正しい記載です。
          クラスタリングは常にメリットがあるわけではなく、コスト（ストレージとコンピューティングリソース）とのトレードオフになります。そのため、全てのテーブルに設定するのではなく、コストに見合うだけのパフォーマンス向上が期待できるか、テーブルサイズ、クエリパターン、更新頻度などを考慮して適用を決定すべきです。
        </li>
        <li>
          <strong className="text-emerald-500">テーブルにクラスタリングキーを定義した後、Snowflakeは自動的にデータの再クラスタリングを行い、最適な状態を維持しようとする（自動クラスタリングが有効な場合）。</strong>：これも正しい記載です。
          自動クラスタリングが有効な場合、Snowflakeはバックグラウンドで継続的にデータの再配置（再クラスタリング）を行い、クラスタリングの状態を維持します。
        </li>
        <li>
        <strong className="text-red-500">クラスタリングキーに含める列数に技術的な上限はないが、一般的に列数が多いほどプルーニング効果が高まるため、関連性の高い列は5つ以上指定することが推奨される。</strong>：これは誤った記載です。
          クラスタリングキーとして指定できる列数に厳密な上限は設けられていませんが、キーに含める列が多すぎると、各列のカーディナリティが低い場合にクラスタリングの効果が薄れたり、維持コストが増加したりする可能性があります。Snowflakeのドキュメントでは、一般的に3〜4列以内、かつカーディナリティ（一意な値の数）が高い列を選択することが推奨されています。多数の列を指定することが常に効果的とは限りません。
        </li>
      </ul>
    </div>
  );
} 
