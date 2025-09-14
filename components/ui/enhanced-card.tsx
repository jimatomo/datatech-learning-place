import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface EnhancedCardProps {
  title: string
  description: string
  imageSrc: string
  href: string
}

export function EnhancedCard({ title, description, imageSrc, href }: EnhancedCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="
        w-fit 
        relative
        transition-all 
        duration-300 
        ease-out
        transform
        hover:-translate-y-1
        cursor-pointer
        overflow-hidden
        
        /* ライトモード: 常時浮き上がって見える影 + 背景色変化 */
        bg-white
        hover:bg-slate-100
        shadow-lg
        hover:shadow-xl
        
        /* ダークモード: 抑えたトーンの背景色 */
        dark:bg-slate-900
        dark:hover:bg-slate-800
        dark:shadow-slate-900/50
        dark:hover:shadow-slate-900/60
      ">
        <CardHeader className="relative z-10">
          <CardTitle className="
            transition-colors
            duration-300
            text-slate-900
            dark:text-slate-100
            group-hover:text-blue-700
            dark:group-hover:text-slate-200
          ">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex flex-col gap-2 text-center">
            <p className="
              text-slate-600 
              dark:text-slate-300
              group-hover:text-blue-600
              dark:group-hover:text-slate-100
              transition-colors
              duration-300
            ">
              {description}
            </p>
            <div className="
              relative
              overflow-hidden
              rounded-lg
            ">
              <Image 
                src={imageSrc} 
                alt={title} 
                width={384} 
                height={216}
                className="
                  rounded-lg
                "
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
