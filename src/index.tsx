import { serve } from "bun";

const server = serve({
  port: 5501,
  async fetch(req) {
    const url = new URL(req.url);
    
    // Serve index.html for root and all unmatched routes
    if (url.pathname === "/" || !url.pathname.startsWith("/src/")) {
      return new Response(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SynchroSource: Cognitive-Aware Autonomous Agent OS</title>
    <link rel="icon" type="image/svg+xml" href="./logo.svg" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.05); }
      }
      @keyframes star-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      .star-pulse {
        animation: star-pulse var(--duration) ease-in-out infinite;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./frontend.tsx"></script>
  </body>
</html>`, {
        headers: { "Content-Type": "text/html" }
      });
    }
    
    // Bun will automatically handle TSX/TS file serving with transpilation
    return new Response("Not found", { status: 404 });
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
