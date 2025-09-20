---
url: "https://docs.requesty.ai/features/reasoning"
title: "Reasoning - Requesty documentation"
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

Reasoning

Features

# Reasoning

Enable reasoning tokens

These tokens offer insight into the model’s reasoning process, providing a transparent view of its thought steps. Since Reasoning Tokens are considered output tokens, they are billed accordingly.To enable reasoning, specify `reasoning_effort` with one of the supported values in your API request.

## [​](https://docs.requesty.ai/features/reasoning\#notes)  Notes

- OpenAI does NOT share the actual reasoning tokens. You will not see them in the response.
- Deepseek reasoning models enable reasoning automatically, you don’t need to specify anything in the request to enable that.
- When using Deepseek and Anthropic, the reasoning content in the response will be under ‘reasoning\_content’.

## [​](https://docs.requesty.ai/features/reasoning\#reasoning-effort-values)  Reasoning effort values

Anthropic expects a specific number that sets the upper limit of thinking tokens. The limit must be less than the specified max tokens value.OpenAI models expect one of the following ‘effort’ values:

- low
- medium
- high

Google Gemini expects a specific number when using Vertex AI, and supports OpenAI’s reasoning efforts via the Google AI Studio (their OpenAI-compatible API).Requesty introduces new ‘effort’ values: ‘max’, ‘min’, and ‘none’ to support more granular control over reasoning.

### [​](https://docs.requesty.ai/features/reasoning\#%E2%80%9Dnone%E2%80%9D-or-%E2%80%9Cmin%E2%80%9D-effort)  ”none” or “min” effort

“none” or “min” are synonyms and work with all models. For reasoning models, it either disables reasoning or uses the minimal effort for it.
So, for example, “none” or “min”, would use 128 with Gemini 2.5 Pro, or 0 with Gemini 2.5 Flash.

### [​](https://docs.requesty.ai/features/reasoning\#when-using-openai-via-requesty%3A)  When using OpenAI via Requesty:

- If the client specifies a standard reasoning **effort** string, i.e. “low”/“medium”/“high”, Requesty forwards the same value to OpenAI.
- If the client specifies the ‘max’ reasoning **effort** string, Requesty forwards the value ‘high’ to OpenAI.
- If the client specifies ‘none’ or ‘min’ as the reasoning **effort** string, Requesty will use “low”, as this is the minimal amount of reasoning the models support.
- If the client specifies a reasoning **budget** string (e.g. “10000”), Requesty converts it to an effort, based on the conversion table below.

Converstion table from budget to effort:

- 0-1024 -> “low”
- 1025-8192 -> “medium”
- 8193 or higher -> “high”

### [​](https://docs.requesty.ai/features/reasoning\#when-using-anthropic-via-requesty%3A)  When using Anthropic via Requesty:

- If the client specifies a reasoning **effort** string (“low”/“medium”/“high”/“max”, “min”, or “none”), Requesty converts it to a budget, based on the conversion table below.
- If the client specifies a reasoning **budget** string (e.g. “10000”), Requesty passes this value to Google. If the budget is larger than the model’s maximum output tokens, it will automatically be reduced to stay within that token limit.

Converstion table from effort to budget:

- “min” / “none” / “low” -> 1024
- “medium” -> 8192
- “high” -> 16384
- “max” -> max output tokens for model minus 1 (i.e. 63999 for Sonnet 3.7 or 4, 31999 for Opus 4)

### [​](https://docs.requesty.ai/features/reasoning\#when-using-vertex-ai-via-requesty%3A)  When using Vertex AI via Requesty:

- If the client specifies a reasoning **effort** string (“low”/“medium”/“high”/“max”, “min”, or “none”), Requesty converts it to a budget, based on the conversion table below.
- If the client specifies a reasoning **budget** string (e.g. “10000”), Requesty passes this value to Google. If the budget is larger than the model’s maximum output tokens, it will automatically be reduced to stay within that token limit.

Converstion table from effort to budget:

- “min” / “none” -> 0 for Gemini Flash and Flash lite, 128 for Gemini Pro models
- “low” -> 1024
- “medium” -> 8192
- “high” -> 24576
- “max” -> max output tokens for model

This conversion table is compatible with the [Google AI Studio documentation](https://ai.google.dev/gemini-api/docs/openai#thinking).

### [​](https://docs.requesty.ai/features/reasoning\#when-using-google-ai-studio-via-requesty%3A)  When using Google AI Studio via Requesty:

Same as using OpenAI. See above.

## [​](https://docs.requesty.ai/features/reasoning\#reasoning-code-example)  Reasoning code example

For both tests, you can use either an OpenAI, Anthropic or Gemini reasoning model, for example:

- “openai/o3-mini”
- “anthropic/claude-sonnet-4-0”
- “vertex/google/gemini-2.5-pro”

### [​](https://docs.requesty.ai/features/reasoning\#javascript-example-using-reasoning-effort)  Javascript example using reasoning effort

Copy

```
import OpenAI from 'openai';

const requesty_api_key = "YOUR_REQUESTY_API_KEY"  # Safely load your API key

const client = new OpenAI({
    apiKey: requesty_api_key,
    baseURL: 'https:/router.requesty.ai/v1',
});

async function testReasoningEffort() {
    try {
        const prompt = `
            Write a bash script that takes a matrix represented as a string with
            format '[1,2],[3,4],[5,6]' and prints the transpose in the same format.
        `.trim();

        console.log('Sending request to reasoning model...');

        const completion = await client.chat.completions.create({
            model: "openai/o3-mini",
            reasoning_effort: "medium",
            messages: [\
                {\
                    role: "user",\
                    content: prompt\
                }\
            ]
        });

        console.log('\nCompletion Response:');
        console.log('-------------------');
        if (completion.choices[0]?.message?.content) {
            console.log(completion.choices[0].message.content);
        }

        console.log('\nToken Usage Details:');
        console.log('-------------------');
        if (completion.usage) {
            const usageDetails = {
                prompt_tokens: completion.usage.prompt_tokens,
                completion_tokens: completion.usage.completion_tokens,
                total_tokens: completion.usage.total_tokens
            };
            console.log(JSON.stringify(usageDetails, null, 2));

            // Log specific reasoning token details if available
            if ('completion_tokens_details' in completion.usage) {
                console.log('\nReasoning Token Details:');
                console.log('----------------------');
                console.log(JSON.stringify(completion.usage.completion_tokens_details, null, 2));
            }
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

testReasoningEffort();

```

### [​](https://docs.requesty.ai/features/reasoning\#python-example-using-reasoning-budget)  Python example using reasoning budget

Copy

```
import json
import openai

# Safely load your API key
requesty_api_key = "YOUR_REQUESTY_API_KEY"

client = openai.OpenAI(
    api_key=requesty_api_key,
    base_url='https://router.requesty.ai/v1'
)

def test_reasoning_budget():
    try:
        prompt = """
            Write a bash script that takes a matrix represented as a string with
            format '[1,2],[3,4],[5,6]' and prints the transpose in the same format.
        """.strip()

        print('Sending request to reasoning model...')

        completion = client.chat.completions.create(
            model="openai/o3-mini",
            reasoning_effort="10000",
            messages=[\
                {\
                    "role": "user",\
                    "content": prompt\
                }\
            ]
        )

        # Log the completion details
        print('\nCompletion Response:')
        print('-------------------')
        if completion.choices[0].message.content:
            print(completion.choices[0].message.content)

        # Log token usage details
        print('\nToken Usage Details:')
        print('-------------------')
        if completion.usage:
            usage_details = {
                "prompt_tokens": completion.usage.prompt_tokens,
                "completion_tokens": completion.usage.completion_tokens,
                "total_tokens": completion.usage.total_tokens
            }
            print(json.dumps(usage_details, indent=2))

            # Log specific reasoning token details if available
            if completion.usage.completion_tokens_details:
                print('\nReasoning Token Details:')
                print('----------------------')
                print(completion.usage.completion_tokens_details)

    except Exception as error:
        print(f'Error: {str(error)}')

if __name__ == '__main__':
    test_reasoning_budget()

```

[Previous](https://docs.requesty.ai/features/structured-outputs) [Fallback PoliciesConfigure automatic request re-routing\\
\\
Next](https://docs.requesty.ai/features/fallback-policies)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [Notes](https://docs.requesty.ai/features/reasoning#notes)
- [Reasoning effort values](https://docs.requesty.ai/features/reasoning#reasoning-effort-values)
- [”none” or “min” effort](https://docs.requesty.ai/features/reasoning#%E2%80%9Dnone%E2%80%9D-or-%E2%80%9Cmin%E2%80%9D-effort)
- [When using OpenAI via Requesty:](https://docs.requesty.ai/features/reasoning#when-using-openai-via-requesty%3A)
- [When using Anthropic via Requesty:](https://docs.requesty.ai/features/reasoning#when-using-anthropic-via-requesty%3A)
- [When using Vertex AI via Requesty:](https://docs.requesty.ai/features/reasoning#when-using-vertex-ai-via-requesty%3A)
- [When using Google AI Studio via Requesty:](https://docs.requesty.ai/features/reasoning#when-using-google-ai-studio-via-requesty%3A)
- [Reasoning code example](https://docs.requesty.ai/features/reasoning#reasoning-code-example)
- [Javascript example using reasoning effort](https://docs.requesty.ai/features/reasoning#javascript-example-using-reasoning-effort)
- [Python example using reasoning budget](https://docs.requesty.ai/features/reasoning#python-example-using-reasoning-budget)

Assistant

Responses are generated using AI and may contain mistakes.