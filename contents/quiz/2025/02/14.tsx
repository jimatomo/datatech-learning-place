import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Python", "例外処理", "エラーハンドリング"],
    created_at: new Date("2025-02-14"),
    updated_at: new Date("2025-02-14"),

    // ----- quiz -----
    title: "Pythonの例外処理のベストプラクティス",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "例外処理は、予期せぬエラーが発生する可能性がある特定の処理に対してのみ使用し、try句の範囲は最小限に抑えるべきです。",
      1: "except句では、常にbaseとなるExceptionクラスをキャッチして、すべての例外を一括で処理することがベストプラクティスです。",
      2: "ファイルの読み書きやネットワーク通信、データベース接続などのリソースを扱う処理では、with文を使用してリソースの適切な解放を保証するべきです。",
      3: "カスタム例外クラスを作成する際は、組み込みの例外クラスを継承せず、独自のクラス階層を作成することが推奨されています。",
    },
    answers: [0, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Python の例外処理のベストプラクティス", url: "https://qiita.com/kyooooonaka/items/2907a54364823a482697" },
      { title: "Python公式ドキュメント - 例外処理", url: "https://docs.python.org/ja/3/tutorial/errors.html" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Pythonの例外処理には、コードの品質と保守性を高めるためのベストプラクティスがあります。
        以下の選択肢から、Pythonの例外処理に関する正しい説明をすべて選んでください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        この問題では、Pythonの例外処理における重要なベストプラクティスについて理解することを目的としています。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          例外処理は、必要な箇所でのみ使用し、try句の範囲は最小限に抑えるべきです。
          これにより、コードの可読性が向上し、デバッグも容易になります。
          また、パフォーマンスの観点からも、try句の範囲を必要最小限にすることが推奨されています。
        </li>
        <li className="py-2">
          except句で基底のExceptionクラスをキャッチすることは、予期せぬエラーも含めてすべての例外を捕捉してしまうため、
          バグの早期発見を妨げる可能性があります。代わりに、想定される具体的な例外クラスを指定することが推奨されます。
        </li>
        <li>
          with文（コンテキストマネージャ）の使用は、ファイルやデータベース接続などのリソース管理において重要です。
          withブロックを抜けると自動的にリソースが解放されるため、例外が発生した場合でもリソースリークを防ぐことができます。
        </li>
        <li className="py-2">
          カスタム例外クラスを作成する際は、組み込みの例外クラス（通常はException）を継承することが推奨されます。
          これにより、Pythonの例外処理の標準的な機能や振る舞いを継承でき、一貫性のある例外処理が可能になります。
        </li>
      </ul>
      <p className="pt-2">
        適切な例外処理は、プログラムの堅牢性と保守性を高める重要な要素です。
        エラーの種類に応じて適切な例外クラスを選択し、必要最小限の範囲で例外処理を行うことで、
        より信頼性の高いコードを作成することができます。
      </p>
    </div>
  );
} 

