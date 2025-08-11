import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AI", "Cortex", "Data Application", "Snowflake"],
    created_at: new Date("2025-07-11"),
    updated_at: new Date("2025-07-11"),

    // ----- quiz -----
    title: "Snowflake の FILE データ型と AI_COMPLETE 関数",
    question_jsx: <QuizQuestion />,
    options: {
      0: "FILE データ型は非構造化データのファイル内容そのものを格納し、STAGE、RELATIVE_PATH、CONTENT_TYPE などのメタデータも保持する",
      1: "AI_COMPLETE 関数は FILE オブジェクトを受け取って画像解析や文書処理を行い、claude-4-sonnet や llama4-maverick などのモデルを利用できる",
      2: "TO_FILE 関数や TRY_TO_FILE 関数を使用して、ステージ上のファイルから FILE オブジェクトを作成できる",
      3: "FL_GET_CONTENT_TYPE や FL_GET_SIZE などの関数を使用して、FILE オブジェクトからメタデータを取得できる",
    },
    answers: [1, 2, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Unstructured data types - Snowflake Documentation", url: "https://docs.snowflake.com/en/sql-reference/data-types-unstructured" },
      { title: "AI_COMPLETE (Single file) - Snowflake Documentation", url: "https://docs.snowflake.com/en/sql-reference/functions/ai_complete-single-file" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        以下のSnowflakeの<code>FILE</code>データ型と<code>AI_COMPLETE</code>関数に関する記述のうち、
        <strong className="text-emerald-500">正しいもの</strong>を
        すべて選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  const codeExample = `
-- FILE データ型を使用したテーブル作成
CREATE TABLE images_table(img FILE);

-- ステージからファイルを読み込み
INSERT INTO images_table
    SELECT TO_FILE(file_url) FROM DIRECTORY(@my_images);

-- AI_COMPLETE を使用した画像解析
SELECT AI_COMPLETE('claude-3-5-sonnet',
    '画像に含まれるオブジェクトを日本語で説明してください',
    TO_FILE('@myimages', 'kitchen.png'));

-- FILE メタデータの取得
SELECT 
    FL_GET_RELATIVE_PATH(img) as file_path,
    FL_GET_CONTENT_TYPE(img) as mime_type,
    FL_GET_SIZE(img) as file_size
FROM images_table
WHERE FL_GET_LAST_MODIFIED(img) BETWEEN '2024-01-01' and '2025-01-01';
  `.trim();

  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-emerald-500">正解の解説：</p>
      
      <div className="mb-4">
        <p className="font-semibold text-red-500">「FILE データ型は非構造化データのファイル内容そのものを格納し、STAGE、RELATIVE_PATH、CONTENT_TYPE などのメタデータも保持する」❌ 間違い：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>重要な誤解：</strong> FILE データ型はファイル内容を格納しない</li>
          <li><strong>実際：</strong> ファイルへの参照（リファレンス）のみを格納</li>
          <li><strong>メタデータ：</strong> STAGE、RELATIVE_PATH、CONTENT_TYPE、SIZE、ETAG、LAST_MODIFIED を保持</li>
          <li><strong>利点：</strong> 大容量ファイルでもテーブルサイズが増加しない</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「AI_COMPLETE 関数は FILE オブジェクトを受け取って画像解析や文書処理を行い、claude-4-sonnet や llama4-maverick などのモデルを利用できる」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>対応モデル：</strong> claude-4-opus、claude-4-sonnet、claude-3-5-sonnet、llama4-maverick、openai-gpt-4.1 など</li>
          <li><strong>画像形式：</strong> jpg、jpeg、png、gif、webp をサポート</li>
          <li><strong>機能：</strong> 画像解析、エンティティ抽出、質問応答、内容要約など</li>
          <li><strong>最大サイズ：</strong> 一般的には10MB、claudeモデルは3.75MB</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「TO_FILE 関数や TRY_TO_FILE 関数を使用して、ステージ上のファイルから FILE オブジェクトを作成できる」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>TO_FILE：</strong> ステージ名とパス、またはスコープドURLから FILE オブジェクト作成</li>
          <li><strong>TRY_TO_FILE：</strong> エラー時に NULL を返すバージョン</li>
          <li><strong>引数形式：</strong> scoped file URL、stage + path、metadata object</li>
          <li><strong>例：</strong> TO_FILE(&apos;@my_stage&apos;, &apos;images/photo.jpg&apos;)</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「FL_GET_CONTENT_TYPE や FL_GET_SIZE などの関数を使用して、FILE オブジェクトからメタデータを取得できる」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>アクセサ関数：</strong> FL_GET_CONTENT_TYPE、FL_GET_SIZE、FL_GET_ETAG など</li>
          <li><strong>ユーティリティ関数：</strong> FL_IS_IMAGE、FL_IS_DOCUMENT、FL_IS_AUDIO など</li>
          <li><strong>メタデータ：</strong> MIME タイプ、ファイルサイズ、最終更新日時など</li>
          <li><strong>用途：</strong> フィルタリング、監視、ファイル分類など</li>
        </ul>
      </div>

      <p className="pt-4 font-semibold">コード例：</p>
      <CodeBlock code={codeExample} />

      <div className="bg-green-50 border-l-4 border-emerald-500 p-4 mt-4">
        <p className="text-sm">
          <strong>🎯 まとめ：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-green-700">
          <li><strong>FILE データ型：</strong> ファイル参照のみ格納、メタデータ付き</li>
          <li><strong>AI_COMPLETE：</strong> LLM による画像・文書解析、複数モデル対応</li>
          <li><strong>TO_FILE：</strong> ステージファイルから FILE オブジェクト作成</li>
          <li><strong>FL_GET_*：</strong> メタデータアクセスと分析機能</li>
        </ul>
      </div>
    </div>
  );
}