import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "Infrastructure", "S3"],
    created_at: new Date("2025-03-27"),
    updated_at: new Date("2025-03-27"),

    // ----- quiz -----
    title: "S3ライフサイクルポリシーの階層的優先順位",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "ルールAが60日目に実行され、オブジェクトはStandard-IAに移行する。90日目にはルールBの条件も満たすが、オブジェクトは既にStandard-IAにあるため、ルールBは実質的に無視される。",
      1: "90日目にルールAとルールBの両方の期間条件を満たすが、より日数が短いルールA（60日）が優先され、オブジェクトはStandard-IAに留まる。",
      2: "90日目にルールAとルールBの条件を満たすが、Amazon S3はストレージクラスの階層（Standard-IAよりもGlacier Flexible Retrievalが低コスト/低頻度アクセス向け）を考慮し、ルールBのアクション（Glacier Flexible Retrievalへの移行）を実行する。",
      3: "90日目にはまだどのアクションも実行されず、120日目にルールCが実行され、オブジェクトは完全削除される。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Amazon S3 がライフサイクル設定の競合を処理する方法", url: "https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/lifecycle-conflicts.html" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <>
      <p>
        あるS3バケットの特定のプレフィックス (logs/) に合致するオブジェクトに対し、以下の3つのライフサイクルルールが設定されています。
        オブジェクトがバージョンニングされていないバケットにアップロードされてから90日経過した時点で、
        オブジェクトに対して実行されるアクションとその理由について、最も正確に説明しているものはどれでしょうか？
      </p>

      <div className="mt-4 p-4 rounded text-left">
        <p className="font-bold">ルールA:</p>
        <ul className="list-disc pl-4">
          <li>プレフィックス: <code>logs/</code></li>
          <li>アクション: 60日後にS3 Standard-IAへ移行する</li>
        </ul>
        <p className="font-bold mt-2">ルールB:</p>
        <ul className="list-disc pl-4">
          <li>プレフィックス: <code>logs/</code></li>
          <li>アクション: 90日後にS3 Glacier Flexible Retrievalへ移行する</li>
        </ul>
        <p className="font-bold mt-2">ルールC:</p>
        <ul className="list-disc pl-4">
          <li>プレフィックス: <code>logs/</code></li>
          <li>アクション: 120日後に完全削除する</li>
        </ul>
      </div>
    </>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>この問題は、S3ライフサイクルポリシーにおける複数のルールが、時間の経過とともに同一オブジェクトに適用可能となった場合の競合解決ロジック、特に異なる移行アクション間の優先順位に関する理解を問うています。</p>
      
      <p className="pt-4">選択肢の解説:</p>
      <ul className="list-disc pl-4">
        <li className="pt-2">「ルールAが60日目に実行され、オブジェクトはStandard-IAに移行する。90日目にはルールBの条件も満たすが、オブジェクトは既にStandard-IAにあるため、ルールBは実質的に無視される。」：これは誤りです。90日目にルールBが評価され、優先順位に基づいてGlacier Flexible Retrievalへ移行します。</li>
        <li className="pt-2">「90日目にルールAとルールBの両方の期間条件を満たすが、より日数が短いルールA（60日）が優先され、オブジェクトはStandard-IAに留まる。」：これは誤りです。日数の短さだけではなく、アクションの種類とストレージクラスの階層が優先順位決定の主要因です。</li>
        <li className="pt-2">「90日目にルールAとルールBの条件を満たすが、Amazon S3はストレージクラスの階層（Standard-IAよりもGlacier Flexible Retrievalが低コスト/低頻度アクセス向け）を考慮し、ルールBのアクション（Glacier Flexible Retrievalへの移行）を実行する。」：<span className="text-emerald-500">正解です</span>。S3の競合解決ロジック（移行アクション間の階層優先順位）を正しく説明しています。</li>
        <li className="pt-2">「90日目にはまだどのアクションも実行されず、120日目にルールCが実行され、オブジェクトは完全削除される。」：これは誤りです。60日目と90日目にそれぞれルールAとルールBに基づくアクションが実行されます。</li>
      </ul>
      
      <p className="pt-4">ライフサイクルルールの評価タイミング:</p>
      <ul className="list-disc pl-4">
        <li className="pt-2">ライフサイクルルールは、1日に1回（通常はUTCの深夜）実行され、オブジェクトがルールの条件（プレフィックス、タグ、経過日数など）を満たしているか評価されます</li>
        <li className="pt-2">オブジェクトがアップロードされてから60日後の評価タイミングで、ルールAの条件を満たすため、オブジェクトは S3 Standard-IA へ移行されます</li>
      </ul>
      
      <p className="pt-4">競合の発生と解決:</p>
      <ul className="list-disc pl-4">
        <li className="pt-2">オブジェクトがアップロードされてから90日後の評価タイミングでは、オブジェクトは既にStandard-IAにありますが、経過日数としてはルールB（90日後にGlacier Flexible Retrievalへ移行）の条件も満たしています</li>
        <li className="pt-2">S3ライフサイクルでは、単に最初に条件を満たしたルールが永続的に優先されるわけではありません。また、単純な日数の短さだけでも決まりません</li>
        <li className="pt-2">複数の移行アクションが競合する場合、S3は定義されたストレージクラスの階層に基づいて優先順位を決定します</li>
        <li className="pt-2">AWSが定義する優先順位では、S3 Glacier Flexible Retrieval (または S3 Glacier Deep Archive) への移行は、S3 Standard-IA (または S3 One Zone-IA) への移行よりも優先されます</li>
        <li className="pt-2">したがって、90日目の評価時点で、オブジェクトはStandard-IAに存在しますが、ルールBの条件も満たし、かつGlacier Flexible Retrievalへの移行が優先度が高いため、オブジェクトは S3 Glacier Flexible Retrieval へ移行されます</li>
      </ul>
      
      <p className="pt-4">その後のアクション:</p>
      <ul className="list-disc pl-4">
        <li className="pt-2">120日後の評価タイミングで、ルールC（完全削除）の条件を満たすため、オブジェクトはGlacier Flexible Retrievalから完全に削除されます</li>
        <li className="pt-2">ライフサイクルにおける完全削除アクションは、常に移行アクションよりも優先されます</li>
      </ul>
      
      <p className="pt-4">学びのポイント:</p>
      <ul className="list-disc pl-4">
        <li className="pt-2">S3ライフサイクルポリシーの競合は、単純な「早い者勝ち」や「日数の短さ」だけでは決まりません</li>
        <li className="pt-2">アクションの種類の優先順位: 完全削除 {`>`} 移行 {`>`} 非現行バージョンの有効期限切れ / 削除マーカーのクリーンアップ</li>
        <li className="pt-2">移行アクション間の優先度: S3 Glacier Flexible Retrieval / Deep Archive {`>`} S3 Standard-IA / One Zone-IA (同じ適用日において)</li>
        <li className="pt-2">S3 Intelligent-Tieringへの移行: 他の多くのストレージクラスへの移行よりも優先される場合があります</li>
        <li className="pt-2">これらの優先順位は、一般的に<strong>よりコスト効率の高いパス（最終的な削除を含む）</strong>を選択するように設計されています</li>
        <li className="pt-2">バージョンニングが有効な場合、非現行バージョンに対するルールも考慮する必要があり、さらに複雑になります</li>
        <li className="pt-2">複数のルールを設定する際は、意図しない動作を防ぐために、これらの競合解決ロジックを理解し、プレフィックスやタグを慎重に設計することが不可欠です</li>
      </ul>
    </div>
  );
} 
