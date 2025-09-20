---
url: "https://docs.requesty.ai/api-reference/overview"
title: "Overview - Requesty documentation"
---

[Requesty documentation home page![light logo](https://mintcdn.com/requesty/TcSPqkVK2WsRBepW/logo/light.svg?fit=max&auto=format&n=TcSPqkVK2WsRBepW&q=85&s=f1ef3ab41a5f4f9d4595a5bfd5fc0180)![dark logo](https://mintcdn.com/requesty/TcSPqkVK2WsRBepW/logo/dark.svg?fit=max&auto=format&n=TcSPqkVK2WsRBepW&q=85&s=3dc2f8739ecad9cb4ed85ba39cc5c2d2)](https://docs.requesty.ai/)

Search...

Ctrl K

##### Get Started

- [Getting started](https://docs.requesty.ai/quickstart)
- [Models](https://docs.requesty.ai/models)

##### Features

- [Streaming](https://docs.requesty.ai/features/streaming)
- [Structured Outputs](https://docs.requesty.ai/features/structured-outputs)
- [Reasoning](https://docs.requesty.ai/features/reasoning)
- [Fallback Policies](https://docs.requesty.ai/features/fallback-policies)
- [Load Balancing](https://docs.requesty.ai/features/load-balancing)
- [Spend Limits](https://docs.requesty.ai/features/api-limits)
- [Key Management API](https://docs.requesty.ai/features/key-management-api)
- [Auto Caching](https://docs.requesty.ai/features/auto-caching)
- [Dedicated Models](https://docs.requesty.ai/features/dedicated-models)
- [Prompt Optimization](https://docs.requesty.ai/features/prompt-optimization)
- [Prompt Library](https://docs.requesty.ai/features/prompt-library)
- [Bring Your Own Keys](https://docs.requesty.ai/features/bring-your-own-keys)
- [Request Metadata](https://docs.requesty.ai/features/request-metadata)
- [Request Feedback](https://docs.requesty.ai/features/request-feedback)
- [Smart Routing](https://docs.requesty.ai/features/smart-routing)
- [Session Reconstruction](https://docs.requesty.ai/features/session-reconstruction)

##### Enterprise Features

- [User Management](https://docs.requesty.ai/features/users)
- [Groups Management](https://docs.requesty.ai/features/groups)
- [Approved Models](https://docs.requesty.ai/features/approved-models)
- [Guardrails](https://docs.requesty.ai/features/guardrails)
- [RBAC (Role-Based Access Control)](https://docs.requesty.ai/features/rbac)

##### Applications

- [Claude Code](https://docs.requesty.ai/applications/claude-code)
- [Cline](https://docs.requesty.ai/applications/cline)
- [LibreChat](https://docs.requesty.ai/applications/librechat)
- [Roo Code](https://docs.requesty.ai/applications/roo-code)
- [OpenWebUI](https://docs.requesty.ai/applications/openwebui)
- [VS Code Extension](https://docs.requesty.ai/applications/VS-code-extension)

##### Frameworks

- [Axios](https://docs.requesty.ai/frameworks/axios)
- [Requests](https://docs.requesty.ai/frameworks/requests)
- [OpenAI](https://docs.requesty.ai/frameworks/openai)
- [LangChain](https://docs.requesty.ai/frameworks/langchain)
- [LlamaIndex TS](https://docs.requesty.ai/frameworks/llamaindex-ts)
- [Haystack](https://docs.requesty.ai/frameworks/haystack)
- [PydanticAI](https://docs.requesty.ai/frameworks/pydantic-ai)
- [Vercel AI SDK](https://docs.requesty.ai/frameworks/vercel-ai-sdk)

##### API Reference

- [Overview](https://docs.requesty.ai/api-reference/overview)
- [POST\\
\\
Create Chat Completion](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create)
- [POST\\
\\
Create Message](https://docs.requesty.ai/api-reference/endpoint/messages-create)
- [POST\\
\\
Create Embedding](https://docs.requesty.ai/api-reference/endpoint/embeddings-create)
- [GET\\
\\
List Models](https://docs.requesty.ai/api-reference/endpoint/models-list)
- [GET\\
\\
Get API Keys](https://docs.requesty.ai/api-reference/endpoint/manage-api-key-get)
- [POST\\
\\
Create API Key](https://docs.requesty.ai/api-reference/endpoint/manage-api-key-create)
- [GET\\
\\
Get API Key Usage](https://docs.requesty.ai/api-reference/endpoint/manage-api-key-get-usage)
- [POST\\
\\
Update API Key Limit](https://docs.requesty.ai/api-reference/endpoint/manage-api-key-update-limit)
- [DEL\\
\\
Delete API Key](https://docs.requesty.ai/api-reference/endpoint/manage-api-key-delete)
- [GET\\
\\
Get Organization Info](https://docs.requesty.ai/api-reference/endpoint/manage-org-get)

- [Join us on Discord](https://discord.com/invite/Td3rwAHgt4)
- [Go to the Platform](https://app.requesty.ai/)

[Requesty documentation home page![light logo](https://mintcdn.com/requesty/TcSPqkVK2WsRBepW/logo/light.svg?fit=max&auto=format&n=TcSPqkVK2WsRBepW&q=85&s=f1ef3ab41a5f4f9d4595a5bfd5fc0180)![dark logo](https://mintcdn.com/requesty/TcSPqkVK2WsRBepW/logo/dark.svg?fit=max&auto=format&n=TcSPqkVK2WsRBepW&q=85&s=3dc2f8739ecad9cb4ed85ba39cc5c2d2)](https://docs.requesty.ai/)

Search...

Ctrl K

- [Join us on Discord](https://discord.com/invite/Td3rwAHgt4)
- [Go to the Platform](https://app.requesty.ai/)
- [Go to the Platform](https://app.requesty.ai/)

Search...

Navigation

API Reference

Overview

API Reference

# Overview

An overview of Requestys API

Requesty normalizes the schema across models and providers, so you don’t waste time with custom integrations.

## [​](https://docs.requesty.ai/api-reference/overview\#endpoints)  Endpoints

Requesty provides two main endpoints:

### [​](https://docs.requesty.ai/api-reference/overview\#chat-completions-%2Fv1%2Fchat%2Fcompletions)  Chat Completions ( `/v1/chat/completions`)

For generating text completions and conversations with AI models.

### [​](https://docs.requesty.ai/api-reference/overview\#embeddings-%2Fv1%2Fembeddings)  Embeddings ( `/v1/embeddings`)

For creating vector embeddings from text, which can be used for semantic search, similarity matching, and other AI applications.

## [​](https://docs.requesty.ai/api-reference/overview\#chat-completions-request-structure)  Chat Completions Request Structure

Your request body to `/v1/chat/completions` closely follows the OpenAI Chat Completion schema:

- **Required Fields:**  - `messages`: An array of message objects with `role` and `content`
  - Roles can be `user`, `assistant`, `system`, or `tool`
  - `model`: The model name. If omitted, defaults to the user’s or payer’s default model. Here is a [full list of the supported models](https://app.requesty.ai/model-list)
- **Optional Fields:**  - `prompt`: Alternative to `messages` for some providers.
  - `stream`: A boolean to enable Server-Sent Events (SSE) streaming responses.
  - `max_tokens`, `temperature`, `top_p`, etc.: Standard language model parameters.
  - `tools / functions` : Allows function calling with a schema defined. See OpenAI’s [function calling documentation](https://platform.openai.com/docs/guides/structured-outputs) for the structure of these requests.
  - `tool_choice` : Specifies how tool calling should be handled.
  - `response_format` : For structured responses (some models only).

### [​](https://docs.requesty.ai/api-reference/overview\#example-request-body)  Example Request Body

Copy

```
{
  "model": "openai/gpt-4o-mini",
  "messages": [\
    {"role": "system", "content": "You are a helpful assistant."},\
    {"role": "user", "content": "What is the capital of France?"}\
  ],
  "max_tokens": 200,
  "temperature": 0.7,
  "stream": true,
  "tools": [\
    {\
      "type": "function",\
      "function": {\
        "name": "get_current_weather",\
        "description": "Get the current weather in a given location",\
        "parameters": {\
          "type": "object",\
          "properties": {\
            "location": {"type": "string", "description": "City and state"},\
            "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}\
          },\
          "required": ["location"]\
        }\
      }\
    }\
  ]
}

```

Here, we also provide a tool ( `get_current_weather`) that the model can call if it decides the user request involves weather data.Some request fields require a different function, for example if you use `response_format` you’ll need to update the request to `client.beta.chat.completions.parse` and you may want to use the Pydantic or Zod format for your structure.

## [​](https://docs.requesty.ai/api-reference/overview\#response-structure)  Response Structure

The response is normalized to an OpenAI-style ChatCompletion object:

1. Streaming: If `stream: true`, responses arrive incrementally as SSE events with `data: lines`. See [Streaming](https://requesty.mintlify.app/features/streaming) for documentation on streaming.
2. Function Calls (Tool Calls): If the model decides to call a tool, it will return a `function_call` in the assistant message. You then execute the tool, append the tool’s result as a `role: "tool"` message, and send a follow-up request. The LLM will then integrate the tool output into its final answer.

### [​](https://docs.requesty.ai/api-reference/overview\#non-streaming-response-example)  Non-Streaming Response Example

Copy

```
{
  "id": "chatcmpl-xyz123",
  "object": "chat.completion",
  "created": 1687623702,
  "model": "openai/gpt-4o",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 50,
    "total_tokens": 60
  },
  "choices": [\
    {\
      "index": 0,\
      "message": {\
        "role": "assistant",\
        "content": "The capital of France is Paris."\
      },\
      "finish_reason": "stop"\
    }\
  ]
}

```

Function Call Example:
If the model decides it needs the weather tool:

Copy

```
{
  "id": "chatcmpl-abc456",
  "object": "chat.completion",
  "created": 1687623800,
  "model": "openai/gpt-4o",
  "choices": [\
    {\
      "index": 0,\
      "message": {\
        "role": "assistant",\
        "content": null,\
        "function_call": {\
          "name": "get_current_weather",\
          "arguments": "{ "location": "Boston, MA"}"\
        }\
      },\
      "finish_reason": "function_call"\
    }\
  ]
}

```

You would then call the get\_current\_weather function externally, get the result, and send it back as:

Copy

```
{
  "model": "openai/gpt-4o",
  "messages": [\
    {"role": "user", "content": "What is the weather in Boston?"},\
    {\
      "role": "assistant",\
      "content": null,\
      "function_call": {\
        "name": "get_current_weather",\
        "arguments": "{ "location": "Boston, MA" }"\
      }\
    },\
    {\
      "role": "tool",\
      "name": "get_current_weather",\
      "content": "{"temperature": "22", "unit": "celsius", "description": "Sunny"}"\
    }\
  ]
}

```

The next completion will return a final answer integrating the tool’s response.

## [​](https://docs.requesty.ai/api-reference/overview\#embeddings-request-structure)  Embeddings Request Structure

Your request body to `/v1/embeddings` follows the OpenAI Embeddings schema:

- **Required Fields:**  - `input`: The text to embed. Can be a string, array of strings, array of tokens, or array of token arrays
  - `model`: The model name to use for embedding generation (e.g., `openai/text-embedding-3-small`)
- **Optional Fields:**  - `dimensions`: The number of dimensions for the output embeddings (only supported in text-embedding-3 and later models)
  - `encoding_format`: The format to return embeddings in ( `float` or `base64`, defaults to `float`)
  - `user`: A unique identifier representing your end-user

### [​](https://docs.requesty.ai/api-reference/overview\#example-embeddings-request-body)  Example Embeddings Request Body

Copy

```
{
  "model": "openai/text-embedding-3-small",
  "input": "The food was delicious and the service was excellent.",
  "encoding_format": "float"
}

```

For multiple texts:

Copy

```
{
  "model": "openai/text-embedding-3-small",
  "input": [\
    "The food was delicious and the service was excellent.",\
    "The restaurant had poor service and cold food.",\
    "Amazing atmosphere with friendly staff."\
  ],
  "encoding_format": "float"
}

```

## [​](https://docs.requesty.ai/api-reference/overview\#embeddings-response-structure)  Embeddings Response Structure

The response is normalized to an OpenAI-style Embedding object:

Copy

```
{
  "data": [\
    {\
      "embedding": [0.0023064255, -0.009327292, ...],\
      "index": 0,\
      "object": "embedding"\
    }\
  ],
  "model": "openai/text-embedding-3-small",
  "object": "list",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}

```

[Previous](https://docs.requesty.ai/frameworks/vercel-ai-sdk) [Create Chat CompletionCreate a chat completion using various AI models\\
\\
Next](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [Endpoints](https://docs.requesty.ai/api-reference/overview#endpoints)
- [Chat Completions (/v1/chat/completions)](https://docs.requesty.ai/api-reference/overview#chat-completions-%2Fv1%2Fchat%2Fcompletions)
- [Embeddings (/v1/embeddings)](https://docs.requesty.ai/api-reference/overview#embeddings-%2Fv1%2Fembeddings)
- [Chat Completions Request Structure](https://docs.requesty.ai/api-reference/overview#chat-completions-request-structure)
- [Example Request Body](https://docs.requesty.ai/api-reference/overview#example-request-body)
- [Response Structure](https://docs.requesty.ai/api-reference/overview#response-structure)
- [Non-Streaming Response Example](https://docs.requesty.ai/api-reference/overview#non-streaming-response-example)
- [Embeddings Request Structure](https://docs.requesty.ai/api-reference/overview#embeddings-request-structure)
- [Example Embeddings Request Body](https://docs.requesty.ai/api-reference/overview#example-embeddings-request-body)
- [Embeddings Response Structure](https://docs.requesty.ai/api-reference/overview#embeddings-response-structure)

Assistant

Responses are generated using AI and may contain mistakes.