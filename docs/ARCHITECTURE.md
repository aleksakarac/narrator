# Narrator App Architecture

## Tech Stack Overview

### Frontend Layer
- **Tauri v2**: Desktop app framework with Rust backend + Web frontend
- **React 18**: Component-based UI framework with TypeScript
- **Tailwind CSS v4**: Utility-first CSS framework with PostCSS integration
- **Radix UI**: Headless UI components for accessibility

### Backend Layer
- **Rust Orchestrator**: Core business logic and state management
- **Tauri Bridge**: Rust ⇄ TypeScript IPC communication layer
- **FFmpeg**: Audio/video processing and manipulation
- **Python TTS**: Text-to-speech synthesis workers

### Development Tooling
- **Vite**: Fast build tool and dev server
- **PostCSS**: CSS processing with Tailwind v4 integration
- **pnpm**: Fast, disk-efficient package manager
- **Rust Toolchain**: Cargo, rustc, and associated tools

## Tauri + Tailwind v4 Integration

The application uses Tauri v2 with a modern React frontend styled with Tailwind CSS v4. Key integration points:

### Build Configuration
- **PostCSS Setup**: Tailwind v4 requires PostCSS for processing
- **Vite Integration**: CSS is processed through Vite's PostCSS plugin
- **Hot Reload**: CSS changes are hot-reloaded during development

### Styling Architecture
- **Utility-First**: Tailwind's utility classes for rapid UI development
- **Dark Mode**: Built-in dark/light theme support via CSS variables
- **Responsive Design**: Mobile-first responsive breakpoints
- **Component Isolation**: Scoped styles with CSS modules pattern

### Performance Optimizations
- **Tree Shaking**: Unused CSS is purged in production builds
- **JIT Compilation**: Just-in-time compiler for development speed
- **Bundling**: CSS is extracted and minified for production

## Component Architecture

### Core Components
- **ThemeProvider**: Manages light/dark theme state
- **Layout Components**: Responsive layout primitives
- **Form Controls**: Accessible form elements with Radix
- **Audio Players**: Custom audio controls with visual feedback

### State Management
- **React Context**: For theme and global application state
- **Tauri Commands**: For Rust backend communication
- **Local Storage**: For user preferences and persistence

## Build & Deployment

### Development Build
```bash
pnpm tauri dev  # Start development server with hot reload
```

### Production Build
```bash
pnpm tauri build  # Create optimized production bundles
```

### Output Artifacts
- **MSI Installer**: Windows installer package
- **NSIS Installer**: Alternative Windows setup executable
- **Standalone EXE**: Portable executable for distribution

## Directory Structure

```
narrator/
├── app/                 # Tauri frontend application
│   ├── src/            # React components and pages
│   ├── src-tauri/      # Rust backend code
│   └── tailwind.config.js # Tailwind v4 configuration
├── core/               # Rust orchestrator and shared libs
├── workers/            # Python TTS and processing workers
└── docs/               # Architecture and documentation
```

This architecture provides a solid foundation for a cross-platform desktop application with modern web technologies and native performance.