---
url: "https://docs.requesty.ai/features/smart-routing"
title: "Smart Routing - Requesty documentation"
---

[Requesty documentation home page![light logo](https://mintcdn.com/requesty/TcSPqkVK2WsRBepW/logo/light.svg?fit=max&auto=format&n=TcSPqkVK2WsRBepW&q=85&s=f1ef3ab41a5f4f9d4595a5bfd5fc0180)![dark logo](https://mintcdn.com/requesty/TcSPqkVK2WsRBepW/logo/dark.svg?fit=max&auto=format&n=TcSPqkVK2WsRBepW&q=85&s=3dc2f8739ecad9cb4ed85ba39cc5c2d2)](https://docs.requesty.ai/)

Search...

⌘K

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

⌘K

- [Join us on Discord](https://discord.com/invite/Td3rwAHgt4)
- [Go to the Platform](https://app.requesty.ai/)
- [Go to the Platform](https://app.requesty.ai/)

Search...

Navigation

Features

Smart Routing

Features

# Smart Routing

Automatically route requests to the optimal AI model

## [​](https://docs.requesty.ai/features/smart-routing\#what-is-smart-routing%3F)  What is Smart Routing?

Smart Routing is an intelligent feature that automatically detects the nature of your request and routes it to the most suitable AI model. With Requesty’s Smart Routing feature, you can:

- Let the system automatically select the best model for your specific task
- Eliminate the guesswork of choosing between different AI models
- Get optimal results without manual model selection
- Benefit from specialized models for different types of requests

## [​](https://docs.requesty.ai/features/smart-routing\#video-tutorial)  Video Tutorial

[iframe](https://www.youtube.com/embed/qvU16B9Dc48)

## [​](https://docs.requesty.ai/features/smart-routing\#how-it-works)  How It Works

1. Go to the [Chat Playground](https://app.requesty.ai/chat)
2. Toggle on the “Smart Routing” option
3. Enter your prompt as usual
4. Requesty will analyze your request and route it to the optimal model
5. View the routing decision and category breakdown in real-time

![](https://mintlify.s3.us-west-1.amazonaws.com/requesty/images/smart-routing.png)

## [​](https://docs.requesty.ai/features/smart-routing\#benefits)  Benefits

- **Optimal Performance**: Always get the best model for your specific task
- **Time Savings**: No need to manually select models for different requests
- **Cost Efficiency**: Automatically routes to the most cost-effective model for your needs
- **Transparency**: See exactly why your request was routed to a particular model

## [​](https://docs.requesty.ai/features/smart-routing\#example-use-cases)  Example Use Cases

**Copywriting Tasks:**

- Blog post titles
- Marketing content
- Product descriptions

**Coding Assistance:**

- Implementation help
- Code debugging
- Technical explanations

**Educational Content:**

- Tutorials
- Explanations for different age groups
- Learning materials

You can test Smart Routing right now in the [Requesty Chat Playground](https://app.requesty.ai/chat) \- simply toggle on the Smart Routing
option and start chatting!

[Previous](https://docs.requesty.ai/features/request-feedback) [Session ReconstructionAutomatic session reconstruction\\
\\
Next](https://docs.requesty.ai/features/session-reconstruction)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [What is Smart Routing?](https://docs.requesty.ai/features/smart-routing#what-is-smart-routing%3F)
- [Video Tutorial](https://docs.requesty.ai/features/smart-routing#video-tutorial)
- [How It Works](https://docs.requesty.ai/features/smart-routing#how-it-works)
- [Benefits](https://docs.requesty.ai/features/smart-routing#benefits)
- [Example Use Cases](https://docs.requesty.ai/features/smart-routing#example-use-cases)

Assistant

Responses are generated using AI and may contain mistakes.