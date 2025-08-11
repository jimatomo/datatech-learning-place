import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Governance", "Data Management", "Master Data Mgmt"],
    created_at: new Date("2025-08-09"),
    updated_at: new Date("2025-08-09"),

    // ----- quiz -----
    title: "マスターデータマネジメント（MDM）のプロセス",
    question_jsx: <QuizQuestion />,
    options: {
      0: "データモデリング: 管理対象となるマスターデータの構造、属性、リレーションシップを定義する。",
      1: "データ収集と統合: 複数のデータソースからマスターデータを収集し、重複を排除して統合されたレコード（ゴールデンレコード）を生成する。",
      2: "データクレンジングと標準化: データの品質を向上させるため、誤りや欠損値を修正し、定義された標準フォーマットに従ってデータを整形する。",
      3: "データ配信と最適化: マスターデータを各分析システムに配信し、それぞれの用途に合わせて非正規化や事前集計を行い、パフォーマンスを最適化する。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "データマネジメント知識体系ガイド 第二版", url: "https://www.amazon.co.jp/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E7%9F%A5%E8%AD%98%E4%BD%93%E7%B3%BB%E3%82%AC%E3%82%A4%E3%83%89-%E7%AC%AC%E4%BA%8C%E7%89%88-DAMA-International/dp/4296100491" },
      { title: "Master Data Management (MDM) | IBM", url: "https://www.ibm.com/topics/master-data-management" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        マスターデータマネジメント（MDM）の主要なプロセスに関する記述のうち、
        <strong className="text-red-500">最も不適切なもの</strong>を
        選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-red-500">正解の解説：</p>
      
      <div className="mb-4">
        <p className="font-semibold text-red-500">「データ配信と最適化: マスターデータを各分析システムに配信し、それぞれの用途に合わせて非正規化や事前集計を行い、パフォーマンスを最適化する。」❌ 不適切：</p>
        <p className="text-sm leading-relaxed">
          これが最も不適切な記述です。MDMのプロセスにはマスターデータを各システムへ「配信」することは含まれますが、配信先システムの用途に合わせて非正規化や事前集計といった「最適化」まで行うことは、一般的にMDMのコアな責務範囲から外れます。MDMはあくまで組織の「マスター」となるデータを一元管理することが目的であり、個別ユースケースのためのデータ変換は、後続のデータウェアハウスやBIのレイヤーが担うべき役割です。この境界を曖昧にすると、マスターデータの一貫性が損なわれるリスクがあります。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「データモデリング: 管理対象となるマスターデータの構造、属性、リレーションシップを定義する。」✅ 適切：</p>
        <p className="text-sm leading-relaxed">
          データモデリングはMDMの最初の重要なステップです。どのようなデータをマスタとして管理し、そのデータがどのような項目（属性）を持ち、他のデータとどう関連するのかを定義します。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「データ収集と統合: 複数のデータソースからマスターデータを収集し、重複を排除して統合されたレコード（ゴールデンレコード）を生成する。」✅ 適切：</p>
        <p className="text-sm leading-relaxed">
          組織内の異なるシステムに散在するデータを集め、名寄せやマッチング技術を用いて重複を特定・統合し、信頼できる唯一のデータセットである「ゴールデンレコード」を作成します。これはMDMの中核的なプロセスです。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「データクレンジングと標準化: データの品質を向上させるため、誤りや欠損値を修正し、定義された標準フォーマットに従ってデータを整形する。」✅ 適切：</p>
        <p className="text-sm leading-relaxed">
          収集したデータの品質を保証するためのプロセスです。表記ゆれ（例：「株式会社」と「(株)」）を統一したり、住所や電話番号のフォーマットを揃えたり、誤ったデータを修正したりします。
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
        <p className="text-sm">
          <strong>🎯 MDMプロセスのポイント：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-blue-700">
          <li><strong>目的:</strong> 信頼できるマスターデータを維持・管理し、組織全体で利用できるようにすること。</li>
          <li><strong>主な活動:</strong> モデリング、収集・統合、クレンジング・標準化、データアクセス手段（API、データサービス等）の提供。</li>
          <li><strong>後続の活動:</strong> MDMから提供されたデータを活用した、用途別のデータ変換（非正規化など）、分析、アプリケーション開発。</li>
        </ul>
      </div>
    </div>
  );
}