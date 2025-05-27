import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Security", "RBAC", "Access Control", "Snowflake Advanced"],
    created_at: new Date("2025-05-27"),
    updated_at: new Date("2025-05-27"),

    // ----- quiz -----
    title: "SnowflakeのRBACによる機密オブジェクトアクセス設計について",
    question_jsx: <QuizQuestion />,
    options: {
      0: "USAGE権限を効果的に活用することで、機密データへのアクセス管理の複雑さを軽減できる。",
      1: "ロール階層を設計する際は、最小権限の原則に従い、必要最小限の権限のみを付与するべきである。",
      2: "機密データベースに対しては、全てのユーザーにSELECT権限を直接付与し、アプリケーションレベルでアクセス制御を行うのがベストプラクティスである。",
      3: "Access RoleからFunctional Roleへの権限継承によって、オブジェクトレベルでの細かい権限管理が可能になる。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake Pattern - Security - Access to Sensitive Objects", url: "https://www.snowflake.com/en/resources/pattern/snowflake-pattern-security-access-to-sensitive-objects/" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        SnowflakeのRBAC（Role-Based Access Control）による機密オブジェクトアクセス設計に関する説明として、<strong className="text-red-500">誤っているもの</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        SnowflakeのRBAC（Role-Based Access Control）は、機密データへのアクセスを安全かつ効率的に管理するための重要な仕組みです。
        USAGE権限の効果的な活用により、複雑なアクセス管理を簡素化することができます。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>USAGE権限を効果的に活用することで、機密データへのアクセス管理の複雑さを軽減できる。：</strong>
          <br />
          これは正しい設計パターンです。Snowflakeでは、階層的なアクセス制御が実装されており、テーブルに対してSELECT権限などの十分なCRUD権限があっても、上位階層（データベースやスキーマ）のUSAGE権限がないと実際にはアクセスできません。
          つまり、「データベースのUSAGE権限」→「スキーマのUSAGE権限」→「テーブルのSELECT権限」の順で権限が必要となります。
          この仕組みにより、スキーマレベルでUSAGE権限を制御するだけで、そのスキーマ内のすべてのオブジェクトへのアクセスを一括制御でき、管理の複雑さを大幅に軽減できます。
        </li>
        <li className="pt-2">
          <strong>ロール階層を設計する際は、最小権限の原則に従い、必要最小限の権限のみを付与するべきである。：</strong>
          <br />
          これは正しいセキュリティ原則です。最小権限の原則（Principle of Least Privilege）は、ユーザーが業務を遂行するために必要最小限の権限のみを付与することで、セキュリティリスクを最小化します。
        </li>
        <li className="pt-2">
          <strong>Access RoleからFunctional Roleへの権限継承によって、オブジェクトレベルでの細かい権限管理が可能になる。：</strong>
          <br />
          これは正しいRBACの設計パターンです。Access Role（データアクセス権限を保持するロール）からFunctional Role（業務機能に基づくロール）へ権限を継承することで、業務機能とデータアクセス権限を分離して管理でき、より柔軟で管理しやすいロール構造を構築できます。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">誤っている選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong className="text-red-500">機密データベースに対しては、全てのユーザーにSELECT権限を直接付与し、アプリケーションレベルでアクセス制御を行うのがベストプラクティスである。：</strong>
          <br />
          これは誤ったアプローチです。機密データベースに対して全ユーザーに直接権限を付与することは、セキュリティリスクを大幅に増大させます。
          Snowflakeでは、ロールベースのアクセス制御を活用し、必要最小限の権限を段階的に付与することがベストプラクティスです。
          アプリケーションレベルでの制御に依存するのではなく、データプラットフォームレベルでの制御を優先すべきです。
        </li>
      </ul>

      <p className="pt-4">
        <strong>RBACの設計原則：</strong>
        <br />
        効果的なSnowflake RBACの設計においては、以下の原則が重要です：
        <ul className="list-disc pl-6 pt-2">
          <li>ロール階層の適切な設計（Functional Role と Access Role の分離）</li>
          <li>USAGE権限による階層的なアクセス制御</li>
          <li>最小権限の原則の徹底</li>
          <li>業務機能に基づくロール設計</li>
          <li>定期的な権限レビューと監査</li>
        </ul>
        これらの原則に従うことで、セキュリティを確保しつつ、管理の複雑さを軽減し、スケーラブルなアクセス制御システムを構築することができます。
      </p>
    </div>
  );
} 
