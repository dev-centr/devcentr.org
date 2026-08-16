import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, ".output", "public");
const indexHtml = join(pub, "index.html");
const html = readFileSync(indexHtml, "utf8");

function ensureSpa(dir) {
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "index.html");
  if (!existsSync(target)) {
    writeFileSync(target, html);
  }
}

ensureSpa(join(pub, "toolchain-advisor"));
ensureSpa(join(pub, "skills"));
ensureSpa(join(pub, "templates"));
ensureSpa(join(pub, "news"));
ensureSpa(join(pub, "blog"));
ensureSpa(join(pub, "changelog"));
ensureSpa(join(pub, "health"));
ensureSpa(join(pub, "help"));
ensureSpa(join(pub, "support"));
ensureSpa(join(pub, "status"));
ensureSpa(join(pub, "apps"));
ensureSpa(join(pub, "apps", "products"));
ensureSpa(join(pub, "apps", "services"));
ensureSpa(join(pub, "apps", "standards"));
ensureSpa(join(pub, "ideas", "equivalence-engine"));

const generated = join(root, "src", "lib", "news-posts.generated.json");
if (existsSync(generated)) {
  try {
    const data = JSON.parse(readFileSync(generated, "utf8"));
    for (const post of data.posts || []) {
      if (!post?.slug) continue;
      ensureSpa(join(pub, "news", post.slug));
      ensureSpa(join(pub, "blog", post.slug));
    }
  } catch {
    /* ignore */
  }
}

writeFileSync(join(pub, "404.html"), html);
