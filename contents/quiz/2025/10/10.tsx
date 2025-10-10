import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Streamlit", "Python", "Connections", "Data Access"],
    created_at: new Date("2025-10-10"),
    updated_at: new Date("2025-10-10"),

    // ----- quiz -----
    title: "Streamlit Connections APIの基礎",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Connectionの接続情報は.streamlit/secrets.tomlの[connections.your_connection_name]セクションから読み込まれる。",
      1: "Connectionsで取得したデータは常に最新状態が返され、ttlオプションでキャッシュを有効にすることはできない。",
      2: "st.connectionで接続を作成すると、毎回新しい接続が生成され、同じ接続名でも再利用されない。",
      3: "カスタムConnectionを作成するには、st.connectionクラスを直接継承して独自メソッドを定義する必要がある。",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Streamlit Documentation - Advanced Concepts: Connections",
        url: "https://docs.streamlit.io/get-started/fundamentals/advanced-concepts#connections",
      },
      {
        title: "Streamlit API Reference - st.connection",
        url: "https://docs.streamlit.io/develop/api-reference/connections/st.connection",
      },
      {
        title: "Streamlit API Reference - st.connections.SQLConnection",
        url: "https://docs.streamlit.io/develop/api-reference/connections/st.connections.sqlconnection",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        StreamlitのConnections機能に関する次の記述のうち、
        <strong className="text-emerald-500">正しいもの</strong>
        を一つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        StreamlitのConnections APIは、外部サービスへの接続を統一的に扱い、接続設定やクエリ結果のキャッシュを簡潔に管理できるようにする仕組みです。
      </p>
      <br />
      <p className="font-semibold text-emerald-500">正しい記述（正答）:</p>
      <p>
        「Connectionの接続情報は.streamlit/secrets.tomlの[connections.your_connection_name]セクションから読み込まれる。」が正しい選択肢です。ドキュメントでは、接続名をキーとしてsecrets.tomlに資格情報を配置し、st.connection(&quot;your_connection_name&quot;)で利用すると説明されています。
      </p>
      <br />
      <p className="font-semibold text-red-500">その他の選択肢が誤りである理由:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          ttlパラメータはconnection.query(..., ttl=600)のように指定でき、デフォルトでキャッシュを使用し、0を渡すことでキャッシュを無効化できます。「常に最新状態のみ返され、キャッシュを有効にできない」という説明は誤りです。
        </li>
        <li>
          st.connectionは内部的にst.cache_resourceで接続オブジェクトを共有し、同一の接続名で呼び出すと再利用します。再接続のコストを抑えるための仕組みなので、「毎回新しい接続が生成される」は誤りです。
        </li>
        <li>
          カスタムConnectionを作成する場合はBaseConnectionを継承して_connectや独自のメソッドを実装します。st.connectionはファクトリー関数であり、継承対象ではありません。
        </li>
      </ul>
    </div>
  );
}
