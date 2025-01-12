export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-bold tracking-tight">
        Quiz
        <span className="text-xs text-muted-foreground pl-4 items-center">
          毎日コツコツ積み重ねていこう！
        </span>
      </h1>
      {children}
    </div>
  );
}
