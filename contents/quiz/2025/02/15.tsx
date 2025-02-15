import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["DMBOK", "data architecture"],
    created_at: new Date("2025-02-15"),
    updated_at: new Date("2025-02-15"),

    // ----- quiz -----
    title: "DMBOKにおけるデータアーキテクチャでの取り組みと制作物",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "データの保存と処理の要件がわかるアウトプットを作成する",
      1: "データ要件に関してのAs ISとTo Beに関して整理し、そのGapを満たすための計画を作成する",
      2: "共有の業務用語を適用して、全社の共通理解を確立する",
      3: "主要な概念であるエンタープライズアーキテクチャのスコープの中にはテクニカルなネットワークなどの低いレイヤーのアーキテクチャは含まれていない",
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
        DMBOKにおけるデータアーキテクチャでの取り組みの目的は、個人が把握できない深さや広さを持つデータ基盤を取り巻く情報を俯瞰的に理解できるようにすることです。
        そのためにデータを様々な抽象化レベルで表現するアウトプットを作成することになります。
        以下の選択肢から、データアーキテクチャにおけるアウトプットに関しての記述として<span className="text-red-500">間違っているもの</span>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        DMBOKにおけるデータアーキテクチャは、組織全体のデータ資産を効果的に管理・活用するための重要な取り組みであり成果物です。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          データアーキテクチャでは、データの保存と処理の要件を明確にし、それらを文書化することが重要な取り組みの一つです。
          これにより、システム間のデータフローや処理の依存関係を可視化し、効率的なデータ管理を実現します。
        </li>
        <li className="py-2">
          現状（As IS）と目標（To Be）の分析は、組織のデータ管理における課題を特定し、改善計画を立案するための重要なステップです。
          ギャップ分析に基づいて、具体的な実装計画を策定することで、効果的なデータ管理体制の構築が可能となります。
        </li>
        <li>
          共通の業務用語（ビジネス用語）の確立と適用は、組織全体でのデータの意味の統一を図る上で不可欠です。
          これにより、部門間のコミュニケーションが円滑になり、データの一貫性が向上します。
        </li>
        <li className="py-2">
          エンタープライズアーキテクチャのスコープには、ビジネスアーキテクチャからテクニカルアーキテクチャまで、
          すべてのレイヤーが含まれます。ネットワークやインフラストラクチャなどの技術的な要素も重要な構成要素として
          位置づけられています。
        </li>
      </ul>
      <p>
        データアーキテクチャは、マスターとなる青写真を作り、同じ方向に向かってデータ資産をコントロールし、
        ビジネス戦略に合わせてデータへの投資を行うことを目的としています。
        なんとなくでアーキテクチャ図などを用意するのではなく、この成果物が何の目的を果たすためのものなのかを意識し、
        その目的にかなうものなのかを問いながら作成・読み解きを進めていきましょう。
      </p>
    </div>
  );
} 

