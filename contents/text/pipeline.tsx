import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RocketIcon, BookOpen, TerminalSquare, CloudCog, Workflow, GitMerge, Database } from "lucide-react";

const contents = [
  {
    title: "イントロダクション",
    description: "データエンジニアリングの全体像と、本テキストで扱う技術について学びます。",
    href: "/text/pipeline/01",
    icon: BookOpen,
  },
  {
    title: "Snowflake環境のセットアップ",
    description: "データ分析の基盤となるSnowflakeのセットアップと基本的な操作方法を学びます。",
    href: "/text/pipeline/02",
    icon: Database,
  },
  {
    title: "ローカル環境でのdbt実行",
    description: "Dockerを用いてローカルにdbt実行環境を構築し、Snowflakeへの接続を確認します。",
    href: "/text/pipeline/03",
    icon: TerminalSquare,
  },
  {
    title: "dbtモデルの開発",
    description: "実際のデータを使ってdbtモデルを作成し、データ変換の基本的な処理を学びます。",
    href: "/text/pipeline/04",
    icon: Database,
  },
  {
    title: "AWS環境のセットアップ",
    description: "データパイプラインのインフラとなるAWSの各種サービス（S3, IAM等）をセットアップします。",
    href: "/text/pipeline/05",
    icon: CloudCog,
  },
  {
    title: "FargateとStep Functionsによるバッチ処理",
    description: "dbtのバッチ処理をECS on Fargateで実行し、Step Functionsでワークフローを管理します。",
    href: "/text/pipeline/06",
    icon: Workflow,
  },
  {
    title: "GitHub ActionsによるCI/CD",
    description: "GitHub Actionsを用いて、テストとデプロイの自動化パイプラインを構築します。",
    href: "/text/pipeline/07",
    icon: GitMerge,
  },
  {
    title: "モデルの改善と最適化",
    description: "作成したdbtモデルの性能改善、テストの追加、ドキュメント化などの運用面を学びます。",
    href: "/text/pipeline/08",
    icon: Database,
  },
];

export default function TextPage() {
  return (
    <div className="w-full">
      {/* イントロダクション */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-8 rounded-lg mb-12 text-center shadow-lg">
        <div className="flex justify-center items-center mb-4">
          <RocketIcon className="h-12 w-12 text-blue-600 animate-pulse" />
        </div>
        <h1 className="text-3xl font-extrabold text-blue-900 dark:text-blue-100 mb-2">
          データエンジニアリング実践入門（⚠️工事中です👷）
        </h1>
        <p className="text-lg text-blue-800 dark:text-blue-200 font-medium">
          学習ロードマップ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((content, index) => (
          <Link href={content.href} key={content.title} passHref>
            <Card className="h-full flex flex-col hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex-grow">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mt-1">
                    <content.icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-500 dark:text-blue-400 mb-1">Chapter {index + 1}</p>
                    <CardTitle className="text-lg leading-snug">{content.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="pt-4 text-sm leading-relaxed">{content.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
