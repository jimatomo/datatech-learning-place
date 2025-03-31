import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Security", "Data Masking", "Snowflake Advanced"],
    created_at: new Date("2025-04-01"),
    updated_at: new Date("2025-04-01"),

    // ----- quiz -----
    title: "Snowflakeのダイナミックデータマスキングについて",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "ダイナミックデータマスキングは、データを保存する前にマスキングを適用し、マスクされたデータを保存する",
      1: "ダイナミックデータマスキングは、クエリ実行時にリアルタイムでマスキングを適用し、元のデータは保持される",
      2: "ダイナミックデータマスキングは、Enterprise Edition以上のエディションでのみ利用可能で、Standard Editionでは利用できない",
      3: "ダイナミックデータマスキングポリシーは、ビューには適用できない",
    },
    answers: [1, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "列レベルのセキュリティについて", url: "https://docs.snowflake.com/ja/user-guide/security-column-intro" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeのダイナミックデータマスキングは、機密データを保護するための重要なセキュリティ機能です。
        ダイナミックデータマスキングに関する説明として、<strong>正しいもの全て</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeのダイナミックデータマスキングは、クエリ実行時にデータのマスキングを行う機能です。各選択肢について解説します。
      </p>

      <p className="py-2 font-semibold text-green-600">正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>ダイナミックデータマスキングは、クエリ実行時にリアルタイムでマスキングを適用し、元のデータは保持される:</strong>
          <br />
          これは正しい説明です。ダイナミックマスキングは、保存されている元のデータを変更せず、クエリが実行された際にポリシーに基づいてデータをマスクして返します。これにより、元のデータを安全に保ちつつ、アクセス制御を行うことができます。
        </li>
        <li className="pt-2">
          <strong>ダイナミックデータマスキングは、Enterprise Edition以上のエディションでのみ利用可能で、Standard Editionでは利用できない:</strong>
          <br />
          これも正しい説明です。ダイナミックデータマスキングは、Snowflakeの高度なセキュリティ機能の一つであり、利用するにはEnterprise Edition以上のアカウントが必要です。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-600">不正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>ダイナミックデータマスキングは、データを保存する前にマスキングを適用し、マスクされたデータを保存する:</strong>
          <br />
          これは誤りです。ダイナミックマスキングはデータを保存する前ではなく、クエリ実行時にマスキングを適用します。保存前にマスキングを行うのは、静的データマスキングと呼ばれる別のアプローチです。
        </li>
        <li className="pt-2">
          <strong>ダイナミックデータマスキングポリシーは、ビューには適用できない:</strong>
          <br />
          これも誤りです。ダイナミックデータマスキングポリシーは、テーブルだけでなくビューに対しても適用することができます。これにより、ビューを通じてアクセスされるデータに対してもマスキング制御を適用できます。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        ダイナミックデータマスキングは、クエリ時にリアルタイムでデータマスキングを適用する強力な機能であり、Enterprise Edition以上で利用可能です。
        適切に利用することによって、セキュアビューの爆増を防ぐことができ、管理を効率的に行うことができるようになります。
      </p>
    </div>
  );
} 
