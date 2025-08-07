import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Python", "PEP8", "Imports", "Data Application"],
    created_at: new Date("2025-08-08"),
    updated_at: new Date("2025-08-08"),

    // ----- quiz -----
    title: "PEP8におけるimport文の推奨事項",
    question_jsx: <QuizQuestion />,
    options: {
      0: "同一モジュールから複数の名前を from でカンマ区切りでインポートすることは許容される",
      1: "import os, sys のように1行で複数モジュールをインポートするのが推奨される",
      2: "標準ライブラリ→サードパーティ→ローカルの順にグループ化し、各グループの間に空行を入れるのが推奨される",
      3: "可能な限り相対インポートを使うことが推奨される",
      4: "ワイルドカードインポート（from module import *）は原則として避けるべきである",
    },
    answers: [0, 2, 4],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "PEP 8 (日本語訳) - Python コードのスタイルガイド",
        url: "https://pep8-ja.readthedocs.io/ja/latest/",
      },
    ],
  });
  return quiz;
}

const codeGood = `# 良い例: 1行に1モジュール、グループごとに空行
import os
import sys

from subprocess import Popen, PIPE  # from では複数名をカンマ区切りで可

# サードパーティ
import requests

# ローカル
from . import utils
`;

const codeBad = `# 悪い例
import os, sys  # 複数モジュールを1行でインポート
from package import *  # ワイルドカードの使用
`;

function QuizQuestion() {
  return (
    <div>
      <p>PEP8の import 文に関する推奨事項として正しいものを全て選択してください。</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>以下が正解の説明です：</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong>同一モジュールから複数の名前をカンマ区切りで import するのは許容</strong>：
          PEP8は <code>from subprocess import Popen, PIPE</code> のような記法を例示しています
        </li>
        <li>
          <strong>インポートのグルーピング</strong>：標準ライブラリ、関連サードパーティ、ローカルの順にまとめ、各グループ間に空行を入れることを推奨しています
        </li>
        <li>
          <strong>ワイルドカードは避ける</strong>：<code>from module import *</code> は名前空間を不明瞭にし、ツールの解析も困難にするため原則避けます
        </li>
      </ul>
      <p>誤った選択肢について：</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <span className="text-red-600">1行に複数モジュールを import</span>：<code>import os, sys</code> のような書き方は推奨されず、1行に1モジュールが基本です
        </li>
        <li>
          <span className="text-red-600">相対インポートを優先</span>：PEP8は原則として<strong>絶対インポートを推奨</strong>しており、相対インポートはパッケージ内で必要な場合に限定して用います
        </li>
      </ul>
      <p>
        詳細は PEP 8 の「import」節を参照してください。
      </p>
      <p className="pt-4">良い例と悪い例：</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold pb-2">良い例</p>
          <CodeBlock code={codeGood} showLineNumbers={false} />
        </div>
        <div>
          <p className="font-semibold pb-2">悪い例</p>
          <CodeBlock code={codeBad} showLineNumbers={false} />
        </div>
      </div>
    </div>
  );
}


