---
url: "https://docs.requesty.ai/features/rbac"
title: "RBAC (Role-Based Access Control) - Requesty documentation"
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

RBAC (Role-Based Access Control)

Enterprise Features

# RBAC (Role-Based Access Control)

Control user access and visibility across observability, API keys, analytics, and all platform features based on organizational roles

Role-Based Access Control (RBAC) provides comprehensive access management across the entire Requesty platform, ensuring users only see and access data appropriate to their organizational role and responsibilities.

## [​](https://docs.requesty.ai/features/rbac\#overview)  Overview

RBAC forms the foundation of enterprise security by controlling what users can see and do across observability, API keys, analytics, logs, and all platform features. This ensures data isolation, security compliance, and appropriate access levels for different organizational roles.

### [​](https://docs.requesty.ai/features/rbac\#what-rbac-controls)  What RBAC Controls

## Data Visibility

Control which logs, analytics, and observability data users can access

## API Key Management

Manage who can create, modify, and view different API keys

## Platform Features

Control access to admin panels, settings, and enterprise features

## User Isolation

Ensure users only see their own data unless granted broader permissions

## [​](https://docs.requesty.ai/features/rbac\#core-rbac-principles)  Core RBAC Principles

### [​](https://docs.requesty.ai/features/rbac\#access-control-scope)  Access Control Scope

**Platform-Wide Coverage:**

- Observability dashboards and metrics
- API key creation and management
- Log viewing and analytics
- User and group management
- Billing and usage data
- Administrative functions

**Data Isolation:**

- Individual users see only their own data by default
- Admins have organization-wide visibility
- Role-based expansion of access permissions
- Secure multi-tenant data separation

## [​](https://docs.requesty.ai/features/rbac\#current-role-types)  Current Role Types

### [​](https://docs.requesty.ai/features/rbac\#standard-user-role)  Standard User Role

**Default Access Level:**

- **Personal Data Only**: Users see logs, analytics, and metrics for their own API usage
- **Own API Keys**: Can create, modify, and view their personal API keys
- **Limited Observability**: Access to personal performance metrics and usage data
- **Basic Settings**: Manage personal account settings and preferences

**What Standard Users See:**

- Personal API request logs
- Individual usage analytics
- Own spending and limit information
- Personal session data and context

### [​](https://docs.requesty.ai/features/rbac\#administrator-role)  Administrator Role

**Organization-Wide Access:**

- **All User Data**: Complete visibility into organization logs, analytics, and metrics
- **Full API Key Management**: Create, modify, and view all organization API keys
- **Complete Observability**: Access to organization-wide performance and usage data
- **Administrative Functions**: User management, group configuration, enterprise features

**What Administrators See:**

- All organization API request logs
- Organization-wide analytics and trends
- All user spending and usage patterns
- Complete audit trails and system metrics
- Enterprise feature configuration panels

## [​](https://docs.requesty.ai/features/rbac\#rbac-implementation-across-features)  RBAC Implementation Across Features

### [​](https://docs.requesty.ai/features/rbac\#observability-%26-analytics)  Observability & Analytics

- Standard Users
- Administrators

**Personal Dashboard:** \- Individual API usage metrics - Personal request/response logs - Own performance analytics - Personal cost
tracking - Individual error rates and patterns

### [​](https://docs.requesty.ai/features/rbac\#api-key-management)  API Key Management

Standard User

Administrator

User Login

Role Check

Personal API Keys Only

All Organization API Keys

Create Personal Keys

View Own Usage

Manage Own Limits

Create Any API Key

View All Usage

Manage All Keys

Set Organization Policies

### [​](https://docs.requesty.ai/features/rbac\#data-access-patterns)  Data Access Patterns

**Standard User Data Flow:**

1. User authenticates with platform
2. RBAC filters show only personal data
3. API keys display user’s own keys only
4. Analytics show individual usage patterns
5. Logs contain only user’s API requests

**Administrator Data Flow:**

1. Admin authenticates with elevated permissions
2. RBAC grants organization-wide visibility
3. All API keys and users visible
4. Complete analytics and metrics access
5. Full audit trail and system logs available

## [​](https://docs.requesty.ai/features/rbac\#security-%26-compliance-benefits)  Security & Compliance Benefits

### [​](https://docs.requesty.ai/features/rbac\#data-protection)  Data Protection

**User Privacy:**

- Automatic data isolation between users
- Personal information protected from other users
- Individual usage patterns kept private
- Secure separation of user contexts

**Organization Security:**

- Administrative oversight with complete visibility
- Audit trails for compliance requirements
- Centralized security policy enforcement
- Role-appropriate access controls

### [​](https://docs.requesty.ai/features/rbac\#compliance-advantages)  Compliance Advantages

Data Governance

**Regulatory Compliance:**

- Clear data access boundaries for audits
- Role-based data handling procedures
- Documented access control policies
- Compliance with privacy regulations

Security Standards

**Enterprise Security:**

- Principle of least privilege implementation
- Regular access review capabilities
- Secure multi-tenant architecture
- SOC 2 and enterprise compliance support

Audit & Monitoring

**Operational Oversight:**

- Complete audit trails for all access
- Role-based activity monitoring
- Security incident detection and response
- Compliance reporting capabilities

## [​](https://docs.requesty.ai/features/rbac\#integration-with-enterprise-features)  Integration with Enterprise Features

### [​](https://docs.requesty.ai/features/rbac\#works-with-other-systems)  Works with Other Systems

**User Management Integration:**

- User roles determine platform access levels
- Individual users automatically isolated
- Admin users get organization-wide visibility
- Role assignments control feature access

**Group-Based Enhancement:**

- Groups can have shared visibility permissions
- Group admins may see group-specific data
- Flexible role assignment within groups
- Enhanced collaboration with controlled access

**API Key Policy Integration:**

- RBAC controls who can create and modify API keys
- Role-based API key sharing and management
- Permission levels for different key types
- Administrative oversight of all organization keys

### [​](https://docs.requesty.ai/features/rbac\#enterprise-feature-access)  Enterprise Feature Access

**Feature Visibility Matrix:**

| Feature | Standard User | Administrator |
| --- | --- | --- |
| Personal Analytics | ✅ Own Data | ✅ All Data |
| API Key Creation | ✅ Personal | ✅ Organization |
| User Management | ❌ | ✅ |
| Group Configuration | ❌ | ✅ |
| Approved Models | ❌ | ✅ |
| Guardrails Config | ❌ | ✅ |
| Billing Overview | ✅ Personal | ✅ Organization |
| System Settings | ❌ | ✅ |

## [​](https://docs.requesty.ai/features/rbac\#future-role-expansion)  Future Role Expansion

### [​](https://docs.requesty.ai/features/rbac\#custom-roles-coming-soon)  Custom Roles (Coming Soon)

**Planned Role Types:**

- **Group Administrators**: Manage specific groups with limited admin access
- **Read-Only Analysts**: View organization data without modification permissions
- **API Key Managers**: Specialized role for API key creation and management
- **Billing Administrators**: Financial oversight without technical admin access

**Custom Permission Sets:**

- Granular permission assignment
- Mix-and-match capability access
- Department-specific role creation
- Project-based access controls

### [​](https://docs.requesty.ai/features/rbac\#advanced-rbac-features)  Advanced RBAC Features

**Enhanced Capabilities:**

- Time-based role assignments
- Conditional access based on usage patterns
- Integration with external identity providers
- Advanced audit and compliance reporting

## [​](https://docs.requesty.ai/features/rbac\#best-practices)  Best Practices

### [​](https://docs.requesty.ai/features/rbac\#role-assignment-strategy)  Role Assignment Strategy

## Start Minimal

Begin with standard user roles and promote to admin only when necessary

## Regular Review

Periodically review role assignments and adjust based on organizational changes

## Audit Access

Monitor admin access patterns and maintain audit trails for compliance

## Document Roles

Maintain clear documentation of who has admin access and why

### [​](https://docs.requesty.ai/features/rbac\#security-implementation)  Security Implementation

**Access Management:**

- Limit admin roles to essential personnel only
- Regular access reviews and role updates
- Clear escalation procedures for access requests
- Integration with existing identity management systems

**Monitoring & Compliance:**

- Log all administrative actions
- Monitor for unusual access patterns
- Regular compliance assessments
- Incident response procedures for access violations

## [​](https://docs.requesty.ai/features/rbac\#user-experience)  User Experience

### [​](https://docs.requesty.ai/features/rbac\#for-standard-users)  For Standard Users

**Simplified Interface:**

- Clean, focused view of personal data
- No overwhelming organization-wide information
- Intuitive access to personal features
- Clear visibility into own usage and costs

### [​](https://docs.requesty.ai/features/rbac\#for-administrators)  For Administrators

**Comprehensive Control:**

- Complete organization visibility
- Administrative tools and configuration panels
- User management and oversight capabilities
- Enterprise feature configuration access

RBAC ensures that every user has the right level of access for their role while maintaining security and compliance across your
organization’s AI infrastructure.

Administrator roles have significant access to organization data and settings. Carefully manage admin role assignments and regularly
review access permissions to maintain security.

The RBAC system provides the security foundation that enables safe, compliant, and efficient AI operations across your entire organization while ensuring appropriate data visibility and access control for all users.

[Previous](https://docs.requesty.ai/features/guardrails) [Claude CodeRequesty routing for Claude Code\\
\\
Next](https://docs.requesty.ai/applications/claude-code)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [Overview](https://docs.requesty.ai/features/rbac#overview)
- [What RBAC Controls](https://docs.requesty.ai/features/rbac#what-rbac-controls)
- [Core RBAC Principles](https://docs.requesty.ai/features/rbac#core-rbac-principles)
- [Access Control Scope](https://docs.requesty.ai/features/rbac#access-control-scope)
- [Current Role Types](https://docs.requesty.ai/features/rbac#current-role-types)
- [Standard User Role](https://docs.requesty.ai/features/rbac#standard-user-role)
- [Administrator Role](https://docs.requesty.ai/features/rbac#administrator-role)
- [RBAC Implementation Across Features](https://docs.requesty.ai/features/rbac#rbac-implementation-across-features)
- [Observability & Analytics](https://docs.requesty.ai/features/rbac#observability-%26-analytics)
- [API Key Management](https://docs.requesty.ai/features/rbac#api-key-management)
- [Data Access Patterns](https://docs.requesty.ai/features/rbac#data-access-patterns)
- [Security & Compliance Benefits](https://docs.requesty.ai/features/rbac#security-%26-compliance-benefits)
- [Data Protection](https://docs.requesty.ai/features/rbac#data-protection)
- [Compliance Advantages](https://docs.requesty.ai/features/rbac#compliance-advantages)
- [Integration with Enterprise Features](https://docs.requesty.ai/features/rbac#integration-with-enterprise-features)
- [Works with Other Systems](https://docs.requesty.ai/features/rbac#works-with-other-systems)
- [Enterprise Feature Access](https://docs.requesty.ai/features/rbac#enterprise-feature-access)
- [Future Role Expansion](https://docs.requesty.ai/features/rbac#future-role-expansion)
- [Custom Roles (Coming Soon)](https://docs.requesty.ai/features/rbac#custom-roles-coming-soon)
- [Advanced RBAC Features](https://docs.requesty.ai/features/rbac#advanced-rbac-features)
- [Best Practices](https://docs.requesty.ai/features/rbac#best-practices)
- [Role Assignment Strategy](https://docs.requesty.ai/features/rbac#role-assignment-strategy)
- [Security Implementation](https://docs.requesty.ai/features/rbac#security-implementation)
- [User Experience](https://docs.requesty.ai/features/rbac#user-experience)
- [For Standard Users](https://docs.requesty.ai/features/rbac#for-standard-users)
- [For Administrators](https://docs.requesty.ai/features/rbac#for-administrators)

Assistant

Responses are generated using AI and may contain mistakes.