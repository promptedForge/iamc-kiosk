# LLM Architecture Plan for IAMC Intelligence Platform

## Overview

Centralized LLM management system supporting local and remote models for intelligence analysis, with built-in observability and privacy controls.

## Architecture Components

### 1. Core LLM Service (`/frontend/src/services/llm/`)

```typescript
// Base interface for all LLM providers
interface LLMProvider {
  id: string
  name: string
  type: 'local' | 'remote'
  privacy: 'PRIVATE' | 'NOT_PRIVATE'
  capabilities: Set<'chat' | 'rag' | 'reasoning' | 'embedding' | 'tool-calling'>
  isAvailable(): Promise<boolean>
  complete(prompt: string, config?: CompletionConfig): Promise<LLMResponse>
}
```

### 2. Provider Implementations

#### Remote API Providers (`/frontend/src/services/llm/providers/`)

1. **Anthropic Claude** (NOT_PRIVATE)
   - Models: claude-3-opus, claude-3-sonnet, claude-3-haiku
   - Capabilities: chat, reasoning, tool-calling
   - Via: /requesty-ai-docs endpoint

2. **OpenAI GPT** (NOT_PRIVATE)
   - Models: gpt-4, gpt-3.5-turbo
   - Capabilities: chat, reasoning, embedding, tool-calling
   - Via: /requesty-ai-docs endpoint

3. **Google Gemini** (NOT_PRIVATE)
   - Models: gemini-pro, gemini-ultra
   - Capabilities: chat, reasoning, multimodal
   - Via: /requesty-ai-docs endpoint

#### Local Model Providers

4. **Ollama Integration** (PRIVATE)
   ```typescript
   class OllamaProvider implements LLMProvider {
     // Stub implementation
     async listModels(): Promise<OllamaModel[]>
     async pull(model: string): Promise<void>
     async generate(model: string, prompt: string): Promise<string>
   }
   ```

5. **WASM Browser Models** (PRIVATE)
   ```typescript
   class WASMProvider implements LLMProvider {
     // Runs models directly in browser
     models: {
       'gemma-270m': { size: '270MB', capabilities: ['chat'] },
       'qwen-0.5b': { size: '500MB', capabilities: ['chat', 'tool-calling'] }
     }
   }
   ```

6. **Hybrid Orchestrator** (PRIVATE)
   ```typescript
   class HybridOrchestrator {
     // Qwen 3.2 3B quantized for reasoning & tool orchestration
     embedModel: WASMProvider // Small embed model
     reasoningModel: OllamaProvider // Local reasoning
     
     async orchestrate(task: Task): Promise<Result>
   }
   ```

### 3. Model Roles & Configuration

```typescript
interface LLMConfiguration {
  // Dual RAG models for cross-validation
  ragModels: {
    primary: LLMProvider    // Main retrieval model
    secondary: LLMProvider  // Validation model
  }
  
  // Conversation model for user interactions
  conversationModel: LLMProvider
  
  // Lab model with sub-agents
  labModel: {
    primary: LLMProvider
    subAgents: {
      hypothesis: LLMProvider     // Hypothesis generation
      backtest: LLMProvider      // Backtesting analysis
      scope: LLMProvider         // Scope analysis
    }
  }
}
```

### 4. Observability Layer

#### Arize AI Integration
```typescript
interface ArizeMonitor {
  // Production model monitoring
  logPrediction(model: string, input: any, output: any, metadata: any)
  logEmbedding(model: string, vector: number[], metadata: any)
  trackDrift(model: string, baseline: any, current: any)
  alertThreshold: { latency: 1000, errorRate: 0.05 }
}
```

#### Langfuse Integration
```typescript
interface LangfuseTracer {
  // LLM application observability
  traceGeneration(id: string, model: string, prompt: string, completion: string)
  trackChain(chainId: string, steps: TraceStep[])
  measureLatency(operation: string, duration: number)
  logCost(model: string, tokens: TokenUsage, cost: number)
}
```

### 5. UI Components

#### Model Selector (`/frontend/src/components/llm/`)

```tsx
function ModelSelector() {
  return (
    <div className="model-selector">
      <Select>
        <OptGroup label="Remote Models (NOT PRIVATE)">
          <Option value="claude-3-opus" icon="⚠️">Claude 3 Opus</Option>
          <Option value="gpt-4" icon="⚠️">GPT-4</Option>
        </OptGroup>
        <OptGroup label="Local Models (PRIVATE)">
          <Option value="ollama:llama3" icon="🔒">Llama 3 (Ollama)</Option>
          <Option value="wasm:gemma-270m" icon="🔒">Gemma 270M (Browser)</Option>
        </OptGroup>
      </Select>
    </div>
  )
}
```

#### Privacy Indicator
```tsx
function PrivacyIndicator({ provider }: { provider: LLMProvider }) {
  return (
    <div className={provider.privacy === 'PRIVATE' ? 'text-green-500' : 'text-yellow-500'}>
      {provider.privacy === 'PRIVATE' ? '🔒 Private' : '⚠️ NOT PRIVATE'}
    </div>
  )
}
```

### 6. API Endpoint Structure

```
/requesty-ai-docs
├── /complete
│   ├── POST { model, prompt, config }
│   └── Response: { text, usage, metadata }
├── /embed
│   ├── POST { model, texts[] }
│   └── Response: { embeddings[][], model }
├── /models
│   ├── GET
│   └── Response: { available[], status }
└── /health
    ├── GET
    └── Response: { providers[], latencies }
```

### 7. Implementation Phases

#### Phase 1: Core Infrastructure
- [ ] Base LLMProvider interface
- [ ] Remote provider implementations (Claude, GPT, Gemini)
- [ ] Model selector UI component
- [ ] Basic completion flow

#### Phase 2: Local Models
- [ ] Ollama provider stub
- [ ] WASM provider for small models
- [ ] Privacy indicators in UI
- [ ] Local model management

#### Phase 3: Advanced Features
- [ ] Dual RAG model support
- [ ] Lab model with sub-agents
- [ ] Hybrid orchestrator
- [ ] Model routing logic

#### Phase 4: Observability
- [ ] Arize integration for monitoring
- [ ] Langfuse for trace analysis
- [ ] Cost tracking
- [ ] Performance dashboards

### 8. Usage Examples

```typescript
// Initialize LLM service
const llmService = new LLMService({
  providers: [
    new AnthropicProvider({ apiKey: process.env.ANTHROPIC_KEY }),
    new OllamaProvider({ host: 'http://localhost:11434' }),
    new WASMProvider({ models: ['gemma-270m'] })
  ],
  monitoring: {
    arize: new ArizeMonitor({ apiKey: process.env.ARIZE_KEY }),
    langfuse: new LangfuseTracer({ apiKey: process.env.LANGFUSE_KEY })
  }
})

// Use in hypothesis generation
const hypothesis = await llmService.generate({
  model: 'claude-3-opus',
  prompt: buildHypothesisPrompt(scopeData),
  privacy: 'NOT_PRIVATE' // User warned about external API
})

// Local RAG query
const results = await llmService.rag({
  models: ['ollama:llama3', 'wasm:qwen-0.5b'],
  query: 'labor violations in textile sector',
  privacy: 'PRIVATE' // Runs locally
})
```

### 9. Security Considerations

1. **API Key Management**: Store in environment variables, never in code
2. **Privacy Labels**: Clear UI indicators for external API usage
3. **Data Sanitization**: Remove PII before sending to external models
4. **Audit Trail**: Log all external API calls with purpose
5. **Consent Flow**: Explicit user consent for NOT_PRIVATE operations

### 10. Performance Targets

- Local model load time: < 5s
- WASM model inference: < 500ms
- API response time: < 2s (p95)
- RAG retrieval: < 1s
- Orchestration overhead: < 100ms

---

This architecture provides a flexible, privacy-conscious foundation for integrating multiple LLM providers while maintaining clear boundaries between local and remote processing.