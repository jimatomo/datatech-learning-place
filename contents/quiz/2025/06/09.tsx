import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
// CodeBlockをインポートしましたが、利用箇所がないため削除します
// import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Secure Data Sharing", "Collaboration", "Snowflake Basic"],
    created_at: new Date("2025-06-09"),
    updated_at: new Date("2025-06-09"),

    // ----- quiz -----
    title: "Snowflake Secure Data Sharingで共有可能なオブジェクト",
    question_jsx: <QuizQuestion />,
    options: {
      0: "テーブル（Tables）および外部テーブル（External Tables）",
      1: "セキュアビュー（Secure Views）",
      2: "ストリーム（Streams）",
      3: "タスク（Tasks）",
      4: "セキュアUDF（Secure UDFs）",
    },
    answers: [0, 1, 4],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Secure Data Sharingについて - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/data-sharing-intro"
      }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        SnowflakeのSecure Data Sharing機能を使用して共有できるオブジェクトとして、正しいものを全て選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        SnowflakeのSecure Data Sharingでは、データのコピーを作成することなく、特定のアカウントとデータベースオブジェクトを安全に共有できます。共有可能なオブジェクトは以下の通りです。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-emerald-500">テーブル（Tables）および外部テーブル（External Tables）</strong>：
          これは正しい記載です。通常のテーブルに加え、外部テーブル、動的テーブル、Icebergテーブルも共有可能です。データそのものは移動せず、メタデータを介してアクセスが提供されます。
        </li>
        <li>
          <strong className="text-emerald-500">セキュアビュー（Secure Views）</strong>：
          これも正しい記載です。セキュアビューやセキュアなマテリアライズドビューを共有することで、基になるテーブルへのアクセスを公開することなく、データの特定のサブセットを安全に共有できます。
        </li>
        <li>
          <strong className="text-red-500">ストリーム（Streams）</strong>：
          これは誤った記載です。ストリームはテーブルの変更履歴（CDC）を追跡するオブジェクトであり、直接共有することはできません。共有されたテーブルに対してコンシューマー側でストリームを作成することは可能です。
        </li>
        <li>
          <strong className="text-red-500">タスク（Tasks）</strong>：
          これも誤った記載です。タスクはSQLステートメントのスケジュール実行に使用されるオブジェクトであり、Secure Data Sharingの対象外です。
        </li>
        <li>
          <strong className="text-emerald-500">セキュアUDF（Secure UDFs）</strong>：
          これは正しい記載です。セキュアユーザー定義関数（UDF）を共有することで、ビジネスロジックや計算ロジックそのものを公開することなく、そのロジックをコンシューマーが利用できるようになります。
        </li>
      </ul>
      <p className="pt-4">
        <strong>補足</strong>：
        <br />
        Secure Data Sharingのキーポイントは、共有が読み取り専用であり、コンシューマーは共有されたオブジェクトを変更できないという点です。これにより、データプロバイダーは自身のデータを完全にコントロールできます。
      </p>
    </div>
  );
} 
