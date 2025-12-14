/**
 * 検索インデックス生成スクリプト
 * 
 * クイズとテキストコンテンツからOramaインデックスを生成する
 * 
 * 使用方法: npm run build:search-index
 */

import fs from 'fs';
import path from 'path';
import { create, insertMultiple, save } from '@orama/orama';
import { getTokenizer } from '../lib/search/tokenizer';
import { generateEmbeddings, getEmbeddingDimension } from '../lib/search/embedder';

// インデックスに格納するドキュメントの型
interface SearchDocument {
  id: string;
  type: 'quiz' | 'text';
  title: string;
  content: string;
  tags: string[];
  author: string;
  url: string;
  createdAt: string;
  embedding: number[];
}

// クイズファイルからメタデータとコンテンツを抽出
function extractQuizData(filePath: string, fileContent: string): Omit<SearchDocument, 'embedding'> | null {
  try {
    // クイズIDを抽出（ファイルパスから）
    const pathMatch = filePath.match(/quiz\/(\d{4})\/(\d{2})\/(\d{2})\.tsx$/);
    if (!pathMatch) return null;

    const [, year, month, day] = pathMatch;
    const quizId = `Q${year}${month}${day}`;
    const url = `/quiz/${year}/${month}/${day}`;

    // タイトルを抽出
    const titleMatch = fileContent.match(/title:\s*["'`]([^"'`]+)["'`]/);
    const title = titleMatch ? titleMatch[1] : `クイズ ${year}/${month}/${day}`;

    // タグを抽出
    const tagsMatch = fileContent.match(/tags:\s*\[([^\]]+)\]/);
    let tags: string[] = [];
    if (tagsMatch) {
      tags = tagsMatch[1]
        .split(',')
        .map(tag => tag.trim().replace(/["'`]/g, ''))
        .filter(tag => tag.length > 0);
    }

    // 作成者を抽出
    const authorMatch = fileContent.match(/author:\s*["'`]([^"'`]+)["'`]/);
    const author = authorMatch ? authorMatch[1] : '';

    // 作成日を抽出
    const createdAtMatch = fileContent.match(/created_at:\s*new Date\(["'`]([^"'`]+)["'`]\)/);
    const createdAt = createdAtMatch ? createdAtMatch[1] : `${year}-${month}-${day}`;

    // 選択肢を抽出
    const optionsMatch = fileContent.match(/options:\s*\{([^}]+)\}/s);
    let options: string[] = [];
    if (optionsMatch) {
      const optionsContent = optionsMatch[1];
      const optionMatches = optionsContent.matchAll(/\d+:\s*["'`]([^"'`]+)["'`]/g);
      for (const match of optionMatches) {
        options.push(match[1]);
      }
    }

    // JSXコンポーネントからテキストを抽出
    const content = extractTextFromJsx(fileContent);

    // コンテンツを結合
    const fullContent = [
      title,
      ...tags,
      content,
      ...options,
    ].join(' ');

    return {
      id: quizId,
      type: 'quiz',
      title,
      content: fullContent,
      tags,
      author,
      url,
      createdAt,
    };
  } catch (error) {
    console.error(`Error extracting quiz data from ${filePath}:`, error);
    return null;
  }
}

// テキストファイルからメタデータとコンテンツを抽出
function extractTextData(filePath: string, fileContent: string): Omit<SearchDocument, 'embedding'> | null {
  try {
    // パスからIDを生成
    const pathMatch = filePath.match(/text\/([^/]+)\/(\d+)\.tsx$/);
    if (!pathMatch) return null;

    const [, category, pageNum] = pathMatch;
    const textId = `T_${category}_${pageNum}`;
    const url = `/text/${category}/${pageNum}`;

    // タイトルを抽出（h1タグまたはページ名から）
    let title = `${category} - ページ${pageNum}`;
    const h1Match = fileContent.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (h1Match) {
      title = h1Match[1].replace(/\{[^}]+\}/g, '').trim();
    }

    // JSXからテキストを抽出
    const content = extractTextFromJsx(fileContent);

    return {
      id: textId,
      type: 'text',
      title,
      content,
      tags: [category],
      author: '',
      url,
      createdAt: '',
    };
  } catch (error) {
    console.error(`Error extracting text data from ${filePath}:`, error);
    return null;
  }
}

// JSXからテキストを抽出（HTMLタグとJSX構文を除去）
function extractTextFromJsx(content: string): string {
  // import文を除去
  let text = content.replace(/import\s+.*?from\s+['"][^'"]+['"];?\n?/g, '');
  
  // export defaultやfunction宣言を除去
  text = text.replace(/export\s+default\s+function\s+\w+\s*\(\)\s*\{/g, '');
  text = text.replace(/function\s+\w+\s*\(\)\s*\{/g, '');
  
  // JSXコンポーネント呼び出しを除去
  text = text.replace(/<\w+\s*\/>/g, '');
  text = text.replace(/<\/?\w+[^>]*>/g, ' ');
  
  // JSX属性を除去
  text = text.replace(/\w+={[^}]+}/g, '');
  text = text.replace(/className="[^"]*"/g, '');
  
  // コード記号を除去
  text = text.replace(/[{}\[\]()<>\/\\=;:'"`,]/g, ' ');
  
  // constやletなどの宣言を除去
  text = text.replace(/\b(const|let|var|return|new|Date|Quiz)\b/g, ' ');
  
  // 複数の空白を1つに
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

// ファイルを再帰的に取得
function getFilesRecursively(dir: string, pattern: RegExp): string[] {
  const files: string[] = [];
  
  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && pattern.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }
  
  walk(dir);
  return files;
}

async function main() {
  console.log('🔍 検索インデックス生成を開始します...\n');

  const rootDir = process.cwd();
  const contentsDir = path.join(rootDir, 'contents');
  const outputPath = path.join(rootDir, 'data', 'search-index.json');

  // 出力ディレクトリを作成
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // kuromojiトークナイザーを初期化
  console.log('📚 形態素解析器を初期化中...');
  await getTokenizer();
  console.log('✅ 形態素解析器の初期化完了\n');

  const documents: Omit<SearchDocument, 'embedding'>[] = [];

  // クイズファイルを処理
  console.log('📝 クイズファイルを処理中...');
  const quizDir = path.join(contentsDir, 'quiz');
  const quizFiles = getFilesRecursively(quizDir, /^\d{2}\.tsx$/);
  
  for (const filePath of quizFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = extractQuizData(filePath, content);
    if (data) {
      documents.push(data);
    }
  }
  console.log(`✅ ${documents.length}件のクイズを処理しました\n`);

  // テキストファイルを処理
  console.log('📖 テキストファイルを処理中...');
  const textDir = path.join(contentsDir, 'text');
  if (fs.existsSync(textDir)) {
    const textFiles = getFilesRecursively(textDir, /^\d{2}\.tsx$/);
    const textStartCount = documents.length;
    
    for (const filePath of textFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = extractTextData(filePath, content);
      if (data) {
        documents.push(data);
      }
    }
    console.log(`✅ ${documents.length - textStartCount}件のテキストを処理しました\n`);
  }

  console.log(`📊 合計: ${documents.length}件のドキュメント\n`);

  // Embeddingを生成
  console.log('🧠 Embeddingを生成中...');
  const contents = documents.map(doc => doc.content);
  const embeddings = await generateEmbeddings(contents);
  console.log('✅ Embedding生成完了\n');

  // ドキュメントにembeddingを追加
  const documentsWithEmbedding: SearchDocument[] = documents.map((doc, i) => ({
    ...doc,
    embedding: embeddings[i],
  }));

  // Oramaインデックスを作成
  console.log('🏗️ 検索インデックスを構築中...');
  const db = await create({
    schema: {
      id: 'string',
      type: 'string',
      title: 'string',
      content: 'string',
      tags: 'string[]',
      author: 'string',
      url: 'string',
      createdAt: 'string',
      embedding: `vector[${getEmbeddingDimension()}]`,
    },
  });

  // ドキュメントを挿入
  await insertMultiple(db, documentsWithEmbedding);
  console.log('✅ インデックス構築完了\n');

  // インデックスを保存
  console.log('💾 インデックスを保存中...');
  const serialized = await save(db);
  fs.writeFileSync(outputPath, JSON.stringify(serialized));
  
  const fileSizeKB = (fs.statSync(outputPath).size / 1024).toFixed(2);
  console.log(`✅ インデックスを保存しました: ${outputPath} (${fileSizeKB} KB)\n`);

  console.log('🎉 検索インデックス生成が完了しました！');
}

main().catch((error) => {
  console.error('エラーが発生しました:', error);
  process.exit(1);
});

