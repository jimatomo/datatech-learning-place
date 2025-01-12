import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Engineering", "Streamlit"],
    created_at: new Date("2025-01-14"),
    updated_at: new Date("2025-01-14"),

    // ----- quiz -----
    title: "Streamlit in Snowflakeの実行に必要な権限",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "Streamlitアプリを含むデータベースに対する USAGE 権限", 
      1: "Streamlitアプリを含むスキーマに対する CREATE STREAMLIT 権限", 
      2: "Streamlitアプリを含むスキーマに対する CREATE STAGE 権限", 
      3: "Streamlitアプリを含むスキーマに対する USAGE 権限", 
      4: "Streamlitアプリをに対する USAGE 権限"
    },
    answers: [0, 3, 4],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Streamlit in Snowflake について", url: "https://docs.snowflake.com/ja/developer-guide/streamlit/about-streamlit" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>Streamlit in Snowflake を使用する際に、アプリケーションの実行に必要な権限はどれですか？</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-sm md:text-base">
      <p>Streamlit in Snowflakeのアプリケーションを<strong>実行</strong>するには、以下の権限が必要です：</p>
      <ul>
        <li>・Streamlitアプリを含むデータベースに対する USAGE 権限</li>
        <li>・Streamlitアプリを含むスキーマに対する USAGE 権限</li>
        <li>・Streamlitアプリ自体に対する USAGE 権限</li>
      </ul>
      <p>これらの権限がないと、アプリケーションにアクセスしたり実行したりすることができません。</p>
    </div>
  );
}
