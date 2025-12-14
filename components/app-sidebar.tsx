"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  ScrollText,
  Book,
  Flag,
  User2,
  ChevronUp,
  CreditCard,
  LogOut,
  ChevronLeft,
  Bell,
  Search,
} from "lucide-react"

import { SearchCommand, useSearchDialog } from "@/components/search/search-command"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useUser } from '@auth0/nextjs-auth0/client';

import { handleTrackEvent } from '@/app/lib/frontend_event_api';


// Menu items.
const items = [
  {
    title: "Quiz",
    url: "/quiz",
    icon: ScrollText,
  },
  {
    title: "Text",
    url: "/text",
    icon: Book,
  },
  {
    title: "Harvor",
    url: "/harvor",
    icon: Flag,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
]

const footerItems = [
  {
    title: "Terms",
    url: "/global/terms",
    icon: Book,
  },
  {
    title: "Privacy",
    url: "/global/privacy",
    icon: Book,
  },
  {
    title: "Account",
    url: "/global/account",
    icon: User2,
  },
  {
    title: "Billing",
    url: "/global/billing",
    icon: CreditCard,
  },
]


export function AppSidebar() {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()
  const { user, error, isLoading } = useUser();
  const { handleOpenSearch } = useSearchDialog();

  // 画面サイズが小さい時のみサイドバーを閉じる関数
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const clickedPath = e.currentTarget.getAttribute('href') ?? '';
    
    // イベントトラッキングを非同期で実行してUIをブロックしない
    setTimeout(async () => {
      try {
        await handleTrackEvent({
          user_id: user?.sub?.toString() ?? '',
          path: pathname,
          event_name: 'sidebar_link_click',
          properties: {link_path: clickedPath},
        });
      } catch (error) {
        console.error('イベントトラッキングエラー:', error);
      }
    }, 0);

    if (window.innerWidth < 768) {
      toggleSidebar()
    };
  }

  if (isLoading) return <div></div>;
  // 未ログイン時の /api/auth/profile は 204 を想定だが、環境差や一時的な401が出ても
  // UIが壊れないよう「Unauthorized」はサインアウト扱いで握りつぶす。
  if (error && error.message !== "Unauthorized") return <div>{error.message}</div>;

  return (
    <Sidebar collapsible="icon" aria-label="メインナビゲーション">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between">
            <Link href="/" className="flex gap-2 items-center w-full pl-1" onClick={handleLinkClick}>
              <Image src="/favicon.ico" alt="Icon" width={25} height={25} className="flex-shrink-0" />
              <span className="text-xs font-bold group-data-[collapsible=icon]:hidden truncate">
                Datatech Learning Place
              </span>
            </Link>
            <ChevronLeft className="w-10 group-data-[collapsible=icon]:hidden cursor-pointer" onClick={() => toggleSidebar()} />
          </SidebarMenuItem>
          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
            <SearchCommand />
          </SidebarMenuItem>
          <SidebarMenuItem className="hidden group-data-[collapsible=icon]:flex justify-center">
            <SidebarMenuButton asChild className="w-8 h-8 p-0 mt-4">
              <button onClick={handleOpenSearch}>
                <Search className="h-4 w-4" />
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Learning Place</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === pathname}>
                    <Link href={item.url} onClick={handleLinkClick}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.picture ?? ''} alt={user.name ?? ''} />
                        <AvatarFallback className="rounded-lg"><User2 /></AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user.name}</span>
                        <span className="truncate text-xs" aria-label={`メールアドレス: ${user.email}`}>{user.email}</span>
                      </div>
                      <ChevronUp className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width]"
                  >
                    {footerItems.map((item) => (
                      <DropdownMenuItem key={item.title} asChild>
                        <Link
                          href={item.url}
                          className="flex items-center gap-2 w-full"
                          onClick={handleLinkClick}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem key="signout">
                      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Auth API routes require full browser navigation for redirects */}
                      <a href="/api/auth/logout" className="flex items-center gap-2 w-full" onClick={handleLinkClick}>
                        <LogOut />
                        Sign out
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <SidebarMenuButton asChild>
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Auth API routes require full browser navigation for redirects */}
                  <a href={`/api/auth/login?returnTo=${pathname}`} className="flex items-center gap-2" onClick={handleLinkClick}>
                    <User2 />
                    <span className="text-sm">Sign in</span>
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
