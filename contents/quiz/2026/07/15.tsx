import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Codex",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Architecture", "Data Management", "Data Storage", "Data Modeling"],
    created_at: new Date("2026-07-15"),
    updated_at: new Date("2026-07-15"),

    title: "受注フルフィルメントを追うAccumulating Snapshot Fact Table",
    question_jsx: <QuizQuestion />,
    options: {
      0: "grainを「受注明細ごとに1行」とし、受注時に行をINSERTした後、出荷や配達の完了に合わせて同じ行のmilestone date keyとlag factをUPDATEする。",
      1: "ORDER_DATE_KEY、PAYMENT_DATE_KEY、SHIP_DATE_KEY、DELIVERY_DATE_KEYは、同じDate Dimensionを異なる役割で参照するrole-playing dimensionとして扱う。",
      2: "受注から各milestoneまでのlagを保持すれば、工程間の所要日数、平均lead time、SLA超過、現在停滞している受注明細などを分析しやすい。",
      3: "工程の状態遷移をすべて追記するTransaction Fact TableだけをAccumulating Snapshotとして扱い、受注明細ごとの現在地点を表す行は作成しない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Kimball Group - Accumulating Snapshot Fact Tables",
        url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/accumulating-snapshot-fact-table/",
      },
      {
        title: "Kimball Group - Lag/Duration Facts",
        url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/lag-duration-fact/",
      },
      {
        title: "Kimball Group - Complementary Fact Table Types",
        url: "https://www.kimballgroup.com/2014/06/design-tip-167-complementary-fact-table-types/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        ECサイトの受注フルフィルメントについて、受注から配達までの処理速度と、現在どの工程で停滞しているかを分析したいとします。
        次の表は、grainを「受注明細ごとに1行」としたAccumulating Snapshot Fact Tableの行例です。
      </p>
      <Table className="my-4">
        <TableHeader>
          <TableRow>
            <TableHead>ORDER_LINE</TableHead>
            <TableHead>MILESTONES</TableHead>
            <TableHead>STAGE</TableHead>
            <TableHead>ORDER_TO_SHIP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>501</TableCell>
            <TableCell>
              <div>ORDER: 7/1</div>
              <div>PAYMENT: 7/1</div>
              <div>SHIP: 7/3</div>
              <div>DELIVERY: 未到達</div>
            </TableCell>
            <TableCell>SHIPPED</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>
        このFact Tableの設計と利用方法について、
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
        Accumulating Snapshot Fact Tableは、開始点、主要な中間工程、終了点がある予測可能なpipeline processを、
        process instanceごとに1行で要約します。受注フルフィルメントなら、grainは「受注ごと」ではなく、
        分割出荷などを考慮して「受注明細ごと」と定義するのが典型例です。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          Transaction Fact Tableは「支払完了」「出荷完了」のような個々のeventを1行ずつ記録するため、
          詳細な状態遷移の履歴には向いています。しかし、受注明細の現在地点やprocess全体のlead timeを確認するには、
          複数行を並べて再構成する必要があります。これだけをAccumulating Snapshotとして扱うのは誤りです。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">行が更新されるイメージ:</p>
      <ul className="list-disc pl-4 py-2">
        <li><strong>7/1 受注:</strong> 行をINSERTし、ORDER_DATE_KEYを設定します。未到達のmilestoneは、組織のDate Dimension設計に従って「未到達」を表すkeyなどで識別します。</li>
        <li><strong>7/1 支払完了:</strong> 同じ行のPAYMENT_DATE_KEYと支払までのlagをUPDATEします。</li>
        <li><strong>7/3 出荷完了:</strong> SHIP_DATE_KEY、ORDER_TO_SHIP_DAYS = 2、現在工程などをUPDATEします。</li>
        <li><strong>配達完了:</strong> DELIVERY_DATE_KEYとend-to-endのlead timeをUPDATEし、processが完了します。</li>
      </ul>
      <p className="font-semibold text-emerald-600">実務で答えやすくなる問い:</p>
      <ul className="list-disc pl-4 py-2">
        <li>平均で受注から出荷まで何日かかっているか。</li>
        <li>配送業者、商品、倉庫、顧客地域によってlead timeに差があるか。</li>
        <li>現在、出荷待ちのままSLAを超過している受注明細はどれか。</li>
        <li>どのmilestoneがボトルネックになっているか。</li>
      </ul>
      <p className="font-semibold text-amber-600">ほかのFact Tableとの使い分け:</p>
      <ul className="list-disc pl-4 py-2">
        <li><strong>Transaction Fact:</strong> eventごとの詳細や、工程を行き来した履歴を残す場合に併用します。</li>
        <li><strong>Periodic Snapshot Fact:</strong> 日次の出荷待ち件数など、過去の各時点におけるpipelineの在庫量や状態を再現する場合に併用します。</li>
        <li><strong>Accumulating Snapshot Fact:</strong> processの現在状態と、milestone間の速度・効率を見る用途に適しています。</li>
      </ul>
      <p>
        標準的なAccumulating Snapshotは同じ行を更新するため、過去の任意時点の状態や複雑なループ履歴を単独では完全に再現できません。
        要件に応じてTransaction FactやPeriodic Snapshotを補完的に設計することが重要です。
      </p>
    </div>
  );
}
