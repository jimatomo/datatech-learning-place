import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "Infrastructure", "KMS"],
    created_at: new Date("2025-04-17"),
    updated_at: new Date("2025-04-17"),

    // ----- quiz -----
    title: "AWS KMSのデフォルトキーポリシー",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "デフォルトキーポリシーでは、AWSアカウントのルートユーザーにKMSキーへのフルアクセスが自動的に付与される",
      1: "コンソールで作成したKMSキーのデフォルトポリシーには、キー管理者とキーユーザーの両方のステートメントが含まれる",
      2: "プログラムで作成したKMSキーのデフォルトポリシーは、コンソールで作成した場合と同じ内容となる",
      3: "デフォルトキーポリシーでは、IAMポリシーによるアクセス制御は無効化されている",
      4: "デフォルトキーポリシーでは、AWSサービスによるKMSキーの使用は自動的に許可される",
    },
    answers: [0, 1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "デフォルトのキーポリシー", url: "https://docs.aws.amazon.com/ja_jp/kms/latest/developerguide/key-policy-default.html" },
      { title: "【KMS】デフォルトのキーポリシーについて調べてみた", url: "https://dev.classmethod.jp/articles/kms-default-key-policy-overview/" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        AWS KMSのデフォルトキーポリシーに関して、正しい説明を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        以下が正解の説明です：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          デフォルトキーポリシーでは、AWSアカウントのルートユーザーにKMSキーへのフルアクセスが自動的に付与されます。
          これにより、キーが管理不能になるリスクを軽減します。
        </li>
        <li className="pb-1">
          コンソールで作成したKMSキーのデフォルトポリシーには、キー管理者とキーユーザーの両方のステートメントが含まれます。
          これにより、より詳細なアクセス制御が可能になります。
        </li>
      </ul>
      <p>
        誤った選択肢の説明：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          プログラムで作成したKMSキーのデフォルトポリシーは、コンソールで作成した場合と異なります。
          プログラムで作成した場合は、よりシンプルなポリシーとなります。
        </li>
        <li className="pb-1">
          デフォルトキーポリシーでは、IAMポリシーによるアクセス制御が有効化されています。
          これにより、キーポリシーに加えてIAMポリシーを使用したアクセス制御が可能です。
        </li>
        <li>
          AWSサービスによるKMSキーの使用は、デフォルトでは自動的に許可されません。
          キーユーザーが適切な権限を付与する必要があります。
        </li>
      </ul>
      <p>
        AWS KMSのデフォルトキーポリシーは、セキュリティと利便性のバランスを考慮して設計されています。
        必要に応じてカスタムポリシーを作成することで、より細かなアクセス制御が可能です。
      </p>
    </div>
  );
} 
