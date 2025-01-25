import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import Image from "next/image";
export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["DMBOK", "Data Management"],
    created_at: new Date("2025-01-25"),
    updated_at: new Date("2025-01-25"),

    // ----- quiz -----
    title: "DMBOKピラミッドについて",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "A: 1        B: 2        C: 3        D: 4",
      1: "A: 1        B: 3        C: 2        D: 4",
      2: "A: 2        B: 3        C: 1        D: 4",
      3: "A: 3        B: 2        C: 1        D: 4",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Note - DMBOK第1章データマネジメント", url: "https://note.com/zono_data/n/n2d0dd6e23a39" },
      { title: "DMBOKのすすめ", url: "https://www.dama-japan.org/images/ADMC2019/DL/ADMC2019%E3%83%A9%E3%82%A4%E3%83%88%E3%83%8B%E3%83%B3%E3%82%B0%E3%83%88%E3%83%BC%E3%82%AF_Metafind%E3%82%B3%E3%83%B3%E3%82%B5%E3%83%AB%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0.pdf" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">下記のDMBOKピラミッドのフェーズの組み合わせとして正しいものを選択してください</p>
      <Image src="https://datatech-learning-place.net/image/quiz/2025/dmbok-pyramid.png" alt="DMBOKピラミッド" width={500} height={500} />
      <ul className="pt-2 text-xs text-left">
        <li>・フェーズA: データ統合と相互運用性、データセキュリティ、データストレージとオペレーション、データモデリングとデザイン</li>
        <li>・フェーズB: データガバナンス、データウェアハウジング・BI、参照データとマスターデータ、ドキュメントとコンテンツ</li>
        <li>・フェーズC: データアーキテクチャ、データ品質、メタデータ</li>
        <li>・フェーズD: データマイニング、Analytics、ビッグデータ</li>
      </ul>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        DMBOKピラミッドは、企業のフェーズ毎にどの領域に取り組むべきかをピラミッド構造で表現したものです。
        全体で4つのフェーズに分かれています。
      </p>
      <p className="pt-2">
        <strong>【フェーズ1】</strong>では組織はまずデータベース機能を含むアプリケーションを購入します。
        データモデリングとデザイン、データストレージとオペレーション、データセキュリティの作業を開始するスタートラインに立った状態です。
        データ統合と相互運用性の作業をすることでデータを使える状態に整えていきます。
      </p>
      <p className="pt-2">
        <strong>【フェーズ2】</strong>はアプリケーションを利用し始めた段階です。このタイミングでデータの品質に問題があることに気づいたりします。
        その品質を安定させるためにより高度なデータアーキテクチャを模索するようになり、同時にメタデータの整備を進めます。
      </p>
      <p className="pt-2">
        <strong>【フェーズ3】</strong>では、フェーズ2で整えた部分の統制を取る必要が出てき、データマネジメント活動に後続的なサポートを提供するガバナンスが必要になります。
        基盤部分が成熟した状態になり、安定してより戦略的なデータ活用が可能となります。様々な施策が動き始め成果が出始めているでしょう。
      </p>
      <p className="pt-2">
        <strong>【フェーズ4】</strong>になると、組織はさらに高度なデータ分析施策を推し進めていくことができる状態となります。
      </p>
      <p className="pt-2">
        ただし、必ずしもフェーズ1から順に取り組む必要はなく、企業の課題や優先度に応じて適切な知識領域から始めることができます。
        ピラミッド構造でとらえることで、関係性が近い取り組みを整理することができます。
      </p>
      <p className="pt-2">
        また、ある程度の高さまでなら、つぎはぎの状態や歯抜けの状態でも到達することが可能ですが、
        高く積み上げていくには土台がしっかりしていないといけないということを暗示しているように私は感じています。
      </p>
    </div>
  );
} 
