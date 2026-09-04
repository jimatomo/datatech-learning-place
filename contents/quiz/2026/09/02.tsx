import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Architecture", "Data Storage", "SQL", "Data Modeling"],
    created_at: new Date("2026-09-02"),
    updated_at: new Date("2026-09-04"),

    title: "Role-Playing Dimensionの使い所",
    question_jsx: <QuizQuestion />,
    options: {
      0: "受注日用と出荷日用に日付ディメンションをコピーして2テーブルにする。列名が衝突せず、会計カレンダーの修正もテーブルごとに独立に直せる。",
      1: "日付ディメンションは1つにそろえ、ファクトは受注日キーと出荷日キーを持つ。同じカレンダーを、受注用／出荷用で列名を変えた参照として2回つなぐ。",
      2: "受注日と出荷日はファクトの日付列のままでよい。月次集計ならファクトに受注月・出荷月を持てば足り、日付ディメンションは不要である。",
      3: "受注と出荷は別プロセスなのでファクトを分ける。商品ディメンションを適合させれば、受注側の日付と出荷側の日付を同じレポートに並べられる。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Kimball Group - Role-Playing Dimensions",
        url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/role-playing-dimension/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        通販の受注ファクト（粒度は受注1件1行）です。同じ行に受注日と出荷日があり、
        受注した月ごとの売上と、出荷した月ごとの売上の両方を見たいとします。
      </p>
      <Table className="my-3">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">受注ID</TableHead>
            <TableHead className="text-center">受注日</TableHead>
            <TableHead className="text-center">出荷日</TableHead>
            <TableHead className="text-center">売上</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">501</TableCell>
            <TableCell className="text-center">1/15</TableCell>
            <TableCell className="text-center">2/3</TableCell>
            <TableCell className="text-center">12,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">502</TableCell>
            <TableCell className="text-center">1/20</TableCell>
            <TableCell className="text-center">1/22</TableCell>
            <TableCell className="text-center">8,000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>
        祝日フラグや会計週は、どちらの切り口でも同じカレンダー定義にしたい。
        日付の持ち方として
        <strong className="text-green-600">最も適切なもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        同じ注文が、見る日付の役割によって別の月に属します。これが Role-Playing Dimension の出番です。
      </p>
      <p className="font-semibold mt-2">501 と 502 を月で切ると:</p>
      <Table className="my-2">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">切り口</TableHead>
            <TableHead className="text-center">1月</TableHead>
            <TableHead className="text-center">2月</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>受注月の売上</TableCell>
            <TableCell className="text-center">20,000（501+502）</TableCell>
            <TableCell className="text-center">0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>出荷月の売上</TableCell>
            <TableCell className="text-center">8,000（502のみ）</TableCell>
            <TableCell className="text-center">12,000（501のみ）</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>
        501は「1月の受注」だが「2月の出荷」です。行を分けているのではなく、同じ行の日付を役割で読み替えています。
        会計週や祝日フラグを両方の切り口で同じ意味にしたいなら、カレンダー実体は1つです。
        ファクトから受注日キーと出荷日キーで2回つなぎ、列名だけ役割ごとに変えた参照（ビュー）をかませます。
      </p>
      <p className="font-semibold text-emerald-600 mt-2">適切な設計（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          物理的な日付ディメンションは1つ。ファクトはキーを2本持つ。
          参照側の列名を <code>order_month</code> / <code>ship_month</code> のように分けると、1つのSELECTで両方の切り口を同時に使えます。
        </li>
      </ul>
      <p className="font-semibold text-red-500">他の設計:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          日付テーブルをコピーすると、会計カレンダーの修正が分岐します。
          「独立に直せる」は利点ではなく、定義がずれる原因です。
        </li>
        <li>
          ファクトに月を直置きすると、今月の集計はできても祝日や会計週を共有できません。
          日付に属性があるならディメンションです。
        </li>
        <li>
          商品を適合させるのは、受注ファクトと在庫ファクトなど別プロセスを横断する話です。
          501の受注日と出荷日は同じ行の2つの役割であり、ファクト分割では解けません。
        </li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        1つのファクトに日付が複数あるときはコピーせず、同じカレンダーを役割で読む。
        プロセスをまたいでキーの意味を揃えるのは適合ディメンションで、役割分けとは別の問題です。
      </p>
    </div>
  );
}
