import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "SQL", "Logical Operators", "Data Modeling"],
    created_at: new Date("2025-03-12"),
    updated_at: new Date("2025-03-12"),

    // ----- quiz -----
    title: "Snowflakeの論理演算子（AND, OR, NOT）の優先順位と評価",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "A: True, B: True, C: True, D: False",
      1: "A: True, B: True, C: False, D: True",
      2: "A: False, B: True, C: True, D: False",
      3: "A: True, B: False, C: True, D: True",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "論理/ブール演算子", url: "https://docs.snowflake.com/ja/sql-reference/operators-logical" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div className="space-y-4">
      <p className="pb-4">
        Snowflakeで以下のSQLを実行した場合、A、B、C、Dの各カラムの出力として正しい組み合わせはどれですか？
      </p>
      <CodeBlock 
        code={`SELECT 
  TRUE OR TRUE AND FALSE as A,
  (NOT FALSE) OR TRUE as B,
  NOT (FALSE AND FALSE) as C,
  NOT FALSE AND FALSE as D;`}
        showLineNumbers={false}
      />
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-3">
        Snowflakeの論理演算子には優先順位があり、NOT（最高）、AND、OR（最低）の順に評価されます。
      </p>
      <p className="pb-1">
        <strong>A: TRUE OR TRUE AND FALSE</strong>
      </p>
      <p className="pb-3">
        ANDの優先順位がORより高いため、まず「TRUE AND FALSE」が評価されて「FALSE」になります。
        次に「TRUE OR FALSE」が評価されて最終的に「TRUE」になります。
        これは「TRUE OR (TRUE AND FALSE)」と同じ評価になります。
      </p>
      <p className="pb-1">
        <strong>B: (NOT FALSE) OR TRUE</strong>
      </p>
      <p className="pb-3">
        まず「NOT FALSE」が評価されて「TRUE」になります。
        次に「TRUE OR TRUE」が評価されて最終的に「TRUE」になります。
      </p>
      <p className="pb-1">
        <strong>C: NOT (FALSE AND FALSE)</strong>
      </p>
      <p className="pb-3">
        まず括弧内の「FALSE AND FALSE」が評価されて「FALSE」になります。
        次に「NOT FALSE」が評価されて最終的に「TRUE」になります。
      </p>
      <p className="pb-1">
        <strong>D: NOT FALSE AND FALSE</strong>
      </p>
      <p className="pb-3">
        NOTの優先順位がANDより高いため、まず「NOT FALSE」が評価されて「TRUE」になります。
        次に「TRUE AND FALSE」が評価されて最終的に「FALSE」になります。
        これは「(NOT FALSE) AND FALSE」と同じ評価になります。
      </p>
      <p>
        したがって、正しい出力は A: True, B: True, C: True, D: False です。
      </p>
    </div>
  );
} 
