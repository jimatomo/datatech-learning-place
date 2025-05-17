import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Security", "Access Control", "Data Management"],
    created_at: new Date("2025-05-17"),
    updated_at: new Date("2025-05-17"),

    // ----- quiz -----
    title: "セキュリティロール割り当てグリッドの適切な組み合わせ選択",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ア: カスタマーサポートロール,\nイ: プロダクトチームロール",
      1: "ア: 営業ロール,\nイ: マーケティングロール",
      2: "ア: 人事ロール,\nイ: 一般ロール",
      3: "ア: 開発者ロール,\nイ: セキュリティ管理者ロール",
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
        以下の表は、情報の種類（個人情報、一般情報）と公開先の機密レベル（制限なし、顧客の機密、社内の機密）に応じて、適切なセキュリティロールを割り当てるためのグリッドの一例です。
        表の空欄 <strong className="text-emerald-500">[ ア ]</strong> と <strong className="text-emerald-500">[ イ ]</strong> に入る最も適切なロール名の組み合わせを、以下の選択肢から選んでください。
      </p>
      <div className="overflow-x-auto py-2 text-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">情報種別 / 公開先</TableHead>
              <TableHead className="text-center">公開先の制限なし</TableHead>
              <TableHead className="text-center">顧客関連</TableHead>
              <TableHead className="text-center">社内関連</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>個人情報</TableCell>
              <TableCell>マーケティングロール</TableCell>
              <TableCell><strong className="text-emerald-500">[ ア ]</strong></TableCell>
              <TableCell>人事ロール</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>一般情報</TableCell>
              <TableCell>一般ロール</TableCell>
              <TableCell><strong className="text-emerald-500">[ イ ]</strong></TableCell>
              <TableCell>インサイダー情報ロール</TableCell>
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
        正解は <strong className="text-green-600">「ア: カスタマーサポートロール, イ: プロダクトチームロール」</strong> です。
      </p>
      <p className="py-2">
        セキュリティロールの割り当ては、情報資産を保護し、適切な人物が必要な情報にのみアクセスできるようにするための重要なプロセスです。
        情報の種類（例：個人情報、一般情報）と、その情報の公開先や取り扱いに関する機密レベル（例：公開制限なし、顧客の機密、社内の機密）を軸に分類し、それぞれの区分に適切なロールをマッピングします。
      </p>
      <p className="py-2">
        以下に完成した表の例を示します。空欄 <strong className="text-green-600">[ ア ]</strong> と <strong className="text-green-600">[ イ ]</strong> に入るロールは太字で示しています。
      </p>
      <div className="py-2">
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">情報種別 / 公開先</TableHead>
              <TableHead className="text-center">公開先の制限なし</TableHead>
              <TableHead className="text-center">顧客関連</TableHead>
              <TableHead className="text-center">社内関連</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>個人情報</TableCell>
              <TableCell>マーケティングロール</TableCell>
              <TableCell><strong className="text-emerald-500">カスタマーサポートロール</strong></TableCell>
              <TableCell>人事ロール</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>一般情報</TableCell>
              <TableCell>一般ロール</TableCell>
              <TableCell><strong className="text-emerald-500">プロダクトチームロール</strong></TableCell>
              <TableCell>インサイダー情報ロール</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="py-2">
        各選択肢の解説：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong className="text-emerald-500">ア: カスタマーサポートロール, イ: プロダクトチームロール：</strong>これは正しい記載です。
          <ul>
            <li className="py-1">個人情報 × 顧客の機密: カスタマーサポートロールは、顧客からの問い合わせ対応やサポート提供のために、顧客の個人情報（例：購入履歴、契約詳細など）にアクセスする必要があるロールです。アクセスは担当顧客に限定され機密保持が求められます。</li>
            <li className="py-1">一般情報 × 顧客の機密: プロダクトチームロールは、開発中の新機能や特定顧客向けカスタマイズ情報、公表前だが顧客に影響しうる製品ロードマップなど、社外秘だがNDAのもと特定顧客やパートナーと共有しうる一般情報（技術情報やビジネス情報を含む）にアクセスするロールです。</li>
          </ul>
        </li>
        <li className="pb-2">
          <strong>ア: 営業ロール, イ: マーケティングロール：</strong>これは誤った記載です。「営業ロール」は個人情報と顧客の機密情報を扱う可能性がありますが、「マーケティングロール」は通常、個人情報で「公開制限なし」の範囲（同意取得済みの連絡先など）を扱います。「一般情報」と「顧客の機密」の組み合わせで「マーケティングロール」は一般的ではありません。
        </li>
        <li className="pb-2">
          <strong>ア: 人事ロール, イ: 一般ロール：</strong>これは誤った記載です。「人事ロール」は「個人情報」と「社内の機密」の組み合わせで適切ですが、「ア」（個人情報 × 顧客の機密）には不適切です。「一般ロール」は「一般情報」と「公開制限なし」の組み合わせであり、「イ」（一般情報 × 顧客の機密）には機密性が不足しています。
        </li>
        <li className="pb-2">
          <strong>ア: 開発者ロール, イ: セキュリティ管理者ロール：</strong>これは誤った記載です。「開発者ロール」はシステム開発のために様々な情報にアクセスする可能性がありますが、ロールの命名としてはより具体的な業務内容を反映すべきです。「セキュリティ管理者ロール」は情報種別や公開先に関わらず、セキュリティ設定や監査ログなど、システム全体のセキュリティを管理する役割であり、この表の分類には直接当てはまりにくいです。特に「一般情報」と「顧客の機密」の組み合わせとしての適切性は低いです。
        </li>
      </ul>
      <p className="py-2">
        上記で示した各ロールのイメージ（あくまで一例）：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>個人情報 × 公開先の制限なし: マーケティングロール</strong><br />
          これは、顧客の連絡先情報（メールアドレス、電話番号など、事前の同意に基づき取得・利用されるもの）といった、マーケティング活動に必要な個人情報にアクセスするロールです。
        </li>
        <li className="pb-2">
          個人情報 × 顧客関連: <strong className="text-emerald-500">カスタマーサポートロール</strong> ([ ア ] の正解)<br />
          これは、顧客からの問い合わせ対応やサポート提供のために、顧客の個人情報（例：購入履歴、契約詳細、アカウント情報など）にアクセスする必要があるロールです。アクセスは原則として担当する顧客の情報に限定され、機密保持が求められます。
        </li>
        <li className="pb-2">
          <strong>個人情報 × 社内関連: 人事ロール</strong><br />
          これは、従業員の個人情報、給与情報、評価情報、健康情報など、社内でも特に機密性が高く、アクセスが厳しく制限されるべき個人情報を取り扱うロールです。
        </li>
        <li className="pb-2">
          <strong>一般情報 × 公開先の制限なし: 一般ロール</strong><br />
          これは、社内外に広く公開されている情報（例：企業の公式ウェブサイトに掲載されている情報、公開されているプレスリリース、製品カタログなど）にアクセスする、最も基本的なロールです。
        </li>
        <li className="pb-2">
          一般情報 × 顧客関連: <strong className="text-emerald-500">プロダクトチームロール</strong> ([ イ ] の正解)<br />
          これは、開発中の新機能に関する情報や、特定顧客向けのカスタマイズ情報、あるいはまだ公表されていないが顧客に影響を与えうる製品ロードマップなど、社外秘ではあるものの、特定の顧客やビジネスパートナーとの間で機密保持契約(NDA)のもと共有される可能性のある一般情報（技術情報やビジネス情報を含む）にアクセスするロールです。
        </li>
        <li className="pb-2">
          <strong>一般情報 × 社内関連: インサイダー情報ロール</strong><br />
          これは、未公開の財務情報、M&A（合併・買収）計画、重要な経営戦略など、株価や企業の評価に重大な影響を与えうる、法的に規制されたインサイダー情報にアクセスするロールです。極めて厳格なアクセス管理と情報取り扱い規定が適用されます。
        </li>
      </ul>
      <p className="pt-2">
        上記のロール名や分類はあくまで一例です。実際のロール設計では、組織の具体的なビジネスプロセス、業界の規制、適用される法令（個人情報保護法、GDPRなど）、そして詳細なリスクアセスメントの結果に基づいて、より細かく、かつ明確に定義する必要があります。常に「最小権限の原則」（Principle of Least Privilege）を念頭に置き、各ユーザーやロールには、その業務を遂行するために真に必要な最小限のアクセス権のみを付与することが、情報セキュリティを確保する上で不可欠です。
      </p>
    </div>
  );
} 
