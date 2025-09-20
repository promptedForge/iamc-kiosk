---
url: "https://docs.requesty.ai/features/session-reconstruction"
title: "Session Reconstruction - Requesty documentation"
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

Session Reconstruction

Features

# Session Reconstruction

Automatic session reconstruction

# [​](https://docs.requesty.ai/features/session-reconstruction\#automatic-session-reconstruction)  Automatic Session Reconstruction

Understanding how users interact with your LLM applications is key to improving them. A crucial part of this is analyzing entire conversations or “sessions.” However, tracking sessions usually requires you to add a unique `session_id` to every API request, which can be a hassle to implement and maintain.Requesty’s gateway removes this burden with **Automatic Session Reconstruction**. You can send your LLM interaction data to us as-is, and we will automatically group related interactions into coherent sessions for you.

## [​](https://docs.requesty.ai/features/session-reconstruction\#what-it-means-for-you)  What It Means For You

- **Zero Implementation Effort**: You don’t need to modify your application code to generate or manage session IDs. Simply send us the interaction data, and we’ll handle the rest.
- **Accurate Conversation Tracking**: Get a clear view of the entire user journey or your agentic flow, from the first prompt to the final response.
- **Powerful Analytics**: With sessions correctly identified, you can analyze conversation length, user engagement, topic flow, and other critical metrics that depend on understanding the full context of an interaction.

## [​](https://docs.requesty.ai/features/session-reconstruction\#how-it-works)  How It Works

Our system intelligently analyzes the content of the messages in each interaction and automatically identifies if it’s a part of an existing session.For example, if a user starts a conversation:

1. **User’s first turn:**
   - `system`: “You are a helpful assistant.”
   - `user`: “What is the capital of France?”
   - `assistant`: “The capital of France is Paris.”

Our service sees this is the start of a new conversation and assigns it a new session ID internally.If the user continues the conversation:

2. **User’s second turn:**
   - `system`: “You are a helpful assistant.”
   - `user`: “What is the capital of France?”
   - `assistant`: “The capital of France is Paris.”
   - `user`: “What is its population?”
   - `assistant`: “The population of Paris is over 2 million.”

Our service recognizes that this new interaction contains the complete history of the first one, plus a new question and answer. It automatically identifies it as part of the **same session** and links it to the previous interaction.This process allows us to reconstruct the entire conversation thread reliably, without requiring any session management on your end.ß

[Previous](https://docs.requesty.ai/features/smart-routing) [User ManagementManage organization members, set spending limits, and track user activity\\
\\
Next](https://docs.requesty.ai/features/users)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [Automatic Session Reconstruction](https://docs.requesty.ai/features/session-reconstruction#automatic-session-reconstruction)
- [What It Means For You](https://docs.requesty.ai/features/session-reconstruction#what-it-means-for-you)
- [How It Works](https://docs.requesty.ai/features/session-reconstruction#how-it-works)

Assistant

Responses are generated using AI and may contain mistakes.