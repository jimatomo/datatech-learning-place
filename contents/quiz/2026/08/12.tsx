import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Architecture", "Data Storage", "Data Management", "Data Modeling"],
    created_at: new Date("2026-08-12"),
    updated_at: new Date("2026-08-12"),

    title: "Junk Dimensionの使い所",
    question_jsx: <QuizQuestion />,
    options: {
      0: "取引で生じる返品フラグや支払方法など、低カーディナリティの雑多なフラグ／指標を1つのディメンションにまとめる技法である。",
      1: "各フラグを独立した極小ディメンションにする代わりにまとめ、ファクトへの外部キー数とスキーマの煩雑さを抑える。",
      2: "行は属性の理論上の全直積である必要はなく、ソースに実際に出現する組み合わせだけでよい。",
      3: "注文番号のように行ごとに一意で付随属性のない識別子を、別テーブル化せずファクトに残す技法をJunk Dimensionと呼ぶ。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Kimball Group - Junk Dimension",
        url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/junk-dimension/",
      },
      {
        title: "Kimball Group - Design Tip #113 Creating, Using, and Maintaining Junk Dimensions",
        url: "https://www.kimballgroup.com/2009/06/design-tip-113-creating-using-and-maintaining-junk-dimensions/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        キンボール流のJunk Dimension（ジャンクディメンション）について、
        <strong className="text-red-600">誤っているもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Junk Dimensionは、ファクトを散らかす低カーディナリティ属性を1枚に畳むためのパターンです。
      </p>
      <p className="font-semibold mt-2">具体例:</p>
      <p className="py-1">
        受注ファクトに「支払方法」「ギフト包装か」「オンライン注文か」が付いてくるとします。
        それぞれ別ディメンションにするとキーが3本増え、ファクトにフラグ列を直置きすると幅が汚れます。
        代わりに取引プロファイル用のJunk Dimensionへまとめ、ファクトにはそのサロゲートキーを1本持たせます。
      </p>
      <Table className="my-2">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">junk_key</TableHead>
            <TableHead className="text-center">payment_method</TableHead>
            <TableHead className="text-center">is_gift_wrap</TableHead>
            <TableHead className="text-center">is_online</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">1</TableCell>
            <TableCell className="text-center">card</TableCell>
            <TableCell className="text-center">N</TableCell>
            <TableCell className="text-center">Y</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">2</TableCell>
            <TableCell className="text-center">cash</TableCell>
            <TableCell className="text-center">N</TableCell>
            <TableCell className="text-center">N</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">3</TableCell>
            <TableCell className="text-center">card</TableCell>
            <TableCell className="text-center">Y</TableCell>
            <TableCell className="text-center">Y</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>
        全直積（例: 支払3種 × フラグ2 × 2）を先に埋める必要はなく、ソースに出た組み合わせだけを行にすれば足ります。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          「注文番号などをファクトに残す」のはDegenerate Dimension（退化ディメンション）です。
          Junk Dimensionとは別の技法です。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>フラグや指標の寄せ集めを1ディメンションにします。</li>
        <li>ディメンション爆発とファクト幅の肥大を同時に避けられます。</li>
        <li>全直積は不要で、実在する組み合わせだけで足ります。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「付随属性のない業務キー」は退化、「意味は弱いが分析に使う低カーディナリティの寄せ集め」はジャンク、と切り分ける。
        名前に惑わされず、置き場所の判断軸を先に固定します。
      </p>
    </div>
  );
}
