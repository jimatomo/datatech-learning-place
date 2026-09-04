import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Cortex", "AI", "Datatech News"],
    created_at: new Date("2026-08-30"),
    updated_at: new Date("2026-08-30"),

    title: "Cortex Agents Coding AgentがGAに",
    question_jsx: <QuizQuestion />,
    options: {
      0: "2026年8月26日にGAとなった。code_toolset_all をCortex Agentに足すと、CoCoと同じランタイムのサンドボックスがプロビジョニングされる。",
      1: "サンドボックスにはbash、ファイルの読み書き・編集、grep、glob、Web検索、SQL実行、スキルが含まれる。ツール実行はSnowflake側が行い結果をストリームする。",
      2: "snowflake_sql_execute はSELECTとSHOWが中心で、ステージへの書き込みはできる。状態を変えるツールは既定でユーザー承認が必要である。",
      3: "code_toolset_all と code_execution は同じリクエストに両方指定でき、Python実行ツールとフルツールセットを同時に使える。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Release Notes - Cortex Agents Coding Agent GA (2026-08-26)",
        url: "https://docs.snowflake.com/en/release-notes/2026/other/2026-08-26-cortex-agents-coding-agent-ga",
      },
      {
        title: "Snowflake Documentation - Cortex Agents Coding Agent",
        url: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-coding-agent",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        2026年8月26日にGeneral AvailabilityとなったCortex Agents Coding Agentについて、
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
        Coding Agentは、CoCo相当のコーディング用サンドボックスを、自前のエージェントループなしでREST APIから使う仕組みです。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <code>code_toolset_all</code> と <code>code_execution</code> は排他です。
          同じリクエストに両方を書くとエラーになります。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>2026-08-26にGA。ツールタイプを足すだけでサンドボックスが用意されます。</li>
        <li>シェル・ファイル・検索・SQL・スキルまで一式あり、実行はSnowflakeが担います。</li>
        <li>SQLは読み取り中心。書き込み系は既定 <code>always_ask</code>。自動化だけ <code>always_allow</code> を使います。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        主目的が「コードを書いてファイルまで触る」なら <code>code_toolset_all</code>、
        Analyst / Search の横でPythonを少し走らせるだけなら軽い <code>code_execution</code> を選ぶ。
      </p>
    </div>
  );
}
