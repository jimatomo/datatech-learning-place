"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { Search, FileQuestion, BookOpen, Loader2, Tag } from "lucide-react"
import { useUser } from "@auth0/nextjs-auth0/client"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// 検索結果の型
interface SearchResult {
  id: string
  type: 'quiz' | 'text'
  title: string
  tags: string[]
  author: string
  url: string
  createdAt: string
  score: number
  snippet: string
}

interface SearchResponse {
  query: string
  searchType: string
  contentType: string
  total: number
  results: SearchResult[]
}

// 検索ダイアログの状態を管理するコンテキスト
interface SearchDialogContextType {
  open: boolean
  setOpen: (open: boolean) => void
  showLoginDialog: boolean
  setShowLoginDialog: (show: boolean) => void
  handleOpenSearch: () => void
}

const SearchDialogContext = React.createContext<SearchDialogContextType | null>(null)

export function useSearchDialog() {
  const context = React.useContext(SearchDialogContext)
  if (!context) {
    throw new Error("useSearchDialog must be used within a SearchDialogProvider")
  }
  return context
}

// 検索ダイアログプロバイダー（キーボードショートカットと状態管理）
export function SearchDialogProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  const [open, setOpen] = React.useState(false)
  const [showLoginDialog, setShowLoginDialog] = React.useState(false)

  // 検索ダイアログを開く処理
  const handleOpenSearch = React.useCallback(() => {
    if (!user) {
      setShowLoginDialog(true)
    } else {
      setOpen(true)
    }
  }, [user])

  // キーボードショートカット (Cmd+K / Ctrl+K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handleOpenSearch()
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [handleOpenSearch])

  const contextValue = React.useMemo(() => ({
    open,
    setOpen,
    showLoginDialog,
    setShowLoginDialog,
    handleOpenSearch,
  }), [open, showLoginDialog, handleOpenSearch])

  return (
    <SearchDialogContext.Provider value={contextValue}>
      {children}
    </SearchDialogContext.Provider>
  )
}

// 検索ダイアログコンポーネント（常にレンダリングされる場所に配置）
export function SearchDialog() {
  const router = useRouter()
  const pathname = usePathname()
  const { open, setOpen, showLoginDialog, setShowLoginDialog } = useSearchDialog()
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasSearched, setHasSearched] = React.useState(false)

  // 検索のデバウンス（AbortControllerでin-flightリクエストをキャンセル）
  React.useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setHasSearched(false)
      return
    }

    const abortController = new AbortController()

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&type=hybrid&limit=20`,
          { signal: abortController.signal }
        )
        if (response.ok) {
          const data: SearchResponse = await response.json()
          setResults(data.results)
        } else {
          // エラー時は結果をクリア
          setResults([])
          console.error("Search API error:", response.status, response.statusText)
        }
      } catch (error) {
        // AbortErrorは無視（クエリ変更による正常なキャンセル）
        if (error instanceof Error && error.name === 'AbortError') {
          return
        }
        // ネットワークエラー時も結果をクリア
        setResults([])
        console.error("Search error:", error)
      } finally {
        // キャンセルされた場合はローディング状態を更新しない
        if (!abortController.signal.aborted) {
          setIsLoading(false)
          setHasSearched(true)
        }
      }
    }, 300) // 300ms デバウンス

    return () => {
      clearTimeout(timer)
      abortController.abort()
    }
  }, [query])

  // 結果選択時の処理
  const handleSelect = (url: string) => {
    setOpen(false)
    setQuery("")
    setResults([])
    setHasSearched(false)
    router.push(url)
  }

  // ダイアログが閉じられた時のリセット
  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      setQuery("")
      setResults([])
      setHasSearched(false)
    }
  }

  // クイズとテキストの結果を分類
  const quizResults = results.filter(r => r.type === 'quiz')
  const textResults = results.filter(r => r.type === 'text')

  return (
    <>
      {/* ログインを促すダイアログ */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>検索機能を利用するにはサインインが必要です</DialogTitle>
            <DialogDescription>
              検索機能はサインインしたユーザーのみ利用可能です。<br />
              <Link href="/global/privacy" onClick={() => setShowLoginDialog(false)} className="underline text-blue-500">プライバシーポリシーはこちら</Link>
            </DialogDescription>
          </DialogHeader>
          <Button asChild>
            <a href={`/api/auth/login?returnTo=${pathname}`}>サインイン（無料）</a>
          </Button>
        </DialogContent>
      </Dialog>

      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <CommandInput
          placeholder="クイズやテキストを検索..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-[400px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">検索中...</span>
            </div>
          ) : hasSearched && results.length === 0 ? (
            <CommandEmpty>
              「{query}」に一致する結果が見つかりませんでした
            </CommandEmpty>
          ) : (
            <>
              {quizResults.length > 0 && (
                <CommandGroup heading="クイズ">
                  {quizResults.map((result) => (
                    <CommandItem
                      key={result.id}
                      value={result.id}
                      onSelect={() => handleSelect(result.url)}
                      className="flex flex-col items-start gap-1 py-3"
                    >
                      <div className="flex w-full items-center gap-2">
                        <FileQuestion className="h-4 w-4 shrink-0 text-blue-500" />
                        <span className="font-medium truncate flex-1">{result.title}</span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {result.createdAt}
                        </span>
                      </div>
                      {result.tags.length > 0 && (
                        <div className="flex items-center gap-1 ml-6 flex-wrap">
                          <Tag className="h-3 w-3 text-muted-foreground" />
                          {result.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs py-0 px-1">
                              {tag}
                            </Badge>
                          ))}
                          {result.tags.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{result.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {quizResults.length > 0 && textResults.length > 0 && (
                <CommandSeparator />
              )}

              {textResults.length > 0 && (
                <CommandGroup heading="テキスト">
                  {textResults.map((result) => (
                    <CommandItem
                      key={result.id}
                      value={result.id}
                      onSelect={() => handleSelect(result.url)}
                      className="flex flex-col items-start gap-1 py-3"
                    >
                      <div className="flex w-full items-center gap-2">
                        <BookOpen className="h-4 w-4 shrink-0 text-green-500" />
                        <span className="font-medium truncate flex-1">{result.title}</span>
                      </div>
                      {result.snippet && (
                        <p className="text-xs text-muted-foreground ml-6 line-clamp-2">
                          {result.snippet}
                        </p>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {!hasSearched && !query && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  <Search className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>キーワードを入力して検索</p>
                  <p className="text-xs mt-1">ハイブリッド検索でクイズとテキストを検索できます</p>
                </div>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

// 検索トリガーボタン（サイドバー内に配置）
export function SearchCommand() {
  const { handleOpenSearch } = useSearchDialog()
  const { isLoading: isUserLoading } = useUser()

  return (
    <Button
      variant="outline"
      className="relative h-9 w-full justify-start rounded-md bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 lg:w-60 mt-4 mb-0"
      onClick={handleOpenSearch}
      disabled={isUserLoading}
    >
      <Search className="mr-2 h-4 w-4" />
      <span className="hidden lg:inline-flex">検索...</span>
      <span className="inline-flex lg:hidden">検索</span>
      <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  )
}




