import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Integration", "CDC", "ETL", "Data Management"],
    created_at: new Date("2026-01-17"),
    updated_at: new Date("2026-01-17"),

    // ----- quiz -----
    title: "CDC（変更データ取り込み）の主要技法と比較",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ログテーブルによる差分取り込み: データベースのトリガーを使用して、変更（挿入・更新・削除）が発生するたびに専用のシャドウテーブル等に記録する手法。削除も含めた完全な履歴を捕捉できるが、トリガー実行によるソースデータベースへの書き込みオーバーヘッドが発生し、パフォーマンスに影響を与える可能性がある。",
      1: "タイムスタンプによる差分取り込み: ソーステーブルの「最終更新日時」カラム等を利用して、前回抽出以降に変更されたレコードのみを抽出する手法。実装の複雑性が低く一般的だが、ソース側で物理削除（Hard Delete）されたレコードについても、更新タイムスタンプによって容易に検知しターゲットに反映することができる。",
      2: "データベースのトランザクションログ: データベースの先行書き込みログ（WAL）やバイナリログを直接読み取って変更を抽出する手法。ソースシステムへの負荷が非常に低く、すべての操作（削除を含む）をリアルタイムに近い速度で捕捉できるが、導入・運用の複雑性は高い。",
      3: "全件取り込み: ソーステーブルの全データを毎回抽出する手法。ソースシステムへの変更要件が少なく実装も単純だが、データ量の増加に伴い抽出時間が長くなる。物理削除への対応は、ターゲットの洗い替えで同期するか、前回データとの全件比較が必要となるため効率は悪い。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Change data capture", url: "https://en.wikipedia.org/wiki/Change_data_capture" },
      { title: "Debezium - CDC Pattern", url: "https://debezium.io/documentation/reference/stable/tutorial.html" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        データ統合における<strong>CDC（Change Data Capture：変更データの取り込み）</strong>技法には、
        ソースシステムの要件、複雑性、パフォーマンス、削除の扱いなどにおいてそれぞれ特徴があります。
      </p>
      <p>
        以下の記述のうち、各CDC技法の特徴として
        <strong className="text-red-600">誤っているもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong>タイムスタンプによる差分取り込み</strong>に関する記述が誤りです。
          この手法の最大の弱点は、ソースシステム上で<strong>物理削除（Hard Delete）されたレコードを検知できない</strong>ことです。
          行そのものが削除されるとタイムスタンプも消失するため、削除を検知するには論理削除（Soft Delete）フラグを使用するか、
          全件比較など別の高コストな手段を組み合わせる必要があります。
        </li>
      </ul>

      <p className="font-semibold text-emerald-600">その他の正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong>ログテーブル（トリガーベース）</strong>:
          トリガーにより削除を含む全操作を確実に捕捉できますが、ソースDBへの書き込み負荷（オーバーヘッド）が増加し、
          トリガー保守の手間が発生します。
        </li>
        <li>
          <strong>トランザクションログ（Log-based CDC）</strong>:
          DBの内部ログ（WAL/Binlog）を参照するため、ソースへの負荷が最小限で、かつリアルタイム性が高く、
          削除操作もイベントとして記録されるため検知可能です。ただしDebezium等の専用ツールが必要で導入難易度は高くなります。
        </li>
        <li>
          <strong>全件取り込み（Full Load）</strong>:
          最もシンプルですが、データ量増大に伴い処理時間が長くなります。
          ターゲットを毎回<code>TRUNCATE</code>して入れ替える（洗い替え）場合は削除も反映されますが、
          差分検知として「何が削除されたか」を特定するには、前回スナップショットとの比較が必要となり非効率です。
        </li>
      </ul>
      
      <div className="mt-4">
        <p className="font-semibold mb-2">CDC技法の比較まとめ</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">技法</TableHead>
              <TableHead>削除の検知</TableHead>
              <TableHead>ソース負荷</TableHead>
              <TableHead>複雑性</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">全件取り込み</TableCell>
              <TableCell>困難（全件比較要）</TableCell>
              <TableCell>高（I/O大）</TableCell>
              <TableCell>低</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">タイムスタンプ</TableCell>
              <TableCell>不可（物理削除時）</TableCell>
              <TableCell>低～中</TableCell>
              <TableCell>低</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">ログテーブル</TableCell>
              <TableCell>可能</TableCell>
              <TableCell>高（書込時）</TableCell>
              <TableCell>中</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">ログベース</TableCell>
              <TableCell>可能</TableCell>
              <TableCell>低</TableCell>
              <TableCell>高</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
