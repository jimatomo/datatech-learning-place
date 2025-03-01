import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["DMBOK", "Modeling"],
    created_at: new Date("2025-03-01"),
    updated_at: new Date("2025-03-01"),

    // ----- quiz -----
    title: "データモデリングにおけるディメンショナルスキームについて",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "ファクトテーブルは業務上重要な対象を表し、ディメンショナルテーブルと結合することで分析する際の問い合わせの軸を提供する",
      1: "1960年代にゼネラルミルズとダートマス大学が共同で実施したプロジェクトから始まった",
      2: "大量データに対する問い合わせと分析が最適化されるようにデータが構造化されている",
      3: "特定の業務プロセスに的を絞った業務上の設問に対応する",
      4: "リレーショナルモデルではリレーションシップの線が業務ルールを捉えるのに対し、ディメンショナルモデルでは業務的な設問に答えるために必要なナビゲーションパスを捉える",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "データマネジメント知識体系ガイド 第二版", url: "https://www.amazon.co.jp/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E7%9F%A5%E8%AD%98%E4%BD%93%E7%B3%BB%E3%82%AC%E3%82%A4%E3%83%89-%E7%AC%AC%E4%BA%8C%E7%89%88-DAMA-International/dp/4296100491" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        データモデリングにおけるディメンショナルスキームについて、<span className="text-red-500">間違っている</span>選択肢を選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        データモデリングにおけるディメンショナルスキームについて、間違っている選択肢は「ファクトテーブルは業務上重要な対象を表し、
        ディメンショナルテーブルと結合することで分析する際の問い合わせの軸を提供する」です。
      </p>
      <p className="py-2">
        正しくは、ファクトテーブルは業務上の測定値（メジャー）を表し、ディメンショナルテーブルが分析の軸となる属性を提供します。
        ファクトテーブルには数値データ（売上金額、数量など）が格納され、ディメンショナルテーブルには分析の視点となる情報（日付、商品、顧客など）が格納されます。
      </p>
      <p className="py-2">
        その他の選択肢はすべて正しい内容です：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          ディメンショナルモデリングは1960年代にゼネラルミルズとダートマス大学の共同プロジェクトから始まりました。
          歴史はかなり長い枯れたモデリング手法です。
        </li>
        <li className="pb-1">
          ディメンショナルスキームは大量データに対する問い合わせと分析が最適化されるように設計されています。
          例えばリレーショナルモデルでは正規化するのが一般的なデータもディメンショナルモデルでは非正規化したディメンションテーブルとして保持したりします。
        </li>
        <li className="pb-1">
          ディメンショナルモデルは特定の業務プロセスに焦点を当て、業務上の設問に対応するために設計されています。
          参考文献の本の中では入学申請の例が取り上げられています。
          測定されるプロセスが入学申請で、ディメンションとしては学生が所属する地域ごと学校名ごと、学資援助を受けているかどうかなど様々な属性が例示されています。
        </li>
        <li className="pb-1">
          リレーショナルモデルがリレーションシップで業務ルールを捉えるのに対し、
          ディメンショナルモデルは業務的な設問に答えるためのナビゲーションパスを捉えます。
        </li>
      </ul>
      <p>
        ディメンショナルモデリングはデータウェアハウスやBIシステムで広く使用され、スタースキーマやスノーフレークスキーマなどの形式で実装されます。
        ディメンションモデリングの日本語の本も出てきているので、興味のある方は是非読んでみてください。
      </p>
    </div>
  );
} 
