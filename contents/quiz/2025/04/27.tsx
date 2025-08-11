import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AgentArchitecture", "Datatech News", "AI"],
    created_at: new Date("2025-04-27"),
    updated_at: new Date("2025-04-27"),

    // ----- quiz -----
    title: "OpenAI Agentの構築ガイドライン",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Agentを構築すべきケースとしてあげられるのは、従来の決定論的なアプローチやルールベースのアプローチでは不十分なワークフローを自動化するケースです。",
      1: "Agentの構成要素には、LLMベースの思考モデル、外部関数やAPIなどを利用できるようにするツール、処理オーケストレーションコンポーネントが含まれる。",
      2: "シングルエージェントシステムは漸進的な改善のアプローチが可能であるメリットがあるが、最初からスケーリングが可能なマルチエージェントシステムを導入する方が成功するケースが多い。",
      3: "ガードレール設計としては、入力検証、高リスクなツール呼び出し時の人間へのエスカレーション、出力モニタリングが重要である。",
    },
    answers: [2],
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
        OpenAI Agent構築ガイドラインに基づきAI Agent構築に関する記述として<strong className="text-red-500">誤っている</strong>選択肢を選んでください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        OpenAIのAgent構築ガイドラインは、効果的なAIエージェントを設計・実装するための重要な指針を提供します。以下に各選択肢の解説を示します。
      </p>
      <p className="py-2">
        <strong className="text-emerald-500">「Agentを構築すべきケースとしてあげられるのは、従来の決定論的なアプローチやルールベースのアプローチでは不十分なワークフローを自動化するケースです。」</strong>：これは正しい記載です。
        <br />
        OpenAIのガイドラインでは、静的なルールや単純な自動化では対応できない、動的で複雑なタスクの自動化にAI Agentが特に有効であると述べられています。
        また、自然言語を用いた非構造データの解釈やコミュニケーションが必要なケースでも有効です。
      </p>
      <p className="py-2">
        <strong className="text-emerald-500">「Agentの構成要素には、LLMベースの思考モデル、外部関数やAPIなどを利用できるようにするツール、処理オーケストレーションコンポーネントが含まれる。」</strong>：これは正しい記載です。
        <br />
        ガイドラインで示されているAgentの基本的な構成要素です。LLMが思考と計画を担当し、ツールが外部とのインタラクションを可能にし、オーケストレーターがガイドラインやガードレールなどに基づいて全体のプロセスを管理します。
      </p>
      <p className="py-2">
        <strong className="text-red-500">「シングルエージェントシステムは漸進的な改善のアプローチが可能であるメリットがあるが、最初からスケーリングが可能なマルチエージェントシステムを導入する方が成功するケースが多い。」</strong>：これは誤った記載です。
        <br />
        ガイドラインでは、多くの場合、シングルエージェントシステムから始めることを推奨しています。シングルエージェントは開発、テスト、デバッグが比較的容易であり、まずは単純な構成で価値を検証し、必要に応じてマルチエージェントシステムへとスケールアップする漸進的なアプローチが効果的です。最初から複雑なマルチエージェントシステムを構築することは、開発コストや管理の複雑さを増大させる可能性があります。
      </p>
      <p className="py-2">
        <strong className="text-emerald-500">「ガードレール設計としては、入力検証、高リスクなツール呼び出し時の人間へのエスカレーション、出力モニタリングが重要である。」</strong>：これは正しい記載です。
        <br />
        Agentが安全かつ信頼性高く動作するためには、適切なガードレール（安全策）の設計が不可欠です。ガイドラインでは、入力値の検証、リスクの高い操作（例：データの削除、外部への通知）を実行する前の人間による承認ステップ、そしてAgentの出力が意図した範囲内にあるかの継続的な監視などが重要なガードレールとして挙げられています。
      </p>
    </div>
  );
} 