import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Security", "Snowflake Basic"],
    created_at: new Date("2025-08-25"),
    updated_at: new Date("2025-08-25"),

    // ----- quiz -----
    title: "Snowflakeネットワークポリシーの適用後の動作",
    question_jsx: <QuizQuestion />,
    options: {
      0: "許可リストに含まれていないネットワークオリジンからの新しいログインは拒否されます。",
      1: "ブロックリストに含まれているネットワークオリジンからの新しいログインは拒否されます。",
      2: "ポリシー適用前に既にログインしていたユーザーは、そのセッションが続く限り、制限されたネットワークオリジンからでもクエリを実行し続けることができます。",
      3: "ネットワークポリシーは、許可リストとブロックリストに基づいてアカウントへのアクセスを制限します。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "ネットワークポリシーを使用したネットワークトラフィックの制御",
        url: "https://docs.snowflake.com/ja/user-guide/network-policies",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeアカウントにネットワークポリシーが関連付けられた後の動作について説明した次の記述のうち、<strong className="text-red-600">誤っているもの</strong>はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeのドキュメントには、「ネットワークポリシーがアカウントに関連付けられている場合、既にSnowflakeにログインしている制限されたユーザーは、それ以上のクエリを実行できません。」と明記されています。
      </p>
      <p className="mt-2">
        したがって、ポリシーが有効になると、既存のセッションであっても、制限されたネットワークオリジンからの操作はブロックされます。
      </p>
      <br />
      <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
      <p>
        ポリシー適用前にログインしていたユーザーでも、ポリシーに違反するネットワークオリジンからの場合、それ以上のクエリ実行はできなくなります。選択肢の記述はこれと矛盾するため誤りです。
      </p>
      <br />
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>ネットワークポリシーは許可リストとブロックリストを使い、指定されたネットワークオリジンからのアクセスのみを許可、または特定のオリジンをブロックします。</li>
        <li>これにより、許可されていない場所からの不正なアクセス試行を防ぐことができます。</li>
      </ul>
    </div>
  );
}