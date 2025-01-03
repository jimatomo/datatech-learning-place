export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-extrabold tracking-tight">
        Quiz
      </h1>
      {children}
    </div>
  );
}
