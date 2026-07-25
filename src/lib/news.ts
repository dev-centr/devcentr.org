import catalog from "~/lib/news-posts.generated.json";

export type NewsPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  html: string;
  source?: string;
  sourceId?: string;
};

/** @deprecated Use NewsPost — kept for SEO/code grep friendliness */
export type BlogPost = NewsPost;

/** Authored narrative news only (changelog lives at /changelog). */
export function getPosts(): NewsPost[] {
  return catalog.posts as NewsPost[];
}

export function getPost(slug: string): NewsPost | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return getPosts().map((p) => p.slug);
}

/** @deprecated Prefer getPosts() — news catalog is authored-only now. */
export function getAuthoredPosts(): NewsPost[] {
  return getPosts().filter((p) => !p.source || p.source === "authored");
}
