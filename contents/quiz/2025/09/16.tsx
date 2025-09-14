import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Warehouse", "Snowflake Advanced"],
    created_at: new Date("2025-09-16"),
    updated_at: new Date("2025-09-16"),

    // ----- quiz -----
    title: "Snowflakeウェアハウスの同時実行ボトルネック対策",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ウェアハウスをマルチクラスターウェアハウスに設定し、最大クラスター数を増やす",
      1: "BIチームなど、重要なレポートを生成する部門に専用の仮想ウェアハウスを割り当てる",
      2: "ウェアハウスのサイズを現在のものからさらに大きいサイズにスケールアップする",
      3: "ユーザーにクエリの実行時間を分散させるよう通知し、利用ガイドラインを徹底する",
    },
    answers: [0, 1],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "マルチクラスター仮想ウェアハウスの使用",
        url: "https://docs.snowflake.com/ja/user-guide/warehouses-multicluster",
      },
      {
        title: "ウェアハウスに関する考慮事項",
        url: "https://docs.snowflake.com/ja/user-guide/warehouses-considerations",
      }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        ある企業では、全社で単一の仮想ウェアハウスを共有しています。日中の特定の時間帯に、BIツールからの多数のクエリとデータロードバッチが集中し、クエリの待機時間が大幅に増加しています。
      </p>
      <p>
        この同時実行性の問題を解決するための<strong className="text-green-600">根本的な対策</strong>として適切なものを<strong className="text-green-600">2つ</strong>選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeのウェアハウスにおける同時実行性の問題は、単一ウェアハウスのリソースが複数のクエリによって競合することで発生します。この問題に対処するには、スケールアップ（サイズ変更）ではなく、スケールアウト（クラスター数の増加）やワークロードの分離が有効です。
      </p>
      <br />
      <p className="font-semibold text-green-600">正しい記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong>ウェアハウスをマルチクラスターウェアハウスに設定し、最大クラスター数を増やす:</strong><br/>
          これは典型的なスケールアウト戦略です。マルチクラスターウェアハウスは、クエリの同時実行数が増加した際に自動的に新しいクラスターを追加して対応します。これにより、多くのクエリを待機させることなく並列で処理できるため、同時実行性のボトルネックを解消する上で非常に効果的です。
        </li>
        <li>
          <strong>BIチームなど、重要なレポートを生成する部門に専用の仮想ウェアハウスを割り当てる:</strong><br/>
          これはワークロード分離の戦略です。重要な業務（BIレポートなど）と他の業務（データロード、アドホックな分析など）でウェアハウスを分離することで、互いのパフォーマンス影響をなくし、安定したリソースを確保できます。これにより、重要なクエリが他の大量のクエリによって妨げられるのを防ぎます。
        </li>
      </ul>
      <p className="font-semibold text-red-500">間違っている記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong>ウェアハウスのサイズを現在のものからさらに大きいサイズにスケールアップする:</strong><br/>
          スケールアップは、個々の複雑なクエリの処理速度を向上させるのには有効ですが、同時に実行できるクエリの数を直接増やすものではありません。多くのクエリが同時に実行される状況では、リソースの競合は解決されず、クエリがキューイングされる問題は残ります。
        </li>
        <li>
          <strong>ユーザーにクエリの実行時間を分散させるよう通知し、利用ガイドラインを徹底する:</strong><br/>
          これは運用上の工夫であり、一時的な緩和策にはなるかもしれませんが、根本的な解決策ではありません。ビジネスの成長とともにクエリ数は増加するため、将来的には同じ問題が再発する可能性が非常に高いです。システム側でボトルネックを解消することが重要です。
        </li>
      </ul>
    </div>
  );
}