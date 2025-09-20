---
url: "https://docs.requesty.ai/features/bring-your-own-keys"
title: "Bring Your Own Keys - Requesty documentation"
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

Bring Your Own Keys

Features

# Bring Your Own Keys

Use your own API keys with Requesty

## [​](https://docs.requesty.ai/features/bring-your-own-keys\#what-is-bring-your-own-keys%3F)  What is Bring Your Own Keys?

Bring Your Own Keys (BYOK) allows you to use your personal API keys from various providers with Requesty. This feature gives you more flexibility and control over which services you connect to.

- Add keys from multiple providers
- Use your own keys in fallback policies
- Track key usage across your organization

## [​](https://docs.requesty.ai/features/bring-your-own-keys\#how-it-works)  How It Works

1. Go to [Bring Your Own Keys](https://app.requesty.ai/byoks) in your dashboard
2. Select a provider to add your key (OpenAI, Anthropic, etc.)
3. Enter your API key and accept the terms and conditions
4. Use your added keys in fallback policies
5. Use your fallback policy as your model ID

![](https://mintlify.s3.us-west-1.amazonaws.com/requesty/images/bring-your-own-keys.png)

## [​](https://docs.requesty.ai/features/bring-your-own-keys\#supported-providers)  Supported Providers

Requesty currently supports adding your own keys for these providers:

- OpenAI
- Anthropic
- Google AI Studio
- xAI

More providers will be added over time based on user requests.Important notes:

- Google doesn’t include Vertex, BYOKs on Vertex are not supported yet
- You can set at most one key per provider

## [​](https://docs.requesty.ai/features/bring-your-own-keys\#using-your-keys-in-policies)  Using Your Keys in Policies

Once you’ve added your keys, you can use them in fallback policies:

1. Go to the API Keys section
2. Select “Configure” for the API key you want to modify
3. Create a new policy (or edit existing one)
4. Select your preferred models and add fallback options
5. Choose between Requesty’s keys or your own keys for each model

## [​](https://docs.requesty.ai/features/bring-your-own-keys\#benefits)  Benefits

- **Flexibility**: Use your existing API accounts and billing
- **Fallback Options**: Create robust policies with multiple fallback paths
- **Organizational Tracking**: See which team members added or updated keys
- **Cost Control**: Use your own billing relationships with providers

## [​](https://docs.requesty.ai/features/bring-your-own-keys\#quick-start)  Quick Start

1. Add your API keys from supported providers
2. Create a policy that uses Requesty’s services as primary
3. Set up fallbacks to use your own keys when needed
4. Apply the policy to your API key
5. Start making API calls with your fallback policy as your model ID

Using your own keys is especially useful for accessing free tier models from providers like Google or for utilizing specific model
versions you already have access to.

## [​](https://docs.requesty.ai/features/bring-your-own-keys\#video-tutorial)  Video Tutorial

How to use your own API Keys with Requesty - YouTube

[Photo image of Requesty](https://www.youtube.com/channel/UC8HQkywSeg9xd9nu8VuEYjw?embeds_referring_euri=https%3A%2F%2Fdocs.requesty.ai%2F)

Requesty

2.84K subscribers

[How to use your own API Keys with Requesty](https://www.youtube.com/watch?v=dePkJ9IEz00)

Requesty

Search

Watch later

Share

Copy link

Info

Shopping

Tap to unmute

If playback doesn't begin shortly, try restarting your device.

Full screen is unavailable. [Learn More](https://support.google.com/youtube/answer/6276924)

You're signed out

Videos you watch may be added to the TV's watch history and influence TV recommendations. To avoid this, cancel and sign in to YouTube on your computer.

CancelConfirm

More videos

## More videos

Share

Include playlist

An error occurred while retrieving sharing information. Please try again later.

[Watch on](https://www.youtube.com/watch?v=dePkJ9IEz00&embeds_referring_euri=https%3A%2F%2Fdocs.requesty.ai%2F)

0:00

0:00 / 1:57
•Live

•

[Previous](https://docs.requesty.ai/features/prompt-library) [Request MetadataAdd custom metadata to your API calls for powerful analytics\\
\\
Next](https://docs.requesty.ai/features/request-metadata)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [What is Bring Your Own Keys?](https://docs.requesty.ai/features/bring-your-own-keys#what-is-bring-your-own-keys%3F)
- [How It Works](https://docs.requesty.ai/features/bring-your-own-keys#how-it-works)
- [Supported Providers](https://docs.requesty.ai/features/bring-your-own-keys#supported-providers)
- [Using Your Keys in Policies](https://docs.requesty.ai/features/bring-your-own-keys#using-your-keys-in-policies)
- [Benefits](https://docs.requesty.ai/features/bring-your-own-keys#benefits)
- [Quick Start](https://docs.requesty.ai/features/bring-your-own-keys#quick-start)
- [Video Tutorial](https://docs.requesty.ai/features/bring-your-own-keys#video-tutorial)

Assistant

Responses are generated using AI and may contain mistakes.

![](https://mintlify.s3.us-west-1.amazonaws.com/requesty/images/bring-your-own-keys.png)