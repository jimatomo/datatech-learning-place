import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Application", "Python"],
    created_at: new Date("2025-05-23"),
    updated_at: new Date("2025-05-23"),
    title: "Pythonで辞書のリストから特定のキーの値を安全に取得する方法",
    question_jsx: <QuizQuestion />,
    options: {
      0: "[d['city'] for d in data]",
      1: "[d.get('city') for d in data]",
      2: "list(map(lambda x: x['city'], data))",
      3: "[d.city for d in data]",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Pythonで辞書のリストから特定のキーの値のリストを取得", url: "https://note.nkmk.me/python-dict-list-values/" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  const questionCode = `
# JSONファイルから読み込んだデータ（辞書のリスト）
data = [
    {'name': 'Alice', 'age': 25, 'city': 'Tokyo'},
    {'name': 'Bob', 'age': 30, 'city': 'Osaka'},
    {'name': 'Charlie', 'age': 35}  # cityキーが存在しない
]

# 全ての人の都市をリストとして取得したい
cities = (A)
print(cities)
# 期待する結果: ['Tokyo', 'Osaka', None]
  `;
  return (
    <div>
      <p className="pb-2">
        JSONファイルから読み込んだ辞書のリストから、全ての要素の特定のキー（この場合は&apos;city&apos;）の値を安全に取得するコードとして、(A)に入る最も適切な選択肢を選んでください。
      </p>
      <CodeBlock code={questionCode.trim()} />
    </div>
  );
}

function QuizExplanation() {
  const correctCode = `[d.get('city') for d in data]`;
  const option0Code = `[d['city'] for d in data]`;
  const option2Code = `list(map(lambda x: x['city'], data))`;
  const option3Code = `[d.city for d in data]`;
  
  const keyErrorExample = `data = [
    {'name': 'Alice', 'age': 25, 'city': 'Tokyo'},
    {'name': 'Bob', 'age': 30},  # cityキーが存在しない
    {'name': 'Charlie', 'age': 35, 'city': 'Osaka'}
]

# KeyErrorが発生する
cities = [d['city'] for d in data]  # KeyError: 'city'`;

  const getMethodExample = `# get()メソッドを使用した安全な方法
cities = [d.get('city') for d in data]
print(cities)  # ['Tokyo', None, 'Osaka']

# デフォルト値を指定
cities_with_default = [d.get('city', 'Unknown') for d in data]
print(cities_with_default)  # ['Tokyo', 'Unknown', 'Osaka']`;

  return (
    <div className="text-xs md:text-sm">
      <p>
        JSONファイルを読み込むと、辞書のリストとして扱われることが多く、その際に特定のキーの値を抽出する処理は頻繁に発生します。
        しかし、全ての辞書が同じキーを持つとは限らないため、安全な方法で値を取得することが重要です。
      </p>

      <p className="py-2 font-semibold">各選択肢の解説：</p>
      <ul className="list-disc pl-6">
        <li>
          <CodeBlock code={option0Code} showLineNumbers={false} />
          辞書のキーに直接アクセスする方法です。しかし、指定したキーが存在しない辞書があると<strong className="text-red-500">KeyError</strong>が発生します。
          <CodeBlock code={keyErrorExample.trim()} />
        </li>
        <li className="pt-2">
          <CodeBlock code={correctCode} showLineNumbers={false} />
          <strong className="text-emerald-500">これが正解です。</strong>
          辞書の<code>get()</code>メソッドを使用することで、キーが存在しない場合でもエラーを発生させずに<code>None</code>を返します。
          これにより、JSONデータの構造が一部異なっていても安全に処理できます。
          <CodeBlock code={getMethodExample.trim()} />
        </li>
        <li className="pt-2">
          <CodeBlock code={option2Code} showLineNumbers={false} />
          <code>map()</code>関数を使用した方法ですが、内部で辞書のキーに直接アクセスしているため、キーが存在しない場合は選択肢0と同様に<strong className="text-red-500">KeyError</strong>が発生します。
        </li>
        <li className="pt-2">
          <CodeBlock code={option3Code} showLineNumbers={false} />
          辞書をオブジェクトの属性のようにアクセスしようとしていますが、辞書にはこのような属性アクセスはできません。
          <strong className="text-red-500">AttributeError</strong>が発生します。
        </li>
      </ul>

      <p className="pt-4">
        <strong>実践的なポイント：</strong>
        <br />
        <code>get()</code>メソッドには第二引数でデフォルト値を指定できるため、<code>None</code>以外の値を返したい場合に便利です。
        また、キーが存在しない要素を除外したい場合は、リスト内包表記に条件を追加することもできます：
        <code>[d.get(&apos;city&apos;) for d in data if d.get(&apos;city&apos;)]</code>
      </p>
    </div>
  );
} 