import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
// import { CodeBlock } from "@/components/ui/code-block"; // 未使用のためコメントアウト

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Integration", "Data Management", "Data Virtualization"],
    created_at: new Date("2025-06-07"),
    updated_at: new Date("2025-06-07"),

    // ----- quiz -----
    title: "データ仮想化とデータフェデレーションの理解度チェック",
    question_jsx: <QuizQuestion />,
    options: {
      0: "データ仮想化は、物理的なデータ移動を伴わずに、複数の異種データソースを統合し、単一の仮想的なデータビューを提供する技術である。",
      1: "データフェデレーションは、主にバッチ処理で各データソースからデータを抽出し、中央のデータストアにロードする技術である。",
      2: "データ仮想化を利用すると、データソースへのクエリは必ず仮想化レイヤーにキャッシュされたデータに対して実行されるため、リアルタイム性は失われる。",
      3: "データフェデレーションは、データ仮想化とは異なり、メタデータを管理する機能を持たない。",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "データマネジメント知識体系ガイド 第二版", url: "https://www.amazon.co.jp/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E7%9F%A5%E8%AD%98%E4%BD%93%E7%B3%BB%E3%82%AC%E3%82%A4%E3%83%89-%E7%AC%AC%E4%BA%8C%E7%89%88-DAMA-International/dp/4296100491" },
      { title: "Data Virtualization – データ仮想化とは？", url: "https://www.denodo.com/ja/data-virtualization/what-is-data-virtualization" },
      { title: "データ仮想化とは？", url: "https://products.sint.co.jp/ober/blog/datavirtualization" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-2">
        データ仮想化（Data Virtualization）とデータフェデレーション（Data Federation）に関する説明のうち、<strong className="text-green-500">最も適切なもの</strong>を一つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        正解は <strong className="text-green-500">「データ仮想化は、物理的なデータ移動を伴わずに、複数の異種データソースを統合し、単一の仮想的なデータビューを提供する技術である。」</strong> です。
      </p>
      <p className="py-2">
        データ仮想化は、データソースからのデータを物理的にコピーして統合するのではなく、要求に応じてリアルタイムにデータを取得し、抽象化されたビューとして提供します。これにより、利用者はデータの物理的な格納場所や形式を意識することなく、統一されたインターフェースでデータにアクセスできます。データフェデレーションは、データ仮想化を実現するための一つのアプローチまたはサブセットと見なされることが多いです。
      </p>
      <p className="py-2">
        各選択肢の解説：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>データフェデレーションは、主にバッチ処理で各データソースからデータを抽出し、中央のデータストアにロードする技術である。：</strong>これは誤りです。
          この説明はETL（Extract, Transform, Load）プロセスに近いものです。データフェデレーションは、クエリを受け取った際に、各データソースに分散して問い合わせを行い、結果をその場で統合して返すアーキテクチャです。物理的なデータ移動は伴いません。
        </li>
        <li className="pb-2">
          <strong>データ仮想化を利用すると、データソースへのクエリは必ず仮想化レイヤーにキャッシュされたデータに対して実行されるため、リアルタイム性は失われる。：</strong>これは誤りです。
          データ仮想化は、キャッシュを利用してパフォーマンスを向上させることもできますが、基本的にはリアルタイムにデータソースへ問い合わせ（パススルー）を行います。そのため、リアルタイム性の高いデータアクセスが可能です。キャッシュ戦略は要件に応じて設定できます。
        </li>
        <li className="pb-2">
          <strong>データフェデレーションは、データ仮想化とは異なり、メタデータを管理する機能を持たない。：</strong>これは誤りです。
          データフェデレーションもデータ仮想化も、統合するデータソースの場所、スキーマ、データ型などのメタデータを管理する機能が不可欠です。このメタデータに基づいて、クエリの最適化や分散実行が行われます。
        </li>
      </ul>
      <p className="py-2">
        <strong>まとめ:</strong>
      </p>
      <ul className="list-disc pl-4">
        <li className="py-1"><strong>データ仮想化:</strong> データを物理的に移動させず、論理的なデータレイヤーを作成してアクセスを抽象化する広範な概念。</li>
        <li className="py-1"><strong>データフェデレーション:</strong> データ仮想化の一種で、分散クエリによって複数のソースからのデータをオンデマンドで統合する技術。</li>
      </ul>
      <p className="py-2">
        これらの技術は、物理的なデータウェアハウスを補完または代替し、よりアジャイルでコスト効率の高いデータ統合ソリューションを提供します。
      </p>
    </div>
  );
} 
