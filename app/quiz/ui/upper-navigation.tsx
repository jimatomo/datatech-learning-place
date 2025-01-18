import Link from 'next/link'

export function UpperNavigation({ folderId }: { folderId: string } ) {
  const parent_path = typeof folderId === 'string' 
    ? `/${folderId.split('/').slice(0, -1).join('/')}` 
    : '/'

  return (
    <div className="p-2">
      <Link 
        href={`/quiz/${parent_path}`}
        className="px-4 py-2 rounded-md inline-flex items-center
          hover:bg-secondary bg-secondary/60"
      >
        上へ戻る
      </Link>
    </div>
  );
}
