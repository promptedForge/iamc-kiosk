---
url: "https://docs.requesty.ai/features/load-balancing"
title: "Load Balancing - Requesty documentation"
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

Load Balancing

Features

# Load Balancing

Distribute your requests across multiple models

- Define your models and decide how many requests go to each.
- Set percentages or weights to control the distribution.
- Send a single request, and let the Requesty router handle the rest.

## [​](https://docs.requesty.ai/features/load-balancing\#how-it-works)  How It Works

1. Create a Load Balancing Policy in your Requesty dashboard.
2. Configure your model distribution with assigned weights (e.g., 50% to Model A, 30% to Model B, 20% to Model C).
3. Each incoming request gets routed to one of the models based on the distribution you set.

## [​](https://docs.requesty.ai/features/load-balancing\#how-does-this-help%3F)  How Does This Help?

- A/B Testing of model configurations
- Smarter resource usage
- Improved overall performance

## [​](https://docs.requesty.ai/features/load-balancing\#get-started)  Get Started

1. Go to the [API Keys Page](https://app.requesty.ai/api-keys)
2. Add a Load Balancing Policy (see screenshot).
3. Specify how you want to split the traffic among your models.

![](https://mintcdn.com/requesty/TcSPqkVK2WsRBepW/images/load-balancer.png?fit=max&auto=format&n=TcSPqkVK2WsRBepW&q=85&s=dacf2036a1d6a25db9dfa1f7e40cd57e)**Here’s an example setup:**

- **Policy Name:**Reasoning-experiment
- **Distribution:**  - `openai/o1` : 50%
  - `openai/o3-mini` : 25%
  - `deepseek/reasoner` : 25%

Double-check that each model in your Load Balancing Policy can handle your specific request parameters (e.g., context length, token limits). If a model is incompatible, requests sent to that model may fail without fallback.

[Previous](https://docs.requesty.ai/features/fallback-policies) [Spend LimitsSet up spend limits using projects or individual API keys\\
\\
Next](https://docs.requesty.ai/features/api-limits)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [How It Works](https://docs.requesty.ai/features/load-balancing#how-it-works)
- [How Does This Help?](https://docs.requesty.ai/features/load-balancing#how-does-this-help%3F)
- [Get Started](https://docs.requesty.ai/features/load-balancing#get-started)

Assistant

Responses are generated using AI and may contain mistakes.

![](https://mintcdn.com/requesty/TcSPqkVK2WsRBepW/images/load-balancer.png?w=840&fit=max&auto=format&n=TcSPqkVK2WsRBepW&q=85&s=23d83d7f3dcfddd6b63b4074fc354b31)