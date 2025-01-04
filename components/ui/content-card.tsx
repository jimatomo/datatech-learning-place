import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface ContentCardProps {
  title: string
  description: string
  imageSrc: string
  href: string
}

export function ContentCard({ title, description, imageSrc, href }: ContentCardProps) {
  return (
    <Link href={href}>
      <Card className="w-fit hover:bg-accent transition-colors">
        <CardHeader>
          <CardTitle>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 text-center">
            <p>
              {description}
            </p>
            <Image src={imageSrc} alt={title} width={384} height={216} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
} 
