import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

// 簡単なHTMLを使用した問題の場合は以下のように記載できる
const question = `以下の大規模言語モデル（LLM）に関する説明のうち、正しいものを選んでください`

export default function QuizContent() {
  const quiz = new Quiz({
    // metadata
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    created_at: new Date("2025-01-04"),
    updated_at: new Date("2025-01-04"),
    previous_quiz_id: "Q20250103",
    // next_quiz_id: "Q20250105",

    // quiz
    title: "大規模言語モデル（LLM）の特徴は？",
    tags: ["AI", "Machine Learning", "LLM", "Engineering"],
    question: question,
    options: { 
      0: "トランスフォーマーアーキテクチャを使用している", 
      1: "文脈を理解するために注意機構（Attention）を使用する", 
      2: "学習データは全て手動でラベル付けされている", 
      3: "モデルサイズが大きいほど、常により良い結果が得られる", 
      4: "自己回帰的に次のトークンを予測する"
    },
    answers: [0, 1, 4],
    explanation: "大規模言語モデル（LLM）は、トランスフォーマーアーキテクチャを基盤とし、注意機構（Attention）を使用して文脈を理解します。また、自己回帰的に次のトークンを予測する仕組みを持っています。一方で、学習データは必ずしも全てがラベル付けされている必要はなく、教師なし学習も活用されます。また、モデルサイズを大きくすることで性能が向上する傾向はありますが、必ずしも常により良い結果が得られるわけではなく、タスクや用途に応じて適切なサイズを選択する必要があります。",
    references: [
      { title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762" },
      { title: "Language Models are Few-Shot Learners", url: "https://arxiv.org/abs/2005.14165" },
      { title: "LLMの基礎", url: "https://example.com/llm-basics" }
    ],
  });
  return quiz;
}


