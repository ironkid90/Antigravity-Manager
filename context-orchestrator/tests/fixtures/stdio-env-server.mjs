import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

if (process.env.MCP_TEST_FLAG !== "expected") {
  console.error("MCP_TEST_FLAG was not forwarded to the stdio child process.");
  process.exit(1);
}

const server = new McpServer({
  name: "stdio-env-server",
  version: "1.0.0",
});

server.registerTool(
  "echo_env_status",
  {
    description: "Echoes whether the expected environment variable is present.",
    inputSchema: {},
  },
  async () => ({
    content: [
      {
        type: "text",
        text: process.env.MCP_TEST_FLAG ?? "missing",
      },
    ],
    structuredContent: { status: process.env.MCP_TEST_FLAG ?? "missing" },
  }),
);

const transport = new StdioServerTransport();
await server.connect(transport);
