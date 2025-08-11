import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Application", "Snowflake", "Snowflake Basic"],
    created_at: new Date("2025-03-24"),
    updated_at: new Date("2025-03-24"),

    // ----- quiz -----
    title: "Snowflakeのデータアンロードに関する知識",
    question_jsx: <QuizQuestion />,
    options: {
      0: "アンロードしたデータをSnowflakeステージからダウンロードする際は、GETコマンドを使用する",
      1: "COPY INTO <場所> コマンドでは、データは常に単一ファイルにアンロードされる",
      2: "クエリ結果をアンロードする場合、COPY INTO <場所> コマンド内でSELECTステートメントを指定できる",
      3: "パーティション化されたデータのアンロードには、PARTITION BYオプションを使用できる",
    },
    answers: [0, 2, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { 
        title: "データのアンロードの概要 - Snowflake Documentation", 
        url: "https://docs.snowflake.com/ja/user-guide/data-unload-overview"
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Snowflakeからのデータアンロードに関する説明として、正しい選択肢を全て選んでください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeのデータアンロードに関する重要な機能と特徴は以下の通りです：
      </p>
      <p className="py-2">
        <strong>一括アンロードプロセス</strong>：
        <ul className="list-disc pl-4">
          <li>ステップ1: COPY INTO &lt;場所&gt; コマンドを使用して、Snowflakeデータベーステーブルからステージにデータをコピーします</li>
          <li>ステップ2: Snowflakeステージから、GETコマンドを使用してデータファイルをダウンロードします</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>クエリを使用した一括アンロード</strong>：
        <ul className="list-disc pl-4">
          <li>COPY INTO &lt;場所&gt; コマンド内でSELECTステートメントを指定できます</li>
          <li>クエリの結果は、指定された1つ以上のファイルに書き込まれます</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>単一または複数のファイルへのアンロード</strong>：
        <ul className="list-disc pl-4">
          <li>デフォルトでは、SINGLE = FALSE（つまり、複数のファイルへのアンロード）です</li>
          <li>SINGLEオプションを使用して、単一ファイルまたは複数ファイルへのアンロードを制御できます</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>パーティション化されたデータのアンロード</strong>：
        <ul className="list-disc pl-4">
          <li>PARTITION BYコピーオプションを使用して、データをパーティション化してステージにアンロードできます</li>
          <li>これにより、データレイクへの出力などの様々なユースケースが可能になります</li>
        </ul>
      </p>
    </div>
  );
} 
