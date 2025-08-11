import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Application", "Infrastructure"],
    created_at: new Date("2025-05-09"),
    updated_at: new Date("2025-05-09"),
    title: "CSVの標準規格 (RFC 4180) に関する理解",
    question_jsx: <QuizQuestion />,
    options: {
      0: "各レコードは、CRLF (キャリッジリターンとラインフィード) によって区切られる。",
      1: "フィールド内に改行、ダブルクォート、またはカンマが含まれる場合、そのフィールド全体をダブルクォートで囲む必要がある。",
      2: "ダブルクォートで囲まれたフィールド内にダブルクォート文字そのものを含める場合、そのダブルクォートの前にバックスラッシュ(\\\\)を付けてエスケープする。",
      3: "ファイルの最初の行には、レコードと同じフォーマットのヘッダー行をオプションで含めることができる。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "RFC 4180 - Common Format and MIME Type for Comma-Separated Values (CSV) Files", url: "https://www.ietf.org/rfc/rfc4180.txt" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        RFC 4180 で定義されている CSV (Comma-Separated Values) ファイル形式に関する記述として、<span className="text-red-500">適切でないもの</span>はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  const rfcQuoteEscaping = '"aaa","b""bb","ccc"';

  return (
    <div className="text-xs md:text-sm">
      <p>
        RFC 4180 は、CSV ファイル形式の共通フォーマットと MIME タイプ text/csv を文書化しています。
        多くのスプレッドシートプログラムやデータ交換で広く利用されている形式ですが、
        厳密な統一仕様が存在しなかったため、このRFCで一般的な実装に基づいた定義が試みられています。
      </p>

      <p className="py-2 font-semibold">各選択肢の解説：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>各レコードは、CRLF (キャリッジリターンとラインフィード) によって区切られる。：</strong>
          <br />
          これは正しい記載です。RFC 4180 のセクション2の1項には、「Each record is located on a separate line, delimited by a line break (CRLF).」と記述されています。
        </li>
        <li className="pt-2">
          <strong>フィールド内に改行、ダブルクォート、またはカンマが含まれる場合、そのフィールド全体をダブルクォートで囲む必要がある。：</strong>
          <br />
          これも正しい記載です。RFC 4180 のセクション2の6項には、「Fields containing line breaks (CRLF), double quotes, and commas should be enclosed in double-quotes.」と記述されています。
        </li>
        <li className="pt-2">
          <strong>ダブルクォートで囲まれたフィールド内にダブルクォート文字そのものを含める場合、そのダブルクォートの前にバックスラッシュ(\\\\)を付けてエスケープする。：</strong>
          <br />
          <span className="text-red-500 font-semibold">これは適切ではありません。</span>
          RFC 4180 のセクション2の7項には、「If double-quotes are used to enclose fields, then a double-quote appearing inside a field must be escaped by preceding it with another double quote.」と記述されています。
          つまり、ダブルクォートを2つ連続させることでエスケープします。バックスラッシュは使用しません。
          <p className="pt-1 pb-3">例:</p>
          <CodeBlock code={rfcQuoteEscaping} showLineNumbers={false} />
        </li>
        <li className="pt-4">
          <strong>ファイルの最初の行には、レコードと同じフォーマットのヘッダー行をオプションで含めることができる。：</strong>
          <br />
          これは正しい記載です。
          RFC 4180 のセクション2の3項には、「There maybe an optional header line appearing as the first line of the file with the same format as normal record lines.」と記述されています。
          ヘッダーの有無は MIME タイプの header パラメータで示すことができます。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        CSVファイル形式は広く使われていますが、その解釈には多様性があります。RFC 4180 は、最も一般的な実装に基づいた仕様を提示しており、特にダブルクォートによるフィールドの囲み方と、その中でのダブルクォート文字のエスケープ方法（ダブルクォートを重ねる）は重要なポイントです。
      </p>
    </div>
  );
} 