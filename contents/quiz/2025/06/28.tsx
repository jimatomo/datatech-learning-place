import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Management", "Semantic Model", "Controlled Vocabulary", "Knowledge Organization", "DMBOK"],
    created_at: new Date("2025-06-28"),
    updated_at: new Date("2025-06-28"),

    // ----- quiz -----
    title: "意味的モデルと統制語彙による知識組織化のベストプラクティス",
    question_jsx: <QuizQuestion />,
    options: {
      0: "意味的モデルは、ドメインの概念、エンティティ、それらの関係性を構造化して表現することで、データの意味を明確化し、ステークホルダー間での共通理解を促進する。",
      1: "統制語彙（Controlled Vocabulary）は、同義語やバリエーションを標準化された用語に統一することで、データの一貫性と検索性を向上させる仕組みである。",
      2: "意味的モデルにおいて、オントロジーやタクソノミーは概念間の階層関係や意味的関係を定義するための重要な構造化手法である。",
      3: "統制語彙の維持管理は一度構築すれば継続的な更新は不要であり、システム導入時のみ実施すれば十分である。",
      4: "意味的モデルは技術的な実装のみを対象とし、ビジネス用語や業務プロセスとは分離して管理するべきである。",
    },
    answers: [3, 4],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "データマネジメント知識体系ガイド 第二版", url: "https://www.amazon.co.jp/dp/4296100491" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        組織のデータ管理において、意味的モデル（Semantic Model）と統制語彙（Controlled Vocabulary）の適用に関する説明で、
        <span className="text-red-500">間違っているもの</span>をすべて選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        この問題では、意味的モデルと統制語彙の役割とベストプラクティスについて理解することを目的としています。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong>「意味的モデルは、ドメインの概念、エンティティ、それらの関係性を構造化して表現することで、データの意味を明確化し、ステークホルダー間での共通理解を促進する。」：</strong>
          これは正しい記載です。意味的モデルは、ビジネスドメインの概念とその関係性を明確に定義することで、
          データの意味を構造化し、組織内でのデータ理解を統一します。
          これにより、データサイエンティスト、ビジネスアナリスト、開発者間での
          共通言語が確立されます。
        </li>
        <li className="py-2">
          <strong>「統制語彙（Controlled Vocabulary）は、同義語やバリエーションを標準化された用語に統一することで、データの一貫性と検索性を向上させる仕組みである。」：</strong>
          これは正しい記載です。統制語彙は、同一概念を表す複数の表記（「顧客」「お客様」「Customer」など）を
          標準化された用語に統一する仕組みです。これにより、データの品質向上、
          検索精度の改善、システム間の相互運用性が実現されます。
        </li>
        <li>
          <strong>「意味的モデルにおいて、オントロジーやタクソノミーは概念間の階層関係や意味的関係を定義するための重要な構造化手法である。」：</strong>
          これは正しい記載です。オントロジーは概念間の複雑な関係性を表現し、タクソノミーは階層構造を定義します。
          これらは意味的モデルの基盤となり、RDF（Resource Description Framework）、OWL（Ontology Web Language）、SKOS（Simple Knowledge Organization System）などの標準技術で実装されます。
        </li>
        <li className="py-2">
          <strong>「統制語彙の維持管理は一度構築すれば継続的な更新は不要であり、システム導入時のみ実施すれば十分である。」：</strong>
          これは間違った記載です。統制語彙は継続的な維持管理が必要です。ビジネス環境の変化、新しい概念の追加、
          廃止された用語の管理、同義語の追加など、定期的な更新とガバナンスプロセスが
          不可欠です。放置すると語彙の一貫性が失われ、データ品質が劣化します。
        </li>
        <li>
          <strong>「意味的モデルは技術的な実装のみを対象とし、ビジネス用語や業務プロセスとは分離して管理するべきである。」：</strong>
          これは間違った記載です。意味的モデルは技術とビジネスの橋渡し役です。ビジネス用語、業務プロセス、
          規制要件などを含めて包括的に設計することで、データドリブンな意思決定を
          支援します。技術的実装のみに焦点を当てると、ビジネス価値の実現が困難になります。
        </li>
      </ul>
      <p className="pt-4">
        <strong>実践的なポイント：</strong>
        意味的モデルと統制語彙は、データガバナンス戦略の中核要素であり、
        組織のデジタル変革において重要な基盤となります。適切な設計と継続的な管理により、
        データの価値を最大化し、組織全体でのデータ活用を促進できます。
      </p>
    </div>
  );
}