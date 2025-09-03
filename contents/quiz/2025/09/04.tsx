import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Git", "Git Reset", "Version Control", "Infrastructure"],
    created_at: new Date("2025-09-04"),
    updated_at: new Date("2025-09-04"),

    // ----- quiz -----
    title: "git reset: 直前のコミットを取り消すユースケース",
    question_jsx: <QuizQuestion />,
    options: {
      0: "git reset --soft HEAD~1",
      1: "git reset --mixed HEAD~1",
      2: "git reset --hard HEAD~1",
      3: "git revert HEAD",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Git のさまざまなツール - リセットコマンド詳説",
        url: "https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%81%95%E3%81%BE%E3%81%96%E3%81%BE%E3%81%AA%E3%83%84%E3%83%BC%E3%83%AB-%E3%83%AA%E3%82%BB%E3%83%83%E3%83%88%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E8%A9%B3%E8%AA%AC",
      },
      {
        title: "git reset についてもまとめてみた - Qiita",
        url: "https://qiita.com/ChaaaBooo/items/459d5417ff4cf815abce",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        <code>main</code>
        ブランチで作業中に誤ってコミットしてしまいました。この直前のコミットだけを取り消し、変更内容はステージングエリアに残したまま、新しいブランチを作成してそこでコミットし直したいと考えています。
      </p>
      <p className="py-2">
        このシナリオで実行すべき
        <strong className="text-green-600">最も適切なコマンド</strong>
        はどれでしょうか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        このシナリオの要件は「直前のコミットを取り消し」かつ「変更内容をステージングエリアに残す」ことです。この両方を満たすコマンドを選択する必要があります。
      </p>
      <ul className="list-disc pl-4 py-2 space-y-2">
        <li>
          <p className="font-semibold text-green-600">git reset --soft HEAD~1 (正解):</p>
          このコマンドは、HEADを1つ前のコミットに移動させますが、ステージングエリアとワーキングディレクトリの状態は変更しません。つまり、コミットだけが取り消され、変更内容はステージングされたまま残ります。これにより、すぐに新しいブランチに切り替えてコミットすることができます。
        </li>
        <li>
          <p className="font-semibold">git reset --mixed HEAD~1:</p>
          これは<code>reset</code>コマンドのデフォルトの動作です。HEADを1つ前のコミットに移動させ、ステージングエリアの変更をワーキングディレクトリに戻します。変更内容は残りますが、再度<code>git add</code>でステージングする必要があるため、今回の要件には完全には一致しません。
        </li>
        <li>
          <p className="font-semibold">git reset --hard HEAD~1:</p>
          このコマンドは、HEADを1つ前のコミットに移動させ、ステージングエリアとワーキングディレクトリの変更をすべて破棄します。変更内容が失われてしまうため、別のブランチでコミットし直すことができなくなります。
        </li>
        <li>
          <p className="font-semibold">git revert HEAD:</p>
          このコマンドは、直前のコミットの変更を打ち消す新しいコミットを作成します。コミット履歴をきれいに保ちたい場合や、共有ブランチでの作業の取り消しには適していますが、「コミット自体を取り消す」という今回のシナリオとは目的が異なります。
        </li>
      </ul>
    </div>
  );
}
