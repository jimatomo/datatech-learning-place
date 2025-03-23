import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "VPC", "Infrastructure"],
    created_at: new Date("2025-02-20"),
    updated_at: new Date("2025-02-20"),

    // ----- quiz -----
    title: "Amazon VPCとサブネットの設計における重要なポイント",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "VPCのCIDRは/16程度の大きめの範囲を割り当て、サブネットは/24程度の大きめの範囲を割り当てる",
      1: "カスタムDHCPオプションセットを使用して、独自のDNSサーバーやNTPサーバーを設定することで、VPCの可用性を高める",
      2: "単一のアベイラビリティゾーンに全てのサブネットを配置し、そのAZ内でパブリックとプライベートを分けることでコスト最適化を図る",
      3: "VPCのCIDRは/26程度の小さめの範囲を割り当て、サブネットは/28程度の小さめの範囲を割り当てる"
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Amazon VPCとサブネットの設計のポイントについて", url: "https://blog.serverworks.co.jp/2023/04/10/142451" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Amazon VPCとサブネットを設計する際の一般的なプラクティスとして、以下のうち最も適切なものを選択してください。
        ただし、高い可用性と拡張性が求められる要件がある前提とします。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        VPCとサブネットの設計では、以下のポイントが重要です：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          VPCのCIDRは/16程度の大きめの範囲を割り当てることで、将来的な拡張性を確保できます
        </li>
        <li>
          サブネットは/24程度の大きめの範囲を割り当てることで、十分なIPアドレスを確保できます
        </li>
        <li>
          各サブネットでは、5つのIPアドレスがAWSによって予約されているため、実際に使用できるIPアドレス数はそれより少なくなります
        </li>
        <li>
          複数のアベイラビリティゾーンにサブネットを配置する場合、各AZに同じサイズのサブネットを割り当てることが推奨されます
        </li>
      </ul>
      <p>
        誤った選択肢の解説：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          DHCPオプションセットは、VPCのDNSやNTPサーバーの設定に使用されますが、これはVPCの可用性とは直接関係ありません
        </li>
        <li>
          単一のAZにすべてのリソースを配置することは、そのAZで障害が発生した場合にシステム全体が停止するリスクがあるため推奨されません
        </li>
        <li>
          /28のような小さいCIDRブロックでは、利用可能なIPアドレスが極端に制限され、実用的ではありません
        </li>
      </ul>
    </div>
  );
} 

