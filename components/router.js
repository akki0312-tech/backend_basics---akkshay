export function matchRoute(routes, method, path) {
  const parts = path.split("/").filter(Boolean);
  let pathMatch = null;
  for (const route of routes) {
    const rp = route.path.split("/").filter(Boolean);
    if (rp.length !== parts.length) continue;
    const params = {};
    const ok = rp.every((seg, i) => {
      if (seg.startsWith(":")) {
        params[seg.slice(1)] = parts[i];
        return true;
      }
      return seg === parts[i];
    });
    if (!ok) continue;
    if (route.method === method) return { route, params, status: 200 };
    pathMatch = pathMatch ?? route;
  }
  return pathMatch ? { route: pathMatch, params: {}, status: 405 } : { route: null, params: {}, status: 404 };
}
