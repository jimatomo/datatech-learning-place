export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-extrabold tracking-tight">
        お問い合わせ
      </h1>
      {children}
    </div>
  )
}
