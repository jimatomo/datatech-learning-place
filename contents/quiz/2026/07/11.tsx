import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Composer",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Integration", "Data Quality", "Data Architecture", "Data Management"],
    created_at: new Date("2026-07-11"),
    updated_at: new Date("2026-07-11"),

    // ----- quiz -----
    title: "DW/データマート構築におけるソースマッピングとクレンジング",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ソース・トゥ・ターゲット・マッピングは、ソース項目とターゲット項目の対応、変換・クレンジング規則、検証ルールなどをフィールド単位で文書化した設計成果物であり、ETL/ELT実装の設計図となる。",
      1: "データプロファイリングは、ソースの適合性やクレンジング・適合（conforming）要件を把握するために、抽出設計の早い段階で実施する。",
      2: "クレンジング／適合処理では、品質違反の検出、重複排除、共通ディメンション属性の統一などを行い、修正・棄却・そのままロードの判断と、その根拠となるメタデータを残すことが望ましい。",
      3: "ソースシステムの品質問題は、データウェアハウス側で黙って自動修正してロードすれば十分であり、エラーイベントの記録やソース側へのフィードバック、修正内容の可視化は不要である。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Kimball Group - Subsystems of ETL Revisited", url: "https://www.kimballgroup.com/2007/10/subsystems-of-etl-revisited/" },
      { title: "Kimball Group - Technical DW/BI System Architecture", url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/technical-dw-bi-system-architecture/" },
      { title: "Alteryx - What Is Source-to-Target Mapping?", url: "https://www.alteryx.com/glossary/source-to-target-mapping" },
      { title: "データマネジメント知識体系ガイド 第二版", url: "https://www.amazon.co.jp/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E7%9F%A5%E8%AD%98%E4%BD%93%E7%B3%BB%E3%82%AC%E3%82%A4%E3%83%89-%E7%AC%AC%E4%BA%8C%E7%89%88-DAMA-International/dp/4296100491" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        データウェアハウスやデータマートを構築するプロセスでは、ソースデータのマッピングと、
        修復・変換におけるクレンジングの考え方が重要です。
      </p>
      <p>
        次の記述のうち、
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
        DW/データマート構築のバックルーム（ETL）では、ソース理解・抽出のあと、
        クレンジングと適合（conforming）でデータを整え、プレゼンテーション領域へ配信します。
        ソース・トゥ・ターゲット・マッピングはその変換仕様の中核です。
      </p>

      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          品質問題をDW側で黙って自動修正し、記録もフィードバックも不要、という考え方は誤りです。
          KimballのETLでは、クレンジングは「汚れたデータを直す」ことと
          「業務システムが捕捉した事実を正確に残す」ことのバランスが重要です。
          修正・棄却・そのままロードを選べる仕組みに加え、エラーイベントの追跡や監査用メタデータ、
          修正内容の可視化を通じて、ソース側の根本原因改善につなげることが推奨されます。
        </li>
      </ul>

      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong>ソース・トゥ・ターゲット・マッピング</strong>:
          ソースとターゲットのフィールド対応、変換・クレンジング規則、検証ルールなどを文書化した設計図です。
          実装・テスト・監査・リネージ理解の共通基盤になります。
        </li>
        <li>
          <strong>データプロファイリング</strong>:
          抽出前〜抽出設計の早い段階でソースを調査し、取り込み可否やクレンジング／適合の要件を明らかにします
          （Kimball ETL subsystem 1）。
        </li>
        <li>
          <strong>クレンジング／適合</strong>:
          品質違反の検出、重複排除（deduplication）、適合ディメンション属性の統一などが含まれます。
          処理結果をメタデータとして残し、BI側からも品質状況を参照できるようにするのが望ましいです。
        </li>
      </ul>
    </div>
  );
}
