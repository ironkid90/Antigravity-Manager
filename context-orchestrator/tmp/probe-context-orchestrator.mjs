import process from "node:process";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: process.execPath,
  args: ["dist/main.js"],
  cwd: process.cwd(),
  stderr: "pipe",
});

const client = new Client({
  name: "probe-context-orchestrator",
  version: "0.1.0",
});

try {
  await client.connect(transport);
  const result = await client.callTool({
    name: "probe_mcp_servers",
    arguments: {
      cwd: process.cwd(),
    },
  });

  console.log(JSON.stringify(result.structuredContent, null, 2));
} finally {
  await client.close().catch(() => undefined);
  await transport.close().catch(() => undefined);
}
