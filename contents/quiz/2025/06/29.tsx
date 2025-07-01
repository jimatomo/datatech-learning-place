import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Claude Code", "Anthropic", "AI Coding", "Terminal Tools", "Claude 3.7 Sonnet"],
    created_at: new Date("2025-06-29"),
    updated_at: new Date("2025-06-29"),

    // ----- quiz -----
    title: "Claude Code: Anthropicの新しいターミナル型AIコーディングツール",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Claude Codeは限定的な研究プレビューとして提供されており、開発者がターミナルから直接Claudeに実質的なエンジニアリングタスクを委任できる。",
      1: "Claude Codeはコードベースの理解、ファイル編集、バグ修正、テスト実行、Gitの履歴検索、マージコンフリクトの解決、プルリクエストの作成が可能である。",
      2: "Claude Codeは外部サーバーを必要とせず、ユーザーのコードクエリは中間サーバーを経由せずに直接Anthropic APIに送信される。",
      3: "Claude 3.7 SonnetはSWE-bench Verifiedで最先端の性能を達成し、実世界のソフトウェア問題を解決するAIモデルの能力を評価している。",
      4: "Claude Codeはハイブリッド推論機能により、即座のレスポンスと段階的な詳細思考の両方のモードを単一のモデル内で提供する。",
    },
    answers: [0, 1, 2, 3, 4],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Claude Code Overview - Anthropic Documentation", url: "https://docs.anthropic.com/ja/docs/claude-code/overview" },
      { title: "Claude 3.7 Sonnet発表記事", url: "https://note.com/suthio/n/n71c111ddd183" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Anthropicが2025年2月に発表したClaude CodeとClaude 3.7 Sonnetに関する記述のうち、正しいものを全て選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Claude CodeとClaude 3.7 Sonnetに関する各記述の解説は以下の通りです。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-emerald-500">Claude Codeは限定的な研究プレビューとして提供されており、開発者がターミナルから直接Claudeに実質的なエンジニアリングタスクを委任できる。</strong>：
          これは正しい記述です。Claude Codeは2025年2月にAnthropicが発表した新しいターミナル型AIコーディングツールで、現在は限定的な研究プレビュー（limited research preview）として提供されています。開発者は自分のターミナルから直接Claudeとやり取りし、複雑なエンジニアリングタスクを委任することができます。
        </li>
        <li>
          <strong className="text-emerald-500">Claude Codeはコードベースの理解、ファイル編集、バグ修正、テスト実行、Gitの履歴検索、マージコンフリクトの解決、プルリクエストの作成が可能である。</strong>：
          これは正しい記述です。Claude Codeは包括的なコーディング支援機能を提供しており、単純なコード生成だけでなく、実際の開発ワークフローに必要な様々なタスクを自動化できます。これには、コードベース全体の理解、複数ファイルの編集、自動テスト、バージョン管理操作などが含まれます。
        </li>
        <li>
          <strong className="text-emerald-500">Claude Codeは外部サーバーを必要とせず、ユーザーのコードクエリは中間サーバーを経由せずに直接Anthropic APIに送信される。</strong>：
          これは正しい記述です。Claude Codeはセキュリティとプライバシーを重視して設計されており、追加のサーバー設定や複雑なセットアップを必要としません。ユーザーのコードクエリは第三者のサーバーを経由することなく、直接Anthropic APIに送信されるため、データの制御とセキュリティが保たれます。
        </li>
        <li>
          <strong className="text-emerald-500">Claude 3.7 SonnetはSWE-bench Verifiedで最先端の性能を達成し、実世界のソフトウェア問題を解決するAIモデルの能力を評価している。</strong>：
          これは正しい記述です。Claude 3.7 SonnetはSWE-bench Verified（実世界のソフトウェアエンジニアリング問題を解決するAIモデルの能力を評価するベンチマーク）で最先端の性能を達成しています。また、TAU-benchでも優秀な結果を示しており、複雑なタスクにおけるAIエージェントの能力を実証しています。
        </li>
        <li>
          <strong className="text-emerald-500">Claude Codeはハイブリッド推論機能により、即座のレスポンスと段階的な詳細思考の両方のモードを単一のモデル内で提供する。</strong>：
          これは正しい記述です。Claude 3.7 Sonnetは市場初のハイブリッド推論モデルとして、即座の応答と拡張思考モード（extended thinking mode）の両方を提供します。開発者はAPIを通じてモデルがどの程度の時間をかけて「思考」するかを細かく制御でき、タスクの複雑さに応じて適切なモードを選択できます。
        </li>
      </ul>
      <p className="pt-4">
        <strong>補足</strong>：
        <br />
        Claude CodeとClaude 3.7 Sonnetの登場により、AI支援によるソフトウェア開発は新たな段階に入りました。これらのツールは単なるコード生成ツールを超えて、実際の開発ワークフロー全体を支援する包括的なソリューションとなっています。特に、ターミナルからの直接操作、セキュアなデータ処理、そして高度な推論能力の組み合わせは、開発者の生産性を大幅に向上させる可能性があります。
      </p>
    </div>
  );
}