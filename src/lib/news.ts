import catalog from "~/lib/news-posts.generated.json";

export type NewsPost = {
  slug: string;
  title: string;
  /** Title with inline markup (e.g. <code>), when the AsciiDoc H1 has any. */
  titleHtml?: string;
  description: string;
  date: string;
  tags: string[];
  html: string;
  source?: string;
  channel?: string;
};

function normalize(p: Record<string, unknown>): NewsPost {
  return {
    slug: String(p.slug ?? ""),
    title: String(p.title ?? ""),
    titleHtml: p.titleHtml ? String(p.titleHtml) : undefined,
    description: String(p.description ?? p.desc ?? ""),
    date: String(p.date ?? ""),
    tags: (p.tags as string[]) || (p.keywords as string[]) || [],
    html: String(p.html ?? p.body ?? ""),
    source: p.source ? String(p.source) : undefined,
    channel: String(p.channel ?? "news"),
  };
}

export function getPosts(): NewsPost[] {
  return (catalog.posts as Record<string, unknown>[]).map(normalize);
}

export function getPost(slug: string): NewsPost | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return getPosts().map((p) => p.slug);
}