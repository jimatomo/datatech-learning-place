import { Metadata } from "next"

export const metadata: Metadata = {
  title: "DTLP Billing",
  description: "Datatech Learning PlaceのBillingページです。将来的に有料プランを提供する予定です。",
  openGraph: {
    title: "DTLP Billing",
    description: "Datatech Learning PlaceのBillingページです。将来的に有料プランを提供する予定です。",
    url: "https://datatech-learning-place.net/global/billing",
    siteName: "Datatech Learning Place",
    images: [
      {
        url: "https://datatech-learning-place.net/logo/logo-with-title.png",
        width: 820,
        height: 820,
      },
    ],
  },
}

export default function BillingPage() {
  return (
    <div>
      <p>将来的に有料プランを提供する予定です。</p>
    </div>
  )
}
