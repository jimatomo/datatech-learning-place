import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Exchange", "XML", "JSON", "API Integration", "Data Format"],
    created_at: new Date("2025-07-05"),
    updated_at: new Date("2025-07-05"),

    // ----- quiz -----
    title: "アプリケーション間のデータ連携におけるXMLとJSONフォーマットの理解",
    question_jsx: <QuizQuestion />,
    options: {
      0: "XMLはマークアップ言語としてタグベースの構造化データを表現し、スキーマ検証（XSD）や名前空間をサポートして複雑なデータ構造の定義が可能である。",
      1: "JSONはJavaScriptオブジェクト記法をベースとした軽量なデータ交換フォーマットで、REST APIやWebアプリケーション間の通信で広く使用されている。",
      2: "XMLはスキーマ定義により厳密なデータ検証が可能で、複雑なドキュメント構造や企業システム間の厳格なデータ交換に適している。",
      3: "JSONはXMLと比較して常に優れた選択肢であり、現在ではXMLを使用する技術的な理由は存在しない。",
      4: "XMLは属性を持たないため、データの詳細な構造化表現ができず、JSONの方が柔軟なデータ表現が可能である。",
    },
    answers: [3, 4],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "XML 1.0 (Fifth Edition) - W3C Recommendation", url: "https://www.w3.org/TR/xml/" },
      { title: "The JSON Data Interchange Syntax - ECMA-404", url: "https://www.ecma-international.org/publications-and-standards/standards/ecma-404/" },
      { title: "XML Schema Definition Language (XSD) 1.1 - W3C Recommendation", url: "https://www.w3.org/TR/xmlschema11-1/" },
      { title: "RESTful Web Services - JSON vs XML", url: "https://restfulapi.net/json-vs-xml/" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        アプリケーション間のデータ連携において、XMLとJSONのデータ交換フォーマットに関する説明で、
        <span className="text-red-500">間違っているもの</span>をすべて選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        この問題では、XMLとJSONの特徴と使用場面について理解することを目的としています。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong>「XMLはマークアップ言語としてタグベースの構造化データを表現し、スキーマ検証（XSD）や名前空間をサポートして複雑なデータ構造の定義が可能である。」：</strong>
          これは<strong className="text-emerald-500">正しい</strong>記載です。XMLは&lt;tag&gt;要素&lt;/tag&gt;のようなタグベースの構造を持ち、
          XSD（XML Schema Definition）によるスキーマ検証、名前空間による要素の階層化、
          複雑なデータ型の定義が可能です。これにより、厳密なデータ構造の定義と検証が実現できます。
        </li>
        <li className="py-2">
          <strong>「JSONはJavaScriptオブジェクト記法をベースとした軽量なデータ交換フォーマットで、REST APIやWebアプリケーション間の通信で広く使用されている。」：</strong>
          これは<strong className="text-emerald-500">正しい</strong>記載です。JSONはJavaScriptオブジェクト記法を基盤とした軽量でシンプルなフォーマットで、
          XMLと比較してデータサイズが小さく、パースが高速です。現在のWeb開発において、
          REST APIの標準的なレスポンスフォーマットとして広く採用されています。
        </li>
        <li>
          <strong>「XMLはスキーマ定義により厳密なデータ検証が可能で、複雑なドキュメント構造や企業システム間の厳格なデータ交換に適している。」：</strong>
          これは<strong className="text-emerald-500">正しい</strong>記載です。XMLはXSDやDTD（Document Type Definition）を使用した
          スキーマ定義により、データの構造と制約を厳密に定義できます。これにより、
          金融システムや医療システムなど、データの正確性が重要な企業システム間の
          データ交換において信頼性を確保できます。
        </li>
        <li className="py-2">
          <strong>「JSONはXMLと比較して常に優れた選択肢であり、現在ではXMLを使用する技術的な理由は存在しない。」：</strong>
          これは<strong className="text-red-500">間違った</strong>記載です。JSONは軽量で扱いやすいですが、XMLが必要な場面は多数存在します。
          例えば、複雑なスキーマ検証が必要な場合、コメントやプロセッシング命令が必要な場合、
          既存のXMLベースのシステムとの互換性が必要な場合（SOAP、RSS、XHTML）、
          名前空間による階層化が必要な場合などです。用途に応じて適切なフォーマットを選択すべきです。
        </li>
        <li>
          <strong>「XMLは属性を持たないため、データの詳細な構造化表現ができず、JSONの方が柔軟なデータ表現が可能である。」：</strong>
          これは<strong className="text-red-500">間違った</strong>記載です。XMLは属性（attribute）を持つことができ、
          例えば&lt;person id=&quot;123&quot; type=&quot;customer&quot;&gt;山田太郎&lt;/person&gt;のように
          要素に追加の情報を付与できます。XMLは要素、属性、テキストコンテンツ、
          名前空間などの組み合わせにより、非常に柔軟で詳細なデータ構造を表現できます。
        </li>
      </ul>
      <p className="pt-4">
        <strong>実践的なポイント：</strong>
        XMLとJSONはそれぞれ異なる強みを持つため、用途に応じて適切に選択することが重要です。
        軽量で簡潔なデータ交換にはJSON、厳密なスキーマ検証や複雑なドキュメント構造が必要な場合はXMLを選択し、
        システム間の相互運用性を確保しましょう。
      </p>
    </div>
  );
}