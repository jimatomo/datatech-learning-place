import Link from 'next/link';

export default function TextContents() {
  return (
    <div>
      <p>工事中です</p>
      <Link href="/text/pipeline/top">トップページ</Link>
      <p>各ページ</p>
      <ul>
        <li><Link href="/text/pipeline/01">01ページ</Link></li>
      </ul>
    </div>
  );
}
