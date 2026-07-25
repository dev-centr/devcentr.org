import catalog from "~/lib/blog-posts.generated.json";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  html: string;
};

export function getPosts(): BlogPost[] {
  return catalog.posts as BlogPost[];
}

export function getPost(slug: string): BlogPost | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return getPosts().map((p) => p.slug);
}
