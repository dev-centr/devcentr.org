import catalog from "~/lib/blog-posts.generated.json";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  html: string;
  source?: string;
  channel?: string;
};

function normalize(p: Record<string, unknown>): BlogPost {
  return {
    slug: String(p.slug ?? ""),
    title: String(p.title ?? ""),
    description: String(p.description ?? p.desc ?? ""),
    date: String(p.date ?? ""),
    tags: (p.tags as string[]) || (p.keywords as string[]) || [],
    html: String(p.html ?? p.body ?? ""),
    source: p.source ? String(p.source) : undefined,
    channel: String(p.channel ?? "blog"),
  };
}

export function getPosts(): BlogPost[] {
  return (catalog.posts as Record<string, unknown>[]).map(normalize);
}

export function getPost(slug: string): BlogPost | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return getPosts().map((p) => p.slug);
}