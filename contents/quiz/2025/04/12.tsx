import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Storage", "Database", "Data Management"],
    created_at: new Date("2025-04-12"),
    updated_at: new Date("2025-04-12"),

    // ----- quiz -----
    title: "変更データキャプチャ（CDC）の概要と特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "CDCは、データベース内のデータ変更（挿入、更新、削除）をリアルタイムまたはニアリアルタイムで特定し、追跡するための技術やプロセス。",
      1: "ログベースCDCは、データベースのトランザクションログを読み取るため、ソースシステムへのパフォーマンス影響が比較的小さい。",
      2: "トリガーベースCDCは、データベースのトリガーを使用して変更をキャプチャするが、ソースデータベースへの負荷が高くなる可能性がある。",
      3: "クエリベースCDCは、テーブルのタイムスタンプやバージョン列に依存するが、削除されたレコードの変更を検出するのが容易である。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Change data capture (CDC)とは？仕組みやメリット・デメリットをわかりやすく解説", url: "https://data.wingarc.com/what-is-cdc-change-data-capture-18243" },
      { title: "AWS Database Migration Service ドキュメント: Change Data Capture (CDC)", url: "https://docs.aws.amazon.com/ja_jp/dms/latest/userguide/CHAP_Task.CDC.html" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        変更データキャプチャ（CDC）に関する記述として、<span className="text-red-500">間違っている</span>選択肢を選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        <strong>「クエリベースCDCは、テーブルのタイムスタンプやバージョン列に依存するが、削除されたレコードの変更を検出するのが容易である。」</strong>という記述は間違っています。
        クエリベースCDCは、テーブルに最終更新日時を示すタイムスタンプ列やバージョン番号列を追加し、定期的にクエリを実行して変更を検出します。
        この方法は実装が比較的容易な場合がありますが、削除されたレコードの検出が困難または不可能であるという欠点があります。
        また、頻繁なポーリングはソースデータベースに負荷をかける可能性があります。
      </p>
      <p className="py-2">
        その他の選択肢はCDCに関する正しい記述です。CDCの主な手法には以下のものがあります。
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>ログベースCDC:</strong> データベースのトランザクションログ（例: PostgreSQLのWAL、MySQLのBinlog）を読み取り、変更イベントを抽出します。
          ソースデータベースへの影響が最も少なく、削除を含む全ての変更を確実にキャプチャできるため、多くのユースケースで推奨される手法です。
          ただ、ソースデータベース側のトランザクションログの出力に関する特殊な設定を入れる必要がある場合が多く、書き込みへの定常的な負荷が増す可能性があるので、許容されないケースも多くあります。
        </li>
        <li className="pb-2">
          <strong>トリガーベースCDC:</strong> 監視対象テーブルに挿入、更新、削除のトリガーを設定し、変更が発生するたびに別の変更履歴テーブルに変更内容を書き込みます。
          実装は直感的ですが、トリガーの実行がトランザクションの一部となるため、ソースデータベースのパフォーマンスに影響を与える可能性があります。
        </li>
        <li className="pb-2">
          <strong>クエリベースCDC:</strong> 前述の通り、タイムスタンプやバージョン列を利用して定期的にクエリを実行し、変更を検出します。
          実装は容易な場合もありますが、削除の検出が困難であり、リアルタイム性も低くなります。
        </li>
      </ul>
      <p className="pt-2">
        CDCは、データウェアハウスへのデータ連携、リアルタイム分析基盤の構築、マイクロサービス間のデータ同期など、様々なシナリオで活用される重要な技術です。
      </p>
    </div>
  );
} 
