import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Data Loading", "Snowflake Basic"],
    created_at: new Date("2025-03-17"),
    updated_at: new Date("2025-03-17"),

    // ----- quiz -----
    title: "Snowflakeのデータロードに関するベストプラクティス",
    question_jsx: <QuizQuestion />,
    options: {
      0: "圧縮されたデータファイルのサイズは、最適なロードパフォーマンスのために10MB以下に保つべきである",
      1: "半構造化データがVARIANT列に挿入される際、Snowflakeはデフォルトでテーブルごと、パーティションごとに最大200個の要素を抽出する",
      2: "数値データには、読みやすさのためにコンマなどの区切り文字（例：123,456）を含めることが推奨される",
      3: "区切り文字を含むフィールドは、引用符（一重または二重）で囲む必要がある",
    },
    answers: [1, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { 
        title: "データファイルの準備 - Snowflake Documentation", 
        url: "https://docs.snowflake.com/ja/user-guide/data-load-considerations-prepare"
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Snowflakeへのデータロードに関する説明として、正しい選択肢を全て選んでください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeのデータロードに関する重要なベストプラクティスは以下の通りです：
      </p>
      <p className="py-2">
        <strong>ファイルサイズの最適化</strong>：
        - 圧縮されたデータファイルのサイズは、100から250 MB（またはそれ以上）にすることが推奨されます
        - これにより、ロードの並列操作の数を最適化できます
      </p>
      <p className="py-2">
        <strong>半構造化データの処理</strong>：
        - VARIANT列に挿入される半構造化データは、デフォルトでテーブルごと、パーティションごとに最大200個の要素が抽出されます
        - これは列指向形式での効率的なデータ格納を可能にします
      </p>
      <p className="py-2">
        <strong>データフォーマットのガイドライン</strong>：
        - 数値データにはコンマなどの埋め込み文字は避けるべきです（例：123456）
        - 区切り文字を含むフィールドは必ず引用符で囲む必要があります
      </p>
      <p className="pt-2">
        これらのベストプラクティスに従うことで、効率的なデータロードとクエリパフォーマンスを実現できます。
      </p>
    </div>
  );
} 
