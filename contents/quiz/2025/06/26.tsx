import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Docker Desktop", "Rancher Desktop", "Podman Desktop", "Container Tools", "Open Source"],
    created_at: new Date("2025-06-26"),
    updated_at: new Date("2025-06-26"),

    // ----- quiz -----
    title: "Docker Desktop代替ツールの特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Rancher DesktopはSUSEが開発したオープンソースツールで、Kubernetesサポートがビルトインされており、containerdとDockerエンジンの両方を選択できる。",
      1: "Podman Desktopはdaemonlessアーキテクチャを採用し、rootlessコンテナをデフォルトでサポートすることで、セキュリティを向上させている。",
      2: "ColimaはmacOSとLinux向けの軽量コマンドラインツールで、Docker DesktopよりもCPUとメモリ使用量が大幅に少ない。",
      3: "Docker Desktopは現在、すべての企業規模において完全に無料で利用でき、ライセンス制限はない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Best Free Docker Desktop Alternatives in 2025 | Better Stack",
        url: "https://betterstack.com/community/comparisons/docker-desktop-alternative/",
      },
      {
        title: "Docker vs Podman: An In-Depth Comparison (2025)",
        url: "https://dev.to/mechcloud_academy/docker-vs-podman-an-in-depth-comparison-2025-2eia",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Docker Desktopの代替ツールに関する記述として、
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
            「Docker Desktopは現在、すべての企業規模において完全に無料で利用でき、ライセンス制限はない。」
          </strong>
          ：これは間違った記述です。Docker Desktopは2021年にライセンスモデルを変更し、現在は大企業（従業員250人以上または年間売上1,000万ドル以上）での商用利用には有料サブスクリプション（Docker Pro、Team、Businessプラン）が必要です。個人利用、小規模企業、教育機関、非商用オープンソースプロジェクトでは無料で利用できますが、すべての企業で無料というわけではありません。
        </li>
      </ul>
      <p className="py-2">その他の選択肢は正しい記述です：</p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>
            「Rancher DesktopはSUSEが開発したオープンソースツールで、Kubernetesサポートがビルトインされており、containerdとDockerエンジンの両方を選択できる。」
          </strong>
          ：これは正しい記述です。Rancher DesktopはSUSE（旧Rancher Labs）が開発したクロスプラットフォームのオープンソースツールで、K3sによるKubernetesサポートが組み込まれており、コンテナランタイムとしてcontainerdまたはdockerdを選択できます。
        </li>
        <li className="pb-2">
          <strong>
            「Podman Desktopはdaemonlessアーキテクチャを採用し、rootlessコンテナをデフォルトでサポートすることで、セキュリティを向上させている。」
          </strong>
          ：これは正しい記述です。Podman Desktopは永続的なデーモンプロセスを持たないdaemonlessアーキテクチャを採用し、各ユーザーが独自のコンテナインスタンスを管理できる rootlessコンテナをデフォルトでサポートしており、これによりセキュリティリスクを軽減しています。
        </li>
        <li className="pb-2">
          <strong>
            「ColimaはmacOSとLinux向けの軽量コマンドラインツールで、Docker DesktopよりもCPUとメモリ使用量が大幅に少ない。」
          </strong>
          ：これは正しい記述です。Colima（Containers on Linux on Mac）は軽量なコマンドラインツールで、Docker Desktopと比較してCPUとメモリ使用量が非常に少なく、リソース効率に優れています。ただし、GUIは提供しておらず、コマンドライン操作のみです。
        </li>
      </ul>
      <p className="pt-2">
        2025年現在、Docker Desktopのライセンス変更により多くの企業が代替ツールを検討しており、Rancher Desktop、Podman Desktop、Colima、OrbStack（macOS専用）、Limaなどの優れたオープンソース代替ツールが利用可能です。これらのツールはそれぞれ異なる特徴と利点を持ち、組織のニーズに応じて選択することができます。
      </p>
    </div>
  );
}