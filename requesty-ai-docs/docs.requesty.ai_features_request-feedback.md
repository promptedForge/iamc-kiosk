---
url: "https://docs.requesty.ai/features/request-feedback"
title: "Request Feedback - Requesty documentation"
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

Request Feedback

Features

# Request Feedback

Add user feedback to your API calls after they are completed

## [​](https://docs.requesty.ai/features/request-feedback\#what-is-request-feedback%3F)  What is Request Feedback?

Request Feedback allows you to enrich your API calls with user feedback and other data _after_ the initial request has been completed.
This is useful for gathering insights on the quality of the model’s response, which can be used for analytics, auditing, and improving the user experience.With this feature, you can:

- Capture user ratings and comments on AI responses.
- Track which responses were helpful or unhelpful.
- Add contextual data from your platform after the fact.
- Build a feedback loop to fine-tune models and prompts.

## [​](https://docs.requesty.ai/features/request-feedback\#benefits)  Benefits

- **Quality Monitoring**: Continuously track the performance and quality of your AI models.
- **User Satisfaction**: Understand what your users think about the AI responses they receive.
- **Data-Driven Improvements**: Use feedback data to identify areas for improvement in your prompts, models, or workflows.
- **Enhanced Auditing**: Add context to requests for better auditing and analysis.

**Tip**: Standardize your feedback data structure (e.g., ratings, tags) to make it easier to analyze across your applications.

## [​](https://docs.requesty.ai/features/request-feedback\#how-it-works)  How It Works

1. After a chat completion, you get an ID in the response.
2. Use this ID to send a `POST` request to the Requesty feedback endpoint.
3. Include your feedback data in the JSON payload.
4. View and analyze this feedback in your Requesty dashboard.

**Important notes**

- You can POST feedback multiple times per request.
- Every subsequent call merges the new values.
- If a new feedback call contains an existing key, the new value overwrites the existing one.

## [​](https://docs.requesty.ai/features/request-feedback\#python-example)  Python Example

Here’s how you can send feedback after a chat completion call:

Copy

```
import openai
import requests
import os

requesty_api_key = [SAFELY LOAD YOUR API KEY...]

# Assume client is an initialized OpenAI client pointed at Requesty
client = openai.OpenAI(api_key=requesty_api_key,
                       base_url="https://router.requesty.ai/v1")

# 1. Make the initial request
response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "Your prompt here"}],
)

# 2. Get the unique ID from the response
request_id = response.id

# 3. Send feedback to the Requesty API
feedback_url = f"https://api.requesty.ai/feedback/{request_id}"
feedback_headers = {
    "Authorization": f"Bearer {requesty_api_key}",
    "Content-Type": "application/json"
}
feedback_data = {
    "data": {
        "message": "The response was very accurate and helpful.",
        "rating": 5,
        "helpful": True,
        "user_id": "user_1234",
        "tags": ["customer-support", "positive-feedback"]
    }
}

try:
    feedback_response = requests.post(
        feedback_url,
        headers=feedback_headers,
        json=feedback_data,
    )
    feedback_response.raise_for_status()  # Raises an HTTPError for bad responses (4xx or 5xx)
    print("Feedback submitted successfully!")
except requests.exceptions.RequestException as e:
    print(f"Failed to submit feedback: {e}")

```

## [​](https://docs.requesty.ai/features/request-feedback\#node-js-example)  Node.js Example

Here’s how you can send feedback using Node.js.

Copy

```
import OpenAI from 'openai';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
const REQUESTY_API_KEY = process.env.REQUESTY_API_KEY;

const ROUTER_BASE_URL = 'https://router.requesty.ai/v1';
const FEEDBACK_BASE_URL = 'https://api.requesty.ai/feedback/';

// Initialize OpenAI client
const client = new OpenAI({
    apiKey: REQUESTY_API_KEY,
	baseURL: ROUTER_BASE_URL,
});

async function generateWithFeedback() {
    try {
        const response = await client.chat.completions.create({
            model: "anthropic/claude-3-7-sonnet-latest",
            messages: [\
                { role: "user", content: "What is AES?" }\
            ]
        });
        const requestId = response.id;

        // Send feedback POST request
        const feedbackUrl = FEEDBACK_BASE_URL + requestId;
        const headers = {
            "Authorization": `Bearer ${REQUESTY_API_KEY}`,
            "Content-Type": "application/json"
        };
        const feedbackData = {
            data: {
                message: "Test feedback message",
                rating: 5,
                helpful: true
            }
        };

        const feedbackResponse = await fetch(feedbackUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(feedbackData)
        });
        if (feedbackResponse.ok) {
            console.log("Feedback sent successfully");
        } else {
            console.error("Failed to send feedback:", feedbackResponse.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

generateWithFeedback();

```

[Previous](https://docs.requesty.ai/features/request-metadata) [Smart RoutingAutomatically route requests to the optimal AI model\\
\\
Next](https://docs.requesty.ai/features/smart-routing)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [What is Request Feedback?](https://docs.requesty.ai/features/request-feedback#what-is-request-feedback%3F)
- [Benefits](https://docs.requesty.ai/features/request-feedback#benefits)
- [How It Works](https://docs.requesty.ai/features/request-feedback#how-it-works)
- [Python Example](https://docs.requesty.ai/features/request-feedback#python-example)
- [Node.js Example](https://docs.requesty.ai/features/request-feedback#node-js-example)

Assistant

Responses are generated using AI and may contain mistakes.