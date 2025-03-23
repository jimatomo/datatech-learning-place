import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Python", "JSON", "CSV", "Data Application"],
    created_at: new Date("2025-03-07"),
    updated_at: new Date("2025-03-07"),

    // ----- quiz -----
    title: "PythonでJSONデータをCSVに変換する",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "[A] json.loads(f)",
      1: "[A] json.load(f)",
      2: "[B] writer.writeheader()",
      3: "[B] writer.writerows(json_data)",
    },
    answers: [1, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Python公式ドキュメント - json", url: "https://docs.python.org/ja/3/library/json.html" },
      { title: "Python公式ドキュメント - csv", url: "https://docs.python.org/ja/3/library/csv.html" },
      { title: "Real Python - Working With JSON Data in Python", url: "https://realpython.com/python-json/" },
    ],
  });

  return quiz;
}

const question_code = `import json
import csv

# JSONファイルを読み込む
with open('data.json', 'r') as f:
  # 空欄A
  json_data = _______________

# JSONデータの最初の要素からフィールド名を取得
fieldnames = json_data[0].keys()

# CSVファイルに書き込む
with open('output.csv', 'w', newline='') as csvfile:
  writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
  # 空欄B
  _______________
  
  # データを書き込む
  for row in json_data:
    writer.writerow(row)

print("変換が完了しました！")`

function QuizQuestion() {
  return (
    <>
      <p className="pb-4">
        以下のPythonコードは、JSONファイルからデータを読み込み、CSVファイルに変換するプログラム（虫食い状態）です。
      </p>
      <CodeBlock maxLines={23} code={question_code} />
      <p className="mt-4">
        空欄AとBに入る正しいコードを選択してください。
      </p>
    </>
  );
}

// 完全な正解コード
const complete_code = `import json
import csv

# JSONファイルを読み込む
with open('data.json', 'r') as f:
    json_data = json.load(f)

# JSONデータの最初の要素からフィールド名を取得
fieldnames = json_data[0].keys()

# CSVファイルに書き込む
with open('output.csv', 'w', newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    
    # データを書き込む
    for row in json_data:
        writer.writerow(row)

print("変換が完了しました！")`;

// JSONファイルの例
const json_example = `[
  {
    "id": 1,
    "name": "田中太郎",
    "email": "tanaka@example.com",
    "age": 30
  },
  {
    "id": 2,
    "name": "鈴木花子",
    "email": "suzuki@example.com",
    "age": 25
  }
]`;

// 変換後のCSVファイル
const csv_example = `id,name,email,age
1,田中太郎,tanaka@example.com,30
2,鈴木花子,suzuki@example.com,25`;

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>PythonでJSONデータをCSVに変換する問題です。</p>
      <p className="py-2">選択肢の解説:</p>
      <ul className="list-disc pl-4">
        <li className="pt-2"><code>json_data = json.loads(open(&apos;data.json&apos;, &apos;r&apos;))</code> - これは誤りです。<code>json.loads()</code>は文字列からJSONをパースする関数で、ファイルオブジェクトを直接渡すことはできません。また、ファイルを<code>open()</code>した後に<code>close()</code>していないため、リソースリークの問題があります。</li>
        <li className="pt-2"><code>json_data = json.load(f)</code> - これは正しい構文です。<code>json.load()</code>はファイルオブジェクトからJSONをパースする関数です。</li>
        <li className="pt-2"><code>writer.writeheader()</code> - これは正しいコードです。CSVファイルを書き込みモードで開き、<code>DictWriter</code>オブジェクトを作成し、ヘッダー行を書き込んでいます。<code>newline=&apos;&apos;</code>パラメータは異なるプラットフォーム間での改行の扱いを統一するために重要です。</li>
        <li className="pt-2"><code>writer.writerows(json_data)</code> - これは誤りです。ヘッダーの代わりにデータが書き込まれます。</li>
      </ul>
      <p className="py-2">完全な正解コード:</p>
      <CodeBlock code={complete_code} />
      <p className="py-2">補足説明:</p>
      <p>
        JSONとCSVは一般的なデータ交換形式です。Pythonでは標準ライブラリの<code>json</code>モジュールと<code>csv</code>モジュールを使って簡単に処理できます。
      </p>
      <p className="py-2">JSONファイルの例:</p>
      <CodeBlock code={json_example} />
      <p className="py-2">変換後のCSVファイル:</p>
      <CodeBlock code={csv_example} />
      <p className="py-2">
        このようなデータ変換処理は、データ分析やシステム間のデータ連携でよく使われます。
        JSONはWebAPIからのレスポンスとしてよく使われる形式で、CSVはスプレッドシートソフトで開きやすいため、
        エンドユーザーへのデータ提供によく使われます。
      </p>
    </div>
  );
} 
