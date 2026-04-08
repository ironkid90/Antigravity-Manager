cd C:\Users\Gabi\Documents\GitHub\Antigravity-Manager\context-orchestrator

$env:OPENAI_API_KEY = "sk-f111b7ebea97427d881d39a579aac729"
$env:OPENAI_BASE_URL = "http://127.0.0.1:8045/v1"

$env:CONTEXT_MCP_EMBEDDING_PROVIDER = "gemini"
$env:CONTEXT_MCP_EMBEDDING_API_KEY = "AIzaSyBovuE7xzgtEMUsjWVqj_aOPO9tlrshM48"
$env:CONTEXT_MCP_EMBEDDING_BASE_URL = "https://generativelanguage.googleapis.com/v1beta"
$env:CONTEXT_MCP_EMBEDDING_MODEL = "gemini-embedding-001"
$env:CONTEXT_MCP_EMBEDDING_DIMENSIONALITY = "3072"

npm run build
node dist\main.js