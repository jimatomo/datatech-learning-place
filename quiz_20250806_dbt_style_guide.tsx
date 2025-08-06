import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Quiz20250806DbtStyleGuide: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: "dbtモデル名について正しいものを選択してください。",
      options: [
        "models.with.dots（ドットを使用）",
        "models_without_dots（アンダースコアを使用）",
        "ModelsWithCamelCase（キャメルケース）",
        "models-with-hyphens（ハイフン使用）"
      ],
      correctAnswer: 1,
      explanation: "dbtモデル名はアンダースコアを使用します。多くのデータプラットフォームでは`database.schema.object`の形式でドットを使用するため、クォートが不要になり、問題のリスクが軽減されます。"
    },
    {
      id: 2,
      question: "dbtモデルのプライマリキーの命名規則として適切なものはどれですか？",
      options: [
        "id",
        "primary_key",
        "<object>_id（例: customer_id）",
        "pk_<object>（例: pk_customer）"
      ],
      correctAnswer: 2,
      explanation: "プライマリキーは`<object>_id`の形式で命名します（例: `account_id`）。これにより、下流の結合モデルでどのIDが参照されているかを理解しやすくなります。"
    },
    {
      id: 3,
      question: "dbtモデルにおけるキーのデータ型として推奨されるものは？",
      options: [
        "INTEGER",
        "STRING",
        "FLOAT",
        "BOOLEAN"
      ],
      correctAnswer: 1,
      explanation: "キーは文字列データ型であるべきです。これにより一貫性が保たれ、様々なデータプラットフォーム間での互換性が向上します。"
    },
    {
      id: 4,
      question: "ブール値のカラム名として適切なプレフィックスはどれですか？",
      options: [
        "flag_またはbool_",
        "is_またはhas_",
        "check_またはvalid_",
        "true_またはfalse_"
      ],
      correctAnswer: 1,
      explanation: "ブール値は`is_`または`has_`でプレフィックスを付けます（例: `is_active`, `has_subscription`）。"
    },
    {
      id: 5,
      question: "タイムスタンプカラムの命名規則として正しいものは？",
      options: [
        "<event>_time（例: created_time）",
        "<event>_timestamp（例: created_timestamp）",
        "<event>_at（例: created_at）",
        "<event>_datetime（例: created_datetime）"
      ],
      correctAnswer: 2,
      explanation: "タイムスタンプカラムは`<event>_at`の形式で命名し（例: `created_at`）、UTCであるべきです。異なるタイムゾーンの場合はサフィックスで示します（例: `created_at_pt`）。"
    },
    {
      id: 6,
      question: "日付カラムの命名規則として正しいものは？",
      options: [
        "<event>_date（例: created_date）",
        "<event>_day（例: created_day）",
        "date_<event>（例: date_created）",
        "<event>_dt（例: created_dt）"
      ],
      correctAnswer: 0,
      explanation: "日付カラムは`<event>_date`の形式で命名します（例: `created_date`）。"
    },
    {
      id: 7,
      question: "価格/収益フィールドの推奨形式は？",
      options: [
        "整数（セント単位）",
        "小数点付き通貨（例: $19.99 → 19.99）",
        "文字列形式",
        "どの形式でも問題ない"
      ],
      correctAnswer: 1,
      explanation: "価格/収益フィールドは小数点付き通貨であるべきです（$19.99の場合19.99）。多くのアプリデータベースではセント単位の整数で保存されますが、非小数点通貨の場合はサフィックスで示します（例: `price_in_cents`）。"
    },
    {
      id: 8,
      question: "カラム名として避けるべきものは？",
      options: [
        "長い名前",
        "予約語（例: order, select）",
        "数字を含む名前",
        "アンダースコアを含む名前"
      ],
      correctAnswer: 1,
      explanation: "データベースの予約語をカラム名として使用することは避けるべきです。これによりクエリエラーや予期しない動作を防げます。"
    },
    {
      id: 9,
      question: "フィールド名の一貫性について正しい説明は？",
      options: [
        "各モデルで独自の命名規則を使用する",
        "モデル間で可能な限り同じフィールド名を使用する",
        "短縮形を積極的に使用する",
        "各開発者が好みの命名規則を使用する"
      ],
      correctAnswer: 1,
      explanation: "一貫性が重要です！可能な限りモデル間で同じフィールド名を使用します。例えば、`customers`テーブルへのキーは`user_id`や`id`ではなく`customer_id`と命名します。"
    },
    {
      id: 10,
      question: "モデル名の形式として推奨されるものは？",
      options: [
        "単数形（例: customer, order）",
        "複数形（例: customers, orders）",
        "どちらでも問題ない",
        "テーブルの内容による"
      ],
      correctAnswer: 1,
      explanation: "モデルは複数形であるべきです（例: `customers`, `orders`, `products`）。これにより、テーブルが複数のレコードを含むことが明確になります。"
    },
    {
      id: 11,
      question: "フィールド名における省略形の使用について正しいものは？",
      options: [
        "省略形を積極的に使用して簡潔にする",
        "省略形や別名は使用せず、読みやすさを重視する",
        "よく知られた省略形のみ使用する",
        "文字数制限がある場合のみ使用する"
      ],
      correctAnswer: 1,
      explanation: "省略形や別名は使用しません。簡潔さよりも読みやすさを重視します。例えば、`customer`に対して`cust`、`orders`に対して`o`は使用しません。"
    },
    {
      id: 12,
      question: "例として示されたモデルでのカラムの推奨順序は？",
      options: [
        "アルファベット順",
        "重要度順",
        "ids → strings → numerics → booleans → dates → timestamps",
        "作成日順"
      ],
      correctAnswer: 2,
      explanation: "一貫したデータ型の順序を使用することを検討し、タイプ別にカラムをグループ化・ラベル付けします。推奨順序は：ids、strings、numerics、booleans、dates、timestampsです。"
    },
    {
      id: 13,
      question: "フィールド命名における優先事項は？",
      options: [
        "ソースデータベースの用語を使用",
        "ビジネス用語を使用",
        "技術的な用語を使用",
        "最も短い用語を使用"
      ],
      correctAnswer: 1,
      explanation: "ソース用語ではなく、ビジネス用語に基づいた名前を使用します。例えば、ソースデータベースで`user_id`を使用していても、ビジネスで`customer_id`と呼んでいる場合は、モデルでは`customer_id`を使用します。"
    },
    {
      id: 14,
      question: "モデルのバージョンを示すための一貫したサフィックスは？",
      options: [
        "_version1, _version2",
        "_ver1, _ver2",
        "_v1, _v2",
        "_1, _2"
      ],
      correctAnswer: 2,
      explanation: "モデルのバージョンには一貫性のために`_v1`、`_v2`などのサフィックスを使用します（例: `customers_v1`、`customers_v2`）。"
    },
    {
      id: 15,
      question: "スネークケース（snake_case）を使用すべき対象は？",
      options: [
        "カラム名のみ",
        "テーブル名のみ",
        "スキーマ、テーブル、カラム名すべて",
        "ファイル名のみ"
      ],
      correctAnswer: 2,
      explanation: "スキーマ、テーブル、カラム名はすべてスネークケース（snake_case）であるべきです。"
    }
  ];

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = selectedOption;
      setSelectedAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(selectedAnswers[currentQuestion - 1] ?? null);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setSelectedOption(null);
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getScoreLevel = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 87) return { level: "優秀", description: "dbtスタイルガイドを十分理解しています", color: "text-green-600" };
    if (percentage >= 67) return { level: "良好", description: "基本的な理解はありますが、細部の確認が必要です", color: "text-blue-600" };
    if (percentage >= 47) return { level: "要復習", description: "スタイルガイドの再学習をお勧めします", color: "text-yellow-600" };
    return { level: "要基礎学習", description: "基本から学習し直すことをお勧めします", color: "text-red-600" };
  };

  if (showResults) {
    const score = calculateScore();
    const scoreLevel = getScoreLevel(score);
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            dbtスタイルガイド クイズ結果
          </h1>
          <p className="text-gray-600">2025年8月6日</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">採点結果</h2>
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {score} / {questions.length}
            </div>
            <div className="text-xl text-gray-600">
              正答率: {percentage}%
            </div>
          </div>
          <div className={`text-center ${scoreLevel.color}`}>
            <div className="text-xl font-semibold">{scoreLevel.level}</div>
            <div className="text-sm">{scoreLevel.description}</div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">詳細結果</h3>
          {questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            return (
              <div key={question.id} className="mb-4 p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-800 flex-1">
                    問題{question.id}: {question.question}
                  </h4>
                  <span className={`ml-2 px-2 py-1 rounded text-sm font-semibold ${
                    isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isCorrect ? '正解' : '不正解'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  あなたの回答: {question.options[userAnswer]}
                </div>
                {!isCorrect && (
                  <div className="text-sm text-green-600 mb-2">
                    正解: {question.options[question.correctAnswer]}
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  解説: {question.explanation}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={handleRestart}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            もう一度挑戦する
          </button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">参考資料</h3>
          <ul className="text-sm text-blue-600">
            <li>
              <a href="https://docs.getdbt.com/best-practices/how-we-style/1-how-we-style-our-dbt-models" 
                 className="hover:underline" target="_blank" rel="noopener noreferrer">
                dbt Labs - How we style our dbt models
              </a>
            </li>
            <li>
              <a href="https://docs.getdbt.com/best-practices/how-we-style/0-how-we-style-our-dbt-projects" 
                 className="hover:underline" target="_blank" rel="noopener noreferrer">
                dbt Labs - How we style our dbt projects
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          dbtスタイルガイド クイズ
        </h1>
        <p className="text-gray-600 mb-4">2025年8月6日</p>
        <p className="text-sm text-gray-500">
          参考資料: <a href="https://docs.getdbt.com/best-practices/how-we-style/1-how-we-style-our-dbt-models" 
                      className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            dbt Labs Style Guide
          </a>
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            問題 {currentQuestion + 1} / {questions.length}
          </span>
          <div className="w-64 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            問題{question.id}: {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedOption === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={index}
                  checked={selectedOption === index}
                  onChange={() => handleOptionSelect(index)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  selectedOption === index ? 'border-blue-500' : 'border-gray-300'
                }`}>
                  {selectedOption === index && (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  )}
                </div>
                <span className="text-gray-700">
                  {String.fromCharCode(65 + index)}. {option}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentQuestion === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            前の問題
          </button>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedOption === null
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {currentQuestion === questions.length - 1 ? '結果を見る' : '次の問題'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz20250806DbtStyleGuide;