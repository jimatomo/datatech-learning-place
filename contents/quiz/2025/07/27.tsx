import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AI", "Anthropic", "Datatech News"],
    created_at: new Date("2025-07-27"),
    updated_at: new Date("2025-07-27"),

    // ----- quiz -----
    title: "Anthropicのマルチエージェントリサーチシステム",
    question_jsx: <QuizQuestion />,
    options: {
      0: "マルチエージェントシステムは、単一エージェントシステムと比較してトークン消費量が少なく、コスト効率が高い。",
      1: "システムのアーキテクチャは、すべてのエージェントが対等に協力し合うフラットな構造を採用している。",
      2: "リードエージェントはタスクを複数のサブタスクに分解し、それらをサブエージェントに並行して実行させることで、複雑な調査を効率的に行う。",
      3: "エージェント間のやり取りは常に非同期で実行され、リアルタイムでの協調を実現している。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "How we built our multi-agent research system | Engineering at Anthropic",
        url: "https://www.anthropic.com/engineering/built-multi-agent-research-system",
      },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Anthropicが開発したマルチエージェントリサーチシステム（
        <a
          href="https://www.anthropic.com/engineering/built-multi-agent-research-system"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          参考記事
        </a>
        ）に関する記述として、
        <strong className="text-emerald-500">最も適切なもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-4">
        Anthropicのマルチエージェントリサーチシステムは、複雑でオープンエンドな問題解決のために設計されています。単一の強力なAIエージェントに依存するのではなく、複数のエージェントが協調して動作するアーキテクチャを採用しています。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            リードエージェントはタスクを複数のサブタスクに分解し、それらをサブエージェントに並行して実行させることで、複雑な調査を効率的に行う。：
          </strong>
          <br />
          これは<strong className="text-emerald-500">正しい</strong>
          です。このシステムは「オーケストレーター・ワーカー」パターンを採用しており、リードエージェントが戦略を立て、専門のサブエージェントを生成して並行して調査を進めさせます。これにより、単一のエージェントでは困難な、幅広く独立した調査が可能になります。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">不正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li className="pt-2">
          <strong>
            マルチエージェントシステムは、単一エージェントシステムと比較してトークン消費量が少なく、コスト効率が高い。：
          </strong>
          <br />
          これは<strong className="text-red-500">間違い</strong>
          です。記事によると、マルチエージェントシステムはチャット対話の約15倍のトークンを使用することがあり、トークン消費量の多さが経済的な課題点として挙げられています。パフォーマンス向上のトレードオフとして、高いコストがかかります。
        </li>
        <li className="pt-2">
          <strong>
            システムのアーキテクチャは、すべてのエージェントが対等に協力し合うフラットな構造を採用している。：
          </strong>
          <br />
          これは<strong className="text-red-500">間違い</strong>
          です。システムは、リードエージェント（オーケストレーター）がプロセスを調整し、サブエージェント（ワーカー）にタスクを委任する階層的な構造（orchestrator-worker
          pattern）を特徴としています。
        </li>
        <li className="pt-2">
          <strong>
            エージェント間のやり取りは常に非同期で実行され、リアルタイムでの協調を実現している。：
          </strong>
          <br />
          これは<strong className="text-red-500">間違い</strong>
          です。記事の執筆時点では、リードエージェントはサブエージェントを「同期的」に実行しており、これがボトルネックになり得ると述べられています。非同期実行は、今後の改善点として挙げられています。
        </li>
      </ul>
    </div>
  );
}