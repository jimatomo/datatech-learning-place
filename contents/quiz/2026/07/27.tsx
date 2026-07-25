import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Composer",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Security", "Operation", "Snowflake Basic"],
    created_at: new Date("2026-07-27"),
    updated_at: new Date("2026-07-27"),

    title: "Snowflakeのユーザータイプの使い分け",
    question_jsx: <QuizQuestion />,
    options: {
      0: "TYPEがPERSON（またはNULL）のユーザーは人間による対話的な利用を想定しており、MFA登録の対象になる。",
      1: "TYPEがSERVICEのユーザーはパスワードやSAML SSOでログインできず、MFAにも登録できない。サービスやアプリケーションの非対話接続に使う。",
      2: "TYPEがSERVICE_AGENTのユーザーはSERVICEと同じ非対話特性を持ち、セッションは常にagent-activeとして扱われる。AIエージェント用の識別に使う。",
      3: "新規にサービス連携用のユーザーを作る場合は、パスワード認証も使えるLEGACY_SERVICEを選ぶことが公式に推奨されている。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Documentation - User management (Types of users)",
        url: "https://docs.snowflake.com/en/user-guide/admin-user-management",
      },
      {
        title: "Snowflake Release Notes - SERVICE_AGENT user type (GA)",
        url: "https://docs.snowflake.com/en/release-notes/2026/other/2026-07-23-service-agent-user-type",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeのユーザーオブジェクトの<code>TYPE</code>プロパティについて、
        <strong className="text-red-600">誤っているもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        ユーザータイプは「人間か、プログラムか、AIエージェントか」を区別し、
        タイプに応じて使える認証方式を制限する仕組みです。2026年7月には
        AIエージェント向けのSERVICE_AGENTがGAになりました。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          LEGACY_SERVICEはパスワードやSAML認証を許す旧来型の非対話ユーザーで、
          非推奨化（deprecation）が進んでいます。新規のサービス連携はSERVICEタイプで作り、
          キーペア認証などの非対話向け認証を使うのが公式の推奨です。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>PERSON（NULLも同義）は人間用で、MFA登録の対象です。</li>
        <li>SERVICEはパスワード・SAML・MFAが使えず、非対話接続専用です。</li>
        <li>
          SERVICE_AGENTはSERVICEの特性に加えてセッションが常にagent-activeになり、
          マスキングポリシー等でAIエージェントからのアクセスを判別できます。
        </li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「誰がログインするか」でタイプを選ぶと迷いません。人間はPERSON、
        バッチやBIツールなどのプログラムはSERVICE、自律的に動くAIエージェントはSERVICE_AGENT。
        パスワードを持つ連携ユーザーが残っていたら、LEGACY_SERVICE脱却の計画を立てるのが実務の第一歩です。
      </p>
    </div>
  );
}
