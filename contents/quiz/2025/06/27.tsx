import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Application", "Python"],
    created_at: new Date("2025-06-27"),
    updated_at: new Date("2025-06-27"),

    // ----- quiz -----
    title: "PEP8 実践ルール - インポート文・コメント・文字列",
    question_jsx: <QuizQuestion />,
    options: {
      0: "インポート文は標準ライブラリ → サードパーティ → ローカルの順で記述し、各グループ間は空行で区切る",
      1: "文字列リテラルには一貫してシングルクォート（'）を使用し、ダブルクォート（\"）は文字列内にシングルクォートが含まれる場合のみ使用する",
      2: "関数・クラス定義の前後には必ず3行の空行を入れ、メソッド定義の前後には2行の空行を入れる",
      3: "インラインコメントは # の前に最低2つのスペースを置き、# の後には1つのスペースを置く",
    },
    answers: [0, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "PEP 8 – Style Guide for Python Code", url: "https://peps.python.org/pep-0008/" },
      { title: "PEP8 日本語版", url: "https://pep8-ja.readthedocs.io/ja/latest/" },
      { title: "Real Python - PEP 8 Style Guide", url: "https://realpython.com/python-pep8/" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        以下のPEP8の詳細ルールに関する記述のうち、
        <strong className="text-emerald-500">正しいもの</strong>を
        すべて選択してください。
      </p>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
        <p className="text-sm text-blue-800">
          💡 <strong>ヒント：</strong> PEP8は基本ルールだけでなく、インポート文、コメント、空白行などの詳細な書き方も定義しています。
        </p>
      </div>
    </div>
  );
}

function QuizExplanation() {
  const correctImportExample = `
# ✅ 正しいインポート文の順序と書き方

# 1. 標準ライブラリ
import os
import sys
from pathlib import Path

# 2. サードパーティライブラリ
import requests
import numpy as np
from django.http import HttpResponse

# 3. ローカルアプリケーション/ライブラリ
from myapp import settings
from myapp.models import User
from . import utils
from .models import Product
  `.trim();

  const incorrectImportExample = `
# ❌ 間違ったインポート文の例

# 順序が間違っている
import requests          # サードパーティが先に来ている
import os               # 標準ライブラリが後
from myapp import utils # ローカルが間に挟まっている
import numpy as np      # サードパーティが散らばっている

# 複数のインポートを1行にまとめる（避けるべき）
import os, sys, json

# 相対インポートの間違った使い方
from ..utils import helper  # OK: 相対インポート
import ..models            # NG: この書き方は不正
  `.trim();

  const correctCommentsExample = `
# ✅ 正しいコメントの書き方

# ブロックコメント：行の最初から記述
# 複数行の場合も各行に # を記述
def calculate_tax(price):
    """関数のdocstring"""
    # 内部のブロックコメント
    # 同じレベルでインデント
    tax_rate = 0.1
    
    return price * tax_rate

# インラインコメント：2スペース + # + 1スペース
x = x + 1  # カウンターをインクリメント
y = y * 2  # 値を2倍にする

# 長い行のコメント
result = some_long_function_name(
    argument1, argument2, argument3
)  # 複雑な計算の結果を取得
  `.trim();

  const incorrectCommentsExample = `
# ❌ 間違ったコメントの例

x = x + 1# スペースが不足
y = y + 1 #スペースが不足（#の後）
z = z + 1    #スペースが多すぎる（4つ以上）

# 不要なコメント（自明な内容）
x = 5  # xに5を代入

# コメントが長すぎる（79文字を超える）
result = calculate()  # この計算は非常に複雑で、多くのパラメータを考慮して最適な結果を導き出すために作られた関数です
  `.trim();

  const blankLinesExample = `
# ✅ 正しい空白行の使い方

import os
import sys

# 定数定義（インポートから2行空ける）
DEFAULT_TIMEOUT = 30


# トップレベルの関数・クラス定義の前は2行空ける
class UserManager:
    """ユーザー管理クラス"""
    
    def __init__(self):
        self.users = []
    
    # メソッド間は1行空ける
    def add_user(self, user):
        """ユーザーを追加"""
        self.users.append(user)
    
    def remove_user(self, user_id):
        """ユーザーを削除"""
        self.users = [u for u in self.users if u.id != user_id]


# 別のクラス（前のクラスから2行空ける）
class ProductManager:
    """商品管理クラス"""
    pass


# 関数定義（前のクラスから2行空ける）
def main():
    """メイン関数"""
    manager = UserManager()
    return manager
  `.trim();

  const quotesExample = `
# ✅ 文字列クォートの使い方

# 基本的にはシングルクォートを使用
message = 'Hello, World!'
name = 'Python'

# 文字列内にシングルクォートがある場合はダブルクォート
sentence = "Don't worry, be happy!"
quote = "He said 'Hello' to me."

# 文字列内にダブルクォートがある場合はシングルクォート
html = '<div class="container">Content</div>'

# トリプルクォート：docstringには一貫してダブルクォート
def function():
    """
    関数の説明をここに記述します。
    複数行になる場合も同様です。
    """
    pass

# 長い文字列の場合
long_text = (
    'This is a very long string that needs to be split '
    'across multiple lines for better readability.'
)
  `.trim();

  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-green-500">正解の解説：</p>
      
      <div className="mb-4">
        <p className="font-semibold text-blue-600">選択肢 0 ✅ 正しい：インポート文の順序</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>順序：</strong> 標準ライブラリ → サードパーティ → ローカル</li>
          <li><strong>区切り：</strong> 各グループ間は1行の空行で区切る</li>
          <li><strong>内部順序：</strong> 各グループ内ではアルファベット順</li>
          <li><strong>絶対インポート推奨：</strong> 相対インポートより明示的</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-red-600">選択肢 1 ❌ 間違い：文字列クォートの規則</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>実際のルール：</strong> シングル・ダブルどちらでも良いが一貫性を保つ</li>
          <li><strong>一般的：</strong> 多くのPythonプロジェクトでシングルクォートを好む</li>
          <li><strong>例外処理：</strong> 文字列内にクォートが含まれる場合は適切に選択</li>
          <li><strong>docstring：</strong> 三重ダブルクォート（&quot;&quot;&quot;）を使用</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-red-600">選択肢 2 ❌ 間違い：空白行の規則</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>正しいルール：</strong> トップレベル関数・クラス定義前後は<strong>2行</strong></li>
          <li><strong>メソッド定義：</strong> クラス内メソッド間は<strong>1行</strong></li>
          <li><strong>論理的セクション：</strong> 必要に応じて関数内で1行の空行</li>
          <li><strong>ファイル末尾：</strong> 1つの改行文字で終了</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-blue-600">選択肢 3 ✅ 正しい：インラインコメントの書き方</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>形式：</strong> コード + 最低2スペース + # + 1スペース + コメント</li>
          <li><strong>使用場面：</strong> 簡潔で必要な場合のみ（自明な内容は避ける）</li>
          <li><strong>行の長さ：</strong> コメント込みで79文字以内</li>
          <li><strong>ブロックコメント：</strong> 複数行の説明には # で始まる独立した行</li>
        </ul>
      </div>

      <p className="pt-4 font-semibold">正しいインポート文の書き方：</p>
      <CodeBlock code={correctImportExample} />

      <p className="pt-4 font-semibold">間違ったインポート文の例：</p>
      <CodeBlock code={incorrectImportExample} />

      <p className="pt-4 font-semibold">正しいコメントの書き方：</p>
      <CodeBlock code={correctCommentsExample} />

      <p className="pt-4 font-semibold">間違ったコメントの例：</p>
      <CodeBlock code={incorrectCommentsExample} />

      <p className="pt-4 font-semibold">正しい空白行の使い方：</p>
      <CodeBlock code={blankLinesExample} />

      <p className="pt-4 font-semibold">文字列クォートの適切な使い方：</p>
      <CodeBlock code={quotesExample} />

      <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mt-4">
        <p className="text-sm text-orange-800">
          <strong>⚠️ よくある間違い：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-orange-700">
          <li><strong>インポート順序：</strong> サードパーティと標準ライブラリの混在</li>
          <li><strong>過度なコメント：</strong> 自明なコードへの不要なコメント</li>
          <li><strong>空白行の過不足：</strong> 多すぎる・少なすぎる空白行</li>
          <li><strong>一行インポート：</strong> import os, sys のような書き方</li>
        </ul>
      </div>

      <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mt-4">
        <p className="text-sm text-purple-800">
          <strong>🔧 便利なツール：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-purple-700">
          <li><strong>isort：</strong> インポート文の自動ソート・整理</li>
          <li><strong>black：</strong> コード全体の自動フォーマット</li>
          <li><strong>flake8：</strong> PEP8違反の検出</li>
          <li><strong>ruff：</strong> 高速なlinter（flake8 + isort + more）</li>
        </ul>
      </div>

      <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
        <p className="text-sm text-green-800">
          <strong>🎯 実践のポイント：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-green-700">
          <li><strong>段階的適用：</strong> 新しいコードから順次PEP8を適用</li>
          <li><strong>チーム合意：</strong> プロジェクト固有のルールを明文化</li>
          <li><strong>自動化優先：</strong> 手動チェックより自動ツールを活用</li>
          <li><strong>可読性重視：</strong> ルールより読みやすさを優先する場合もあり</li>
        </ul>
      </div>
    </div>
  );
}