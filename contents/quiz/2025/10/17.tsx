import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Streamlit", "Python", "Operation", "Data Application"],
    created_at: new Date("2025-10-17"),
    updated_at: new Date("2025-10-17"),

    // ----- quiz -----
    title: "Streamlitのデータフロー（再実行モデル）の基礎",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ユーザーがウィジェットを操作すると、原則としてスクリプト全体が上から下まで再実行される。",
      1: "st.session_state を使うと、再実行の間も値を保持して状態を管理できる。",
      2: "st.cache_data でデコレートした関数は、同じ引数での呼び出し時に結果を再利用し、ttlなどで無効化を制御できる。",
      3: "ウィジェットのイベントが発生しても、変更のあった関数やブロックだけが部分的に再実行され、他のコードは再評価されない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Streamlit Fundamentals - Main Concepts: Data flow",
        url: "https://docs.streamlit.io/get-started/fundamentals/main-concepts#data-flow",
      },
      {
        title: "Streamlit API Reference - Session State",
        url: "https://docs.streamlit.io/develop/api-reference/caching-and-state/st.session_state",
      },
      {
        title: "Streamlit API Reference - st.cache_data",
        url: "https://docs.streamlit.io/develop/api-reference/caching-and-state/st.cache_data",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      Streamlit の実行モデル（データフロー）に関する説明として、
      <strong className="text-red-600">誤っているもの</strong>を1つ選んでください。
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>解説:</p>
      <p className="pt-2">
        Streamlit は、ユーザー操作や入力の変更があるたびにスクリプトを
        <span className="font-semibold">上から下まで再実行</span>します。再実行のたびに通常の
        Python 変数は初期化されますが、<code>st.session_state</code> に保存した値はセッション内で保持されます。
        また、<code>st.cache_data</code> は同じ引数の計算結果をキャッシュし、<code>ttl</code> 等で無効化を制御できます。
      </p>

      <p className="font-semibold text-red-500 pt-3">誤っている記述（解答）:</p>
      <p>
        「ウィジェットのイベントが発生しても、変更のあった関数やブロックだけが部分的に再実行され、他のコードは再評価されない。」
        という説明は誤りです。Streamlit は部分実行ではなくスクリプト全体を再評価する設計です（ただし、キャッシュ済みの関数結果は再利用されます）。
      </p>

      <p className="font-semibold text-emerald-500 pt-3">正しい記述:</p>
      <ul className="list-disc pl-4 py-2 space-y-1">
        <li>
          ユーザー操作で原則としてアプリ全体が再実行される。
        </li>
        <li>
          <code>st.session_state</code> は再実行間の状態保持に使える。
        </li>
        <li>
          <code>st.cache_data</code> は同じ引数に対して結果を再利用でき、<code>ttl</code> で期限を制御できる。
        </li>
      </ul>
    </div>
  );
}
