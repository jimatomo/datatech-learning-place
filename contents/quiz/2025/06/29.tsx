import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Anthropic", "Claude 4.0", "Claude Code", "Datatech News"],
    created_at: new Date("2025-06-29"),
    updated_at: new Date("2025-08-10"),

    // ----- quiz -----
    title: "Claude Code & Claude 4.0: Anthropicの最新AI技術",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Claude Codeは開発者がターミナルから直接Claudeに実質的なエンジニアリングタスクを委任できるターミナル型AIコーディングツールである。",
      1: "Claude Codeはブラウザベースのツールとして提供されており、WebブラウザからGUIでClaudeとやり取りしてコーディングタスクを実行する。",
      2: "Claude Codeは外部サーバーを必要とせず、ユーザーのコードクエリは中間サーバーを経由せずに直接Anthropic APIに送信される。",
      3: "Claude 4.0モデル（Opus 4、Sonnet 4）はすべて無料で提供されており、APIの使用料金は一切かからない。",
      4: "Claude 4.0モデルはハイブリッド推論機能により、即座のレスポンスと拡張思考モードの両方を単一のモデル内で提供する。",
    },
    answers: [1, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Claude Code Overview - Anthropic Documentation", url: "https://docs.anthropic.com/ja/docs/claude-code/overview" },
      { title: "Claude Sonnet 4 - Anthropic公式サイト", url: "https://www.anthropic.com/claude/sonnet" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Anthropicが2025年に発表したClaude CodeとClaude 4.0モデルファミリーに関する記述のうち、<span className="text-red-600">間違っているもの</span>を全て選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Claude CodeとClaude 4.0モデルファミリーに関する各記述の解説は以下の通りです。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-emerald-500">Claude Codeは開発者がターミナルから直接Claudeに実質的なエンジニアリングタスクを委任できるターミナル型AIコーディングツールである。</strong>：
          これは正しい記述です。Claude Codeは2025年2月にAnthropicが発表した新しいターミナル型AIコーディングツールです。開発者は自分のターミナルから直接Claudeとやり取りし、複雑なエンジニアリングタスクを委任することができます。
        </li>
        <li>
          <strong className="text-red-500">Claude Codeはブラウザベースのツールとして提供されており、WebブラウザからGUIでClaudeとやり取りしてコーディングタスクを実行する。</strong>：
          これは間違った記述です。Claude Codeはブラウザベースのツールではなく、ターミナル型AIコーディングツールです。開発者はWebブラウザのGUIではなく、コマンドラインターミナルから直接Claudeとやり取りし、コーディングタスクを実行します。これにより、より直接的で効率的な開発体験が提供されます。
        </li>
        <li>
          <strong className="text-emerald-500">Claude Codeは外部サーバーを必要とせず、ユーザーのコードクエリは中間サーバーを経由せずに直接Anthropic APIに送信される。</strong>：
          これは正しい記述です。Claude Codeはセキュリティとプライバシーを重視して設計されており、追加のサーバー設定や複雑なセットアップを必要としません。ユーザーのコードクエリは第三者のサーバーを経由することなく、直接Anthropic APIに送信されるため、データの制御とセキュリティが保たれます。
        </li>
        <li>
          <strong className="text-red-500">Claude 4.0モデル（Opus 4、Sonnet 4）はすべて無料で提供されており、APIの使用料金は一切かからない。</strong>：
          これは間違った記述です。Claude 4.0モデルは無料ではありません。Claude Sonnet 4は Claude.ai の無料ティアでも利用可能ですが、APIの使用には料金がかかります。具体的には、Claude Sonnet 4のAPI料金は入力トークン100万個あたり3ドル、出力トークン100万個あたり15ドルとなっています。Claude Opus 4はより高性能なモデルのため、さらに高い料金設定となっています。
        </li>
        <li>
          <strong className="text-emerald-500">Claude 4.0モデルはハイブリッド推論機能により、即座のレスポンスと拡張思考モードの両方を単一のモデル内で提供する。</strong>：
          これは正しい記述です。Claude 4.0モデルファミリーは革新的なハイブリッド推論機能を搭載しており、通常の即座の応答と、複雑なタスクに対する拡張思考モードの両方を提供します。開発者はAPIを通じて、モデルがどの程度の時間をかけて「思考」するかを細かく制御できます。
        </li>
      </ul>
      <p className="pt-4">
        <strong>補足</strong>：
        <br />
        Claude CodeとClaude 4.0モデルファミリーの登場により、AI支援による開発は新たな段階に入りました。Claude Codeはターミナルからの直接操作を可能にし、Claude 4.0モデルは長時間の複雑なタスクを自律的に実行できる真のAIエージェントとしての能力を示しています。これらの組み合わせにより、開発者の生産性は革新的に向上する可能性があります。
      </p>
    </div>
  );
}