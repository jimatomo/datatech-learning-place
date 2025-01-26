export default function HarvorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-bold tracking-tight">
        Harvor
        <span className="text-xs pl-4 items-center text-amber-600 dark:text-amber-300">
          ⭐現状を確認したら出航の時間だ⭐
        </span>
      </h1>
      {children}
    </div>
  );
}
