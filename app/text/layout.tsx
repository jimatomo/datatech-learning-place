export default function TextLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-bold tracking-tight">
        Text
        <span className="text-xs pl-4 items-center text-amber-600 dark:text-amber-300">
          ⭐さぁ、手を動かすのだ⭐
        </span>
      </h1>
      {children}
    </div>
  );
}
