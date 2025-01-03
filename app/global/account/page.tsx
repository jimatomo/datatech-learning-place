export default function AccountPage() {
  
  return (
    <div>
      <h1>Account</h1>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          <div className="flex items-center">ユーザー名</div>
          <div className="flex items-center">username</div>
          
          <div className="flex items-center">メールアドレス</div>
          <div className="flex items-center">user@example.com</div>
          
          <div className="flex items-center">ユーザーID</div>
          <div className="flex items-center">1234567890</div>
        </div>
      </div>
    </div>
  )
}
