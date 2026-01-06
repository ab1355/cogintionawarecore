/**
 * CTO Zara - Technical Architecture Agent
 * Focus: System design, security, and cognitive interface infrastructure.
 */

import { Hono } from 'hono';
import { Context } from 'hono';
import { CTOZara } from '../../packages/agents/c-suite/zara';

const app = new Hono();

// Custom static file serving for React app
app.get('/src/*', async (c) => {
  const path = c.req.path;
  const fs = await import('node:fs/promises');
  const pathModule = await import('node:path');
  
  const filePath = pathModule.join(process.cwd(), path);
  
  try {
    let fileContent = await fs.readFile(filePath, 'utf-8');
    
    // Transpile TypeScript/TSX files to JavaScript using Bun.build
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      const buildResult = await Bun.build({
        entrypoints: [filePath],
        write: false,
        bundle: false,
        target: 'browser',
      });
      fileContent = buildResult.outputs[0].text;
    }
    
    const contentType = filePath.endsWith('.js') ? 'application/javascript' :
                     filePath.endsWith('.css') ? 'text/css' :
                     filePath.endsWith('.svg') ? 'image/svg+xml' :
                     filePath.endsWith('.tsx') ? 'application/javascript' :
                     filePath.endsWith('.ts') ? 'application/javascript' :
                     filePath.endsWith('.json') ? 'application/json' :
                     'text/plain';
    
    return new Response(fileContent, {
      headers: { 'Content-Type': contentType }
    });
  } catch (error) {
    return c.text('File not found', 404);
  }
});

// Initialize the CTO Zara agent
const zara = new CTOZara();

// Serve the main index.html for the UI
app.get('/', async (c: Context) => {
  // Return the HTML for the React app with Tailwind CSS
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SynchroSource: Cognitive-Aware Autonomous Agent OS</title>
    <link rel="icon" type="image/svg+xml" href="/src/logo.svg" />
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
    <script type="module" src="/src/frontend.tsx"></script>
  </body>
</html>`;
  return c.html(html);
});

// API routes
app.get('/api/status', async (c: Context) => {
  const environment = await zara.architectEnvironment('Orrery');
  const security = await zara.auditSystemSecurity();
  
  return c.json({
    status: 'operational',
    environment,
    security,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/agents/cto', async (c: Context) => {
  const security = await zara.auditSystemSecurity();
  return c.json(security);
});

// API route for agent factory
app.get('/api/agents/spawn', async (c: Context) => {
  // Placeholder for agent spawning functionality
  return c.json({
    message: 'Agent factory endpoint',
    status: 'ready'
  });
});

// Export for Hono to handle the port
const port = Number.parseInt(process.env.PORT ?? '5501');

export default {
  fetch: app.fetch,
  port
};