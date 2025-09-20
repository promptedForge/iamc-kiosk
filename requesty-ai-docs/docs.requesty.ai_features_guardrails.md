---
url: "https://docs.requesty.ai/features/guardrails"
title: "Guardrails - Requesty documentation"
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

Guardrails

Enterprise Features

# Guardrails

Enterprise-grade security filters that automatically detect and block sensitive information in AI requests and responses

Guardrails provide organization-level security filters that automatically detect and mask sensitive information in AI requests and responses, acting as a protective layer to prevent data leaks and maintain compliance.

## [​](https://docs.requesty.ai/features/guardrails\#overview)  Overview

Guardrails offer enterprise-grade data protection that automatically prevents sensitive information from being exposed through AI interactions. This bidirectional security system scans both incoming requests and outgoing responses to ensure compliance and data safety.

### [​](https://docs.requesty.ai/features/guardrails\#what-guardrails-protect)  What Guardrails Protect

## Data Security

Automatically detect and mask sensitive data before it reaches AI models

## Compliance

Meet GDPR, PCI DSS, SOC 2, and other regulatory requirements

## Risk Management

Prevent accidental exposure of credentials, financial data, and personal information

## Organization-Wide

Apply consistent security policies across all API keys and models

## [​](https://docs.requesty.ai/features/guardrails\#available-guardrail-types)  Available Guardrail Types

### [​](https://docs.requesty.ai/features/guardrails\#security-categories)  Security Categories

- Personal Data
- Credentials & Secrets
- Financial Information

**PII (Personally Identifiable Information)**

- Social Security Numbers
- Email addresses and phone numbers
- Names and personal identifiers
- GDPR compliance protection

## [​](https://docs.requesty.ai/features/guardrails\#how-guardrails-work)  How Guardrails Work

### [​](https://docs.requesty.ai/features/guardrails\#security-flow-process)  Security Flow Process

Yes

No

Yes

No

User API Request

Input Scanning

Sensitive Data

Detected?

Mask Sensitive Data

Forward to AI Model

AI Response

Output Scanning

Response Contains

Sensitive Data?

Mask Response Data

Return Clean Response

### [​](https://docs.requesty.ai/features/guardrails\#processing-steps)  Processing Steps

1

Request Received

User makes API request through any organization API key

2

Input Scanning

Guardrails scan request content for sensitive data patterns

3

Data Masking

If sensitive data detected, it’s automatically masked before processing

4

Model Processing

Requests with masked data proceed to AI model for processing

5

Output Scanning

Guardrails scan AI response for any sensitive information

6

Response Masking

Sensitive data in responses is masked before returning to user

## [​](https://docs.requesty.ai/features/guardrails\#admin-management)  Admin Management

### [​](https://docs.requesty.ai/features/guardrails\#guardrail-configuration)  Guardrail Configuration

**Access Control:**

- Navigate to Admin Panel → Guardrails tab
- Real-time toggle switches for each guardrail type
- Immediate organization-wide application
- Success/error feedback for configuration changes

**Available Controls:**

PII Protection

**Toggle to Enable/Disable:**

- Personally Identifiable Information detection
- Email addresses, phone numbers, SSNs
- GDPR compliance scanning
- Personal name and identifier blocking

Secret Keys Protection

**Toggle to Enable/Disable:**

- API key and token detection
- Database credential scanning
- Service account key protection
- Authentication secret blocking

Financial Data Protection

**PCI Compliance:**

- Credit card number detection
- Payment card verification codes
- Cardholder data protection

**Banking Information:**

- Account number scanning
- Routing number detection
- Bank identifier protection

**General Financial:**

- Investment data blocking
- Financial statement protection
- Trading information security

### [​](https://docs.requesty.ai/features/guardrails\#configuration-management)  Configuration Management

**Real-Time Updates:**

- Changes apply organization-wide immediately
- No restart or downtime required
- Instant activation/deactivation of security rules
- Visual confirmation of configuration changes

## [​](https://docs.requesty.ai/features/guardrails\#protection-scope)  Protection Scope

### [​](https://docs.requesty.ai/features/guardrails\#comprehensive-coverage)  Comprehensive Coverage

**All API Keys:**

- Guardrails apply across every API key in the organization
- No exceptions or bypass mechanisms
- Consistent security regardless of key configuration

**All Models:**

- Works with any approved model (OpenAI, Anthropic, Azure, etc.)
- Provider-agnostic security implementation
- Universal protection across model types

**All Endpoints:**

- Chat completion requests
- Text generation endpoints
- Streaming responses
- Any AI interaction endpoint

**Bidirectional Security:**

- Incoming request scanning
- Outgoing response filtering
- Complete data flow protection

## [​](https://docs.requesty.ai/features/guardrails\#compliance-%26-use-cases)  Compliance & Use Cases

### [​](https://docs.requesty.ai/features/guardrails\#regulatory-compliance)  Regulatory Compliance

## GDPR Compliance

PII detection ensures European data protection regulation compliance

## PCI DSS

Payment card data protection meets financial industry standards

## SOC 2

Security controls support SOC 2 Type II requirements

### [​](https://docs.requesty.ai/features/guardrails\#enterprise-protection-scenarios)  Enterprise Protection Scenarios

**Data Leak Prevention:**

- Automatic detection and masking without manual review
- Prevent accidental credential exposure in AI prompts
- Mask financial data to protect it from model training
- Protect customer personal information in support interactions

**Risk Management:**

- Organization-wide policy enforcement
- Consistent security across all teams and projects
- Audit trail for compliance reporting
- Automatic threat detection and response

**Operational Security:**

- Real-time protection during AI interactions
- No impact on legitimate use cases
- Transparent security that doesn’t disrupt workflows
- Scalable protection for growing organizations

## [​](https://docs.requesty.ai/features/guardrails\#integration-with-enterprise-features)  Integration with Enterprise Features

### [​](https://docs.requesty.ai/features/guardrails\#works-with-other-systems)  Works with Other Systems

**User Management Integration:**

- Guardrails apply to all organization users
- Individual user activity protected automatically
- No per-user configuration required

**Group-Based Protection:**

- All group members receive same security protection
- Group API keys inherit guardrail settings
- Consistent security across team structures

**Approved Models Compatibility:**

- Guardrails work with any approved model
- Security maintained regardless of model selection
- Protection spans entire approved model catalog

### [​](https://docs.requesty.ai/features/guardrails\#api-key-policy-integration)  API Key Policy Integration

Guardrails

API Key

Approved Models

User Groups

Protected Output

Security Scan

Compliance Rules

**Security Layering:**

- Guardrails provide base-level organization security
- API key policies add feature-specific controls
- User/group permissions manage access levels
- Combined system ensures comprehensive protection

## [​](https://docs.requesty.ai/features/guardrails\#best-practices)  Best Practices

### [​](https://docs.requesty.ai/features/guardrails\#configuration-strategy)  Configuration Strategy

## Start Comprehensive

Enable all relevant guardrails from the beginning to establish strong security baseline

## Monitor Patterns

Review blocked requests to understand common security issues and adjust policies

## Compliance Alignment

Match guardrail configuration to your industry’s specific compliance requirements

## Regular Review

Periodically review and update guardrail settings as business needs evolve

### [​](https://docs.requesty.ai/features/guardrails\#implementation-guidelines)  Implementation Guidelines

**Rollout Strategy:**

1. Enable guardrails in testing environment first
2. Monitor for false positives with sample data
3. Adjust detection sensitivity if needed
4. Deploy to production with monitoring
5. Train teams on security error handling

**Ongoing Management:**

- Regular compliance audits
- Security incident response procedures
- Team training on data handling best practices
- Integration with existing security workflows

## [​](https://docs.requesty.ai/features/guardrails\#error-handling-%26-user-experience)  Error Handling & User Experience

### [​](https://docs.requesty.ai/features/guardrails\#when-guardrails-trigger)  When Guardrails Trigger

**Current Implementation (Data Masking):**

- Sensitive data automatically replaced with masked placeholders
- Seamless processing with protected information
- No workflow interruption for users
- Audit logging for security team review

**Future Features:**

- **Request Blocking**: Option to completely block requests containing sensitive data
- **Reverse Mapping**: Ability to unmask data when appropriate for authorized users
- **Advanced Filtering**: More granular control over masking vs blocking behavior
- **Custom Masking Patterns**: Organization-specific masking rules and formats

Guardrails are designed to err on the side of caution. Some legitimate data may be masked if it contains patterns similar to sensitive
information. Organizations should review masking patterns to ensure optimal balance between security and functionality.

Guardrails provide the foundation for enterprise AI security, automatically protecting your organization’s most sensitive data without
requiring manual oversight or complex configuration.

The Guardrails system ensures your organization can leverage AI capabilities while maintaining the highest standards of data protection and regulatory compliance.

[Previous](https://docs.requesty.ai/features/approved-models) [RBAC (Role-Based Access Control)Control user access and visibility across observability, API keys, analytics, and all platform features based on organizational roles\\
\\
Next](https://docs.requesty.ai/features/rbac)

[x](https://x.com/requestyAI) [linkedin](https://linkedin.com/company/requesty)

[Powered by Mintlify](https://mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=requesty)

On this page

- [Overview](https://docs.requesty.ai/features/guardrails#overview)
- [What Guardrails Protect](https://docs.requesty.ai/features/guardrails#what-guardrails-protect)
- [Available Guardrail Types](https://docs.requesty.ai/features/guardrails#available-guardrail-types)
- [Security Categories](https://docs.requesty.ai/features/guardrails#security-categories)
- [How Guardrails Work](https://docs.requesty.ai/features/guardrails#how-guardrails-work)
- [Security Flow Process](https://docs.requesty.ai/features/guardrails#security-flow-process)
- [Processing Steps](https://docs.requesty.ai/features/guardrails#processing-steps)
- [Admin Management](https://docs.requesty.ai/features/guardrails#admin-management)
- [Guardrail Configuration](https://docs.requesty.ai/features/guardrails#guardrail-configuration)
- [Configuration Management](https://docs.requesty.ai/features/guardrails#configuration-management)
- [Protection Scope](https://docs.requesty.ai/features/guardrails#protection-scope)
- [Comprehensive Coverage](https://docs.requesty.ai/features/guardrails#comprehensive-coverage)
- [Compliance & Use Cases](https://docs.requesty.ai/features/guardrails#compliance-%26-use-cases)
- [Regulatory Compliance](https://docs.requesty.ai/features/guardrails#regulatory-compliance)
- [Enterprise Protection Scenarios](https://docs.requesty.ai/features/guardrails#enterprise-protection-scenarios)
- [Integration with Enterprise Features](https://docs.requesty.ai/features/guardrails#integration-with-enterprise-features)
- [Works with Other Systems](https://docs.requesty.ai/features/guardrails#works-with-other-systems)
- [API Key Policy Integration](https://docs.requesty.ai/features/guardrails#api-key-policy-integration)
- [Best Practices](https://docs.requesty.ai/features/guardrails#best-practices)
- [Configuration Strategy](https://docs.requesty.ai/features/guardrails#configuration-strategy)
- [Implementation Guidelines](https://docs.requesty.ai/features/guardrails#implementation-guidelines)
- [Error Handling & User Experience](https://docs.requesty.ai/features/guardrails#error-handling-%26-user-experience)
- [When Guardrails Trigger](https://docs.requesty.ai/features/guardrails#when-guardrails-trigger)

Assistant

Responses are generated using AI and may contain mistakes.