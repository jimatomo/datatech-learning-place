import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Advanced", "Security"],
    created_at: new Date("2025-07-22"),
    updated_at: new Date("2025-07-22"),

    // ----- quiz -----
    title: "Snowflake: データ共有におけるビューとセキュアビューの利用",
    question_jsx: <QuizQuestion />,
    options: {
      0: "非セキュアビューを共有すると、ビューの定義がコンシューマに公開され、基になるテーブル構造が意図せず公開される可能性がある。",
      1: "セキュアビューは、内部的なクエリ最適化の一部をバイパスすることで、基盤となるデータへの意図しないアクセスを防ぐ。",
      2: "セキュアビューを他のアカウントと共有した場合、ビュー内で CURRENT_USER() や CURRENT_ROLE() 関数は、ビューをクエリしたコンシューマ側のユーザーやロールを返す。",
      3: "セキュアビューはクエリ最適化が制限されるため、非セキュアビューと比較してパフォーマンスが低下する可能性がある。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "セキュアビューの使用 | Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/views-secure",
      },
      {
        title: "保護されていないビューでデータを共有する | Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/data-sharing-views",
      },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeのデータ共有でビューを使用する際の記述として、
        <strong className="text-red-500">間違っているもの</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflakeのデータ共有においてビューは強力なツールですが、セキュリティとプライバシーを確保するためにはセキュアビューの利用が重要です。
        特に、異なるアカウント間でデータを共有する際には、意図しない情報漏洩を防ぐための仕組みを理解しておく必要があります。
      </p>

      <p className="py-2 font-semibold text-red-500">間違った選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            セキュアビューを他のアカウントと共有した場合、ビュー内で CURRENT_USER() や
            CURRENT_ROLE() 関数は、ビューをクエリしたコンシューマ側のユーザーやロールを返す。：
          </strong>
          <br />
          これは<strong className="text-red-500">間違い</strong>
          です。 Snowflakeのドキュメントによると、セキュアビューが他のアカウントと共有される場合、
          `CURRENT_USER()` および `CURRENT_ROLE()` 関数は `NULL`
          を返します。
          これは、データプロバイダーがコンシューマアカウントのユーザーやロールを通常制御できないためです。
          アカウントレベルでアクセスを制御したい場合は、代わりに `CURRENT_ACCOUNT()`
          関数を使用します。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            非セキュアビューを共有すると、ビューの定義がコンシューマに公開され、基になるテーブル構造が意図せず公開される可能性がある。：
          </strong>
          <br />
          これは<strong className="text-emerald-500">正しい</strong>
          です。
          非セキュアビューの定義は、`GET_DDL`関数や`SHOW
          VIEWS`コマンドなどで閲覧可能なため、コンシューマはビューの基となるテーブルや結合ロジックを見ることができます。
        </li>
        <li className="pt-2">
          <strong>
            セキュアビューは、内部的なクエリ最適化の一部をバイパスすることで、基盤となるデータへの意図しないアクセスを防ぐ。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。
          非セキュアビューでは、クエリオプティマイザの動作が、アクセスが許可されていないはずのデータに関する情報を間接的に漏洩させる可能性があります。セキュアビューはこれらの最適化を無効にすることで、データのプライバシーを保護します。
        </li>
        <li className="pt-2">
          <strong>
            セキュアビューはクエリ最適化が制限されるため、非セキュアビューと比較してパフォーマンスが低下する可能性がある。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。
          セキュリティを強化するために一部の最適化が行われないため、セキュアビューに対するクエリは、同等の非セキュアビューに対するクエリよりも実行が遅くなることがあります。データのプライバシーとクエリパフォーマンスはトレードオフの関係にあります。
        </li>
      </ul>
    </div>
  );
}