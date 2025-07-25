# Requirements Document

## Introduction

实现微信公众号文章解析功能，用户输入文章链接后自动抓取内容并生成AI摘要。系统需要支持环境变量配置API密钥，使用指定的代理服务，并采用OpenAI格式的API调用。

## Requirements

### Requirement 1

**User Story:** As a user, I want to input a WeChat article URL and automatically get it parsed and summarized, so that I can quickly understand the article content.

#### Acceptance Criteria

1. WHEN user inputs a valid WeChat article URL THEN system SHALL validate the URL format
2. WHEN URL validation passes THEN system SHALL display loading state and start parsing
3. WHEN parsing starts THEN system SHALL fetch article content via proxy service
4. WHEN content is fetched THEN system SHALL extract clean text using readability algorithm
5. WHEN text is extracted THEN system SHALL call AI service to generate structured summary
6. WHEN summary is generated THEN system SHALL render it in Bento card format
7. IF any step fails THEN system SHALL display appropriate error message with retry option

### Requirement 2

**User Story:** As a developer, I want to configure API keys and service endpoints via environment variables, so that the application can work with different API providers securely.

#### Acceptance Criteria

1. WHEN application starts THEN system SHALL read API configuration from .env file
2. WHEN .env file contains VITE_API_KEY THEN system SHALL use it for AI service authentication
3. WHEN .env file contains VITE_PROXY_URL THEN system SHALL use it as proxy service endpoint
4. IF environment variables are missing THEN system SHALL display configuration error message
5. WHEN API key is invalid THEN system SHALL show authentication error with helpful guidance

### Requirement 3

**User Story:** As a user, I want the system to use OpenAI-compatible API format, so that it can work with various AI service providers seamlessly.

#### Acceptance Criteria

1. WHEN making AI API calls THEN system SHALL use OpenAI chat completions format
2. WHEN sending requests THEN system SHALL include proper headers and authentication
3. WHEN receiving responses THEN system SHALL parse OpenAI-compatible response format
4. WHEN API returns error THEN system SHALL handle different error types appropriately
5. WHEN token limit is exceeded THEN system SHALL implement text chunking strategy

### Requirement 4

**User Story:** As a user, I want real-time feedback during the parsing process, so that I know the system is working and can estimate completion time.

#### Acceptance Criteria

1. WHEN parsing starts THEN system SHALL show progress indicator with current step
2. WHEN each processing step completes THEN system SHALL update progress status
3. WHEN processing takes longer than expected THEN system SHALL show estimated time remaining
4. WHEN user wants to cancel THEN system SHALL provide cancel option and stop processing
5. WHEN processing completes THEN system SHALL show success animation and result

### Requirement 5

**User Story:** As a user, I want proper error handling and recovery options, so that I can resolve issues and successfully parse articles.

#### Acceptance Criteria

1. WHEN network error occurs THEN system SHALL show retry button with exponential backoff
2. WHEN proxy service fails THEN system SHALL try alternative proxy endpoints
3. WHEN AI service is unavailable THEN system SHALL queue request and retry later
4. WHEN article content cannot be extracted THEN system SHALL suggest manual content input
5. WHEN parsing fails completely THEN system SHALL provide troubleshooting guidance