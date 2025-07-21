import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Python", "dataclass", "Best Practice", "Data Application"],
    created_at: new Date("2025-07-25"),
    updated_at: new Date("2025-07-25"),

    // ----- quiz -----
    title: "Pythonのdataclass",
    question_jsx: <QuizQuestion />,
    options: {
      0: "`__init__` や `__eq__` などの特殊メソッドを自動生成するため、ボイラープレートコードを削減できる。",
      1: "フィールドを定義するには、必ず型アノテーションを使用する必要がある。",
      2: "`frozen=True` を指定することで、イミュータブルな（変更不可能な）データクラスを作成できる。",
      3: "Python 3.6 から、追加ライブラリなしで標準機能として利用できる。",
    },
    answers: [0, 1, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Python3.7以上のデータ格納はdataclassを活用しよう", url: "https://qiita.com/ttyszk/items/01934dc42cbd4f6665d2" },
      { title: "dataclasses — Data Classes", url: "https://docs.python.org/3/library/dataclasses.html" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Pythonの<code>@dataclass</code>デコレータに関する記述として、
        <strong className="text-emerald-500">正しいもの</strong>を
        すべて選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  const codeExample = `
import dataclasses

# frozen=Trueでイミュータブルなdataclassを作成
@dataclasses.dataclass(frozen=True)
class Person:
    # 型アノテーションが必須
    name: str
    age: int

    def self_introduce(self):
        return f"My name is {self.name}."

# __init__が自動生成されている
person1 = Person("Alice", 30)
person2 = Person("Alice", 30)
person3 = Person("Bob", 25)

# __repr__が自動生成されている
print(person1)
# > Person(name='Alice', age=30)

# __eq__が自動生成されている
print(person1 == person2) # > True
print(person1 == person3) # > False

# イミュータブルなのでフィールドへの再代入はエラーになる
# person1.age = 31 # -> dataclasses.FrozenInstanceError: cannot assign to field 'age'
`.trim();

  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-emerald-500">正解の解説：</p>
      
      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「`__init__` や `__eq__` などの特殊メソッドを自動生成するため、ボイラープレートコードを削減できる。」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><code>@dataclass</code>デコレータは、クラス定義で指定されたフィールドに基づいて、<code>__init__()</code>, <code>__repr__()</code>, <code>__eq__()</code>などの特殊メソッドを自動的に生成します。</li>
          <li>これにより、データ格納を目的としたクラスを定義する際の定型的なコードを大幅に削減できます。</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「フィールドを定義するには、必ず型アノテーションを使用する必要がある。」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><code>dataclass</code>は、クラス変数の型アノテーションを元にフィールドを認識します。</li>
          <li>型アノテーションは、コードの可読性を高め、静的解析ツールによるバグの発見を容易にするというメリットもあります。</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「`frozen=True` を指定することで、イミュータブルな（変更不可能な）データクラスを作成できる。」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>デフォルトでは、<code>dataclass</code>のインスタンスはミュータブル（変更可能）です。</li>
          <li>デコレータに <code>@dataclass(frozen=True)</code> と引数を渡すことで、フィールドへの再代入が禁止されたイミュータブルなインスタンスを生成できます。</li>
          <li>イミュータブルなオブジェクトは、辞書のキーとして使用できるなどの利点があります。</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-red-500">「Python 3.6 から、追加ライブラリなしで標準機能として利用できる。」❌ 間違い：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><code>dataclass</code>はPython 3.7で標準ライブラリに導入されました。</li>
          <li>Python 3.6でも <code>pip install dataclasses</code> を実行することで利用可能ですが、標準機能ではありません。</li>
        </ul>
      </div>

      <p className="pt-4 font-semibold">コード例：</p>
      <CodeBlock code={codeExample} />

      <div className="bg-green-50 border-l-4 border-emerald-500 p-4 mt-4">
        <p className="text-sm">
          <strong>🎯 まとめ：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-green-700">
          <li><code>dataclass</code>は、データ保持のためのクラスを簡潔に書くための強力な機能です。</li>
          <li>型アノテーションを必須とすることで、コードの堅牢性と可読性を向上させます。</li>
          <li><code>frozen=True</code>オプションにより、イミュータブルなデータ構造を簡単に作成できます。</li>
          <li>Python 3.7以降でプロジェクトを開始する際は、データ構造の定義に<code>dataclass</code>の利用を積極的に検討すると良いでしょう。</li>
        </ul>
      </div>
    </div>
  );
}