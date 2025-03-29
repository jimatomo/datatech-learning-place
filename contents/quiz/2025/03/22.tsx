import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["DMBOK", "ACID", "BASE", "Transaction", "Data Management"],
    created_at: new Date("2025-03-22"),
    updated_at: new Date("2025-03-22"),

    // ----- quiz -----
    title: "データベース処理におけるACIDとBASEの特性について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "Atomicity（原子性）とは、トランザクションは完全に成功するか完全に失敗するかのどちらかで、部分的な成功は許されないことを意味する",
      1: "Consistency（一貫性）とは、トランザクションの実行前後でデータベースが常に一定のルールや制約を満たした状態を保ち、不正なデータが存在しないことを意味する",
      2: "Isolation（独立性）とは、複数のトランザクションが同時に実行されても、各トランザクションは他のトランザクションの中間状態を参照できないことを意味する",
      3: "Durability（永続性）とは、コミットされたトランザクションの結果は永続的に保存され、システム障害が発生しても失われないことを意味する",
      4: "Basically Available（基本的な可用性）とは、ノードに障害が発生した場合でもシステムは一定レベル以上の可用性を保証し、データは失効している恐れがあるが引き続き応答し続けることを意味する",
      5: "Soft-state（柔軟な状態）とは、データの更新がすべてのノードに即時反映されることを意味する",
      6: "Eventually Consistent（結果整合性）とは、ある時点で不整合があっても、長期的には整合性が取れる状態になることを意味する",
    },
    answers: [5],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "データマネジメント知識体系ガイド 第二版", url: "https://www.amazon.co.jp/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E7%9F%A5%E8%AD%98%E4%BD%93%E7%B3%BB%E3%82%AC%E3%82%A4%E3%83%89-%E7%AC%AC%E4%BA%8C%E7%89%88-DAMA-International/dp/4296100491" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        データベース処理におけるACIDとBASEの特性について、<span className="text-red-500">間違っている</span>選択肢を選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        データベース処理におけるACIDとBASEの特性について、間違っている選択肢は
        「Soft-state（柔軟な状態）とは、データの更新がすべてのノードに即時反映されることを意味する」です。
      </p>
      <p className="py-2">
        Soft-stateは、むしろその逆で、「データの状態が時間とともに変化する可能性がある」ことを意味します。
        分散システムにおいては、データの更新が全ノードに即時に反映されるわけではなく、一時的に不整合が許容されます。
        これは「結果整合性」（Eventually Consistent）と関連しており、最終的には整合性が取れる状態になることを目指します。
      </p>
      <p className="py-2">
        ACIDとBASEは対照的な特性を持っています：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          <strong>ACID</strong>：RDBMSで主に使用される特性で、データの整合性を重視します。
          <ul className="list-disc pl-4">
            <li>Atomicity（原子性）</li>
            <li>Consistency（一貫性）</li>
            <li>Isolation（独立性）</li>
            <li>Durability（永続性）</li>
          </ul>
        </li>
        <li className="pb-1">
          <strong>BASE</strong>：主に分散NoSQLデータベースで採用され、可用性とスケーラビリティを重視する特性です。
          <ul className="list-disc pl-4">
            <li>Basically Available（基本的な可用性）</li>
            <li>Soft-state（柔軟な状態）</li>
            <li>Eventually Consistent（結果整合性）</li>
          </ul>
        </li>
      </ul>
      <p>
        適用するシステムの要件に応じて、整合性を重視するACIDと可用性を重視するBASEのどちらが適切かを選択することが重要です。
        例えば、銀行取引のような厳密な整合性が求められるシステムではACIDが適していますが、SNSのタイムラインのような即時性と可用性が重要なシステムではBASEが適しています。
      </p>
    </div>
  );
} 
