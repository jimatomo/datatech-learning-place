import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Advanced"],
    created_at: new Date("2025-07-29"),
    updated_at: new Date("2025-07-29"),

    // ----- quiz -----
    title: "Snowflake: マルチアカウント戦略における費用対効果",
    question_jsx: <QuizQuestion />,
    options: {
      0: "開発、ステージング、本番の各環境を別々のアカウントに分離し、デプロイメントパイプラインを簡素化する。",
      1: "高いコンプライアンス要件を持つ部門と、そうでない部門でアカウントを分け、それぞれに最適なSnowflakeエディション（例: Business CriticalとEnterprise）を適用する。",
      2: "各地域のデータ所在地要件（データレジデンシー）を満たすために、リージョンごとに異なるアカウントを作成する。",
      3: "プロジェクトやチームごとに個別のアカウントを設け、リソース使用状況の追跡とコストのチャージバックを容易にする。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Editions",
        url: "https://docs.snowflake.com/en/user-guide/intro-editions",
      },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeで複数のアカウントを利用して環境を分離する際、
        <strong className="text-emerald-500">最も費用対効果が高い</strong>
        ユースケースは次のうちどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflakeのマルチアカウント戦略は、ガバナンス、セキュリティ、コスト管理など様々な目的で採用されますが、特に費用対効果を最大化するアプローチを理解することが重要です。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            高いコンプライアンス要件を持つ部門と、そうでない部門でアカウントを分け、それぞれに最適なSnowflakeエディション（例:
            Business CriticalとEnterprise）を適用する。：
          </strong>
          <br />
          これが
          <strong className="text-emerald-500">最も費用対効果の高い</strong>
          ユースケースです。Snowflakeのエディションはアカウント単位で契約され、上位のエディションほど高価です。例えば、PCI
          DSSやHIPAAといった厳しいコンプライアンス要件や、Tri-Secret
          Secureなどの高度なセキュリティ機能が必要なワークロードは、高価なBusiness
          Criticalエディションが必要です。しかし、社内のすべてのデータが同レベルの要件を必要とするわけではありません。要件の低いワークロードを安価なEnterpriseやStandardエディションのアカウントで運用することで、組織全体としてライセンスコストを大幅に最適化できます。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">その他の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            開発、ステージング、本番の各環境を別々のアカウントに分離し、デプロイメントパイプラインを簡素化する。：
          </strong>
          <br />
          環境分離はCI/CDの観点から推奨されるプラクティスですが、通常は同じエディションが適用されるため、直接的なライセンスコスト削減効果は限定的です。この目的は、同一アカウント内のデータベースやスキーマ、ロール設計でも達成可能です。
        </li>
        <li className="pt-2">
          <strong>
            各地域のデータ所在地要件（データレジデンシー）を満たすために、リージョンごとに異なるアカウントを作成する。：
          </strong>
          <br />
          これは規制遵守のためのアプローチであり、費用対効果というよりは必須要件です。複数のリージョンにアカウントを持つことは、むしろ管理コストやデータ転送コストを増加させる可能性があります。
        </li>
        <li className="pt-2">
          <strong>
            プロジェクトやチームごとに個別のアカウントを設け、リソース使用状況の追跡とコストのチャージバックを容易にする。：
          </strong>
          <br />
          コストの可視化やチャージバックには有効ですが、アカウントの乱立は管理の複雑性を増大させます。リソースモニターやタグ付けといった機能でもコスト管理は可能であり、「最も」費用対効果が高いとは言えません。
        </li>
      </ul>
    </div>
  );
}