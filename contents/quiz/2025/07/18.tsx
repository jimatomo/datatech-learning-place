import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Python", "os.path", "pathlib", "ファイル操作"],
    created_at: new Date("2025-07-18"),
    updated_at: new Date("2025-07-18"),

    // ----- quiz -----
    title: "Python の os.path と pathlib モジュール",
    question_jsx: <QuizQuestion />,
    options: {
      0: "os.path は Python 2 から存在する古いモジュールで、関数ベースのアプローチを採用している",
      1: "pathlib は Python 3.4 で導入された比較的新しいモジュールで、オブジェクト指向のアプローチを採用している",
      2: "pathlib では / 演算子を使用してパスを結合でき、より直感的なコードを書ける",
      3: "os.path と pathlib は完全に互換性があり、どちらを使っても同じ結果が得られる",
    },
    answers: [0, 1, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Python os.path vs pathlib: どちらを使うべきか", url: "https://qiita.com/Tadataka_Takahashi/items/9d6eab971afbf9415ed1" },
      { title: "pathlib — Object-oriented filesystem paths", url: "https://docs.python.org/3/library/pathlib.html" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        以下のPythonの<code>os.path</code>と<code>pathlib</code>モジュールに関する記述のうち、
        <strong className="text-emerald-500">正しいもの</strong>を
        すべて選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  const codeExample = `
# os.path の例
import os
path = os.path.join('folder', 'file.txt')
dirname = os.path.dirname(path)
basename = os.path.basename(path)

print(f"Path: {path}")
print(f"Directory: {dirname}")
print(f"Filename: {basename}")

# pathlib の例
from pathlib import Path
path = Path('folder') / 'file.txt'
dirname = path.parent
basename = path.name

print(f"Path: {path}")
print(f"Directory: {dirname}")
print(f"Filename: {basename}")

# ファイル操作の比較
# os.path
filename = 'example.txt'
if os.path.exists(filename):
    size = os.path.getsize(filename)
    print(f"File size: {size} bytes")

# pathlib
filename = Path('example.txt')
if filename.exists():
    size = filename.stat().st_size
    print(f"File size: {size} bytes")
  `.trim();

  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-emerald-500">正解の解説：</p>
      
      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「os.path は Python 2 から存在する古いモジュールで、関数ベースのアプローチを採用している」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>歴史：</strong> Python 2 から存在する伝統的なモジュール</li>
          <li><strong>アプローチ：</strong> 関数ベースのアプローチを採用</li>
          <li><strong>特徴：</strong> 文字列としてパスを扱い、関数で操作</li>
          <li><strong>例：</strong> os.path.join()、os.path.dirname()、os.path.basename()</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「pathlib は Python 3.4 で導入された比較的新しいモジュールで、オブジェクト指向のアプローチを採用している」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>導入：</strong> Python 3.4 で PEP 428 として導入</li>
          <li><strong>アプローチ：</strong> オブジェクト指向のアプローチを採用</li>
          <li><strong>特徴：</strong> Path オブジェクトとしてパスを扱う</li>
          <li><strong>利点：</strong> より直感的で読みやすいコード</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「pathlib では / 演算子を使用してパスを結合でき、より直感的なコードを書ける」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>演算子：</strong> / 演算子でパス結合が可能</li>
          <li><strong>直感性：</strong> 数学的な記法でパスを表現</li>
          <li><strong>例：</strong> Path('folder') / 'file.txt'</li>
          <li><strong>利点：</strong> 文字列連結よりも読みやすい</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-red-500">「os.path と pathlib は完全に互換性があり、どちらを使っても同じ結果が得られる」❌ 間違い：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>互換性：</strong> 完全な互換性はない</li>
          <li><strong>戻り値：</strong> os.path は文字列、pathlib は Path オブジェクト</li>
          <li><strong>メソッド：</strong> 利用可能なメソッドが異なる</li>
          <li><strong>変換：</strong> str() や Path() で変換が必要な場合がある</li>
        </ul>
      </div>

      <p className="pt-4 font-semibold">コード例：</p>
      <CodeBlock code={codeExample} />

      <div className="bg-green-50 border-l-4 border-emerald-500 p-4 mt-4">
        <p className="text-sm">
          <strong>🎯 まとめ：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-green-700">
          <li><strong>os.path：</strong> 古くからある関数ベースのアプローチ</li>
          <li><strong>pathlib：</strong> 新しいオブジェクト指向アプローチ</li>
          <li><strong>推奨：</strong> 新しいプロジェクトでは pathlib の使用を推奨</li>
          <li><strong>選択基準：</strong> プロジェクト要件と一貫性を考慮</li>
        </ul>
      </div>
    </div>
  );
}