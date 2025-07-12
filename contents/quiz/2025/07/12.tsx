import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["RDF", "Semantic Web", "Linked Data", "SPARQL", "Data Management"],
    created_at: new Date("2025-07-12"),
    updated_at: new Date("2025-07-12"),

    // ----- quiz -----
    title: "RDF (Resource Description Framework) の基本概念と構造",
    question_jsx: <QuizQuestion />,
    options: {
      0: "RDFトリプルは主語（Subject）、述語（Predicate）、目的語（Object）の3つの要素で構成され、すべてURIまたはリテラル値で表現される",
      1: "RDFはXML、JSON、Turtle、N-Triplesなど複数のシリアライゼーション形式をサポートしており、データの意味を表現するための標準的な方法を提供する",
      2: "RDFスキーマ（RDFS）はRDFの拡張で、クラス、プロパティ、ドメイン、レンジなどの概念を定義し、より豊富な意味的関係を表現できる",
      3: "SPARQLはRDFデータをクエリするための標準言語で、SELECT、CONSTRUCT、ASK、DESCRIBEの4つのクエリ形式をサポートしている",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "RDF 1.1 Concepts and Abstract Syntax - W3C", url: "https://www.w3.org/TR/rdf11-concepts/" },
      { title: "RDF Schema 1.1 - W3C", url: "https://www.w3.org/TR/rdf-schema/" },
      { title: "SPARQL 1.1 Query Language - W3C", url: "https://www.w3.org/TR/sparql11-query/" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        以下のRDF（Resource Description Framework）に関する記述のうち、
        <strong className="text-red-500">間違っているもの</strong>を
        選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  const rdfExample = `
# Turtle形式でのRDFトリプル例
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix dc: <http://purl.org/dc/elements/1.1/> .
@prefix : <http://example.org/> .

:john foaf:name "John Doe" .
:john foaf:age 30 .
:john foaf:knows :jane .
:jane foaf:name "Jane Smith" .

# RDFスキーマの例
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

:Person rdf:type rdfs:Class .
:hasName rdf:type rdf:Property .
:hasName rdfs:domain :Person .
:hasName rdfs:range rdfs:Literal .

# SPARQLクエリ例
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
SELECT ?name ?age
WHERE {
  ?person foaf:name ?name .
  ?person foaf:age ?age .
  FILTER(?age > 25)
}
  `.trim();

  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-emerald-500">正解の解説：</p>
      
      <div className="mb-4">
        <p className="font-semibold text-red-500">「RDFトリプルは主語（Subject）、述語（Predicate）、目的語（Object）の3つの要素で構成され、すべてURIまたはリテラル値で表現される」❌ 間違い：</p>
        <p className="text-sm leading-relaxed">
          この記述には重要な誤解があります。RDFトリプルの構成要素は確かに主語、述語、目的語の3つですが、それぞれの表現方法は異なります。
          主語は必ずURIまたは空白ノード（blank node）で表現され、述語は必ずURIで表現されます。
          目的語のみがURIまたはリテラル値（文字列、数値、日付など）で表現可能です。
          例えば、&lt;http://example.org/john&gt; &lt;http://xmlns.com/foaf/0.1/name&gt; &quot;John Doe&quot; というトリプルでは、主語と述語はURIで、目的語はリテラル値で表現されています。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「RDFはXML、JSON、Turtle、N-Triplesなど複数のシリアライゼーション形式をサポートしており、データの意味を表現するための標準的な方法を提供する」✅ 正しい：</p>
        <p className="text-sm leading-relaxed">
          RDFは柔軟性の高いデータモデルで、同じ意味的構造を複数の形式で表現できます。
          RDF/XMLは最も古い標準形式で、XMLの構造を活用しています。
          JSON-LDはWebアプリケーションで人気があり、JavaScriptとの親和性が高いです。
          Turtle形式は人間が読みやすく、プレフィックスを使用してURIを短縮できます。
          N-Triplesは最もシンプルな行ベース形式で、各行が1つのトリプルを表現します。
          これらすべての形式は同じRDFデータモデルを表現するため、相互変換が可能です。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「RDFスキーマ（RDFS）はRDFの拡張で、クラス、プロパティ、ドメイン、レンジなどの概念を定義し、より豊富な意味的関係を表現できる」✅ 正しい：</p>
        <p className="text-sm leading-relaxed">
          RDFSはRDFの基本的なトリプル構造を拡張し、より豊富な意味的関係を表現できるようにします。
          rdfs:Classを使用して概念を定義し、rdf:Propertyで関係を定義します。
          rdfs:domainはプロパティが適用されるクラスを指定し、rdfs:rangeはプロパティの値の型を指定します。
          さらに、rdfs:subClassOfやrdfs:subPropertyOfを使用して階層関係や継承関係を表現できます。
          これにより、単純なトリプル以上の複雑な意味的構造を構築できるようになります。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「SPARQLはRDFデータをクエリするための標準言語で、SELECT、CONSTRUCT、ASK、DESCRIBEの4つのクエリ形式をサポートしている」✅ 正しい：</p>
        <p className="text-sm leading-relaxed">
          SPARQLはRDFデータを効率的に検索・取得するための標準的なクエリ言語です。
          SELECTクエリは結果を変数バインディングの表形式で返し、最も一般的に使用されます。
          CONSTRUCTクエリは新しいRDFグラフを構築して返すため、データ変換に有用です。
          ASKクエリは真偽値（true/false）を返すため、存在確認に適しています。
          DESCRIBEクエリは指定されたリソースに関するRDFトリプルを返し、リソースの詳細情報を取得するのに便利です。
          これらのクエリ形式は、パターンマッチング、フィルタリング、集約、ソートなどの機能も提供します。
        </p>
      </div>

      <p className="pt-4 font-semibold">RDFの基本構造とSPARQLクエリ例：</p>
      <CodeBlock code={rdfExample} />

      <div className="bg-green-50 border-l-4 border-emerald-500 p-4 mt-4">
        <p className="text-sm">
          <strong>🎯 RDFの重要な特徴：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-green-700">
          <li><strong>グラフベース：</strong> ノードとエッジで構成される有向グラフ</li>
          <li><strong>分散性：</strong> 異なるソースのデータを統合可能</li>
          <li><strong>拡張性：</strong> 新しいプロパティやクラスを動的に追加可能</li>
          <li><strong>標準化：</strong> W3C標準として広く採用されている</li>
          <li><strong>セマンティック：</strong> データの意味を明示的に表現</li>
        </ul>
      </div>
    </div>
  );
}