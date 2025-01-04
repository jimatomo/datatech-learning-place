import { LinkCard } from '@/components/ui/link-card'

export default function ContactPage() {
  return (
    <div className="flex flex-col mx-auto p-2">
      <p className="pb-2">お問い合わせは下記の Notion Form からお願いします</p>
      <LinkCard
        url="https://wiry-act-a67.notion.site/171d816a693580008c4cef8fbdc9b5ea"
      />
    </div>
  )
}
