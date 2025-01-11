export interface PathInfo {
  path: string;
  is_endpoint: boolean;
  title: string;
  tags: string[];
  created_at: Date | null;
  updated_at: Date | null;
  author: string | null;
}

export async function getPathInfos(
  files: string[],
  id: string[] = [],
  find_full_path: boolean = false
) {
  return await Promise.all(files.map(async (file) => {
    let path = '';
    let title = '';
    let tags: string[] = [];
    let created_at: Date | null = null;
    let updated_at: Date | null = null;
    let author: string | null = null;
    let is_endpoint = false;

    if (find_full_path) {
      path = file;
      is_endpoint = true;
    } else {
      path = file.split('/')[0];
      is_endpoint = !file.includes('/');
    }


    if (is_endpoint) {
      try {
        const quizModule = await import(`@/contents/quiz/${[...id, file].join('/')}.tsx`);
        const quiz = quizModule.default();
        title = quiz.getTitle();
        tags = quiz.getTags();
        created_at = quiz.getCreatedAt();
        updated_at = quiz.getUpdatedAt();
        author = quiz.getAuthor();
      } catch (error) {
        console.error(`Failed to load quiz for ${file}:`, error);
      }
    }
    
    return {
      path,
      is_endpoint,
      title,
      tags,
      created_at,
      updated_at,
      author,
    };
  }));
}
