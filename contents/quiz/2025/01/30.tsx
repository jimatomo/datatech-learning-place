import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "S3", "IAM", "Infrastructure"],
    created_at: new Date("2025-01-30"),
    updated_at: new Date("2025-01-30"),

    // ----- quiz -----
    title: "S3バケットのクロスアカウントアクセス設定",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "バケット所有者のアカウントは、バケットポリシーを使用して他のAWSアカウントにアクセス許可を直接付与できる",
      1: "クロスアカウントアクセスでは、個々のIAMユーザーに直接アクセス許可を付与することが推奨される",
      2: "他のアカウントのユーザーがリソースにアクセスするには、親アカウント（付与対象のユーザーが所属するアカウント）からのアクセス許可も必要である",
      3: "バケットポリシーで明示的な拒否が設定されている場合、他のポリシーによる許可よりも優先される",
      4: "クロスアカウントアクセスでは、ACLのみを使用してアクセス制御を行う必要がある",
    },
    answers: [0, 2, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "バケット所有者がクロスアカウントのバケットのアクセス許可を付与する", url: "https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/example-walkthroughs-managing-access-example2.html" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        S3バケットのクロスアカウントアクセス設定に関して、正しい説明を選択してください。
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
          バケット所有者は、バケットポリシーを使用して他のAWSアカウントに直接アクセス許可を付与することができます。
          これにより、クロスアカウントでのリソース共有が可能になります。
        </li>
        <li className="pb-1">
          クロスアカウントアクセスの場合、ユーザーがリソースにアクセスするためには、
          リソース所有者からの許可に加えて、ユーザーが属する親アカウントからのアクセス許可も必要です。
        </li>
        <li>
          バケットポリシーで明示的な拒否（Explicit Deny）が設定されている場合、
          それは他のポリシー（ACLやIAMポリシーなど）による許可よりも優先されます。
        </li>
      </ul>
      <p>
        誤った選択肢の説明：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          クロスアカウントアクセスでは、個々のIAMユーザーではなく、IAMロールにアクセス許可を付与することが
          推奨されています。これにより、より柔軟で管理しやすいアクセス制御が可能になります。
        </li>
        <li>
          クロスアカウントアクセスの制御には、ACLだけでなく、バケットポリシーやIAMポリシーなど
          複数のメカニズムを使用することができます。
          （一般的にはACLよりもバケットポリシーの方が利用されます。）
        </li>
      </ul>
      <p>
        ある程度の大きさの組織になると複数のAWSアカウントでデータの連携をすることになりますので、
        S3のクロスアカウントでのアクセス設定には慣れておくといいでしょう。
      </p>
    </div>
  );
} 
