import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AI", "Data Application"],
    created_at: new Date("2025-08-22"),
    updated_at: new Date("2025-08-22"),

    // ----- quiz -----
    title: "AIワークフローとAIエージェントの比較",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ワークフローは、事前に定義された明示的なステップで構成されるため、決定論的でデバッグが容易な傾向がある。",
      1: "エージェントは、LLMが自律的に次のアクションを決定するため、予測不可能で動的なタスクへの適応性が高い。",
      2: "一般的にエージェントは、その自律的な性質から監視やコスト管理が複雑になりやすく、ワークフローに比べて運用上のオーバーヘッドが大きくなる可能性がある。",
      3: "将来の拡張性を考慮すると、あらゆるAIアプリケーションは初期設計段階から、より柔軟性の高いエージェントベースのアーキテクチャを優先して採用することが推奨される。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "A Developer’s Guide to Building Scalable AI: Workflows vs Agents",
        url: "https://towardsdatascience.com/a-developers-guide-to-building-scalable-ai-workflows-vs-agents/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        AIアプリケーションのアーキテクチャ設計において、AIワークフローとAIエージェントは重要な概念です。両者の特徴やトレードオフに関する記述として、
        <strong className="text-red-500">最も不適切なもの</strong>はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        AIアプリケーションを構築する際、信頼性、保守性、コスト効率を考慮したアーキテクチャ選択が重要です。特に、ワークフローから始めて、必要性が明確になった場合にのみエージェントを導入するアプローチが推奨されます。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <p className="font-semibold text-emerald-500">正しい記述:</p>
          <p>
            ワークフローは、処理の流れが明示的に定義された構造化パイプラインです。各ステップが予測可能であるため、デバッグやテストが容易で、安定した運用が可能です。
          </p>
        </li>
        <li>
          <p className="font-semibold text-emerald-500">正しい記述:</p>
          <p>
            エージェントは、LLM自身が状況を判断し、次に実行すべきタスクやツールを自律的に選択します。このため、事前にすべてのステップを定義することが困難な、複雑で動的な問題領域に適しています。
          </p>
        </li>
        <li>
          <p className="font-semibold text-emerald-500">正しい記述:</p>
          <p>
            エージェントの自律的な性質は、予期せぬ動作や無限ループ、過剰なトークン消費などを引き起こす可能性があります。そのため、その動作を監視し、コストを管理するための仕組みがワークフローよりも複雑になりがちです。
          </p>
        </li>
        <li>
          <p className="font-semibold text-red-500">不適切な記述（正答）:</p>
          <p>
            参考記事では、「ワークフローから始め、エージェントは明確に必要性が正当化できる場合にのみ追加する」というアプローチを推奨しています。多くのユースケースでは、信頼性が高く管理しやすいワークフローが最適解であり、初期段階から複雑なエージェントを導入することは、必ずしも良い選択とは限りません。
          </p>
        </li>
      </ul>
    </div>
  );
}

