import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AI", "Cortex", "Datatech News", "Snowflake"],
    created_at: new Date("2025-07-06"),
    updated_at: new Date("2025-07-06"),

    // ----- quiz -----
    title: "Snowflake Cortex Search の管理UI進化：AI & ML Studioでの新機能",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Snowflake AI & ML Studioでは、Cortex Searchサービスの一覧表示、詳細設定、データプレビュー、プレイグラウンド機能まで全てGUIで管理できるようになった。",
      1: "Cortex Searchサービス一覧画面では、サービス名、ステータス、データベース・スキーマ、インデックス作成ステータス、更新頻度などの情報が視覚的に確認できる。",
      2: "Cortex Searchの管理UIでは、手動でのインデックス更新、更新頻度やウェアハウスの変更、サービスの一時停止・再開などの操作がGUIから実行可能である。",
      3: "Cortex Searchの管理UIでは、Cortex Searchサービスのコスト管理画面が提供されていない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake Cortex Search の管理 UI が便利になった - Zenn", url: "https://zenn.dev/tsubasa_tech/articles/5f6bd4c3b4d03b" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        2025年7月にSnowflake AI & ML Studioで進化したCortex Searchの管理UIに関する記述のうち、<strong className="text-red-500">間違っているもの</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflake AI & ML StudioでのCortex Search管理UIの進化に関する各記述の解説は以下の通りです。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-emerald-500">Snowflake AI & ML Studioでは、Cortex Searchサービスの一覧表示、詳細設定、データプレビュー、プレイグラウンド機能まで全てGUIで管理できるようになった。</strong>：
          これは正しい記述です。2025年7月のアップデートにより、Cortex Searchの作成や運用において必要なタスクをほぼ全てSnowflake AI & ML Studio上で完結できるようになりました。従来はSQLコマンドが中心だった管理作業が、GUIベースの直感的な操作に進化しています。
        </li>
        <li>
          <strong className="text-emerald-500">Cortex Searchサービス一覧画面では、サービス名、ステータス、データベース・スキーマ、インデックス作成ステータス、更新頻度などの情報が視覚的に確認できる。</strong>：
          これは正しい記述です。新しい管理UIでは、従来は`SHOW CORTEX SEARCH SERVICES;`などのSQLコマンドでしか確認できなかった情報が、視覚的に分かりやすい形で表示されるようになりました。特にインデックス作成でコンピューティングリソースを消費するCortex Searchの管理において、不要なリソース消費を回避することに役立ちます。
        </li>
        <li>
          <strong className="text-emerald-500">Cortex Searchの管理UIでは、手動でのインデックス更新、更新頻度やウェアハウスの変更、サービスの一時停止・再開などの操作がGUIから実行可能である。</strong>：
          これは正しい記述です。新しい管理UIでは、新規サービスの作成、既存サービスの詳細表示、プレイグラウンドでの検索試行、手動でのインデックス更新、設定変更、サービスの一時停止・再開、削除など、様々な操作がGUIから実行できるようになりました。
        </li>
        <li>
          <strong className="text-red-500">Cortex Searchの管理UIでは、Cortex Searchサービスのコスト管理画面が提供されていない。</strong>：
          これは間違った記述です。実際には、Cortex Searchの管理UIではCortex Searchサービスのコスト管理画面が提供されています。
        </li>
      </ul>
      <p className="pt-4">
        <strong>補足</strong>：
        <br />
        Snowflake AI & ML StudioでのCortex Search管理UIの進化により、データエンジニアからAIアプリケーション開発者まで、より効率的にCortex Searchを活用できるようになりました。GUIベースの管理により、開発・運用効率の劇的向上、ROIの向上、AIアプリケーション開発の民主化が実現されています。SnowflakeのAI機能は「企業データのためのAIプラットフォーム」として、使いやすさと機能性の両面で進化し続けています。
      </p>
    </div>
  );
}