import { Skeleton } from "@/components/ui/skeleton"

interface QuizOptionsSkeletonProps {
  count: number
}

export function QuizOptionsSkeleton({ count }: QuizOptionsSkeletonProps) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xl" aria-busy="true" aria-label="選択肢を読み込み中">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 h-auto p-3 w-full border rounded-md shadow-md"
        >
          <Skeleton className="size-4 shrink-0 rounded-sm" />
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  )
}
