import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

export default function AccountPage() {
  const user = {
    name: "Anonymous User",
    email: "anonymous@example.com",
    id: "1234567890",
  }

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
            <TableCell>{user.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>メールアドレス</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ユーザーID</TableCell>
            <TableCell>{user.id}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

