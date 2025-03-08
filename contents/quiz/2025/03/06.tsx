import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Docker", "compose"],
    created_at: new Date("2025-03-06"),
    updated_at: new Date("2025-03-06"),

    // ----- quiz -----
    title: "Dockerの基本概念と使い方について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "Dockerfileの「RUN」コマンドはコンテナ起動時に実行されるコマンドを指定する",
      1: "Docker Composeは複数のコンテナを定義し、複雑なオプションを指定せずに一度にコンテナを起動・管理することができる",
      2: "Dockerイメージをビルドするコマンドは「docker create」である",
      3: "コンテナ内のファイルをホストと共有するには「volumes」を使用する",
    },
    answers: [1, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Docker公式ドキュメント", url: "https://docs.docker.com/" },
      { title: "Docker Compose概要", url: "https://docs.docker.com/compose/" },
      { title: "Dockerfileリファレンス", url: "https://docs.docker.com/engine/reference/builder/" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <>
      <p>
        Dockerに関する以下の記述のうち、正しいものをすべて選んでください。
      </p>
    </>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>Dockerの基本概念と使い方についての問題です。</p>
      <p className="py-2">選択肢の解説:</p>
      <ul className="list-disc pl-4">
        <li className="pt-2">Dockerfileの「RUN」コマンドはイメージの<span className="text-emerald-500">ビルド時</span>に実行されるコマンドを指定します。コンテナ起動時に実行されるコマンドは「CMD」または「ENTRYPOINT」で指定します。</li>
        <li className="pt-2">Docker Composeは複数のコンテナを定義し、一度に起動・管理するためのツールです。docker-compose.ymlファイルに設定を記述し、「docker compose up」コマンドで複数のコンテナを一度に起動できます。</li>
        <li className="pt-2">Dockerイメージをビルドするコマンドは「docker build」です。「docker create」はイメージからコンテナを作成するコマンドですが、起動はしません（runに近い）。</li>
        <li className="pt-2">コンテナ内のファイルをホストと共有するには「volumes」を使用します。これにより、ホスト側のファイルをコンテナ内にマウントしたり、データを永続化したりすることができます。</li>
      </ul>
      <p className="py-2">補足説明:</p>
      <p>
        Dockerは、アプリケーションとその依存関係をコンテナとしてパッケージ化し、どの環境でも一貫して実行できるようにするプラットフォームです。
        コンテナは軽量で、ホストOSのカーネルを共有しながら分離された環境を提供します。
      </p>
      <p className="py-2">Dockerの主要な概念には以下があります：</p>
      <ul className="list-disc pl-4">
        <li className="pt-2"><strong>イメージ</strong>: アプリケーションとその実行環境を含む読み取り専用のテンプレート</li>
        <li className="pt-2"><strong>コンテナ</strong>: イメージの実行可能なインスタンス</li>
        <li className="pt-2"><strong>Dockerfile</strong>: イメージをビルドするための指示書</li>
        <li className="pt-2"><strong>Docker Compose</strong>: 複数コンテナアプリケーションを定義・実行するためのツール</li>
      </ul>
      <p className="py-2">なお、このWebサイトの開発環境にも本番環境にもDockerを使用していて、今や欠かせない技術になっています。</p>
    </div>
  );
} 
