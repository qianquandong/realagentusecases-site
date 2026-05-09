// Cloudflare Pages function — GET /subscribe → 308 to Substack.
// Reads NEXT_PUBLIC_SUBSTACK_URL from CF Pages env vars (same key as Next.js).

interface PagesContext<E = unknown> {
  request: Request;
  env: E;
}

interface Env {
  NEXT_PUBLIC_SUBSTACK_URL?: string;
}

export const onRequest = async (
  context: PagesContext<Env>,
): Promise<Response> => {
  const url =
    context.env.NEXT_PUBLIC_SUBSTACK_URL ??
    "https://jackqian.substack.com/subscribe";
  return Response.redirect(url, 308);
};
