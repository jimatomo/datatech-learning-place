import Image from "next/image";

type XShareButtonProps = {
  title: string;
  url: string;
};

export function XShareButton({ title, url }: XShareButtonProps) {
  const shareUrl = `https://x.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + ' @jimatomo93')}`;

  return (
    <div className="px-2">
      {/* アイコンをここに追加 */}
      <a href={shareUrl} rel="noreferrer noopener" target="_blank"
        className="flex items-center justify-center w-12 h-12 rounded-full border-2
        bg-black hover:bg-black/80 dark:hover:bg-black/50">
        <Image src="/x-logo.svg" alt="X" width={18} height={18} />
      </a>
    </div>
  );
}

export default XShareButton;
