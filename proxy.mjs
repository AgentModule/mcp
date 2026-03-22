import { createInterface } from 'readline';

const ENDPOINT = 'https://api.agent-module.dev/mcp';
const rl = createInterface({ input: process.stdin, terminal: false });

rl.on('line', async (line) => {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: line
    });
    const text = await res.text();
    process.stdout.write(text + '\n');
  } catch (e) {
    try {
      const req = JSON.parse(line);
      if (req.id) {
        process.stdout.write(JSON.stringify({
          jsonrpc: '2.0',
          id: req.id,
          error: { code: -32603, message: e.message }
        }) + '\n');
      }
    } catch (_) {}
  }
});
