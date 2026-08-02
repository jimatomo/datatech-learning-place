import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Composer",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Cortex", "AI", "Datatech News"],
    created_at: new Date("2026-08-09"),
    updated_at: new Date("2026-08-09"),

    title: "CoCo DesktopがGAに",
    question_jsx: <QuizQuestion />,
    options: {
      0: "CoCo DesktopはMac / Windows向けのネイティブデスクトップアプリで、ファイルエディタや統合ターミナル、エージェント的なAIループなどをIDE風の画面にまとめたものである。",
      1: "Snowflakeアカウントに対して動作し、既存のロールとアクセス制御を尊重したまま、自然言語での開発・探索・管理を支援する。",
      2: "2026年7月21日にGeneral Availabilityとなった。",
      3: "CoCo DesktopはSnowflakeアカウントのロールや権限をバイパスして動作するため、管理者はアクセス制御を別途無効化する必要がある。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Release Notes - CoCo Desktop GA (2026-07-21)",
        url: "https://docs.snowflake.com/en/release-notes/2026/other/2026-07-21-coco-desktop-ga",
      },
      {
        title: "Snowflake - CoCo Desktop",
        url: "https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code-desktop",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        2026年7月にGAとなったSnowflakeのCoCo Desktopについて、
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
        CoCo Desktopは、Snowflake上のエージェント型コーディング体験をデスクトップIDEへ持ち込んだ製品です。
        ガバナンスを維持したままAI支援を使う点がポイントです。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          権限をバイパスする製品ではありません。既存ロールとアクセス制御を尊重して動作します。
          利用にはCOPILOT_USERやCORTEX_USER / CORTEX_AGENT_USERなどのデータベースロール要件もあります。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>Mac / Windowsのネイティブアプリとして、IDE風のエージェント体験を提供します。</li>
        <li>アカウント内の権限境界の中で開発・探索・管理を支援します。</li>
        <li>2026-07-21にGAとなりました。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        AIコーディング支援を入れるときも、まず「既存のRBACとクレジット制御の上で動くか」を確認するのが安全です。
        CoCo Desktopは権限モデルを壊さず、必要ならユーザー単位のクレジット上限でも制御できます。
      </p>
    </div>
  );
}
