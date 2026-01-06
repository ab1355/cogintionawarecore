# Environment Variables & Configuration

<cite>
**Referenced Files in This Document**   
- [bunfig.toml](file://bunfig.toml#L15-L17)
- [src/index.tsx](file://src/index.tsx#L32-L38)
- [package.json](file://package.json#L13-L18)
- [.gitignore](file://.gitignore#L19-L23)
- [README.md](file://README.md#L15-L19)
- [projectinfo.md](file://projectinfo.md#L71-L72)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Core Environment Configuration](#core-environment-configuration)
3. [Runtime Behavior Control](#runtime-behavior-control)
4. [Best Practices for Sensitive Data Management](#best-practices-for-sensitive-data-management)
5. [Multi-Environment Configuration Strategy](#multi-environment-configuration-strategy)
6. [Deployment Platform Integration](#deployment-platform-integration)
7. [Security Considerations](#security-considerations)
8. [Debugging and Validation Techniques](#debugging-and-validation-techniques)
9. [Conditional Script Execution](#conditional-script-execution)
10. [Conclusion](#conclusion)

## Introduction
This document provides comprehensive guidance on managing environment variables and runtime configuration for the SynchroSource cognitive-aware autonomous agent operating system. It details the configuration structure, deployment practices, and security considerations essential for production-grade deployments across various cloud platforms including Akash Network, AWS, and Vercel.

## Core Environment Configuration

The primary environment configuration is managed through `bunfig.toml`, which defines runtime environment variables that influence application behavior. The `[runtime]` section contains the `env` object that sets default environment variables:

```toml
[runtime]
env = { NODE_ENV = "development", RUNTIME = "bun" }
```

These variables are automatically injected into the runtime environment when executing Bun commands. The `NODE_ENV` variable controls the operational mode (development, production, or testing), while `RUNTIME` specifies the execution environment, which is set to "bun" to leverage Bun's optimized JavaScript runtime.

**Section sources**
- [bunfig.toml](file://bunfig.toml#L15-L17)

## Runtime Behavior Control

Environment variables directly influence server behavior, particularly in the main entry point `src/index.tsx`. The `NODE_ENV` variable determines whether development features like Hot Module Replacement (HMR) and enhanced console logging are enabled:

```typescript
development: process.env.NODE_ENV !== "production" && {
  hmr: true,
  console: true,
}
```

When `NODE_ENV` is set to "production", these development features are disabled, resulting in optimized performance and reduced logging overhead. This conditional configuration ensures that debugging tools are only active in development environments, preventing potential security risks and performance degradation in production.

The `RUNTIME` variable, while currently set to "bun", could be used to implement runtime-specific optimizations or feature flags that adapt the application behavior based on the underlying JavaScript runtime environment.

**Section sources**
- [src/index.tsx](file://src/index.tsx#L32-L38)
- [bunfig.toml](file://bunfig.toml#L15-L17)

## Best Practices for Sensitive Data Management

The project follows security best practices by avoiding hardcoded sensitive data. Instead, environment variables are used to manage configuration values, with specific patterns evident in the project structure:

1. **Dotenv File Exclusion**: The `.gitignore` file explicitly excludes various `.env` files from version control:
   ```
   .env
   .env.development.local
   .env.test.local
   .env.production.local
   .env.local
   ```

2. **Runtime Environment Injection**: Sensitive configuration should be injected at runtime rather than stored in source code. For production deployments, the recommended approach is:
   ```bash
   NODE_ENV=production bun src/index.tsx
   ```

3. **Public Environment Variables**: When building for production, public environment variables can be defined using Bun's `--define` flag:
   ```
   bun build --define:process.env.NODE_ENV='"production"' --env='BUN_PUBLIC_*'
   ```

This approach ensures that sensitive credentials and configuration values remain isolated from the codebase and are only available in the execution environment.

**Section sources**
- [.gitignore](file://.gitignore#L19-L23)
- [projectinfo.md](file://projectinfo.md#L71-L72)

## Multi-Environment Configuration Strategy

While the current `bunfig.toml` defines a basic development environment, the configuration can be extended to support multiple environments (staging, preview, testing) through several approaches:

1. **Environment-Specific Configuration Files**: Create additional TOML files such as `bunfig.staging.toml` or `bunfig.preview.toml` with environment-specific variables.

2. **Conditional Environment Loading**: Implement a configuration loader that selects the appropriate environment variables based on a `DEPLOY_ENV` variable:
   ```toml
   [runtime]
   env = { 
     NODE_ENV = "${DEPLOY_ENV:-development}", 
     RUNTIME = "bun",
     DEPLOY_ENV = "${DEPLOY_ENV:-development}"
   }
   ```

3. **Hierarchical Configuration**: Use a cascading configuration approach where default values in `bunfig.toml` are overridden by environment-specific variables passed at runtime.

4. **Workspace-Specific Configuration**: Leverage the monorepo structure to define environment variables at the workspace level in `apps/api-gateway/` or package level in `packages/agents/`.

This flexible approach allows for tailored configurations across different deployment scenarios while maintaining a consistent configuration interface.

**Section sources**
- [bunfig.toml](file://bunfig.toml#L15-L17)
- [projectinfo.md](file://projectinfo.md#L53-L57)

## Deployment Platform Integration

The SynchroSource system is designed for deployment across various cloud platforms, each requiring specific environment variable management strategies:

### Akash Network
As the primary infrastructure provider (noted for 97.6% cost reduction), Akash requires:
- Environment variables to be defined in deployment manifests
- Secure credential storage using Akash's secret management
- Runtime environment specification in container configurations
- Resource allocation parameters tied to environment variables

### AWS
For AWS deployments:
- Use AWS Systems Manager Parameter Store or Secrets Manager for sensitive data
- Define environment variables in ECS task definitions or Lambda configurations
- Utilize AWS CodePipeline for environment-specific variable injection
- Implement IAM roles for secure access to environment resources

### Vercel
When deploying to Vercel:
- Configure environment variables in project settings
- Use Vercel's preview deployment variables for staging environments
- Separate environment variables for production, preview, and development
- Leverage Vercel's `BUN_PUBLIC_*` prefix for client-accessible variables

### General Deployment Commands
```bash
# Development
bun dev

# Production
bun start

# Direct execution with environment
NODE_ENV=production bun src/index.tsx
```

**Section sources**
- [README.md](file://README.md#L15-L19)
- [package.json](file://package.json#L13-L14)
- [projectinfo.md](file://projectinfo.md#L45-L47)

## Security Considerations

Proper environment variable management is critical for maintaining application security, particularly in preventing leakage of sensitive data:

1. **Client-Side Bundle Protection**: The build process must ensure that environment variables are not inadvertently included in client-side bundles. Bun's `--env='BUN_PUBLIC_*'` flag helps by only exposing variables with the `BUN_PUBLIC_` prefix to client-side code.

2. **Environment Variable Isolation**: Server-side environment variables should never be exposed to client-side JavaScript. This is achieved by:
   - Using different variable prefixes (e.g., `BUN_PRIVATE_` for server-only variables)
   - Implementing strict build-time filtering
   - Validating bundle contents for accidental leakage

3. **Secure Storage**: Environment variables containing sensitive data (API keys, database credentials, etc.) should be stored in secure secret management systems rather than plaintext files.

4. **Access Control**: Limit access to environment variable configuration to authorized personnel only, using role-based access control in deployment platforms.

5. **Audit and Monitoring**: Implement logging and monitoring for environment variable access and changes, particularly in production environments.

**Section sources**
- [.gitignore](file://.gitignore#L19-L23)
- [projectinfo.md](file://projectinfo.md#L46-L47)

## Debugging and Validation Techniques

Effective debugging and validation of environment variable injection is essential for reliable deployments:

1. **Runtime Verification**: Implement startup checks that validate required environment variables:
   ```typescript
   if (!process.env.NODE_ENV) {
     console.warn('NODE_ENV not set, defaulting to development');
   }
   ```

2. **Configuration Logging**: During development, log the active environment configuration (excluding sensitive values):
   ```bash
   console.log(`Environment: ${process.env.NODE_ENV}, Runtime: ${process.env.RUNTIME}`);
   ```

3. **Health Check Endpoints**: Create API endpoints that report environment information (with proper authentication):
   ```typescript
   "/api/env": async req => {
     return Response.json({
       env: process.env.NODE_ENV,
       runtime: process.env.RUNTIME,
       // Exclude sensitive variables
     });
   }
   ```

4. **Fallback Strategies**: Implement graceful fallbacks when environment variables are missing:
   - Default to development mode if `NODE_ENV` is undefined
   - Use safe default values for non-critical configuration
   - Fail fast for mission-critical missing variables

5. **Build-Time Validation**: Use pre-build scripts to verify environment variable requirements before deployment.

**Section sources**
- [src/index.tsx](file://src/index.tsx#L32-L38)
- [bunfig.toml](file://bunfig.toml#L15-L17)

## Conditional Script Execution

The `package.json` scripts can be enhanced to support conditional execution based on environment variables:

```json
"scripts": {
  "dev": "bun run --hot apps/api-gateway/server.ts",
  "test": "bun test",
  "build": "tsup",
  "start": "NODE_ENV=production bun src/index.tsx",
  "staging": "NODE_ENV=staging bun src/index.tsx",
  "preview": "NODE_ENV=preview bun --hot src/index.tsx"
}
```

Additional strategies include:

1. **Environment-Specific Builds**: Create scripts that conditionally apply different build configurations:
   ```json
   "build:prod": "bun build --define:process.env.NODE_ENV='\"production\"'",
   "build:staging": "bun build --define:process.env.NODE_ENV='\"staging\"'"
   ```

2. **Cross-Platform Compatibility**: Ensure scripts work consistently across different operating systems by using cross-env or platform-specific scripts.

3. **Pre-Start Validation**: Implement pre-start scripts that validate environment variables before launching the application.

4. **Dynamic Configuration Loading**: Use scripts to load different configuration files based on environment variables.

This approach enables seamless transitions between development, testing, staging, and production environments while maintaining consistent execution patterns.

**Section sources**
- [package.json](file://package.json#L13-L18)
- [README.md](file://README.md#L12-L13)

## Conclusion
Effective management of environment variables and runtime configuration is essential for the secure and reliable operation of the SynchroSource cognitive-aware autonomous agent operating system. By leveraging Bun's native configuration capabilities in `bunfig.toml`, following security best practices for sensitive data, and implementing robust deployment strategies across platforms like Akash Network, AWS, and Vercel, the system can maintain optimal performance and security across all environments. The combination of proper environment isolation, secure storage, and comprehensive debugging techniques ensures that configuration management remains a strength rather than a vulnerability in the overall architecture.