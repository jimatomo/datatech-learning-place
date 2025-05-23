import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "Route 53", "DNS", "Infrastructure"],
    created_at: new Date("2025-05-22"),
    updated_at: new Date("2025-05-22"),

    // ----- quiz -----
    title: "Amazon Route 53の主要機能と特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Route 53はドメイン登録、DNSルーティング、ヘルスチェックの3つの主要機能を提供するが、これらは必ず全て同時に利用する必要がある。",
      1: "Route 53のヘルスチェック機能は、リソースの可用性を自動的に監視し、異常を検知した場合にDNSレコードを自動的に更新してトラフィックを正常なリソースに振り分けることができる。",
      2: "Route 53のトラフィックフロー機能は、地理的な位置情報のみに基づいてトラフィックを振り分けることができ、レイテンシーやヘルスステータスは考慮できない。",
      3: "Route 53 Resolver DNS Firewallは、インバウンドDNSトラフィックのみをフィルタリングし、アウトバウンドDNSトラフィックは保護できない。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "What is Amazon Route 53?", url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html" },
      { title: "How Amazon Route 53 checks the health of your resources", url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/welcome-health-checks.html" },
      { title: "Using Traffic Flow to route DNS traffic", url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/traffic-flow.html" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-3">Amazon Route 53の機能と特徴に関する記述として、<strong className="text-emerald-500">最も適切なもの</strong>はどれでしょうか？</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm space-y-2">
      <p>
        各種選択肢に関して解説します。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-red-500">Route 53はドメイン登録、DNSルーティング、ヘルスチェックの3つの主要機能を提供するが、これらは必ず全て同時に利用する必要がある。</strong>：これは誤りです。
          Route 53の3つの主要機能（ドメイン登録、DNSルーティング、ヘルスチェック）は、必要に応じて個別に、または組み合わせて利用することができます。
        </li>
        <li>
          <strong className="text-emerald-500">Route 53のヘルスチェック機能は、リソースの可用性を自動的に監視し、異常を検知した場合にDNSレコードを自動的に更新してトラフィックを正常なリソースに振り分けることができる。</strong>：これは正しい記述です。
          Route 53のヘルスチェック機能は、エンドポイントの可用性を継続的に監視し、問題が検出された場合に自動的にDNSレコードを更新して、トラフィックを正常なリソースに振り分けることができます。
        </li>
        <li>
          <strong className="text-red-500">Route 53のトラフィックフロー機能は、地理的な位置情報のみに基づいてトラフィックを振り分けることができ、レイテンシーやヘルスステータスは考慮できない。</strong>：これは誤りです。
          Route 53のトラフィックフロー機能は、地理的な位置情報だけでなく、レイテンシー、ヘルスステータス、その他の条件を組み合わせてトラフィックを振り分けることができます。
        </li>
        <li>
          <strong className="text-red-500">Route 53 Resolver DNS Firewallは、インバウンドDNSトラフィックのみをフィルタリングし、アウトバウンドDNSトラフィックは保護できない。</strong>：これは誤りです。
          Route 53 Resolver DNS Firewallは、アウトバウンドDNSトラフィックをフィルタリングするために設計されており、ドメインリストを作成して、これらのルールに基づいてDNSトラフィックをフィルタリングすることができます。
        </li>
      </ul>
      <p>
        <strong>解説:</strong><br />
        Amazon Route 53は、高可用性でスケーラブルなDNSウェブサービスとして、以下の主要な機能を提供しています：
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>ドメイン登録：ウェブサイトやアプリケーションのドメイン名を登録</li>
        <li>DNSルーティング：インターネットトラフィックをドメインのリソースにルーティング</li>
        <li>ヘルスチェック：リソースの可用性を自動的に監視し、問題が発生した場合にトラフィックを正常なリソースに振り分け</li>
      </ul>
      <p>
        これらの機能は、必要に応じて個別に、または組み合わせて利用することができ、アプリケーションの要件に応じて柔軟に設定することができます。
        特にヘルスチェック機能は、アプリケーションの可用性を確保する上で重要な役割を果たします。
      </p>
    </div>
  );
} 
