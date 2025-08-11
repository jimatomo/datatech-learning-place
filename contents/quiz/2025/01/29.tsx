import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Modeling", "dbt"],
    created_at: new Date("2025-01-29"),
    updated_at: new Date("2025-01-29"),

    // ----- quiz -----
    title: "dbtプロジェクトの構造化に関するベストプラクティス",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "dbtのmodelsフォルダの第一階層は、staging、intermediate、martsの3つに分ける",
      1: "stagingレイヤーでは、ビジネスロジックを適用し、複雑な集計処理を行う",
      2: "プロジェクト構造を統一する目的は、チームメンバーの意思決定の負担を減らし、本質的な問題に集中できるようにすることである",
      3: "source-conformedデータとは、組織のニーズや定義に基づいて整形されたデータを指す",
      4: "dbtプロジェクトの本質的な目的は、source-conformedデータからbusiness-conformedデータへの変換である",
    },
    answers: [0, 2, 4],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "dbt - How we structure our dbt projects", url: "https://docs.getdbt.com/best-practices/how-we-structure/1-guide-overview" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        dbtプロジェクトの構造に関するベストプラクティスとして、正しいものを選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        以下が正解の説明です：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          dbtプロジェクトは、staging、intermediate、martsの3つの主要なレイヤーで構成されます。
          これらのレイヤーは、データを段階的に変換し、ビジネスニーズに合わせて整形していく過程を表します。
        </li>
        <li className="pb-1">
          プロジェクト構造を統一することで、チームメンバーはファイルの配置場所やネーミングルールなどの
          些細な決定に時間を費やすことなく、より重要な問題に注力できるようになります。
        </li>
        <li>
          dbtプロジェクトの本質的な目的は、外部システムによって形作られたsource-conformedデータを、
          組織のニーズや定義に基づいたbusiness-conformedデータへと変換することです。
        </li>
      </ul>
      <p>
        誤った選択肢の説明：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          stagingレイヤーは、ソースデータから最初の基本的なビルディングブロックを作成する段階であり、
          複雑なビジネスロジックや集計処理はこの段階では行いません。
        </li>
        <li>
          source-conformedデータは、外部システムによって形作られたデータを指し、
          組織のニーズや定義に基づいて整形されたデータはbusiness-conformedデータと呼ばれます。
        </li>
      </ul>
    </div>
  );
} 
