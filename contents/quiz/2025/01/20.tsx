import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    tags: ["Snowflake", "Data Recovery"],
    created_at: new Date("2025-01-20"),
    updated_at: new Date("2025-01-20"),

    // ----- quiz -----
    title: "SnowflakeのTime TravelとFail-safeの特徴",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "Time Travelは、最大90日間の履歴データにアクセスできる機能である", 
      1: "Fail-safeは、ユーザーが直接アクセスできる履歴データの保護機能である", 
      2: "Time Travelのデフォルトの保持期間は7日間である", 
      3: "Fail-safeは、Time Travelの保持期間が終了した後に開始される7日間の保護期間である", 
      4: "Time TravelのSQL拡張機能としては指定したTIMESTAMPもしくはOFFSET（現在からの時間差）のみが指定可能である", 
    },
    answers: [0, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake Documentation - Time Travelの理解と使用", url: "https://docs.snowflake.com/ja/user-guide/data-time-travel" },
      { title: "Snowflake Documentation - Fail-safeの理解と表示", url: "https://docs.snowflake.com/ja/user-guide/data-failsafe" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <h1>SnowflakeのTime TravelとFail-safeについて、正しい説明を選んでください</h1>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>SnowflakeのTime TravelとFail-safeには、以下の特徴があります：</p>
      <ul className="py-2 space-y-2">
        <li>・Time Travelは、最大90日間の履歴データにアクセスでき、データの誤削除や変更を復元するために使用されます。</li>
        <li>・Fail-safeは、Time Travelの保持期間が終了した後に開始される7日間の保護期間で、Snowflakeがデータを回復するためのものです。</li>
        <li>・Fail-safeはユーザーが直接アクセスできるものではなく、Snowflakeによるデータ復旧のための機能です。</li>
        <li>・Time Travelのデフォルトの保持期間は1日（24時間）で、Enterprise Editionでは最大90日まで延長可能です。</li>
        <li>・Time TravelのSQL拡張機能としては指定したTIMESTAMPもしくはOFFSET（現在からの時間差）だけでなく
          STATEMENT （ステートメントの識別子。例：クエリ ID）も指定可能です。
          STATEMENTは、クエリの実行時に生成される一意のIDで、クエリの実行結果を識別するために使用されます。Statementで指定したクエリでの変更を含めない履歴データをクエリできます。</li>
      </ul>
      <p>
        Time TravelとFail-safeは、データの保護と復旧において重要な役割を果たしますが、それぞれの機能と制限を理解して適切に利用することが重要です。
      </p>
    </div>
  );
}

