# Narrator App - Tauri + React + TypeScript

A modern desktop application for audio narration and processing, built with Tauri v2, React 18, and TypeScript.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + PostCSS
- **Backend**: Rust with Tauri v2
- **Package Manager**: pnpm
- **Build Tool**: Vite

## Quick Start

### Prerequisites

1. **Install pnpm**:
   ```bash
   npm install -g pnpm
   ```

2. **Install Rust toolchain**:
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

3. **Add Rust to PATH**:
   ```bash
   source "$HOME/.cargo/env"
   ```

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm tauri dev
```

### Production Build

```bash
# Build for production
pnpm tauri build
```

## Tailwind CSS v4 Configuration

This project uses Tailwind CSS v4 with PostCSS. Here's the configuration:

### postcss.config.js
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { 
          DEFAULT: "hsl(var(--primary))", 
          foreground: "hsl(var(--primary-foreground))" 
        },
        muted: { 
          DEFAULT: "hsl(var(--muted))", 
          foreground: "hsl(var(--muted-foreground))" 
        },
        card: { 
          DEFAULT: "hsl(var(--card))", 
          foreground: "hsl(var(--card-foreground))" 
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: { 
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))" 
        }
      },
      borderRadius: { 
        xl: "var(--radius)" 
      }
    }
  },
  plugins: []
}
```

### CSS Import
In your main CSS file (e.g., `index.css`):

```css
@import "tailwindcss";

:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  /* Add your custom CSS variables here */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* Dark mode variables */
}
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) 
- [Tauri Extension](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) 
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
