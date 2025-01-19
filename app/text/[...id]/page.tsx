// TODO: メタタグも生成しておく
// import { Metadata } from 'next';

export default async function TextPage({ params }: { params: { id: string[] } }) {
  const { id } = await params;
  const TextModule = await import(`@/contents/text/${id.join("/")}.tsx`).catch(() => null);

  if (TextModule) {
    return (
      <div>
        <p>工事中です</p>
      </div>
    );
  }

  return (
    <div>
      <p>現在はまだページの枠が用意されているだけの状態です。鋭意作成中です。</p>
    </div>
  );
}
