import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Linux", "split", "Data Application"],
    created_at: new Date("2025-03-20"),
    updated_at: new Date("2025-03-20"),

    // ----- quiz -----
    title: "巨大なCSVファイルの分割方法",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "split -b 100M big_file.csv split_file_",
      1: "split -l 1000 big_file.csv split_file_",
      2: "split -n 5 big_file.csv split_file_",
      3: "split -a 3 big_file.csv split_file_",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "splitコマンドのマニュアル", url: "https://man7.org/linux/man-pages/man1/split.1.html" },
      { title: "Linux File Splitting Guide", url: "https://www.gnu.org/software/coreutils/manual/html_node/split-invocation.html" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <>
      <p>
        巨大なCSVファイル（big_file.csv）を100MB単位で分割したいと考えています。
        この条件を満たすために最適なLinuxコマンドはどれでしょうか？
      </p>
    </>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>巨大なCSVファイルを分割するためのLinuxコマンドに関する問題です。</p>
      <p className="pt-4">選択肢の解説:</p>
      <ul className="list-disc pl-4">
        <li className="pt-2">「split -b 100M big_file.csv split_file_」：<span className="text-emerald-500">正解です</span>。-bオプションでファイルを指定したバイトサイズ（この場合は100MB）ごとに分割します。</li>
        <li className="pt-2">「split -l 1000 big_file.csv split_file_」：-lオプションは行数で分割するオプションです。この場合、1000行ごとにファイルを分割するため、100MBという条件を満たせません。</li>
        <li className="pt-2">「split -n 5 big_file.csv split_file_」：-nオプションはファイルを指定した数（この場合は5つ）に分割するオプションです。ファイルサイズによって分割サイズが異なるため、100MB単位での分割という条件を満たせません。</li>
        <li className="pt-2">「split -a 3 big_file.csv split_file_」：-aオプションはサフィックスの桁数を指定するオプションです。この場合、3桁のサフィックスが生成されます。</li>
      </ul>
      <p className="pt-4">splitコマンドの主要なオプション:</p>
      <ul className="list-disc pl-4">
        <li className="pt-2">-b SIZE：指定されたサイズ（バイト単位）ごとにファイルを分割。K（キロバイト）、M（メガバイト）、G（ギガバイト）などの単位を使用可能</li>
        <li className="pt-2">-l LINES：指定された行数ごとにファイルを分割</li>
        <li className="pt-2">-n CHUNKS：ファイルを指定した数のチャンクに分割</li>
        <li className="pt-2">-a SUFFIX_LENGTH：サフィックスの桁数を指定</li>
        <li className="pt-2">-d：アルファベットではなく数字をサフィックスとして使用</li>
        <li className="pt-2">--additional-suffix=SUFFIX：出力ファイル名に追加のサフィックスを付ける</li>
      </ul>
      <p className="pt-4">
        大容量のCSVファイルを処理する際、このようなファイル分割テクニックは非常に役立ちます。
        特にSnowflakeなどの従量課金のクラウドDWHの場合は適切なサイズに分割して処理をすることで、
        処理時間の短縮が期待できるので、是非テクニックとして覚えておくと良いでしょう。
      </p>
    </div>
  );
} 
