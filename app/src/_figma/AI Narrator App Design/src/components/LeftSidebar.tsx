import { 
  FileText, 
  Scissors, 
  Mic, 
  Music, 
  Eye, 
  Video, 
  Settings, 
  Play,
  CheckCircle,
  Circle,
  Clock,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface SidebarItemProps {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  isCompleted?: boolean;
  isAccessible?: boolean;
  onClick?: () => void;
  stepNumber: number;
}

function SidebarItem({ title, icon, isActive, isCompleted, isAccessible, onClick, stepNumber }: SidebarItemProps) {
  const getStatusIcon = () => {
    if (isCompleted) {
      return <CheckCircle className="w-4 h-4 text-chart-3" />;
    }
    if (isActive) {
      return <Clock className="w-4 h-4 text-primary" />;
    }
    if (isAccessible) {
      return <Circle className="w-4 h-4 text-muted-foreground" />;
    }
    return <Circle className="w-4 h-4 text-muted-foreground/50" />;
  };

  return (
    <button
      onClick={onClick}
      disabled={!isAccessible && !isActive}
      className={`
        w-full p-4 flex items-center gap-3 text-left transition-all duration-200 rounded-lg group relative
        ${isActive 
          ? 'bg-primary text-primary-foreground shadow-md' 
          : isAccessible || isCompleted
            ? 'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground'
            : 'bg-card text-muted-foreground/50 cursor-not-allowed'
        }
      `}
    >
      {/* Step Number */}
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
        ${isActive 
          ? 'bg-primary-foreground text-primary' 
          : isCompleted
            ? 'bg-chart-3 text-chart-3-foreground'
            : isAccessible
              ? 'bg-accent text-accent-foreground'
              : 'bg-muted text-muted-foreground'
        }
      `}>
        {stepNumber}
      </div>

      {/* Icon */}
      <div className="w-6 h-6 flex-shrink-0">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium truncate">{title}</span>
          {getStatusIcon()}
        </div>
        {isActive && (
          <div className="text-xs opacity-75">
            Current Step
          </div>
        )}
        {isCompleted && (
          <div className="text-xs text-chart-3">
            Completed
          </div>
        )}
      </div>

      {/* Arrow for active step */}
      {isActive && (
        <ChevronRight className="w-4 h-4 flex-shrink-0" />
      )}
    </button>
  );
}

interface LeftSidebarProps {
  currentStep?: string;
  onStepChange?: (step: string) => void;
}

export function LeftSidebar({ currentStep = "Choose Content Source", onStepChange }: LeftSidebarProps) {
  const sidebarItems = [
    { title: 'Choose Content Source', icon: <FileText className="w-6 h-6" /> },
    { title: 'Text Cleaning And Segmentation', icon: <Scissors className="w-6 h-6" /> },
    { title: 'Voice & Text-to-speech Settings', icon: <Mic className="w-6 h-6" /> },
    { title: 'Background Audio & Music', icon: <Music className="w-6 h-6" /> },
    { title: 'Visual Elements', icon: <Eye className="w-6 h-6" /> },
    { title: 'Audio & Video & Mixing Settings', icon: <Video className="w-6 h-6" /> },
    { title: 'Output Configuration', icon: <Settings className="w-6 h-6" /> },
    { title: 'Result', icon: <Play className="w-6 h-6" /> },
  ];

  // Mock completed steps (in a real app, this would come from props or state)
  const completedSteps = ['Choose Content Source'];
  const currentStepIndex = sidebarItems.findIndex(item => item.title === currentStep);
  
  // Calculate progress
  const progressPercentage = ((currentStepIndex + 1) / sidebarItems.length) * 100;

  const isStepAccessible = (index: number) => {
    // First step is always accessible
    if (index === 0) return true;
    // Current step and previous steps are accessible
    if (index <= currentStepIndex) return true;
    // Next step is accessible if current step exists
    if (index === currentStepIndex + 1) return true;
    return false;
  };

  const isStepCompleted = (stepTitle: string) => {
    return completedSteps.includes(stepTitle) || 
           sidebarItems.findIndex(item => item.title === stepTitle) < currentStepIndex;
  };

  return (
    <div className="bg-sidebar border-r border-sidebar-border w-80 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium text-sidebar-foreground">Workflow Steps</h2>
          <Badge variant="outline" className="text-xs">
            {currentStepIndex + 1}/{sidebarItems.length}
          </Badge>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-sidebar-foreground/70">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              title={item.title}
              icon={item.icon}
              stepNumber={index + 1}
              isActive={currentStep === item.title}
              isCompleted={isStepCompleted(item.title)}
              isAccessible={isStepAccessible(index)}
              onClick={() => isStepAccessible(index) ? onStepChange?.(item.title) : undefined}
            />
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => {
            const prevIndex = Math.max(0, currentStepIndex - 1);
            if (prevIndex < currentStepIndex) {
              onStepChange?.(sidebarItems[prevIndex].title);
            }
          }}
          disabled={currentStepIndex <= 0}
        >
          Previous Step
        </Button>
        
        <Button 
          size="sm" 
          className="w-full"
          onClick={() => {
            const nextIndex = Math.min(sidebarItems.length - 1, currentStepIndex + 1);
            if (nextIndex > currentStepIndex) {
              onStepChange?.(sidebarItems[nextIndex].title);
            }
          }}
          disabled={currentStepIndex >= sidebarItems.length - 1}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}