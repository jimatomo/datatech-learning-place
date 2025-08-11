import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "Infrastructure"],
    created_at: new Date("2025-03-13"),
    updated_at: new Date("2025-03-13"),

    // ----- quiz -----
    title: "CPUアーキテクチャとAWS Gravitonについて",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "ARMアーキテクチャはCISC（複雑命令セットコンピューティング）に分類される",
      1: "AWS Gravitonプロセッサは、AWSが独自に設計したARMベースのプロセッサである",
      2: "x86アーキテクチャは消費電力効率においてARMアーキテクチャより優れている",
      3: "AWS Graviton3プロセッサは、同世代のx86プロセッサと比較して最大40%のパフォーマンス/価格向上を提供する",
    },
    answers: [1, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "AWS Graviton プロセッサ", url: "https://aws.amazon.com/jp/ec2/graviton/" },
      { title: "ARMとx86の違い", url: "https://www.arm.com/architecture/cpu" },
      { title: "AWS Graviton3プロセッサ", url: "https://aws.amazon.com/jp/ec2/graviton/graviton3/" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <>
      <p>
        CPUアーキテクチャとAWS Gravitonに関する以下の記述のうち、正しいものをすべて選んでください。
      </p>
    </>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>CPUアーキテクチャとAWS Gravitonに関する問題です。</p>
      <p className="pt-4">選択肢の解説:</p>
      <ul className="list-disc pl-4">
        <li className="pt-2">ARMアーキテクチャは<span className="text-emerald-500">RISC（縮小命令セットコンピューティング。Reduce Instruction Set Computer）</span>に分類されます。シンプルな命令セットを持ち、電力効率に優れています。一方、x86アーキテクチャはCISC（Complex Instruction Set Computer）に分類されます。</li>
        <li className="pt-2">AWS Gravitonプロセッサは、AWSが独自に設計したARMベースのプロセッサです。クラウドワークロード向けに最適化されており、コスト効率とパフォーマンスの向上を目的としています。</li>
        <li className="pt-2">x86アーキテクチャは複雑な命令セットを持ち、高性能を発揮しますが、ARMアーキテクチャの方が<span className="text-emerald-500">消費電力効率に優れています</span>。これがモバイルデバイスやエッジコンピューティングでARMが広く採用されている理由の一つです。</li>
        <li className="pt-2">AWS Graviton3プロセッサは、同世代のx86プロセッサと比較して最大40%のパフォーマンス/価格向上を提供します。また、最大60%のエネルギー効率の向上も実現しています。2024年にはさらに30%も性能が向上したGraviton4も登場しています。</li>
      </ul>
      <p className="pt-4">AWS Gravitonについて:</p>
      <ul className="list-disc pl-4">
        <li className="pt-2">AWS独自設計のARMベースプロセッサ</li>
        <li className="pt-2">クラウドワークロード向けに最適化され、コスト効率とパフォーマンスを向上</li>
        <li className="pt-2">EC2インスタンス、RDS、ElastiCache、Amazon EMRなど多くのAWSサービスで利用可能</li>
      </ul>
      <p className="pt-4">
        クラウドコンピューティングの進化に伴い、ARMベースのプロセッサはデータセンターでも重要な役割を果たすようになっています。
        電力消費率の良さはそのまま価格にも反映されています。新規で開発する場合にはARMベースで構築できないか検討してみるといいでしょう。
        また、Dockerなどのコンテナ技術を利用するとマルチプラットフォームでの移植性も上がるので、積極的に採用してみましょう。
      </p>
    </div>
  );
} 
