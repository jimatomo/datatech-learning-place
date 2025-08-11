import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Application", "Snowflake", "Snowflake Basic"],
    created_at: new Date("2025-02-17"),
    updated_at: new Date("2025-02-17"),

    // ----- quiz -----
    title: "Snowflakeのダッシュボード共有と権限",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ダッシュボードを共有された全てのユーザーは、基になるクエリを実行できる",
      1: "ダッシュボードのキャッシュされた結果は、同じプライマリロールを持つユーザーのみが閲覧可能",
      2: "ダッシュボードはフォルダーに整理して共有することができる",
      3: "リンク共有が有効な場合、Snowsightにサインインしていないユーザーでもダッシュボードを閲覧できる",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "ダッシュボードを使用したデータの視覚化", url: "https://docs.snowflake.com/ja/user-guide/ui-snowsight-dashboards" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowsightのダッシュボード機能では、チャートを使用してクエリ結果を視覚化し、
        他のユーザーと共有することができます。ダッシュボードの共有と権限に関する
        以下の説明のうち、正しいものを選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeのダッシュボード共有と権限に関する問題です。
      </p>
      <p className="pt-2">
        それぞれの選択肢について説明します：
      </p>
      <ul className="list-disc pl-6 pt-2">
        <li className="pb-2">
          ダッシュボードを共有する際、ユーザーごとに権限を設定できます。
          デフォルトでは、リンクのある人はダッシュボードを表示できず、
          基になるクエリの実行権限も個別に設定する必要があります。
        </li>
        <li className="pb-2">
          ダッシュボードを実行すると結果はキャッシュされ、同じプライマリロールを持つユーザーであれば
          これらの結果を閲覧することができます。ただし、マスキングや行アクセスポリシーが
          適用されている場合は、キャッシュされた結果に他のユーザーが生成できないデータが
          含まれる可能性があります。
        </li>
        <li className="pb-2">
          ダッシュボードをフォルダーに整理することはできません。
          これは、ワークシートとは異なる制限事項です。
        </li>
        <li>
          リンク共有が有効な場合でも、ダッシュボードを閲覧するには
          Snowflakeユーザーとしてサインインする必要があります。
          (リンク共有は「まだ」ログインしたことがないユーザに共有する際に便利です。)
          また、ダッシュボードを駆動するクエリのセッションコンテキストと
          同じロールを使用する必要があります。
        </li>
      </ul>
      <p className="pt-2">
        ダッシュボードの共有は、データの可視化と分析結果の共有を効率的に行うための
        重要な機能です。ただし、適切なアクセス制御と権限管理が重要で、
        特にデータ保護ポリシーが適用されている場合は注意が必要です。
      </p>
    </div>
  );
} 

