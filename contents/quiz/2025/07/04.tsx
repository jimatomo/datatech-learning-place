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
    created_at: new Date("2025-06-27"),
    updated_at: new Date("2025-06-27"),

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
      { title: "Streamlit Documentation", url: "https://docs.streamlit.io/" },
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
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
        <p className="text-sm text-blue-800">
          💡 <strong>ヒント：</strong> st.write()は汎用的な出力関数で、Magicは変数を直接書くだけで出力される便利な機能です。
        </p>
      </div>
    </div>
  );
}

function QuizExplanation() {
  const basicWriteExample = `
import streamlit as st
import pandas as pd

# ✅ st.write() の基本的な使い方

# 文字列の出力
st.write("Hello, Streamlit!")

# 複数の引数を同時に出力
st.write("現在の合計:", 100, "円")

# データフレームの出力
df = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})
st.write(df)

# Markdownの出力
st.write("**太字**と*斜体*のテキスト")

# 図表の出力
import matplotlib.pyplot as plt
fig, ax = plt.subplots()
ax.plot([1, 2, 3], [1, 4, 9])
st.write(fig)
  `.trim();

  const basicMagicExample = `
import streamlit as st
import pandas as pd

# ✅ Magic の基本的な使い方

# 変数をそのまま書くだけで出力
name = "Streamlit"
name  # これだけで出力される

# 式の結果も出力
2 + 3  # 結果：5

# データフレームも出力
df = pd.DataFrame({"X": [1, 2, 3], "Y": [10, 20, 30]})
df  # テーブルとして表示

# Markdown文字列も自動レンダリング
"## タイトル"  # H2タグとして表示
"**重要な情報**"  # 太字で表示

# 複雑な式も可能
[i**2 for i in range(5)]  # リスト内包表記の結果を表示
  `.trim();

  const comparisonExample = `
import streamlit as st
import pandas as pd

# ✅ st.write() と Magic の比較

# データフレームの出力
df = pd.DataFrame({"商品": ["A", "B", "C"], "価格": [100, 200, 300]})

# 方法1: st.write()
st.write("商品一覧")
st.write(df)

# 方法2: Magic
"商品一覧"  # 自動的にMarkdownとしてレンダリング
df  # 自動的にテーブルとして表示

# 複数の値を同時に出力
# st.write(): 可能
st.write("合計:", df["価格"].sum(), "円")

# Magic: 一度に1つのみ
total = df["価格"].sum()
f"合計: {total} 円"  # f-stringを使用

# 複雑なオブジェクトの出力
import matplotlib.pyplot as plt
fig, ax = plt.subplots()
ax.bar(df["商品"], df["価格"])

# どちらも図表を出力可能
st.write(fig)
# fig  # Magicでも可能
  `.trim();

  const bestPracticesExample = `
import streamlit as st
import pandas as pd

# ✅ 使い分けのベストプラクティス

# 1. 簡単な値の確認 → Magic
debug_value = 42
debug_value  # デバッグ時の値確認

# 2. 複数の値をまとめて出力 → st.write()
st.write("ユーザー:", "田中", "年齢:", 25, "歳")

# 3. 条件付き出力 → st.write()
if st.checkbox("詳細を表示"):
    st.write("詳細な情報をここに表示")

# 4. レイアウトとの組み合わせ → st.write()
col1, col2 = st.columns(2)
with col1:
    st.write("左列の内容")
with col2:
    st.write("右列の内容")

# 5. 動的なMarkdown → Magic
section_title = "## 動的なセクション"
section_title  # 変数からMarkdownを生成

# 6. データ探索 → Magic（簡潔）
df = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})
df.describe()  # 統計情報を素早く確認
df.head()      # 最初の数行を確認

# 7. エラーハンドリング → st.write()
try:
    result = 10 / 0
except ZeroDivisionError as e:
    st.write("エラーが発生しました:", str(e))
  `.trim();

  const performanceExample = `
import streamlit as st
import pandas as pd
import time

# ✅ パフォーマンスに関する注意点

# Magic は内部的に st.write() を呼び出している
# そのため、パフォーマンスの差はほとんどない

# 大量のデータの場合
large_df = pd.DataFrame({"A": range(1000), "B": range(1000, 2000)})

# どちらも同じ処理時間
start = time.time()
st.write(large_df)
print(f"st.write(): {time.time() - start:.3f}秒")

start = time.time()
# large_df  # Magic
print(f"Magic: {time.time() - start:.3f}秒")

# 注意：頻繁な出力は避ける
# ❌ 避けるべき：ループ内での大量出力
for i in range(100):
    st.write(f"処理中: {i}")  # 重い処理

# ✅ 推奨：まとめて出力
results = [f"処理完了: {i}" for i in range(100)]
st.write("\\n".join(results))
  `.trim();

  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-green-500">正解の解説：</p>
      
      <div className="mb-4">
        <p className="font-semibold text-blue-600">選択肢 0 ✅ 正しい：st.write() の汎用性</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>文字列：</strong> プレーンテキストやMarkdown形式</li>
          <li><strong>データフレーム：</strong> pandas DataFrameを自動でテーブル表示</li>
          <li><strong>図表：</strong> matplotlib、plotly、altairなどの図表</li>
          <li><strong>その他：</strong> JSON、辞書、リスト、NumPy配列など</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-red-600">選択肢 1 ❌ 間違い：Magicの速度</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>実際：</strong> MagicはIntellisenseでst.write()を呼び出している</li>
          <li><strong>パフォーマンス：</strong> 速度的な差はほとんどない</li>
          <li><strong>利点：</strong> 簡潔性とコードの可読性</li>
          <li><strong>用途：</strong> 探索的データ分析やデバッグに便利</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-blue-600">選択肢 2 ✅ 正しい：引数の数の違い</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>st.write()：</strong> 複数の引数を順次出力可能</li>
          <li><strong>Magic：</strong> 一度に1つの変数または式のみ</li>
          <li><strong>例：</strong> st.write("名前:", name, "年齢:", age)</li>
          <li><strong>Magic代替：</strong> f-stringやformat()で文字列結合</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-blue-600">選択肢 3 ✅ 正しい：MagicでのMarkdown自動レンダリング</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>自動判定：</strong> 文字列がMarkdown形式かを自動判定</li>
          <li><strong>レンダリング：</strong> **太字**、*斜体*、# タイトルなど</li>
          <li><strong>便利さ：</strong> st.markdown()を明示的に呼ぶ必要がない</li>
          <li><strong>注意：</strong> プレーンテキストとして出力したい場合はst.text()を使用</li>
        </ul>
      </div>

      <p className="pt-4 font-semibold">st.write() の基本的な使い方：</p>
      <CodeBlock code={basicWriteExample} />

      <p className="pt-4 font-semibold">Magic の基本的な使い方：</p>
      <CodeBlock code={basicMagicExample} />

      <p className="pt-4 font-semibold">st.write() と Magic の比較：</p>
      <CodeBlock code={comparisonExample} />

      <p className="pt-4 font-semibold">使い分けのベストプラクティス：</p>
      <CodeBlock code={bestPracticesExample} />

      <p className="pt-4 font-semibold">パフォーマンスに関する注意点：</p>
      <CodeBlock code={performanceExample} />

      <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mt-4">
        <p className="text-sm text-orange-800">
          <strong>⚠️ よくある間違い：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-orange-700">
          <li><strong>過度なMagic使用：</strong> 本番アプリでは明示的なst.write()が推奨</li>
          <li><strong>ループ内での大量出力：</strong> パフォーマンスが低下</li>
          <li><strong>複雑なオブジェクト：</strong> 適切な専用関数（st.plotly_chart等）を使用</li>
          <li><strong>エラーハンドリング：</strong> Magicではエラー処理が困難</li>
        </ul>
      </div>

      <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mt-4">
        <p className="text-sm text-purple-800">
          <strong>🔧 便利な関数：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-purple-700">
          <li><strong>st.markdown()：</strong> Markdownの明示的な出力</li>
          <li><strong>st.text()：</strong> プレーンテキストの出力</li>
          <li><strong>st.code()：</strong> コードブロックの出力</li>
          <li><strong>st.json()：</strong> JSONの整形出力</li>
        </ul>
      </div>

      <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
        <p className="text-sm text-green-800">
          <strong>🎯 実践のポイント：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-green-700">
          <li><strong>開発時：</strong> Magicで素早くデータ確認</li>
          <li><strong>本番時：</strong> st.write()で明示的な出力</li>
          <li><strong>複数値：</strong> st.write()で一度に出力</li>
          <li><strong>単一値：</strong> Magicで簡潔に表示</li>
        </ul>
      </div>
    </div>
  );
}