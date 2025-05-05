import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Security", "Network Rule", "Snowflake Basic"],
    created_at: new Date("2025-05-06"),
    updated_at: new Date("2025-05-06"),

    // ----- quiz -----
    title: "Snowflakeのネットワークルールについて",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ネットワークルールは、ネットワーク識別子（IPアドレス、VPCE ID、ドメインなど）を論理単位にグループ化するスキーマレベルのオブジェクトである。",
      1: "ネットワークルール自体が、ルール内の識別子へのアクセスを直接許可またはブロックする。",
      2: "ネットワークルールはアカウントレベルで作成され、すべてのデータベースとスキーマで共有される。",
      3: "ネットワークルールのMODEプロパティがEGRESSの場合、Snowflakeサービスへのインバウンドネットワークトラフィックを制御する。",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "ネットワークルール - Snowflake Documentation", url: "https://docs.snowflake.com/ja/user-guide/network-rules" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeのネットワークルールに関する説明として、<strong>正しいもの</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeのネットワークルールは、ネットワーク識別子（IPアドレス、VPCE ID、ドメインなど）を論理的な単位にグループ化するためのスキーマレベルのオブジェクトです。これにより、ネットワークポリシーや外部ネットワークアクセスなどの機能で、トラフィック制御のルールを一元管理しやすくなります。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>ネットワークルールは、ネットワーク識別子（IPアドレス、VPCE ID、ドメインなど）を論理単位にグループ化するスキーマレベルのオブジェクトである。:</strong>
          <br />
          これは正しい説明です。ネットワークルールは、特定のIPアドレス範囲、AWS VPCE ID、Azure Private Endpoint LinkID、またはドメイン名をリストとして保持し、それらを論理的なグループとして扱います。
          また、ルールは特定のスキーマ内に作成されるスキーマレベルのオブジェクトです。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">不正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>ネットワークルール自体が、ルール内の識別子へのアクセスを直接許可またはブロックする。:</strong>
          <br />
          これは誤りです。ドキュメントには「ネットワークルールは、その識別子の許可またはブロックを定義するものではありません。
          ネットワークルールを使用するSnowflake機能により、ルール内の識別子の許可または禁止が指定されます。」と記載されています。
          許可・ブロックの判断は、ネットワークポリシーや外部ネットワークアクセス機能側で行われます。
        </li>
        <li className="pt-2">
          <strong>ネットワークルールはアカウントレベルで作成され、すべてのデータベースとスキーマで共有される。:</strong>
          <br />
          これは誤りです。ネットワークルールは、データベース内の特定のスキーマに属する「スキーマレベルのオブジェクト」です。
        </li>
        <li className="pt-2">
          <strong>ネットワークルールのMODEプロパティがEGRESSの場合、Snowflakeサービスへのインバウンドネットワークトラフィックを制御する。:</strong>
          <br />
          これは誤りです。MODEプロパティはルールの使用目的を示します。
          INGRESS または INTERNAL_STAGE はインバウンドトラフィック（Snowflakeサービスや内部ステージへのアクセス）の制御に使用され、
          EGRESS はアウトバウンドトラフィック（UDF/プロシージャからの外部ネットワークアクセス）の制御に使用されます。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        ネットワークルールは、Snowflakeのネットワークセキュリティ設定を構成する上で重要な要素です。
        ルール自体は識別子のグループ化を行うだけであり、実際のアクセス制御（許可/ブロック）はネットワークポリシーや外部ネットワークアクセスといった機能と組み合わせて実現される点を理解しておくことが重要です。
        また、ルールがスキーマレベルのオブジェクトであること、MODEプロパティによってインバウンド/アウトバウンドのどちらの制御に使われるかが決まる点もポイントです。
      </p>
    </div>
  );
} 
