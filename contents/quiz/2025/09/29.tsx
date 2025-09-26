import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Security", "Network", "Snowflake Basic"],
    created_at: new Date("2025-09-29"),
    updated_at: new Date("2025-09-29"),

    // ----- quiz -----
    title: "悪意のあるIPからの保護 (Malicious IP Protection)",
    question_jsx: <QuizQuestion />,
    options: {
      0: "このサービスは、キュレーションされたリスト上のIPアドレスからのネットワークアクセス試行を継続的に検出する。",
      1: "Snowflakeは、サードパーティのサイバーセキュリティデータソースから得た情報に基づき、IPアドレスのリストを維持・キュレーションしている。",
      2: "ブロックされたネットワークアクセス試行は、Account UsageのLOGIN_HISTORYビューで確認でき、IS_SUCCESS列に「NO」と表示される。",
      3: "この機能はデフォルトで無効になっており、ユーザーが手動で有効化する必要がある。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Malicious IP Protection | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/malicious-ip-protection",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeが提供する悪意のあるIPからの保護（Malicious IP
        Protection）機能に関する説明として、
        <strong className="text-red-600">誤っているもの</strong>
        はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">
        間違っている記述（正答）:
      </p>
      <p>
        「この機能はデフォルトで無効になっており、ユーザーが手動で有効化する必要がある」は誤りです。
      </p>
      <p className="pt-2">
        Snowflakeの公式ドキュメントには、この機能がデフォルトで無効であることや、手動で有効化が必要であるという記述はありません。逆に「継続的にネットワークアクセス試行を検出する」と記載されており、これは機能がデフォルトで有効化され、自動的に動作していることを示唆しています。
      </p>
      <br />
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          Snowflakeは、サードパーティの脅威インテリジェンスを基にしたIPアドレスのリストを維持しており、これを用いて悪意のあるアクセス試行を継続的に検出・ブロックします。
        </li>
        <li>
          このIPリストは、「ANONYMOUS_VPN」「ANONYMOUS_PROXIES」「MALICIOUS_BEHAVIOR」「TOR_EXITS」といったカテゴリに分類されています。
        </li>
        <li>
          Malicious IP
          Protectionサービスによってブロックされたアクセス試行は、<code>ACCOUNT_USAGE.LOGIN_HISTORY</code>{" "}
          ビューで確認できます。その際、<code>IS_SUCCESS</code> 列が
          「NO」、<code>ERROR_MESSAGE</code> が 「INCOMING_REQUEST_BLOCKED」
          となります。
        </li>
      </ul>
    </div>
  );
}