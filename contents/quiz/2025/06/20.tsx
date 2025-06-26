import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Python", "PEP8", "Code Style", "Best Practices", "Coding Standards"],
    created_at: new Date("2025-06-20"),
    updated_at: new Date("2025-06-20"),

    // ----- quiz -----
    title: "PEP8 基本ルール総合 - Pythonコーディングガイドライン",
    question_jsx: <QuizQuestion />,
    options: {
      0: "インデントは1レベルにつき4スペースを使用し、1行の最大文字数は79文字とする",
      1: "変数名は user_name のようにsnake_caseで記述し、クラス名は HTTPServerError のようにCapWordsで記述する",
      2: "インデントにはタブ文字を推奨し、1行の最大文字数は100文字とする",
    },
    answers: [0, 1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "PEP 8 – Style Guide for Python Code", url: "https://peps.python.org/pep-0008/" },
      { title: "PEP8 日本語版", url: "https://pep8-ja.readthedocs.io/ja/latest/" },
      { title: "pep8.org (Stylized)", url: "https://pep8.org/" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        以下のPEP8（Python Enhancement Proposal 8）に関する記述のうち、
        <strong className="text-emerald-500">正しいもの</strong>を
        すべて選択してください。
      </p>
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
        <p className="text-sm text-yellow-800">
          💡 <strong>ヒント：</strong> PEP8は「コードは書かれるよりもはるかに多く読まれる」という理念に基づいています。
        </p>
      </div>
    </div>
  );
}

function QuizExplanation() {
  const correctIndentExample = `
# ✅ 正しい：4スペースのインデント、79文字以内
def calculate_total(price, tax_rate):
    """商品の税込価格を計算する関数"""
    if price < 0:
        raise ValueError("価格は0以上である必要があります")
    
    tax_amount = price * tax_rate
    total_price = price + tax_amount
    return total_price
  `.trim();

  const correctNamingExample = `
# ✅ 正しい命名規則の例

# 変数名：snake_case（小文字 + アンダースコア）
user_name = "田中太郎"
total_price = 1080
is_active = True

# クラス名：CapWords（各単語の最初が大文字）
class UserManager:
    pass

class HTTPServerError(Exception):
    """HTTP サーバーエラー（略語は全て大文字）"""
    pass

# 定数：UPPER_CASE_WITH_UNDERSCORES
MAX_RETRY_COUNT = 3
API_BASE_URL = "https://api.example.com"
  `.trim();

  const incorrectExample = `
# ❌ 間違った例

# インデントにタブを使用（推奨されない）
def bad_function():
	if True:  # タブ文字を使用
		print("これは推奨されません")

# 行の長さが長すぎる（100文字超）
very_long_function_call_that_exceeds_the_recommended_line_length_limit_of_seventy_nine_characters_per_line()

# 変数名にcamelCaseを使用（Pythonでは非推奨）
userName = "田中太郎"  # ❌ snake_caseを使用すべき
isActive = True       # ❌ is_activeとすべき
  `.trim();

  const formattingExample = `
# ✅ PEP8準拠の書き方

# 演算子の前後にスペース
result = x + y * z
is_equal = (a == b)

# 関数引数の書き方
def func(arg1, arg2=None):  # デフォルト値の=前後にスペースなし
    pass

# インポート文の順序
import os          # 1. 標準ライブラリ
import sys

import requests    # 2. サードパーティライブラリ
import numpy as np

from myapp import utils  # 3. ローカルアプリケーション

# コメントの書き方
x = x + 1  # インクリメント（2スペース + # + 1スペース）
  `.trim();

  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-green-500">正解の解説：</p>
      
      <div className="mb-4">
        <p className="font-semibold text-blue-600">選択肢 0 ✅ 正しい：インデントと行長の基本ルール</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>インデント：</strong> 1レベルにつき4スペースを使用（タブではなくスペース）</li>
          <li><strong>行の長さ：</strong> 最大79文字（コメント・docstringは72文字）</li>
          <li><strong>理由：</strong> 複数ファイルを並べて表示する際の可読性向上</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-blue-600">選択肢 1 ✅ 正しい：命名規則</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>変数・関数名：</strong> snake_case（小文字 + アンダースコア）</li>
          <li><strong>クラス名：</strong> CapWords（各単語の最初が大文字）</li>
          <li><strong>定数：</strong> UPPER_CASE_WITH_UNDERSCORES</li>
          <li><strong>略語：</strong> HTTPServerError のように全て大文字</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-red-600">選択肢 2 ❌ 間違い：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>インデント：</strong> スペース推奨（タブとスペースの混在は禁止）</li>
          <li><strong>行の長さ：</strong> 79文字が基本（100文字ではない）</li>
          <li><strong>例外：</strong> チーム合意があれば99文字まで延長可能</li>
        </ul>
      </div>

      <p className="pt-4 font-semibold">正しいインデントと行長の例：</p>
      <CodeBlock code={correctIndentExample} />

      <p className="pt-4 font-semibold">正しい命名規則の例：</p>
      <CodeBlock code={correctNamingExample} />

      <p className="pt-4 font-semibold">間違った書き方の例：</p>
      <CodeBlock code={incorrectExample} />

      <p className="pt-4 font-semibold">その他のPEP8ルール：</p>
      <CodeBlock code={formattingExample} />

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
        <p className="text-sm text-blue-800">
          <strong>💡 重要なポイント：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-blue-700">
          <li>PEP8の目的は<strong>コードの可読性向上</strong></li>
          <li>一貫性が最も重要（プロジェクト内 &gt; PEP8ルール）</li>
          <li>flake8、black、ruffなどのツールで自動チェック可能</li>
          <li>後方互換性を壊してまでPEP8に準拠する必要はない</li>
        </ul>
      </div>

      <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
        <p className="text-sm text-green-800">
          <strong>🎯 実践のコツ：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-green-700">
          <li><strong>エディタ設定：</strong> 4スペース、79文字ライン表示</li>
          <li><strong>自動化：</strong> pre-commitフックでlinter実行</li>
          <li><strong>チーム合意：</strong> プロジェクト固有のルールを文書化</li>
          <li><strong>段階的導入：</strong> 既存コードは少しずつ改善</li>
        </ul>
      </div>
    </div>
  );
}