import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Database", "Scalability", "Architecture", "Data Management"],
    created_at: new Date("2025-04-19"),
    updated_at: new Date(),

    // ----- quiz -----
    title: "データベースシャーディングの概要と特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "シャーディングは、大規模なデータセットを複数のデータベースやサーバー（シャード）に分割することで、水平方向のスケーラビリティを実現する。",
      1: "各シャードは独立して機能するため、単一シャードの障害がシステム全体に影響を与える範囲を限定し、可用性を向上させることができる。",
      2: "データを関連性の高いシャードに配置することで、クエリがアクセスする必要のあるデータ量を削減し、応答時間を短縮できる。",
      3: "複数のシャードにまたがるトランザクションの調整や、一貫性の維持が単純化され、アプリケーション開発が容易になる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        データベースシャーディングに関する記述として、<span className="text-red-500">間違っている</span>選択肢を選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        <strong>「複数のシャードにまたがるトランザクションの調整や、一貫性の維持が単純化され、アプリケーション開発が容易になる。」</strong>という記述は間違っています。
        シャーディングはデータベースのスケーラビリティとパフォーマンスを向上させる強力な手法ですが、分散システム特有の複雑さを伴います。
        特に、複数のシャードにまたがるトランザクション（分散トランザクション）は、データの整合性を保証するための調整（例: 2フェーズコミット）が必要となり、実装と管理が複雑になります。
        また、スキーマ変更やシャード間のデータ移動、クロスシャードクエリの最適化なども、シャーディングされていないデータベースと比較して難易度が上がります。
      </p>
      <p className="py-2">
        その他の選択肢はシャーディングに関する正しい記述です。
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>水平スケーラビリティ:</strong> シャーディングの主な目的は、データを複数のノードに分散させることで、単一ノードのリソース制限（CPU、メモリ、ディスクI/O）を超えてスケールアウトすることです。これにより、増大するデータ量やリクエスト負荷に対応できます。
        </li>
        <li className="pb-2">
          <strong>可用性の向上:</strong> 各シャードが独立しているため、一部のシャードに障害が発生しても、他のシャードは稼働し続けることができます。これにより、システム全体のダウンタイムを最小限に抑えることができます（ただし、影響を受けるデータへのアクセスはできなくなります）。
        </li>
        <li className="pb-2">
          <strong>クエリパフォーマンスの向上:</strong> 適切に設計されたシャーディング戦略（シャーディングキーの選択が重要）により、多くのクエリは単一または少数のシャードのみを対象とすることができます。これにより、スキャンするデータ量が減り、クエリの応答時間が短縮されます。
        </li>
      </ul>
      <p className="pt-2">
        シャーディングを導入する際には、シャーディングキーの選択、データの再分散（リシャーディング）、運用管理の複雑さなどを慎重に検討する必要があります。
      </p>
    </div>
  );
} 
