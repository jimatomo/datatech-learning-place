import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Application", "Streamlit", "streamlit"],
    created_at: new Date("2025-06-06"),
    updated_at: new Date("2025-06-06"),
    title: "Streamlitでカレンダーから日付をピックアップする方法",
    question_jsx: <QuizQuestion />,
    options: {
      0: "st.date_input()",
      1: "st.calendar_input()",
      2: "st.date_selector()",
      3: "st.datepicker()",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "st.date_input - Streamlit Docs", url: "https://docs.streamlit.io/library/api-reference/widgets/st.date_input" },
    ],
  });

  return quiz;
}

function QuizQuestion(): JSX.Element {
  const questionCode = `
import streamlit as st
from datetime import date

# ??? を埋めて、カレンダーから日付を選択するウィジェットを実装してください
selected_date = st.???("日付を選択", date(2025, 6, 6))

st.write("選択した日付:", selected_date)
`;
  return (
    <div>
      <p className="pb-2">
        Streamlitアプリケーションで、ユーザーがカレンダーUIを通じて特定の日付を選択できるようにしたいと考えています。以下のPythonコードの <code>???</code> に入る適切なStreamlit関数はどれでしょうか。
      </p>
      <CodeBlock code={questionCode.trim()} />
    </div>
  );
}

function QuizExplanation(): JSX.Element {
  const correctCode = `
import streamlit as st
from datetime import date

# st.date_inputを使用して日付選択ウィジェットを表示
# 第1引数はラベル、valueで初期値を設定
selected_date = st.date_input("日付を選択", date(2025, 6, 6))

st.write("選択した日付:", selected_date)
# 出力 (ユーザーが2024年8月1日を選択した場合):
# 選択した日付: 2024-08-01
`;

  const rangeCode = `
import streamlit as st
from datetime import date, timedelta

# valueにタプルを渡すことで日付範囲を選択できる
# デフォルトで今日から7日前の範囲を選択
start_date = date.today() - timedelta(days=7)
end_date = date.today()
selected_range = st.date_input(
    "日付範囲を選択",
    (start_date, end_date)
)

if len(selected_range) == 2:
    st.write("選択した範囲:", selected_range[0], "〜", selected_range[1])
`;

  return (
    <div className="text-xs md:text-sm">
      <p>
        Streamlitでカレンダーから日付を選択する機能を提供するには、<code>st.date_input()</code> 関数を使用します。この関数は、ユーザーが直感的に日付を選べるカレンダーウィジェットを表示します。
      </p>

      <p className="py-2 font-semibold">各選択肢の解説：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong className="text-emerald-500"><code>st.date_input()</code>：これが正解です。</strong>
          この関数は、日付入力用のウィジェットを生成します。第一引数にウィジェットのラベルを、<code>value</code>引数にデフォルトで表示される日付を指定できます。<code>value</code>に<code>datetime.date</code>オブジェクトのタプルを渡すと、日付範囲を選択することも可能です。
          <CodeBlock code={correctCode.trim()} />
        </li>
        <li className="pt-2">
          <code>st.calendar_input()</code>：これは誤りです。Streamlitには<code>st.calendar_input</code>という名前の関数は存在しません。日付関連の入力は<code>st.date_input</code>に統一されています。
        </li>
        <li className="pt-2">
          <code>st.date_selector()</code>：これも誤りです。<code>st.date_selector</code>という関数はStreamlitの標準APIにはありません。
        </li>
        <li className="pt-2">
          <code>st.datepicker()</code>：これも誤りです。多くのUIフレームワークでは<code>datepicker</code>という名前が使われますが、Streamlitでは<code>date_input</code>という命名規則になっています。
        </li>
      </ul>

      <p className="pt-4">
        <strong>補足：</strong>
        <br />
        <code>st.date_input</code>は非常に柔軟で、単一の日付選択だけでなく、以下のようにタプルを渡すことで日付の範囲選択もサポートしています。これにより、レポートの期間指定など、より複雑なユースケースにも対応できます。
      </p>
      <CodeBlock code={rangeCode.trim()} />
    </div>
  );
} 