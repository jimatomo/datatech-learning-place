import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Git", "GitHub Flow", "GitLab Flow", "Infrastructure"],
    created_at: new Date("2025-02-13"),
    updated_at: new Date("2025-02-13"),

    // ----- quiz -----
    title: "GitHubフローとGitLabフローの特徴と使い分け",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "GitHubフローは、mainブランチから直接featureブランチを作成し、開発完了後にPull Requestを通じてmainブランチにマージする、シンプルな戦略です。",
      1: "GitLabフローは、環境ごとに長期的なブランチ（production, staging, developmentなど）を持ち、上流から下流に向かって変更をマージしていく戦略です。",
      2: "GitLabフローは、複数の環境を持つ大規模プロジェクトには不向きで、シンプルな開発フローを好む小規模チームに最適です。",
      3: "GitHubフローは、feature togglesなどの機能フラグを使用せずに、未完成の機能を本番環境にデプロイすることを推奨しています。",
    },
    answers: [0, 1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "結局 Git のブランチ戦略ってどうすればいいの？", url: "https://qiita.com/ucan-lab/items/371cdbaa2490817a6e2a" },
      { title: "GitHub Flow", url: "https://docs.github.com/ja/get-started/using-github/github-flow" },
      { title: "今話題のトランクベース開発について調べた", url: "https://zenn.dev/takamin55/articles/2876db9d0693f3" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        GitHubフローとGitLabフローは、それぞれ異なる特徴を持つGitブランチ戦略です。以下の選択肢から、これらのブランチ戦略に関する正しい説明をすべて選んでください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        この問題では、GitHubフローとGitLabフローの基本的な特徴と、それぞれの戦略の利点について理解することを目的としています。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          GitHubフローは、mainブランチとfeatureブランチのみを使用する非常にシンプルな戦略です。
          開発者はmainブランチからfeatureブランチを作成し、開発完了後にPull Requestを通じてマージします。
        </li>
        <li className="py-2">
          GitHubフローに近く、よりブランチの存続期間を短くしてコンフリクトを起きにくくするトランクベース開発もあります。
          トランクベースの場合はフィーチャーブランチのこまめにmainブランチにマージ可能にするために、CI/CDを充実させたり、
          フィーチャーフラグなどを利用してリリースの管理をしたりするプラクティスが組み込まれます。
          また、リリース用のブランチやタグを利用する形でリリースを制御する場合もあります。
        </li>
        <li>
          GitLabフローは、production、staging、developmentなどの環境ごとのブランチを持ち、上流から下流に向かって変更をマージしていく戦略です。
          これにより、各環境での変更管理が容易になり、複数環境を持つ大規模プロジェクトに適しています。
          一方でhotfixなどを実施する際にはCherry pickを必要にする場面も多く、やや柔軟なリリースをする際の工数が多くなってしまう点がデメリットでもあります。
        </li>
      </ul>
      <p className="pt-2">
        プロジェクトの規模や要件に応じて適切なブランチ戦略を選択することが重要です。
        GitHubフローはシンプルさを重視する小規模プロジェクトに、GitLabフローは複数環境を持つ大規模プロジェクトに適しています。
      </p>
    </div>
  );
} 

