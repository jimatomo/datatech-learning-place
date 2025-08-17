import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Master Data Mgmt", "Data Governance", "Data Management"],
    created_at: new Date("2025-08-23"),
    updated_at: new Date("2025-08-23"),

    // ----- quiz -----
    title: "マスターデータ管理におけるID管理戦略",
    question_jsx: <QuizQuestion />,
    options: {
      0: "グローバルIDは、全社で一意な識別子としてマスターデータに付与され、データ統合のハブとなる。これにより、システム横断でのデータ追跡と分析が可能になる。",
      1: "相互参照（X-Ref）情報は、各ソースシステムのローカルIDとグローバルIDをマッピングするために使用される。これにより、ソースシステム側での改修を最小限に抑えつつ、マスターデータとの連携を実現する。",
      2: "グローバルIDは一度発行されたら絶対に変更せず、ソースシステムのIDは不要になるため、X-Ref情報はマスターデータ統合後は破棄してよい。また、全てのデータソースは直ちにグローバルIDを使用するようにシステムを改修すべきである。",
      3: "ID管理のライフサイクル（生成、維持、廃止）を定義し、データガバナンスプロセスに組み込むことが重要である。特に名寄せやマージ処理が発生した際には、グローバルIDとX-Ref情報の両方を整合性を保ちながら更新する必要がある。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "データマネジメント知識体系ガイド 第二版", url: "https://www.amazon.co.jp/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E7%9F%A5%E8%AD%98%E4%BD%93%E7%B3%BB%E3%82%AC%E3%82%A4%E3%83%89-%E7%AC%AC%E4%BA%8C%E7%89%88-DAMA-International/dp/4296100491" },
      { title: "Master data management - Wikipedia", url: "https://en.wikipedia.org/wiki/Master_data_management" },
      { title: "今こそ実践する「MDM」、その本質と成功のポイントを明かす | informatica", url: "https://www.seminar-reg.jp/jdmc/dm2016/pdf3h7euip/pdf/A-2.pdf" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        マスターデータ管理（MDM）において、複数のデータソースから集約したエンティティ（顧客、商品など）を一意に識別するためのID管理戦略に関する記述として、<strong className="text-red-600">最も不適切なもの</strong>を
        <strong>選択</strong>してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <div className="rounded-lg p-4 my-4 bg-gray-300 dark:bg-gray-800">
        <h4 className="font-semibold mb-2">用語説明</h4>
        <ul className="text-xs space-y-1">
          <li><strong>グローバルID:</strong> MDMシステムが付与する、組織全体で一意となる識別子。</li>
          <li><strong>相互参照（X-Ref）情報:</strong> ソースシステム固有のID（ローカルID）とグローバルIDの対応関係を管理する情報。</li>
        </ul>
      </div>
      <p className="py-2 font-semibold text-red-600">正解の解説（不適切な選択肢）：</p>
      
      <div className="mb-4">
        <p className="font-semibold text-red-500">「グローバルIDは一度発行されたら絶対に変更せず、ソースシステムのIDは不要になるため、X-Ref情報はマスターデータ統合後は破棄してよい。また、全てのデータソースは直ちにグローバルIDを使用するようにシステムを改修すべきである。」❌ 正解（不適切な記述）：</p>
        <p>
          これはMDMの実運用において非現実的かつリスクの高いアプローチです。X-Ref情報は、ソースシステムとマスターデータの連携を維持し、データのトレーサビリティを確保するために不可欠であり、破棄してはなりません。また、全ての既存システムを直ちにグローバルID対応に改修することは、コストや技術的な制約から極めて困難です。MDMは通常、既存システムと共存しながら段階的に導入されます。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-green-600">「グローバルIDは、全社で一意な識別子としてマスターデータに付与され、データ統合のハブとなる。これにより、システム横断でのデータ追跡と分析が可能になる。」✅ 正しい記述：</p>
        <p>
          グローバルIDの最も重要な役割を正確に説明しています。各システムに散在する同一エンティティをグローバルIDによって紐付けることで、「シングルビュー」（顧客360°など）を実現し、データ活用の基盤を構築します。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-green-600">「相互参照（X-Ref）情報は、各ソースシステムのローカルIDとグローバルIDをマッピングするために使用される。これにより、ソースシステム側での改修を最小限に抑えつつ、マスターデータとの連携を実現する。」✅ 正しい記述：</p>
        <p>
          X-Refは、MDM導入における現実的なアプローチの要です。既存のアプリケーションは引き続きローカルIDを使い続け、MDMハブがX-Ref情報を介してローカルIDとグローバルIDの翻訳を行うことで、システム間のシームレスなデータ連携を可能にします。
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-green-600">「ID管理のライフサイクル（生成、維持、廃止）を定義し、データガバナンスプロセスに組み込むことが重要である。特に名寄せやマージ処理が発生した際には、グローバルIDとX-Ref情報の両方を整合性を保ちながら更新する必要がある。」✅ 正しい記述：</p>
        <p>
          これは持続可能なID管理に不可欠な要素です。例えば、重複した顧客レコードがマージされる場合、一方のグローバルIDを廃止し、もう一方に統合すると同時に、関連する全てのX-Ref情報も適切に更新するプロセスが必要です。こうしたライフサイクル管理を怠ると、データ品質が徐々に劣化していきます。
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 dark:border-blue-400 p-4 mt-4">
        <p>
          <strong>🎯 ID管理のベストプラクティス：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-blue-700 dark:text-blue-300">
          <li><strong>非意味的なIDの採用：</strong> 業務的な意味を持たないUUIDなどをグローバルIDに採用し、組織変更などへの耐性を高める。</li>
          <li><strong>ライフサイクル管理：</strong> エンティティのマージ、分割、廃止といったイベントに対応できるプロセスを確立する。</li>
          <li><strong>X-Refの維持：</strong> ソースシステムとの連携とデータ来歴（リネージュ）追跡のため、X-Ref情報を永続的に管理する。</li>
          <li><strong>段階的な導入：</strong> 全システムの一斉改修ではなく、X-Refを活用して既存システムと共存しながら段階的に適用範囲を広げる。</li>
        </ul>
      </div>
    </div>
  );
}