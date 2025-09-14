import { useState } from 'react';
import { 
  Type, 
  FileX, 
  CheckSquare, 
  Hash, 
  Scissors,
  RotateCcw,
  Save
} from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface ToolButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function ToolButton({ icon, label, isActive, onClick }: ToolButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200
        ${isActive 
          ? 'bg-primary text-primary-foreground border-primary' 
          : 'bg-card text-card-foreground border-border hover:bg-accent hover:border-primary/50'
        }
      `}
    >
      <div className="w-4 h-4">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

export function TextCleaningPage() {
  const [text, setText] = useState(`This is a sample text that might contain
  
  
  unwanted line breaks, weird characters like ™ and ® symbols, and other artifacts.
  
  Page 1
  
  Sometimes there are page numbers scattered throughout the text that need to be removed for better narration flow.
  
  Page 2
  
  The goal is to clean this up and segment it properly for the AI narrator.`);

  const [segmentLength, setSegmentLength] = useState([250]);
  const [segmentationMethod, setSegmentationMethod] = useState('paragraph');
  const [activeTools, setActiveTools] = useState<Set<string>>(new Set());

  const toggleTool = (toolName: string) => {
    const newActiveTools = new Set(activeTools);
    if (newActiveTools.has(toolName)) {
      newActiveTools.delete(toolName);
    } else {
      newActiveTools.add(toolName);
    }
    setActiveTools(newActiveTools);
  };

  const applyTextCleaning = () => {
    let cleanedText = text;
    
    if (activeTools.has('lineBreaks')) {
      cleanedText = cleanedText.replace(/\n\s*\n\s*\n/g, '\n\n'); // Remove excessive line breaks
    }
    
    if (activeTools.has('nonAscii')) {
      cleanedText = cleanedText.replace(/[^\x00-\x7F]/g, ''); // Remove non-ASCII characters
    }
    
    if (activeTools.has('punctuation')) {
      cleanedText = cleanedText.replace(/\s+([.!?])/g, '$1'); // Fix spacing before punctuation
      cleanedText = cleanedText.replace(/([.!?])\s*([A-Z])/g, '$1 $2'); // Ensure space after punctuation
    }
    
    if (activeTools.has('pageNumbers')) {
      cleanedText = cleanedText.replace(/\n\s*Page\s+\d+\s*\n/gi, '\n'); // Remove page numbers
    }
    
    setText(cleanedText);
  };

  const applySegmentation = () => {
    // This would implement the actual segmentation logic
    console.log('Applying segmentation:', { 
      method: segmentationMethod, 
      length: segmentLength[0] 
    });
  };

  const resetChanges = () => {
    setText(`This is a sample text that might contain
  
  
  unwanted line breaks, weird characters like ™ and ® symbols, and other artifacts.
  
  Page 1
  
  Sometimes there are page numbers scattered throughout the text that need to be removed for better narration flow.
  
  Page 2
  
  The goal is to clean this up and segment it properly for the AI narrator.`);
    setActiveTools(new Set());
    setSegmentLength([250]);
    setSegmentationMethod('paragraph');
  };

  return (
    <div className="flex-1 bg-background p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header Area */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Text Cleaning and Segmentation</h1>
          <p className="text-muted-foreground">
            Clean raw text, remove artifacts, and split into segments for narration.
          </p>
        </div>

        {/* Main Tools */}
        <div className="mb-8">
          {/* Toolbar */}
          <div className="bg-card border border-border rounded-lg p-4 mb-4">
            <h3 className="text-lg font-medium text-card-foreground mb-4">Text Cleaning Tools</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              <ToolButton
                icon={<Type className="w-4 h-4" />}
                label="Remove Line Breaks"
                isActive={activeTools.has('lineBreaks')}
                onClick={() => toggleTool('lineBreaks')}
              />
              <ToolButton
                icon={<FileX className="w-4 h-4" />}
                label="Remove Non-ASCII Characters"
                isActive={activeTools.has('nonAscii')}
                onClick={() => toggleTool('nonAscii')}
              />
              <ToolButton
                icon={<CheckSquare className="w-4 h-4" />}
                label="Fix Punctuation"
                isActive={activeTools.has('punctuation')}
                onClick={() => toggleTool('punctuation')}
              />
              <ToolButton
                icon={<Hash className="w-4 h-4" />}
                label="Remove Page Numbers"
                isActive={activeTools.has('pageNumbers')}
                onClick={() => toggleTool('pageNumbers')}
              />
            </div>
            <div className="text-sm text-muted-foreground mt-3">
              Select the cleaning tools you want to apply, then use the "Apply Text Cleaning" button in the sidebar.
            </div>
          </div>

          {/* Text Input/Output Area */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-card-foreground">Text Content</h3>
              <div className="text-sm text-muted-foreground">
                {text.length} characters, ~{Math.ceil(text.split(' ').length / 150)} minutes reading time
              </div>
            </div>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[300px] bg-input-background border-border text-foreground resize-none focus:border-primary focus:ring-primary/20"
              placeholder="Your text content will appear here..."
            />
          </div>
        </div>

        {/* Segmentation Controls */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Scissors className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium text-card-foreground">Segmentation Controls</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Segment Length Slider */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-card-foreground">
                Segment Length: {segmentLength[0]} words
              </label>
              <Slider
                value={segmentLength}
                onValueChange={setSegmentLength}
                max={500}
                min={50}
                step={25}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>50</span>
                <span>500</span>
              </div>
            </div>

            {/* Segmentation Method Dropdown */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-card-foreground">
                Segmentation Method
              </label>
              <Select value={segmentationMethod} onValueChange={setSegmentationMethod}>
                <SelectTrigger className="bg-input-background border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="sentence">By Sentence</SelectItem>
                  <SelectItem value="paragraph">By Paragraph</SelectItem>
                  <SelectItem value="custom">By Custom Length</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Apply Button */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-card-foreground">
                Ready to Segment
              </label>
              <div className="text-sm text-muted-foreground p-3 bg-input-background rounded border border-border">
                Use "Apply Segmentation" in the sidebar to process the text with your selected settings.
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center">
          <Button 
            variant="outline"
            onClick={resetChanges}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Changes
          </Button>
        </div>
      </div>
    </div>
  );
}