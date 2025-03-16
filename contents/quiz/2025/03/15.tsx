import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["DMBOK", "Modeling", "Dimensional Modeling"],
    created_at: new Date("2025-03-15"),
    updated_at: new Date("2025-03-15"),

    // ----- quiz -----
    title: "ディメンションモデリングにおける重要な用語について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "スノーフレーク化とは、スタースキーマ内にあるフラットで単一なディメンショナル構造を非正規化することである",
      1: "グレインとは、単一ファクトテーブル内の1レコードのことで、分析のROIを考慮して適切な粒度に設定する必要がある",
      2: "適合ディメンションとは、特定のプロジェクトではなく組織全体を念頭に置いて作成されるディメンションのことである",
      3: "適合ファクトとは、個々のデータマートを超えて標準化された用語の定義をファクトテーブルのメジャーに使用することである",
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
        ディメンションモデリングにおける重要な用語について、<span className="text-red-500">間違っている</span>選択肢を選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        ディメンションモデリングにおける重要な用語について、間違っている選択肢は
        「スノーフレーク化とは、スタースキーマ内にあるフラットで単一なディメンショナル構造を非正規化することである」です。
      </p>
      <p className="py-2">
        スノーフレーク化は、実際には「正規化」を行うプロセスであり、「非正規化」ではありません。
        スノーフレーク化により、ディメンションテーブルがより小さな関連テーブルに分割され、データの冗長性が減少しますが、
        クエリの複雑さが増加するというトレードオフがあります。
      </p>
      <p className="py-2">
        その他の選択肢はすべて正しい内容です：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          <strong>グレイン（粒度）</strong>：ファクトテーブルの1レコードが表す詳細レベルを指します。
          粒度が細かすぎるとストレージと計算コストが増加し、粗すぎると詳細な分析ができなくなるため、
          分析のROI（投資対効果）を考慮して適切な粒度を設定することが重要です。
        </li>
        <li className="pb-1">
          <strong>適合ディメンション</strong>：組織全体で共通して使用できるように設計されたディメンションです。
          例えば、組織の会計年度やクォータの情報を含むカレンダーディメンションを作成することで、
          組織全体で一貫した時間軸での分析が可能になります。
        </li>
        <li className="pb-1">
          <strong>適合ファクト</strong>：組織全体で標準化された指標の定義を使用することを指します。
          例えば「売上」という用語の定義が部門によって異なると混乱を招くため、
          組織全体で統一された定義を使用することが重要です。
          もし、別々のファクト間で同じメジャーが互換性がない場合には、異なる名前を付けておくべきです。
        </li>
      </ul>
      <p>
        これらの用語を正しく理解し、適切に使用することは、効果的なディメンショナルモデリングを
        実現する上で非常に重要です。特に、組織全体でデータの一貫性を保つために、
        適合ディメンションと適合ファクトの概念は重要な役割を果たします。
      </p>
    </div>
  );
} 
