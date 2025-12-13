import { Metadata } from "next"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { auth0 } from '@/lib/auth0'

export const metadata: Metadata = {
  title: "DTLP Account",
  description: "Datatech Learning PlaceのAccountページです。アカウント設定を確認できます。",
  openGraph: {
    title: "DTLP Account",
    description: "Datatech Learning PlaceのAccountページです。アカウント設定を確認できます。",
    url: "https://datatech-learning-place.net/global/account",
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

export default async function AccountPage() {
  const user = await auth0.getSession();

  return (
    <div className="flex flex-col max-w-3xl mx-auto">
      <h2 className="scroll-m-20 pb-2 text-lg font-bold">
        ユーザ情報
      </h2>
      <Table className="break-all">
        <TableHeader>
          <TableRow>
            <TableHead className="w-52">項目</TableHead>
            <TableHead className="w-96">値</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>ユーザー名</TableCell>
            <TableCell>{user?.user?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>メールアドレス</TableCell>
            <TableCell>{user?.user?.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ユーザーID</TableCell>
            <TableCell>{user?.user?.sub}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

