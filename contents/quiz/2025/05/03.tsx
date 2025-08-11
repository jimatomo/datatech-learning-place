import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Management", "Security"],
    created_at: new Date("2025-05-03"),
    updated_at: new Date("2025-05-03"),

    // ----- quiz -----
    title: "データマスキング手法に関する説明",
    question_jsx: <QuizQuestion />,
    options: {
      0: "置換 (Substitution): 元のデータを意味のある代替値（例：仮名）に置き換える手法。データの形式や型を維持しやすい。",
      1: "シャッフル (Shuffling): 列内のデータをランダムに並び替える手法。個々の値は元のままですが、レコード間の関連性が失われる。",
      2: "Null化 (Nulling): 機密データをNULL値または空文字に置き換える手法。最も単純だが、データの有用性が大きく損なわれる可能性がある。",
      3: "値分散 (Value Variance): 数値データに対して比較的小さなランダムな値を加算または減算する手法。データの統計的分布を大きく歪める目的で用いられる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "データマネジメント知識体系ガイド 第二版", url: "https://www.amazon.co.jp/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E7%9F%A5%E8%AD%98%E4%BD%93%E7%B3%BB%E3%82%AC%E3%82%A4%E3%83%89-%E7%AC%AC%E4%BA%8C%E7%89%88-DAMA-International/dp/4296100491" },
      { title: "What Is Data Masking: Techniques, Types, Examples, and Best Practices", url: "https://atlan.com/data-masking-101/" },
      { title: "The Ultimate Guide to Data Masking", url: "https://www.cometchat.com/blog/data-masking-best-practices" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        データマスキング手法に関する記述として、<span className="text-red-500">間違っている</span>ものを選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        <strong>「値分散 (Value Variance): 数値データに対して比較的小さなランダムな値を加算または減算する手法。データの統計的分布を大きく歪める目的で用いられる。」</strong>という記述は間違っています。
        値分散（またはノイズ加算）は、個々の値をわずかに変更することでプライバシーを保護しつつ、データセット全体の<strong>統計的な分布（平均、分散など）を可能な限り維持する</strong>ことを目的としています。分布を大きく歪めてしまうと、データの有用性が損なわれてしまいます。
      </p>
      <p className="py-2">
        その他の選択肢は正しい記述です：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>置換 (Substitution):</strong> 元のデータを、データの意味や形式を保ったまま別の値に置き換えます。例えば、実際の氏名を仮名に置き換えるなどが該当します。参照整合性を維持する必要がある場合に有効です。
          また、実データに近いことでテストの質を高く保つことが可能です。
        </li>
        <li className="pb-2">
          <strong>シャッフル (Shuffling):</strong> 特定の列内の値をランダムに並び替えます。列全体の統計的特性（分布など）は維持されますが、個々のレコード内の他の列との関連性は破壊されます。
        </li>
        <li className="pb-2">
          <strong>Null化 (Nulling):</strong> 機密性の高いデータをNULL値や空文字で完全に削除します。最も単純で不可逆的な方法ですが、データの分析や利用価値が大幅に低下する可能性があります。
        </li>
      </ul>
      <p className="pt-2">
        データマスキングは、本番データを開発、テスト、分析などの目的で安全に利用するために不可欠な技術です。適切なマスキング手法を選択することで、データのプライバシーを保護しつつ、データの有用性を維持することが可能になります。
      </p>
    </div>
  );
} 
