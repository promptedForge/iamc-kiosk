---
url: "https://docs.requesty.ai/features/users"
title: "User Management - Requesty documentation"
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

Enterprise Features

User Management

Enterprise Features

# User Management

Manage organization members, set spending limits, and track user activity

User Management in Requesty allows administrators to manage organization members, control spending, and track user activity across your organization.

## [​](https://docs.requesty.ai/features/users\#core-capabilities)  Core Capabilities

### [​](https://docs.requesty.ai/features/users\#user-listing-%26-overview)  User Listing & Overview

View all organization users with comprehensive sorting and filtering options to manage your team effectively.**Key Features:**

- Complete user directory with activity status
- Sorting and filtering capabilities
- Bulk selection for group operations
- Real-time spending and limit tracking

### [​](https://docs.requesty.ai/features/users\#user-status-types)  User Status Types

- Active Users
- Inactive Users

**Active Status**: User has a private context and can make API calls - Currently able to use Requesty services - Has established API
access - Appears with active indicator in user list

## [​](https://docs.requesty.ai/features/users\#admin-controls)  Admin Controls

### [​](https://docs.requesty.ai/features/users\#bulk-operations)  Bulk Operations

Efficiently manage multiple users simultaneously:

- **Bulk Group Assignment**: Select multiple users and add them to groups
- **Default Limits**: Set monthly spending limits for new users
- **Mass Updates**: Apply changes across selected users

### [​](https://docs.requesty.ai/features/users\#individual-user-controls)  Individual User Controls

**Spending Management:**

- Set individual monthly spending limits per user
- Track current month spending vs limits
- View spending history and trends

**Group Management:**

- View all groups user belongs to (displayed as badges)
- Add/remove users from specific groups
- Manage group-based access controls

**Activity Monitoring:**

- See user’s current activity status
- Track API usage patterns
- Monitor context and session data

## [​](https://docs.requesty.ai/features/users\#organization-configuration)  Organization Configuration

### [​](https://docs.requesty.ai/features/users\#global-settings)  Global Settings

- **Default Monthly Limit**: Set automatic spending limits for new organization members
- **Organization Policies**: Configure global rules and restrictions
- **Access Controls**: Manage organization-wide permissions

### [​](https://docs.requesty.ai/features/users\#user-group-relationship)  User-Group Relationship

The user management system integrates closely with groups and API keys:

Organization

Users

Groups

Monthly Limits

Activity Status

API Keys

Features

Spending Tracking

**How It Works:**

1. **Users** are organization members with individual spending limits
2. **Groups** are collections of users for easier management
3. **API Keys** can be associated with groups/users for access control
4. **Features** on API keys affect what users in those groups can do

## [​](https://docs.requesty.ai/features/users\#example-workflow)  Example Workflow

Here’s a typical admin workflow for managing users:

1

Create Group

Admin creates an “Engineering” group for development team

2

Add Users

Add engineers (users) to the Engineering group

3

Configure API Keys

Create API key with specific features enabled for the group

4

Set Limits

Configure monthly spending limits for users

5

Monitor Usage

Track spending per user and per group

## [​](https://docs.requesty.ai/features/users\#spending-control-%26-monitoring)  Spending Control & Monitoring

### [​](https://docs.requesty.ai/features/users\#monthly-limits)  Monthly Limits

- Set individual spending limits per user
- Configure default limits for new users
- Automatic alerts when approaching limits
- Spending cutoffs when limits are reached

### [​](https://docs.requesty.ai/features/users\#usage-tracking)  Usage Tracking

- Real-time spending monitoring
- Monthly spend vs limit comparisons
- Historical usage patterns
- Group-level spending aggregation

User spending limits help control costs while group assignments enable efficient access management and feature distribution.

## [​](https://docs.requesty.ai/features/users\#best-practices)  Best Practices

## Spending Management

Set reasonable monthly limits and monitor usage patterns to prevent unexpected costs

## Group Organization

Organize users into logical groups that match your team structure and access needs

## Regular Monitoring

Review user activity and spending regularly to optimize your organization’s usage

## Access Control

Use group-based API key management for secure and scalable access control

[Previous](https://docs.requesty.ai/features/session-reconstruction) [Groups ManagementOrganize users, track group spending, and manage collective access to API keys and features\\
\\
Next](https://docs.requesty.ai/features/groups)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [Core Capabilities](https://docs.requesty.ai/features/users#core-capabilities)
- [User Listing & Overview](https://docs.requesty.ai/features/users#user-listing-%26-overview)
- [User Status Types](https://docs.requesty.ai/features/users#user-status-types)
- [Admin Controls](https://docs.requesty.ai/features/users#admin-controls)
- [Bulk Operations](https://docs.requesty.ai/features/users#bulk-operations)
- [Individual User Controls](https://docs.requesty.ai/features/users#individual-user-controls)
- [Organization Configuration](https://docs.requesty.ai/features/users#organization-configuration)
- [Global Settings](https://docs.requesty.ai/features/users#global-settings)
- [User-Group Relationship](https://docs.requesty.ai/features/users#user-group-relationship)
- [Example Workflow](https://docs.requesty.ai/features/users#example-workflow)
- [Spending Control & Monitoring](https://docs.requesty.ai/features/users#spending-control-%26-monitoring)
- [Monthly Limits](https://docs.requesty.ai/features/users#monthly-limits)
- [Usage Tracking](https://docs.requesty.ai/features/users#usage-tracking)
- [Best Practices](https://docs.requesty.ai/features/users#best-practices)

Assistant

Responses are generated using AI and may contain mistakes.