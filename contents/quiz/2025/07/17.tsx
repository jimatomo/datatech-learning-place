import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Infrastructure", "IaC", "Terraform", "DevOps", "Style Guide"],
    created_at: new Date("2025-07-17"),
    updated_at: new Date("2025-07-17"),

    // ----- quiz -----
    title: "Terraformのスタイルガイド",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Terraformのコードフォーマットでは、ネストレベルごとに4スペースでインデントするのが推奨されている。",
      1: "terraform fmtコマンドは、コードの構文的な妥当性をチェックするが、プロバイダー固有の引数の妥当性は検証しない。",
      2: "リソース名には名詞を使用し、リソースタイプを含めないことが推奨されている。",
      3: "すべての変数に型と説明を含める必要はなく、重要な変数のみに説明を追加すれば十分である。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Terraform Style Guide - HashiCorp Developer",
        url: "https://developer.hashicorp.com/terraform/language/style",
      },
      {
        title: "Terraform Configuration Language",
        url: "https://developer.hashicorp.com/terraform/language",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Terraformのスタイルガイドに関する記述として、
        <strong className="text-emerald-500">正しい</strong>ものはどれですか？
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        選択肢の中で正しいものは次のとおりです。
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>
            「リソース名には名詞を使用し、リソースタイプを含めないことが推奨されている。」
          </strong>
          ：これは正しい記述です。Terraformのスタイルガイドでは、リソース名には名詞を使用し、リソースタイプを名前に含めないことが推奨されています。
          例えば、`aws_instance`リソースの名前は`web_server`のように、リソースの用途を表す名詞を使用します。
        </li>
      </ul>
      <p className="py-2">その他の選択肢は間違った記述です：</p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>
            「Terraformのコードフォーマットでは、ネストレベルごとに4スペースでインデントするのが推奨されている。」
          </strong>
          ：これは間違った記述です。Terraformでは<strong className="text-red-500">2スペースでインデント</strong>することが推奨されています。
          4スペースではなく2スペースを使用することで、コードの可読性を保ちながら適切な階層構造を表現します。
        </li>
        <li className="pb-2">
          <strong>
            「terraform fmtコマンドは、コードの構文的な妥当性をチェックするが、プロバイダー固有の引数の妥当性は検証しない。」
          </strong>
          ：これは間違った記述です。`terraform fmt`コマンドは<strong className="text-red-500">コードのフォーマットのみを行い、構文チェックは行いません</strong>。
          構文的な妥当性をチェックするのは`terraform validate`コマンドです。
        </li>
        <li className="pb-2">
          <strong>
            「すべての変数に型と説明を含める必要はなく、重要な変数のみに説明を追加すれば十分である。」
          </strong>
          ：これは間違った記述です。Terraformのスタイルガイドでは<strong className="text-red-500">すべての変数に型と説明を含めることが推奨</strong>されています。
          これにより、コードの保守性と可読性が向上し、チーム開発での理解が促進されます。
        </li>
      </ul>
      <p className="py-2">
        <strong>Terraformスタイルガイドの主要な推奨事項：</strong>
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-1">
          <strong>インデント：</strong>2スペースを使用
        </li>
        <li className="pb-1">
          <strong>リソース名：</strong>名詞を使用し、リソースタイプを含めない
        </li>
        <li className="pb-1">
          <strong>変数：</strong>すべての変数に型と説明を含める
        </li>
        <li className="pb-1">
          <strong>ファイル名：</strong>main.tf、variables.tf、outputs.tfなどの標準的な命名規則に従う
        </li>
        <li className="pb-1">
          <strong>コメント：</strong>#を使用して単行・複数行コメントを記述
        </li>
        <li className="pb-1">
          <strong>フォーマット：</strong>コミット前にterraform fmtを実行
        </li>
        <li className="pb-1">
          <strong>検証：</strong>terraform validateで構文チェックを実行
        </li>
      </ul>
      <p className="pt-2">
        Terraformのスタイルガイドに従うことで、コードの一貫性、可読性、保守性が向上し、チーム開発での協力がスムーズになります。特に大規模なプロジェクトでは、統一されたスタイルが重要であり、CI/CDパイプラインでの自動フォーマットや検証の実装も推奨されています。
      </p>
    </div>
  );
}