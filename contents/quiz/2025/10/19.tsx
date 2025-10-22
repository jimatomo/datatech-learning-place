import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Iceberg", "Data Architecture", "Data Lakehouse", "Datatech News"],
    created_at: new Date("2025-10-19"),
    updated_at: new Date("2025-10-19"),

    // ----- quiz -----
    title: "“ゼロコピー”Kafka＋Iceberg統合の落とし穴（設計観点）",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Shared tiering (zero-copy) は重複保存を減らす一方で、Kafkaブローカー側でParquet書き出し／ログセグメント再構築などの計算負荷を背負わせ、コストが“ストレージ→コンピュート”に移る",
      1: "KafkaとIcebergを同一のIceberg表で共有すると、オフセット順レイアウトと分析最適レイアウトを同時に満たせず、どちらかを最適化すると他方のワークロードに悪影響が出る",
      2: "スキーマ進化には Uber-Schema や forward migration といった方針があり、完全忠実性の担保として original Kafka bytes を列保持する選択肢もある",
      3: "ゼロコピーは物理的統合により責任境界を明確化し、Kafkaはレイクハウス管理から解放されるため、運用負荷と結合度が下がる",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Why I’m not a fan of zero-copy Apache Kafka–Apache Iceberg (Jack Vanlightly)", url: "https://jack-vanlightly.com/blog/2025/10/15/why-im-not-a-fan-of-zero-copy-apache-kafka-apache-iceberg" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        <a
          className="text-blue-500 hover:underline"
          href="https://jack-vanlightly.com/blog/2025/10/15/why-im-not-a-fan-of-zero-copy-apache-kafka-apache-iceberg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Why I’m not a fan of zero-copy Apache Kafka–Apache Iceberg
        </a>
        （Jack Vanlightly）の記事（2025-10-15公開）に基づき、データ基盤アーキテクチャとしての
        <strong>“ゼロコピー（共有ティアリング）Kafka＋Iceberg”</strong>の評価について、
        <strong className="text-red-600">誤っているもの</strong>を1つ選んでください。

      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>要点：</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <span className="font-semibold">計算コストの転嫁</span>：shared tiering (zero-copy) は重複保存を避ける代わりに、KafkaブローカーがParquet生成やログ再構築を担い、
          ブローカー負荷と不確実性が増す（効率・性能の罠）。
        </li>
        <li>
          <span className="font-semibold">レイアウトの衝突</span>：Kafka向けのオフセット順配置は分析に不利、分析最適配置はKafkaの追いつき読みを悪化させる。
          同一物理表で両立しづらい。
        </li>
        <li>
          <span className="font-semibold">スキーマ進化の罠</span>：Uber-Schema／forward migration のいずれも一長一短で、双方向の完全忠実性や監査要件と緊張関係にある。
        </li>
        <li>
          <span className="font-semibold">境界の侵食</span>：物理統合は責任境界を曖昧にし結合度を高める。著者は<strong>materialize（分離）</strong>を推奨。
        </li>
      </ul>

      <p className="font-semibold text-red-500 pt-2">誤っている記述（解答）:</p>
      <p>
        「ゼロコピーは境界を明確化し運用負荷と結合度を下げる」という主張は本文と逆。
        著者は、物理統合はKafkaがレイクハウス管理まで背負いがちで結合度を高めるため<strong>反対</strong>と述べています。
      </p>

      <p className="font-semibold text-emerald-500 pt-2">正しい記述の補足:</p>
      <ul className="list-disc pl-4 py-2">
        <li>共有ティアリングは保存の一元化でなく、計算・I/Oコストや運用の不確実性を増やしがち。</li>
        <li>レイクハウス側はクエリ性能の鍵であるレイアウト最適化を行いたいが、それはKafkaの要件としばしば矛盾。</li>
        <li>実務的にはKafka ConnectやFlinkで<strong>片方向にマテリアライズ</strong>し、論理・意味的な統合を図るのが現実的。
        </li>
      </ul>
    </div>
  );
}
