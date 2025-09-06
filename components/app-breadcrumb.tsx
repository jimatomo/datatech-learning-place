"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment, useRef, useEffect, useState } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbCollapsed() {
  const pathname = usePathname()
  const paths = pathname.split("/").filter(Boolean)
  const scrollRef = useRef<HTMLOListElement>(null)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    const element = scrollRef.current
    if (element) {
      checkScroll()
      element.addEventListener('scroll', checkScroll)
      
      // ResizeObserverでサイズ変更も監視
      const resizeObserver = new ResizeObserver(checkScroll)
      resizeObserver.observe(element)
      
      return () => {
        element.removeEventListener('scroll', checkScroll)
        resizeObserver.disconnect()
      }
    }
  }, [pathname])

  return (
    <div className="w-full min-w-0 flex items-center relative">
      <Breadcrumb className="w-full">
        <BreadcrumbList 
          ref={scrollRef}
          className="overflow-x-auto whitespace-nowrap flex-nowrap pb-2 pt-2 scrollbar-hide" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <BreadcrumbItem key="home">
            <BreadcrumbLink asChild>
              <Link href="/">home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          
          {paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join("/")}`
            const isLast = index === paths.length - 1

            return (
              <Fragment key={`${index}-${path}`}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{path}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{path}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
      
      {/* 左側のフェードグラデーション */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      )}
      
      {/* 右側のフェードグラデーション */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10" />
      )}
    </div>
  )
}
