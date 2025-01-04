interface QuizParams {
  id: string; // クイズのID
  file_path: string; // クイズのファイルパス
  title: string; // クイズのタイトル
  question?: string; // クイズの問題（ただの文字列で問題ない場合はこちら）
  question_jsx?: React.ReactNode; // クイズの問題（Reactコンポーネントを使用している場合はこちら）
  options: { [key: number]: string }; // クイズの選択肢（キー：選択肢の番号、値：選択肢の内容）
  answers: number[]; // クイズの正解（optionsのキー番号を指定）
  explanation?: string; // クイズの解説
  explanation_jsx?: React.ReactNode; // クイズの解説（Reactコンポーネントを使用している場合はこちら）
  references: { title: string; url: string }[]; // クイズの参考文献のURL
  tags: string[]; // クイズのタグ
  created_at: Date; // クイズの作成日
  updated_at: Date; // クイズの更新日
  author: string; // クイズの作成者（更新者）
  author_url?: string; // クイズの作成者のURL [optional]
  previous_quiz_id?: string; // 前の問題のID [optional]
  next_quiz_id?: string; // 次の問題のID [optional]
}

export class Quiz {
  private readonly params: QuizParams;

  constructor(params: QuizParams) {
    this.params = params;
  }

  // クイズコンテンツ全体を取得する getter
  getQuiz(): QuizParams {
    return this.params;
  }

  // 個別の要素を取得する getter
  getId = () => this.params.id;
  getFilePath = () => this.params.file_path;
  getTitle = () => this.params.title;
  getQuestion = () => this.params.question;
  getQuestionJsx = () => this.params.question_jsx;
  getExplanation = () => this.params.explanation;
  getExplanationJsx = () => this.params.explanation_jsx;
  getOptions = () => this.params.options;
  getAnswers = () => this.params.answers;
  getReferences = () => this.params.references;
  getTags = () => this.params.tags;
  getCreatedAt = () => this.params.created_at;
  getUpdatedAt = () => this.params.updated_at;
  getAuthor = () => this.params.author;
  getAuthorUrl = () => this.params.author_url || ''; // undefinedの場合は空文字を返す
  getPreviousQuizId = () => this.params.previous_quiz_id || '#'; // undefinedの場合は#を返す
  getNextQuizId = () => this.params.next_quiz_id || '#'; // undefinedの場合は#を返す
}

export const generateQuizId = (fileUrl: string): string => {
  // URLまたはファイルパスからクイズIDを抽出
  const match = fileUrl.match(/quiz\/(\d{4}\/\d{2}\/\d{2})/);
  if (!match) throw new Error('Invalid quiz file path');
  
  return `Q${match[1].replace(/\//g, "")}`;
};

export const transformQuizIdToUrl = (id: string): string => {
  // クイズIDをURLに変換
  const match = id.match(/Q?(\d{4})(\d{2})(\d{2})/);
  
  // マッチしない場合は元の値をそのまま返す
  if (!match) {
    return id;
  }
  
  return `/quiz/${match[1]}/${match[2]}/${match[3]}`;
};

export const generateFilePath = (file_path: string): string => {
  return 'contents' + transformQuizIdToUrl(generateQuizId(file_path)) + '.tsx';
};
