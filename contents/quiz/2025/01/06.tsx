import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    tags: ["AWS", "S3", "Storage", "Engineering"],
    created_at: new Date("2025-01-05"),
    updated_at: new Date("2025-01-05"),
    // previous_quiz_id: "Q20250104",
    // next_quiz_id: "Q20250106",

    // ----- quiz -----
    title: "Amazon S3のストレージクラスについて、正しい説明を選んでください",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "S3 Standard-IAはアクセス頻度が低いデータ向けで、最小保存期間は30日", 
      1: "S3 Glacierは即時取り出しが可能", 
      2: "S3 One Zone-IAは単一のAZにのみデータを保存する", 
      3: "S3 Standardは最小保存期間の制約がある", 
      4: "S3 Intelligent-Tieringは自動的にデータを最適なストレージクラスに移動する"
    },
    answers: [0, 2, 4],
    explanation: "S3のストレージクラスについて、以下が正しい説明です：\n\n- S3 Standard-IAは低頻度アクセスのデータ向けで、最小保存期間は30日です\n- S3 One Zone-IAは単一のAZにデータを保存し、コストを抑えることができます\n- S3 Intelligent-Tieringはアクセスパターンに基づいて自動的に最適なストレージクラスにデータを移動します\n\n一方で、S3 Glacierは即時取り出しができず、取り出しに数分から数時間かかります。また、S3 Standardには最小保存期間の制約はありません。",
    references: [
      { title: "Amazon S3 ストレージクラス", url: "https://aws.amazon.com/jp/s3/storage-classes/" },
      { title: "S3 Intelligent-Tiering", url: "https://aws.amazon.com/jp/s3/storage-classes/intelligent-tiering/" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <h1>Amazon S3のストレージクラスについて、正しい説明を選んでください</h1>
      <Table className="text-left">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
