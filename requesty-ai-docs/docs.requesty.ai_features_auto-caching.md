---
url: "https://docs.requesty.ai/features/auto-caching"
title: "Auto Caching - Requesty documentation"
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

Features

Auto Caching

Features

# Auto Caching

Control automatic caching behavior

The router provides an `auto_cache` flag that allows you to explicitly control the caching behavior for your requests on supported providers. This gives you finer-grained control over when a request’s response should be cached or retrieved from cache.

## [​](https://docs.requesty.ai/features/auto-caching\#how-auto-cache-works)  How Auto Cache Works

The `auto_cache` flag is a boolean parameter that can be sent within a custom `requesty` field in your request payload.

- **`"auto_cache": true`**: This will instruct the router to attempt to cache the response from the provider. If a similar request has been cached previously, it might be served from the cache (depending on the provider’s caching strategy and TTL).
- **`"auto_cache": false`**: This will instruct the router to bypass any automatic caching logic for this specific request and always fetch a fresh response from the provider.
- **If `auto_cache` is not provided**: The router falls back to a default caching behavior which can depend on the origin of the request (e.g., calls from Cline or Roo Code default to caching).

This flag provides an explicit override to the default caching logic determined by the request origin or other implicit factors.

## [​](https://docs.requesty.ai/features/auto-caching\#how-to-use-auto-cache)  How to Use Auto Cache

To use the `auto_cache` flag, include it within the `requesty` object in your request.

Copy

```
{
  "model": "openai/gpt-4",
  "messages": [{"role": "user", "content": "Tell me a joke."}],
  "requesty": {
    "auto_cache": true
  }
}

```

## [​](https://docs.requesty.ai/features/auto-caching\#example-with-auto-cache)  Example with Auto Cache

This example demonstrates how to set the `auto_cache` flag using the OpenAI Python client. The `requesty` field is passed as an additional parameter.

### [​](https://docs.requesty.ai/features/auto-caching\#python)  Python

Copy

```
import openai

requesty_api_key = "YOUR_REQUESTY_API_KEY"  # Safely load your API key

client = openai.OpenAI(
    api_key=requesty_api_key,
    base_url="https://router.requesty.ai/v1",
)

system_prompt = "YOUR ENTIRE KNOWLEDGEBASE"  # Replace this with you actual long prompt

response = client.chat.completions.create(
    model="vertex/anthropic/claude-3-7-sonnet",
    messages=[\
        {"role": "system", "content": system_prompt},\
        {"role": "user", "content": "What is the capital of France?"}\
    ],
    extra_body={
        "requesty": {
            "auto_cache": True
        }
    }
)
print("Response:", response.choices[0].message.content)

```

### [​](https://docs.requesty.ai/features/auto-caching\#javascript)  Javascript

Copy

```
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: "YOUR_REQUESTY_API_KEY",
  baseURL: "https://router.requesty.ai/v1",
});

// Make request with auto_cache enabled
const response = await client.chat.completions.create({
  model: "anthropic/claude-3-7-sonnet-latest",
  messages: [\
    { role: "system", content: "YOUR ENTIRE KNOWLEDGEBASE" },\
    { role: "user", content: "What is the capital of France?" }\
  ],
  requesty: {
    auto_cache: true
  }
});

console.log("Response:", response.choices[0].message.content);

```

## [​](https://docs.requesty.ai/features/auto-caching\#important-notes)  Important Notes

1. **Explicit Control**: `auto_cache` provides explicit control. `true` attempts to cache, `false` prevent caching for providers where cache writes incur extra costs.
2. **Default Behavior**: If `auto_cache` is not specified in the `requesty` field, the caching behavior reverts to defaults.
3. **Provider Support**: This flag is respected by providers/models where cache writes incur extra costs, e.g. Anthropic and Gemini.

[Previous](https://docs.requesty.ai/features/key-management-api) [Dedicated ModelsApplication-specific models\\
\\
Next](https://docs.requesty.ai/features/dedicated-models)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [How Auto Cache Works](https://docs.requesty.ai/features/auto-caching#how-auto-cache-works)
- [How to Use Auto Cache](https://docs.requesty.ai/features/auto-caching#how-to-use-auto-cache)
- [Example with Auto Cache](https://docs.requesty.ai/features/auto-caching#example-with-auto-cache)
- [Python](https://docs.requesty.ai/features/auto-caching#python)
- [Javascript](https://docs.requesty.ai/features/auto-caching#javascript)
- [Important Notes](https://docs.requesty.ai/features/auto-caching#important-notes)

Assistant

Responses are generated using AI and may contain mistakes.