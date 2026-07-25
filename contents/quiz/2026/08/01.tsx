import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Composer",
    author_url: "https://github.com/jimatomo",
    tags: ["Master Data Mgmt", "Governance", "Data Quality", "Data Management"],
    created_at: new Date("2026-08-01"),
    updated_at: new Date("2026-08-01"),

    title: "マスターデータと参照データの境界",
    question_jsx: <QuizQuestion />,
    options: {
      0: "マスターデータは顧客・製品・従業員・拠点など、トランザクションに文脈を与える中核的なビジネスエンティティのデータである。",
      1: "参照データは国コード・通貨コード・ステータス区分など、他のデータを分類・標準化するための値の集合である。",
      2: "参照データはISOなどの外部標準に由来することがあり、変更頻度は比較的低いが、バージョン管理とシステム間の同期が重要になる。",
      3: "国コードや通貨コードはマスターデータの典型例であり、名寄せによるゴールデンレコード作成の主な対象になる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Dataversity - Master Data vs. Reference Data",
        url: "https://www.dataversity.net/articles/master-data-vs-reference-data/",
      },
      {
        title: "1Spatial - Master Data vs. Reference Data",
        url: "https://1spatial.com/news/master-data-vs-reference-data/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        データマネジメントにおけるマスターデータと参照データについて、
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
        両者はどちらも「複数システムで共有され、比較的安定している」ため混同されがちですが、
        役割が異なります。マスターデータはビジネスの「名詞」（エンティティそのもの）、
        参照データはそれを説明する「形容詞」（分類・コード値）に例えられます。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          国コードや通貨コードは他のデータを分類する値の集合であり、参照データの典型例です。
          名寄せ・重複排除によるゴールデンレコード作成は、複数システムに散在する
          顧客や製品といったマスターデータに対して行う活動です。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>マスターデータはトランザクションに文脈を与える中核エンティティのデータです。</li>
        <li>参照データは分類・標準化のための値の集合で、データ入力やレポートの一貫性を支えます。</li>
        <li>外部標準由来の参照データは、標準の改定に追従するバージョン管理と同期が運用の要点です。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        管理方法を決めるときは「重複した実体を統合したいのか（マスターデータ）、
        値のリストを統一したいのか（参照データ）」で切り分けると設計がぶれません。
        前者はマッチングとスチュワードシップの仕組み、後者はコード表の配布・同期の仕組みが中心になります。
      </p>
    </div>
  );
}
