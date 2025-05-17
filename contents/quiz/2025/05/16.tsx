import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowpark", "Pandas API", "Data Application"],
    created_at: new Date("2025-05-16"),
    updated_at: new Date("2025-05-16"),
    title: "Snowpark Pandas API の基本的な使用方法",
    question_jsx: <QuizQuestion />,
    options: {
      0: "import pandas as pd",
      1: "import modin.pandas as pd\nimport snowflake.snowpark.modin.plugin",
      2: "import snowflake.snowpark.functions",
      3: "import modin.pandas as pd",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "pandas on Snowflake — Snowflake Documentation", url: "https://docs.snowflake.com/en/developer-guide/snowpark/python/pandas-on-snowflake" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  const questionCode = `
# (A)

# Snowparkセッションを作成
from snowflake.snowpark.session import Session
session = Session.builder.create()

# 'MY_TABLE' からデータを読み込む
df = pd.read_snowflake('MY_TABLE')

# DataFrameの先頭を表示
print(df.head())
  `;
  return (
    <div>
      <p className="pb-2">
        Snowpark Pandas API を使用して Snowflake 上のテーブルからデータを読み込む際のコードとして以下の(A)に入る選択肢として最も適切なものを選択してください。
      </p>
      <CodeBlock code={questionCode.trim()} />
    </div>
  );
}

function QuizExplanation(): JSX.Element {
  const correctCode = `import modin.pandas as pd
import snowflake.snowpark.modin.plugin`;
  const option0Code = `import pandas as pd`;
  const option2Code = `import snowflake.snowpark.functions`;
  const option3Code = `import modin.pandas as pd`;

  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowpark Pandas API を利用すると、使い慣れた pandas の構文で、Snowflake の強力な計算エンジンを活用して大規模データセットを処理できます。
        データはSnowflake内に留まるため、セキュリティとガバナンスも維持されます。
      </p>

      <p className="py-2 font-semibold">各選択肢の解説：</p>
      <ul className="list-disc pl-6">
        <li>
          <CodeBlock code={option0Code.trim()} showLineNumbers={false} />
          これは通常の pandas ライブラリをインポートするものであり、Snowpark Pandas API を利用するためには不適切です。
          Snowpark Pandas API を使用するには、modin.pandas を pd としてインポートし、さらに Snowpark 用のプラグインをインポートする必要があります。
        </li>
        <li className="pt-2">
          <CodeBlock code={correctCode.trim()} showLineNumbers={false} />
          <strong className="text-emerald-500">これが正解です。</strong>
          Snowpark Pandas API を利用するには、まず modin.pandas を pd というエイリアスでインポートします。
          次に、Snowflake が提供する Snowpark 用の Modin プラグイン snowflake.snowpark.modin.plugin をインポートする必要があります。
          これにより、pandas のAPI呼び出しがバックグラウンドでSnowflakeのSQLに変換されて実行されます。
          pd.read_snowflake(&apos;MY_TABLE&apos;) は、指定されたSnowflakeテーブルからデータをSnowpark Pandas DataFrameとして読み込むための正しい関数です。
        </li>
        <li className="pt-2">
          <CodeBlock code={option2Code} showLineNumbers={false} />
          このコードは Snowpark DataFrame API を使用しています。
          session.table(&apos;MY_TABLE&apos;) は Snowpark DataFrame を返しますが、これは Snowpark Pandas DataFrame とは異なるAPIと挙動を持ちます。
          問題は Snowpark Pandas API の使用について尋ねているため、これは不適切です。
        </li>
        <li className="pt-2">
          <CodeBlock code={option3Code.trim()} showLineNumbers={false} />
          この選択肢では modin.pandas をインポートしていますが、Snowpark 用のプラグイン snowflake.snowpark.modin.plugin のインポートが欠けています。
          このプラグインがないと、Modin はSnowflakeバックエンドで動作できません。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        Snowpark Pandas API を正しく利用するためには、import modin.pandas as pd と import snowflake.snowpark.modin.plugin の両方が必要です。
        これにより、pandas のコードを最小限の変更でSnowflake上で実行できるようになり、スケーラビリティとパフォーマンスの向上が期待できます。
      </p>
    </div>
  );
} 