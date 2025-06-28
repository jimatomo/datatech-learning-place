import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
// import { CodeBlock } from "@/components/ui/code-block"; // 未使用のためコメントアウト

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Controlled Vocabulary", "Document", "Data Management"],
    created_at: new Date("2025-06-21"),
    updated_at: new Date("2025-06-21"),

    // ----- quiz -----
    title: "統制語彙（Controlled Vocabularies）に関しての用語",
    question_jsx: <QuizQuestion />,
    options: {
      0: "タクソノミは主として用語を分類・階層化するのに用いられ、シソーラスは同義語や関連語を示して検索を支援する機能に優れている。",
      1: "フォークソノミは、ユーザーが自由にタグ付けすることで生まれるボトムアップの分類体系であり、統制語彙とは対照的な概念である。",
      2: "典拠リストは、特定の分野や領域内で情報資源を記述するための一貫した用語を定める統制語彙の一種である。",
      3: "オントロジは統制語彙の中で最も単純な形式であり、基本的な用語リスト（選択リスト）とほぼ同義である。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Controlled vocabulary - Wikipedia", url: "https://en.wikipedia.org/wiki/Controlled_vocabulary" },
      { title: "Folksonomy - Wikipedia", url: "https://en.wikipedia.org/wiki/Folksonomy" },
      { title: "タクソノミーの基礎：その定義とベストプラクティス、他のIA作業をどのように補完しているか", url: "https://u-site.jp/alertbox/taxonomy-101" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-2">
        統制語彙（Controlled Vocabularies）は、情報の索引付け、分類、検索を効率化するための重要な概念です。
        その様々な形態に関する以下の説明のうち、<strong className="text-red-500">誤っているもの</strong>はどれか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        正解は <strong className="text-green-500">「オントロジは統制語彙の中で最も単純な形式であり、基本的な用語リスト（選択リスト）とほぼ同義である。」</strong> です。
      </p>
      <p className="py-2">
        この記述は、オントロジを最も単純な形式の統制語彙として説明している点で、明確に誤っています。実際には、オントロジは最も複雑で表現力が高い統制語彙です。
      </p>
      <p className="py-2">
        各選択肢の解説：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>タクソノミは主として用語を分類・階層化するのに用いられ、シソーラスは同義語や関連語を示して検索を支援する機能に優れている。：</strong>これは正しい記載です。
          タクソノミは用語をカテゴリに分類（階層化を含む）するのに適しています。一方、シソーラスは同義語、広義語、狭義語、関連語などの関係性を定義することで、ユーザーが入力した検索語を拡張・解釈し、検索の精度と網羅性を高めるのに役立ちます。
        </li>
        <li className="pb-2">
          <strong>フォークソノミは、ユーザーが自由にタグ付けすることで生まれるボトムアップの分類体系であり、統制語彙とは対照的な概念である：</strong>これは正しい記載です。
          フォークソノミは、管理者によって事前に定義された用語リスト（統制語彙）を用いず、ユーザーが自由にタグ付けを行うことで形成されるため、トップダウン式の統制語彙とは対照的な、ボトムアップ式の「非統制語彙」と位置づけられます。
        </li>
        <li className="pb-2">
          <strong>典拠リストは、特定の分野や領域内で情報資源を記述するための一貫した用語を定める統制語彙の一種である。：</strong>これは正しい記載です。
          典拠リスト（Authority File）は、特定の分野や領域内（例：図書館、博物館）で情報資源を記述するための一貫した用語（人名、団体名、概念、主題など）を定めたものです。表記の揺れをなくし、「公式な」アクセスポイントを一つに定めることで、関連情報を網羅的に検索できるようになります。固有名詞の統一はその代表的な用途の一つです。
        </li>
        <li className="pb-2">
          <strong>オントロジは統制語彙の中で最も単純な形式であり、基本的な用語リスト（選択リスト）とほぼ同義である。：</strong>これが<strong className="text-red-500">誤り</strong>です。
          統制語彙は、単純なものから複雑なものへ、一般的に「用語リスト → タクソノミ → シソーラス → オントロジ」の順で表現力が高まります。オントロジは、単なる用語の関係性だけでなく、概念の属性や、概念間の多様な関係（例：「AはBの一部である」「CはDを構成要素とする」）を形式的かつ厳密に記述する、最もリッチで複雑なモデルです。機械可読な意味論的相互運用性を実現するために用いられます。
        </li>
      </ul>
      <p className="py-2">
        <strong>まとめ:</strong>
      </p>
      <p className="py-2">
        統制語彙には、その目的や表現力のレベルに応じて様々な種類が存在します。最も表現力の高い「オントロジ」と、最も基本的な「用語リスト」を混同しているこの選択肢は、明確な誤りとなります。
      </p>
    </div>
  );
} 
