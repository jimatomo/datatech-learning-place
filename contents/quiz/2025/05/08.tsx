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
    created_at: new Date("2025-05-08"),
    updated_at: new Date("2025-05-08"),

    // ----- quiz -----
    title: "Linux awkコマンドの基本構文",
    question_jsx: <QuizQuestion />,
    options: {
      0: "処理対象のファイル名",
      1: "パターンに一致した行に対して実行する操作",
      2: "処理する行を特定するための条件式",
      3: "コマンドの動作を制御するための追加指示",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Linuxのawkコマンド入門｜初心者向け基本構文＆実践例 - エンベーダー", url: "https://envader.plus/article/525" },
      { title: "awkコマンドの基本 - Qiita", url: "https://qiita.com/yamazon/items/563af1b485ff413d381f" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  const awkSyntax = "awk [オプション] 'パターン { アクション }' ファイル名";
  return (
    <div>
      <p className="pb-3">Linuxのawkコマンドの基本構文は次の通りです。</p>
      <CodeBlock code={awkSyntax} showLineNumbers={false} />
      <p className="pt-3">この構文において、<strong>アクション</strong>の部分は何を指定するものでしょうか？</p>
    </div>
  );
}

function QuizExplanation() {
  const awkSyntax = "awk [オプション] 'パターン { アクション }' ファイル名";
  const actionPart = "{ アクション }";
  const exampleAwkCommand = "awk '{ print $1 }' file.txt";

  return (
    <div className="text-xs md:text-sm space-y-2">
      <p>
        正解は「<strong className="text-emerald-500">パターンに一致した行に対して実行する操作</strong>」です。
        awkコマンドの基本構文 <CodeBlock code={awkSyntax} /> において、各要素は以下の役割を持ちます。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          処理対象のファイル名: これは <code>ファイル名</code> の部分で指定します。awkが処理するテキストファイルです。
        </li>
        <li>
          <strong className="text-emerald-500">パターンに一致した行に対して実行する操作</strong>:
          これが <CodeBlock code={actionPart} /> の部分に該当します。パターンで指定した条件にマッチした行に対して、具体的にどのような処理（例: 表示、計算、編集など）を行うかを記述します。
        </li>
        <li>
          処理する行を特定するための条件式: これは <code>パターン</code> の部分で指定します。この条件に一致する行だけがアクションの対象となります。省略された場合は全ての行が対象です。
        </li>
        <li>
          コマンドの動作を制御するための追加指示: これは <code>[オプション]</code> の部分で指定します。例えば、フィールド区切り文字を指定する <code>-F</code> オプションなどがあります。
        </li>
      </ul>
      <p>
        <strong>解説:</strong><br />
        awkコマンドでは、まず入力テキストを1行ずつ読み込み、各行を指定された区切り文字（デフォルトは空白）でフィールドに分割します。次に、<code>パターン</code>で指定された条件にその行が一致するかどうかを確認します。一致した場合にのみ、<CodeBlock code={actionPart} />で指定された処理が実行されます。
      </p>
      <p>
        例えば、次のコマンドでは、<code>file.txt</code> の各行の最初のフィールド (<code>$1</code>) を表示 (<code>print</code>) します。この場合、パターンは省略されているため、全ての行が処理対象となります。
        <CodeBlock code={exampleAwkCommand} />
      </p>
    </div>
  );
} 
