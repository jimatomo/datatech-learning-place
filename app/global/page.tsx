import Link from "next/link"

export default function GlobalPage() {
  return (
    <div>
      <h1>GlobalPage</h1>
      <div className="flex flex-col gap-4 mt-4">
        <Link href="/global/account" className="text-lg hover:underline">
          アカウント設定
        </Link>
        <Link href="/global/billing" className="text-lg hover:underline">
          課金設定
        </Link>
      </div>
    </div>
  )
}
