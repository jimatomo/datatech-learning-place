import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Composer",
    author_url: "https://github.com/jimatomo",
    tags: ["Streamlit", "Python", "Performance", "Data Application"],
    created_at: new Date("2026-07-31"),
    updated_at: new Date("2026-07-31"),

    title: "st.cache_dataとst.cache_resourceの使い分け",
    question_jsx: <QuizQuestion />,
    options: {
      0: "st.cache_dataは戻り値をpickleでシリアライズして保存し、呼び出しごとにコピーを返すため、呼び出し側で戻り値を変更してもキャッシュ本体は影響を受けない。",
      1: "st.cache_resourceはデータベース接続やMLモデルなどシリアライズできないオブジェクトを、全ユーザー・全セッションで共有するシングルトンとして保持する。",
      2: "データベースクエリの結果（DataFrame）のキャッシュにはst.cache_dataが推奨で、ttlを設定すれば一定時間ごとに再実行させて鮮度を保てる。",
      3: "st.cache_resourceも呼び出しごとに戻り値のコピーを返すため、複数セッションから同時に変更を加えてもスレッドセーフ性を意識する必要はない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Streamlit Docs - Caching overview",
        url: "https://docs.streamlit.io/develop/concepts/architecture/caching",
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
      <p>
        Streamlitのキャッシュデコレーター<code>st.cache_data</code>と
        <code>st.cache_resource</code>について、
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
        2つのデコレーターの違いは「コピーを返すか、同じオブジェクトを共有するか」です。
        データはコピー、リソースは共有、と覚えると整理しやすいです。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          st.cache_resourceはコピーを作らず、キャッシュ内のオブジェクトそのものを返します。
          戻り値への変更はキャッシュに直接反映され、全セッションに波及します。
          そのため戻り値はスレッドセーフである必要があり、そうでないオブジェクトを
          共有するとクラッシュやデータ破損の原因になります。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>st.cache_dataはpickle経由のコピーを返すので、ミューテーションや競合に対して安全です。</li>
        <li>st.cache_resourceはDB接続やMLモデルのような重い・シリアライズ不能なオブジェクト向けです。</li>
        <li>クエリ結果のようなデータにはst.cache_dataとttlの組み合わせが定石です。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        迷ったらst.cache_dataから始めるのが公式の推奨です。st.cache_resourceを選ぶのは
        「接続・モデル・ファイルハンドルのように、ディスクに保存しないものを共有したいとき」だけに絞ると、
        共有オブジェクトの想定外の書き換えという事故を避けられます。
      </p>
    </div>
  );
}
