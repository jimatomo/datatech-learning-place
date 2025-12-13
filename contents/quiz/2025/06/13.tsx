import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Application", "Streamlit", "streamlit"],
    created_at: new Date("2025-06-13"),
    updated_at: new Date("2025-06-13"),
    title: "Streamlitの双方向（bi-directional）コンポーネントの基本的な実装方法",
    question_jsx: <QuizQuestion />,
    options: {
      0: "components.declare_component()",
      1: "components.create_component()",
      2: "components.register_component()",
      3: "components.define_component()",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Intro to custom components - Streamlit Docs", url: "https://docs.streamlit.io/develop/concepts/custom-components/intro" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  const questionCode = `
import streamlit as st
import streamlit.components.v1 as components

# ??? を使用して双方向（bi-directional）コンポーネントを宣言する
# このコンポーネントはPythonとJavaScript間でデータのやり取りが可能
my_component = components.???(
    "my_component",
    url="http://localhost:3001"
)

# コンポーネントを使用してデータのやり取り
result = my_component(name="Streamlit")
st.write("結果:", result)
`;
  return (
    <div>
      <p className="pb-2">
        Streamlitアプリケーションで、PythonとJavaScript間でデータのやり取りが可能な双方向（bi-directional）コンポーネントを実装する際に、コンポーネントを宣言するために使用する正しい関数はどれでしょうか。以下のPythonコードの <code>???</code> に入る適切なStreamlit関数を選んでください。
      </p>
      <CodeBlock code={questionCode.trim()} />
    </div>
  );
}

function QuizExplanation() {
  const correctCode = `
import streamlit as st
import streamlit.components.v1 as components

# declare_componentを使用して双方向（bi-directional）コンポーネントを宣言
# このコンポーネントはPythonとJavaScript間でデータのやり取りが可能
my_component = components.declare_component(
    "my_component",  # コンポーネントの名前
    url="http://localhost:3001"  # 開発サーバーのURL
)

# コンポーネントを使用してデータのやり取り
result = my_component(name="Streamlit")
st.write("結果:", result)
`;

  const staticComponentCode = `
import streamlit as st
import streamlit.components.v1 as components

# 静的なHTMLコンテンツを表示する場合（双方向通信不要）
components.html(
    """
    <div style="padding: 1rem; background-color: #f0f2f6;">
        <h1>静的なHTML</h1>
        <p>これはStreamlitアプリ内の静的なHTMLです。</p>
    </div>
    """,
    height=200
)`;

  return (
    <div className="text-xs md:text-sm">
      <p>
        Streamlitで双方向（bi-directional）コンポーネントを実装する際の基本的な方法として、<code>components.declare_component()</code> 関数を使用します。この関数は、Python（バックエンド）とJavaScript（フロントエンド）の間でデータのやり取りが可能なコンポーネントを作成します。
      </p>

      <p className="py-2 font-semibold">各選択肢の解説：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong className="text-emerald-500"><code>components.declare_component()</code>：これが正解です。</strong>
          この関数は、双方向（bi-directional）コンポーネントを作成するための標準的な方法です。コンポーネント名とURLを指定することで、PythonとJavaScript間でデータのやり取りが可能なコンポーネントを宣言できます。
          <CodeBlock code={correctCode.trim()} />
        </li>
        <li className="pt-2">
          <code>components.create_component()</code>：これは誤りです。Streamlitには<code>create_component</code>という関数は存在しません。双方向コンポーネントの作成には<code>declare_component</code>を使用します。
        </li>
        <li className="pt-2">
          <code>components.register_component()</code>：これも誤りです。<code>register_component</code>という関数はStreamlitの標準APIにはありません。
        </li>
        <li className="pt-2">
          <code>components.define_component()</code>：これも誤りです。Streamlitでは<code>declare_component</code>が標準的な関数名として使用されています。
        </li>
      </ul>

      <p className="pt-4">
        <strong>補足：</strong>
        <br />
        Streamlitのコンポーネントには、双方向通信が必要ない静的なコンテンツを表示する場合に使用できる<code>components.html()</code>や<code>components.iframe()</code>などの代替手段もあります。以下は<code>components.html()</code>の使用例です：
      </p>
      <CodeBlock code={staticComponentCode.trim()} />
    </div>
  );
} 