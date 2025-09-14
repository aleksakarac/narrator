import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'solarized' | 'light-pastel' | 'high-contrast-light' | 'midnight-dark' | 'ultra-dark' | 'glassmorphism' | 'neumorphism' | 'neon-tubes' | 'cyberpunk-glow' | 'retro-pixel' | 'gradient-hologram' | 'synthwave-sunset' | 'candy-pop' | 'matrix-code' | 'aurora-flow';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'solarized' }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'solarized', 'light-pastel', 'high-contrast-light', 'midnight-dark', 'ultra-dark', 'glassmorphism', 'neumorphism', 'neon-tubes', 'cyberpunk-glow', 'retro-pixel', 'gradient-hologram', 'synthwave-sunset', 'candy-pop', 'matrix-code', 'aurora-flow');
    
    // Add the current theme class
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}