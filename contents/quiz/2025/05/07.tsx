import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "data tests", "Data Modeling"],
    created_at: new Date("2025-05-07"),
    updated_at: new Date("2025-05-07"),

    // ----- quiz -----
    title: "dbt のデータテストについて",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Singular data testは、.ymlファイル内で定義され、複数のモデルやカラムに対して再利用可能である。",
      1: "Generic data testは、testsディレクトリ内の.sqlファイルにSQLクエリを直接記述して定義する。",
      2: "dbtに組み込まれているGeneric data testには、unique, not_null, accepted_values, relationships がある。",
      3: "dbt testコマンドは、プロジェクト内の全てのモデルを自動的にビルドしてからテストを実行する。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Add data tests to your DAG | dbt Docs", url: "https://docs.getdbt.com/docs/build/data-tests" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        dbt のデータテストに関する説明のうち、<strong>正しいもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        dbt のデータテストは、モデルやその他のリソース（ソース、シード、スナップショットなど）に対して行うアサーションです。
        dbt test を実行すると、プロジェクト内の各テストが成功したか失敗したかが示されます。
      </p>

      <p className="py-2 font-semibold text-red-500">誤った選択肢：</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Singular data testは、.ymlファイル内で定義され、複数のモデルやカラムに対して再利用可能である。:</strong>
          <br />
          これは誤りです。Singular data test は、失敗するレコードを返すSQLクエリを .sql ファイル（通常は tests ディレクトリ内）に記述して定義します。
          これらは特定の目的に対して一度だけ使用されるアサーションであり、再利用可能なものではありません。再利用可能なテストは Generic data test です。
        </li>
        <li>
          <strong>Generic data testは、testsディレクトリ内の.sqlファイルにSQLクエリを直接記述して定義する。:</strong>
          <br />
          これも誤りです。Generic data test は、引数を受け取るパラメータ化されたクエリで、特別な test ブロック（マクロのようなもの）で定義されます。
          一度定義されると、.yml ファイル内でモデル、カラム、ソースなどに名前で参照できます。
          一方、tests ディレクトリ内の .sql ファイルに直接SQLを記述するのは Singular data test の定義方法です。
        </li>
        <li>
          <strong>dbt testコマンドは、プロジェクト内の全てのモデルを自動的にビルドしてからテストを実行する。:</strong>
          <br />
          これも誤りです。dbt test コマンドは、既存のビルドされたモデルやソースに対してテストを実行します。
          テスト実行前にモデルをビルド（dbt run や dbt build）しておく必要があります。
          ただし、dbt build コマンドは、モデルのビルドとテストの実行を両方行います。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong className="text-emerald-500">dbtに組み込まれているGeneric data testには、unique, not_null, accepted_values, relationships がある。:</strong>
          <br />
          これは正しい説明です。dbt には、これらの4つの汎用的なデータテストが標準で組み込まれており、.yml ファイルで簡単にモデルのカラムなどに適用できます。
          例えば、unique はカラムの値が一意であることを、not_null はカラムの値がNULLでないことを保証します。
          accepted_values はカラムの値が指定されたリストに含まれていることを、relationships は他のモデルの特定のカラムとの参照整合性をテストします。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
      </p>
      <p className="pt-2">
        dbt のデータテストには Singular data test と Generic data test の2種類があります。
        Singular test は特定のSQLクエリで定義される一回限りのテストで、Generic test は再利用可能なパラメータ化されたテストです。
        dbt は unique, not_null, accepted_values, relationships といった便利な Generic test を標準で提供しています。
        これらのテストを活用することで、データ変換処理の品質と信頼性を高めることができます。
      </p>
    </div>
  );
} 
