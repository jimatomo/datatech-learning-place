import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
export default function QuizWeeklyContents() {
  return (
    <div>
      <Table className="max-w-3xl">
        <TableHeader>
          <TableRow>
            <TableHead>曜日</TableHead>
            <TableHead>ジャンル</TableHead>
            <TableHead>コンテンツ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>月</TableCell>
            <TableCell>Snowflake Basic</TableCell>
            <TableCell>ドキュメントからの出題（目指せSnowPro Core！）</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>火</TableCell>
            <TableCell>Snowflake Advanced</TableCell>
            <TableCell>新しめのSnowflakeの機能からの出題</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>水</TableCell>
            <TableCell>Data Modeling</TableCell>
            <TableCell>dbt, SQLなどデータの準備に必要な知識を鍛える</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>木</TableCell>
            <TableCell>Infrastructure</TableCell>
            <TableCell>AWS, Linuxなどエンジニアの基礎を鍛える</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>金</TableCell>
            <TableCell>Data Application</TableCell>
            <TableCell>Streamlit, Pythonなど整えたデータを活用するために必要な知識を鍛える</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>土</TableCell>
            <TableCell>Data Management</TableCell>
            <TableCell>DMBOKなどデータの管理に必要な知識を鍛える</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>日</TableCell>
            <TableCell>Datatech News</TableCell>
            <TableCell>データ技術の最新動向を追いましょう</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
