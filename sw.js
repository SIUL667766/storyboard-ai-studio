/* Storyboard AI Studio — service worker */
const CACHE = "storyboard-ai-v5";
const PRECACHE = [
  "./",
  "./index.html",
  "./app.0.b64",
  "./app.1.b64",
  "./app.2.b64",
  "./app.3a.hex",
  "./app.3b.hex",
  "./manifest.webmanifest",
  "./sw.js",
  "./icons/icon-192.svg",
  "./icons/icon-512.svg",
  "./chars/elena-avatar.svg"
];
const OPTIONAL = ["./app.html", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(PRECACHE);
    await Promise.all(OPTIONAL.map((u) => cache.add(u).catch(() => null)));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function isNetworkPreferred(url) {
  try {
    const u = new URL(url);
    if (u.origin === self.location.origin) return false;
    if (u.hostname.includes("pollinations.ai")) return true;
    if (u.pathname.includes("/prompt/")) return true;
    if (/\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(u.pathname)) return true;
    return true;
  } catch (_) {
    return false;
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = req.url;

  if (isNetworkPreferred(url)) {
    event.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const copy = res.clone();
        if (res.ok && new URL(url).origin === self.location.origin) {
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => {
        if (req.mode === "navigate") return caches.match("./index.html");
        return cached;
      });
    })
  );
});
