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

    if (!/^https?:\/\//i.test(url)) {
      return new Response(JSON.stringify({
        error: "Please enter a valid media link."
      }), {
        status: 400,
        headers: { "content-type": "application/json" }
      });
    }

    return new Response(JSON.stringify({
      ok: true,
      url,
      message: "Link received successfully."
    }), {
      status: 200,
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
};netlify/functions/analyze.mjs
