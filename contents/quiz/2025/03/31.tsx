import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "File URL", "Snowflake Basic"],
    created_at: new Date("2025-03-31"),
    updated_at: new Date("2025-03-31"),

    // ----- quiz -----
    title: "SnowflakeのBUILD_STAGE_FILE_URL関数に関する知識",
    question_jsx: <QuizQuestion />,
    options: {
      0: "BUILD_STAGE_FILE_URL関数は、ステージ内のファイルへの一時的なアクセスURLを生成する",
      1: "生成されたファイルURLは、URLを知っている人であれば誰でもアクセス可能である",
      2: "ファイルURLは、ステージ名とファイルの相対パスを指定することで生成できる",
      3: "ファイル URL を REST API に送信する HTTP クライアントは、リダイレクトを許可するように構成する必要がある",
    },
    answers: [2, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { 
        title: "BUILD_STAGE_FILE_URL - Snowflake Documentation", 
        url: "https://docs.snowflake.com/ja/sql-reference/functions/build_stage_file_url"
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        SnowflakeのBUILD_STAGE_FILE_URL関数に関する説明として、正しい選択肢を2つ選んでください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        BUILD_STAGE_FILE_URL関数の重要な特徴は以下の通りです：
      </p>
      <p className="py-2">
        <strong>基本的な機能</strong>：
        <ul className="list-disc pl-4">
          <li>ステージ名とファイルの相対パスを入力として使用して、SnowflakeファイルURLを生成します</li>
          <li>生成されたURLは期限切れにならない長期アクセスを許可します</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>アクセス制御</strong>：
        <ul className="list-disc pl-4">
          <li>生成されたURLにアクセスすると最初にユーザーの認証プロセスが行われます</li>
          <li>ユーザーはファイルを含むステージに対して適切な権限（USAGEまたはREAD）を持っている必要があります</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>使用方法</strong>：
        <ul className="list-disc pl-4">
          <li>REST APIを通じてファイルにアクセスする際に使用できます</li>
          <li>HTTPクライアントはリダイレクトを許可するように設定する必要があります</li>
        </ul>
      </p>
    </div>
  );
} 
