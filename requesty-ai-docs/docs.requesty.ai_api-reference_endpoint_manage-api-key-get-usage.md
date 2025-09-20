---
url: "https://docs.requesty.ai/api-reference/endpoint/manage-api-key-get-usage"
title: "Get API Key Usage - Requesty documentation"
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

Get API Key Usage

API Reference

# Get API Key Usage

Get usage information for a specific API key

GET

/

v1

/

manage

/

apikey

/

{api\_key\_id}

Try it

Get API key usage

cURL

Copy

```
curl --request GET \
  --url https://api.requesty.ai/v1/manage/apikey/{api_key_id} \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

404

Copy

```
{
  "completions_requests": 123,
  "spend": 123
}
```

#### Authorizations

[​](https://docs.requesty.ai/api-reference/endpoint/manage-api-key-get-usage#authorization-authorization)

Authorization

string

header

required

API key for authentication

#### Path Parameters

[​](https://docs.requesty.ai/api-reference/endpoint/manage-api-key-get-usage#parameter-api-key-id)

api\_key\_id

string<uuid>

required

#### Query Parameters

[​](https://docs.requesty.ai/api-reference/endpoint/manage-api-key-get-usage#parameter-start-date)

start\_date

string<date>

required

Start date for usage data in YYYY-MM-DD format (e.g., 2025-01-01). Maximum range is 31 days between start\_date and end\_date.

Example:

`"2025-01-01"`

[​](https://docs.requesty.ai/api-reference/endpoint/manage-api-key-get-usage#parameter-end-date)

end\_date

string<date>

End date for usage data in YYYY-MM-DD format (e.g., 2025-01-31). Defaults to tomorrow if not specified. Maximum range is 31 days from start\_date.

Example:

`"2025-01-31"`

#### Response

200

application/json

Successfully retrieved usage data

[​](https://docs.requesty.ai/api-reference/endpoint/manage-api-key-get-usage#response-completions-requests)

completions\_requests

integer

required

[​](https://docs.requesty.ai/api-reference/endpoint/manage-api-key-get-usage#response-spend)

spend

number

required

[Previous](https://docs.requesty.ai/api-reference/endpoint/manage-api-key-create) [Update API Key LimitUpdate the monthly spending limit for a specific API key\\
\\
Next](https://docs.requesty.ai/api-reference/endpoint/manage-api-key-update-limit)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

Get API key usage

cURL

Copy

```
curl --request GET \
  --url https://api.requesty.ai/v1/manage/apikey/{api_key_id} \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

404

Copy

```
{
  "completions_requests": 123,
  "spend": 123
}
```

Assistant

Responses are generated using AI and may contain mistakes.