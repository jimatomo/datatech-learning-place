import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "Data Modeling"],
    created_at: new Date("2025-08-20"),
    updated_at: new Date("2025-08-20"),

    // ----- quiz -----
    title: "dbtのマテリアライゼーション戦略",
    question_jsx: <QuizQuestion />,
    options: {
      0: "view: 最終的な分析用テーブルや、頻繁にアクセスされる大規模なデータ変換に使用する。",
      1: "table: 実行のたびにテーブルを再構築するため、ソースデータが頻繁に更新される場合に適している。",
      2: "incremental: 大規模なデータセットに対して、新規または変更されたデータのみを効率的に追加する。",
      3: "ephemeral: 中間的な変換ロジックをカプセル化し、データベース内に物理的なオブジェクトを作成しない。",
    },
    answers: [2, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Materializations - dbt Developer Hub", url: "https://docs.getdbt.com/docs/build/materializations" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        dbtのマテリアライゼーションについて、<strong className="text-emerald-500">正しいユースケース</strong>を2つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm space-y-4">
      <p className="font-semibold text-emerald-500">正解の解説：</p>
      
      <div>
        <p className="font-semibold mb-2">✅ 正解: incremental と ephemeral</p>
        <p className="pl-4 mb-2">
          dbtのマテリアライゼーションは、モデルをデータベース内にどのように永続化するかを定義します。それぞれの特徴を理解し、適切に使い分けることが重要です。
        </p>
        <ul className="list-disc pl-8 space-y-2">
          <li>
            <strong className="text-emerald-500">incremental:</strong> 巨大なファクトテーブルなど、毎回フルスキャンして再構築するのは非効率な場合に使用します。<code>is_incremental()</code> マクロとユニークキー（<code>unique_key</code>）を組み合わせることで、新規・更新データのみを効率的に処理できます。
          </li>
          <li>
            <strong className="text-emerald-500">ephemeral:</strong> 複雑な変換を複数のステップに分割する際の中間モデルとして利用します。データベースに物理的なテーブルやビューを作成せず、後続のモデルからはCTE（共通テーブル式）として参照されるため、データベースをクリーンに保つことができます。
          </li>
        </ul>
      </div>

      <div>
        <p className="font-semibold mb-2">❌ 間違っている選択肢：</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>
            <strong>view:</strong> データベースに対してクエリが実行されるたびに、その場で計算が実行されます。そのため、頻繁にアクセスされる大規模なデータ変換には不向きで、パフォーマンスが悪化する可能性があります。最終的な分析用テーブルには、通常<code>table</code>マテリアライゼーションが適しています。
          </li>
          <li>
            <strong>table:</strong> 実行のたびにモデル全体が再構築されます。ソースデータが頻繁に更新される場合、<code>table</code>を頻繁に実行するとコストが高くなります。このようなケースでは、<code>incremental</code>モデルの方が適しています。
          </li>
        </ul>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
        <p className="font-semibold mb-2 text-blue-800 dark:text-blue-300">📊 各マテリアライゼーションの使い分け</p>
        <ul className="list-disc pl-4 space-y-1">
            <li><strong>view (デフォルト):</strong>
                <ul className="list-disc pl-5">
                    <li>データ量が少ない、または変換ロジックが単純な場合。</li>
                    <li>常に最新のデータを参照したい場合。</li>
                    <li>あまり頻繁にクエリされない場合。</li>
                </ul>
            </li>
            <li><strong>table:</strong>
                <ul className="list-disc pl-5">
                    <li>BIツールからのアクセスなど、クエリパフォーマンスが重要な最終的なデータマート。</li>
                    <li>変換ロジックが複雑で、実行に時間がかかる場合。</li>
                </ul>
            </li>
            <li><strong>incremental:</strong>
                <ul className="list-disc pl-5">
                    <li>イベントデータやログデータなど、レコードが追加・更新されていく大規模なテーブル。</li>
                    <li>ビルド時間を短縮したい場合。</li>
                </ul>
            </li>
            <li><strong>ephemeral:</strong>
                <ul className="list-disc pl-5">
                    <li>1つのモデルが長大になりすぎるのを防ぐための中間的な変換ステップ。</li>
                    <li>データベースに余分なオブジェクトを作成したくない場合。</li>
                </ul>
            </li>
        </ul>
      </div>
      <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
        <p className="font-semibold mb-2 text-yellow-800 dark:text-yellow-300">⚙️ 設定方法 (dbt_project.yml):</p>
        <CodeBlock code={`models:
  my_project:
    staging:
      materialized: view
    marts:
      core:
        materialized: table
      finance:
        materialized: incremental`} />
        <p className="mt-2">または、各モデルファイルのconfigブロックで個別に設定します。</p>
        <CodeBlock code={`{{ config(materialized='incremental') }}

select ...`} />
      </div>
    </div>
  );
}