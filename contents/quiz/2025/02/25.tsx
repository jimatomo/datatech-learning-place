import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Basic"],
    created_at: new Date("2025-02-25"),
    updated_at: new Date("2025-02-25"),

    // ----- quiz -----
    title: "Snowflakeのリソースモニター",
    question_jsx: <QuizQuestion />,
    options: {
      0: "リソースモニターは、仮想ウェアハウスのクレジット使用状況とクラウドサービスの両方をモニターできる",
      1: "リソースモニターは、ACCOUNTADMINロールを持つユーザーのみが作成できるが、他のロールにも権限を付与して表示や変更を許可できる",
      2: "リソースモニターのクレジットクォータは、クラウドサービスの毎日の10%調整（請求対象外分）を考慮して計算される",
      3: "リソースモニターは、アカウントレベルで設定した場合、個別のウェアハウスに対して異なるクレジットクォータを設定することができる",
    },
    answers: [0, 1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "リソースモニターの操作", url: "https://docs.snowflake.com/ja/user-guide/resource-monitors" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeのリソースモニターに関する以下の説明のうち、正しいものをすべて選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeのリソースモニターに関する問題です。
      </p>
      <p className="pt-2">
        それぞれの選択肢について説明します：
      </p>
      <ul className="list-disc pl-6 pt-2">
        <li className="pb-2">
          リソースモニターは、仮想ウェアハウスのクレジット使用状況とクラウドサービスの両方をモニターできます。
          クレジットクォータは、ユーザー管理の仮想ウェアハウスとクラウドサービスで使用する仮想ウェアハウスの両方で消費されるクレジットを考慮します。
        </li>
        <li className="pb-2">
          リソースモニターを作成できるのは、ACCOUNTADMINロールを持つユーザーだけですが、アカウント管理者は他のロールに権限を付与して、
          他のユーザーがリソースモニターを表示(MONITOR)および変更(MODIFY)できるようにすることができます。
        </li>
        <li className="pb-2">
          リソースモニターの制限は、クラウドサービスの毎日の10%調整（請求対象外分）を考慮しません。
          Snowflakeは、クラウドサービスレイヤーによるすべてのクレジット消費を使用して、その消費が請求されない場合でも、
          制限に達したかどうかを計算します。
        </li>
        <li>
          アカウントレベルのリソースモニターは、アカウント内のすべてのウェアハウスに対して同じクレジットクォータと
          アクションを適用します。個別のウェアハウスに対して異なるクォータを設定したい場合は、
          ウェアハウスレベルの個別のリソースモニターを作成する必要があります。
        </li>
      </ul>
      <p className="pt-2">
        リソースモニターは、予期しないクレジット使用状況を回避し、コストを管理するための重要な機能です。
        アカウントレベルまたは個別のウェアハウスレベルで設定でき、クレジット使用状況が指定された制限に達した場合に
        通知を送信したり、ウェアハウスを自動的に一時停止したりすることができます。
      </p>
    </div>
  );
} 

