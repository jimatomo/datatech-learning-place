"use server";

import { load } from "cheerio";
import { unstable_noStore as noStore } from "next/cache";

export type OgpObjects = {
  href?: string;
  image?: string;
  title?: string;
  description?: string;
  domain?: string;
};

export const fetchOGPs = async (urlString: string) => {
  // サーバーアクションの結果をNextのデータキャッシュに乗せない
  noStore();
  let url: URL;
  try {
    url = new URL(urlString);
  } catch {
    return { error: "invalid url" };
  }

  
  // 大きなHTMLをキャッシュしようとしてNextのデータキャッシュ上限(2MB)を超えるのを防ぐため、キャッシュしない
  const res = await fetch(url, { cache: 'no-store' });
  
  if (!res.ok) {
    console.error(
      `failed to fetching ogp data: ${res.status} ${res.statusText}`
    );
    return { error: res.statusText };
  }
  const text = await res.text();
  const $ = load(text);
  const title = $('meta[property="og:title"]').attr("content") || $("title").text();
  let image = $('meta[property="og:image"]').attr("content");

  // snowflake.comドメインまたはそのサブドメインの場合の特別処理
  // if (url.hostname.includes('snowflake.com')) {
  //   // 相対パスの場合、完全なURLに変換
  //   const snowflake_url = new URL('https://snowflake.com');
  //   const snowflake_res = await fetch(snowflake_url, { cache: 'force-cache' });
  //   const snowflake_text = await snowflake_res.text();
  //   const $snowflake = load(snowflake_text);
  //   const snowflake_image = $snowflake('meta[property="og:image"]').attr("content");
  //   image = snowflake_image;
  // }

  // 画像URLの有効性チェック
  if (image) {
    try {
      // 画像の存在確認もキャッシュしない
      const imageRes = await fetch(image, { cache: 'no-store' });
      if (!imageRes.ok) {
        image = '/no-image.png';
      }
    } catch {
      image = '/no-image.png';
    }
  }

  // descriptionの取得
  let description: string | null = null;
  // Zennの場合はog:descriptionがないので、zenn:descriptionをdescriptionとする
  if ($('meta[property="og:site_name"]').attr("content") === "Zenn") {
    description = $('meta[name="zenn:description"]').attr("content") ?? '';
  } else {
    description = $('meta[property="og:description"]').attr("content") ?? '';
  }

  const href = urlString;
  const domain = url.hostname;

  return { ogps: { title, image, description, href, domain } };
};
