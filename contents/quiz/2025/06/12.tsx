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
    created_at: new Date("2025-06-12"),
    updated_at: new Date("2025-06-12"),

    // ----- quiz -----
    title: "Linux ファイルパーミッションの読解",
    question_jsx: <QuizQuestion />,
    options: {
      0: "所有者はこのファイルに対して読み取り、書き込み、実行の全ての権限を持っています。",
      1: "group グループに所属するユーザーは、このファイルを読み取り、実行することができます。",
      2: "システムのどのユーザーでも、このファイルを読み取り、実行することが可能です。",
      3: "このファイルにはSUIDビットが設定されているため、誰が実行しても所有者の権限で動作します。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Man page of ls", url: "https://man7.org/linux/man-pages/man1/ls.1.html" },
      { title: "File permissions and attributes (ArchWiki)", url: "https://wiki.archlinux.org/title/File_permissions_and_attributes" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  const code = `-rwxr-xr-x 1 user group 4096 Jun 12 10:30 myscript.sh`;
  return (
    <div>
      <p className="pb-3">
        以下の <code>ls -l</code> コマンドの出力結果を参考にして、ファイルのパーミッションに関する説明のうち、<strong className="text-red-500">誤っているもの</strong>を1つ選んでください。
      </p>
      <CodeBlock code={code} showLineNumbers={false} />
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm space-y-2">
      <p>
        <code>ls -l</code> コマンドの出力の最初のフィールド（例：<code>-rwxr-xr-x</code>）は、ファイルタイプとパーミッション（権限）を示します。この10文字は以下のように分解できます。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li><strong>1文字目</strong>: ファイルタイプ (<code>-</code>: 通常ファイル, <code>d</code>: ディレクトリ, <code>l</code>: シンボリックリンクなど)</li>
        <li><strong>2-4文字目</strong>: 所有者のパーミッション (r: 読み取り, w: 書き込み, x: 実行)</li>
        <li><strong>5-7文字目</strong>: グループのパーミッション</li>
        <li><strong>8-10文字目</strong>: その他のユーザーのパーミッション</li>
      </ul>
      <p>
        出力例： <code>-rwxr-xr-x</code>
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-red-500">所有者はこのファイルに対して読み取り、書き込み、実行の全ての権限を持っています。</strong>：これは正しい記述です。パーミッションの <code>rwx</code> 部分が所有者の権限を示しており、読み取り(r), 書き込み(w), 実行(x)が許可されています。
        </li>
        <li>
          <strong className="text-red-500">group グループに所属するユーザーは、このファイルを読み取り、実行することができます。</strong>：これも正しい記述です。中央の <code>r-x</code> 部分がグループの権限で、読み取り(r)と実行(x)が許可されていますが、書き込み(w)は許可されていません。
        </li>
        <li>
          <strong className="text-red-500">システムのどのユーザーでも、このファイルを読み取り、実行することが可能です。</strong>：これも正しい記述です。最後の <code>r-x</code> 部分が「その他」のユーザーの権限で、読み取り(r)と実行(x)が許可されています。
        </li>
        <li>
          <strong className="text-emerald-500">このファイルにはSUIDビットが設定されているため、誰が実行しても所有者の権限で動作します。</strong>：これが正解の選択肢です。この記述は誤っています。SUID (Set User ID) ビットが設定されている場合、所有者の実行権限が <code>x</code> の代わりに <code>s</code> と表示されます。このファイルのパーミッションは <code>-rwxr-xr-x</code> であり、<code>s</code> が含まれていないため、SUIDビットは設定されていません。
        </li>
      </ul>
      <p>
        <strong>解説:</strong><br />
        SUIDは特殊なパーミッションの一つで、実行ファイルに設定されると、そのファイルを実行したユーザーに関わらず、ファイルの所有者の権限でプログラムが動作します。例えば、所有者が <code>root</code> のファイルにSUIDが設定されていると、一般ユーザーが実行しても <code>root</code> 権限で動作するため、慎重な扱いが必要です。パーミッション文字列では、所有者の実行権限が <code>s</code> (または <code>S</code>) になることで示されます。
      </p>
    </div>
  );
} 
