import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Security", "Snowflake Advanced"],
    created_at: new Date("2025-08-19"),
    updated_at: new Date("2025-08-19"),

    // ----- quiz -----
    title: "Snowflake Tri-Secret Secure の基本概念",
    question_jsx: <QuizQuestion />,
    options: {
      0: "顧客管理キー（CMK）は、テーブルマスターキー（TMK）を直接暗号化するために使用される。",
      1: "Tri-Secret Secureを有効にすると、Snowflakeが管理するマスターキーは無効化され、顧客管理キー（CMK）のみが最上位のキーとして機能する。",
      2: "顧客管理キー（CMK）は、Snowflake管理のキーと顧客管理のキーから成る「複合マスターキー」の生成に関与し、顧客はCMKへのアクセスを制御することでデータ保護を強化できる。",
      3: "Snowflakeアカウントが利用するクラウドプロバイダーのネイティブな暗号化サービス（AWS KMSなど）は、Tri-Secret Secureの構成とは独立しており、直接連携しない。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title:
          "Snowflake Tri-Secret Secure で複合マスターキーを構成しよう | Zenn",
        url: "https://zenn.dev/dataheroes/articles/20250526-snowflake-tri-secret-secure-aws-kms",
      },
      {
        title: "Understanding Encryption Key Management | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/security-encryption-manage",
      },
      {
        title: "Tri-Secret Secure | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/security-encryption-tss",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        SnowflakeのTri-Secret
        Secureに関して、そのキー階層モデルと顧客管理キーの役割について説明したもののうち、
        <strong className="text-green-600">正しいもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Tri-Secret
        Secureは、Snowflakeの階層的なキー管理モデルに顧客管理キーを統合することで、セキュリティをさらに強化する機能です。
      </p>
      <br />
      <p className="font-semibold text-green-600">正解の選択肢:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          この記述は正しいです。Tri-Secret
          Secureの核心は、Snowflakeが管理するキーと顧客が管理するキー（CMK）を組み合わせて「複合アカウントマスターキー」を生成する点にあります。Snowflakeの公式ドキュメントには次のように記載されています。
          <blockquote className="border-l-2 pl-4 italic my-2">
            「a composed account master key is created from a
            Snowflake-managed key and your customer-managed key.」
            <br />
            (複合アカウントマスターキーは、Snowflakeが管理するキーと顧客が管理するキーから作成されます。)
          </blockquote>
          これにより、顧客はCMKへのアクセス権をクラウドプロバイダー側（AWS
          KMSなど）で管理し、必要に応じてSnowflakeからのアクセスを無効にすることで、データへのアクセスを完全にコントロールできます。
        </li>
      </ul>
      <p className="font-semibold text-red-500">不正解の選択肢:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          CMKが暗号化するのは、キー階層の最上位に位置するアカウントマスターキーの一部（AMK-C）であり、テーブルマスターキー（TMK）ではありません。
        </li>
        <li>
          Tri-Secret
          Secureは、Snowflake管理のキーを無効化するのではなく、両方のキーを組み合わせて使用します。Zennの記事で示されている図「Tri-Secret
          Secure の複合マスターキー」でも、AMK-S (Snowflake) と AMK-C
          (Customer) が合わさってComposed-AMKが作られることが分かります。
        </li>
        <li>
          この機能は、AWS KMS, Google Cloud KMS, Azure Key
          Vaultといったクラウドプロバイダーのキー管理サービスと密接に連携することが前提となっています。
        </li>
      </ul>
    </div>
  );
}