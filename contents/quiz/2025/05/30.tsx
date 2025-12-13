import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Application", "Pandas"],
    created_at: new Date("2025-05-30"),
    updated_at: new Date("2025-05-30"),
    title: "pandas DataFrameのdescribe()メソッドのデフォルト動作",
    question_jsx: <QuizQuestion />,
    options: {
      0: "数値列とオブジェクト型列（文字列型など）の両方の統計量を出力する",
      1: "数値列の統計量のみを出力する",
      2: "オブジェクト型列（文字列型など）の統計量のみを出力する",
      3: "全ての列のデータ型と非null値の数を出力する",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "pandas.DataFrame.describe — pandas 2.2.2 documentation", url: "https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.describe.html" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  const questionCode = `
import pandas as pd
import numpy as np

data = {
    'col_numeric': [1, 2, np.nan, 4, 5],
    'col_object': ['A', 'B', 'C', 'A', 'B'],
    'col_mixed': [1, 'X', 3.0, 'Y', 5]
}
df = pd.DataFrame(data)

# df.describe() を実行した際のデフォルトの出力は何か？
output = df.describe()
print(output)
`;
  return (
    <div>
      <p className="pb-2">
        pandasのDataFrameに対して <code>describe()</code> メソッドを引数なしで呼び出した場合、デフォルトでどのような情報が出力されるでしょうか。以下の選択肢から最も適切なものを選んでください。
      </p>
      <CodeBlock code={questionCode.trim()} />
    </div>
  );
}

function QuizExplanation() {
  const dfSetupCode = `
import pandas as pd
import numpy as np

data = {
    'col_numeric': [1, 2, np.nan, 4, 5],  # 数値列 (欠損値あり)
    'col_object': ['A', 'B', 'C', 'A', 'B'], # オブジェクト型列 (文字列)
    'col_mixed': [1, 'X', 3.0, 'Y', 5], # 混在型 (objectとして扱われる)
    'col_datetime': pd.to_datetime(['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-01', '2023-01-02']), # datetime型列
    'col_bool': [True, False, True, True, False] # bool型列
}
df = pd.DataFrame(data)
`;

  const describeDefaultCode = `
# デフォルトの動作 (数値列のみ)
print(df.describe())
# Output:
#        col_numeric
# count     4.000000
# mean      3.000000
# std       1.825742
# min       1.000000
# 25%       1.750000
# 50%       3.000000
# 75%       4.250000
# max       5.000000
`;

  const describeIncludeObjectCode = `
# オブジェクト型列を含む場合 (include=['object'])
# col_mixedもobject型として扱われるため表示されます
print(df.describe(include=['object']))
# Output:
#        col_object col_mixed
# count           5         5
# unique          3         5
# top             A         1  # top/freqはデータやpandasのバージョンにより変動しうる
# freq            2         1
`;

  const describeIncludeAllCode = `
# 全ての列の情報を得る場合 (include='all')
# col_mixed は object 型として集計される
print(df.describe(include='all'))
# Output (抜粋):
#        col_numeric col_object col_mixed
# count     4.000000          5         5
# unique         NaN          3         5
# top            NaN          A         1
# freq           NaN          2         1
# mean      3.000000        NaN       NaN
# ... (以下略)
`;

  return (
    <div className="text-xs md:text-sm">
      <p>
        pandasのDataFrameの<code>describe()</code>メソッドは、データセットの記述統計を要約するのに非常に便利な関数です。
        デフォルトでは、数値型の列に関する統計量（個数、平均、標準偏差、最小値、四分位数、最大値）を計算して表示します。
        数値と文字列が混在している列は、<code>object</code> dtypeとして扱われます。
      </p>

      <p className="py-2 font-semibold">各選択肢の解説：</p>
      <ul className="list-disc pl-6">
        <li>
          <CodeBlock code={"df.describe() # オプションなし"} showLineNumbers={false} />
          <strong className="text-emerald-500">「数値列の統計量のみを出力する」が正解です。</strong>
          <code>describe()</code>メソッドは、デフォルトでは数値データ型（int、floatなど）を持つ列のみを対象とします。
          <CodeBlock code={dfSetupCode.trim() + "\n\n" + describeDefaultCode.trim()} />
        </li>
        <li className="pt-2">
          「数値列とオブジェクト型列（文字列型など）の両方の統計量を出力する」：これは誤りです。
          両方を出力するには、<code>include=&apos;all&apos;</code>オプションを指定する必要があります。この際、<code>col_mixed</code>のような混在型列は<code>object</code>型として集計されます。
          <CodeBlock code={describeIncludeAllCode.trim()} />
        </li>
        <li className="pt-2">
          「オブジェクト型列（文字列型など）の統計量のみを出力する」：これは誤りです。
          オブジェクト型の列の統計量（個数、ユニーク数、最頻値、最頻値の出現回数）を表示するには、<code>include=[&apos;object&apos;]</code>や<code>include=&apos;O&apos;</code>のように指定する必要があります。
          このとき、<code>col_mixed</code>のような数値と文字列が混在する列も<code>object</code>型として扱われ、統計量の対象となります。
          <CodeBlock code={describeIncludeObjectCode.trim()} />
        </li>
        <li className="pt-2">
          「全ての列のデータ型と非null値の数を出力する」：これは<code>df.info()</code>メソッドの機能です。<code>describe()</code>は記述統計量を出力します。
        </li>
      </ul>

      <p className="pt-4">
        <strong>補足：</strong>
        <br />
        <code>describe()</code>メソッドの<code>include</code>および<code>exclude</code>引数を使用することで、分析対象とする列のデータ型を柔軟に制御できます。
        例えば、<code>include=[&apos;object&apos;, &apos;bool&apos;]</code>とするとオブジェクト型とブール型の列が対象となり、<code>exclude=np.number</code>とすると数値型以外の列が対象となります。
        データ型が混在している列は、多くの場合<code>object</code>型として解釈される点に注意してください。
      </p>
    </div>
  );
} 