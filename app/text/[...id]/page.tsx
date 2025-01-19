// TODO: メタタグも生成しておく
// import { Metadata } from 'next';

export default async function TextPage({ params }: { params: { id: string[] } }) {
  const { id } = await params;
  const TextModule = await import(`@/contents/text/${id.join("/")}.tsx`).catch((error) => {
    console.error("Error loading module:", error);
    return null;
  });

  if (TextModule) {
    return (
      <div>
        <TextModule.default />
      </div>
    );
  }

  return (
    <div>
      <p>現在はまだページの枠が用意されているだけの状態です。鋭意作成中です。</p>
    </div>
  );
}
