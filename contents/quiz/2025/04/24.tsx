import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Infrastructure", "Linux"],
    created_at: new Date("2025-04-24"),
    updated_at: new Date("2025-04-24"),

    // ----- quiz -----
    title: "psコマンドでのプロセス階層表示",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ps -f",
      1: "ps -l",
      2: "ps --forest",
      3: "ps -aux",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "LinuCレベル1 101試験の例題と解説 | Linux技術者認定試験 LinuC | LPI-Japan", url: "https://linuc.org/study/samples/5483/" },
      { title: "psコマンドについて詳しくまとめました 【Linuxコマンド集】", url: "https://eng-entrance.com/linux-command-ps" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        <code className="font-mono">ps</code> コマンドでプロセスの親子関係を階層表示（ツリー表示）するオプションはどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  const psfOutput = `\
UID          PID    PPID  C STIME TTY          TIME CMD
user        1234    1233  0 10:00 pts/0    00:00:00 bash
user        1235    1234  0 10:01 pts/0    00:00:00 ps -f`;

  const pslOutput = `\
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
4 S  1000  1234  1233  0  80   0 -  1234 wait   pts/0    00:00:00 bash
0 R  1000  1236  1234  0  80   0 -  5678 -      pts/0    00:00:00 ps -l`;

  const psForestOutput = `\
  PID TTY          TIME CMD
 1233 pts/0    00:00:00 systemd
 1234 pts/0    00:00:00  \\_ bash
 1237 pts/0    00:00:00      \\_ ps --forest`;

  const psAuxOutput = `\
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 123456  1234 ?        Ss   Apr23   0:01 /sbin/init
user      1234  0.0  0.0  23456  2345 pts/0    Ss   10:00   0:00 bash
user      1238  0.0  0.0  34567  3456 pts/0    R+   10:02   0:00 ps aux`;


  return (
    <div className="text-xs md:text-sm space-y-2">
      <p>
        正解は「<code className="font-mono">--forest</code> (ASCIIアートによるプロセスツリー)」です。このオプションを使うと、プロセスの親子関係が視覚的にわかりやすく表示されます。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <code className="font-mono">ps -f</code> (フルフォーマット):
          プロセスに関する詳細情報（UID, PID, PPID など）を表示しますが、階層構造は示しません。
          <CodeBlock code={psfOutput} title="ps -f の出力例 (イメージ)" />
        </li>
        <li>
          <code className="font-mono">ps -l</code> (ロングフォーマット):
          <code className="font-mono">-f</code> よりもさらに多くの情報（優先度 PRI, ナイス値 NI など）を表示しますが、これも階層表示ではありません。
          <CodeBlock code={pslOutput} title="ps -l の出力例 (イメージ)" />
        </li>
        <li>
          <strong className="text-emerald-500">ps --forest</strong>:
            プロセス間の親子関係をASCIIアートのツリー形式で表示します。どのプロセスがどのプロセスから起動されたかを一目で把握でき、特定のプロセスツリーのデバッグや、親子関係の調査に非常に役立ちます。
          <CodeBlock code={psForestOutput} title="ps --forest の出力例 (イメージ)" />
        </li>
        <li>
          <code className="font-mono">ps aux</code>:
          BSDスタイルのオプションの組み合わせで、システム上の全ユーザーのプロセスを詳細情報付きで表示します（<code className="font-mono">a</code>: 全ユーザー、<code className="font-mono">u</code>: ユーザー指向フォーマット、<code className="font-mono">x</code>: TTYなしプロセス）。これも階層表示はしません。システム全体のプロセス状態を把握する際によく使われます。
          <CodeBlock code={psAuxOutput} title="ps aux の出力例 (イメージ)" />
        </li>
      </ul>
      <p>
        ちなみに、プロセスの階層構造を表示する専用のコマンドとして <code className="font-mono">pstree</code> もあります。<code className="font-mono">pstree</code> はデフォルトでツリー表示を行い、より多くのオプションで表示をカスタマイズできます。<code className="font-mono">ps --forest</code> は <code className="font-mono">ps</code> コマンドの他のオプション（例: <code className="font-mono">-u</code>, <code className="font-mono">-p</code>）と組み合わせて使える点が便利です。
      </p>
    </div>
  );
} 
