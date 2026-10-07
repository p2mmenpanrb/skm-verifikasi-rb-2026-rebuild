export default async (request) => {
  const appsScriptUrl = process.env.APPS_SCRIPT_URL;

  if (!appsScriptUrl) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "APPS_SCRIPT_URL belum dikonfigurasi di Netlify."
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      }
    );
  }

  try {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    let targetUrl = appsScriptUrl;

    if (method === "GET") {
      const qs = url.searchParams.toString();
      if (qs) {
        targetUrl += (targetUrl.includes("?") ? "&" : "?") + qs;
      }

      const res = await fetch(targetUrl, {
        method: "GET",
        redirect: "follow"
      });

      const text = await res.text();

      return new Response(text, {
        status: res.status,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store"
        }
      });
    }

    if (method === "POST") {
      const body = await request.text();

      const res = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body,
        redirect: "follow"
      });

      const text = await res.text();

      return new Response(text, {
        status: res.status,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store"
        }
      });
    }

    return new Response(
      JSON.stringify({
        ok: false,
        message: "Method tidak didukung."
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: error?.message || String(error)
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      }
    );
  }
};
