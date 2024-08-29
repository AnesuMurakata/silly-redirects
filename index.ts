import { serve } from 'bun';
import { isSuccess } from './std/result';
import { InMemoryRedirectStore } from "./infrastructure/InMemoryRedirectStore";

const redirectStore = InMemoryRedirectStore();

// Add the redirect entry for "my.domain.tld"
redirectStore.set({
  host: "my.domain.tld",
  destination: "https://seekdharma.com",
})();

const server = serve({
  port: 3000,
  async fetch(request) {

    const host = await request.headers.get("host");

    if (host) {
      const result = await redirectStore.getForPath(host)();

      if (isSuccess(result)) {
        return new Response(null, {
          status: 301,
          headers: {
            "Location": "https://seekdharma.com"}})
       
      } else {
        return new Response("Not Found", {
          status: 404,
          })
      }}

    return new Response("Bun!")
  },
})

console.log(`Listening on http://localhost:${server.port} ...`)
