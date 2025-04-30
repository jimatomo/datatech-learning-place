import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "CLI", "Node Selection", "Data Modeling"],
    created_at: new Date("2025-04-30"),
    updated_at: new Date("2025-04-30"),

    // ----- quiz -----
    title: "dbt のノード選択におけるグラフ演算子について",
    question_jsx: <QuizQuestion />,
    options: {
      0: "my_model+ は my_model とその全ての子孫（下流の依存関係）を選択する。",
      1: "+my_model は my_model とその全ての祖先（上流の依存関係）を選択する。",
      2: "@my_model は +my_model+ と同じ範囲のノードを選択する。",
      3: "@my_model は my_model、その子孫、およびその子孫の全ての祖先を選択する。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Graph operators | dbt Docs", url: "https://docs.getdbt.com/reference/node-selection/graph-operators" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        dbt のモデル選択で使用されるグラフ演算子（+, @）に関する説明のうち、<strong className="text-red-500">誤っているもの</strong>を1つ選択してください。
        これらの演算子は、dbt run --select や dbt build --select などのコマンドで、実行対象のノード（モデル、テスト、シードなど）を指定する際に使用されます。
      </p>
    </div>
  );
}

function QuizExplanation() {
  const plus_operator_code = `
dbt run --select "my_model+"         # my_model とその全ての子孫を選択 (my_model+ と同じ)
dbt run --select "my_model+2"       # my_model とその2階層下までの子孫を選択
dbt run --select "+my_model"         # my_model とその全ての祖先を選択 (+my_model と同じ)
dbt run --select "1+my_model"       # my_model とその1階層上までの祖先を選択
dbt run --select "1+my_model+2"      # my_model、その1階層上までの祖先、2階層下までの子孫を選択
  `.trim();

  const at_operator_code = `
dbt run --select "@my_model"         # my_model、その子孫、およびその子孫の全ての祖先を選択
  `.trim();

  return (
    <div className="text-xs md:text-sm">
      <p>
        dbt では、--select フラグと特定の構文（セレクタ）を使用して、コマンドの対象となるノードを柔軟に指定できます。グラフ演算子はその中でも特に強力な機能の一つです。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>my_model+ は my_model とその全ての子孫（下流の依存関係）を選択する:</strong>
          <br />
          これは正しい説明です。+ をモデル名の後に置くと、指定したモデル自身と、それに依存する全てのダウンストリームのノードが選択対象となります。
          数字 n を付けて my_model+n のように指定すると、n 階層下までの子孫に限定できます。数字がない場合は全ての子孫を選択します。
        </li>
        <li>
          <strong>+my_model は my_model とその全ての祖先（上流の依存関係）を選択する:</strong>
          <br />
          これも正しい説明です。+ をモデル名の前に置くと、指定したモデル自身と、それが依存している全てのアップストリームのノードが選択対象となります。
          数字 n を付けて n+my_model のように指定すると、n 階層上までの祖先に限定できます。数字がない場合は全ての祖先を選択します。
          <div className="py-2">
            <CodeBlock code={plus_operator_code} showLineNumbers={false} />
          </div>
        </li>
        <li>
          <strong>@my_model は my_model、その子孫、およびその子孫の全ての祖先を選択する:</strong>
          <br />
          これは正しい説明です。@ 演算子（モデル名の前にのみ置ける）は、指定したモデル、その全ての子孫、さらに<strong className="text-emerald-500">それらの子孫を実行するために必要な全ての祖先</strong>を選択します。これはCI環境などで、関連する全てのモデルを確実にビルド・テストしたい場合に特に便利です。
          <div className="py-2">
            <CodeBlock code={at_operator_code} showLineNumbers={false} />
          </div>
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">誤った選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong className="text-red-500">@my_model は +my_model+ と同じ範囲のノードを選択する:</strong>
          <br />
          これは誤りです。+my_model+ (または n+my_model+m の形式) は my_model 自身とその指定された階層（または全て）の祖先および子孫を選択します。
          一方、@my_model は my_model 自身とその全ての子孫、さらにその子孫の全ての祖先を選択します。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
      </p>
      <p className="pt-2">
        + 演算子は依存関係（祖先・子孫）を辿るのに使用し、前後の数字で階層数を指定できます。@ 演算子は、選択したモデルとその子孫、さらにそれら子孫の実行に必要な全ての祖先を含める場合に便利です。これらの演算子を使いこなすことで、dbt プロジェクトの特定の部分だけを効率的に実行・テストできます。
      </p>
    </div>
  );
} 
