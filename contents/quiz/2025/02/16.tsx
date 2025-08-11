import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AI", "Datatech News"],
    created_at: new Date("2025-02-16"),
    updated_at: new Date("2025-02-16"),

    // ----- quiz -----
    title: "AI/LLMの精度が向上した様々な技術",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Chain-of-Thought",
      1: "ReAct (Reasoning + Acting)",
      2: "学習データのバイアス",
      3: "MEMGpt (記憶力不足を解決する技術)",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "The Ascending Arc of AI Agents", url: "https://www.dataengineeringweekly.com/p/the-ascending-arc-of-ai-agents?utm_source=post-email-title&publication_id=73271&post_id=157042954&utm_campaign=email-post-title&isFreemail=true&r=57z11g&triedRedirect=true&utm_medium=email" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        昨今AI/LLMの制度が飛躍的に向上し、AI Agentも一部の領域で実用化されています。
        ChatGPTの登場時点ではLLMの精度向上における主要な要素は学習量の増加がでしたが、
        最近はそれ以外にも精度向上に寄与している技術がいくつかあります。
        以下の選択肢の中から、精度向上に寄与している技術を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        AI/LLMの精度向上に寄与している技術に関する問題です。
      </p>
      <p className="pt-2">
        それぞれの選択肢について説明します：
      </p>
      <ul className="list-disc pl-6 pt-2">
        <li className="pb-2">
          Chain-of-Thoughtは、LLMが推論を行う際に、段階的な思考プロセスを示す技術です。
          これにより数学の問題を解くなどの論理的な思考を伴うタスクにおいて、より正確な回答を生成することができるようになりました。
          しかし、外部ソースと照合できないため、事実に基づかない「ハルシネーション」を引き起こす可能性があります。
          そのため、他の技術と組み合わせることで、ハルシネーションを軽減する必要があります。
        </li>
        <li className="pb-2">
          ReAct（Reasoning + Acting）は、推論と行動を組み合わせた革新的なフレームワークです。
          外部APIやナレッジベースへのクエリなどのアクションを実行することで、モデルの推論を現実世界と結びつけ、
          ハルシネーションを軽減することができます。
        </li>
        <li className="pb-2">
          学習データのバイアスは、AIモデルの精度向上を妨げる要因の一つです。
          データに含まれる偏りや不均衡は、モデルの予測や判断に悪影響を与える可能性があります。
        </li>
        <li>
          MemGPTは、LLMのコンテキストウィンドウの制限を解決する技術です。
          オペレーティングシステムのページング機構にヒントを得た設計により、
          実質的に無制限のコンテキストを管理し、長時間の対話や複数セッションにわたる問題解決を可能にします。
        </li>
      </ul>
      <p className="pt-2">
        これらの技術革新により、AIは単なるチャットボットから、適応性の高い問題解決のコパイロットへと進化しつつあります。
        特に、ReActによる外部世界との相互作用、MemGPTによる長期的な文脈理解の改善は、
        より信頼性の高いAIシステムの実現に大きく貢献しています。
        また、今回取り上げた以外にも様々な技術が存在するので、興味がある方は調べてみてください。
      </p>
    </div>
  );
} 

