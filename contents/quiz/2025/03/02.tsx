import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Datatech News", "Python", "Snowflake", "Streamlit"],
    created_at: new Date("2025-03-02"),
    updated_at: new Date("2025-03-02"),

    // ----- quiz -----
    title: "Streamlit in Snowflakeでのファイルアップロード機能について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "アップロードされたファイルは自動的にSnowflakeのステージに保存される",
      1: "アップロードされたファイルは最大200MBまでサポートされている",
      2: "st.file_uploaderはSnowflakeのテーブルに直接データを書き込むことができる",
      3: "アップロードされたCSVファイルはPandas DataFrameに変換してからSnowpark DataFrameに変換できる",
    },
    answers: [0, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Streamlit in Snowflakeでファイルのアップロードとダウンロードをしよう", url: "https://zenn.dev/tsubasa_tech/articles/a809df39f44ccd" },
      { title: "Streamlit in Snowflakeでファイルアップローダが解禁されました！", url: "https://qiita.com/ak-sakatoku/items/79bcafe5a44522ae323a" },
      { title: "st.file_uploader - Streamlit Documentation", url: "https://docs.streamlit.io/develop/api-reference/widgets/st.file_uploader" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Streamlit in Snowflakeで新たにサポートされた<code>st.file_uploader</code>機能について、<span className="text-red-500">間違っている</span>選択肢を選択してください。
      </span>
    </div>
  );
}

const sample_code_save_stage = `uploaded_file = st.file_uploader("ファイルを選択してください")

if uploaded_file:
  try:
    # BytesIOを使用してファイルストリームを作成し、アップロード
    file_stream = io.BytesIO(uploaded_file.getvalue())

    session.file.put_stream(
      file_stream,
      f"{stage_name}/{uploaded_file.name}",
      auto_compress=False,
      overwrite=True
    )
  except Exception as e:
    st.error(f"ファイルの保存に失敗しました: {e}")`

const sample_code_write_table = `uploaded_file = st.file_uploader("ファイルを選択してください")

if uploaded_file:
  try:
    # CSVファイルを読み込む
    pandas_df = pd.read_csv(uploaded_file)

    # Snowpark DataFrameに変換
    snowpark_df = session.create_dataframe(pandas_df)

    # テーブルに書き込む
    snowpark_df.write.mode("overwrite").save_as_table(table_name)
  except Exception as e:
    st.error(f"テーブルへの書き込みに失敗しました: {e}")`

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Streamlit in Snowflakeでの<code>st.file_uploader</code>機能は
        2025年2月14日にプレビューとしてリリースされました。
      </p>
      <p className="py-2">
        以下は、ファイルをステージに保存する例です：
      </p>
      <CodeBlock showLineNumbers={false} code={sample_code_save_stage} />
      <p className="py-2">
        以下は、ファイルをデータフレームに変換してテーブルに書き込む例です：
      </p>
      <CodeBlock showLineNumbers={false} code={sample_code_write_table} />      
      <p className="pt-2">
        Streamlit in Snowflakeでの<code>st.file_uploader</code>のサポートは2025年2月時点ではパブリックプレビュー段階であり、
        本番環境での使用は推奨されていません。今後機能が大幅にアップデートされる可能性があります。
      </p>
    </div>
  );
} 
