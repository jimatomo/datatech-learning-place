import { ContentCard } from "@/components/ui/content-card"

export default function TextPage() {
  return (
    <div>
      <div>
        <p>データ基盤を一から作りながらデータエンジニアリングを一から学ぶシリーズ</p>
      </div>
      <div className="pt-4 p-2 flex flex-col lg:flex-row gap-2">
        <ContentCard 
          title="Data Pipeline"
          description="データパイプラインを構築"
          imageSrc="https://datatech-learning-place.net/logo/pipeline.png"
          href="/text/pipeline"
        />
      </div>
    </div>
  )
}
