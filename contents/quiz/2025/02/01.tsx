import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["DMBOK", "Data Management", "GDPR"],
    created_at: new Date("2025-02-01"),
    updated_at: new Date("2025-02-01"),

    // ----- quiz -----
    title: "データ倫理に関してGDPRの7つの原則に含まれない要素を選択してください",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "公平性・適法性・透明性 | lawfulness, fairness and transparency",
      1: "目的の限定 | purpose limitation",
      2: "データの最小化 | data minimization",
      3: "正確性 | accuracy",
      4: "保存の制限 | storage limitation",
      5: "完全性及び機密性 | integrity and confidentiality (security)",
      6: "説明責任 | accountability",
      7: "同意 | consent",
    },
    answers: [7],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "A guide to the data protection principles", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/" },
      { title: "データマネジメント知識体系ガイド 第二版", url: "https://www.amazon.co.jp/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E7%9F%A5%E8%AD%98%E4%BD%93%E7%B3%BB%E3%82%AC%E3%82%A4%E3%83%89-%E7%AC%AC%E4%BA%8C%E7%89%88-DAMA-International/dp/4296100491" },
      { title: "EU一般データ保護規則（GDPR）とは？", url: "https://www.cloudflare.com/ja-jp/learning/privacy/what-is-the-gdpr/" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        データ倫理に関してGDPRの7つの原則に<span className="text-red-500">含まれない要素</span>を選択してください。
        （訳語は諸説あるので、細かい表現は大目に見てください）
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        GDPRの7つの基本原則について説明します：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          公平性・適法性・透明性：個人データは、個人に関して、適法、公正、かつ透明性のある方法で処理されなければなりません。
        </li>
        <li className="pb-1">
          目的の限定：個人データは、特定の、明示的で正当な目的のために収集され、これらの目的と互換性のない方法でさらに処理されてはなりません。ただし、公共の利益のための保管目的、科学的もしくは歴史的研究目的、または統計目的のための追加処理は、元の目的と互換性がないとはみなされません。
        </li>
        <li className="pb-1">
          データの最小化：個人データは、処理される目的との関連において、適切、関連性があり、必要な範囲に限定されなければなりません。
        </li>
        <li className="pb-1">
          正確性：個人データは正確でなければならず、必要に応じて最新の状態に保たれなければなりません。処理目的に照らして不正確な個人データは、遅滞なく消去または訂正されるよう、あらゆる合理的な措置が講じられなければなりません。
        </li>
        <li className="pb-1">
          保存の制限：個人データは、処理目的のために必要な期間を超えて、データ主体の識別を可能とする形式で保持してはなりません。ただし、公共の利益のための保管目的、科学的もしくは歴史的研究目的、または統計目的のためだけに処理される場合は、より長期の保存が認められます。
        </li>
        <li className="pb-1">
          完全性及び機密性：個人データは、不正または違法な処理、偶発的な喪失、破壊または損傷に対する適切な保護を含む、適切な技術的または組織的対策を用いて、適切なセキュリティを確保した方法で処理されなければなりません。
        </li>
        <li className="pb-1">
          説明責任：管理者は、これらの原則の遵守について責任を負い、それを実証できなければなりません。
        </li>
      </ul>
      <p>
        「同意（consent）」は、GDPRにおける重要な要素ですが、7つの基本原則には含まれていません。
        GDPRでは同意に関して次のように説明されています。「同意に基づいて個人データが処理される場合、その同意は積極的能動的な行動によるものでなければならない。
        その行動は自ら選択され選ばれ、具体的で、確実に必要情報が与えられ、明確なものである必要がある。」
        （つまり、オプトインを採用しましょうということなので、オプトアウト的に拒否されるまでメールアドレスにメールを送ってもいいなんてことはやってはいけません。）
      </p>
    </div>
  );
} 
