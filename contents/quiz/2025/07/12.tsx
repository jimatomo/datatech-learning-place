import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["RDF", "セマンティックWeb", "Linked Data", "トリプル", "SPARQL"],
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
    answers: [1, 2, 3],
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
        <strong className="text-emerald-500">正しいもの</strong>を
        すべて選択してください。
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
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>重要な誤解：</strong> 主語と述語は必ずURIで表現される</li>
          <li><strong>目的語：</strong> URIまたはリテラル値（文字列、数値、日付など）で表現可能</li>
          <li><strong>主語：</strong> 必ずURIまたは空白ノード（blank node）で表現</li>
          <li><strong>述語：</strong> 必ずURIで表現（プロパティの識別子）</li>
          <li><strong>例：</strong> &lt;http://example.org/john&gt; &lt;http://xmlns.com/foaf/0.1/name&gt; "John Doe"</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「RDFはXML、JSON、Turtle、N-Triplesなど複数のシリアライゼーション形式をサポートしており、データの意味を表現するための標準的な方法を提供する」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>XML形式：</strong> RDF/XML - 最も古い標準形式</li>
          <li><strong>JSON形式：</strong> JSON-LD - Webアプリケーションで人気</li>
          <li><strong>Turtle形式：</strong> 人間が読みやすい、プレフィックス使用</li>
          <li><strong>N-Triples：</strong> シンプルな行ベース形式</li>
          <li><strong>共通点：</strong> すべて同じRDFデータモデルを表現</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「RDFスキーマ（RDFS）はRDFの拡張で、クラス、プロパティ、ドメイン、レンジなどの概念を定義し、より豊富な意味的関係を表現できる」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>クラス定義：</strong> rdfs:Class を使用して概念を定義</li>
          <li><strong>プロパティ定義：</strong> rdf:Property で関係を定義</li>
          <li><strong>ドメイン：</strong> rdfs:domain でプロパティが適用されるクラスを指定</li>
          <li><strong>レンジ：</strong> rdfs:range でプロパティの値の型を指定</li>
          <li><strong>階層関係：</strong> rdfs:subClassOf、rdfs:subPropertyOf で継承関係を表現</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「SPARQLはRDFデータをクエリするための標準言語で、SELECT、CONSTRUCT、ASK、DESCRIBEの4つのクエリ形式をサポートしている」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>SELECT：</strong> 結果を変数バインディングの表形式で返す</li>
          <li><strong>CONSTRUCT：</strong> 新しいRDFグラフを構築して返す</li>
          <li><strong>ASK：</strong> 真偽値（true/false）を返す</li>
          <li><strong>DESCRIBE：</strong> 指定されたリソースに関するRDFトリプルを返す</li>
          <li><strong>機能：</strong> パターンマッチング、フィルタリング、集約、ソートなど</li>
        </ul>
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

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
        <p className="text-sm">
          <strong>💡 実用例：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-blue-700">
          <li><strong>Linked Data：</strong> ウェブ上のデータを相互リンク</li>
          <li><strong>知識グラフ：</strong> Google、Facebook、Microsoftなどで活用</li>
          <li><strong>オントロジー：</strong> ドメイン知識の形式化</li>
          <li><strong>メタデータ：</strong> リソースの説明情報の標準化</li>
        </ul>
      </div>
    </div>
  );
}