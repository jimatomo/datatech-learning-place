import fs from 'fs';
import path from 'path';
import type { LexicalSearchDocument } from './types';

type SearchDocumentInput = Omit<LexicalSearchDocument, 'length'>;

function extractTextFromJsx(content: string): string {
  let text = content.replace(/import\s+.*?from\s+['"][^'"]+['"];?\n?/g, '');
  text = text.replace(/export\s+default\s+function\s+\w+\s*\(\)\s*\{/g, '');
  text = text.replace(/function\s+\w+\s*\(\)\s*\{/g, '');
  text = text.replace(/<\w+\s*\/>/g, '');
  text = text.replace(/<\/?\w+[^>]*>/g, ' ');
  text = text.replace(/\w+={[^}]+}/g, '');
  text = text.replace(/className="[^"]*"/g, '');
  text = text.replace(/[{}\[\]()<>\/\\=;:'"`,]/g, ' ');
  text = text.replace(/\b(const|let|var|return|new|Date|Quiz)\b/g, ' ');
  return text.replace(/\s+/g, ' ').trim();
}

function extractQuizData(filePath: string, fileContent: string): SearchDocumentInput | null {
  const normalizedPath = filePath.replace(/\\/g, '/');
  const pathMatch = normalizedPath.match(/quiz\/(\d{4})\/(\d{2})\/(\d{2})\.tsx$/);
  if (!pathMatch) {
    return null;
  }

  const [, year, month, day] = pathMatch;
  const quizId = `Q${year}${month}${day}`;

  const titleMatch = fileContent.match(/title:\s*["'`]([^"'`]+)["'`]/);
  const title = titleMatch ? titleMatch[1] : `クイズ ${year}/${month}/${day}`;

  const tagsMatch = fileContent.match(/tags:\s*\[([^\]]+)\]/);
  const tags = tagsMatch
    ? tagsMatch[1]
        .split(',')
        .map((tag) => tag.trim().replace(/["'`]/g, ''))
        .filter((tag) => tag.length > 0)
    : [];

  const authorMatch = fileContent.match(/author:\s*["'`]([^"'`]+)["'`]/);
  const author = authorMatch ? authorMatch[1] : '';

  const createdAtMatch = fileContent.match(/created_at:\s*new Date\(["'`]([^"'`]+)["'`]\)/);
  const createdAt = createdAtMatch ? createdAtMatch[1] : `${year}-${month}-${day}`;

  const options: string[] = [];
  const optionsMatch = fileContent.match(/options:\s*\{([^}]+)\}/s);
  if (optionsMatch) {
    for (const match of optionsMatch[1].matchAll(/\d+:\s*["'`]([^"'`]+)["'`]/g)) {
      options.push(match[1]);
    }
  }

  const content = [title, ...tags, extractTextFromJsx(fileContent), ...options].join(' ');

  return {
    id: quizId,
    type: 'quiz',
    title,
    content,
    tags,
    author,
    url: `/quiz/${year}/${month}/${day}`,
    createdAt,
  };
}

function extractTextData(filePath: string, fileContent: string): SearchDocumentInput | null {
  const normalizedPath = filePath.replace(/\\/g, '/');
  const pathMatch = normalizedPath.match(/text\/([^/]+)\/(\d+)\.tsx$/);
  if (!pathMatch) {
    return null;
  }

  const [, category, pageNum] = pathMatch;
  const h1Match = fileContent.match(/<h1[^>]*>([^<]+)<\/h1>/);
  const title = h1Match
    ? h1Match[1].replace(/\{[^}]+\}/g, '').trim()
    : `${category} - ページ${pageNum}`;

  return {
    id: `T_${category}_${pageNum}`,
    type: 'text',
    title,
    content: extractTextFromJsx(fileContent),
    tags: [category],
    author: '',
    url: `/text/${category}/${pageNum}`,
    createdAt: '',
  };
}

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

export function loadSearchDocuments(contentsDir: string): LexicalSearchDocument[] {
  const documents: LexicalSearchDocument[] = [];
  const quizDir = path.join(contentsDir, 'quiz');
  const textDir = path.join(contentsDir, 'text');

  if (fs.existsSync(quizDir)) {
    for (const filePath of getFilesRecursively(quizDir, /^\d{2}\.tsx$/)) {
      const data = extractQuizData(filePath, fs.readFileSync(filePath, 'utf-8'));
      if (data) {
        documents.push({ ...data, length: data.content.length });
      }
    }
  }

  if (fs.existsSync(textDir)) {
    for (const filePath of getFilesRecursively(textDir, /^\d+\.tsx$/)) {
      const data = extractTextData(filePath, fs.readFileSync(filePath, 'utf-8'));
      if (data) {
        documents.push({ ...data, length: data.content.length });
      }
    }
  }

  return documents.sort((a, b) => a.id.localeCompare(b.id));
}
