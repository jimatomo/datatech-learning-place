import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "SQL", "Data Storage", "Data Application"],
    created_at: new Date("2026-09-04"),
    updated_at: new Date("2026-09-04"),

    title: "dbt snapshotsで履歴を残す",
    question_jsx: <QuizQuestion />,
    options: {
      0: "mutableなソースの変化をType-2 SCDとして記録する。dbt_valid_from / dbt_valid_to で期間を表す。",
      1: "dbt snapshot --full-refresh を付けるとスナップショット表をDROPして作り直し、履歴をゼロから再構築できる。",
      2: "strategyはtimestamp（updated_at）かcheck（指定列の差分）で、unique_keyは必須である。timestampが推奨される。",
      3: "スナップショットはincrementalモデルと同じで、いつDROPしてもパイプラインを再実行すれば同じ履歴が復元される。",
    },
    answers: [1, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "dbt Docs - Add snapshots to your DAG",
        url: "https://docs.getdbt.com/docs/build/snapshots",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        dbtのsnapshotsについて、
        <strong className="text-red-600">誤っているもの</strong>
        を2つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        snapshotは、上書きされるソースから「いつどの値だったか」を別表に積み上げる仕組みです。モデルの再構築とは別物です。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          snapshotsは <code>--full-refresh</code> を無視します。DROPして作り直さないので、過去の履歴は消えません。
        </li>
        <li>
          ソース側の過去状態はもう無いことが多いので、スナップショットを消すと履歴は戻りません。
          別スキーマに置き、DROPしにくい権限にするのが定石です。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>現在行の <code>dbt_valid_to</code> は既定NULLです。期間検索を簡単にするなら <code>dbt_valid_to_current</code> を使います。</li>
        <li>
          <code>updated_at</code> が信頼できるならtimestamp。列追加に強く、checkより運用が楽です。
        </li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        unique_keyが本当に一意かをソーステストで先に保証する。
        キーが崩れると別人の履歴がつながります。スケジュールして初めて意味が出るので、一度きり実行で終わらせない。
      </p>
    </div>
  );
}
