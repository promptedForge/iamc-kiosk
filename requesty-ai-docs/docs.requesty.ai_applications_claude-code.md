---
url: "https://docs.requesty.ai/applications/claude-code"
title: "Claude Code - Requesty documentation"
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

Applications

Claude Code

Applications

# Claude Code

Requesty routing for Claude Code

Claude Code is Anthropic’s powerful AI coding assistant that works directly in your terminal and IDE. With Requesty integration, you can access 300+ models while coding, giving you flexibility to choose the best model for each task.

## [​](https://docs.requesty.ai/applications/claude-code\#quick-setup)  Quick Setup

The easiest way to integrate Requesty with Claude Code is through environment variables:

1. **Set Environment Variables**






Copy











```
export ANTHROPIC_BASE_URL="https://router.requesty.ai"
export ANTHROPIC_API_KEY="your_requesty_api_key"

```

2. **Get Your API Key**
Create your API key on the [API Keys Page](https://app.requesty.ai/api-keys) in the platform.
3. **Choose Your Model**
You can now use any Requesty model by configuring the model setting in Claude Code.

With this setup, Claude Code will route all requests through Requesty, giving you access to models from OpenAI, Anthropic, Google,
Mistral, and many more providers.

## [​](https://docs.requesty.ai/applications/claude-code\#advanced-configuration)  Advanced Configuration

### [​](https://docs.requesty.ai/applications/claude-code\#using-settings-files)  Using Settings Files

For more control, you can configure Claude Code using settings files. Create or edit your settings file:**Global Settings:** `~/.claude/settings.json`

Copy

```
{
	"model": "anthropic/claude-3-7-sonnet",
	"env": {
		"ANTHROPIC_BASE_URL": "https://router.requesty.ai",
		"ANTHROPIC_API_KEY": "your_requesty_api_key"
	}
}

```

**Project Settings:** `.claude/settings.json`

Copy

```
{
	"model": "openai/gpt-4o",
	"env": {
		"ANTHROPIC_BASE_URL": "https://router.requesty.ai",
		"ANTHROPIC_API_KEY": "your_requesty_api_key"
	}
}

```

### [​](https://docs.requesty.ai/applications/claude-code\#model-selection)  Model Selection

You can choose any model from the [Model Library](https://app.requesty.ai/model-list). Model IDs follow this format:

- **Standard Models:** `provider/model-name`  - `anthropic/claude-3-7-sonnet`
  - `openai/gpt-4o`
  - `google/gemini-2.0-flash-exp`
  - `mistral/mistral-large-2411`
- **Coding-Optimized Models:** `coding/model-name`  - `coding/claude-3-7-sonnet`
  - `coding/gpt-4o`

Coding-optimized models provide auto caching of prompts and handle compatibility with reasoning models for better coding experiences.

### [​](https://docs.requesty.ai/applications/claude-code\#command-line-configuration)  Command Line Configuration

You can also configure Claude Code using the command line:

Copy

```
# Set the model globally
claude config set -g model "anthropic/claude-3-7-sonnet"

# Set environment variables globally
claude config set -g env.ANTHROPIC_BASE_URL "https://router.requesty.ai"
claude config set -g env.ANTHROPIC_API_KEY "your_requesty_api_key"

# Set for current project only
claude config set model "openai/gpt-4o"

```

## [​](https://docs.requesty.ai/applications/claude-code\#benefits-of-using-requesty-with-claude-code)  Benefits of Using Requesty with Claude Code

## Access 300+ Models

Switch between models from different providers without changing your setup

## Cost Management

Monitor spending and set limits across all your AI interactions

## Fallback Policies

Automatic fallbacks ensure your coding sessions never get interrupted

## Smart Routing

Intelligent routing to the best available endpoint for optimal performance

## [​](https://docs.requesty.ai/applications/claude-code\#troubleshooting)  Troubleshooting

### [​](https://docs.requesty.ai/applications/claude-code\#model-not-found)  Model Not Found

If you get a “model not found” error, make sure:

- Your API key is valid and has access to the model
- The model ID format is correct ( `provider/model-name`)
- The model is available in the [Model Library](https://app.requesty.ai/model-list)

### [​](https://docs.requesty.ai/applications/claude-code\#connection-issues)  Connection Issues

If Claude Code can’t connect:

- Verify your `ANTHROPIC_BASE_URL` is set to `https://router.requesty.ai`
- Check your `ANTHROPIC_API_KEY` is correct
- Ensure you have internet connectivity

### [​](https://docs.requesty.ai/applications/claude-code\#environment-variables-not-working)  Environment Variables Not Working

Environment variables might not persist between sessions. Add them to your shell profile:**For bash/zsh:**

Copy

```
echo 'export ANTHROPIC_BASE_URL="https://router.requesty.ai"' >> ~/.zshrc
echo 'export ANTHROPIC_API_KEY="your_requesty_api_key"' >> ~/.zshrc
source ~/.zshrc

```

For more advanced configuration options, check out the [Claude Code Settings\\
Documentation](https://docs.anthropic.com/en/docs/claude-code/settings).

[Previous](https://docs.requesty.ai/features/rbac) [ClineRequesty routing for Cline\\
\\
Next](https://docs.requesty.ai/applications/cline)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [Quick Setup](https://docs.requesty.ai/applications/claude-code#quick-setup)
- [Advanced Configuration](https://docs.requesty.ai/applications/claude-code#advanced-configuration)
- [Using Settings Files](https://docs.requesty.ai/applications/claude-code#using-settings-files)
- [Model Selection](https://docs.requesty.ai/applications/claude-code#model-selection)
- [Command Line Configuration](https://docs.requesty.ai/applications/claude-code#command-line-configuration)
- [Benefits of Using Requesty with Claude Code](https://docs.requesty.ai/applications/claude-code#benefits-of-using-requesty-with-claude-code)
- [Troubleshooting](https://docs.requesty.ai/applications/claude-code#troubleshooting)
- [Model Not Found](https://docs.requesty.ai/applications/claude-code#model-not-found)
- [Connection Issues](https://docs.requesty.ai/applications/claude-code#connection-issues)
- [Environment Variables Not Working](https://docs.requesty.ai/applications/claude-code#environment-variables-not-working)

Assistant

Responses are generated using AI and may contain mistakes.