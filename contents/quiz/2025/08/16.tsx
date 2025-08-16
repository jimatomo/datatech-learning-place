import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Entity Resolution", "Data Quality", "Master Data", "Data Application"],
    created_at: new Date("2025-08-16"),
    updated_at: new Date("2025-08-16"),

    // ----- quiz -----
    title: "エンティティ解決における偽陽性と偽陰性の制御戦略",
    question_jsx: <QuizQuestion />,
    options: {
      0: "決定論的アルゴリズムは厳密なルールベースマッチングを行うため、偽陰性のリスクが高いが偽陽性のリスクは低い。確率論的アルゴリズムは曖昧性を許容するため、偽陽性のリスクが高いが偽陰性のリスクは低い。",
      1: "検証フェーズでは人手によるレビューを必須とし、標準化フェーズでは統一された表記ルールを適用する。強化フェーズでは外部データソースから追加属性を取得して、マッチング精度を向上させる。",
      2: "閾値を高く設定すると偽陽性は減少するが偽陰性は増加し、閾値を低く設定すると偽陰性は減少するが偽陽性は増加する。業務要件に応じて精度（Precision）と再現率（Recall）のバランスを調整する必要がある。",
      3: "マッチングアルゴリズムは単一の手法に統一し、すべてのエンティティタイプに対して同じ閾値を適用することで、システム全体の一貫性を保つ。また、自動マッチングの結果は人手確認なしに直接マスターデータに反映する。",
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
      <p className="pb-4">
        マスターデータ管理におけるエンティティ解決（Entity Resolution）プロセスにおいて、
        データの検証、標準化、強化を経て品質を向上させ、偽陽性（False Positive）と偽陰性（False Negative）を
        適切に制御するための戦略として、<strong className="text-red-500">間違っているもの</strong>を
        <strong>選択</strong>してください。
      </p>
      <div className="rounded-lg p-4 mt-4">
        <h4 className="font-semibold text-sm mb-2">用語説明</h4>
        <ul className="text-xs space-y-1">
          <li><strong>偽陽性（False Positive）:</strong> 実際には異なるエンティティなのに、同一と判定してしまうエラー</li>
          <li><strong>偽陰性（False Negative）:</strong> 実際には同一エンティティなのに、異なると判定してしまうエラー</li>
          <li><strong>決定論的アルゴリズム:</strong> 厳密なルールベースでマッチングを行う手法</li>
          <li><strong>確率論的アルゴリズム:</strong> 統計的手法で類似度を計算し、確率的にマッチングを行う手法</li>
        </ul>
      </div>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-red-600">正解の解説（間違っている選択肢）：</p>
      
      <div className="mb-4">
        <p className="font-semibold text-red-500">「マッチングアルゴリズムは単一の手法に統一し、すべてのエンティティタイプに対して同じ閾値を適用することで、システム全体の一貫性を保つ。また、自動マッチングの結果は人手確認なしに直接マスターデータに反映する。」❌ 正解（間違っている記述）：</p>
        <p className="text-sm leading-relaxed">
          これは非現実的で危険なアプローチです。顧客、商品、取引先など異なるエンティティタイプは特性が異なるため、それぞれに最適化されたアルゴリズムと閾値が必要です。また、自動マッチングの結果を無検証でマスターデータに反映することは、データ品質リスクが極めて高く、実運用では避けるべきです。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-green-600">「検証フェーズでは人手によるレビューを必須とし、標準化フェーズでは統一された表記ルールを適用する。強化フェーズでは外部データソースから追加属性を取得して、マッチング精度を向上させる。」✅ 正しい記述：</p>
        <p className="text-sm leading-relaxed">
          エンティティ解決の品質向上プロセスの正しい説明です。<strong>検証（Validation）</strong>では自動マッチング結果の妥当性を人手でチェックし、<strong>標準化（Standardization）</strong>では住所フォーマットや会社名表記などを統一し、<strong>強化（Enrichment）</strong>では外部の参照データ（住所マスタ、企業コードなど）を活用してデータの完全性と精度を高めます。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-green-600">「閾値を高く設定すると偽陽性は減少するが偽陰性は増加し、閾値を低く設定すると偽陰性は減少するが偽陽性は増加する。業務要件に応じて精度（Precision）と再現率（Recall）のバランスを調整する必要がある。」✅ 正しい記述：</p>
        <p className="text-sm leading-relaxed">
          マッチング閾値調整の基本原理です。高い閾値は厳格なマッチング基準となり確実性は高まりますが（偽陽性↓）、マッチできないペアが増えます（偽陰性↑）。低い閾値は多くのペアをマッチさせますが（偽陰性↓）、誤ったマッチも増えます（偽陽性↑）。金融業界では偽陽性を避ける高精度重視、マーケティングでは偽陰性を避ける高再現率重視など、業務要件に応じた調整が重要です。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-green-600">「決定論的アルゴリズムは厳密なルールベースマッチングを行うため、偽陰性のリスクが高いが偽陽性のリスクは低い。確率論的アルゴリズムは曖昧性を許容するため、偽陽性のリスクが高いが偽陰性のリスクは低い。」✅ 正しい記述：</p>
        <p className="text-sm leading-relaxed">
          これは各アルゴリズムの特性を正確に表現しています。決定論的アルゴリズムは完全一致やexact rulesを使用するため、マッチしなかったものは確実に異なるエンティティですが（偽陽性低）、わずかな表記ゆれでもマッチしない場合があります（偽陰性高）。
          一方、確率論的アルゴリズムは類似度に基づくため、本来異なるものをマッチさせてしまうリスク（偽陽性高）はありますが、表記ゆれがあっても類似エンティティを検出できます（偽陰性低）。
          また、確率的アルゴリズムは自己修復的に改善していくので訓練用のデータ量の増加に伴い精度が向上していく可能性も秘めているが、劣化する場合もあり、その点においても非決定的な特性を持っています。
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 dark:border-blue-400 p-4 mt-4">
        <p className="text-sm">
          <strong>🎯 エンティティ解決のベストプラクティス：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-blue-700 dark:text-blue-300">
          <li><strong>ハイブリッドアプローチ：</strong> 決定論的と確率論的手法を組み合わせて使用</li>
          <li><strong>段階的処理：</strong> 完全一致→部分一致→ファジーマッチングの順序で処理</li>
          <li><strong>品質管理：</strong> 検証→標準化→強化のサイクルでデータ品質を継続的に改善</li>
          <li><strong>閾値最適化：</strong> 業務要件とデータ特性に応じた精度・再現率のバランス調整</li>
          <li><strong>人間参加型AI：</strong> 自動処理と人手確認を組み合わせたワークフロー設計</li>
        </ul>
      </div>
    </div>
  );
}