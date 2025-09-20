---
url: "https://docs.requesty.ai/frameworks/requests"
title: "Requests - Requesty documentation"
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

Frameworks

Requests

Frameworks

# Requests

Using Requesty router with Python Requests

Building an application with Python Requests, or any other REST API client?Using Requesty with Python Requests is straightforward - you just need to point your HTTP requests to the Requesty router endpoint.
This approach gives you maximum flexibility while still accessing all of Requesty’s powerful features.This simple integration unlocks powerful features, such as:

- [Fallback Policies](https://docs.requesty.ai/features/fallback-policies)
- [Load Balancing](https://docs.requesty.ai/features/load-balancing)
- [Auto Caching](https://docs.requesty.ai/features/auto-caching)
- [Request Metadata](https://docs.requesty.ai/features/request-metadata)
- …and many more.

All of this is available while maintaining full control over your HTTP requests.With Requesty, you can access over 250+ models from various providers. To specify a model, you must include the provider prefix, like `openai/gpt-4o-mini` or `anthropic/claude-sonnet-4-20250514`.
You can find the full list of available models in the [Model Library](https://app.requesty.ai/model-list).

## [​](https://docs.requesty.ai/frameworks/requests\#basic-usage)  Basic Usage

Here’s how to make a simple chat completion request using Python Requests:

Copy

```
import requests
import os

def chat_completion():
  # Safely load your API key from environment variables
  REQUESTY_API_KEY = os.environ.get("REQUESTY_API_KEY")

  if not REQUESTY_API_KEY:
      print("Error: REQUESTY_API_KEY environment variable not set.")
      return

  try:
    response = requests.post(
      'https://router.requesty.ai/v1/chat/completions',
      headers={
        'Authorization': f'Bearer {REQUESTY_API_KEY}',
        'Content-Type': 'application/json'
      },
      json={
        'model': "openai/gpt-4o",
        'messages': [\
          {'role': "user", 'content': "Hello, world!"}\
        ]
      }
    )
    response.raise_for_status() # Raise an HTTPError for bad responses (4xx or 5xx)

    print(response.json()['choices'][0]['message']['content'])
  except requests.exceptions.RequestException as e:
    print(f"Error: {e}")

chat_completion()

```

## [​](https://docs.requesty.ai/frameworks/requests\#streaming-responses)  Streaming Responses

For streaming responses, you can use Server-Sent Events:

Copy

```
import requests
import os
import json

def streaming_chat():
  REQUESTY_API_KEY = os.environ.get("REQUESTY_API_KEY")

  if not REQUESTY_API_KEY:
      print("Error: REQUESTY_API_KEY environment variable not set.")
      return

  try:
    response = requests.post(
      'https://router.requesty.ai/v1/chat/completions',
      headers={
        'Authorization': f'Bearer {REQUESTY_API_KEY}',
        'Content-Type': 'application/json'
      },
      json={
        'model': "openai/gpt-4o",
        'messages': [\
          {'role': "user", 'content': "Write a short story about AI"}\
        ],
        'stream': True
      },
      stream=True # Important for streaming
    )
    response.raise_for_status()

    for line in response.iter_lines():
      decoded_line = line.decode('utf-8')
      trimmed_line = decoded_line.strip()

      if not trimmed_line.startswith('data:'):
        continue

      data = trimmed_line[len('data:'):].strip()

      if data == '[DONE]':
        print('\nStream completed')
        break

      try:
        parsed = json.loads(data)
        content = parsed.get('choices', [{}])[0].get('delta', {}).get('content')
        if content:
          print(content, end='')
      except json.JSONDecodeError:
        # Skip invalid JSON lines
        pass

  except requests.exceptions.RequestException as e:
    print(f"Error: {e}")

streaming_chat()

```

[Previous](https://docs.requesty.ai/frameworks/axios) [OpenAILearn how to use Requesty with the OpenAI SDK\\
\\
Next](https://docs.requesty.ai/frameworks/openai)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [Basic Usage](https://docs.requesty.ai/frameworks/requests#basic-usage)
- [Streaming Responses](https://docs.requesty.ai/frameworks/requests#streaming-responses)

Assistant

Responses are generated using AI and may contain mistakes.