import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t sm:px-6 py-3">
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-muted-foreground">
        <p className="mb-4 sm:mb-0">Datatech Learning Place</p>
        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/global/terms" className="hover:underline">
            <p>利用規約</p>
          </Link>
          <p>|</p>
          <Link href="/global/privacy" className="hover:underline">
            <p>プライバシーポリシー</p>
          </Link>
          <p>|</p>
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
