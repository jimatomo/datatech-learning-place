import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PinIcon } from "lucide-react"

export default function TextContents() {
  return (
    <div>
      <h2 className="text-lg font-bold pb-4"> Data Pipeline ～データパイプラインを構築～</h2>
      <div className="text-sm leading-[2.0] pb-2">
        <p className="pb-6">
          データパイプラインは、データを収集、変換、およびロードするための一連のステップです。
          データパイプラインを高品質に構築することはデータエンジニアリングの腕の見せ所です。
          高品質なパイプラインを提供することができるとデータの品質が高く保つことができ、利活用を進めるうえでの基礎体力が付いた状態になります。
        </p>
        <p className="pb-6">
          このテキストでは、AWSとSnowflakeを使用して家計簿を構築していくことで、高い品質のデータを構築するために必要な一覧のプラクティスを学びます。
        </p>
        <Alert className="bg-gray-100 dark:bg-gray-900 mb-8">
          <PinIcon className="h-4 w-4" />
          <AlertTitle className="font-semibold pb-2">なぜ家計簿なのか？</AlertTitle>
          <AlertDescription className="leading-[2.0]">
            実際に自分の生きたデータを利用することができるという点が面白いと思うのです。<br />
            これだけキャッシュレスが普及した世の中なので、それなりにデータはたまりつつも、面白いくらいにダウンロードしたデータは扱いずらいのです。<br />
            その生の扱いずらいデータを、4種類のキャッシュフローに分類しつつ、資産も併せてその変化をダッシュボードにする過程の中で、
            肌感覚を持ってデータパイプラインとはどういうものなのかを学ぶことができると思うのです。
          </AlertDescription>
        </Alert>
        <ul>
          <li><Link href="/text/pipeline/01" className="hover:underline">第1章 このテキストで学ぶこと</Link></li>
        </ul>
      </div>
    </div>
  );
}
