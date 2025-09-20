---
url: "https://docs.requesty.ai/frameworks/llamaindex-ts"
title: "LlamaIndex TS - Requesty documentation"
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

LlamaIndex TS

Frameworks

# LlamaIndex TS

Using Requesty with LlamaIndex TS

[**GitHub** \\
\\
View adapter source code](https://github.com/requestyai/llamaindex-ts) [**npm** \\
\\
View adapter NPM package](https://www.npmjs.com/package/@requesty/llamaindex)

The Requesty adapter for LlamaIndex TypeScript provides a seamless integration to access over 300 large language models through the Requesty platform within your LlamaIndex applications.

## [​](https://docs.requesty.ai/frameworks/llamaindex-ts\#setup)  Setup

Copy

```
# For pnpm
pnpm add @requesty/llamaindex

# For npm
npm install @requesty/llamaindex

# For yarn
yarn add @requesty/llamaindex

```

## [​](https://docs.requesty.ai/frameworks/llamaindex-ts\#api-key-setup)  API Key Setup

For security, you should set your API key as an environment variable named exactly `REQUESTY_API_KEY`:

Copy

```
# Linux/Mac
export REQUESTY_API_KEY=your_api_key_here

# Windows Command Prompt
set REQUESTY_API_KEY=your_api_key_here

# Windows PowerShell
$env:REQUESTY_API_KEY="your_api_key_here"

```

## [​](https://docs.requesty.ai/frameworks/llamaindex-ts\#basic-usage)  Basic Usage

The adapter provides a simple interface to use Requesty models within your LlamaIndex TypeScript applications:

Copy

```
import { requesty } from "llamaindex-requesty";

const llm = requesty({
  model: "openai/gpt-4o-mini",
  apiKey: process.env.REQUESTY_API_KEY,
  baseURL: "https://your-requesty-endpoint.com/v1"
});

const response = await llm.chat({
  messages: [{ role: "user", content: "Hello!" }]
});

```

## [​](https://docs.requesty.ai/frameworks/llamaindex-ts\#supported-models)  Supported Models

You can use any model available through Requesty.
Find the complete list of available models at [app.requesty.ai/models](https://app.requesty.ai/models).

## [​](https://docs.requesty.ai/frameworks/llamaindex-ts\#features)  Features

## 300+ Models

Access models from OpenAI, Anthropic, Google, Mistral, and many other providers

## Streaming Support

Full support for streaming responses for real-time applications

## Structured Output

Support for structured output using Zod schemas

## Tool Calling

Utilize function/tool calling capabilities with supported models

## Multi-Agent Workflows

Support for complex multi-agent workflow configurations

## Analytics & Telemetry

Powerful telemetry and analytics capabilities built-in

## [​](https://docs.requesty.ai/frameworks/llamaindex-ts\#getting-started)  Getting Started

For detailed usage examples, configuration options, and advanced features, please refer to the [GitHub repository](https://github.com/requestyai/llamaindex-ts) which contains comprehensive documentation and examples to help you get started with the integration.The adapter is designed to work seamlessly with existing LlamaIndex TypeScript applications while providing access to Requesty’s powerful model routing and analytics capabilities.

[Previous](https://docs.requesty.ai/frameworks/langchain) [HaystackUsing Requesty router with Haystack\\
\\
Next](https://docs.requesty.ai/frameworks/haystack)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [Setup](https://docs.requesty.ai/frameworks/llamaindex-ts#setup)
- [API Key Setup](https://docs.requesty.ai/frameworks/llamaindex-ts#api-key-setup)
- [Basic Usage](https://docs.requesty.ai/frameworks/llamaindex-ts#basic-usage)
- [Supported Models](https://docs.requesty.ai/frameworks/llamaindex-ts#supported-models)
- [Features](https://docs.requesty.ai/frameworks/llamaindex-ts#features)
- [Getting Started](https://docs.requesty.ai/frameworks/llamaindex-ts#getting-started)

Assistant

Responses are generated using AI and may contain mistakes.