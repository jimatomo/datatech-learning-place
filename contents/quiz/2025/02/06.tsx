import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Git", "pull", "fetch", "Infrastructure"],
    created_at: new Date("2025-02-06"),
    updated_at: new Date("2025-02-06"),

    // ----- quiz -----
    title: "Gitの基本：リポジトリ、インデックス、ワークツリーとgit pullとgit fetchの違い",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "Gitリポジトリは、全ファイルの履歴を保持し、インデックスは次のコミットのためのステージングエリア、ワークツリーは作業中のディレクトリです。git fetchはリモートから変更を取得しますが、作業ディレクトリは更新されません。",
      1: "git pullは、リモートからの変更を取得し、現在のブランチに自動的にマージまたはリベースするため、作業ディレクトリの内容に影響を及ぼします。",
      2: "Gitリポジトリは、ただ単にファイルが格納されるディレクトリで、インデックスは自動でマージされた変更を得る場所です。",
      3: "git fetchは、作業ディレクトリとインデックスを自動で更新し、直ちにファイルの内容を反映します。",
      4: "ワークツリーは、全ての変更履歴を管理し、Gitリポジトリは作業ファイルのみを保持します。",
      5: "git pullは、fetchで取得した変更を自動でmergeするのに対し、git fetchは変更を取得するだけで手動でmergeする必要があります。"
    },
    answers: [0, 1, 5],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "git fetchとgit pullの違い", url: "https://about.gitlab.com/ja-jp/blog/2024/07/25/what-is-the-difference-between-git-fetch-and-git-pull/" },
      { title: "Gitの基本: ワークツリーとインデックス", url: "https://backlog.com/ja/git-tutorial/intro/04/" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Gitの作業環境には「リポジトリ」、「インデックス」、「ワークツリー」という3つの重要なコンポーネントがあります。また、リモートリポジトリから変更を取得する方法として、<code>git fetch</code> と <code>git pull</code>があります。以下の選択肢の中から、正しい説明をすべて選んでください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        この問題では、Gitの基本的な構造であるリポジトリ、インデックス、ワークツリーの役割と、<code>git fetch</code>および<code>git pull</code>の動作の違いについて理解することを目的としています。
      </p>
      <p className="pt-2">
        正しい選択肢：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          リポジトリは全ファイルの履歴を保持し、インデックスは次のコミットのためのステージングエリア、ワークツリーは実際に作業するディレクトリです。また、<code>git fetch</code>はリモートの変更を取得するだけで、ワークツリーやインデックスは自動更新しません。
        </li>
        <li className="py-2">
          <code>git pull</code>は、<code>git fetch</code>で変更を取得し、さらに自動でマージやリベースを行うため、作業ディレクトリに直接反映されます。
        </li>
        <li>
          <code>git pull</code>は、取得した変更を自動でmergeする一方、<code>git fetch</code>は変更を取得するだけで、その後のmergeは手動で行う必要があります。
        </li>
      </ul>
      <p className="mt-2">
        gitを利用して安定的にデータパイプラインやアプリケーションを更新して履歴を管理できるようにするために、gitの基礎力を上げていきましょう！
      </p>
    </div>
  );
} 

