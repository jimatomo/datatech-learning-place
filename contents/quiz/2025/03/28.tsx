import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Application", "Python", "Streamlit"],
    created_at: new Date("2025-03-28"),
    updated_at: new Date("2025-03-28"),

    // ----- quiz -----
    title: "Streamlitのチャット要素の使い方",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "st.chat_message()",
      1: "st.chat_input()",
      2: "st.session_state",
      3: "st.chat_history()",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Streamlit公式ドキュメント - Chat elements", url: "https://docs.streamlit.io/library/api-reference/chat" },
      { title: "Streamlit公式ドキュメント - Session State", url: "https://docs.streamlit.io/library/api-reference/session-state" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <>
      <p className="pb-4">
        以下のStreamlitのチャットアプリケーションのコードで、空欄（___）に入るコードを選んでください。（26行目）
      </p>
      <CodeBlock code={`import streamlit as st

# セッションステートの初期化
if "messages" not in st.session_state:
    st.session_state.messages = []

# メッセージ履歴の表示
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# ユーザーからの入力を受け取る
if prompt := st.chat_input("メッセージを入力してください"):
    # ユーザーのメッセージを履歴に追加
    st.session_state.messages.append({"role": "user", "content": prompt})
    # チャットメッセージとして表示
    with st.chat_message("user"):
        st.markdown(prompt)

    # AIからの応答を生成（本来はここにLLMのクライアントを呼び出すコードが入る）
    response = f"Echo: {prompt}"

    # AIのメッセージを履歴に追加
    st.session_state.messages.append({"role": "assistant", "content": response})
    # チャットメッセージとして表示
    with st.chat_message("assistant"):
        st.markdown(response)
`}
      />
    </>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">この問題は、Streamlitのチャット要素を使って、AI（アシスタント）からの応答メッセージをどのように画面に表示するかを問うています。</p>

      <p className="py-2 font-bold">st.chat_message(name) の役割:</p>
      <ul className="list-disc pl-4">
        <li>
          st.chat_message() は、チャットインターフェース内に個々のメッセージを表示するための専用コンテナを作成する関数です。
        </li>
        <li className="pt-2">
          引数 name には、メッセージの送信者を示すロール（役割名）を指定します。一般的には &ldquo;user&rdquo; や &ldquo;assistant&rdquo; が使われますが、任意の文字列を指定することも可能です。
        </li>
        <li className="py-2">
          with 文と組み合わせて使うことで、with ブロック内の要素（st.markdown() などで表示される内容）が、指定されたロールに対応するアイコンやスタイル（例: ユーザーメッセージは右寄せ、アシスタントメッセージは左寄せ）を持つチャットバブル（吹き出し）の中に表示されます。
        </li>
      </ul>

      <p className="py-2 font-bold">コードの流れと空欄の理由:</p>
      <ul className="list-disc pl-4">
        <li>
          <strong>ユーザー入力の表示（19-20行目）:</strong><br />
          ユーザーが入力したメッセージ (prompt) を表示するために with st.chat_message(&ldquo;user&rdquo;): が使われています。これにより、ユーザーアイコンが付いたチャットバブルが表示されます。
        </li>
        <li className="py-2">
          <strong>AI応答の表示（25-27行目）:</strong><br />
          同様に、AIが生成した応答 (response) を表示する必要があります。<br />
          AIのメッセージであることを示すために、ロールとして &ldquo;assistant&rdquo; を指定し、アシスタント用のアイコンとスタイルでチャットバブルを表示したいです。<br />
          したがって、空欄にはユーザーメッセージ表示時と同じ st.chat_message() を使い、引数に &ldquo;assistant&rdquo; を指定するのが適切です。
        </li>
      </ul>

      <p className="py-2 font-bold">他の選択肢が不適切な理由:</p>
      <ul className="list-disc pl-4">
        <li>
          <strong>st.session_state:</strong> これはStreamlitアプリケーションの状態（セッションデータ）を保持するための辞書ライクなオブジェクトです。チャット履歴 (messages リスト) などを保存するために使いますが、メッセージを画面に表示する機能はありません。
        </li>
        <li className="pt-2">
          <strong>st.chat_history():</strong> この名前の関数はStreamlitの標準APIには存在しません。チャット履歴の管理は、st.session_state を使って開発者が手動で行うのが一般的です。
        </li>
        <li className="py-2">
          <strong>st.chat_input():</strong> これは画面下部などにテキスト入力フィールドを表示し、ユーザーからのメッセージ入力を受け付けるための関数です。メッセージを表示する機能はありません。
        </li>
      </ul>

      <p className="py-2 font-bold">結論:</p>
      <p>
        AI（アシスタント）からの応答メッセージを、適切なスタイル（アイコンと配置）でチャットUI上に表示するためには、with st.chat_message(&ldquo;assistant&rdquo;): を使用する必要があります。したがって、正解は st.chat_message() です。
      </p>
    </div>
  );
} 

