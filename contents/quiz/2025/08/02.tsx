import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Master Data Management", "Golden Record", "Source of Truth", "Data Management"],
    created_at: new Date("2025-08-02"),
    updated_at: new Date("2025-08-02"),

    // ----- quiz -----
    title: "「信頼できるソース」と「ゴールデンレコード」の違い",
    question_jsx: <QuizQuestion />,
    options: {
      0: "「信頼できるソース」と「ゴールデンレコード」は実質的に同義であり、マスターデータの最も信頼性が高いバージョンを指す言葉として同じように使われる。",
      1: "「ゴールデンレコード」はデータの生成元や更新プロセスといった管理手順全体を指す広範な概念であるのに対し、「信頼できるソース」は特定の一意なデータレコードそのものを指す。",
      2: "「信頼できるソース」はデータの品質や来歴を保証する管理の仕組みやプロセスを含む概念である一方、「ゴールデンレコード」は特定時点での「唯一の正しいデータ」を指す。後者はデータの鮮度に関して誤解を生む可能性がある。",
      3: "「信頼できるソース」は物理的なデータベースやシステムの場所を指す技術的な用語であり、「ゴールデンレコード」はビジネス上の重要度が高いと判断されたデータ項目のことである。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "データマネジメント知識体系ガイド 第二版", url: "https://www.amazon.co.jp/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E7%9F%A5%E8%AD%98%E4%BD%93%E7%B3%BB%E3%82%AC%E3%82%A4%E3%83%89-%E7%AC%AC%E4%BA%8C%E7%89%88-DAMA-International/dp/4296100491" },
      { title: "Single Source of Truth vs Single Version of Truth", url: "https://www.linkedin.com/pulse/single-source-truth-vs-version-lionel-grealou" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        マスタデータ管理において用いられる「信頼できるソース（Source of Truth）」と「ゴールデンレコード（Golden Record）」という用語に関する記述のうち、
        <strong className="text-emerald-500">最も適切なもの</strong>を
        選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-emerald-500">正解の解説：</p>
      
      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「信頼できるソースはデータの品質や来歴を保証する管理の仕組みやプロセスを含む概念である一方、「ゴールデンレコード」は特定時点での「唯一の正しいデータ」を指す。後者はデータの鮮度に関して誤解を生む可能性がある。」✅ 正しい：</p>
        <p className="text-sm leading-relaxed">
          これが最も正確な記述です。「信頼できるソース（Source of Truth）」は、単に正しいデータそのものだけでなく、そのデータが生成・維持・提供されるプロセスやシステム、データリネージ（来歴）全体を包含する広範な概念です。データの信頼性を保証するための「仕組み」に焦点を当てています。
          一方、「ゴールデンレコード」や「単一の真実のバージョン（Single Version of the Truth）」は、特定時点における「唯一の正しいデータセット」という結果物を指します。しかし、このゴールデンレコードが各システムに配布されるまでにはタイムラグが発生することがあり、その間にデータが陳腐化してしまう可能性があります。そのため、「唯一の正しい」という表現が実態と異なり、誤解を招くことがあると指摘されています。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-red-500">「「信頼できるソース」と「ゴールデンレコード」は実質的に同義であり、マスターデータの最も信頼性が高いバージョンを指す言葉として同じように使われる。」❌ 間違い：</p>
        <p className="text-sm leading-relaxed">
          これらの用語は密接に関連していますが、同義ではありません。上記で解説した通り、「信頼できるソース」はプロセスや仕組みを含む広い概念であり、「ゴールデンレコード」は特定時点でのデータのスナップショットを指すというニュアンスの違いがあります。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-red-500">「「ゴールデンレコード」はデータの生成元や更新プロセスといった管理手順全体を指す広範な概念であるのに対し、「信頼できるソース」は特定の一意なデータレコードそのものを指す。」❌ 間違い：</p>
        <p className="text-sm leading-relaxed">
          これは概念が逆になっています。「信頼できるソース」がプロセスを含む広範な概念です。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-red-500">「「信頼できるソース」は物理的なデータベースやシステムの場所を指す技術的な用語であり、「ゴールデンレコード」はビジネス上の重要度が高いと判断されたデータ項目のことである。」❌ 間違い：</p>
        <p className="text-sm leading-relaxed">
          「信頼できるソース」は物理的な場所だけを指すものではなく、ガバナンスやプロセスを含みます。また、「ゴールデンレコード」は重要度だけで定義されるものではなく、マスターデータとして統合・クレンジングされた結果のレコードを指します。
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
        <p className="text-sm">
          <strong>🎯 用語のニュアンスまとめ：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-blue-700">
          <li><strong>信頼できるソース (Source of Truth):</strong>
            <ul>
              <li>より広範な概念。</li>
              <li>データの生成、更新、管理の<strong className="text-emerald-600">プロセスや仕組み</strong>を重視。</li>
              <li>「どのようにしてデータが信頼できる状態に保たれるか」という動的な側面を含む。</li>
            </ul>
          </li>
          <li><strong>ゴールデンレコード (Golden Record):</strong>
            <ul>
              <li>より具体的な概念。</li>
              <li>特定時点での「唯一の正しい」とされる<strong className="text-emerald-600">データそのもの（結果）</strong>を指す。</li>
              <li>データの鮮度（リアルタイム性）に課題が生じる可能性がある。</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}