---
url: "https://docs.requesty.ai/features/structured-outputs"
title: "Structured Outputs - Requesty documentation"
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

Structured Outputs

Features

# Structured Outputs

Get consistent JSON responses across different LLMs

Requesty router supports structured JSON outputs from various model providers, making it easy to get consistent, parseable responses across different LLMs.

## [​](https://docs.requesty.ai/features/structured-outputs\#json-object-format)  JSON Object Format

For all models, you can request responses in JSON format by specifying `response_format={"type": "json_object"}`:

Copy

```
import os
from openai import OpenAI
from pydantic import BaseModel
from typing import List

# Define your data model
class Entities(BaseModel):
    attributes: List[str]
    colors: List[str]
    animals: List[str]

requesty_api_key = "YOUR_REQUESTY_API_KEY"  # Safely load your API key

# Initialize OpenAI client with Requesty router
client = OpenAI(
    api_key=requesty_api_key,
    base_url="https://router.requesty.ai/v1",
)

# Request a JSON response
response = client.chat.completions.create(
    model="openai/gpt-4o",  # Works with any supported model
    messages=[\
        {\
            "role": "system",\
            "content": "Extract entities from the input text and return them in JSON format with the following structure: {\"attributes\": [...], \"colors\": [...], \"animals\": [...]}"\
        },\
        {\
            "role": "user",\
            "content": "The quick brown fox jumps over the lazy dog with piercing blue eyes",\
        },\
    ],
    response_format={"type": "json_object"}
)

# Parse with Pydantic
content = response.choices[0].message.content
extracted = Entities.model_validate_json(content)

print(f"Attributes: {extracted.attributes}")
print(f"Colors: {extracted.colors}")
print(f"Animals: {extracted.animals}")

```

## [​](https://docs.requesty.ai/features/structured-outputs\#json-schema-for-openai-and-anthropic-models)  JSON Schema (For OpenAI and Anthropic Models)

For models that support JSON schema (currently OpenAI and Anthropic models), you can use the more powerful `parse` method with a Pydantic model:

Copy

```
from openai import OpenAI
from pydantic import BaseModel
from typing import List

class Animals(BaseModel):
    animals: List[str]

requesty_api_key = "YOUR_REQUESTY_API_KEY"  # Safely load your API key

client = OpenAI(
    api_key=request_api_key,
    base_url="https://router.requesty.ai/v1",
)

# Use the parse helper with a Pydantic model
response = client.beta.chat.completions.parse(
    model="anthropic/claude-3-7-sonnet-latest",
    messages=[\
        {\
            "role": "system",\
            "content": "Extract the animals from the input text"\
        },\
        {\
            "role": "user",\
            "content": "The quick brown fox jumps over the lazy dog"\
        },\
    ],
    response_format=Animals,
)

animals = Animals.model_validate_json(response.choices[0].message.content)
print(f"Found animals: {animals.animals}")  # ['fox', 'dog']

```

## [​](https://docs.requesty.ai/features/structured-outputs\#compatibility-notes)  Compatibility Notes

- JSON object format works with all models supported by Requesty
- JSON schema is available for OpenAI and Anthropic models
- Some models may have different capabilities for complex structured outputs
- Stream mode can also work with structured outputs (see [streaming documentation](https://requesty.mintlify.app/features/streaming))

## [​](https://docs.requesty.ai/features/structured-outputs\#error-handling)  Error Handling

When working with structured outputs, it’s important to handle potential parsing errors:

Copy

```
try:
    extracted = Entities.model_validate_json(content)
    # Process the data
except Exception as e:
    print(f"Error parsing response: {e}")
    # Handle the error appropriately

```

[Previous](https://docs.requesty.ai/features/streaming) [ReasoningEnable reasoning tokens\\
\\
Next](https://docs.requesty.ai/features/reasoning)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [JSON Object Format](https://docs.requesty.ai/features/structured-outputs#json-object-format)
- [JSON Schema (For OpenAI and Anthropic Models)](https://docs.requesty.ai/features/structured-outputs#json-schema-for-openai-and-anthropic-models)
- [Compatibility Notes](https://docs.requesty.ai/features/structured-outputs#compatibility-notes)
- [Error Handling](https://docs.requesty.ai/features/structured-outputs#error-handling)

Assistant

Responses are generated using AI and may contain mistakes.