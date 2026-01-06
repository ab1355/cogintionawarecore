# SynchroSource Project Information

## Project Overview
SynchroSource is a cognitive-aware autonomous agent operating system designed to coordinate multiple AI agents across different operational modes. The system implements a sophisticated dashboard interface for managing and visualizing cognitive-aware autonomous agents.

## Core Architecture

### Cognitive Operating System
- **Name**: SynchroSource (formerly 371-OS)
- **Type**: Cognitive-aware autonomous agent operating system
- **Purpose**: World's first cognitive-aware autonomous agent operating system
- **Runtime**: Bun (v1.2.18)

### Operational Modes
The system operates in three distinct modes:
1. **Executive Mode**: Strategic Oversight & ROI Optimization
2. **Technical Mode**: Infrastructure & System Architecture
3. **Creative Mode**: Content Generation & Experience Design

### C-Suite Agents
The system features five core cognitive agents:
- **CEO Mimi**: Strategic Leadership
- **CTO Zara**: Technical Architecture
- **CFO Maya**: Financial Optimization
- **CLO Sage**: Legal & Governance
- **CAO Eduardo**: Admin Excellence

### Ventures
The system manages four primary ventures:
- **LyricLines**: AI Creative Content
- **Vision2Results**: Strategic Consulting
- **ModuMind**: Agent OS Core
- **Ikidedventures**: Edutainment

## Technical Stack
- **Frontend**: React 19
- **Runtime**: Bun
- **Package Manager**: Bun
- **Type System**: TypeScript
- **Icons**: Lucide React
- **Styling**: Tailwind CSS (implied from class names)
- **Architecture**: Monorepo with workspaces

## Infrastructure
- **Cloud Infrastructure**: Akash Network (97.6% cost reduction)
- **Coordination**: Blockchain DAO Governance
- **Deployment**: Containerized with Akash deployment configurations

## Project Structure
- **AB/**: Personal workspace for user-to-agent file exchange
- **src/**: Frontend source code files (React application)
- **apps/**: Monorepo applications (workspace)
  - **api-gateway/**: API gateway server (Hono-based)
- **packages/**: Monorepo packages (workspace)
  - **agents/**: Cognitive agent implementations
    - **c-suite/**: C-Suite agent logic (CEO Mimi, CTO Zara, etc.)
    - **types/**: Type definitions for agent system
    - **factory.ts**: Agent Factory for dynamic agent spawning
- **core/**: Core system modules
  - **economics.ts**: Internal economics framework with wallet generation
- **config/**: Configuration files
- **docs/**: Documentation
- **tests/**: Test files
- **utils/**: Utility functions
- **assets/**: Static assets (images, icons)

## Package Configuration
- **Name**: synchrosource
- **Type**: module
- **PackageManager**: bun@latest
- **Workspaces**: ["packages/*", "apps/*"]

## Development Workflow
- **Development**: `bun dev`
- **Build**: `bun build ./src/index.html --outdir=dist --sourcemap --target=browser --minify --define:process.env.NODE_ENV='"production"' --env='BUN_PUBLIC_*'`
- **Production**: `NODE_ENV=production bun src/index.tsx`

## Key Features
- Interactive dashboard with mode switching
- Animated orrery-style visualization
- Hover effects and tooltips for agents
- Real-time optimization metrics
- Multi-agent coordination
- Cognitive-aware processing
- Blockchain-based governance
- Cost-optimized cloud infrastructure
- Dynamic agent spawning via Agent Factory
- Internal economics framework with wallet generation
- Automatic scaling based on system complexity
- Economic tracking for all agent entities

## Repository Information
- **Name**: synchrosource
- **Description**: World's first cognitive-aware autonomous agent operating system
- **Branding**: All references to "371-OS" have been rebranded to "synchrosource"
- **Public Repository**: Available on GitHub

## Future Considerations
- Expansion of workspace packages
- Additional venture modules
- Enhanced agent coordination protocols
- Advanced cognitive processing capabilities