"use server";

import { load } from "cheerio";

export const fetchOGPs = async (urlString: string) => {
  let url: URL;
  try {
    url = new URL(urlString);
  } catch {
    return { error: "invalid url" };
  }

  
  const res = await fetch(url);
  
  if (!res.ok) {
    console.error(
      `failed to fetching ogp data: ${res.status} ${res.statusText}`
    );
    return { error: res.statusText };
  }
  const text = await res.text();
  const $ = load(text);
  const title =
    $('meta[property="og:title"]').attr("content") || $("title").text();
  const image = $('meta[property="og:image"]').attr("content");
  
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
