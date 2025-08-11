import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Lakehouse", "Datatech News"],
    created_at: new Date("2025-03-23"),
    updated_at: new Date("2025-03-23"),

    // ----- quiz -----
    title: "第三世代オープンテーブルフォーマット（Unified Open Table Format）の特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "第三世代オープンテーブルフォーマットの主な目標は、異なるデータフォーマット間の相互運用性を実現し、メタデータの統一層を提供することである",
      1: "Apache XTable（旧OneTable）は、Delta LakeとIcebergテーブル用のメタデータを自動生成し、単一のParquetデータファイルを共有する",
      2: "第三世代オープンテーブルフォーマットでは、異なるフォーマット間でデータファイルを常に複製する必要がある",
      3: "統一されたメタデータ層により、異なるクエリエンジンやツールが好みのフォーマットを使ってデータにアクセスできるようになる",
    },
    answers: [0, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "The History and Evolution of Open Table Formats - Part II", url: "https://www.pracdata.io/p/the-history-and-evolution-of-open-14d" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        第三世代のオープンテーブルフォーマット（Unified Open Table Format）に関する説明として、正しい選択肢を全て選んでください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        第三世代のオープンテーブルフォーマット（Unified Open Table Format）は、2023年頃から始まった新しい動向であり、以下の主要な特徴を持ちます：
      </p>
      <p className="py-2">
        <strong>クロステーブル相互運用性</strong>：
        <ul className="list-disc pl-4">
          <li>異なるオープンテーブルフォーマット間での相互運用性を実現</li>
          <li>統一された普遍的なオープンテーブルフォーマットの創出</li>
          <li>全ての主要な既存フォーマットとシームレスに連携</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>統一されたメタデータ層</strong>：
        <ul className="list-disc pl-4">
          <li>主要なオープンテーブルフォーマット間でデータの読み書きのための統一アプローチ</li>
          <li>メタデータの変換を自動化し、データファイルの複製を不要に</li>
          <li>異なるフォーマットのメタデータを並列に保存・管理</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>主な取り組み</strong>：
        <ul className="list-disc pl-4">
          <li>Apache XTable（旧OneTable）：軽量な抽象化層で、様々なフォーマットのメタデータ生成をサポート</li>
          <li>Delta UniForm：Delta LakeとIcebergテーブル用のメタデータを自動生成し、単一のParquetデータファイルを共有</li>
          <li>LinkedInのOpenHouse：Icebergベースで統一テーブルAPIを提供</li>
        </ul>
      </p>
      <p className="pt-2">
        これらの取り組みにより、組織はデータの複製なしに異なるクエリエンジンやツールを使用でき、データレイクハウスの柔軟性と効率性をさらに高めることができます。
      </p>
      <p className="pt-2">
        Apache XTableは広範なアプローチを取り、異なるフォーマットの読み書き機能を混在させることが可能である一方、Delta UniFormはDelta Lakeを主要フォーマットとして使用する傾向があります。
      </p>
    </div>
  );
} 
