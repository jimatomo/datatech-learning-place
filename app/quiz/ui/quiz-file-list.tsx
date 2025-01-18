import Link from 'next/link'
import { Folder, ScrollText, CircleCheckBig, Calendar, User, Heart } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { PathInfo } from '../lib/get-path-info'

interface QuizFileListProps {
  pathInfos: PathInfo[];
  currentPath: string[];
}

export function QuizFileList({ pathInfos, currentPath }: QuizFileListProps) {
  return (
    <div className="flex flex-col items-center w-full mx-auto">
      {pathInfos.map((pathInfo) => (
        <div key={pathInfo.path} className="flex items-center gap-2 my-2 w-full">
          <Link 
            href={`/quiz/${[...currentPath, pathInfo.path].join("/")}`} 
            className="flex items-start gap-2 w-full p-2 rounded-lg
              hover:bg-secondary bg-secondary/60"
          >
            {pathInfo.is_endpoint ? (
              <>
                <div className="flex flex-col gap-1">
                  <ScrollText className="w-5 h-5 flex-shrink-0" />
                  {(pathInfo?.is_correct?.toString() === "true") && (
                    <CircleCheckBig className="mt-1 w-5 h-5 flex-shrink-0 text-emerald-500" />
                  )}
                  {pathInfo?.is_liked && (
                    <Heart className="mt-1 w-5 h-5 flex-shrink-0 text-red-500 fill-red-500" />
                  )}
                </div>
              </>
            ) : (
              <Folder className="w-5 h-5 flex-shrink-0" />
            )}
            {pathInfo.is_endpoint ? (
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-wrap gap-1 max-h-12">
                  <p className="line-clamp-2">{pathInfo.title}</p>
                </div>
                <div className="flex flex-row items-center gap-2 text-xs text-muted-foreground">
                    {pathInfo.created_at && (
                      <div className="flex flex-row items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {pathInfo.created_at.toLocaleDateString('ja-JP', { 
                          year: 'numeric', 
                          month: '2-digit', 
                          day: '2-digit' 
                        }).split('/').join('.')}
                      </div>
                    )}
                    {pathInfo.author && (
                      <div className="flex flex-row items-center">
                        <User className="w-3 h-3 mr-1" />
                        <span>{pathInfo.author}</span>
                      </div>
                    )}
                  </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row flex-wrap justify-end gap-1 max-h-12 pb-1 truncate">
                    {pathInfo.tags && pathInfo.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex-shrink-0 text-xs">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : pathInfo.path}
          </Link>
        </div>
      ))}
    </div>
  );
} 
