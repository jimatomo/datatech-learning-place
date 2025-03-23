import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Python", "pandas", "Data Application"],
    created_at: new Date("2025-03-21"),
    updated_at: new Date("2025-03-21"),

    // ----- quiz -----
    title: "pandasのDataFrameからの条件付きデータ抽出",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "df[df['売上'] > 5000]",
      1: "df.loc[df.売上 > 5000]",
      2: "df.query('売上 > 5000')",
      3: "df.filter(df.売上 > 5000)",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "pandas公式ドキュメント - Indexing and selecting data", url: "https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html" },
      { title: "pandas公式ドキュメント - pandas.DataFrame.query", url: "https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.query.html" },
      { title: "pandas公式ドキュメント - pandas.DataFrame.filter", url: "https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.filter.html" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <>
      <p className="pb-4">
        以下のようなpandasのDataFrameがあるとき、「売上」が5,000以上のレコードだけを抽出するコードとして
        <span className="text-red-500">誤っているもの</span>を選んでください。
      </p>
      <CodeBlock code={`import pandas as pd

# サンプルデータ
data = {
    '商品名': ['商品A', '商品B', '商品C', '商品D', '商品E'],
    '売上': [3500, 7200, 4800, 9100, 2300],
    '部門': ['電化製品', '家具', '日用品', '電化製品', '食品']
}

df = pd.DataFrame(data)

print(df)
`}
      />
      <CodeBlock code={`  商品名    売上      部門
0 商品A    3500    電化製品
1 商品B    7200      家具
2 商品C    4800     日用品
3 商品D    9100    電化製品
4 商品E    2300      食品`}
      />
    </>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>pandasのDataFrameから条件に合うレコードを抽出する方法についての問題です。</p>
      <p className="py-2">選択肢の解説:</p>
      <ul className="list-disc pl-4">
        <li className="pt-2"><strong>df[df[&apos;売上&apos;] &gt; 5000]</strong>は正しい方法です。ブール型のインデックスを使用して条件に合う行を抽出しています。</li>
        <li className="pt-2"><strong>df.loc[df.売上 &gt; 5000]</strong>も正しい方法です。.locを使ってブール型のインデックスでフィルタリングしています。</li>
        <li className="pt-2"><strong>df.query(&apos;売上 &gt; 5000&apos;)</strong>も正しい方法です。queryメソッドを使って文字列で条件を指定しています。</li>
        <li className="pt-2"><strong>df.filter(df.売上 &gt; 5000)</strong>は誤りです。pandas DataFrameのfilterメソッドは列や行のラベルでフィルタリングするためのもので、条件式による行の抽出には使えません。正しくは上記の3つの方法のいずれかを使います。</li>
      </ul>
      <p className="py-2">
        pandasでは複数の方法でデータのフィルタリングが可能ですが、それぞれのメソッドの正しい使い方を理解することが重要です。
      </p>
    </div>
  );
} 
