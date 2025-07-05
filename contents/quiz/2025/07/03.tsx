import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Linux", "apt", "package management", "Ubuntu", "Debian"],
    created_at: new Date("2025-07-03"),
    updated_at: new Date("2025-07-03"),

    // ----- quiz -----
    title: "aptコマンドの使い方",
    question_jsx: <QuizQuestion />,
    options: {
      0: "apt updateはパッケージリストの更新を行い、apt upgradeはインストール済みパッケージの更新を行う。",
      1: "apt removeはパッケージを削除し、apt purgeはパッケージと設定ファイルを完全に削除する。",
      2: "apt searchはパッケージを検索し、apt showは指定したパッケージの詳細情報を表示する。",
      3: "apt installでパッケージをインストールする際は、必ず事前にapt upgradeを実行する必要がある。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "apt - Ubuntu Community Help Wiki",
        url: "https://help.ubuntu.com/community/AptGet/Howto",
      },
      {
        title: "APT(8) - Advanced Package Tool",
        url: "https://manpages.ubuntu.com/manpages/focal/man8/apt.8.html",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        aptコマンドの使い方に関する記述として、
        <span className="text-red-500">間違っている</span>ものはどれですか？
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        選択肢の中で間違っているものは次のとおりです。
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>
            「apt installでパッケージをインストールする際は、必ず事前にapt upgradeを実行する必要がある。」
          </strong>
          ：これは間違った記述です。apt installコマンドでパッケージをインストールする際に、事前にapt upgradeを実行する必要はありません。apt installは単独で実行可能で、必要に応じて依存関係を解決してパッケージをインストールします。apt upgradeは既存のパッケージを更新するコマンドであり、新しいパッケージのインストールとは別の操作です。ただし、最新のパッケージ情報を取得するために、定期的にapt updateを実行することは推奨されます。
        </li>
      </ul>
      <p className="py-2">その他の選択肢は正しい記述です：</p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>
            「apt updateはパッケージリストの更新を行い、apt upgradeはインストール済みパッケージの更新を行う。」
          </strong>
          ：これは正しい記述です。apt updateはパッケージリストを最新の状態に更新し、apt upgradeはシステムにインストール済みのパッケージを利用可能な新しいバージョンに更新します。通常、apt updateを実行してからapt upgradeを実行します。
        </li>
        <li className="pb-2">
          <strong>
            「apt removeはパッケージを削除し、apt purgeはパッケージと設定ファイルを完全に削除する。」
          </strong>
          ：これは正しい記述です。apt removeはパッケージを削除しますが設定ファイルは残し、apt purgeはパッケージと関連する設定ファイルを完全に削除します。完全にシステムから削除したい場合はapt purgeを使用します。
        </li>
        <li className="pb-2">
          <strong>
            「apt searchはパッケージを検索し、apt showは指定したパッケージの詳細情報を表示する。」
          </strong>
          ：これは正しい記述です。apt searchは指定したキーワードでパッケージを検索し、apt showは指定したパッケージの詳細情報（説明、バージョン、依存関係など）を表示します。
        </li>
      </ul>
      <p className="pt-2">
        aptコマンドはDebian/Ubuntu系のLinuxディストリビューションで使用される強力なパッケージ管理ツールです。基本的なコマンドを覚えることで、ソフトウェアのインストール、更新、削除を効率的に行うことができます。また、apt autoclean、apt autoremove、apt listなどの追加コマンドも覚えておくと便利です。
      </p>
    </div>
  );
}