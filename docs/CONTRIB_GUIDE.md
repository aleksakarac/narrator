# Contribution Guide

## Quick Start Development

### Prerequisites

1. **Node.js & pnpm**:
   ```bash
   # Install pnpm globally
   npm install -g pnpm
   
   # Verify installation
   pnpm --version
   ```

2. **Rust Toolchain**:
   ```bash
   # Install Rust via rustup
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   
   # Add to PATH (restart terminal or run):
   source "$HOME/.cargo/env"
   
   # Verify installation
   rustc --version
   cargo --version
   ```

3. **FFmpeg** (for audio processing):
   ```bash
   # Windows with Chocolatey:
   choco install ffmpeg
   
   # macOS with Homebrew:
   brew install ffmpeg
   
   # Linux (Ubuntu/Debian):
   sudo apt install ffmpeg
   ```

### Development Setup

1. **Clone and install dependencies**:
   ```bash
   # Navigate to app directory
   cd app
   
   # Install JavaScript dependencies
   pnpm install
   ```

2. **Start development server**:
   ```bash
   # Start Tauri dev server with hot reload
   pnpm tauri dev
   ```

   This command will:
   - Start Vite dev server on http://localhost:1421
   - Build and run Rust backend
   - Enable hot reload for both frontend and backend
   - Open the application window

### Common Development Commands

```bash
# Run development server
pnpm tauri dev

# Build for production
pnpm tauri build

# Run tests
pnpm test

# Check TypeScript types
pnpm type-check

# Format code
pnpm format

# Lint code
pnpm lint
```

### Project Structure

```
narrator/
├── app/                 # Tauri frontend application
│   ├── src/            # React components (TypeScript)
│   ├── src-tauri/      # Rust backend
│   ├── package.json    # Frontend dependencies
│   └── tailwind.config.js # Tailwind v4 config
├── core/               # Rust orchestrator library
├── workers/            # Python TTS workers
└── docs/               # Documentation
```

### Code Style & Conventions

- **TypeScript**: Strict mode enabled, explicit types preferred
- **React**: Functional components with hooks
- **Rust**: 2021 edition, clippy lint rules enforced
- **CSS**: Tailwind utility classes, minimal custom CSS
- **Naming**: camelCase for JavaScript, snake_case for Rust

### Git Workflow

1. **Branch naming**: `feat/`, `fix/`, `docs/`, `chore/` prefixes
2. **Commit messages**: Conventional commits format
3. **Pull requests**: Squash merge with descriptive titles

### Testing

- **Frontend**: Vitest + React Testing Library
- **Backend**: Cargo test with integration tests
- **E2E**: Playwright for application testing

### Debugging

- **Frontend**: Chrome DevTools via Tauri devtools
- **Backend**: Rust debugger with VS Code integration
- **Logs**: Console logs in dev, structured logging in prod

### Performance Tips

- Use React.memo() for expensive components
- Implement virtual scrolling for long lists
- Optimize Rust ↔ JavaScript IPC calls
- Cache expensive computations

## Getting Help

- Check existing issues before creating new ones
- Use Discord for real-time discussions
- Read architecture docs for system overview
- Review existing code for patterns and examples

Happy coding! 🚀