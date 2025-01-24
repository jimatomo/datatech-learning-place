import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Streamlit", "Snowflake", "Caching"],
    created_at: new Date("2025-01-24"),
    updated_at: new Date("2025-01-24"),

    // ----- quiz -----
    title: "Streamlitにおけるキャッシュの動作",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "st.cache_dataはSnowflakeで完全にサポートされている（ネイティブなStreamlitで利用できる機能のすべてをサポート）",
      1: "st.cache_resourceはクエリの結果をキャッシュするために利用する",
      2: "Snowflakeではキャッシュはセッション間で共有されない",
      3: "通常のStreamlitではキャッシュはすべてのユーザー間で共有される",
    },
    answers: [2, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Streamlit in Snowflake Limitations", url: "https://docs.snowflake.com/en/developer-guide/streamlit/limitations" },
      { title: "Streamlit Caching", url: "https://docs.streamlit.io/develop/concepts/architecture/caching" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>StreamlitをSnowflakeで使用する際のキャッシュの動作と、一般的なStreamlitでのキャッシュの使い方について正しいものを選択してください：</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Streamlit in Snowflakeでは、キャッシュはセッション間で共有されず、各セッション内でのみ有効です。
        <br />
        通常のStreamlitでは、キャッシュはすべてのユーザー間で共有され、キャッシュされたデータは再利用されます。
      </p>
      <p className="pt-2">
        st.cache_dataとst.cache_resourceは、通常のStreamlitでのキャッシュのためのデコレータであり、それぞれ異なる用途に使用されます。
      </p>
      <p className="pt-2">
        st.cache_dataはクエリの結果などのキャッシュに使用されます。
        一方で、st.cache_resourceはデータベースの接続やMLモデルなどのリソースのキャッシュに使用されます。
      </p>
    </div>
  );
} 
