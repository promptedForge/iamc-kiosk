---
url: "https://docs.requesty.ai/features/groups"
title: "Groups Management - Requesty documentation"
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

Groups Management

Enterprise Features

# Groups Management

Organize users, track group spending, and manage collective access to API keys and features

Groups in Requesty allow administrators to organize organization members into logical units, track spending collectively, and manage user access efficiently.

## [​](https://docs.requesty.ai/features/groups\#groups-system-overview)  Groups System Overview

Groups provide a powerful way to organize your organization’s users and manage their access to Requesty’s features and API keys.

### [​](https://docs.requesty.ai/features/groups\#what-groups-do)  What Groups Do

## User Organization

Organize organization members into logical units like Marketing, Engineering, Sales, etc.

## Spending Tracking

Track monthly spending per group with aggregated spend monitoring

## Access Management

Allow admins to manage user access to API keys and features collectively

## Team Structure

Reflect your company’s organizational structure in your Requesty setup

## [​](https://docs.requesty.ai/features/groups\#how-groups-work)  How Groups Work

### [​](https://docs.requesty.ai/features/groups\#creating-groups)  Creating Groups

Administrators can create named groups that match your organizational structure:

- **Department Groups**: Engineering, Marketing, Sales, Support
- **Project Groups**: Product A Team, Research Division, Beta Testers
- **Function Groups**: Admins, Developers, Content Creators
- **Custom Groups**: Any logical grouping that fits your needs

### [​](https://docs.requesty.ai/features/groups\#member-management)  Member Management

**Adding Members:**

- **Drag & Drop**: Intuitive interface for moving users between groups
- **Dialog-Based**: Select multiple users and assign to groups
- **Bulk Operations**: Add many users to groups simultaneously

**Removing Members:**

- Easy removal of users from groups
- View group membership at a glance
- Track who belongs to which groups

### [​](https://docs.requesty.ai/features/groups\#spending-tracking)  Spending Tracking

Groups provide powerful spending insights:

- **Monthly Aggregation**: See total spending across all group members
- **Trend Analysis**: Track spending patterns over time
- **Budget Management**: Set and monitor group-level spending goals
- **Cost Allocation**: Understand which teams drive API usage

## [​](https://docs.requesty.ai/features/groups\#group-structure-%26-organization)  Group Structure & Organization

### [​](https://docs.requesty.ai/features/groups\#hierarchical-organization)  Hierarchical Organization

Organization

Engineering Group

Marketing Group

Sales Group

Backend Engineers

Frontend Engineers

DevOps Engineers

Content Team

Design Team

Sales Reps

Sales Engineers

### [​](https://docs.requesty.ai/features/groups\#flexible-membership)  Flexible Membership

- Users can belong to multiple groups
- Cross-functional team support
- Project-based temporary groups
- Role-based permanent groups

## [​](https://docs.requesty.ai/features/groups\#integration-with-features-%26-api-keys)  Integration with Features & API Keys

### [​](https://docs.requesty.ai/features/groups\#access-control-flow)  Access Control Flow

1

Create Groups

Organize users into logical groups (Engineering, Marketing, etc.)

2

Configure API Keys

Create API keys with specific features and policies

3

Assign Access

Associate API keys with groups to grant access

4

Monitor Usage

Track group spending and feature usage

### [​](https://docs.requesty.ai/features/groups\#api-key-%E2%86%92-group-relationship)  API Key → Group Relationship

**How It Works:**

- API Keys can be associated with specific groups
- Groups determine which users can access which keys
- Features on API keys apply to all group members
- Policies control model access and behavior for the group

**Example Configuration:**

Copy

```
Engineering Group:
  - API Key: 'eng-prod-key'
  - Features: [streaming, structured-outputs, reasoning]
  - Models: [gpt-4, claude-3]
  - Members: [alice@company.com, bob@company.com]

Marketing Group:
  - API Key: 'marketing-key'
  - Features: [prompt-library, auto-caching]
  - Models: [gpt-3.5-turbo]
  - Members: [carol@company.com, dave@company.com]

```

## [​](https://docs.requesty.ai/features/groups\#admin-panel-workflow)  Admin Panel Workflow

### [​](https://docs.requesty.ai/features/groups\#complete-group-management-process)  Complete Group Management Process

- Setup Phase
- Daily Operations
- Optimization

**Initial Configuration:** 1\. Create groups for different teams/departments 2. Add organization members to appropriate groups 3.
Configure API keys with specific features and policies 4. Set group-level spending monitoring

## [​](https://docs.requesty.ai/features/groups\#key-relationships)  Key Relationships

Understanding how groups fit into the broader Requesty ecosystem:

### [​](https://docs.requesty.ai/features/groups\#system-architecture)  System Architecture

- **Groups** = User Organization (who can access what)
- **Features** = API Key Enhancement (how keys behave)
- **Policies** = Model Access Control (which models, fallbacks, load balancing)
- **Users** = Individual organization members with spending limits

### [​](https://docs.requesty.ai/features/groups\#integration-points)  Integration Points

**Groups ↔ Users:**

- Groups contain multiple users
- Users can belong to multiple groups
- Group membership determines API access

**Groups ↔ API Keys:**

- API keys can be assigned to groups
- All group members can use assigned keys
- Features on keys apply to all group users

**Groups ↔ Spending:**

- Group spending is aggregation of member spending
- Useful for departmental budget tracking
- Helps identify high-usage teams

## [​](https://docs.requesty.ai/features/groups\#best-practices)  Best Practices

Group Organization Strategy

**Recommended Approaches:**

- Align groups with your actual team structure
- Create both permanent (department) and temporary (project) groups
- Use descriptive names that make sense to all admins
- Plan for growth - create scalable group structures

Access Management

**Security & Control:** \- Regularly review group memberships - Remove users from groups when they change roles - Use principle of least
privilege for API key assignments - Monitor group spending to detect unusual usage

Spending Monitoring

**Cost Control:**

- Set realistic spending expectations per group
- Monitor trends to predict future usage
- Use group data to allocate budgets appropriately
- Identify opportunities for feature optimization

Groups provide fine-grained control where admins can organize users logically while configuring sophisticated API key behaviors through
features and policies.

## [​](https://docs.requesty.ai/features/groups\#advanced-features)  Advanced Features

### [​](https://docs.requesty.ai/features/groups\#analytics-%26-reporting)  Analytics & Reporting

- Group spending trends over time
- Feature usage by group
- Model preference analysis per group
- Cost efficiency metrics

### [​](https://docs.requesty.ai/features/groups\#automation-options)  Automation Options

- Auto-assign new users to default groups
- Spending alerts at group level
- Usage-based group recommendations
- Integration with external team management tools

The groups system enables sophisticated organization management while maintaining simplicity for day-to-day operations.

[Previous](https://docs.requesty.ai/features/users) [Approved ModelsControl which AI models your organization can access with centralized approval management\\
\\
Next](https://docs.requesty.ai/features/approved-models)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [Groups System Overview](https://docs.requesty.ai/features/groups#groups-system-overview)
- [What Groups Do](https://docs.requesty.ai/features/groups#what-groups-do)
- [How Groups Work](https://docs.requesty.ai/features/groups#how-groups-work)
- [Creating Groups](https://docs.requesty.ai/features/groups#creating-groups)
- [Member Management](https://docs.requesty.ai/features/groups#member-management)
- [Spending Tracking](https://docs.requesty.ai/features/groups#spending-tracking)
- [Group Structure & Organization](https://docs.requesty.ai/features/groups#group-structure-%26-organization)
- [Hierarchical Organization](https://docs.requesty.ai/features/groups#hierarchical-organization)
- [Flexible Membership](https://docs.requesty.ai/features/groups#flexible-membership)
- [Integration with Features & API Keys](https://docs.requesty.ai/features/groups#integration-with-features-%26-api-keys)
- [Access Control Flow](https://docs.requesty.ai/features/groups#access-control-flow)
- [API Key → Group Relationship](https://docs.requesty.ai/features/groups#api-key-%E2%86%92-group-relationship)
- [Admin Panel Workflow](https://docs.requesty.ai/features/groups#admin-panel-workflow)
- [Complete Group Management Process](https://docs.requesty.ai/features/groups#complete-group-management-process)
- [Key Relationships](https://docs.requesty.ai/features/groups#key-relationships)
- [System Architecture](https://docs.requesty.ai/features/groups#system-architecture)
- [Integration Points](https://docs.requesty.ai/features/groups#integration-points)
- [Best Practices](https://docs.requesty.ai/features/groups#best-practices)
- [Advanced Features](https://docs.requesty.ai/features/groups#advanced-features)
- [Analytics & Reporting](https://docs.requesty.ai/features/groups#analytics-%26-reporting)
- [Automation Options](https://docs.requesty.ai/features/groups#automation-options)

Assistant

Responses are generated using AI and may contain mistakes.