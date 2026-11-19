// oEmbed (https://oembed.com): ask a page how it would like to be embedded.
// Nothing here knows about any particular site. A page that publishes an
// oEmbed discovery link can be embedded; anything else becomes a link card.

export interface EmbedInfo {
  url: string;
  title?: string;
  provider?: string;
  thumbnail?: string;
  /** The iframe to show, only when it points back at the page's own site. */
  iframe?: { src: string; width: number; height: number; title: string };
}

const cache = new Map<string, Promise<EmbedInfo>>();

const attr = (tag: string, name: string) => tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, "i"))?.[1]?.replace(/&amp;/g, "&");

async function discover(url: string): Promise<EmbedInfo> {
  const page = await fetch(url, { headers: { accept: "text/html" } });
  if (!page.ok) return { url };
  const html = await page.text();
  const link = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]).find((tag) => /application\/json\+oembed/i.test(tag));
  const endpoint = link && attr(link, "href");
  if (!endpoint) return { url, title: html.match(/<title>([^<]*)<\/title>/i)?.[1] };

  const data = await (await fetch(new URL(endpoint, url))).json();
  const info: EmbedInfo = { url, title: data.title, provider: data.provider_name, thumbnail: data.thumbnail_url };
  // Only "rich" and "video" types carry HTML. Take the iframe out of it rather
  // than injecting the markup, and only if it stays on the page's own site.
  const iframe = typeof data.html === "string" ? data.html.match(/<iframe\b[^>]*>/i)?.[0] : undefined;
  const src = iframe && attr(iframe, "src");
  if (src && new URL(src, url).origin === new URL(url).origin) {
    info.iframe = {
      src: new URL(src, url).href,
      width: Number(attr(iframe!, "width") ?? data.width) || 800,
      height: Number(attr(iframe!, "height") ?? data.height) || 560,
      title: attr(iframe!, "title") ?? data.title ?? "Embedded content",
    };
  }
  return info;
}

/** Resolve a page to something embeddable, once per build. Never throws. */
export function resolveEmbed(url: string): Promise<EmbedInfo> {
  if (!cache.has(url)) cache.set(url, discover(url).catch(() => ({ url })));
  return cache.get(url)!;
}
