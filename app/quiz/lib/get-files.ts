import fs from 'fs/promises'
import path from 'path'

export async function getAllQuizFiles(
  dir: string,
  base_dir?: string,
): Promise<string[]> {
  try {
    // 初回呼び出し時のbaseDirを設定
    const actual_base_dir = base_dir || dir;
    
    // ディレクトリが存在するか確認
    const dirExists = await fs.access(dir).then(() => true).catch(() => false);
    if (!dirExists) {
      console.error(`Directory does not exist: ${dir}`);
      return [];
    }

    const files = await fs.readdir(dir, { withFileTypes: true });
    const quizFiles: string[] = [];

    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      try {
        if (file.isDirectory()) {
          // サブディレクトリの探索時にbaseDirを引き継ぐ
          const subFiles = await getAllQuizFiles(fullPath, actual_base_dir);
          quizFiles.push(...subFiles);
        } else if (file.name.endsWith('.tsx')) {
          // ファイルが読み取り可能か確認
          await fs.access(fullPath, fs.constants.R_OK);
          // 拡張子を除いた相対パスを計算
          const relativePath = path.relative(actual_base_dir, fullPath);
          const pathWithoutExt = path.join(path.dirname(relativePath), path.parse(relativePath).name);
          quizFiles.push(pathWithoutExt);
        }
      } catch (subError) {
        console.error(`Error processing file ${fullPath}:`, subError);
        // 個別のファイルエラーでも処理を継続
        continue;
      }
    }

    // ファイル名を昇順にソート
    quizFiles.sort((a, b) => a.localeCompare(b));

    return quizFiles;
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
} 
