import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AI Agents", "LLM", "Tool Development", "Datatech News"],
    created_at: new Date("2025-09-21"),
    updated_at: new Date("2025-09-21"),

    // ----- quiz -----
    title: "AIエージェントのツール開発における応答設計の原則",
    question_jsx: <QuizQuestion />,
    options: {
      0: "エージェントの柔軟性を最大限に高めるため、可能な限り多くの情報を返す。",
      1: "UUIDやMIMEタイプなど、他のツールと連携しやすい低レベルな技術的識別子を優先する。",
      2: "エージェントが次の行動を直接判断できるよう、文脈的関連性の高い情報に絞って返す。",
      3: "データの一貫性を保つため、すべてのツールでXMLやJSONなどの単一の応答形式に統一する。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Writing effective tools for agents — with agents", url: "https://www.anthropic.com/engineering/writing-tools-for-agents" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        <a href="https://www.anthropic.com/engineering/writing-tools-for-agents" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Anthropicのブログ
        </a>
        に基づいて、AIエージェントが使用するツールを開発する際、ツールからの応答（戻り値）を設計する上で<strong className="text-green-600">最も推奨される</strong>原則はどれですか。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-green-600">正解の解説:</p>
      <p>
        AIエージェントに与えるツールは、人間がタスクをこなすのと同様に、次に取るべき行動の判断に直結する、文脈に即した情報（ハイコンテキストな情報）を返すことが重要です。これにより、エージェントはより少ないステップで、より正確にタスクを遂行できます。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong className="text-green-600">文脈的関連性の優先</strong>: 記事では、「ツールはエージェントに高シグナルな情報のみを返すように注意すべき」であり、「柔軟性よりも文脈的関連性を優先すべき」と述べられています。不要な情報（ノイズ）が多いと、エージェントは重要な情報を見失い、誤った判断を下す可能性があります。
        </li>
        <li>
          <strong className="text-red-500">低レベルな技術的識別子の回避</strong>: 記事によれば、エージェントは UUID のような暗号めいた識別子よりも、name のような人間が読んで理解できる自然言語の識別子を扱う方が成功率が高いとされています。
        </li>
        <li>
          <strong className="text-red-500">応答形式の柔軟性</strong>: 応答構造はタスクやエージェントによって最適なものが異なるため、常に単一の形式に統一することが最善とは限りません。記事では、response_format のようなパラメータをツールに持たせ、エージェントが必要に応じて情報の詳細度を制御できるようにするアプローチも紹介されています。
        </li>
      </ul>
    </div>
  );
}


