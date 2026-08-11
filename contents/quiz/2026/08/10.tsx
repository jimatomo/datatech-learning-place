import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Operation", "Performance", "Snowflake Basic"],
    created_at: new Date("2026-08-10"),
    updated_at: new Date("2026-08-10"),

    title: "Resource Monitorでクレジット消費を抑える",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Resource Monitorは仮想ウェアハウスのクレジット消費を監視し、閾値到達時に通知やサスペンドなどのアクションを実行できる。",
      1: "アカウントにはアカウント全体を監視するモニターを1つだけ設定でき、加えて倉庫単位のモニターを複数持てる。倉庫はアカウント未満のモニターに1つまでしか割り当てられない。",
      2: "Notify / Notify & Suspend / Notify & Suspend Immediately などのアクションを閾値（クレジット割当に対する割合）と組み合わせて定義する。",
      3: "Resource MonitorだけでSnowpipeや自動クラスタリングなどのサーバーレス機能とAIサービスのクレジット消費も上限管理できるため、Budgetは不要である。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Documentation - Working with resource monitors",
        url: "https://docs.snowflake.com/en/user-guide/resource-monitors",
      },
      {
        title: "Snowflake Documentation - Budgets",
        url: "https://docs.snowflake.com/en/user-guide/budgets",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        SnowflakeのResource Monitorについて、
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
        Resource Monitorは、想定外のクレジット消費を抑えるための倉庫向けコスト制御です。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          Resource Monitorが対象にするのはウェアハウス（とそれを支えるクラウドサービス分の監視）です。
          Snowpipeや自動クラスタリングなどのサーバーレス機能、AIサービスの消費は追跡・制御できません。
          これらにはBudgetを使います。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>割当クレジットに対する閾値で通知やサスペンドを仕掛けられます。</li>
        <li>アカウントモニターは1つ、倉庫モニターは複数。倉庫への割当は1モニターまでです。</li>
        <li>Notify系とSuspend系のアクションを組み合わせて段階的に締められます。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「倉庫の暴走」はResource Monitor、「サーバーレス／AIの予算」はBudget、と役割を分けて設計する。
        片方だけだとコストの穴が残ります。
      </p>
    </div>
  );
}
