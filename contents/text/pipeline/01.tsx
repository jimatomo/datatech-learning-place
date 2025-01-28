import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PinIcon } from "lucide-react"

export default function TextContents() {
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold pb-4">第1章 このテキストで学ぶこと[WIP]</h2>
      <div className="text-sm pb-2">
        <p className="pb-2">
          このテキストは、初心者から中級者までのデータエンジニアを対象としています。
          データエンジニアリングは総合格闘技と例えられますが、一般的なWebアプリケーションの構築における
          フルスタックエンジニアのように、インフラ回りの知識からCI/CDなどのDevOpsから品質管理に至るまで
          ありとあらゆるITエンジニアに求められる知識の幅の広さが求められる職種です。
        </p>
        <p className="pb-2">
          その幅の広い知識を身に着けるためには各構成要素となる技術を深めるステップが必要ですが、
          そもそもデータエンジニアリングで必要な技術の全体像を把握していないと、
          自分の今いる位置が分からなくなり、本当にこのままでいいのかと疑問を抱くことになると思います。
        </p>
        <p className="pb-2">
          そこで、このテキストを利用していただくことで、データパイプラインひいてはデータアプリケーションを構築する中で、
          インフラ回りからDevOps、品質管理までの一連の技術要素を把握していただけることを目的として作成しています。
        </p>
        <Alert className="bg-gray-100 dark:bg-gray-900 my-4">
          <PinIcon className="h-4 w-4" />
          <AlertTitle className="font-semibold pb-2">これだけは理解しておいてほしいこと</AlertTitle>
          <AlertDescription>
            このテキストは初級者から中級者に向けて説明することを目的としているので、あえて難しい技術は扱わないようにしています。
            現場ではより複雑な問題を解くためにより高度な知識や実装をする必要が出てくると思います。
            このテキストが完璧な正解ではないということだけは頭に入れておいていただけると幸いです。
          </AlertDescription>
        </Alert>
        </div>
    </div>
  );
}

