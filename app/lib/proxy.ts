// Forwards /api/* to the backend. This is a normal route action (see routes.ts), not a middleware.

const backend = (process.env.BACKEND_URL ?? "https://didactic-doodle-iota.vercel.app").replace(/\/+$/, "")

// fetch() hands us a decoded body, so the encoding and length headers no longer describe it.
const STRIPPED = ["content-encoding", "content-length", "transfer-encoding", "connection", "keep-alive"]

export async function proxy(request: Request): Promise<Response> {
  const { pathname, search } = new URL(request.url)

  const headers = new Headers(request.headers)
  headers.delete("host")

  const init: RequestInit & { duplex: "half" } = {
    method: request.method,
    headers,
    body: request.body,
    duplex: "half",
    // Pass redirects (magic-link sign-in) and their cookies to the browser instead of following them here.
    redirect: "manual",
    signal: AbortSignal.timeout(60_000),
  }

  try {
    const upstream = await fetch(backend + pathname + search, init)

    const out = new Headers(upstream.headers)
    for (const name of STRIPPED) out.delete(name)

    const location = out.get("location")
    if (location?.startsWith(backend)) out.set("location", location.slice(backend.length) || "/")
    if (!out.has("cache-control")) out.set("cache-control", "no-store")

    return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: out })
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError"
    return Response.json(
      { detail: timedOut ? "The service took too long to answer. Please try again." : "The service is unavailable. Please try again shortly." },
      { status: timedOut ? 504 : 502, headers: { "cache-control": "no-store" } },
    )
  }
}
