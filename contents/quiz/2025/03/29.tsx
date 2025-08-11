import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Management", "Data Storage", "Operation"],
    created_at: new Date("2025-03-29"),
    updated_at: new Date("2025-03-29"),

    // ----- quiz -----
    title: "データベース環境の役割と要件について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "開発環境では、本番環境と同様のデータ量と品質、ハードウェア構成を維持し、開発者が実際の運用に近い条件で作業できるようにする必要がある",
      1: "テスト環境では、本番環境と同様のハードウェア構成を用意し、品質保証テスト、性能テストなどの試験に耐えうるデータを利用できる環境を整備する必要がある",
      2: "サンドボックス環境では、開発者が自由に実験や検証を行えるよう、本番環境とは独立した環境を用意し、各担当者のエリアに対してCRUDの広い権限を付与する",
      3: "本番環境では、データの整合性とセキュリティを最優先し、アクセス権限を厳格に管理し、変更は標準化されたプロセスで限られたチームのみが実施するべきである",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "データマネジメント知識体系ガイド 第二版", url: "https://www.amazon.co.jp/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E7%9F%A5%E8%AD%98%E4%BD%93%E7%B3%BB%E3%82%AC%E3%82%A4%E3%83%89-%E7%AC%AC%E4%BA%8C%E7%89%88-DAMA-International/dp/4296100491" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        データベース環境の役割と要件について、<span className="text-red-500">間違っている</span>選択肢を選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        開発環境では、本番環境と全く同じデータ量、品質、ハードウェア構成を維持することは必ずしも必須ではありません。
        開発効率やコストの観点から、通常は本番環境よりも小規模なデータセット（例えば、マスク化またはサンプリングされたデータ）や、異なるハードウェア構成を用いることが一般的です。
        重要なのは、開発者が機能開発や単体テストを効率的に行える環境を提供することです。
        本番環境に近い条件でのテストは、主にテスト環境の役割となります。
      </p>
      <p className="py-2">
        その他の選択肢は正しい記述です。
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>テスト環境</strong>では、本番環境に近い、あるいは同等のハードウェア構成を用意し、品質保証（QA）テスト、性能テスト、負荷テストなどを実施します。
          これにより、本番リリース前に潜在的な問題を特定し、修正することが可能になります。
          テストデータも、本番に近いシナリオを網羅できるものが求められます。
        </li>
        <li className="pb-2">
          <strong>サンドボックス環境</strong>は、開発者などが新しい技術やアイデアを自由に試したり、検証したりするための独立した実験環境です。
          本番環境や他の開発環境に影響を与えることなく、安全に試行錯誤できることが重要です。
          そのため、必要最小限の権限を付与しつつ、分離された環境を提供します。
        </li>
        <li className="pb-2">
          <strong>本番環境</strong>は、実際のビジネスプロセスが稼働する最も重要な環境です。
          データの整合性、可用性、セキュリティを最優先に考える必要があります。
          アクセス権限は厳格に管理され、変更作業は承認されたプロセスに基づき、限られた担当者のみが慎重に行うべきです。
          これにより、サービス停止やデータ損失のリスクを最小限に抑えます。
        </li>
      </ul>
      <p className="pt-2">
        最近はクラウドDWHを利用することで簡単にテスト環境を構築できるようになっているので、データエンジニアとしては
        開発者が安全に品質の高い試験まで実現ができる環境を素早く簡単に構築できるように工夫をしていきましょう。
      </p>
    </div>
  );
} 
