import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "IaC", "DevOps", "Datatech News"],
    created_at: new Date("2026-08-16"),
    updated_at: new Date("2026-08-16"),

    title: "Snowflake DCM ProjectsがGAに",
    question_jsx: <QuizQuestion />,
    options: {
      0: "定義ファイルで望ましいオブジェクト状態を宣言し、Snowflakeが差分を判断して適用するDatabase Change Managementの仕組みである。",
      1: "PLANで変更内容を確認してからDEPLOYする、plan-then-deployのワークフローを基本とする。",
      2: "2026年8月7日にGeneral Availabilityとなった。Jinjaによるパラメータ化や、Workspace / Git / ローカルからの管理も可能。",
      3: "GAによりDEFINE PIPEやDEFINE STREAM、GitHub Actions連携も含め、関連機能がすべてPreviewを脱して利用制限なく使えるようになった。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Release Notes - DCM Projects GA (2026-08-07)",
        url: "https://docs.snowflake.com/en/release-notes/2026/other/2026-08-07-dcm-projects-ga",
      },
      {
        title: "Snowflake Documentation - DCM Projects overview",
        url: "https://docs.snowflake.com/en/user-guide/dcm-projects/dcm-projects-overview",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        2026年8月7日にGeneral AvailabilityとなったSnowflake DCM Projectsについて、
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
        DCM Projectsは、Snowflakeオブジェクトを宣言的にコード管理するための仕組みです。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          本体のDCM ProjectsはGAですが、TEST/PREVIEWコマンド、GitHub Actions、
          DEFINE PIPE / STREAM、MASKING / ROW ACCESS POLICY、ATTACH TAGなどは
          リリースノート上まだPreviewのままです。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>望ましい状態をDEFINEで書き、差分適用をSnowflakeに委ねます。</li>
        <li>PLAN→DEPLOYで意図しない変更を先に確認できます。</li>
        <li>2026-08-07にGA。Jinjaや複数インターフェースでの管理が可能です。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「プロジェクトがGA」と「周辺機能も全部GA」は別物です。
        本番導入前に、使うオブジェクト種別とCI連携がPreviewでないかを必ず確認します。
      </p>
    </div>
  );
}
