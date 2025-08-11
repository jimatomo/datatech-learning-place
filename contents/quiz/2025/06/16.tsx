import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
// CodeBlockをインポートしましたが、利用箇所がないため削除します
// import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Basic", "Data Integration"],
    created_at: new Date("2025-06-16"),
    updated_at: new Date("2025-06-16"),

    // ----- quiz -----
    title: "Snowpipeのロード履歴と重複データロード防止の仕組み",
    question_jsx: <QuizQuestion />,
    options: {
      0: "CREATE OR REPLACE PIPE 構文でパイプを再作成した場合、ロード履歴は維持されるため、既存ファイルが重複してロードされることはない。",
      1: "Snowpipeは、ファイルパスとファイル名に加えて、ファイル内容のハッシュ値（eTag）も記録し、内容が変更された同名ファイルの再ロードを判断する。",
      2: "パイプを再作成するとロード履歴が失われ、ステージ上の既存ファイルが再ロードされる可能性があるため、`ALTER PIPE ... REFRESH` を使用して、指定期間内にステージングされた未ロードのファイルのみをロードする方法が推奨される。",
      3: "Snowpipeのロード履歴は `information_schema.load_history` ビューで確認でき、この履歴はデフォルトで1年間保持される。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowpipe - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/data-load-snowpipe-intro"
      },
      {
        title: "Snowpipeの管理 - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/data-load-snowpipe-manage#label-snowpipe-management-recreate-pipes"
      }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        SnowflakeのSnowpipeにおけるロード履歴とデータの重複ロード防止に関する記述として、最も適切なものを1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowpipeのデータロードの仕組みと、特にロード履歴の管理方法についての理解は、意図しないデータの重複やロード漏れを防ぐために重要です。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong>CREATE OR REPLACE PIPE 構文でパイプを再作成した場合、ロード履歴は維持されるため、既存ファイルが重複してロードされることはない。</strong>：
          これは誤った記載です。<code>CREATE OR REPLACE PIPE</code> を実行すると、既存のパイプはアトミックにドロップされてから再作成されるため、Snowpipeが内部で保持しているロード履歴（どのファイルがロード済みかを示すメタデータ）は失われます。その結果、ステージ上に存在するファイルが再度ロードされる可能性があります。
        </li>
        <li>
          <strong>Snowpipeは、ファイルパスとファイル名に加えて、ファイル内容のハッシュ値（eTag）も記録し、内容が変更された同名ファイルの再ロードを判断する。</strong>：
          これも誤った記載です。Snowpipeの重複ロード防止機能は、ロードされたファイルのパスと名前のみをメタデータとして記録します。ファイルの内容が変更されていても（e.g., eTagが異なっていても）、一度ロードされたファイルと<strong>同じ名前</strong>のファイルは再ロードされません。
        </li>
        <li>
          <strong className="text-emerald-500">パイプを再作成するとロード履歴が失われ、ステージ上の既存ファイルが再ロードされる可能性があるため、`ALTER PIPE ... REFRESH` を使用して、指定期間内にステージングされた未ロードのファイルのみをロードする方法が推奨される。</strong>：
          これが正しい記載です。パイプの定義を変更したい場合など、パイプを再作成する必要がある際には、重複ロードのリスクを考慮する必要があります。<code>ALTER PIPE ... REFRESH</code> は、パイプを再開する際に、指定した期間（デフォルトは7日間）にステージングされたファイルのうち、まだロードされていないものだけをロードキューに追加する機能です。これにより、意図しない重複ロードを避けつつ、ロード対象のファイルを制御できます。
        </li>
        <li>
          <strong>Snowpipeのロード履歴は `information_schema.load_history` ビューで確認でき、この履歴はデフォルトで1年間保持される。</strong>：
          これは誤った記載です。Snowpipeによるロード履歴は、<code>SNOWFLAKE.ACCOUNT_USAGE.COPY_HISTORY</code> ビューまたは <code>SNOWFLAKE.ACCOUNT_USAGE.LOAD_HISTORY</code> ビューで確認する必要があります（閲覧には適切な権限が必要です）。また、これらのビューで確認できる履歴の保持期間は14日間です。<code>information_schema.load_history</code>は主に手動のCOPYコマンドの履歴を参照するためのもので、Snowpipeのロードとは異なります。
        </li>
      </ul>
    </div>
  );
} 
