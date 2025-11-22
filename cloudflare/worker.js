export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Send a POST to forward to /run", { status: 405 });
    }

    const endpoint = env.SERVICE_ENDPOINT;
    const token = env.SERVICE_TOKEN;

    if (!endpoint) {
      return new Response("SERVICE_ENDPOINT is not configured", { status: 500 });
    }

    const headers = new Headers(request.headers);
    headers.set("Authorization", `Bearer ${token}`);
    headers.set("Content-Type", "application/json");

    const body = await request.text();
    const upstream = await fetch(`${endpoint}/run`, {
      method: "POST",
      headers,
      body: body || "{}",
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: upstream.headers,
    });
  },
};
