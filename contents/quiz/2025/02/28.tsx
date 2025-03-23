import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Python", "Streamlit", "Data Application"],
    created_at: new Date("2025-02-28"),
    updated_at: new Date("2025-02-28"),

    // ----- quiz -----
    title: "Streamlitでのdataframeの表示とカスタマイズ",
    question_jsx: <QuizQuestion />,
    options: { 
      0: `st.dataframe(df, column_config={"age": st.column_config.NumberColumn("年齢", format="%d歳")}, hide_index=True)`,
      1: `st.dataframe(df.style.highlight_max(axis=0), hide_index=True)`,
      2: `st.dataframe(df, column_order=["name", "age", "state"], selection_mode="multi-row", on_select=st.write)`,
      3: `st.dataframe(df, column_config={"age": {"display_name": "年齢", "format": "{} 歳"}}, hide_index=True)`
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Streamlit Documentation - st.dataframe", url: "https://docs.streamlit.io/develop/api-reference/data/st.dataframe" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        以下のようなDataFrameがあります：
      </p>
      <CodeBlock
        code={`      name   age state  point
0    Alice   24    NY     64
1      Bob   42    CA     92
2  Charlie   18    CA     70
3     Dave   68    TX     70
4    Ellen   24    CA     88
5    Frank   30    NY     57`}
      />
      <p className="py-4">
        このDataFrame（dfとして実体化しているとします）をStreamlitアプリで表示する際、以下の条件を満たすコードはどれですか？
      </p>
      <ul className="text-left">
        <li>・インデックス列を非表示にする</li>
        <li>・「age」列の表示名を「年齢」に変更し、値の後ろに「歳」を付ける</li>
      </ul>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Streamlitでのデータフレーム表示とカスタマイズのポイントは以下の通りです：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-2">
          インデックス列を非表示にするには、<code>hide_index=True</code>を指定します
        </li>
        <li className="pb-2">
          列の表示名や書式を変更するには、<code>column_config</code>パラメータを使用します
        </li>
        <li className="pb-2">
          数値列のフォーマットを指定するには、<code>st.column_config.NumberColumn</code>を使用し、<code>format</code>パラメータで書式を指定できます
        </li>
        <li className="pb-2">
          <code>width</code>と<code>use_container_width=True</code>を同時に指定すると、<code>width</code>は無視され、親コンテナの幅が優先されます
        </li>
      </ul>
      <p className="pb-2">
        正解のコードでは、<code>hide_index=True</code>でインデックスを非表示にし、<code>column_config</code>で「age」列の表示名を「年齢」に変更し、<code>format=&quot;%d歳&quot;</code>で値の後ろに「歳」を付けています。
      </p>
      <p className="pb-2">
        他の選択肢について：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-2">
          df.style.hightlight_max ... は、Pandas Stylerを使用して最大値をハイライト表示していますが、列名の変更や書式設定はしていません
        </li>
        <li className="pb-2">
          df, column_order ... は、列の順序を指定し、行選択モードを有効にしていますが、インデックスの非表示や列名の変更はしていません
        </li>
        <li className="pb-2">
          df, column_config ... は、一見正解に見えますが、書式指定の方法が間違っています。Streamlitでは数値のフォーマットには<code>st.column_config.NumberColumn</code>を使用する必要があり、単純な辞書形式では正しく動作しません
        </li>
      </ul>
    </div>
  );
} 

