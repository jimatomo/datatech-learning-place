import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Security", "Operation", "Snowflake Basic"],
    created_at: new Date("2026-08-17"),
    updated_at: new Date("2026-08-17"),

    title: "Snowflakeのシステム定義ロールの使い分け",
    question_jsx: <QuizQuestion />,
    options: {
      0: "日常のDDLも漏れなく実行できるよう、ACCOUNTADMINを利用者のデフォルトロールにする。",
      1: "カスタムロールの最上位をSYSADMINへGRANTし、ユーザーとロールの管理はUSERADMIN（またはSECURITYADMIN）側に分離する。",
      2: "SECURITYADMINは標準でウェアハウスとデータベースを作成できるため、オブジェクト管理もこのロールに集約する。",
      3: "ACCOUNTADMINは最上位なので、カスタムロールが作ったオブジェクトを階層の有無に関係なく常にDROPできる。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Documentation - Overview of Access Control",
        url: "https://docs.snowflake.com/en/user-guide/security-access-control-overview",
      },
      {
        title: "Snowflake Documentation - Access control best practices",
        url: "https://docs.snowflake.com/en/user-guide/security-access-control-considerations",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeのシステム定義ロールを使った権限設計として、
        <strong className="text-green-600">最も適切なもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        システム定義ロールは「何を管理するか」が最初から分かれています。混ぜると権限が膨らみ、監査も難しくなります。
      </p>
      <p className="font-semibold text-emerald-600 mt-2">適切な記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          カスタムロールの最上位をSYSADMINへGRANTすると、倉庫やDBオブジェクトの管理をSYSADMIN側に集約できます。
          ユーザーとロールの作成・変更はUSERADMIN（その親のSECURITYADMIN）が担います。
        </li>
      </ul>
      <p className="font-semibold text-red-500">適切でない記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          ACCOUNTADMINは最上位ですが、日常作業のデフォルトにはしません。
          誤ってオブジェクトをこのロール所有にすると、後から権限委譲が難しくなります。
        </li>
        <li>
          SECURITYADMINの本体はMANAGE GRANTSとユーザー／ロール管理です。
          ウェアハウスやデータベースの作成はSYSADMINの役割です。
        </li>
        <li>
          カスタムロールが作ったオブジェクトは、そのロールをACCOUNTADMINへ直接、
          または推奨どおりSYSADMIN経由の階層へGRANTしないと、ACCOUNTADMINでも触れません。
        </li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「オブジェクトはSYSADMIN配下、人はUSERADMIN／SECURITYADMIN、ACCOUNTADMINは非常時だけ」と先に決める。
        階層を繋がないと、最上位ロールでも現場のテーブルを救えません。
      </p>
    </div>
  );
}
