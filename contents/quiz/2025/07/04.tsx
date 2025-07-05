import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Streamlit", "Python", "Data Application"],
    created_at: new Date("2025-07-04"),
    updated_at: new Date("2025-07-04"),

    // ----- quiz -----
    title: "Streamlit の st.write() と Magic の使い分け",
    question_jsx: <QuizQuestion />,
    options: {
      0: "st.write() は文字列、DataFrame、図表、Markdownなど、ほぼすべてのオブジェクトを出力できる汎用関数である",
      1: "Magic は変数名や式を書くだけで自動的に出力される機能で、st.write() より高速に動作する",
      2: "st.write() は複数の引数を同時に受け取って出力できるが、Magic は一度に1つの変数しか出力できない",
      3: "Magic でMarkdown文字列を出力する際は、自動的にMarkdownとしてレンダリングされる",
    },
    answers: [0, 2, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Streamlit API Reference - st.write", url: "https://docs.streamlit.io/library/api-reference/write-magic/st.write" },
      { title: "Streamlit Magic Commands", url: "https://docs.streamlit.io/library/api-reference/write-magic/magic" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        以下のStreamlitの<code>st.write()</code>と<code>Magic</code>に関する記述のうち、
        <strong className="text-emerald-500">正しいもの</strong>を
        すべて選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  const codeExample = `
import streamlit as st
import pandas as pd

# st.write() の使い方
st.write("文字列、データフレーム、図表などを出力")
st.write("名前:", "田中", "年齢:", 25, "歳")  # 複数の引数

# Magic の使い方
name = "Streamlit"
name  # 変数をそのまま書くだけで出力

"**太字のテキスト**"  # Markdownとして自動レンダリング

df = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})
df  # DataFrameも出力（一度に1つのみ）
  `.trim();

  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-emerald-500">正解の解説：</p>
      
      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「st.write() は文字列、DataFrame、図表、Markdownなど、ほぼすべてのオブジェクトを出力できる汎用関数である」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>文字列：</strong> プレーンテキストやMarkdown形式</li>
          <li><strong>データフレーム：</strong> pandas DataFrameを自動でテーブル表示</li>
          <li><strong>図表：</strong> matplotlib、plotly、altairなどの図表</li>
          <li><strong>その他：</strong> JSON、辞書、リスト、NumPy配列など</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-red-500">「Magic は変数名や式を書くだけで自動的に出力される機能で、st.write() より高速に動作する」❌ 間違い：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>実際：</strong> MagicはIntellisenseでst.write()を呼び出している</li>
          <li className="text-red-500"><strong>パフォーマンス：</strong> 速度的な差はほとんどない</li>
          <li><strong>利点：</strong> 簡潔性とコードの可読性</li>
          <li><strong>用途：</strong> 探索的データ分析やデバッグに便利</li>
          <li><strong>注意：</strong> プレーンテキストとして出力したい場合はst.text()を使用</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「st.write() は複数の引数を同時に受け取って出力できるが、Magic は一度に1つの変数しか出力できない」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>st.write()：</strong> 複数の引数を順次出力可能</li>
          <li><strong>Magic：</strong> 一度に1つの変数または式のみ</li>
          <li><strong>例：</strong> st.write(&quot;名前:&quot;, name, &quot;年齢:&quot;, age)</li>
          <li><strong>Magic代替：</strong> f-stringやformat()で文字列結合</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「Magic でMarkdown文字列を出力する際は、自動的にMarkdownとしてレンダリングされる」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>自動判定：</strong> 文字列がMarkdown形式かを自動判定</li>
          <li><strong>レンダリング：</strong> **太字**、*斜体*、# タイトルなど</li>
          <li><strong>便利さ：</strong> st.markdown()を明示的に呼ぶ必要がない</li>
          <li><strong>注意：</strong> プレーンテキストとして出力したい場合はst.text()を使用</li>
        </ul>
      </div>

      <p className="pt-4 font-semibold">コード例：</p>
      <CodeBlock code={codeExample} />

      <div className="bg-green-50 border-l-4 border-emerald-500 p-4 mt-4">
        <p className="text-sm">
          <strong>🎯 まとめ：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-green-700">
          <li><strong>st.write()：</strong> あらゆるオブジェクトを出力可能、複数の引数も可</li>
          <li><strong>Magic：</strong> 簡潔な記述、Markdownの自動レンダリング、一度に1つのみ</li>
          <li><strong>速度：</strong> 内部的にはどちらも同じ処理のため速度差はない</li>
        </ul>
      </div>
    </div>
  );
}