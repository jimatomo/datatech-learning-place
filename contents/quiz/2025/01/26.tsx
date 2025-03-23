import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "Datatech News"],
    created_at: new Date("2025-01-26"),
    updated_at: new Date("2025-01-26"),

    // ----- quiz -----
    title: "dbt LabsがSDF Labsを買収したことで何が起きるのか",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "SDFのSQL解析機能をdbtに統合して開発者エクスペリエンスを向上させる（dbt Cloudのみ）",
      1: "SDFのSQL解析機能をdbtに統合して開発者エクスペリエンスを向上させる（dbt Cloudとdbt Cloudの両方）",
      2: "コードの入力の中で解析の中でSQLの解析がされるので、dbt runをする前にエラーを検知できるようになる",
      3: "リネージの機能が強化され、カラムレベルのリネージまで生成することができるようになる",
      4: "論理的に解析されたSQLを「全ての」DWHに対応したローカルのエミュレートされた環境で実行できるようになる",
    },
    answers: [1, 2, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "SDF Docs - Features Matrix", url: "https://docs.sdf.com/introduction/features" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>下記のブログをご覧ください。</p>
      <a href="https://www.getdbt.com/blog/dbt-labs-acquires-sdf-labs" target="_blank" rel="noopener noreferrer" 
        className="text-blue-500 underline">
        dbt Labs acquires SDF Labs to accelerate the dbt developer experience
      </a>
      <p className="p-2">
        このブログでは、dbt LabsがSDF Labsを買収したことが報告されており、すでにdbtへの統合の開発がスタートしているようです。
        また、SDFがどのような背景で生まれたのか、どのような課題を解くことができるのかなどの記載されており、
        dbtにどのように組み込まれていくかに関しての大まかな計画についても言及されています。
      </p>
      <p>
        SDF Labsの買収によってdbtにどのような変化が起こりうるのか正しいと想像されるものを選択してください。（本当の意味での答え合わせがこの12か月でできることを期待しています。）
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        dbtの中にSDFの機能を組み込むことでRustによる高速なSQLのコンパイルが可能になり、開発者エクスペリエンスが向上することが期待されています。
        現時点ではdbt Cloudのみとは言及されておらず、dbt coreのユーザにも提供されるように計画されているようです。
      </p>
      <p className="py-2">
        また、SDFの持つ静的解析機能をフルに利用することでカラムレベルのリネージも生成することができるようになります。
      </p>
      <p className="pb-2">
        さらに、Apache Data Fusionをクエリエンジンとして静的解析された方言を含むSQLをローカル環境で実行できるようになることで、
        より品質の高いSQLを作成するための反復的なローカル開発プロセスを利用することができるようになることが期待されています。
      </p>
      <p>
        SDFがRustで作成されていることから圧倒的な速さでSQLを解析できる点が技術的な大きなブレイクスルーであると思います。
        Apache Arrowを利用したクエリ実行エンジンであるApache Data Fusionをクエリエンジンとして利用することで、ローカルでのSQLの実行も可能となることで、
        データパイプライン開発におけるテストサイズが小さくなり、コストを気にせずに反復的な開発プロセスにおける試行錯誤が実施しやすくなることは大きなメリットだと思っています。
      </p>
    </div>
  );
} 
