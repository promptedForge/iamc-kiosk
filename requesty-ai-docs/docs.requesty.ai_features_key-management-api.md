---
url: "https://docs.requesty.ai/features/key-management-api"
title: "Key Management API - Requesty documentation"
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

Key Management API

Features

# Key Management API

Manage your API key via an API

# [​](https://docs.requesty.ai/features/key-management-api\#api-key-management)  API Key Management

**Enterprise Feature**Programmatically manage your organization’s API keys using the Requesty API Key Management API. Create, monitor, configure, and delete API keys with code, just like you would from the Requesty console.

## [​](https://docs.requesty.ai/features/key-management-api\#what-is-api-key-management%3F)  What is API Key Management?

The API Key Management feature allows enterprise customers to automate their API key lifecycle management through a RESTful API. Instead of manually managing keys through the web console, you can integrate key management directly into your workflows and systems.With this feature, you can:

- Create new API keys with custom permissions and spending limits
- Monitor API key usage and spending in real-time
- Update monthly spending limits programmatically
- Delete unused or compromised keys instantly
- Retrieve comprehensive usage analytics for any date range

## [​](https://docs.requesty.ai/features/key-management-api\#benefits)  Benefits

- **Automation**: Integrate API key management into your CI/CD pipelines and infrastructure automation
- **Security**: Programmatically rotate keys and manage permissions at scale
- **Cost Control**: Set and update spending limits across all your API keys
- **Monitoring**: Track usage patterns and spending across your organization
- **Compliance**: Maintain audit trails and enforce governance policies

**Tip**: Use descriptive names for your API keys and standardize your naming convention to make management easier across teams.

## [​](https://docs.requesty.ai/features/key-management-api\#prerequisites)  Prerequisites

To use the API Key Management endpoints, you need:

1. An enterprise Requesty account
2. An API key with **manage permissions** (read/write access)
3. The manage permission allows you to call all API key management endpoints

## [​](https://docs.requesty.ai/features/key-management-api\#api-reference)  API Reference

### [​](https://docs.requesty.ai/features/key-management-api\#base-url)  Base URL

Copy

```
https://api.requesty.ai

```

### [​](https://docs.requesty.ai/features/key-management-api\#endpoints)  Endpoints

| Method | Endpoint | Required Permission | Description |
| --- | --- | --- | --- |
| `GET` | `/v1/manage/apikey` | READ | List all API keys |
| `POST` | `/v1/manage/apikey` | WRITE | Create new API key |
| `GET` | `/v1/manage/apikey/{id}` | READ | Get API key usage |
| `DELETE` | `/v1/manage/apikey/{id}` | WRITE | Delete API key |
| `POST` | `/v1/manage/apikey/{id}/limit` | WRITE | Update monthly limit |

[Previous](https://docs.requesty.ai/features/api-limits) [Auto CachingControl automatic caching behavior\\
\\
Next](https://docs.requesty.ai/features/auto-caching)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [API Key Management](https://docs.requesty.ai/features/key-management-api#api-key-management)
- [What is API Key Management?](https://docs.requesty.ai/features/key-management-api#what-is-api-key-management%3F)
- [Benefits](https://docs.requesty.ai/features/key-management-api#benefits)
- [Prerequisites](https://docs.requesty.ai/features/key-management-api#prerequisites)
- [API Reference](https://docs.requesty.ai/features/key-management-api#api-reference)
- [Base URL](https://docs.requesty.ai/features/key-management-api#base-url)
- [Endpoints](https://docs.requesty.ai/features/key-management-api#endpoints)

Assistant

Responses are generated using AI and may contain mistakes.