import { Menu } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';

interface TabProps {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface TopBarProps {
  currentMode?: string;
  onModeChange?: (mode: string) => void;
}

function Tab({ title, isActive, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-4 transition-all duration-200 border-b-2 
        ${isActive 
          ? 'bg-card text-foreground border-primary' 
          : 'bg-background text-muted-foreground border-transparent hover:bg-card hover:text-foreground'
        }
      `}
    >
      {title}
    </button>
  );
}

function WindowControls() {
  return (
    <div className="flex items-center gap-3">
      <ThemeSelector />
      <div className="flex items-center gap-2 ml-2">
        <div className="w-3 h-3 rounded-full bg-destructive hover:bg-destructive/80 cursor-pointer transition-colors"></div>
        <div className="w-3 h-3 rounded-full bg-chart-4 hover:bg-chart-4/80 cursor-pointer transition-colors"></div>
        <div className="w-3 h-3 rounded-full bg-chart-2 hover:bg-chart-2/80 cursor-pointer transition-colors"></div>
      </div>
    </div>
  );
}

export function TopBar({ currentMode = "Manual Mode", onModeChange }: TopBarProps) {
  const modes = ["Dashboard", "Auto Mode", "Manual Mode"];

  return (
    <div className="bg-background border-b border-border flex items-center justify-between h-16 px-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
          <Menu className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="flex">
          {modes.map(mode => (
            <Tab 
              key={mode}
              title={mode} 
              isActive={currentMode === mode}
              onClick={() => onModeChange?.(mode)}
            />
          ))}
        </div>
      </div>
      <WindowControls />
    </div>
  );
}
