---
url: "https://docs.requesty.ai/features/streaming"
title: "Streaming - Requesty documentation"
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

Streaming

Features

# Streaming

Receive the response in a stream

The router supports streaming responses from all providers (OpenAI, Anthropic, Mistral) using Server-Sent Events (SSE). Streaming allows you to receive and process the response token by token instead of waiting for the complete response.

#### [​](https://docs.requesty.ai/features/streaming\#how-to-use-streaming)  How to Use Streaming

- Enable streaming by setting `stream=True` in your request
- The response will be a stream of chunks that you need to iterate over
- Each chunk contains a delta of the response in the same format as the OpenAI API

#### [​](https://docs.requesty.ai/features/streaming\#python-example-with-streaming%3A)  Python Example with Streaming:

Copy

```
import openai

client = openai.OpenAI(
    api_key=ROUTER_API_KEY,
    base_url="https://router.requesty.ai/v1",
)

response = client.chat.completions.create(
    model="openai/gpt-4",
    messages=[{"role": "user", "content": "Write a poem about the stars."}],
    stream=True
)

# Iterate over the stream and handle chunks
for chunk in response:
    # Access content from the chunk (if present)
    if chunk.choices[0].delta.content is not None:
        content = chunk.choices[0].delta.content
        print(content, end="", flush=True)  # Print content as it arrives
    # Handle function calls in streaming (if present)
    if hasattr(chunk.choices[0].delta, 'function_call'):
        fc = chunk.choices[0].delta.function_call
        if hasattr(fc, 'name') and fc.name:
            print(f"\nFunction Call: {fc.name}")
        if hasattr(fc, 'arguments') and fc.arguments:
            print(f"Arguments: {fc.arguments}")

```

#### [​](https://docs.requesty.ai/features/streaming\#important-notes)  Important Notes

1. Content Access:

- Always check if `delta.content` is not None before using it
- Content comes in small chunks that you may want to collect into a full response

2. Function Calls

- Function calls are also streamed and come through the `delta.function_call` property
- Check for both name and arguments as they might come in separate chunks

3. Error Handling

- Wrap streaming code in try/except to handle potential connection issues
- The stream might end early if there are errors

4. Best Practices

- Use `flush=True` when printing to see output immediately
- Consider collecting chunks if you need the complete response
- For production, implement proper error handling and retry logic

### [​](https://docs.requesty.ai/features/streaming\#example%3A-collecting-complete-response)  Example: Collecting Complete Response

Copy

```
collected_messages = []
for chunk in response:
    if chunk.choices[0].delta.content is not None:
        content = chunk.choices[0].delta.content
        collected_messages.append(content)

full_response = "".join(collected_messages)

```

### [​](https://docs.requesty.ai/features/streaming\#supported-features-in-streaming)  Supported Features in Streaming

- Text completion streaming
- Function calling streaming
- Tool calls streaming
- System messages
- Temperature and other parameters

[Previous](https://docs.requesty.ai/models) [Structured OutputsGet consistent JSON responses across different LLMs\\
\\
Next](https://docs.requesty.ai/features/structured-outputs)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [How to Use Streaming](https://docs.requesty.ai/features/streaming#how-to-use-streaming)
- [Python Example with Streaming:](https://docs.requesty.ai/features/streaming#python-example-with-streaming%3A)
- [Important Notes](https://docs.requesty.ai/features/streaming#important-notes)
- [Example: Collecting Complete Response](https://docs.requesty.ai/features/streaming#example%3A-collecting-complete-response)
- [Supported Features in Streaming](https://docs.requesty.ai/features/streaming#supported-features-in-streaming)

Assistant

Responses are generated using AI and may contain mistakes.