---
url: "https://docs.requesty.ai/features/request-metadata"
title: "Request Metadata - Requesty documentation"
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

Request Metadata

Features

# Request Metadata

Add custom metadata to your API calls for powerful analytics

## [​](https://docs.requesty.ai/features/request-metadata\#what-is-request-metadata%3F)  What is Request Metadata?

Request Metadata allows you to enhance your API calls with custom data that enables powerful analytics and tracking. By adding metadata to your requests, you can:

- Track user interactions across sessions
- Group requests by custom tags
- Associate requests with specific workflows
- Add business context to your API usage

## [​](https://docs.requesty.ai/features/request-metadata\#how-it-works)  How It Works

1. Use the standard OpenAI client with Requesty’s base URL
2. Add the `extra_body` parameter with your metadata
3. View and analyze this data in your Requesty dashboard

Copy

```
requesty_api_key = "YOUR_REQUESTY_API_KEY"  # Safely load your API key

client = openai.OpenAI(
    api_key=requesty_api_key,
    base_url="https://router.requesty.ai/v1"
)

# Add metadata via the extra_body parameter
response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "Your prompt here"}],
    extra_body={
        "requesty": {
            "tags": ["workflow-a", "product-page"],
            "user_id": "user_1234",
            "trace_id": "session_abc123",
            "extra": {
                "country": "canada",
                "prompt_title": "product description generator",
                "tier": "premium"
            }
        }
    }
)

```

## [​](https://docs.requesty.ai/features/request-metadata\#key-metadata-fields)  Key Metadata Fields

### [​](https://docs.requesty.ai/features/request-metadata\#core-fields)  Core Fields

- **tags**: Array of strings for grouping related requests
- **user\_id**: Identifier for the end user making the request
- **trace\_id**: Unique identifier to track related requests in a workflow

### [​](https://docs.requesty.ai/features/request-metadata\#extra-context)  Extra Context

The `extra` object can include any custom fields relevant to your business:

- **country**: User’s location for geographic analysis
- **prompt\_title**: Descriptive name of the prompt’s purpose
- **tier**: User’s subscription level
- **language**: Preferred language of the user
- **application**: Source application or feature

## [​](https://docs.requesty.ai/features/request-metadata\#benefits)  Benefits

- **User Journey Analysis**: Track how users interact with AI across sessions
- **Cost Attribution**: Assign AI usage costs to specific business units
- **Performance Optimization**: Identify which prompts perform best for specific uses
- **Workflow Visualization**: See how multiple API calls connect in complex processes

## [​](https://docs.requesty.ai/features/request-metadata\#implementation-examples)  Implementation Examples

### [​](https://docs.requesty.ai/features/request-metadata\#python-example)  Python Example

Copy

```
import openai
import os

requesty_api_key = "YOUR_REQUESTY_API_KEY"  # Safely load your API key

# Initialize client
client = openai.OpenAI(
    api_key=requesty_api_key,
    base_url="https://router.requesty.ai/v1"
)

# Make request with metadata
response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "Generate a product description for a coffee maker"}],
    extra_body={
        "requesty": {
            "tags": ["product-content", "e-commerce"],
            "user_id": "merchant_5678",
            "trace_id": "workflow_product_launch_123",
            "extra": {
                "country": "usa",
                "prompt_title": "product description",
                "department": "marketing",
                "product_category": "kitchen_appliances"
            }
        }
    }
)

print(response.choices[0].message.content)

```

### [​](https://docs.requesty.ai/features/request-metadata\#node-js-example)  Node.js Example

Copy

```
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
const REQUESTY_API_KEY = process.env.REQUESTY_API_KEY;

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: REQUESTY_API_KEY,
    baseURL: 'https://router.requesty.ai/v1',
});

async function generateWithMetadata() {
    try {
        const response = await openai.chat.completions.create({
            model: 'openai/gpt-4o',
            messages: [{ role: 'user', content: 'Write a blog intro about AI productivity tools' }],
            requesty: {
                tags: ['content-creation', 'blog'],
                user_id: 'editor_9012',
                trace_id: 'article_draft_456',
                extra: {
                    country: 'uk',
                    prompt_title: 'blog intro',
                    content_type: 'educational',
                    target_audience: 'technical',
                },
            },
        });

        console.log(response.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error);
    }
}

generateWithMetadata();

```

For consistent analytics, establish naming conventions for your tags and metadata fields across your organization.

[Previous](https://docs.requesty.ai/features/bring-your-own-keys) [Request FeedbackAdd user feedback to your API calls after they are completed\\
\\
Next](https://docs.requesty.ai/features/request-feedback)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [What is Request Metadata?](https://docs.requesty.ai/features/request-metadata#what-is-request-metadata%3F)
- [How It Works](https://docs.requesty.ai/features/request-metadata#how-it-works)
- [Key Metadata Fields](https://docs.requesty.ai/features/request-metadata#key-metadata-fields)
- [Core Fields](https://docs.requesty.ai/features/request-metadata#core-fields)
- [Extra Context](https://docs.requesty.ai/features/request-metadata#extra-context)
- [Benefits](https://docs.requesty.ai/features/request-metadata#benefits)
- [Implementation Examples](https://docs.requesty.ai/features/request-metadata#implementation-examples)
- [Python Example](https://docs.requesty.ai/features/request-metadata#python-example)
- [Node.js Example](https://docs.requesty.ai/features/request-metadata#node-js-example)

Assistant

Responses are generated using AI and may contain mistakes.