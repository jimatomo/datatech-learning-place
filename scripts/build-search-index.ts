import fs from 'fs';
import path from 'path';
import { buildLexicalSearchIndex } from '../lib/search-lite/index-builder';
import { loadSearchDocuments } from '../lib/search-lite/documents';

function main() {
  console.log('軽量検索インデックス生成を開始します...');

  const rootDir = process.cwd();
  const contentsDir = path.join(rootDir, 'contents');
  const outputPath = path.join(rootDir, 'data', 'lexical-search-index.json');

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const documents = loadSearchDocuments(contentsDir);
  console.log(`${documents.length}件のドキュメントを抽出しました`);

  const index = buildLexicalSearchIndex(documents);
  fs.writeFileSync(outputPath, JSON.stringify(index));

  const fileSizeKB = (fs.statSync(outputPath).size / 1024).toFixed(2);
  console.log(`インデックスを保存しました: ${outputPath} (${fileSizeKB} KB)`);
}

main();
