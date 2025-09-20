---
url: "https://docs.requesty.ai/api-reference/endpoint/chat-completions-create"
title: "Create Chat Completion - Requesty documentation"
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

Create Chat Completion

API Reference

# Create Chat Completion

Create a chat completion using various AI models

POST

/

v1

/

chat

/

completions

Try it

Create chat completion

cURL

Copy

```
curl --request POST \
  --url https://router.requesty.ai/v1/chat/completions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "model": "openai/gpt-4o-mini",
  "messages": [\
    {\
      "role": "user",\
      "content": "<string>",\
      "name": "<string>"\
    }\
  ],
  "max_tokens": 123,
  "temperature": 123,
  "top_p": 123,
  "stream": true,
  "tools": [\
    {\
      "type": "function",\
      "function": {\
        "name": "<string>",\
        "description": "<string>",\
        "parameters": {}\
      }\
    }\
  ],
  "tool_choice": "<string>",
  "response_format": {}
}'
```

200

400

401

Copy

```
{
  "id": "<string>",
  "object": "<string>",
  "created": 123,
  "model": "<string>",
  "usage": {
    "prompt_tokens": 123,
    "completion_tokens": 123,
    "total_tokens": 123
  },
  "choices": [\
    {\
      "index": 123,\
      "message": {\
        "role": "user",\
        "content": "<string>",\
        "name": "<string>"\
      },\
      "finish_reason": "<string>"\
    }\
  ]
}
```

#### Authorizations

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#authorization-authorization)

Authorization

string

header

required

API key for authentication

#### Body

application/json

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#body-messages)

messages

object\[\]

required

An array of message objects with role and content

Show child attributes

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#body-messages-role)

role

enum<string>

required

The role of the message sender

Available options:

`user`,

`assistant`,

`system`,

`tool`

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#body-messages-content)

content

string

required

The content of the message

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#body-messages-name)

name

string

The name of the tool (for tool messages)

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#body-model)

model

string

default:openai/gpt-4o-mini

The model name. If omitted, defaults to openai/gpt-4o-mini.

Example:

`"openai/gpt-4o-mini"`

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#body-max-tokens)

max\_tokens

integer

Maximum number of tokens to generate

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#body-temperature)

temperature

number

Controls randomness of the output

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#body-top-p)

top\_p

number

Controls diversity of the output

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#body-stream)

stream

boolean

Enable Server-Sent Events (SSE) streaming responses

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#body-tools)

tools

object\[\]

Available tools for function calling

Show child attributes

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#body-tools-type)

type

enum<string>

required

The type of tool

Available options:

`function`

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#body-tools-function)

function

object

required

Show child attributes

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#body-tool-choice)

tool\_choice

string

Specifies how tool calling should be handled

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#body-response-format)

response\_format

object

For structured responses (some models only)

#### Response

200

application/json

Chat completion response

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#response-id)

id

string

required

Unique identifier for the completion

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#response-object)

object

string

required

Object type

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#response-created)

created

integer

required

Timestamp of creation

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#response-model)

model

string

required

Model used for completion

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#response-choices)

choices

object\[\]

required

Show child attributes

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#response-choices-index)

index

integer

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#response-choices-message)

message

object

Show child attributes

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#response-choices-finish-reason)

finish\_reason

string

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#response-usage)

usage

object

Show child attributes

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#response-usage-prompt-tokens)

usage.prompt\_tokens

integer

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#response-usage-completion-tokens)

usage.completion\_tokens

integer

[​](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create#response-usage-total-tokens)

usage.total\_tokens

integer

[Previous](https://docs.requesty.ai/api-reference/overview) [Create MessageSend a message to an Anthropic-compatible model and receive a response\\
\\
Next](https://docs.requesty.ai/api-reference/endpoint/messages-create)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

Create chat completion

cURL

Copy

```
curl --request POST \
  --url https://router.requesty.ai/v1/chat/completions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "model": "openai/gpt-4o-mini",
  "messages": [\
    {\
      "role": "user",\
      "content": "<string>",\
      "name": "<string>"\
    }\
  ],
  "max_tokens": 123,
  "temperature": 123,
  "top_p": 123,
  "stream": true,
  "tools": [\
    {\
      "type": "function",\
      "function": {\
        "name": "<string>",\
        "description": "<string>",\
        "parameters": {}\
      }\
    }\
  ],
  "tool_choice": "<string>",
  "response_format": {}
}'
```

200

400

401

Copy

```
{
  "id": "<string>",
  "object": "<string>",
  "created": 123,
  "model": "<string>",
  "usage": {
    "prompt_tokens": 123,
    "completion_tokens": 123,
    "total_tokens": 123
  },
  "choices": [\
    {\
      "index": 123,\
      "message": {\
        "role": "user",\
        "content": "<string>",\
        "name": "<string>"\
      },\
      "finish_reason": "<string>"\
    }\
  ]
}
```

Assistant

Responses are generated using AI and may contain mistakes.