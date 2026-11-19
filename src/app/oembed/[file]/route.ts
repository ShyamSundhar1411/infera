import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { AUTHOR } from "@/lib/data/author.data";
import { LABS } from "@/lib/data/labs.data";

export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => LABS.map((lab) => ({ file: `${lab.id}.json` }));

const WIDTH = 900;
const HEIGHT = 760;

/** oEmbed (https://oembed.com) for each lab, so pasting an embed link into Ghost, Notion and the like shows the live lab. */
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const id = (await params).file.replace(/\.json$/, "");
  const lab = LABS.find((l) => l.id === id)!;
  const src = `${SITE_URL}/embed/${lab.id}/`;
  return Response.json({
    version: "1.0",
    type: "rich",
    provider_name: SITE_NAME,
    provider_url: `${SITE_URL}/`,
    title: lab.title,
    author_name: AUTHOR.name,
    author_url: AUTHOR.url,
    width: WIDTH,
    height: HEIGHT,
    html: `<iframe src="${src}" width="${WIDTH}" height="${HEIGHT}" style="border:0;border-radius:16px;max-width:100%" loading="lazy" title="${lab.title.replace(/"/g, "&quot;")}"></iframe>`,
    thumbnail_url: `${SITE_URL}/og${lab.path.replace(/\/$/, "")}.png`,
    thumbnail_width: 1200,
    thumbnail_height: 630,
  });
}
