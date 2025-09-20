---
url: "https://docs.requesty.ai/api-reference/endpoint/models-list"
title: "List Models - Requesty documentation"
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

List Models

API Reference

# List Models

Get all available models. If authenticated with a Requesty API key, returns only approved models for your organization. Otherwise, returns all public models.

GET

/

v1

/

models

Try it

List available models

cURL

Copy

```
curl --request GET \
  --url https://router.requesty.ai/v1/models
```

200

401

Copy

```
{
  "object": "list",
  "data": [\
    {\
      "id": "<string>",\
      "object": "model",\
      "created": 123,\
      "owned_by": "system",\
      "input_price": 123,\
      "caching_price": 123,\
      "cached_price": 123,\
      "output_price": 123,\
      "max_output_tokens": 123,\
      "context_window": 123,\
      "supports_caching": true,\
      "supports_vision": true,\
      "supports_computer_use": true,\
      "supports_reasoning": true,\
      "description": "<string>"\
    }\
  ]
}
```

#### Headers

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#parameter-authorization)

Authorization

string

Optional Bearer token with your Requesty API key to get only approved models for your organization

#### Response

200

application/json

List of available models

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-object)

object

enum<string>

required

The object type, always 'list'

Available options:

`list`

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data)

data

object\[\]

required

The list of available models

Show child attributes

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data-id)

id

string

The model identifier (e.g., 'openai/gpt-5-mini')

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data-object)

object

enum<string>

The object type, always 'model'

Available options:

`model`

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data-created)

created

integer

The Unix timestamp (in seconds) when the model was created

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data-owned-by)

owned\_by

string

The system or organization that owns the model

Example:

`"system"`

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data-input-price)

input\_price

number

Price per input token in USD

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data-caching-price)

caching\_price

number

Price per token for caching in USD

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data-cached-price)

cached\_price

number

Price per cached token in USD

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data-output-price)

output\_price

number

Price per output token in USD

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data-max-output-tokens)

max\_output\_tokens

integer

Maximum number of output tokens the model can generate

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data-context-window)

context\_window

integer

Maximum context window size in tokens

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data-supports-caching)

supports\_caching

boolean

Whether the model supports caching

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data-supports-vision)

supports\_vision

boolean

Whether the model supports vision/image inputs

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data-supports-computer-use)

supports\_computer\_use

boolean

Whether the model supports computer use capabilities

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data-supports-reasoning)

supports\_reasoning

boolean

Whether the model supports reasoning capabilities

[​](https://docs.requesty.ai/api-reference/endpoint/models-list#response-data-description)

description

string

A description of the model's capabilities and use cases

[Previous](https://docs.requesty.ai/api-reference/endpoint/embeddings-create) [Get API KeysRetrieve all existing API keys for the organization\\
\\
Next](https://docs.requesty.ai/api-reference/endpoint/manage-api-key-get)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

List available models

cURL

Copy

```
curl --request GET \
  --url https://router.requesty.ai/v1/models
```

200

401

Copy

```
{
  "object": "list",
  "data": [\
    {\
      "id": "<string>",\
      "object": "model",\
      "created": 123,\
      "owned_by": "system",\
      "input_price": 123,\
      "caching_price": 123,\
      "cached_price": 123,\
      "output_price": 123,\
      "max_output_tokens": 123,\
      "context_window": 123,\
      "supports_caching": true,\
      "supports_vision": true,\
      "supports_computer_use": true,\
      "supports_reasoning": true,\
      "description": "<string>"\
    }\
  ]
}
```

Assistant

Responses are generated using AI and may contain mistakes.