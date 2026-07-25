import { Navigate } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";

/** Legacy /blog URL — keep for SEO; canonical experience is /news */
export default function BlogIndexRedirect() {
  return (
    <>
      <Title>Blog · DevCentr News</Title>
      <Meta name="description" content="DevCentr engineering blog and news — redirected to /news." />
      <Meta name="keywords" content="DevCentr, blog, news" />
      <Meta name="robots" content="noindex" />
      <Navigate href="/news" />
    </>
  );
}
