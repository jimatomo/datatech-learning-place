import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // metadata
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    // author_url: "https://github.com/jimatomo",
    created_at: new Date("2025-01-03"),
    updated_at: new Date("2025-01-03"),
    // previous_quiz_id: "Q20250102",
    // next_quiz_id: "Q20250104",

    // quiz
    title: "日本発のプログラミング言語は？",
    tags: ["Programming", "Technology", "History", "Engineering"],
    question: "以下のプログラミング言語のうち、日本で開発されたものを選んでください。",
    options: { 
      0: "Ruby", 
      1: "なでしこ", 
      2: "Python", 
      3: "プログラミング言語「ドリトル」", 
      4: "Swift"
    },
    answers: [0, 1, 3],
    explanation: "Rubyは1995年に日本人のまつもとゆきひろ氏によって開発されました。なでしこは日本語でプログラミングができる言語として開発され、ドリトルは子供向けのプログラミング教育用に日本で開発された言語です。PythonはオランダのGuido van Rossumによって、SwiftはApple社によって開発されました。",
    references: [
      { title: "Ruby公式サイト", url: "https://www.ruby-lang.org/ja/" },
      { title: "なでしこ公式サイト", url: "https://nadesi.com/" },
      { title: "ドリトル公式サイト", url: "https://dolittle.eplang.jp/" }
    ],
  });
  return quiz;
}


