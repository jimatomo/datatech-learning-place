import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["DMBOK", "Governance", "Data Management"],
    created_at: new Date("2025-02-08"),
    updated_at: new Date("2025-02-08"),

    // ----- quiz -----
    title: "データガバナンスで取り組むべきイシュー",
    question_jsx: <QuizQuestion />,
    options: {
      0: "一般的なリスク管理",
      1: "データのプライバシー",
      2: "データのセキュリティ",
      3: "データ品質改善",
      4: "メタデータ管理",
      5: "開発プロジェクトの効率性",
      6: "ベンダー管理",
      7: "自由なデータ流通",
    },
    answers: [7],
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
        データガバナンスとはデータ資産の管理に対して職務権限を通し統制することです。
        統制するということはPDCAのプロセスを回しながら徹底させることを意味します。
        以下の選択肢の中から、データガバナンスで取り組むべきイシューではないものを選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        データガバナンスで取り組むべきイシューについての問題です。
        「自由なデータ流通」は、むしろデータガバナンスによって適切に制御されるべき対象であり、取り組むべきイシューではありません。
        （自由なデータ流通そのもの自体を否定するものではありません。ただ、往々にして、ガバナンスの効いていないデータ流通はリスクを抱え、管理上の負債になる可能性が高いのです。）
      </p>
      <p className="pt-2">
        データガバナンスで取り組むべき主なイシューは以下の通りです：
      </p>
      <ul className="list-disc pl-6 pt-2">
        <li>リスク低減に関するイシュー
          <ul className="list-circle pl-6">
            <li>一般的なリスク管理：データに関連する様々なリスクの特定と対策。データを非倫理的な方法で取り扱うと炎上し会社の信用を落とすリスクがあります。</li>
            <li>プライバシー保護：個人情報の適切な取り扱いの確保。</li>
            <li>セキュリティ確保：データの可用性、有用性、健全性、一貫性、監査制、セキュリティを統制してデータ資産を保護します。</li>
          </ul>
        </li>
        <li className="pt-2">プロセス改善に関するイシュー
          <ul className="list-circle pl-6">
            <li>データ品質改善：データの信頼性を高めることにより業績の向上につなげます。</li>
            <li>メタデータ管理：データの意味や関連性の適切な管理。業務用語集や主管組織などを整備します。</li>
            <li>開発プロジェクトの効率化：データのライフサイクルにガバナンスを適用することで、技術的負債（管理されてこなかったために問題を抱えてしまったデータ）を管理します。</li>
            <li>ベンダー管理：クラウドや外部委託先、販売先の適切な契約を統制します。</li>
          </ul>
        </li>
      </ul>
      <p className="pt-2">
        組接戦略と密接に連携する必要があるので、現実的には一朝一夕では解決しないのがデータガバナンスです。
        現場レベルにおいては重要なイシューから優先的にPDCAを回しながら改善していくことが重要です。
        時間の経過に合わせて徐々に必要性を理解する風土ができ、組織戦略とガバナンスが同じ方向を向き始めると一気に進んでいきます。
      </p>
    </div>
  );
} 

