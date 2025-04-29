import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AI", "Agent", "Data Application"],
    created_at: new Date("2025-04-26"),
    updated_at: new Date("2025-04-26"),

    // ----- quiz -----
    title: "AIエージェントの構築における重要な概念",
    question_jsx: <QuizQuestion />,
    options: {
      0: "エージェントの設計において、明確な目標設定と制約条件の定義は、エージェントの行動範囲と意思決定プロセスを適切に制御するために重要である。",
      1: "エージェントの学習プロセスにおいて、フィードバックループの実装は、エージェントのパフォーマンスを継続的に改善するために不可欠である。",
      2: "エージェントの安全性を確保するためには、有害な行動を防止するための制御メカニズムと、エージェントの行動を監視・記録するシステムの両方が必要である。",
      3: "エージェントの開発において、一度設定した目標や制約は、エージェントの学習が進んでも変更すべきではない。なぜなら、一貫性のある行動を維持することが重要だからである。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "A Practical Guide to Building Agents", url: "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        AIエージェントの構築に関する記述として、<span className="text-red-500">間違っている</span>選択肢を選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        <strong>「エージェントの開発において、一度設定した目標や制約は、エージェントの学習が進んでも変更すべきではない。なぜなら、一貫性のある行動を維持することが重要だからである。」</strong>という記述は間違っています。
        エージェントの目標や制約は、学習の進展や環境の変化に応じて適宜見直し、調整することが重要です。これは、エージェントの安全性と有効性を確保するために必要なプロセスです。
      </p>
      <p className="py-2">
        その他の選択肢は正しい記述です：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>目標設定と制約条件の定義:</strong> エージェントの行動範囲と意思決定プロセスを適切に制御するために、明確な目標と制約を設定することは重要です。これにより、エージェントの行動を予測可能にし、意図しない結果を防ぐことができます。
        </li>
        <li className="pb-2">
          <strong>フィードバックループの実装:</strong> エージェントのパフォーマンスを継続的に改善するためには、フィードバックループの実装が不可欠です。これにより、エージェントは自身の行動の結果から学習し、より効果的な意思決定を行うことができます。
        </li>
        <li className="pb-2">
          <strong>安全性の確保:</strong> エージェントの安全性を確保するためには、有害な行動を防止するための制御メカニズムと、エージェントの行動を監視・記録するシステムの両方が必要です。これにより、エージェントの行動を適切に管理し、問題が発生した場合に迅速に対応することができます。
        </li>
      </ul>
      <p className="pt-2">
        AIエージェントの開発においては、これらの要素を適切に組み合わせ、継続的な改善と安全性の確保を図ることが重要です。また、エージェントの目標や制約は、学習の進展や環境の変化に応じて柔軟に調整する必要があります。
      </p>
    </div>
  );
} 
