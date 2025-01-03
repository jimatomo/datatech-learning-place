export async function getPathInfos(
  files: string[],
  id: string[] = [],
  find_full_path: boolean = false
) {
  return await Promise.all(files.map(async (file) => {
    let path = '';
    let title = '';
    let tags: string[] = [];
    let createdAt: Date | null = null;
    let updatedAt: Date | null = null;
    let author: string | null = null;
    let isEndpoint = false;

    if (find_full_path) {
      path = file;
      isEndpoint = true;
    } else {
      path = file.split('/')[0];
      isEndpoint = !file.includes('/');
    }


    if (isEndpoint) {
      try {
        const quizModule = await import(`@/contents/quiz/${[...id, file].join('/')}.tsx`);
        const quiz = quizModule.default();
        title = quiz.getTitle();
        tags = quiz.getTags();
        createdAt = quiz.getCreatedAt();
        updatedAt = quiz.getUpdatedAt();
        author = quiz.getAuthor();
      } catch (error) {
        console.error(`Failed to load quiz for ${file}:`, error);
      }
    }
    
    return {
      path,
      isEndpoint,
      title,
      tags,
      createdAt,
      updatedAt,
      author,
    };
  }));
}
