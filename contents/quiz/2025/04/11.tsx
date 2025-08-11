import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

const mapCode = "df['gender'] = df['gender'].map({'male': 0, 'female': 1})";
const replaceCode = "df['gender'] = df['gender'].replace({'male': 0, 'female': 1})";
const applyCode = "df['gender'] = df['gender'].apply(lambda x: 0 if x == 'male' else 1)";
const transformCode = "df['gender'] = df['gender'].transform({'male': 0, 'female': 1})";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Application", "Pandas", "Python"],
    created_at: new Date("2025-04-11"),
    updated_at: new Date("2025-04-11"),
    title: "pandasのデータフレームでの性別の文字列変換",
    question_jsx: <QuizQuestion />,
    options: { 
      0: mapCode,
      1: replaceCode,
      2: applyCode,
      3: transformCode,
    },
    answers: [0, 1, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "pandas documentation - map", url: "https://pandas.pydata.org/docs/reference/api/pandas.Series.map.html" },
      { title: "pandas documentation - replace", url: "https://pandas.pydata.org/docs/reference/api/pandas.Series.replace.html" },
      { title: "pandas documentation - apply", url: "https://pandas.pydata.org/docs/reference/api/pandas.Series.apply.html" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  const code = `import pandas as pd

# サンプルデータの作成
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'gender': ['female', 'male', 'female']
})

# 性別の文字列を数値に変換
# ここに変換コードを記述`;

  return (
    <div>
      <p className="pb-4">
        以下のコードは、pandasのデータフレームで性別の文字列（&apos;male&apos;/&apos;female&apos;）を数値（0/1）に変換するものです。
        正しい変換方法を全て選択してください。
      </p>
      <CodeBlock code={code} />
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        pandasのデータフレームで文字列を数値に変換する方法は複数あります。
        各選択肢について解説します。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>{mapCode}:</strong>
          <br />
          map()メソッドは、辞書を使用して値を変換する最も一般的な方法です。
          辞書のキーと値のマッピングに基づいて変換を行います。
        </li>
        <li className="pt-2">
          <strong>{replaceCode}:</strong>
          <br />
          replace()メソッドも同様に辞書を使用して値を変換できます。
          map()と同様の結果を得られますが、より柔軟な置換が可能です。
          <span className="text-orange-500">ただし、pandas 2.0以降では`replace`メソッドは非推奨となっており、将来的に削除される可能性があるため、`map`メソッドの使用が推奨されます。</span>
        </li>
        <li className="pt-2">
          <strong>{applyCode}:</strong>
          <br />
          apply()メソッドは、各要素に関数を適用します。
          この場合、ラムダ関数を使用して条件分岐による変換を行っています。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">間違っている選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>{transformCode}:</strong>
          <br />
          transform()メソッドは、このような変換には使用できません。
          transform()は主にグループ化されたデータに対して使用されるメソッドです。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        pandasでは、文字列から数値への変換に複数の方法が利用可能です。
        map()とreplace()は辞書ベースの変換に適しており、apply()はより複雑な条件分岐が必要な場合に使用できます。
        それぞれのメソッドの特性を理解し、適切な方法を選択することが重要です。
      </p>
    </div>
  );
} 
