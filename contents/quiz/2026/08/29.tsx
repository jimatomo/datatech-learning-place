import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Governance", "Data Architecture", "Data Quality", "Data Management"],
    created_at: new Date("2026-08-29"),
    updated_at: new Date("2026-08-29"),

    title: "データカタログの役割と限界",
    question_jsx: <QuizQuestion />,
    options: {
      0: "組織が扱うデータ資産のインベントリであり、発見・分類・文脈共有を支える。実データの保管庫そのものではない。",
      1: "メタデータとして、場所・スキーマなどの技術情報に加え、用途や機密区分などのビジネス文脈、更新履歴などの運用情報を持てる。",
      2: "データガバナンスは方針と責任の枠組みで、カタログはその方針を実装・追跡するための技術の一つである。",
      3: "カタログにデータそのものを複製して保管するため、カタログを置けば品質・権限・鮮度は自動的に保証される。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "AWS - What is a Data Catalog?",
        url: "https://aws.amazon.com/what-is/data-catalog/",
      },
      {
        title: "AWS Glue Documentation - Data discovery and cataloging",
        url: "https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        データカタログについて、
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
        データカタログは「何がどこにあり、どういう意味か」を探すための目録です。倉庫そのものではありません。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          カタログが持つのはメタデータです。実体のコピーを集めて品質や権限を自動保証する仕組みではありません。
          品質ルール、アクセス制御、鮮度のSLAは別レイヤです。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>探索と文脈共有が主目的で、アナリストがITに毎回聞かずに資産へ辿れるようにします。</li>
        <li>技術・ビジネス・運用の3種のメタデータを載せると、検索と信頼が上がります。</li>
        <li>ガバナンスが「使ってよい条件」を決め、カタログはそれを見える形にする道具です。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「カタログを入れた＝データが整備された」と見なさない。
        まず誰が何を探せずに困っているかを決め、その検索に必要なメタデータ項目だけを埋める。
      </p>
    </div>
  );
}
