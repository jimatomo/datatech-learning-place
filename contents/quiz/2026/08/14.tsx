import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "SQL", "Performance", "Data Application"],
    created_at: new Date("2026-08-14"),
    updated_at: new Date("2026-08-14"),

    title: "dbt incremental戦略の使い分け",
    question_jsx: <QuizQuestion />,
    options: {
      0: "appendは既存行の更新や重複チェックをせず、選択結果をターゲットへ挿入する。unique_keyなしの単純追記向き。",
      1: "mergeはunique_keyに基づき、未存在行はINSERT、既存行はUPDATEする。指定がないとappend相当になる。",
      2: "delete+insertはunique_keyに該当する既存行を消してから入れ直す。mergeが使えない／完全置換したい場面で候補になる。",
      3: "Snowflakeではappendとmergeだけが使え、delete+insertやinsert_overwrite、microbatchはサポートされない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "dbt Docs - About incremental strategy",
        url: "https://docs.getdbt.com/docs/build/incremental-strategy",
      },
      {
        title: "dbt Docs - Configure incremental models",
        url: "https://docs.getdbt.com/docs/build/incremental-models",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        dbtのincrementalモデルにおける<code>incremental_strategy</code>について、
        <strong className="text-red-600">誤っているもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        incrementalは「何を増分対象にするか」だけでなく、「どうターゲットへ反映するか」も戦略で決まります。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          dbt-snowflakeはappend / merge / delete+insert / insert_overwrite / microbatchをサポートします。
          2種だけではありません。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>appendは安価だが重複に弱い追記です。</li>
        <li>mergeはキー一致で更新し、新規は挿入します。</li>
        <li>delete+insertは該当キーを消して入れ直す置換寄りの戦略です。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        まず「更新が必要か」「unique_keyは信頼できるか」を決める。
        更新不要ならappend、行更新が必要ならmerge、キーの扱いが難しいならdelete+insertを検討します。
      </p>
    </div>
  );
}
