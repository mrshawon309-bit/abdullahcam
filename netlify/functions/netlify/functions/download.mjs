export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" }
    });
  }

  try {
    const body = await req.json();
    const url = String(body.url || "").trim();
    const format = String(body.format || "video");

    if (!/^https?:\/\//i.test(url)) {
      return new Response(JSON.stringify({
        error: "Please enter a valid media link."
      }), {
        status: 400,
        headers: { "content-type": "application/json" }
      });
    }

    return new Response(JSON.stringify({
      ok: false,
      message: "Media provider API is not connected yet.",
      url,
      format
    }), {
      status: 501,
      headers: { "content-type": "application/json" }
    });

  } catch {
    return new Response(JSON.stringify({
      error: "Invalid request."
    }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
};
