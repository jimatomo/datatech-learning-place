import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Python", "Linter", "Ruff", "Data Application"],
    created_at: new Date("2025-09-12"),
    updated_at: new Date("2025-09-12"),

    // ----- quiz -----
    title: "Pythonリンター・フォーマッター「Ruff」の特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Rustで実装されており、非常に高速に動作する。",
      1: "Flake8やisortなど、多くの既存ツールの機能を内包している。",
      2: "設定はpyproject.tomlファイル内で管理することができる。",
      3: "Pythonで書かれたプラグインを追加して、容易に機能を拡張できる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Ruff - GitHub", url: "https://github.com/astral-sh/ruff" },
      { title: "Ruff Documentation", url: "https://docs.astral.sh/ruff/" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Pythonの高速なリンター兼フォーマッターであるRuffに関する説明として、
        <strong className="text-red-600">誤っているもの</strong>
        を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
      <p>
        「Pythonで書かれたプラグインを追加して、容易に機能を拡張できる」は誤りです。Ruffはパフォーマンスを最優先するため、Rustで実装されています。そのため、Python製のプラグインシステムはサポートしておらず、全てのルールはRuffのコア機能としてRustで直接実装されています。
      </p>
      <br />
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <b>Rust製による高速性:</b> Rustのネイティブパフォーマンスにより、既存のPython製ツールよりも10倍から100倍高速に動作すると言われています。
        </li>
        <li>
          <b>オールインワン設計:</b>
          Flake8、isort、pyupgradeなど、多数のツールの機能を単一の実行可能ファイルに統合しており、依存関係の管理を簡素化します。
        </li>
        <li>
          <b>設定の簡便さ:</b>
          pyproject.tomlファイル内の[tool.ruff]セクションで一元的に設定を管理することが推奨されており、プロジェクト全体で一貫したルールを適用しやすくなっています。
        </li>
      </ul>
    </div>
  );
}

