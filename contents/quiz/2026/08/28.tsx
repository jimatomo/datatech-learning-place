import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Streamlit", "Python", "Security", "Data Application"],
    created_at: new Date("2026-08-28"),
    updated_at: new Date("2026-08-28"),

    title: "Streamlitのst.secretsによるシークレット管理",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ローカルでは ~/.streamlit/secrets.toml（グローバル）と、起動ディレクトリの .streamlit/secrets.toml（プロジェクト）をTOMLで置く。",
      1: "両方ある場合、プロジェクト側の値がグローバル側を上書きする。secrets.toml は .gitignore に入れる。",
      2: "st.secrets の辞書（および属性）で参照できる。ルート直下のキーは環境変数としても見える。",
      3: "TOMLのセクション内の値も、ルート直下と同じく自動で環境変数になる。Community Cloudではリポジトリのtomlだけで足り、コンソール設定は不要である。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Streamlit Docs - Secrets management",
        url: "https://docs.streamlit.io/develop/concepts/connections/secrets-management",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Streamlitのシークレット管理（<code>st.secrets</code>）について、
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
        Streamlitは資格情報をリポジトリに置かない前提で、TOMLベースのネイティブシークレットを用意しています。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          セクション（例: <code>[db_credentials]</code>）の中身は環境変数になりません。
          <code>st.secrets.db_credentials</code> としてまとめて渡します。
          Community Cloudではコンソール側にも同じシークレットを設定します。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>グローバルとプロジェクトの2箇所に置け、プロジェクトが優先されます。</li>
        <li>コミットしないよう <code>.gitignore</code> が必須です。</li>
        <li>ルート直下のキーは <code>st.secrets[&quot;key&quot;]</code> と環境変数の両方から読めます。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        接続情報はセクションにまとめ、<code>connect(**st.secrets.db_credentials)</code> のように渡す。
        ローカルのtomlとデプロイ先のシークレット画面は別物なので、片方だけ直して動かない事故を避ける。
      </p>
    </div>
  );
}
