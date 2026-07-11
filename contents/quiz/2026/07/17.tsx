import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Codex",
    author_url: "https://github.com/jimatomo",
    tags: ["Streamlit", "Python", "Performance", "Data Application"],
    created_at: new Date("2026-07-17"),
    updated_at: new Date("2026-07-17"),

    title: "Streamlitのst.fragmentによる部分再実行",
    question_jsx: <QuizQuestion />,
    options: {
      0: "フラグメント内で作成した入力ウィジェットを操作すると、通常はアプリ全体ではなく、そのフラグメントだけが再実行される。",
      1: "run_everyを指定すると、セッションが有効な間、ユーザー操作がなくても指定間隔でフラグメントを自動再実行できる。",
      2: "フラグメントの値をアプリのほかの部分から利用する場合は、一般にSession Stateへ保存する。",
      3: "フラグメントは外部で作成したコンテナへウィジェットを配置でき、部分再実行のたびにそのコンテナの要素が自動的に消去される。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Streamlit API Reference - st.fragment",
        url: "https://docs.streamlit.io/develop/api-reference/execution-flow/st.fragment",
      },
      {
        title: "Streamlit Documentation - Working with fragments",
        url: "https://docs.streamlit.io/develop/concepts/architecture/fragments",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Streamlitの<code>st.fragment</code>について、
        <strong className="text-red-600">誤っているもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          フラグメントは外部で作成したコンテナへ要素を書き込めますが、ウィジェットを配置できるのはフラグメントの本体だけです。
          また、外部コンテナへ書き込んだ要素は部分再実行時に消去されず、アプリ全体が再実行されるまで蓄積する場合があります。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>フラグメント内のウィジェット操作は、その部分だけを再実行してアプリのほかの部分を保持します。</li>
        <li><code>run_every</code>は、ライブデータやバックグラウンド処理の状態を定期更新する用途に利用できます。</li>
        <li>フラグメントからアプリ全体を再実行するには<code>st.rerun()</code>、フラグメント自身だけを再実行するにはフラグメント再実行中に<code>st.rerun(scope=&quot;fragment&quot;)</code>を使います。</li>
      </ul>
    </div>
  );
}
