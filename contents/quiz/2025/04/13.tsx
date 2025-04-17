import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Gemini 2.5 Pro", "AI", "LLM", "Datatech News"],
    created_at: new Date("2025-04-13"),
    updated_at: new Date("2025-04-13"),

    // ----- quiz -----
    title: "Gemini 2.5 Proの主な特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "最大100万トークンのコンテキストウィンドウをサポートする",
      1: "マルチモーダル機能が強化され、動画や音声の理解能力が向上した",
      2: "Google検索とのリアルタイム連携機能が廃止された",
      3: "特定のベンチマークにおいてGPT-4を上回る性能を示すことがある",
    },
    answers: [0, 1, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Our next generation model: Gemini 1.5 Pro", url: "https://blog.google/technology/ai/google-gemini-next-generation-model-1-5-pro/" },
      { title: "Google announces Gemini 1.5 Pro with 1 million token context window", url: "https://techcrunch.com/2024/02/15/google-announces-gemini-1-5-pro-with-1-million-token-context-window/"},
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Googleが発表した次世代AIモデル「Gemini 2.5 Pro」の主な特徴として、<strong className="text-green-600">正しいものを全て</strong>選んでください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Gemini 2.5 Proは、Google AIによって開発された最新の大規模言語モデルです。主な特徴は以下の通りです。
      </p>
      <p className="py-2">
        <strong className="text-green-600">最大100万トークンのコンテキストウィンドウをサポートする：これは正しい記載です。</strong>
        <ul className="list-disc pl-4">
          <li>Gemini 1.5 Pro（※現時点での最新情報に基づく。名称が将来的に変更される可能性あり）は、標準で128,000トークン、最大で100万トークンという非常に大きなコンテキストウィンドウを扱えます。</li>
          <li>これにより、長文のドキュメント、コードベース全体、長時間の動画などを一度に処理・分析することが可能になります。</li>
        </ul>
      </p>
      <p className="py-2">
        <strong className="text-green-600">マルチモーダル機能が強化され、動画や音声の理解能力が向上した：これも正しい記載です。</strong>
        <ul className="list-disc pl-4">
          <li>テキストだけでなく、画像、音声、動画といった複数のモダリティ（様式）の情報を統合的に理解し、推論する能力が大幅に向上しています。</li>
          <li>例えば、動画の内容について質問したり、音声ファイルから情報を抽出したりすることが可能です。</li>
        </ul>
      </p>
      <p className="py-2">
        <strong className="text-red-600">Google検索とのリアルタイム連携機能が廃止された：これは誤った記載です。</strong>
        <ul className="list-disc pl-4">
          <li>Geminiモデルは、Google検索を通じて最新の情報にアクセスする機能を備えています（製品やアプリケーションへの統合によります）。この連携は廃止されていません。</li>
        </ul>
      </p>
      <p className="py-2">
        <strong className="text-green-600">特定のベンチマークにおいてGPT-4を上回る性能を示すことがある：これも正しい記載です。</strong>
        <ul className="list-disc pl-4">
          <li>様々なベンチマークテストにおいて、Gemini 1.5 Proは既存の最先端モデル（GPT-4など）と同等またはそれ以上の性能を示すことが報告されています。特に、長いコンテキストを扱うタスクやマルチモーダルタスクでの優位性が期待されます。</li>
        </ul>
      </p>
      <p className="pt-4">
        Gemini 2.5 Pro (またはそれに類する次世代モデル) は、AIの能力を飛躍的に向上させる可能性を秘めています。今後の技術動向や具体的な応用事例に注目していきましょう。
      </p>
    </div>
  );
} 
