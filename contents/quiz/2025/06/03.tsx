import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Search Optimization", "Performance", "Snowflake Advanced"],
    created_at: new Date("2025-06-03"),
    updated_at: new Date("2025-06-03"),

    // ----- quiz -----
    title: "Snowflake 検索最適化サービスのユースケースについて",
    question_jsx: <QuizQuestion />,
    options: {
      0: "テーブルの全ての列に対するクエリを高速化する。",
      1: "大規模なテーブルに対するポイントルックアップクエリ（特定の行を返すクエリ）のパフォーマンスを向上させる。",
      2: "JOIN操作を含むクエリのみを対象としてパフォーマンスを最適化する。",
      3: "外部テーブルに対するクエリのパフォーマンスを向上させる。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "検索最適化サービス | Snowflake Documentation", url: "https://docs.snowflake.com/ja/user-guide/search-optimization-service" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeの検索最適化サービスに関する説明として、<strong className="text-emerald-500">正しいもの</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeの検索最適化サービスは、特定の種類のルックアップクエリや分析クエリのパフォーマンスを大幅に向上させることができる機能です。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>大規模なテーブルに対するポイントルックアップクエリ（特定の行を返すクエリ）のパフォーマンスを向上させる。：</strong>
          <br />
          これは正しい説明です。検索最適化サービスは、特にフィルタ条件によって少数の行が返されるような、選択的なポイントルックアップクエリのパフォーマンスを大幅に改善します。
          例えば、特定のIDを持つ顧客情報を検索するような場合に有効です。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">誤っている選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>テーブルの全ての列に対するクエリを高速化する。：</strong>
          <br />
          これは誤りです。検索最適化サービスは、検索最適化が有効になっている特定の列に対する述語（フィルタ条件）を含むクエリのパフォーマンスを向上させますが、テーブルの全ての列に対するクエリを自動的に高速化するわけではありません。
        </li>
        <li className="pt-2">
          <strong>JOIN操作を含むクエリのみを対象としてパフォーマンスを最適化する。：</strong>
          <br />
          これは誤りです。検索最適化サービスはJOINクエリのパフォーマンスを向上させることもできますが（特にフィルタ条件がJOINの一部である場合）、JOIN操作のみを対象としているわけではありません。ポイントルックアップ、部分文字列検索、半構造化データ検索など、より広範なクエリタイプが対象です。
        </li>
        <li className="pt-2">
          <strong>外部テーブルに対するクエリのパフォーマンスを向上させる。：</strong>
          <br />
          これは誤りです。ドキュメントによると、検索最適化サービスは主に通常のテーブルに対して使用されます。外部テーブルの検索最適化については明示的にサポートされていません。
        </li>
      </ul>

      <p className="pt-4">
        <strong>検索最適化サービスの主なユースケース：</strong>
        <ul className="list-disc pl-6 pt-2">
          <li>非常に選択的なフィルターを持つダッシュボードでの高速な応答時間</li>
          <li>大量データから特定のサブセットを探すデータサイエンティストの作業</li>
          <li>広範なフィルタリング述語に基づいて小さな結果セットを取得するデータアプリケーション</li>
          <li>文字データ（テキスト）およびIPv4アドレスの検索 (SEARCH, SEARCH_IP関数)</li>
          <li>部分文字列および正規表現検索 (LIKE, ILIKE, RLIKE)</li>
          <li>VARIANT, OBJECT, ARRAY 型の半構造化データ列の要素に対するクエリ</li>
          <li>GEOGRAPHY値を持つ地理空間関数を使用するクエリ</li>
        </ul>
        これらのユースケースにおいて、検索最適化サービスを適切に設定することで、クエリパフォーマンスの大幅な向上が期待できます。
      </p>
      <p className="pt-2">
        検索最適化サービスを有効にする例：
      </p>
      <CodeBlock code={`-- テーブルに検索最適化を追加\nALTER TABLE test_table ADD SEARCH OPTIMIZATION;\n\n-- 特定の列に対して検索最適化を有効にする場合 (例: 等価比較、IN句)\nALTER TABLE my_table ADD SEARCH OPTIMIZATION ON EQUALITY(c1, c2);\n\n-- 部分文字列検索のために有効にする場合\nALTER TABLE my_table ADD SEARCH OPTIMIZATION ON SUBSTRING(c3);`} />
    </div>
  );
} 
