import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    title: "What is the capital of Japan?",
    question: "What is the capital of Japan?",
    options: { 0: "Tokyo", 1: "Kyoto", 2: "Osaka", 3: "Hiroshima" },
    answers: [0],
    explanation: "Tokyo is the capital of Japan.",
    references: [{ title: "Wikipedia", url: "https://en.wikipedia.org/wiki/Tokyo" }],
    tags: ["Geography", "History", "Engineering"],
    created_at: new Date("2023-01-01"),
    updated_at: new Date("2024-01-01"),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
  });
  return quiz;
}


