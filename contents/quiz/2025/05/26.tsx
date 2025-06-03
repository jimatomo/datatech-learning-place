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
    tags: ["Snowflake", "Task", "Warehouse", "Serverless", "Snowflake Basic"],
    created_at: new Date("2025-05-26"),
    updated_at: new Date("2025-05-26"),

    // ----- quiz -----
    title: "Snowflake Taskにおけるサーバーレスタスクとユーザー管理型ウェアハウスの選択基準",
    question_jsx: <QuizQuestion />,
    options: {
      0: "サーバーレスタスクは定期的に実行されるタスクや既存のタスクがほとんど実行されていないウェアハウスが基になる場合に推奨される。",
      1: "ユーザー管理型ウェアハウスは、コンピュートリソースの予測不可能な負荷を手動で管理したい場合に推奨される。",
      2: "サーバーレスタスクでは、Snowflakeが自動的にリソースを管理するため、キューイング時間は常にゼロで実行時間が完全に予測可能である。",
      3: "ユーザー管理型ウェアハウスでは、共有ウェアハウスや複数の同時実行タスクがある場合にキューイング時間が長くなる可能性がある。",
      4: "サーバーレスタスクの課金は仮想ウェアハウスと同様に60秒の最小課金単位があり、短時間のタスクでは割高になる。",
    },
    answers: [0, 1, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Introduction to tasks - Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/tasks-intro"
      }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflake Taskにおけるサーバーレスタスクとユーザー管理型ウェアハウスの選択基準に関する記述のうち、正しいものを全て選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflake公式ドキュメントに基づく各選択肢の解説は以下の通りです。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-emerald-500">サーバーレスタスクは定期的に実行されるタスクや既存のタスクがほとんど実行されていないウェアハウスが基になる場合に推奨される。</strong>：
          これは正しい記載です。ドキュメントでは「定期的に実行されるタスクは、サーバーレス・コンピューティング・モデルに適した候補」「既存のタスクがほとんど実行されていないウェアハウスが基になる場合にも推奨される」と明記されています。
        </li>
        <li>
          <strong className="text-emerald-500">ユーザー管理型ウェアハウスは、コンピュートリソースの予測不可能な負荷を手動で管理したい場合に推奨される。</strong>：
          これは正しい記載です。ドキュメントでは「予測不可能な負荷やより細かい制御が必要な場合」にユーザー管理型ウェアハウスモデルが推奨されると記載されています。
        </li>
        <li>
          <strong className="text-red-500">サーバーレスタスクでは、Snowflakeが自動的にリソースを管理するため、キューイング時間は常にゼロで実行時間が完全に予測可能である。</strong>：
          これは誤った記載です。ドキュメントでは「タスクの合計時間には、タスクが開始する前の遅延時間が含まれる場合がある」と明記されており、サーバーレスタスクでもキューイング時間が発生する可能性があります。完全に予測可能ではありません。
        </li>
        <li>
          <strong className="text-emerald-500">ユーザー管理型ウェアハウスでは、共有ウェアハウスや複数の同時実行タスクがある場合にキューイング時間が長くなる可能性がある。</strong>：
          これは正しい記載です。ドキュメントの「Task duration」セクションで「ユーザー管理タスクでは、共有または忙しいウェアハウスでタスクが実行される予定の場合、より長いキューイング期間が一般的」と明記されています。
        </li>
        <li>
          <strong className="text-red-500">サーバーレスタスクの課金は仮想ウェアハウスと同様に60秒の最小課金単位があり、短時間のタスクでは割高になる。</strong>：
          これは誤った記載です。サーバーレスタスクは「compute-hours」単位で秒単位の課金であり、仮想ウェアハウスのような60秒の最小課金単位はありません。実際の使用時間分のみが課金されるため、短時間のタスクには適しています。
        </li>
      </ul>
      <p className="pt-4">
        <strong>実装時の重要な判断基準</strong>：
        <br />
        これらの特性を理解することで、データパイプラインの要件に応じて適切なコンピュートモデルを選択できます。予測可能な定期実行やリソース効率を重視する場合はサーバーレス、複雑な負荷管理や厳密な制御が必要な場合にはユーザー管理型ウェアハウスを選択することが重要です。
      </p>
    </div>
  );
} 
