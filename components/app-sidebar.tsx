"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  ScrollText,
  User2,
  ChevronUp,
  CreditCard,
  LogOut,
  ChevronLeft,
} from "lucide-react"

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

// Menu items.
const items = [
  {
    title: "Quiz",
    url: "/quiz",
    icon: ScrollText,
  },
]

const footerItems = [
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

  // TODO: 認証機能を実装したらユーザ情報をサーバから取得する処理に変更する
  const user = {
    name: "Anonymous User",
    email: "anonymous@example.com",
    avatar: "",
    github_url: "",
  }

  let avatar_url = ""
  if (user.avatar !== "") {
    avatar_url = user.avatar
  } else if (user.github_url !== "") {
    avatar_url = `${user.github_url}.png`
  }

  return (
    <Sidebar collapsible="icon" aria-label="メインナビゲーション">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between">
            <Link href="/" className="flex gap-2 items-center w-full">
              <Image src="/favicon.ico" alt="Icon" width={30} height={30} className="flex-shrink-0" />
              <span className="text-sm font-bold group-data-[collapsible=icon]:hidden truncate">
                Datatech Learning Place
              </span>
            </Link>
            <ChevronLeft className="w-10 group-data-[collapsible=icon]:hidden" onClick={() => toggleSidebar()} />
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
                    <Link href={item.url}>
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
              <DropdownMenu>
                {/* ユーザ情報を表示するフッター */}
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={avatar_url} alt={user.name} />
                      <AvatarFallback className="rounded-lg"><User2 /></AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  {footerItems.map((item) => (
                    <DropdownMenuItem key={item.title}>
                      <Link href={item.url} className="flex items-center gap-2 w-full">
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem key="signout">
                    <LogOut />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
