import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["DMBOK", "Data Management", "Data Modeling"],
    created_at: new Date("2025-03-08"),
    updated_at: new Date("2025-03-08"),

    // ----- quiz -----
    title: "ディメンションモデリングにおけるSCD（Slowly Changing Dimension）について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "タイプ1 SCDは、変更があった場合に既存の値を上書きし、履歴を保持しない方法である",
      1: "タイプ2 SCDは、変更があった場合に新しいレコードを追加し、有効期間フラグや日付で履歴を管理する方法である",
      2: "タイプ3 SCDは、変更があった場合に別の列に以前の値を保持し、現在値と過去値の両方を同一レコードで参照できるようにする方法である",
      3: "タイプ0 SCDは、ディメンション属性の変更を一切追跡せず、初期ロード時の値を永続的に保持する方法である",
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
      <span>
        ディメンションモデリングにおけるSCD（Slowly Changing Dimension）のタイプについて、<span className="text-red-500">間違っている</span>選択肢を選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        ディメンションモデリングにおけるSCD（Slowly Changing Dimension）のタイプについて、間違っている選択肢は
        「タイプ0 SCDは、ディメンション属性の変更を一切追跡せず、初期ロード時の値を永続的に保持する方法である」です。
      </p>
      <p className="py-2">
        実際には、タイプ0 SCDという分類は一般的なディメンションモデリングの標準では定義されていません。
        一般的に広く認識されているのは、タイプ1、タイプ2、タイプ3のSCDです。
        「初期ロード時の値を永続的に保持する」という概念は、「変更されない属性」や「静的属性」として扱われることはありますが、
        正式なタイプ0 SCDとして標準化されているわけではありません。
      </p>
      <p className="py-2">
        その他の選択肢はすべて正しい内容です：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          <strong>タイプ1 SCD</strong>：最も単純なSCDで、変更があった場合に既存の値を上書きします。履歴は保持されず、常に最新の情報のみが保持されます。
          実装が簡単ですが、過去の状態を参照できないというデメリットがあります。
        </li>
        <li className="pb-1">
          <strong>タイプ2 SCD</strong>：変更があった場合に新しいレコードを追加し、有効期間フラグや開始日・終了日などで履歴を管理します。
          これにより時系列での分析が可能になりますが、テーブルサイズが大きくなるというデメリットがあります。
          dbtのsnapshotなど過去のレコードの状態を管理する方法として一般的です。
        </li>
        <li className="pb-1">
          <strong>タイプ3 SCD</strong>：変更があった場合に、同一レコード内の別の列に以前の値を保持します。
          現在値と過去値（通常は直前の値のみ）の両方を参照できますが、複数の変更履歴を保持することはできません。
        </li>
      </ul>
      <p>
        SCDはデータウェアハウスにおいて、時間の経過とともに徐々に変化するディメンション属性（例：顧客の住所、従業員の部署、製品の価格など）を
        どのように扱うかを定義する重要な概念です。ビジネス要件や分析ニーズに応じて、適切なSCDタイプを選択することが重要です。
      </p>
    </div>
  );
} 
