import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Streamlit", "Python", "Security", "Data Application"],
    created_at: new Date("2026-07-24"),
    updated_at: new Date("2026-07-24"),

    title: "st.connectionの設定優先順位と接続の再利用",
    question_jsx: <QuizQuestion />,
    options: {
      0: "接続設定は、コマンド引数のkwargs、secrets.toml、接続固有の設定ファイルから合成される。",
      1: "st.connectionが返す接続オブジェクトは内部でst.cache_resourceによりキャッシュされ、同じ名前なら再利用される。",
      2: "kwargsで渡した接続固有の値は、通常secrets.tomlの同名キーより優先される。",
      3: "type が snowflake-callers-rights の接続はローカル開発でも常に利用でき、Snowpark Container Services以外でも例外なく動作する。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Streamlit API Reference - st.connection",
        url: "https://docs.streamlit.io/develop/api-reference/connections/st.connection",
      },
      {
        title: "Streamlit Docs - Connecting to data",
        url: "https://docs.streamlit.io/develop/concepts/connections/connecting-to-data",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Streamlitの<code>st.connection</code>について、
        <strong className="text-red-600">誤っているもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Connections APIは、シークレット管理と接続オブジェクトの再利用をまとめて扱う入口です。
        以前の基礎クイズ（secrets.tomlのセクション）に加え、優先順位と実行環境の制約を押さえると事故が減ります。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <code>snowflake-callers-rights</code>はSnowflakeのSnowpark Container Services上での利用が前提です。
          ローカルでは例外になるため、環境変数などで<code>snowflake</code>接続へ切り替えるのが定石です。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>設定は複数ソースから合成され、kwargsがsecretsより優先されるのが典型です。</li>
        <li>接続は<code>st.cache_resource</code>で共有され、再接続コストを抑えます。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        アプリ共通の資格情報はsecrets、一時的な上書きやローカル差分はkwargs、
        閲覧者の権限で動かすSnowflake接続はSPCS前提、とレイヤを分けると開発と本番の切り替えが安全になります。
      </p>
    </div>
  );
}
