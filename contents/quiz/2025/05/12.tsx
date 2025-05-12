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
    tags: ["Snowflake", "Resource Monitor", "Cost Management", "Snowflake Basic"],
    created_at: new Date("2025-05-12"),
    updated_at: new Date("2025-05-12"),

    // ----- quiz -----
    title: "Snowflakeのリソースモニターの設定",
    question_jsx: <QuizQuestion />,
    options: {
      0: "リソースモニターは、デフォルトではACCOUNTADMINロールを持つユーザーのみが作成できる。",
      1: "リソースモニターは、ウェアハウスのクレジット使用状況のみを監視し、クラウドサービスの使用は監視対象外である。",
      2: "リソースモニターのクレジットクォータは、指定された頻度の間隔で自動的にリセットされる。",
      3: "リソースモニターは、アカウントレベルでのみ設定可能で、個別のウェアハウスには割り当てることができない。",
      4: "リソースモニターの通知は、ACCOUNTADMINロールを持つユーザーにのみ送信される。",
    },
    answers: [0, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "リソースモニターの操作 - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/resource-monitors"
      }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeのリソースモニターに関する記述のうち、正しいものを全て選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        各選択肢の解説は以下の通りです。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-emerald-500">リソースモニターは、デフォルトではACCOUNTADMINロールを持つユーザーのみが作成できる。</strong>：これは正しい記載です。
          リソースモニターの作成は、ACCOUNTADMINロールの特権の一つです。ただし、アカウント管理者は他のロールに権限を付与して、リソースモニターの表示や変更を許可することができます。
        </li>
        <li>
          <strong className="text-red-500">リソースモニターは、ウェアハウスのクレジット使用状況のみを監視し、クラウドサービスの使用は監視対象外である。</strong>：これは誤った記載です。
          リソースモニターは、ウェアハウスの使用に加えて、クラウドサービスの使用によるクレジット消費も監視します。両方の使用量を合計して、設定されたクレジットクォータと比較します。
          ただし、クラウドサービスの毎日の10%調整を考慮しない点に注意が必要です。その消費が発生しない場合でも制限に達したかどうかの判定がなされます。
        </li>
        <li>
          <strong className="text-emerald-500">リソースモニターのクレジットクォータは、指定された頻度の間隔で自動的にリセットされる。</strong>：これは正しい記載です。
          リソースモニターは、設定された頻度（日次、週次、月次など）に基づいて、クレジット使用量を追跡し、指定された間隔で自動的にリセットされます。
        </li>
        <li>
          <strong className="text-red-500">リソースモニターは、アカウントレベルでのみ設定可能で、個別のウェアハウスには割り当てることができない。</strong>：これは誤った記載です。
          リソースモニターは、アカウントレベルとウェアハウスレベルの両方で設定可能です。個別のウェアハウスにリソースモニターを割り当てることで、より細かいコスト管理が可能です。
        </li>
        <li>
          <strong className="text-red-500">リソースモニターの通知は、ACCOUNTADMINロールを持つユーザーにのみ送信される。</strong>：これは誤った記載です。
          リソースモニターの通知は、ACCOUNTADMINロールに限定されません。アカウント管理者は、他のロールを持つユーザーにも通知を送信するように設定することができます。
        </li>
      </ul>
    </div>
  );
} 
