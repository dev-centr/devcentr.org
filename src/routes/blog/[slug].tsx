import { Navigate, useParams } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";

/** Legacy /blog/:slug — keep for SEO and old links */
export default function BlogPostRedirect() {
  const params = useParams();
  return (
    <>
      <Title>Blog · DevCentr News</Title>
      <Meta name="keywords" content="DevCentr, blog, news" />
      <Meta name="robots" content="noindex" />
      <Navigate href={`/news/${params.slug}`} />
    </>
  );
}
