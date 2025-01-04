import Link from "next/link"
import { User2, CreditCard, MessageCircle } from "lucide-react"

export default function GlobalPage() {
  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-bold tracking-tight">
        GlobalPage
      </h1>
      <div className="flex flex-col gap-2 mt-4 px-2">
        <Link href="/global/account" className="hover:underline w-fit">
          <div className="flex flex-row items-center text-lg">
            <User2 className="w-4 h-4 mr-2" />
            <p>アカウント設定</p>
          </div>
        </Link>
        <Link href="/global/billing" className="hover:underline w-fit">
          <div className="flex flex-row items-center text-lg">
            <CreditCard className="w-4 h-4 mr-2" />
            <p>課金設定</p>
          </div>
        </Link>
        <Link href="/global/contact" className="hover:underline w-fit">
          <div className="flex flex-row items-center text-lg">
            <MessageCircle className="w-4 h-4 mr-2" />
            <p>お問い合わせ</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
