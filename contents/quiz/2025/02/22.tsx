import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["DMBOK", "Data Management", "Data Modeling"],
    created_at: new Date("2025-02-22"),
    updated_at: new Date("2025-02-22"),

    // ----- quiz -----
    title: "データモデリングにおけるリレーショナルスキームについて",
    question_jsx: <QuizQuestion />,
    options: { 
      0: `1970年、エドワード・コッド（Edward Codd）博士によって最初に提唱された`,
      1: `二次元のリレーションを利用することでデータストレージの冗長性を減らし、非常に効率的に管理できるようになった`,
      2: `一つの事実を一つの場所で持つことで冗長性を除去することができ、情報を素早く入力し正確に保存することができることから、業務用システムの設計に広く利用されるようになった`,
      3: `RDBMS型のデータベースを利用したシステムでしか採用ができないモデリング手法である`
    },
    answers: [3],
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
      <p>
        データモデリングはある一定の方法論に基づいてデータ構造やリレーションシップなどの
        メタデータを文書化することで秩序あるデータの取り扱いなどができる状態を目指す取り組みである。
        データモデリングにおけるリレーショナルスキームについての記述として、以下の選択肢から<span className="text-red-500">間違っているもの</span>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        リレーショナルスキームは、データモデリングの重要な概念の一つです。1970年にエドワード・コッド博士によって提唱され、
        以来、データベース設計の基礎となっています。
      </p>
      <p className="pt-2">
        このスキームの特徴は、二次元のテーブル（リレーション）を使用してデータを表現し、
        データの重複（冗長性）を最小限に抑えることができる点です。これにより、データの整合性を保ちながら、
        効率的なデータ管理が可能になります。
      </p>
      <p className="pt-2">
        誤りである選択肢は、「RDBMS型のデータベースを利用したシステムでしか採用ができないモデリング手法である」
        という記述です。実際には、リレーショナルスキームは概念・論理データモデリングにおいても有効な手法であり、
        物理データモデリングにおいてはRDBMSを前提としておりますが、上位のモデリングにおいては流用できます。
      </p>
      <p className="pt-2">
        例えば、NoSQLデータベースやオブジェクト指向データベースなど、様々なタイプのデータベースでも
        リレーショナルスキームの考え方を応用することができます。また、データの論理設計段階では、
        最終的な実装先のデータベース種別に関係なく、リレーショナルスキームを用いてモデリングを行うことが一般的です。
      </p>
      <p className="pt-2">
        データ基盤においては、ディメンショナルデータモデルもよく使われますので、多様な選択肢を持てるように幅広く学習をしていきましょう。
      </p>
    </div>
  );
} 

