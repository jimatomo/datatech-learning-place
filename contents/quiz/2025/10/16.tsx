import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "AWS CDK", "IaC", "Infrastructure"],
    created_at: new Date("2025-10-16"),
    updated_at: new Date("2025-10-15"),

    // ----- quiz -----
    title: "AWS CDKのタグ付け（Tags.of）に関する基礎",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Tags.of(scope).add('Owner', 'DataTeam') は、特に除外設定をしない限り、そのスコープ配下のリソースにタグを伝播する。",
      1: "Tags.of(scope).remove('Owner') を使うと、そのスコープ配下では同キーのタグ付けを抑制できる（スコープ単位での除外）。",
      2: "add のオプション includeResourceTypes / excludeResourceTypes を使うと、特定の CloudFormation リソース種別（例: AWS::S3::Bucket）にのみ適用/除外できる。",
      3: "Tags.of(construct).add(...) はその construct だけにタグを付け、子には自動的に伝播しない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "タグと AWS CDK | AWS CDK v2 開発者ガイド", url: "https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/tagging.html" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      AWS CDK のタグ付け（<code>Tags.of(...).add/remove</code>）についての説明として、
      <strong className="text-red-600">誤っているもの</strong>を1つ選んでください。
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>選択肢の解説です。</p>
      <p className="font-semibold text-red-500 pt-2">誤っている記述（解答）:</p>
      <p>
        「Tags.of(construct).add(...) はその construct だけにタグを付け、子には自動的に伝播しない。」は誤りです。
        CDK のタグは、指定したスコープ（construct）配下にデフォルトで伝播し、該当スコープの子リソースにも適用されます。
      </p>

      <p className="font-semibold text-green-600 pt-2">正しい記述:</p>
      <ul className="list-disc pl-4 py-2 space-y-1">
        <li>
          <code>Tags.of(scope).add(&apos;Owner&apos;, &apos;DataTeam&apos;)</code> は、除外設定をしない限りスコープ配下のリソースへタグが伝播します。
        </li>
        <li>
          <code>Tags.of(scope).remove(&apos;Owner&apos;)</code> で、そのスコープ配下では同キーのタグ付けを抑制できます（スコープ単位の除外）。
        </li>
        <li>
          <code>includeResourceTypes</code> / <code>excludeResourceTypes</code> オプションに CloudFormation のリソース種別
          （例: <code>AWS::S3::Bucket</code>）を指定することで、適用対象を限定・除外できます。
        </li>
        <li>
          Auto Scaling グループに関しては、タグのオプションで起動インスタンスへの適用を制御するプロパティが提供されています（サービス特有の挙動）。
        </li>
      </ul>
    </div>
  );
}
