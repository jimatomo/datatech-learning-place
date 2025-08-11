import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Modeling", "Data Application", "dbt"],
    created_at: new Date("2025-05-14"),
    updated_at: new Date("2025-05-14"),

    // ----- quiz -----
    title: "dbt の analyses 機能について",
    question_jsx: <QuizQuestion />,
    options: {
      0: "analyses ディレクトリ内の .sql ファイルは、dbt run コマンドによってデータベース内にモデルとしてマテリアライズされる。",
      1: "analyses で記述されたSQLはコンパイルされず、主にSQLのメモやアイデアを保存するために使用される。",
      2: "analyses ファイル内では {{ ref(...) }} のような dbt のマクロや参照機能を使用することはできない。",
      3: "analyses ファイルは dbt compile コマンドでコンパイルされるが、データベースにはマテリアライズされず、主にアドホックな分析やSQLのバージョン管理に用いられる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Analyses | dbt Docs", url: "https://docs.getdbt.com/docs/build/analyses" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        dbt の <code>analyses</code> 機能に関する説明のうち、<strong>正しいもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        dbt の <code>analyses</code> 機能は、データ変換のパイプラインには直接組み込まれないものの、バージョン管理や dbt のコンテキスト（例: <code>{'{{ref(...}}'}</code> 関数）を利用したいSQLクエリを管理するのに役立ちます。
        これらは主にアドホックな分析、データ探索、またはSQLベースのレポート作成の初期段階で利用されます。
      </p>

      <p className="py-2 font-semibold text-red-500">誤った選択肢：</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>analyses ディレクトリ内の .sql ファイルは、dbt run コマンドによってデータベース内にモデルとしてマテリアライズされる。:</strong>
          <br />
          これは誤りです。<code>analyses</code> ディレクトリ内のSQLファイルは <code>dbt run</code> コマンドの対象外であり、データベース内にテーブルやビューとしてマテリアライズされません。
          マテリアライズされるのは <code>models</code> ディレクトリ内のファイルです。
        </li>
        <li>
          <strong>analyses で記述されたSQLはコンパイルされず、主にSQLのメモやアイデアを保存するために使用される。:</strong>
          <br />
          これも誤りです。<code>analyses</code> 内のSQLファイルは <code>dbt compile</code> コマンドによってコンパイルされます。
          これにより、<code>{'{{ref(...}}'}</code> 関数などが解決され、実行可能なSQLが生成されます。ただし、実行はされません。
        </li>
        <li>
          <strong>analyses ファイル内では <code>{'{{ref(...}}'}</code> のような dbt のマクロや参照機能を使用することはできない。:</strong>
          <br />
          これも誤りです。<code>analyses</code> の大きな利点の一つは、<code>{'{{ref(...}}'}</code> 関数や他のdbtマクロを使用して、既存のモデルやソースを簡単に参照できる点です。
          これにより、開発者は一貫性のある方法でデータ要素にアクセスできます。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong className="text-emerald-500">analyses ファイルは dbt compile コマンドでコンパイルされるが、データベースにはマテリアライズされず、主にアドホックな分析やSQLのバージョン管理に用いられる。:</strong>
          <br />
          これは正しい説明です。<code>analyses</code> は、SQLをdbtプロジェクトの一部としてバージョン管理しつつ、<code>dbt compile</code> を通じて Jinja やマクロの恩恵を受けることができます。
          コンパイルされたSQLは <code>target/compiled/</code> ディレクトリに出力され、これをコピーしてSQLクライアントやBIツールで実行することができます。
          データベースに結果が永続化されないため、繰り返し実行する定型的な変換処理よりも、一時的な分析や調査に適しています。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
      </p>
      <p className="pt-2">
        dbt の <code>analyses</code> 機能は、SQLベースの分析を dbt プロジェクト内で管理するための仕組みです。
        モデルのように定期的にマテリアライズされることはありませんが、<code>dbt compile</code> を通じて dbt の強力なテンプレート機能を活用できます。
        これにより、分析用クエリもバージョン管理の対象となり、他の dbt アセットとの整合性を保ちながら開発を進めることが可能です。
        コンパイルされたSQLは、データ可視化ツールへの入力や、一時的なデータ確認などに利用できます。
      </p>
    </div>
  );
} 
