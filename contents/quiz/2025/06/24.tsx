import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Advanced", "Security"],
    created_at: new Date("2025-06-24"),
    updated_at: new Date("2025-06-24"),

    // ----- quiz -----
    title: "Snowflake: Business CriticalアカウントからBusiness Critical以外のアカウントへのデータシェア",
    question_jsx: <QuizQuestion />,
    options: {
      0: "OVERRIDE SHARE RESTRICTIONS権限は、ACCOUNTADMINロールにデフォルトで付与されており、他のロールにも付与することができる。",
      1: "Business CriticalアカウントからBusiness Critical以外のアカウントにシェアする際は、ALTER SHARE コマンドでSHARE_RESTRICTIONS=false パラメータを設定する必要がある。",
      2: "Business Critical以外のアカウントにデータをシェアするには、OVERRIDE SHARE RESTRICTIONS権限に加えて、そのシェアに対するOWNERSHIP権限またはCREATE SHARE グローバル権限が必要である。",
      3: "Business Criticalアカウントからのシェアは、セキュリティ上の理由により、Business Critical以外のアカウントに対して一切実行することができない。",
    },
    answers: [0, 1, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Business CriticalアカウントからBusiness Critical以外のアカウントへのシェアを有効にする | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/override_share_restrictions",
      },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        SnowflakeのBusiness CriticalアカウントからBusiness Critical以外のアカウントに対してデータをシェアする方法について、
        <strong className="text-emerald-500">正しいもの</strong>を全て選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Business CriticalアカウントからBusiness Critical以外のアカウントへのデータシェアは、特別な権限設定と手順が必要です。セキュリティレベルの異なるアカウント間でのデータ共有のため、適切な権限管理と設定が重要になります。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            OVERRIDE SHARE RESTRICTIONS権限は、ACCOUNTADMINロールにデフォルトで付与されており、他のロールにも付与することができる。：
          </strong>
          <br />
          これは<strong className="text-emerald-500">正しい</strong>
          です。OVERRIDE SHARE RESTRICTIONS権限はACCOUNTADMINロールにデフォルトで付与されていますが、
          <code>GRANT OVERRIDE SHARE RESTRICTIONS ON ACCOUNT TO ROLE &lt;role_name&gt;</code>
          コマンドを使用して他のロールにも付与できます。
        </li>
        <li className="pt-2">
          <strong>
            Business CriticalアカウントからBusiness Critical以外のアカウントにシェアする際は、ALTER SHARE コマンドでSHARE_RESTRICTIONS=false パラメータを設定する必要がある。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。例：<code>ALTER SHARE my_share ADD ACCOUNTS = consumerorg.consumeraccount SHARE_RESTRICTIONS=false;</code>
        </li>
        <li className="pt-2">
          <strong>
            Business Critical以外のアカウントにデータをシェアするには、OVERRIDE SHARE RESTRICTIONS権限に加えて、そのシェアに対するOWNERSHIP権限またはCREATE SHARE グローバル権限が必要である。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。ユーザーはOVERRIDE SHARE RESTRICTIONS権限と、シェアに対するOWNERSHIP権限またはCREATE SHARE グローバル権限の両方を持っている必要があります。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">誤っている選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            Business Criticalアカウントからのシェアは、セキュリティ上の理由により、Business Critical以外のアカウントに対して一切実行することができない。：
          </strong>
          <br />
          これは<strong className="text-red-500">誤り</strong>
          です。適切な権限と設定（SHARE_RESTRICTIONS=false）を行うことで、Business CriticalアカウントからBusiness Critical以外のアカウントにデータをシェアすることが可能です。ただし、Snowflakeは機密データをBusiness Critical以外のアカウントとシェアしないことを強く推奨しています。
        </li>
      </ul>

      <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
        <p className="font-semibold text-yellow-800">重要な注意事項：</p>
        <ul className="list-disc pl-4 text-yellow-700 text-xs">
          <li>HIPAAやHITRUSTアカウント間でのデータシェアの場合、適切なBAA（Business Associate Agreement）の締結が必要</li>
          <li>Business Criticalアカウントのデータ保護レベルを維持するため、機密データの共有は避けることを推奨</li>
          <li>Tri-Secret Secureを使用している場合の追加考慮事項があります</li>
        </ul>
      </div>
    </div>
  );
} 
