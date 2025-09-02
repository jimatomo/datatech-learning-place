import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "Data Modeling"],
    created_at: new Date("2025-09-03"),
    updated_at: new Date("2025-09-03"),

    // ----- quiz -----
    title: "dbtのpackages.ymlとpackage-lock.ymlの役割",
    question_jsx: <QuizQuestion />,
    options: {
      0: "packages.yml にパッケージとそのバージョンを定義し dbt deps を実行すると、パッケージが dbt_packages ディレクトリにインストールされる。",
      1: "dbt deps を実行すると、package-lock.yml が作成または更新され、各パッケージの具体的なバージョン（例: Gitのコミットハッシュ）が記録される。",
      2: "package-lock.yml が存在する場合、packages.yml の内容を完全に無視し、常に package-lock.yml に記録されたバージョンをインストールする。",
      3: "packages.yml でブランチ名（例: main）を指定している場合でも、package-lock.yml には特定のコミットが「ピン留め」されるため、意図しないバージョンの更新を防ぐことができる。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "dbt Docs: Pinning packages", url: "https://docs.getdbt.com/docs/build/packages#pinning-packages" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        dbtプロジェクトにおいて、<code>packages.yml</code> と <code>package-lock.yml</code> の役割に関する記述のうち、
        <strong className="text-red-600">誤っているもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm space-y-4">
      <p className="font-semibold text-red-500">正解（誤っている記述）:</p>
      <p>
      「package-lock.yml が存在する場合、packages.yml の内容を完全に無視し、常に package-lock.yml に記録されたバージョンをインストールする。」は誤りです。
      </p>

      <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
        <p className="font-semibold mb-2">挙動の解説:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li><code>dbt deps</code> を実行すると、dbtはまず <code>packages.yml</code> (または <code>dependencies.yml</code>) を確認します。</li>
            <li><code>package-lock.yml</code> が存在し、かつ <code>packages.yml</code> に変更がない場合、dbtは <code>package-lock.yml</code> に記載されたピン留め済みのバージョンをインストールします。これにより、毎回同じバージョンのパッケージがインストールされることが保証されます。</li>
            <li>しかし、<code>packages.yml</code> の内容を変更（例: パッケージの追加、バージョンの更新）して <code>dbt deps</code> を実行すると、dbtはその変更を検知し、新しい依存関係を解決して <code>package-lock.yml</code> を更新します。</li>
            <li>したがって、「完全に無視する」のではなく、<code>packages.yml</code> は依存関係の「宣言」として機能し、<code>package-lock.yml</code> はその結果を「固定（ロック）」するファイルとして協調して動作します。</li>
        </ul>
      </div>

      <p className="font-semibold text-green-600">正しい記述の解説:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>パッケージの定義とインストール:</strong> <code>packages.yml</code> は、プロジェクトで利用するdbtパッケージとそのバージョン（特定のバージョン、バージョン範囲、Gitリポジトリのブランチなど）を定義するファイルです。<code>dbt deps</code> コマンドは、このファイルに基づいてパッケージを <code>dbt_packages/</code> ディレクトリにダウンロード・インストールします。
        </li>
        <li>
          <strong>バージョンのピン留め:</strong> <code>dbt deps</code> を初めて実行するか、<code>packages.yml</code> を更新した後に実行すると、<code>package-lock.yml</code> が生成・更新されます。このファイルには、インストールされた各パッケージの正確なリビジョン（Gitパッケージの場合はコミットハッシュ）が記録されます。これにより、チーム内の開発者全員が同じコードベースで作業できるようになり、再現性が保証されます。
        </li>
        <li>
          <strong>ブランチ指定時の挙動:</strong> たとえ <code>packages.yml</code> で特定のブランチ（例: <code>main</code>）を指定しても、<code>dbt deps</code> 実行時のそのブランチの最新コミットが <code>package-lock.yml</code> にピン留めされます。その後、リモートのブランチが更新されても、再度 <code>dbt deps</code> を実行しない限り、ローカルのパッケージは自動で更新されません。これにより、意図しないタイミングでの破壊的変更を防ぐことができます。
        </li>
      </ul>
    </div>
  );
}