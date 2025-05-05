import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AI", "Claude", "Datatech News"],
    created_at: new Date("2025-05-04"),
    updated_at: new Date("2025-05-04"),

    // ----- quiz -----
    title: "AI Agent Codingのベストプラクティス（Claude Code: Best practices for agentic coding）",
    question_jsx: <QuizQuestion />,
    options: {
      0: "プロジェクト固有の情報（よく使うコマンド、ファイル構成、コーディング規約など）をAIエージェントに事前に提供することは、効率的なコーディングのために重要である。",
      1: "シェルコマンド、API連携、カスタムスクリプトなど、既存の開発ツールや自作ツールをAIエージェントに連携させることで、より複雑なタスクを自動化できる。",
      2: "AIエージェントとの対話は反復的なプロセスであり、最初から完璧な結果を期待せず、指示の修正や結果の検証を通じて改善していくことが効果的である。",
      3: "AIエージェントは常に自律的に最適なコードを生成するため、開発者はプロンプトを与えるだけで、その後の修正や検証プロセスに関与する必要はない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Claude Code: Best practices for agentic coding", url: "https://www.anthropic.com/engineering/claude-code-best-practices" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        参考資料のClaude Code: Best practices for agentic codingに基づき、AI Agentを用いたコーディングにおけるベストプラクティスに関する記述として、<span className="text-red-500">間違っている</span>選択肢を選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        <strong>「AIエージェントは常に自律的に最適なコードを生成するため、開発者はプロンプトを与えるだけで、その後の修正や検証プロセスに関与する必要はない。」</strong>という記述は間違っています。
        AI Agentを用いたコーディングは、多くの場合、反復的なプロセスです。AIエージェントは強力なツールですが、常に完璧なコードを一度で生成するわけではありません。
        開発者は、エージェントの生成したコードを確認し、必要に応じて指示を修正したり、追加のコンテキストを提供したり、生成されたコードをテスト・検証したりする積極的な役割を担うことが、高品質な成果を得るために重要です。
      </p>
      <p className="py-2">
        その他の選択肢は、AI Agentを用いたコーディングにおける一般的なベストプラクティスとして正しい記述です：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>「プロジェクト固有の情報（よく使うコマンド、ファイル構成、コーディング規約など）をAIエージェントに事前に提供することは、効率的なコーディングのために重要である。」</strong>: これは正しい記述です。
          AIエージェントがプロジェクトの文脈を理解することで、より的確で整合性の取れたコード生成やタスク実行が可能になります。
        </li>
        <li className="pb-2">
          <strong>「シェルコマンド、API連携、カスタムスクリプトなど、既存の開発ツールや自作ツールをAIエージェントに連携させることで、より複雑なタスクを自動化できる。」</strong>: これも正しい記述です。
          AIエージェントに多様なツールを使わせることで、単なるコード生成を超えた、より広範で複雑な開発ワークフローの自動化が実現できます。
        </li>
        <li className="pb-2">
          <strong>「AIエージェントとの対話は反復的なプロセスであり、最初から完璧な結果を期待せず、指示の修正や結果の検証を通じて改善していくことが効果的である。」</strong>: これも正しい記述です。
          AIエージェントとの効果的な協働のためには、対話を通じて徐々に望ましい結果に近づけていくアプローチが有効です。
          プロンプトやルールなどを試行錯誤し、フィードバックを通じて改善していくことが重要です。
        </li>
      </ul>
      <p className="pt-2">
        AI Agentをコーディングに活用する際は、その能力と限界を理解し、適切に具体的なゴールの設定をしたり、ガイド、検証、修正を行うことで、そのポテンシャルを最大限に引き出すことができます。
      </p>
    </div>
  );
} 
