---
url: "https://docs.requesty.ai/api-reference/endpoint/messages-create"
title: "Create Message - Requesty documentation"
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

API Reference

Create Message

API Reference

# Create Message

Send a message to an Anthropic-compatible model and receive a response

POST

/

v1

/

messages

Try it

Create message

cURL

Copy

```
curl --request POST \
  --url https://router.requesty.ai/v1/messages \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <x-api-key>' \
  --data '{
  "model": "anthropic/claude-sonnet-4-20250514",
  "max_tokens": 1024,
  "messages": [\
    {\
      "role": "user",\
      "content": "<string>"\
    }\
  ],
  "system": "<string>",
  "temperature": 1,
  "top_p": 0.5,
  "top_k": 1,
  "stream": true,
  "stop_sequences": [\
    "<string>"\
  ],
  "tools": [\
    {\
      "name": "<string>",\
      "description": "<string>",\
      "input_schema": {}\
    }\
  ],
  "tool_choice": "auto"
}'
```

200

400

401

Copy

```
{
  "id": "<string>",
  "type": "message",
  "role": "assistant",
  "content": [\
    {\
      "type": "text",\
      "text": "<string>"\
    }\
  ],
  "model": "<string>",
  "stop_reason": "end_turn",
  "stop_sequence": "<string>",
  "usage": {
    "input_tokens": 123,
    "output_tokens": 123
  }
}
```

Send a message to an Anthropic-compatible model and receive a response. This endpoint follows the Anthropic Messages API format and supports all Anthropic models as well as compatible models from other providers through Requesty’s routing.

## [​](https://docs.requesty.ai/api-reference/endpoint/messages-create\#base-url)  Base URL

Copy

```
https://router.requesty.ai/v1/messages

```

## [​](https://docs.requesty.ai/api-reference/endpoint/messages-create\#authentication)  Authentication

Include your Requesty API key in the request headers using Anthropic’s standard format:

Copy

```
x-api-key: YOUR_REQUESTY_API_KEY

```

## [​](https://docs.requesty.ai/api-reference/endpoint/messages-create\#headers)  Headers

| Header | Required | Description |
| --- | --- | --- |
| `x-api-key` | ✅ | Your Requesty API key (Anthropic format) |
| `Content-Type` | ✅ | Must be `application/json` |
| `anthropic-version` | ❌ | API version (defaults to `2023-06-01`) |

## [​](https://docs.requesty.ai/api-reference/endpoint/messages-create\#example-request)  Example Request

Copy

```
curl https://router.requesty.ai/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_REQUESTY_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "anthropic/claude-sonnet-4-20250514",
    "max_tokens": 1024,
    "messages": [\
      {\
        "role": "user",\
        "content": "Hello, Claude!"\
      }\
    ]
  }'

```

## [​](https://docs.requesty.ai/api-reference/endpoint/messages-create\#model-selection)  Model Selection

You can use any model available in the [Model Library](https://app.requesty.ai/model-list). Examples:

- **Anthropic Models:** `anthropic/claude-sonnet-4-20250514`, `anthropic/claude-3-7-sonnet`
- **OpenAI Models:** `openai/gpt-4o`, `openai/gpt-4o-mini`
- **Google Models:** `google/gemini-2.0-flash-exp`
- **Other Providers:** `mistral/mistral-large-2411`, `meta/llama-3.3-70b-instruct`

While this endpoint uses the Anthropic Messages format, Requesty automatically handles format conversion for non-Anthropic models, so you
can use any supported model with this endpoint.

## [​](https://docs.requesty.ai/api-reference/endpoint/messages-create\#streaming)  Streaming

Enable streaming responses by setting `stream: true`:

Copy

```
{
	"model": "anthropic/claude-sonnet-4-20250514",
	"max_tokens": 1024,
	"stream": true,
	"messages": [\
		{\
			"role": "user",\
			"content": "Write a short story"\
		}\
	]
}

```

## [​](https://docs.requesty.ai/api-reference/endpoint/messages-create\#vision-support)  Vision Support

Send images using the content blocks format:

Copy

```
{
	"model": "anthropic/claude-sonnet-4-20250514",
	"max_tokens": 1024,
	"messages": [\
		{\
			"role": "user",\
			"content": [\
				{\
					"type": "text",\
					"text": "What do you see in this image?"\
				},\
				{\
					"type": "image",\
					"source": {\
						"type": "base64",\
						"media_type": "image/jpeg",\
						"data": "/9j/4AAQSkZJRgABAQAAAQABAAD..."\
					}\
				}\
			]\
		}\
	]
}

```

## [​](https://docs.requesty.ai/api-reference/endpoint/messages-create\#pdf-support)  PDF Support

You can send PDFs, encoded in base 64 format:

Copy

```
{
	"model": "anthropic/claude-sonnet-4-20250514",
	"max_tokens": 1024,
	"messages": [\
		{\
			"role": "user",\
			"content": [\
				{\
					"type": "text",\
					"text": "What is in this PDF?"\
				},\
                {\
                    "type": "document",\
                    "source": {\
                        "type": "base64",\
                        "media_type": "application/pdf",\
                        "data": "JVBERi0=..."\
                    }\
				}\
			]\
		}\
	]
}

```

## [​](https://docs.requesty.ai/api-reference/endpoint/messages-create\#tool-use)  Tool Use

Define tools that the model can call:

Copy

```
{
	"model": "anthropic/claude-sonnet-4-20250514",
	"max_tokens": 1024,
	"tools": [\
		{\
			"name": "get_weather",\
			"description": "Get the current weather in a given location",\
			"input_schema": {\
				"type": "object",\
				"properties": {\
					"location": {\
						"type": "string",\
						"description": "The city and state, e.g. San Francisco, CA"\
					}\
				},\
				"required": ["location"]\
			}\
		}\
	],
	"messages": [\
		{\
			"role": "user",\
			"content": "What's the weather like in New York?"\
		}\
	]
}

```

## [​](https://docs.requesty.ai/api-reference/endpoint/messages-create\#system-prompts)  System Prompts

Include system instructions using the `system` parameter:

Copy

```
{
	"model": "anthropic/claude-sonnet-4-20250514",
	"max_tokens": 1024,
	"system": "You are a helpful assistant that always responds in a friendly, professional manner.",
	"messages": [\
		{\
			"role": "user",\
			"content": "Hello!"\
		}\
	]
}

```

## [​](https://docs.requesty.ai/api-reference/endpoint/messages-create\#error-handling)  Error Handling

The API returns standard HTTP status codes:

- `200` \- Success
- `400` \- Bad Request (invalid parameters)
- `401` \- Unauthorized (invalid API key)
- `403` \- Forbidden (insufficient permissions)
- `429` \- Rate Limited
- `500` \- Internal Server Error

Example error response:

Copy

```
{
	"error": {
		"type": "invalid_request_error",
		"message": "max_tokens is required"
	}
}

```

## [​](https://docs.requesty.ai/api-reference/endpoint/messages-create\#response-format)  Response Format

Successful responses follow the Anthropic Messages format:

Copy

```
{
	"id": "msg_01ABC123",
	"type": "message",
	"role": "assistant",
	"content": [\
		{\
			"type": "text",\
			"text": "Hello! I'm Claude, an AI assistant. How can I help you today?"\
		}\
	],
	"model": "anthropic/claude-sonnet-4-20250514",
	"stop_reason": "end_turn",
	"usage": {
		"input_tokens": 12,
		"output_tokens": 18
	}
}

```

## [​](https://docs.requesty.ai/api-reference/endpoint/messages-create\#key-differences-from-openai-chat-completions)  Key Differences from OpenAI Chat Completions

- **Authentication:** Uses `x-api-key` header instead of `Authorization: Bearer`
- **Required `max_tokens`:** Unlike OpenAI’s API, the `max_tokens` parameter is required
- **Content Blocks:** Messages use content blocks for rich content (text, images, tool calls)
- **System Parameter:** System prompts are specified as a separate `system` parameter, not as a message
- **Role Restrictions:** Only `user` and `assistant` roles are supported in messages (no `system` role)

For the most seamless experience with Anthropic models, use this endpoint. For broader compatibility across all providers, consider using
the [Chat Completions endpoint](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create) instead.

#### Headers

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#parameter-x-api-key)

x-api-key

string

required

Your Requesty API key

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#parameter-anthropic-version)

anthropic-version

string

default:2023-06-01

The version of the Anthropic API to use

Example:

`"2023-06-01"`

#### Body

application/json

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-model)

model

string

default:anthropic/claude-sonnet-4-20250514

required

The model to use for the completion

Example:

`"anthropic/claude-sonnet-4-20250514"`

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-max-tokens)

max\_tokens

integer

required

The maximum number of tokens to generate before stopping

Required range: `x >= 1`

Example:

`1024`

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-messages)

messages

object\[\]

required

Input messages

Show child attributes

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-messages-role)

role

enum<string>

required

The role of the messages author

Available options:

`user`,

`assistant`

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-messages-content)

content

stringobject\[\]

required

The contents of the message

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-system)

system

string

System prompt to be used for the completion

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-temperature)

temperature

number

Amount of randomness injected into the response

Required range: `0 <= x <= 2`

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-top-p)

top\_p

number

Use nucleus sampling

Required range: `0 <= x <= 1`

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-top-k)

top\_k

integer

Only sample from the top K options for each subsequent token

Required range: `x >= 0`

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-stream)

stream

boolean

Whether to incrementally stream the response using server-sent events

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-stop-sequences)

stop\_sequences

string\[\]

Custom text sequences that will cause the model to stop generating

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-tools)

tools

object\[\]

Definitions of tools that the model may use

Show child attributes

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-tools-name)

name

string

required

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-tools-description)

description

string

required

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-tools-input-schema)

input\_schema

object

required

JSON schema for the tool input

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#body-tool-choice)

tool\_choice

enum<string>object

How the model should use the provided tools

Available options:

`auto`,

`any`

#### Response

200

application/json

Message response

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#response-id)

id

string

required

Unique object identifier

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#response-type)

type

enum<string>

required

Object type

Available options:

`message`

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#response-role)

role

enum<string>

required

Conversational role of the generated message

Available options:

`assistant`

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#response-content)

content

object\[\]

required

Content generated by the model

- Option 1
- Option 2
- Option 3
- Option 4

Show child attributes

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#response-content-type)

type

enum<string>

required

Available options:

`text`

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#response-content-text)

text

string

required

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#response-model)

model

string

required

The model that handled the request

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#response-stop-reason)

stop\_reason

enum<string>

required

The reason that we stopped

Available options:

`end_turn`,

`max_tokens`,

`stop_sequence`,

`tool_use`

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#response-usage)

usage

object

required

Show child attributes

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#response-usage-input-tokens)

usage.input\_tokens

integer

required

The number of input tokens which were used

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#response-usage-output-tokens)

usage.output\_tokens

integer

required

The number of output tokens which were used

[​](https://docs.requesty.ai/api-reference/endpoint/messages-create#response-stop-sequence)

stop\_sequence

string

Which custom stop sequence was generated

[Previous](https://docs.requesty.ai/api-reference/endpoint/chat-completions-create) [Create EmbeddingCreate embeddings for text using various AI models\\
\\
Next](https://docs.requesty.ai/api-reference/endpoint/embeddings-create)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

Create message

cURL

Copy

```
curl --request POST \
  --url https://router.requesty.ai/v1/messages \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <x-api-key>' \
  --data '{
  "model": "anthropic/claude-sonnet-4-20250514",
  "max_tokens": 1024,
  "messages": [\
    {\
      "role": "user",\
      "content": "<string>"\
    }\
  ],
  "system": "<string>",
  "temperature": 1,
  "top_p": 0.5,
  "top_k": 1,
  "stream": true,
  "stop_sequences": [\
    "<string>"\
  ],
  "tools": [\
    {\
      "name": "<string>",\
      "description": "<string>",\
      "input_schema": {}\
    }\
  ],
  "tool_choice": "auto"
}'
```

200

400

401

Copy

```
{
  "id": "<string>",
  "type": "message",
  "role": "assistant",
  "content": [\
    {\
      "type": "text",\
      "text": "<string>"\
    }\
  ],
  "model": "<string>",
  "stop_reason": "end_turn",
  "stop_sequence": "<string>",
  "usage": {
    "input_tokens": 123,
    "output_tokens": 123
  }
}
```

Assistant

Responses are generated using AI and may contain mistakes.