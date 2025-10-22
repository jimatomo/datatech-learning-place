import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Integration", "Data Architecture", "Data Quality", "Data Management"],
    created_at: new Date("2025-10-18"),
    updated_at: new Date("2025-10-19"),

    // ----- quiz -----
    title: "履歴取り込みと3つのDWH手法（Inmon/Kimball/Data Vault）",
    question_jsx: <QuizQuestion />,
    options: {
      0: "インモン流では全データを単一のエンタープライズDWHレイヤーに格納する。ここはクレンジング・標準化・ガバナンス済みの詳細データを保持し、共通の統合レイヤーと変換レイヤーを持つことで配信方式に依らず再利用できる。ただし企業全体のデータモデルが前提となる。検証後はスター型のデータマート経由で多様な利用者が参照する。",
      1: "キンボール流ではクレンジング・標準化・統制済みデータを部門別のデータマートとして構成し、マートは詳細レベルの履歴を保存する。適合ディメンションと適合ファクトを共有することで企業横断の一貫した情報提供を行う。",
      2: "データボルトでは中間プロセスの一部としてクレンジングと標準化を行い、履歴を正規化された最小明細構造で保持する。ビジネスキーとサロゲートキーの関係を厳密に保全することが中核で、下流のデータマートではディメンションにサロゲートキーや代替キー等を定義できる。ボルトに履歴があるため、後から異なる粒度のデータが来てもファクトの再取り込みが可能で、プレゼンテーション層を仮想化して迅速な配信を共同開発できる。",
      3: "履歴取り込みはスケジュールに沿って定期的に実行し、既に正常に取り込まれたデータにも繰り返し適用する。一方で継続的更新は通常一度だけ実行する。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Data warehouse", url: "https://en.wikipedia.org/wiki/Data_warehouse" },
      { title: "Dimensional modeling", url: "https://en.wikipedia.org/wiki/Dimensional_modeling" },
      { title: "Bill Inmon", url: "https://en.wikipedia.org/wiki/Bill_Inmon" },
      { title: "Ralph Kimball", url: "https://en.wikipedia.org/wiki/Ralph_Kimball" },
      { title: "Data vault modeling", url: "https://en.wikipedia.org/wiki/Data_vault_modeling" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        データウェアハウジングの主要なデータ統合プロセスの一つである
        <strong>履歴取り込み</strong>と、Inmon／Kimball／Data Vault の各アプローチに関する次の記述のうち、
        <strong className="text-red-600">誤っているもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          履歴取り込みは通常<strong>一度だけ</strong>実行し、データに問題があれば<strong>問題解決を挟みつつ複数回</strong>実行されます。
          <strong>いったん正常に取り込まれた履歴</strong>については再実行しません。継続的更新は倉庫内データの最新化のため
          スケジュールに沿って定期的に実行されます。
        </li>
        <li>
          インモン: すべてのデータを単一のEDWレイヤーに格納し、クレンジング・標準化・ガバナンス済みの詳細データを保持。
          共通の統合レイヤーと変換レイヤーにより配信方式に依らず再利用できるが、企業データモデルの整備が前提となる。
          検証済みデータはスター型の構造化データマート経由でエンドユーザーが利用する。
        </li>
        <li>
          キンボール: クレンジング・標準化・統制済みデータを<strong>部門別データマート</strong>として構成し、
          マートは<strong>詳細レベルの履歴</strong>を保持。<strong>適合ディメンション</strong>と<strong>適合ファクト</strong>により企業横断の情報提供を可能にする。
        </li>
        <li>
          データボルト: 中間プロセスでクレンジングと標準化を行い、履歴を<strong>正規化された最小明細</strong>で格納。
          ビジネスキーとサロゲートキーの関係を厳密に保全することが中核で、これがデータマートにおける履歴の源泉となる。
          下流では必要に応じてディメンションにサロゲートキー/代替キー等を定義し、プレゼンテーション層を仮想化して迅速な配信を共創でき、
          最終的にスター型のデータマートとして実体化も可能。
        </li>
      </ul>

      <p className="font-semibold text-red-500">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          「履歴取り込みはスケジュールに沿って定期的に実行し、正常取り込み済みデータにも繰り返し適用する。
          継続的更新は通常一度だけ実行する。」という説明は逆です。履歴取り込みは原則一度きり（不備時に限り再実行）、
          継続的更新はスケジュールに沿って定期実行して倉庫内データを最新化します。
        </li>
      </ul>
    </div>
  );
}
