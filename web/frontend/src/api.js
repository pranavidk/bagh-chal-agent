// The only place the browser talks to the Python engine (web/server.py).

export async function api(path, body) {
  let res;
  try {
    res = await fetch(path, body === undefined ? {} : {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Can't reach the engine. Start it with: python -m web.server");
  }
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* not JSON */
  }
  if (!res.ok) throw new Error((data && data.error) || `The engine answered ${res.status}.`);
  return data;
}
