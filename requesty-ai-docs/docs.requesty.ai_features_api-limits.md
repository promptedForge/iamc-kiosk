---
url: "https://docs.requesty.ai/features/api-limits"
title: "Spend Limits - Requesty documentation"
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

Spend Limits

Features

# Spend Limits

Set up spend limits using projects or individual API keys

Requesty offers two methods to control and limit spending: **project-based limits** (recommended) and **per-API key limits**. Choose the method that best fits your organization’s setup.

## [​](https://docs.requesty.ai/features/api-limits\#project-based-spend-limits-recommended)  Project-Based Spend Limits (Recommended)

**Use this method when:** Your team members have access to the Requesty web platform (they have accounts on [https://requesty.ai](https://requesty.ai/) and are part of your organization).

### [​](https://docs.requesty.ai/features/api-limits\#how-it-works%3A)  How it works:

- Each user gets a ‘Private’ project where they can create their own API keys
- Admins can create shared projects. Regular users cannot create shared projects
- Organization admins can set spend limits per project, effectively controlling the overall spend per user/project
- This provides better visibility and control over spending at the user level

### [​](https://docs.requesty.ai/features/api-limits\#setting-up-project-based-limits%3A)  Setting up project-based limits:

1. Go to the [Projects Page](https://app.requesty.ai/projects) in your organization dashboard
2. Select the project you want to limit (or a user’s Private project)
3. Set the monthly spending limit for that project
4. All API keys created within that project will be subject to this limit

![](https://mintcdn.com/requesty/TcSPqkVK2WsRBepW/images/project-limit.png?fit=max&auto=format&n=TcSPqkVK2WsRBepW&q=85&s=65d00eab952bea083a7fca6015d1562f)

## [​](https://docs.requesty.ai/features/api-limits\#per-api-key-spend-limits)  Per-API Key Spend Limits

**Use this method when:** Your team members do NOT have access to the Requesty web platform, and you need to distribute API keys directly.

### [​](https://docs.requesty.ai/features/api-limits\#how-it-works%3A-2)  How it works:

- Organization admins generate API keys and share them with users
- Each API key has its own monthly spend cap
- Spending can be monitored via the dashboard or management API endpoints
- This method is ideal for external integrations or when you don’t want to give users platform access

### [​](https://docs.requesty.ai/features/api-limits\#setting-up-per-key-limits%3A)  Setting up per-key limits:

1. Go to [API Keys Page](https://app.requesty.ai/api-keys)
2. Create a new API key or edit an existing one
3. Set a monthly spending limit for that specific API key
4. Share the API key with the intended user

![](https://mintcdn.com/requesty/TcSPqkVK2WsRBepW/images/api-key-limit.png?fit=max&auto=format&n=TcSPqkVK2WsRBepW&q=85&s=c5db361e6d92d053196c5635ba454513)

## [​](https://docs.requesty.ai/features/api-limits\#monitoring-and-management)  Monitoring and Management

Both methods allow you to:

- Monitor spending in real-time through the dashboard
- Receive alerts when limits are approached
- Use the [Management API](https://docs.requesty.ai/features/key-management-api) to programmatically check usage
- Adjust limits as needed based on usage patterns

## [​](https://docs.requesty.ai/features/api-limits\#best-practices)  Best Practices

- **For internal teams:** Use project-based limits to give users autonomy while maintaining control
- **For external partners:** Use per-API key limits for simpler distribution and management
- **Set reasonable buffers:** Consider setting limits slightly above expected usage to avoid interruptions
- **Regular monitoring:** Check usage patterns monthly to optimize limit settings

[Previous](https://docs.requesty.ai/features/load-balancing) [Key Management APIManage your API key via an API\\
\\
Next](https://docs.requesty.ai/features/key-management-api)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [Project-Based Spend Limits (Recommended)](https://docs.requesty.ai/features/api-limits#project-based-spend-limits-recommended)
- [How it works:](https://docs.requesty.ai/features/api-limits#how-it-works%3A)
- [Setting up project-based limits:](https://docs.requesty.ai/features/api-limits#setting-up-project-based-limits%3A)
- [Per-API Key Spend Limits](https://docs.requesty.ai/features/api-limits#per-api-key-spend-limits)
- [How it works:](https://docs.requesty.ai/features/api-limits#how-it-works%3A-2)
- [Setting up per-key limits:](https://docs.requesty.ai/features/api-limits#setting-up-per-key-limits%3A)
- [Monitoring and Management](https://docs.requesty.ai/features/api-limits#monitoring-and-management)
- [Best Practices](https://docs.requesty.ai/features/api-limits#best-practices)

Assistant

Responses are generated using AI and may contain mistakes.

![](https://mintcdn.com/requesty/TcSPqkVK2WsRBepW/images/project-limit.png?w=840&fit=max&auto=format&n=TcSPqkVK2WsRBepW&q=85&s=db2afdf6de34a40da35484a1c7105494)

![](https://mintcdn.com/requesty/TcSPqkVK2WsRBepW/images/api-key-limit.png?w=840&fit=max&auto=format&n=TcSPqkVK2WsRBepW&q=85&s=87fc5ec61d3b2a20357445c1819fcf9b)