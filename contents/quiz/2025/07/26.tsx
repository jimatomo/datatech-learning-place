import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Reference Data", "Taxonomy", "Ontology", "Data Management"],
    created_at: new Date("2025-07-26"),
    updated_at: new Date("2025-07-26"),

    // ----- quiz -----
    title: "参照データの分類に関する説明",
    question_jsx: <QuizQuestion />,
    options: {
      0: "シンプルリストは、国コードと国名のように、単純なキーと値のペアで構成される最も基本的な参照データの形式である。",
      1: "相互参照リストは、社内の製品コードと業界標準の製品コードを対応付けるなど、異なるデータ標準やシステム間で値をマッピングするために使用される。",
      2: "タクソノミは、製品カテゴリのように、「電子機器 > スマートフォン > iPhone」といった階層構造でデータを分類・整理するための体系である。",
      3: "オントロジは、主にトランザクションデータをリアルタイムに記録するために使用される単純なフラットテーブル構造であり、データの追加や更新が頻繁に行われるシナリオに最適化されている。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "データマネジメント知識体系ガイド 第二版", url: "https://www.amazon.co.jp/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E7%9F%A5%E8%AD%98%E4%BD%93%E7%B3%BB%E3%82%AC%E3%82%A4%E3%83%89-%E7%AC%AC%E4%BA%8C%E7%89%88-DAMA-International/dp/4296100491" },
      { title: "3分でわかるデータマネジメント【参照データ/マスターデータ管理】| 株式会社データ総研", url: "https://jp.drinet.co.jp/blog/datamanagement/refernece-data_master-data-management" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        参照データは、その構造と複雑さに応じていくつかのタイプに分類されます。以下の参照データの分類に関する記述のうち、
        <strong className="text-red-500">間違っているもの</strong>を
        選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  const referenceDataExample = `
// シンプルリスト（Simple List）の例
{
  "国コード": {
    "JP": "日本",
    "US": "アメリカ合衆国",
    "DE": "ドイツ"
  }
}

// 相互参照リスト（Cross-reference List）の例
{
  "社内システムAの顧客ランク": {
    "A": "Gold",   // システムAの'A'は、共通ランクの'Gold'に相当
    "B": "Silver",
    "C": "Bronze"
  },
  "外部システムBの顧客ステータス": {
    "100": "Gold",   // システムBの'100'は、共通ランクの'Gold'に相当
    "200": "Silver",
    "300": "Bronze"
  }
}

// タクソノミ（Taxonomy）の例
{
  "製品カテゴリ": {
    "電子機器": {
      "コンピュータ": ["ラップトップ", "デスクトップ"],
      "スマートフォン": ["iPhone", "Android"]
    },
    "衣料品": {
      "トップス": ["Tシャツ", "セーター"],
      "ボトムス": ["ジーンズ", "スラックス"]
    }
  }
}

// オントロジ（Ontology）の概念的な関係性の例
// (is-a: 〜の一種である, part-of: 〜の一部である)
{
  "関係性": {
    "iPhone": { "is-a": "スマートフォン" },
    "スマートフォン": { "is-a": "電子機器" },
    "画面": { "part-of": "スマートフォン" }
  }
}
  `.trim();

  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-emerald-500">正解の解説：</p>
      
      <div className="mb-4">
        <p className="font-semibold text-red-500">「オントロジは、主にトランザクションデータをリアルタイムに記録するために使用される単純なフラットテーブル構造であり、データの追加や更新が頻繁に行われるシナリオに最適化されている。」❌ 間違い：</p>
        <p className="text-sm leading-relaxed">
          この記述はオントロジの定義を根本的に誤解しています。オントロジは、エンティティ（実体）とその間の複雑な関係性を定義するための知識表現モデルです。
          単なる階層関係（is-a）だけでなく、「部分と全体（part-of）」やその他の意味的な関係を記述し、知識の構造を形式的に表現します。
          これは静的な知識体系を構築するために用いられることが多く、リアルタイムのトランザクションデータを記録する単純なフラットテーブルとは全く異なります。
          オントロジはセマンティックWebやAIの分野で知識共有や推論の基盤として利用されます。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「シンプルリストは、国コードと国名のように、単純なキーと値のペアで構成される最も基本的な参照データの形式である。」✅ 正しい：</p>
        <p className="text-sm leading-relaxed">
          これは正しい説明です。シンプルリストは、許可された値の集合を定義する最も単純な形式の参照データです。
          多くの場合、コードとその説明（例：&apos;JP&apos;, &apos;日本&apos;）の2つの列で構成されます。システム内のドロップダウンリストや基本的な検証ルールによく使用されます。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「相互参照リストは、社内の製品コードと業界標準の製品コードを対応付けるなど、異なるデータ標準やシステム間で値をマッピングするために使用される。」✅ 正しい：</p>
        <p className="text-sm leading-relaxed">
          これも正しい説明です。相互参照リスト（またはクロスウォーク）は、2つ以上の異なるコード体系やデータ標準の間で同等の値をマッピングするために使用されます。
          これにより、システム間のデータ連携やデータ統合時に、意味的な一貫性を保ちながらデータを変換できます。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「タクソノミは、製品カテゴリのように、「電子機器 &gt; スマートフォン &gt; iPhone」といった階層構造でデータを分類・整理するための体系である。」✅ 正しい：</p>
        <p className="text-sm leading-relaxed">
          この記述も正確です。タクソノミは、参照データを親子関係のある階層構造で整理したものです。
          この構造により、より詳細なレベルでの分類や集計、ナビゲーションが可能になります。
          生物の分類体系や製品カタログのカテゴリ分類などが典型的な例です。
        </p>
      </div>

      <p className="pt-4 font-semibold">参照データの分類例：</p>
      <CodeBlock code={referenceDataExample} />

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
        <p className="text-sm">
          <strong>🎯 参照データの分類まとめ：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-blue-700">
          <li><strong>シンプルリスト：</strong> 単純なキーと値のペア。</li>
          <li><strong>相互参照リスト：</strong> 異なるシステム間のコードのマッピング。</li>
          <li><strong>タクソノミ：</strong> 階層的な分類（親子関係）。</li>
          <li><strong>オントロジ：</strong> 階層関係を含む、より複雑で意味的な関係性のモデル。</li>
        </ul>
      </div>
    </div>
  );
}