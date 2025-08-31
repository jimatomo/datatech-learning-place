import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Query History", "Snowflake Basic"],
    created_at: new Date("2025-09-01"),
    updated_at: new Date("2025-09-01"),

    // ----- quiz -----
    title: "Snowsightのクエリ履歴の制限について",
    question_jsx: <QuizQuestion />,
    options: {
      0: "クエリ履歴ページでは、過去30日間にSnowflakeアカウントで実行されたクエリを調べることができます。",
      1: "ACCOUNTADMINロールを持つユーザーは、アカウント内のすべてのクエリ履歴を表示できます。",
      2: "アクティブなロールにMONITORまたはOPERATE権限が付与されているウェアハウスでは、そのウェアハウスを使用している他のユーザーが実行したクエリを表示できます。",
      3: "ワークシート内では、そのワークシートで実行されたクエリの履歴を表示することができます。",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "クエリ履歴でクエリのアクティビティをモニターする",
        url: "https://docs.snowflake.com/ja/user-guide/ui-snowsight-activity",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowsightのクエリ履歴機能に関する次の記述のうち、<strong className="text-red-600">誤っているもの</strong>はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
      <p>
        クエリ履歴ページでは、過去30日間にSnowflakeアカウントで実行されたクエリを調べることができるという記述は誤りです。Snowflakeの公式ドキュメントでは、「クエリ履歴ページでは、過去14日間にSnowflakeアカウントで実行されたクエリを調べることができます。」と明記されており、実際には14日間という制限があります。
      </p>
      <br />
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>クエリ履歴ページでは、過去14日間にSnowflakeアカウントで実行されたクエリを調べることができます。</li>
        <li>ACCOUNTADMINロールを持つユーザーは、アカウント内のすべてのクエリ履歴を表示できます。</li>
        <li>アクティブなロールにMONITORまたはOPERATE権限が付与されているウェアハウスでは、そのウェアハウスを使用している他のユーザーが実行したクエリを表示できます。</li>
        <li>ワークシート内では、そのワークシートで実行されたクエリの履歴を表示することができます。</li>
      </ul>
      <br />
      <p>
        この14日間という制限は、SnowsightのQuery Historyページの重要な制約事項であり、より古いクエリ履歴を確認する必要がある場合は、ACCOUNT_USAGEスキーマのQUERY_HISTORYビューやAGGREGATE_QUERY_HISTORYビューを使用する必要があります。
      </p>
    </div>
  );
}