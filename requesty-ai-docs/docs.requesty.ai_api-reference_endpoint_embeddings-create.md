---
url: "https://docs.requesty.ai/api-reference/endpoint/embeddings-create"
title: "Create Embedding - Requesty documentation"
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

Create Embedding

API Reference

# Create Embedding

Create embeddings for text using various AI models

POST

/

v1

/

embeddings

Try it

Create embedding

cURL

Copy

```
curl --request POST \
  --url https://router.requesty.ai/v1/embeddings \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "input": "<string>",
  "model": "openai/text-embedding-3-small",
  "dimensions": 123,
  "encoding_format": "float",
  "user": "<string>"
}'
```

200

400

401

Copy

```
{
  "data": [\
    {\
      "embedding": [\
        123\
      ],\
      "index": 123,\
      "object": "<string>"\
    }\
  ],
  "model": "<string>",
  "object": "<string>",
  "usage": {
    "prompt_tokens": 123,
    "total_tokens": 123
  }
}
```

#### Authorizations

[​](https://docs.requesty.ai/api-reference/endpoint/embeddings-create#authorization-authorization)

Authorization

string

header

required

API key for authentication

#### Body

application/json

[​](https://docs.requesty.ai/api-reference/endpoint/embeddings-create#body-input)

input

stringstring\[\]integer\[\]integer\[\]\[\]

required

Input text to embed, encoded as a string, array of strings, array of tokens, or array of token arrays
A single text string to embed

[​](https://docs.requesty.ai/api-reference/endpoint/embeddings-create#body-model)

model

string

required

The model name to use for embedding generation

Example:

`"openai/text-embedding-3-small"`

[​](https://docs.requesty.ai/api-reference/endpoint/embeddings-create#body-dimensions)

dimensions

integer

The number of dimensions the resulting output embeddings should have

[​](https://docs.requesty.ai/api-reference/endpoint/embeddings-create#body-encoding-format)

encoding\_format

enum<string>

default:float

The format to return the embeddings in. Can be either float or base64.

Available options:

`float`,

`base64`

[​](https://docs.requesty.ai/api-reference/endpoint/embeddings-create#body-user)

user

string

A unique identifier representing your end-user.

#### Response

200

application/json

Embedding response

[​](https://docs.requesty.ai/api-reference/endpoint/embeddings-create#response-data)

data

object\[\]

required

The list of embeddings generated by the model

Show child attributes

[​](https://docs.requesty.ai/api-reference/endpoint/embeddings-create#response-data-embedding)

embedding

number\[\]string

required

The embedding vector, the format of which is determined by the encoding\_format parameter
The embedding vector as an array of floats

[​](https://docs.requesty.ai/api-reference/endpoint/embeddings-create#response-data-index)

index

integer

required

The index of the embedding in the list

[​](https://docs.requesty.ai/api-reference/endpoint/embeddings-create#response-data-object)

object

string

required

The object type, which is always 'embedding'

[​](https://docs.requesty.ai/api-reference/endpoint/embeddings-create#response-model)

model

string

required

The name of the model used to generate the embedding

[​](https://docs.requesty.ai/api-reference/endpoint/embeddings-create#response-object)

object

string

required

The object type, which is always 'list'

[​](https://docs.requesty.ai/api-reference/endpoint/embeddings-create#response-usage)

usage

object

required

Show child attributes

[​](https://docs.requesty.ai/api-reference/endpoint/embeddings-create#response-usage-prompt-tokens)

usage.prompt\_tokens

integer

required

The number of tokens used by the prompt

[​](https://docs.requesty.ai/api-reference/endpoint/embeddings-create#response-usage-total-tokens)

usage.total\_tokens

integer

required

The total number of tokens used by the request

[Previous](https://docs.requesty.ai/api-reference/endpoint/messages-create) [List ModelsGet all available models. If authenticated with a Requesty API key, returns only approved models for your organization. Otherwise, returns all public models.\\
\\
Next](https://docs.requesty.ai/api-reference/endpoint/models-list)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

Create embedding

cURL

Copy

```
curl --request POST \
  --url https://router.requesty.ai/v1/embeddings \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "input": "<string>",
  "model": "openai/text-embedding-3-small",
  "dimensions": 123,
  "encoding_format": "float",
  "user": "<string>"
}'
```

200

400

401

Copy

```
{
  "data": [\
    {\
      "embedding": [\
        123\
      ],\
      "index": 123,\
      "object": "<string>"\
    }\
  ],
  "model": "<string>",
  "object": "<string>",
  "usage": {
    "prompt_tokens": 123,
    "total_tokens": 123
  }
}
```

Assistant

Responses are generated using AI and may contain mistakes.