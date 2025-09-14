import { useState } from 'react';
import { 
  Palette, 
  Sun, 
  Moon, 
  Monitor, 
  Flower2, 
  Zap, 
  Stars, 
  Eye, 
  Sparkles,
  Layers,
  Circle,
  Lightbulb,
  Cpu,
  Grid3X3,
  Rainbow,
  Sunset,
  Candy,
  Code2,
  Waves
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from './ui/dropdown-menu';
import { Button } from './ui/button';

const standardThemes = [
  {
    name: 'light' as const,
    label: 'Light',
    icon: Sun,
    category: 'light'
  },
  {
    name: 'light-pastel' as const,
    label: 'Light Pastel',
    icon: Flower2,
    category: 'light'
  },
  {
    name: 'high-contrast-light' as const,
    label: 'High-Contrast Light',
    icon: Zap,
    category: 'light'
  },
  {
    name: 'dark' as const, 
    label: 'Dark',
    icon: Moon,
    category: 'dark'
  },
  {
    name: 'midnight-dark' as const,
    label: 'Midnight Dark',
    icon: Stars,
    category: 'dark'
  },
  {
    name: 'ultra-dark' as const,
    label: 'Ultra Dark',
    icon: Eye,
    category: 'dark'
  },
  {
    name: 'solarized' as const,
    label: 'Solarized',
    icon: Monitor,
    category: 'special'
  }
];

const creativeThemes = [
  {
    name: 'glassmorphism' as const,
    label: 'Glassmorphism',
    icon: Layers,
    description: 'Enhanced frosted glass with gradient backdrop'
  },
  {
    name: 'neumorphism' as const,
    label: 'Neumorphism (Soft UI)',
    icon: Circle,
    description: 'Soft shadows for raised/pressed effect'
  },
  {
    name: 'neon-tubes' as const,
    label: 'Neon Tubes',
    icon: Lightbulb,
    description: 'Glowing neon outlines and accents'
  },
  {
    name: 'cyberpunk-glow' as const,
    label: 'Cyberpunk Glow',
    icon: Cpu,
    description: 'Electric highlights and glowing elements'
  },
  {
    name: 'retro-pixel' as const,
    label: 'Retro Pixel',
    icon: Grid3X3,
    description: 'CRT monitor with pixel grid and monospace font'
  },
  {
    name: 'gradient-hologram' as const,
    label: 'Gradient Hologram',
    icon: Rainbow,
    description: 'Shifting holographic gradients with shimmer effects'
  },
  {
    name: 'synthwave-sunset' as const,
    label: 'Synthwave Sunset',
    icon: Sunset,
    description: 'Retro 80s neon grid with flowing gradient background'
  },
  {
    name: 'candy-pop' as const,
    label: 'Candy Pop',
    icon: Candy,
    description: 'Bubbly rounded elements with glossy highlights'
  },
  {
    name: 'matrix-code' as const,
    label: 'Matrix Code',
    icon: Code2,
    description: 'Green matrix code with monospaced terminal font'
  },
  {
    name: 'aurora-flow' as const,
    label: 'Aurora Flow',
    icon: Waves,
    description: 'Flowing aurora gradients with dynamic animations'
  }
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const allThemes = [...standardThemes, ...creativeThemes];
  const currentTheme = allThemes.find(t => t.name === theme);
  const CurrentIcon = currentTheme?.icon || Palette;

  const lightThemes = standardThemes.filter(t => t.category === 'light');
  const darkThemes = standardThemes.filter(t => t.category === 'dark');
  const specialThemes = standardThemes.filter(t => t.category === 'special');

  const renderThemeGroup = (themeGroup: typeof standardThemes[number][]) => {
    return themeGroup.map((themeOption) => {
      const Icon = themeOption.icon;
      return (
        <DropdownMenuItem
          key={themeOption.name}
          onClick={() => {
            setTheme(themeOption.name);
            setIsOpen(false);
          }}
          className={`cursor-pointer flex items-center gap-2 text-popover-foreground hover:bg-accent hover:text-accent-foreground ${
            theme === themeOption.name ? 'bg-accent text-accent-foreground' : ''
          }`}
        >
          <Icon className="h-4 w-4" />
          {themeOption.label}
        </DropdownMenuItem>
      );
    });
  };

  const renderCreativeTheme = (themeOption: typeof creativeThemes[number]) => {
    const Icon = themeOption.icon;
    return (
      <DropdownMenuItem
        key={themeOption.name}
        onClick={() => {
          setTheme(themeOption.name);
          setIsOpen(false);
        }}
        className={`cursor-pointer flex flex-col items-start gap-1 p-3 text-popover-foreground hover:bg-accent hover:text-accent-foreground ${
          theme === themeOption.name ? 'bg-accent text-accent-foreground' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span className="font-medium">{themeOption.label}</span>
        </div>
        <span className="text-xs text-muted-foreground">{themeOption.description}</span>
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="bg-transparent hover:bg-sidebar-accent text-sidebar-foreground border-0 p-2"
        >
          <CurrentIcon className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-popover border-border w-64"
      >
        {/* Standard Themes */}
        {renderThemeGroup(lightThemes)}
        <DropdownMenuSeparator />
        {renderThemeGroup(darkThemes)}
        <DropdownMenuSeparator />
        {renderThemeGroup(specialThemes)}
        
        <DropdownMenuSeparator />
        
        {/* Creative Themes Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer flex items-center gap-2 text-popover-foreground hover:bg-accent hover:text-accent-foreground">
            <Sparkles className="h-4 w-4" />
            <span>Creative Themes</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-popover border-border w-80">
            {creativeThemes.map(renderCreativeTheme)}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}