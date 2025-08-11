import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Engineering", "Datatech News", "VS Code", "dbt"],
    created_at: new Date("2025-06-01"),
    updated_at: new Date("2025-06-01"),

    // ----- quiz -----
    title: "dbt FusionエンジンとVS Code Extensionの特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "dbt FusionエンジンはRustで構築されており、大規模なdbtプロジェクトの解析においてdbt Coreより約30倍高速である。",
      1: "dbt FusionはSQLコードをネイティブに理解するため、データウェアハウスに接続せずにローカルでリアルタイムなコード検証が可能である。",
      2: "公式dbt VS Code Extensionは、dbt Coreで開発されたプロジェクトでも、dbt Fusionエンジンの高度な機能の一部を利用できるように互換性が確保されている。",
      3: "dbt Fusionの状態認識機能は、プロジェクトのコードベースとウェアハウスのマテリアライズ状態を理解し、必要なモデルのみを再構築することでコスト削減とパイプラインの高速化を実現する。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Get to know the new dbt Fusion engine and VS Code Extension - dbt Labs", url: "https://www.getdbt.com/blog/get-to-know-the-new-dbt-fusion-engine-and-vs-code-extension" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        dbt Labsが発表したdbt Fusionエンジンと公式VS Code Extensionに関する記述として、<span className="text-red-500">間違っている</span>ものはどれですか？
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        選択肢の中で間違っているものは次のとおりです。
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>「公式dbt VS Code Extensionは、dbt Coreで開発されたプロジェクトでも、dbt Fusionエンジンの高度な機能の一部を利用できるように互換性が確保されている。」</strong>：これは間違った記述です。
          記事には「Note that to use the VS Code Extension, your project must be running on the Fusion engine. The extension does not support dbt Core, as the key developer experience enhancements it&apos;s designed to enable rely on the technological foundations of ‌the new engine.」と記載されており、VS Code Extensionの使用にはdbt Fusionエンジンが必須であり、dbt Coreはサポートされていません。
        </li>
      </ul>
      <p className="py-2">
        その他の選択肢は正しい記述です：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>「dbt FusionエンジンはRustで構築されており、大規模なdbtプロジェクトの解析においてdbt Coreより約30倍高速である。」</strong>：
          これは正しい記述です。記事には「Fusion is built in Rust, a systems-level language known for performance, and optimized to parse even the largest dbt projects 30x faster than dbt Core.」と説明されています。
        </li>
        <li className="pb-2">
          <strong>「dbt FusionはSQLコードをネイティブに理解するため、データウェアハウスに接続せずにローカルでリアルタイムなコード検証が可能である。」</strong>：
          これは正しい記述です。記事では「dbt can emulate your cloud data warehouse locally and reason about your code with the intelligence of a modern compiler. It&apos;s a major shift that enables powerful new capabilities—like validating your code in real time, without ever needing to hit the warehouse.」と述べられています。
        </li>
        <li className="pb-2">
          <strong>「dbt Fusionの状態認識機能は、プロジェクトのコードベースとウェアハウスのマテリアライズ状態を理解し、必要なモデルのみを再構築することでコスト削減とパイプラインの高速化を実現する。」</strong>：
          これは正しい記述です。記事には「This means that dbt can now dynamically make determinations about, for example, which models truly need to be rebuilt, as opposed to which ones have already been built very recently. This results in higher velocity pipelines and built-in cost savings.」と記載されています。
        </li>
      </ul>
      <p className="pt-2">
        dbt FusionエンジンとVS Code Extensionは、データ開発の効率と体験を大幅に向上させることを目的としています。
      </p>
    </div>
  );
} 
