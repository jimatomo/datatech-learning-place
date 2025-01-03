interface ErrorDisplayProps {
  message: string;
}

export function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <div>
      <h1>ページが見つかりません</h1>
      <p>エラー詳細: {message}</p>
    </div>
  );
} 
