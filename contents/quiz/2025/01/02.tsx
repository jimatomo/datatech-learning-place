import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    title: "Which cities have served as the capital of Japan?",
    images: [],
    question: "Which cities have served as Japan's capital throughout history? aaaaa aaaaaa aaa aaaaaaaa bbb bbbbbb bbbbb bbbb bbbb",
    options: { 0: "Tokyo", 1: "Kyoto", 2: "Osaka", 3: "Hiroshima dessssu sss aaa bbb ddd ss cccc aa　あいうえお。ちょっと眺めにしてみた時にどうなるの確認するために広くしています。" },
    answers: [0, 1],
    explanation: "Both Tokyo and Kyoto have served as Japan's capital cities. Kyoto was the imperial capital from 794 to 1868, while Tokyo (formerly Edo) became the capital in 1868 during the Meiji Restoration.",
    references: [
      { title: "Wikipedia Tokyo", url: "https://en.wikipedia.org/wiki/Tokyo" },
      { title: "Wikipedia Kyoto", url: "https://en.wikipedia.org/wiki/Kyoto" },
      { title: "Wikipedia Capital of Japan", url: "https://en.wikipedia.org/wiki/Capital_of_Japan" }
    ],
    tags: ["Geography", "History", "Snowflake", "dbt"],
    created_at: new Date("2025-01-02"),
    updated_at: new Date("2025-01-02"),
    author: "jimatomo",
    previous_quiz_id: "Q20250101",
    next_quiz_id: "Q20250103"
  });
  return quiz;
}


