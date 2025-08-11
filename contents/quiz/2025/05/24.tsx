import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Integration", "Data Management"],
    created_at: new Date("2025-05-24"),
    updated_at: new Date("2025-05-24"),

    // ----- quiz -----
    title: "データ統合におけるレイテンシ要件と処理方式の適切な組み合わせ選択",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ア: ストリーミング処理,\nイ: バッチ処理（hourly）",
      1: "ア: バッチ処理（daily）,\nイ: ストリーミング処理",
      2: "ア: Near Real-time処理,\nイ: バッチ処理（daily）",
      3: "ア: バッチ処理（weekly）,\nイ: Near Real-time処理",
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
      <p className="pb-2">
        以下の表は、データソースの特性とレイテンシ要件に応じて、適切なデータ統合処理方式を選択するためのマトリックスです。
        表の空欄 <strong className="text-emerald-500">[ ア ]</strong> と <strong className="text-emerald-500">[ イ ]</strong> に入る最も適切な処理方式の組み合わせを、以下の選択肢から選んでください。
      </p>
      <div className="overflow-x-auto py-2 text-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">データソース / レイテンシ要件</TableHead>
              <TableHead className="text-center">リアルタイム<br />（&lt;1秒）</TableHead>
              <TableHead className="text-center">準リアルタイム<br />（1分-1時間）</TableHead>
              <TableHead className="text-center">バッチ<br />（&gt;1時間）</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>イベントストリーム<br />（IoTセンサー、ログ）</TableCell>
              <TableCell><strong className="text-emerald-500">[ ア ]</strong></TableCell>
              <TableCell>マイクロバッチ処理</TableCell>
              <TableCell>バッチ処理（daily）</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>業務システム<br />（CRM、ERP）</TableCell>
              <TableCell>CDC + ストリーミング</TableCell>
              <TableCell><strong className="text-emerald-500">[ イ ]</strong></TableCell>
              <TableCell>バッチ処理（daily）</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        正解は <strong className="text-green-600">「ア: ストリーミング処理, イ: バッチ処理（hourly）」</strong> です。
      </p>
      <p className="py-2">
        データ統合におけるレイテンシ要件は、ビジネス要件と技術的制約のバランスを考慮して決定する必要があります。
        適切な処理方式の選択は、データソースの特性（更新頻度、データ量、形式）とビジネス側のレイテンシ要件を組み合わせて判断します。
      </p>
      <p className="py-2">
        以下に完成した表を示します。空欄 <strong className="text-green-600">[ ア ]</strong> と <strong className="text-green-600">[ イ ]</strong> に入る処理方式は太字で示しています。
      </p>
      <div className="py-2">
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">データソース / レイテンシ要件</TableHead>
              <TableHead className="text-center">リアルタイム<br />（&lt;1秒）</TableHead>
              <TableHead className="text-center">準リアルタイム<br />（1分-1時間）</TableHead>
              <TableHead className="text-center">バッチ<br />（&gt;1時間）</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>イベントストリーム<br />（IoTセンサー、ログ）</TableCell>
              <TableCell><strong className="text-emerald-500">ストリーミング処理</strong></TableCell>
              <TableCell>マイクロバッチ処理</TableCell>
              <TableCell>バッチ処理（daily）</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>業務システム<br />（CRM、ERP）</TableCell>
              <TableCell>CDC + ストリーミング</TableCell>
              <TableCell><strong className="text-emerald-500">バッチ処理（hourly）</strong></TableCell>
              <TableCell>バッチ処理（daily）</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="py-2">
        各選択肢の解説：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong className="text-emerald-500">ア: ストリーミング処理, イ: バッチ処理（hourly）：</strong>これは正しい記載です。
          <ul>
            <li className="py-1">イベントストリーム × リアルタイム: IoTセンサーやアプリケーションログなどの連続的なイベントストリームを1秒未満のレイテンシで処理するには、Apache Kafka、Apache Pulsar、Amazon Kinesisなどを活用したストリーミング処理が最適です。</li>
            <li className="py-1">業務システム × 準リアルタイム: CRMやERPなどの業務システムからのデータを1分-1時間の範囲で統合する場合、時間単位のバッチ処理が適切です。これにより、システム負荷とデータ整合性のバランスを取ることができます。</li>
          </ul>
        </li>
        <li className="pb-2">
          <strong>ア: バッチ処理（daily）, イ: ストリーミング処理：</strong>これは誤った記載です。「バッチ処理（daily）」は1秒未満のリアルタイム要件を満たすことができません。また、業務システムの準リアルタイム要件に対して「ストリーミング処理」は過剰な仕様となり、コストと複雑さが不要に増大します。
        </li>
        <li className="pb-2">
          <strong>ア: Near Real-time処理, イ: バッチ処理（daily）：</strong>これは誤った記載です。「Near Real-time処理」は通常1分-1時間の範囲を指すため、1秒未満のリアルタイム要件には適さない可能性があります。また、「バッチ処理（daily）」は準リアルタイム（1分-1時間）の要件を満たしません。
        </li>
        <li className="pb-2">
          <strong>ア: バッチ処理（weekly）, イ: Near Real-time処理：</strong>これは誤った記載です。「バッチ処理（weekly）」はリアルタイム要件を全く満たしません。「Near Real-time処理」は準リアルタイム要件には適していますが、より単純で実装・運用コストの低い時間単位のバッチ処理で十分な場合があります。
        </li>
      </ul>
      <p className="py-2">
        レイテンシ別の処理方式の特徴：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>リアルタイム処理（&lt;1秒）:</strong><br />
          Apache Kafka Streams、Apache Storm、Apache Flinkなどを使用。高いスループットと低レイテンシを実現しますが、実装の複雑さとコストが高くなります。障害時の処理継続性やexactly-once配信保証などの考慮が重要です。
        </li>
        <li className="pb-2">
          <strong>準リアルタイム処理（1分-1時間）:</strong><br />
          マイクロバッチ処理（Apache Spark Streaming）や時間単位のバッチ処理が適用されます。リアルタイム処理より実装が簡単で、データ整合性を保ちやすいという利点があります。
        </li>
        <li className="pb-2">
          <strong>バッチ処理（&gt;1時間）:</strong><br />
          従来型のETL処理。データ量が大きく、レイテンシ要件が緩い場合に最適です。実装が比較的簡単で、データ品質チェックや複雑な変換処理を行いやすいという特徴があります。
        </li>
      </ul>
      <p className="py-2">
        データソース別の考慮事項：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>イベントストリーム（IoTセンサー、ログ）:</strong><br />
          大量の連続データが生成されるため、ストリーミング処理に適しています。データ損失を防ぐためのバックプレッシャー制御や、スケーラブルなアーキテクチャが重要です。
        </li>
        <li className="pb-2">
          <strong>業務システム（CRM、ERP）:</strong><br />
          データ整合性が重要で、トランザクショナルな特性を持ちます。CDC（Change Data Capture）技術を活用してリアルタイムに変更を検知し、適切な処理方式でデータ統合を行います。
        </li>
      </ul>
      <p className="pt-2">
        実際のシステム設計では、ビジネス要件、技術的制約、運用コスト、開発リソースを総合的に検討し、最適なレイテンシ要件と処理方式を選択することが重要です。また、将来的な要件変更に対応できる柔軟なアーキテクチャを設計することも考慮すべき点です。
      </p>
    </div>
  );
} 
