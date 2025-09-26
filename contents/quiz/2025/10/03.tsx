import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Streamlit", "Python", "Session State", "Data Application"],
    created_at: new Date("2025-10-03"),
    updated_at: new Date("2025-10-03"),

    // ----- quiz -----
    title: "Streamlitのst.session_stateの挙動",
    question_jsx: <QuizQuestion />,
    options: {
      0: "st.session_stateに保存された値は、ウィジェット操作などでスクリプトが再実行されても保持される。",
      1: "各ユーザー（ブラウザの各タブ）は、それぞれが独立したst.session_stateを持つ。",
      2: "st.cache_dataやst.cache_resourceとは異なり、st.session_stateの値は現在のセッションのみで有効であり、他のセッションとは共有されない。",
      3: "ブラウザのページをリフレッシュ（再読み込み）しても、st.session_stateに保存された値は維持される。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Streamlit Documentation - Session State",
        url: "https://docs.streamlit.io/get-started/fundamentals/advanced-concepts#session-state",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Streamlitのst.session_stateに関する記述のうち、
        <strong className="text-red-600">間違っているもの</strong>
        を一つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        st.session_stateは、Streamlitアプリケーションにおいて、ユーザーのセッションごとに状態を保持するための重要な機能です。
      </p>
      <br />
      <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
      <p>
        「ブラウザのページをリフレッシュ（再読み込み）しても、st.session_stateに保存された値は維持される」は間違いです。公式ドキュメントにも記載がある通り、ユーザーがブラウザページをリフレッシュしたり、URLを再読み込みしたりすると、セッションはリセットされ、st.session_stateも初期化されます。
      </p>
      <br />
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          st.session_stateは、ボタンクリックや入力値の変更といったインタラクションによって発生するスクリプトの再実行（rerun）をまたいで、変数の値を保持するために使用されます。
        </li>
        <li>
          アプリケーションを複数のユーザーが同時に利用したり、一人のユーザーが複数のタブで開いたりした場合でも、それぞれのタブ（セッション）でst.session_stateは独立して管理されます。
        </li>
        <li>
          st.cache_dataやst.cache_resourceは、関数と入力値に基づいて結果をキャッシュし、全セッションで共有される可能性があります。一方、st.session_stateは現在のセッションにのみスコープが限定されます。
        </li>
      </ul>
    </div>
  );
}

