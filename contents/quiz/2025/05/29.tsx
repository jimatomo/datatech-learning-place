import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Docker", "Container", "Network", "Infrastructure"],
    created_at: new Date("2025-05-29"),
    updated_at: new Date("2025-05-29"),

    // ----- quiz -----
    title: "Dockerのポートフォワーディング設定",
    question_jsx: <QuizQuestion />,
    options: {
      0: "-p 80:8080",
      1: "-p 8080:80",
      2: "--port 8080:80",
      3: "--map 80:8080",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Docker run reference", url: "https://docs.docker.jp/engine/reference/run.html" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-3">docker run コマンドを使用して、ホストマシンのポート 8080 をコンテナ内のポート 80 にフォワーディング（マッピング）するための正しいオプションはどれでしょうか？</p>
    </div>
  );
}

function QuizExplanation() {
  const correctCommand = "docker run -p 8080:80 your_image_name";
  return (
    <div className="text-xs md:text-sm space-y-2">
      <p>
        docker run コマンドでポートフォワーディングを行う際の主なオプションは -p または --publish です。このオプションの基本的な構文は以下の通りです。
      </p>
      <CodeBlock code="<ホスト側のポート>:<コンテナ側のポート>" />
      <p>
        あるいは、特定のIPアドレスにバインドする場合は以下のようになります。
      </p>
      <CodeBlock code="<ホスト側のIPアドレス>:<ホスト側のポート>:<コンテナ側のポート>" />
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-red-500">-p 80:8080</strong>：これは誤りです。この指定では、ホストのポート80がコンテナのポート8080にマッピングされます。問題の要件とは逆です。
        </li>
        <li>
          <strong className="text-emerald-500">-p 8080:80</strong>：これは正しい記述です。ホストのポート8080がコンテナのポート80にマッピングされます。
          例えば、{correctCommand} のように使用します。
        </li>
        <li>
          <strong className="text-red-500">--port 8080:80</strong>：これは誤りです。--port というオプションは、Dockerの標準的なポートフォワーディングオプションではありません。正しいオプションは -p または --publish です。
        </li>
        <li>
          <strong className="text-red-500">--map 80:8080</strong>：これは誤りです。--map というオプションは、Dockerのポートフォワーディングには使用されません。
        </li>
      </ul>
      <p>
        <strong>解説:</strong><br />
        Dockerでコンテナを実行する際、外部からコンテナ内のアプリケーションにアクセスできるようにするためには、ホストマシンのポートとコンテナ内のポートをマッピングする必要があります。この操作をポートフォワーディングと呼びます。
      </p>
      <p>
        -p オプションを使用すると、指定したホストのポートへのトラフィックが、指定したコンテナのポートに転送されます。これにより、例えばローカルマシンのブラウザから http://localhost:8080 にアクセスすると、コンテナ内のポート 80 で実行されているウェブサーバーに接続できるようになります。
      </p>
      <p>
        Dockerのドキュメントにも関連情報が記載されていますが、ポートフォワーディングの具体的なオプション形式は -p hostPort:containerPort です。
      </p>
    </div>
  );
} 
