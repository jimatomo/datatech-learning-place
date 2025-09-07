import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Modeling", "dbt", "AI", "Datatech News"],
    created_at: new Date("2025-09-14"),
    updated_at: new Date("2025-09-14"),

    // ----- quiz -----
    title: "LLMを活用したデータモデリングのアプローチ",
    question_jsx: <QuizQuestion />,
    options: {
      0: "JOINの解決における認知的な負荷を減らすため、非正規化（Denormalized）またはOBT（One Big Table）アプローチを採用する。",
      1: "AI IDE（統合開発環境）を拡張し、チームのデータモデリング手法や依存関係のスキャン方法を学習させる。",
      2: "データカタログやドキュメントをすべてLLMのコンテキストウィンドウに入力し、完全な情報を提供することで精度を上げる。",
      3: "Google Meetの議事録やdbtのカタログファイルなど、外部のコンテキストを動的に取得するツールを統合する。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "The Vision of Vibe Data Modeling: Are Organisations Ready", url: "https://moderndata101.substack.com/p/vibe-data-modeling" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        ブログ記事「<a href="https://moderndata101.substack.com/p/vibe-data-modeling" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">The Vision of Vibe Data Modeling</a>」で提唱されている、LLM（大規模言語モデル）を活用したデータモデリング（Vibe Data Modeling）を成功させるためのアプローチとして、<strong className="text-red-600">誤っているもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
      <p>
        記事では、データカタログやドキュメントのすべてをコンテキストウィンドウに一度に入力することは、コンテキストのサイズ制限や効率性の観点から現実的ではないと指摘しています。代わりに、必要な情報を動的に取得・要約するためのツール連携（記事中のLevel 2やLevel 3のアプローチ）が重要であると述べられています。
      </p>
      <br/>
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>LLMがJOINを扱う際の複雑さを避けるため、非正規化やOBTといったモデルが推奨されています。これにより、LLMはより簡単にクエリを生成できます。</li>
        <li>AI IDE（例: Cursor）のルール機能を活用し、プロジェクト固有のモデリング手法を学習させることで、より精度の高いコード生成が可能になります（Level 1）。</li>
        <li>MCP（Multi-Context Platform）の概念を用いて、議事録、データカタログ、Slackの会話など、IDEの外部にある多様な情報源をツールとして統合し、LLMのコンテキストを強化することが提案されています（Level 2, Level 3）。</li>
      </ul>
    </div>
  );
}


