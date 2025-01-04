import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t p-6">
      <div className="flex flex-row items-center justify-between text-sm text-muted-foreground">
        <p>Datatech Learning Place</p>
        <div className="flex items-center gap-2">
          <Link href="/global/contact" className="hover:underline">
            <p>お問い合わせ</p>
          </Link>
          <p>|</p>
          <a 
            href="https://github.com/jimatomo/dtsb-learning-place" 
            className="hover:underline" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>GitHub</p>
          </a>
        </div>
      </div>
    </footer>
  )
}
