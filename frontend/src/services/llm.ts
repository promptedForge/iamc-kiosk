/**
 * Requesty.ai LLM Service
 * Centralized service for all LLM interactions using Requesty.ai router
 */

interface RequestyModel {
  id: string
  object: 'model'
  created: number
  owned_by: string
  input_price: number
  caching_price?: number
  cached_price?: number
  output_price: number
  max_output_tokens: number
  context_window: number
  supports_caching?: boolean
  supports_vision?: boolean
  supports_computer_use?: boolean
  supports_reasoning?: boolean
  description?: string
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ChatCompletionRequest {
  model: string
  messages: ChatMessage[]
  temperature?: number
  max_tokens?: number
  stream?: boolean
  requesty?: {
    auto_cache?: boolean
    metadata?: Record<string, any>
  }
}

interface ChatCompletionResponse {
  id: string
  object: 'chat.completion'
  created: number
  model: string
  choices: Array<{
    index: number
    message: ChatMessage
    finish_reason: string
  }>
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

class RequestyLLMService {
  private baseURL = 'https://router.requesty.ai/v1'
  private apiKey: string
  private cachedModels: RequestyModel[] | null = null
  private modelsFetchedAt: number = 0
  private modelsCacheDuration = 5 * 60 * 1000 // 5 minutes

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Fetch available models from Requesty
   * Uses caching to avoid repeated API calls
   */
  async getModels(): Promise<RequestyModel[]> {
    const now = Date.now()
    
    // Return cached models if still valid
    if (this.cachedModels && (now - this.modelsFetchedAt) < this.modelsCacheDuration) {
      return this.cachedModels
    }

    try {
      const response = await fetch(`${this.baseURL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.statusText}`)
      }

      const data = await response.json()
      this.cachedModels = data.data
      this.modelsFetchedAt = now
      
      return this.cachedModels
    } catch (error) {
      console.error('Error fetching models:', error)
      // Return some default models as fallback
      return this.getDefaultModels()
    }
  }

  /**
   * Get categorized models for UI display
   */
  async getCategorizedModels() {
    const models = await this.getModels()
    
    const categorized = {
      reasoning: models.filter(m => m.supports_reasoning),
      vision: models.filter(m => m.supports_vision),
      fast: models.filter(m => m.id.includes('mini') || m.id.includes('flash') || m.id.includes('haiku')),
      standard: models.filter(m => 
        !m.supports_reasoning && 
        !m.supports_vision && 
        !m.id.includes('mini') && 
        !m.id.includes('flash') && 
        !m.id.includes('haiku')
      )
    }

    return categorized
  }

  /**
   * Create a chat completion
   */
  async createChatCompletion(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...request,
        requesty: {
          auto_cache: true, // Enable caching by default
          ...request.requesty
        }
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Chat completion failed: ${error}`)
    }

    return response.json()
  }

  /**
   * Create a streaming chat completion
   */
  async createStreamingChatCompletion(
    request: ChatCompletionRequest,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...request,
        stream: true,
        requesty: {
          auto_cache: true,
          ...request.requesty
        }
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Streaming chat completion failed: ${error}`)
    }

    const reader = response.body?.getReader()
    if (!reader) throw new Error('No response body')

    const decoder = new TextDecoder()
    
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      
      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n').filter(line => line.trim())
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') return
          
          try {
            const json = JSON.parse(data)
            const content = json.choices?.[0]?.delta?.content
            if (content) onChunk(content)
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }
  }

  /**
   * Generate hypotheses based on pattern data
   */
  async generateHypotheses(patternData: any, model: string = 'anthropic/claude-sonnet-4-20250514-1m'): Promise<string> {
    const prompt = `Analyze the following pattern data and generate actionable hypotheses for human rights monitoring:

Pattern Data:
${JSON.stringify(patternData, null, 2)}

Generate 2-3 specific hypotheses that:
1. Identify potential early warning signals
2. Suggest concrete investigation actions
3. Include confidence levels and lead time estimates
4. Reference specific data points from the pattern

Format as JSON array with fields: text, confidence, lead_days, factors, actions`

    const response = await this.createChatCompletion({
      model,
      messages: [
        {
          role: 'system',
          content: 'You are an intelligence analyst specializing in human rights pattern recognition and early warning systems.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2048
    })

    return response.choices[0].message.content
  }

  /**
   * Get default models as fallback
   */
  private getDefaultModels(): RequestyModel[] {
    return [
      {
        id: 'anthropic/claude-sonnet-4-20250514-1m',
        object: 'model',
        created: Date.now(),
        owned_by: 'anthropic',
        input_price: 0.003,
        output_price: 0.015,
        max_output_tokens: 8192,
        context_window: 200000,
        supports_caching: true,
        description: 'Claude 4 Sonnet - Latest and most capable model'
      },
      {
        id: 'openai/gpt-4o-mini',
        object: 'model',
        created: Date.now(),
        owned_by: 'openai',
        input_price: 0.00015,
        output_price: 0.0006,
        max_output_tokens: 16384,
        context_window: 128000,
        supports_vision: true,
        description: 'Fast and affordable for most tasks'
      },
      {
        id: 'google/gemini-2.0-flash-exp',
        object: 'model',
        created: Date.now(),
        owned_by: 'google',
        input_price: 0.00025,
        output_price: 0.001,
        max_output_tokens: 8192,
        context_window: 1048576,
        supports_vision: true,
        supports_caching: true,
        description: 'Experimental model with huge context window'
      }
    ]
  }
}

// Export singleton instance
let llmServiceInstance: RequestyLLMService | null = null

export function initializeLLMService(apiKey: string) {
  llmServiceInstance = new RequestyLLMService(apiKey)
  return llmServiceInstance
}

export function getLLMService(): RequestyLLMService {
  if (!llmServiceInstance) {
    throw new Error('LLM Service not initialized. Call initializeLLMService first.')
  }
  return llmServiceInstance
}

export { RequestyLLMService, type RequestyModel, type ChatMessage, type ChatCompletionRequest }