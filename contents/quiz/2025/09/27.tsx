import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Warehouse", "Data Modeling", "Data Management"],
    created_at: new Date("2025-09-27"),
    updated_at: new Date("2025-09-27"),

    // ----- quiz -----
    title: "コーポレートインフォメーション・ファクトリ（CIF）のアーキテクチャ",
    question_jsx: <QuizQuestion />,
    options: {
      0: "中央のエンタープライズデータウェアハウス（EDW）は、複数の業務システムからデータを集約し、「サブジェクト指向」「統合化」「時系列」「不変的」という4つの特性を持つように設計される。",
      1: "データマートは、EDWから特定の部門や用途に合わせて必要なデータ（「集計データ」と「詳細データ」の両方を含む）を抽出し、利用者に提供する役割を担う。",
      2: "EDWは、データの「履歴」を長期的に保持することで、過去の任意の時点でのスナップショット分析や傾向分析を可能にする、企業の記憶としての役割を果たす。",
      3: "データマートはEDWとは独立して構築されるため、データの「統合化」は各データマートで個別に行われる。これにより、部門ごとの要求に迅速に対応できるという利点がある。",
    },
    answers: [3],
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
      <p>
        データウェアハウジングにおけるコーポレートインフォメーション・ファクトリ（CIF）のアーキテクチャに関する記述として、
        <strong className="text-red-600">誤っているもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        コーポレートインフォメーション・ファクトリ（CIF）は、データウェアハウスのアーキテクチャの一種で、中央のエンタープライズデータウェアハウス（EDW）と、そこから派生する部門別のデータマートで構成されます。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          EDWの基本的な特性を示しています。業務システムごとに最適化されたデータを、顧客や製品といった「サブジェクト」を軸に再構成し、全社で一貫性のある形式で統合（「統合化」）します。これは単にデータをコピーするのではなく、キー構造・データ定義・命名規則などをウェアハウス全体で統一し、ウェアハウス自体が信頼できるデータの記録システムとなることを意味します。そして変更の「履歴」を（「時系列」に）蓄積し、データは更新されない（「不変的」）という原則も重要です。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          データマートの役割を正しく説明しています。EDWが全社的なデータの貯蔵庫であるのに対し、データマートは特定の分析ニーズに合わせて最適化されたデータを提供します。必要に応じてドリルダウン分析ができるよう、「集計データ」だけでなく元となる「詳細データ」も保持することがあります。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          EDWが長期的な「履歴」データを保持する重要性について述べています。これにより、ビジネスの変遷を追いかけたり、過去のデータに基づいた将来予測が可能になります。
        </li>
        <li>
          <p className="font-semibold text-red-500">誤っている記述（正答）:</p>
          この記述はCIFの基本的な考え方と矛盾します。CIFアーキテクチャの核心は、EDWで一度だけデータの「統合化」を行い、その一貫したデータを各データマートに配布する点にあります。この統合プロセスには、キー構造の統一、一貫した命名規則の適用、データ定義の標準化などが含まれ、これによってウェアハウスが一貫性のある信頼できるデータソースとなります。データマートがEDWから独立して個別にデータを統合すると、部門間でデータの定義がずれたり、分析結果に矛盾が生じる「サイロ」化の問題が発生します。
        </li>
      </ul>
    </div>
  );
}