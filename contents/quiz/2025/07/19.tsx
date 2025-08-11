import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Governance", "Data Management", "Master Data Mgmt"],
    created_at: new Date("2025-07-19"),
    updated_at: new Date("2025-07-19"),

    // ----- quiz -----
    title: "参照データとマスタデータ管理（MDM）の基本概念",
    question_jsx: <QuizQuestion />,
    options: {
      0: "マスタデータは組織の中核となるエンティティ（顧客、製品、従業員など）に関する基本的で重要なデータであり、参照データは業務上の分類や区分を示すデータ（地域コード、通貨コードなど）を指す",
      1: "参照データは頻繁に変更されるトランザクションデータの一種で、マスタデータよりも変更頻度が高く、リアルタイムでの更新が必要な業務データである",
      2: "マスタデータ管理（MDM）は、データの重複排除、データ品質の向上、システム間でのデータ統合を実現し、組織全体で一貫性のある正確なマスタデータを維持する取り組みである",
      3: "MDMの実装では、データガバナンス体制の構築、データスチュワードの任命、データ品質ルールの定義、データ統合プロセスの確立が重要な要素となる",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "3分でわかるデータマネジメント【参照データ/マスターデータ管理】| 株式会社データ総研", url: "https://jp.drinet.co.jp/blog/datamanagement/refernece-data_master-data-management" },
      { title: "DAMA-DMBOK データマネジメント知識体系ガイド 第2版", url: "https://www.amazon.co.jp/dp/4802613784" },
      { title: "MDMソリューション | 株式会社データ総研", url: "https://jp.drinet.co.jp/consulting/mdm/" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        以下の参照データとマスタデータ管理（MDM）に関する記述のうち、
        <strong className="text-red-500">間違っているもの</strong>を
        選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  const masterDataExample = `
# マスタデータの例（JSON形式）
{
  "顧客マスタ": {
    "customer_id": "C001",
    "customer_name": "株式会社サンプル",
    "customer_type": "法人",
    "address": "東京都港区六本木1-1-1",
    "phone": "03-1234-5678",
    "created_date": "2024-01-01",
    "updated_date": "2024-12-01",
    "status": "active"
  },
  "製品マスタ": {
    "product_id": "P001",
    "product_name": "データ分析ソフトウェア",
    "category_code": "SOFTWARE",
    "price": 100000,
    "currency": "JPY",
    "supplier_id": "S001"
  }
}

# 参照データの例（地域コード、通貨コード）
{
  "参照データ": {
    "地域コード": {
      "JP": "日本",
      "US": "アメリカ合衆国",
      "CN": "中国"
    },
    "通貨コード": {
      "JPY": "日本円",
      "USD": "米ドル",
      "EUR": "ユーロ"
    },
    "顧客タイプ": {
      "CORP": "法人",
      "INDV": "個人"
    }
  }
}

# データ品質チェックの例
{
  "データ品質ルール": {
    "顧客ID": "必須、重複不可、C+3桁の数字",
    "顧客名": "必須、50文字以内",
    "電話番号": "形式チェック（XXX-XXXX-XXXX）",
    "メールアドレス": "形式チェック、重複不可"
  }
}
  `.trim();

  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-emerald-500">正解の解説：</p>
      
      <div className="mb-4">
        <p className="font-semibold text-red-500">「参照データは頻繁に変更されるトランザクションデータの一種で、マスタデータよりも変更頻度が高く、リアルタイムでの更新が必要な業務データである」❌ 間違い：</p>
        <p className="text-sm leading-relaxed">
          この記述は参照データの定義を根本的に誤解しています。
          参照データは実際には<strong>変更頻度が低い</strong>静的なデータであり、地域コード、通貨コード、業界分類などの分類・区分データを指します。
          これらは基準となる値で、組織全体で共通的に使用され、頻繁に変更されることはありません。
          トランザクションデータ（取引データ）とは全く異なる性質のデータです。
          参照データは標準化されたコード体系として機能し、データの一貫性と整合性を保つために重要な役割を果たします。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「マスタデータは組織の中核となるエンティティ（顧客、製品、従業員など）に関する基本的で重要なデータであり、参照データは業務上の分類や区分を示すデータ（地域コード、通貨コードなど）を指す」✅ 正しい：</p>
        <p className="text-sm leading-relaxed">
          この記述は正確です。マスタデータは組織のビジネスにとって最も重要な実体（エンティティ）を表現するデータです。
          顧客マスタには顧客の基本情報（名前、住所、連絡先など）が含まれ、製品マスタには製品の詳細情報が含まれます。
          一方、参照データは業務で使用される標準的な分類や区分を定義するデータで、国コード（JP、US）、通貨コード（JPY、USD）、業界分類コードなどが該当します。
          これらのデータは組織全体で一貫して使用される基準となる値です。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「マスタデータ管理（MDM）は、データの重複排除、データ品質の向上、システム間でのデータ統合を実現し、組織全体で一貫性のある正確なマスタデータを維持する取り組みである」✅ 正しい：</p>
        <p className="text-sm leading-relaxed">
          MDMの目的と効果を正確に表現しています。
          データの重複排除により、同一顧客が複数のシステムで異なるIDで管理される問題を解決し、統一された顧客ビューを実現できます。
          データ品質の向上では、入力チェック、標準化、クレンジングを通じて正確で信頼性の高いデータを維持します。
          システム間のデータ統合により、CRM、ERP、会計システムなど異なるシステム間でのデータ連携を円滑にし、組織全体でのデータ活用を促進します。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「MDMの実装では、データガバナンス体制の構築、データスチュワードの任命、データ品質ルールの定義、データ統合プロセスの確立が重要な要素となる」✅ 正しい：</p>
        <p className="text-sm leading-relaxed">
          MDM成功のための重要な要素を的確に指摘しています。
          データガバナンス体制では、データの責任者と意思決定プロセスを明確にします。
          データスチュワードは各業務領域でのデータ品質とガバナンスの責任を担います。
          データ品質ルールでは、フォーマットチェック、必須項目、一意性制約などの基準を定義します。
          データ統合プロセスでは、異なるシステムからのデータを統合・標準化し、マスタデータとして管理する仕組みを構築します。
        </p>
      </div>

      <p className="pt-4 font-semibold">マスタデータと参照データの構造例：</p>
      <CodeBlock code={masterDataExample} />

      <div className="bg-green-50 border-l-4 border-emerald-500 p-4 mt-4">
        <p className="text-sm">
          <strong>🎯 MDMの重要な特徴と効果：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-green-700">
          <li><strong>単一の真実の源（Single Source of Truth）：</strong> 組織全体で統一されたマスタデータ</li>
          <li><strong>データ品質の向上：</strong> 重複排除、標準化、検証による高品質データ</li>
          <li><strong>システム統合の促進：</strong> 異なるシステム間でのデータ連携</li>
          <li><strong>コンプライアンス対応：</strong> データガバナンスと規制要件への対応</li>
          <li><strong>業務効率の向上：</strong> データ検索時間の短縮と意思決定の迅速化</li>
          <li><strong>データ活用の基盤：</strong> 分析・AI・レポーティングの精度向上</li>
        </ul>
      </div>
    </div>
  );
}