import path from "node:path";
import process from "node:process";

import { loadConfig } from "../dist/config.js";
import { createEmbeddingService } from "../dist/services/embeddings.js";
import { listMcpServerInventory, IndexService } from "../dist/services/index-service.js";
import { OpenAIService } from "../dist/services/openai.js";
import { createQdrantClient } from "../dist/services/qdrant.js";
import { CacheRepository } from "../dist/storage/cache.js";
import { ArtifactRepository } from "../dist/storage/index.js";
import { SqliteStore } from "../dist/storage/sqlite.js";

const configPath = path.join(process.env.USERPROFILE ?? "", ".codex", "config.toml");
const entry = listMcpServerInventory([configPath]).find((item) => item.name === "context_orchestrator");
if (!entry?.env) {
  throw new Error("No context_orchestrator env found in parsed MCP inventory.");
}

Object.assign(process.env, entry.env);

const config = loadConfig();
const sqlite = new SqliteStore(config.sqlitePath);
const cache = new CacheRepository(sqlite);
const artifacts = new ArtifactRepository(sqlite, config.artifactsDir);
const qdrant = createQdrantClient(config.qdrantUrl, config.qdrantApiKey);
const openai = new OpenAIService(config.openaiApiKey, config.openaiBaseUrl);
const embeddings = createEmbeddingService(config, openai);
const indexService = new IndexService(config, qdrant, embeddings, cache, artifacts);

try {
  await indexService.bootstrap();
  console.log(JSON.stringify({ ok: true }, null, 2));
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
