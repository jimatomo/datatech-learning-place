import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Datatech News", "AI"],
    created_at: new Date("2025-04-20"),
    updated_at: new Date("2025-04-20"),

    // ----- quiz -----
    title: "Model Context Protocol (MCP) と JSON-RPC",
    question_jsx: <QuizQuestion />,
    options: {
      0: "MCPは、LLMアプリケーションと外部ツール間の通信にREST APIを標準として使用する。",
      1: "JSON-RPC 2.0は、MCPの通信メッセージフォーマットとして採用されている。",
      2: "MCPの主な機能には、リソース、プロンプト、ツールの提供が含まれる。",
      3: "MCPの通信トランスポートとして、stdio (標準入出力) のみがサポートされている。",
    },
    answers: [1, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Model Context Protocol - Concepts: Transports", url: "https://modelcontextprotocol.io/docs/concepts/transports" },
      { title: "Model Context Protocol - Specification", url: "https://modelcontextprotocol.io/specification/2025-03-26" },
      { title: "JSON-RPC 2.0 Specification", url: "https://www.jsonrpc.org/specification" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Model Context Protocol (MCP) に関して、<strong className="text-green-600">正しいものを全て</strong>選んでください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  const jsonRpcRequestExample = `{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {}
}`;

  const jsonRpcResponseExample = `{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      { "name": "searchWeb", "description": "Search the web for information." },
      { "name": "calculate", "description": "Perform mathematical calculations." }
    ]
  }
}`;

  return (
    <div className="text-xs md:text-sm">
      <p>
        Model Context Protocol (MCP) は、LLMアプリケーション（ホスト）が外部のデータソースやツール（サーバー）とシームレスに連携するためのオープンプロトコルです。通信の基盤としてJSON-RPC 2.0を採用しています。
      </p>
      <p className="py-2">
        <strong className="text-red-500">MCPは、LLMアプリケーションと外部ツール間の通信にREST APIを標準として使用する。：これは誤った記載です。</strong>
        <ul className="list-disc pl-4">
          <li>MCPは、通信プロトコルとしてJSON-RPC 2.0をワイヤーフォーマット（wire format）として使用します。REST APIではありません。</li>
        </ul>
      </p>
      <p className="py-2">
        <strong className="text-emerald-500">JSON-RPC 2.0は、MCPの通信メッセージフォーマットとして採用されている。：これは正しい記載です。</strong>
        <ul className="list-disc pl-4">
          <li>MCPのクライアント（ホスト内のコネクタ）とサーバー間の通信は、JSON-RPC 2.0の仕様に基づいたリクエスト、レスポンス、通知メッセージによって行われます。</li>
          <li>以下はJSON-RPCリクエストの例です：</li>
          <CodeBlock code={jsonRpcRequestExample} />
          <li>以下はJSON-RPCレスポンスの例です：</li>
          <CodeBlock code={jsonRpcResponseExample} />
        </ul>
      </p>
      <p className="py-2">
        <strong className="text-emerald-500">MCPの主な機能には、リソース、プロンプト、ツールの提供が含まれる。：これも正しい記載です。</strong>
        <ul className="list-disc pl-4">
          <li>MCPサーバーは、クライアントに対して以下の主要な機能を提供できます。
            <ul className="list-disc pl-6">
              <li><strong>Resources:</strong> ユーザーまたはAIモデルが利用するコンテキストやデータ。</li>
              <li><strong>Prompts:</strong> ユーザー向けのテンプレート化されたメッセージやワークフロー。</li>
              <li><strong>Tools:</strong> AIモデルが実行する関数（機能）。</li>
            </ul>
          </li>
        </ul>
      </p>
      <p className="py-2">
        <strong className="text-red-500">MCPの通信トランスポートとして、stdio (標準入出力) のみがサポートされている。：これは誤った記載です。</strong>
        <ul className="list-disc pl-4">
          <li>MCPは複数の通信トランスポートをサポートしています。標準で提供されているものには、stdio (標準入出力) に加えて、SSE (Server-Sent Events) があります。</li>
          <li>また、特定のニーズに合わせてカスタムトランスポートを実装することも可能です。</li>
        </ul>
      </p>
      <p className="pt-4">
        MCPは、Language Server Protocol (LSP) に着想を得ており、AIアプリケーションのエコシステム全体で外部コンテキストやツールを統合する方法を標準化することを目指しています。
      </p>
    </div>
  );
} 
