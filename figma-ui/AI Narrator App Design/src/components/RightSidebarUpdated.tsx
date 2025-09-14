import { useState } from 'react';
import { 
  Monitor, 
  Sliders, 
  Download, 
  Info,
  Settings2,
  FileOutput,
  FolderOpen,
  Wand2,
  Scissors,
  Save,
  Music,
  Volume2,
  Layers3,
  Image,
  Palette,
  Eye,
  Mic,
  Video,
  BarChart3,
  Zap,
  Clock,
  HardDrive,
  CheckCircle,
  Share,
  Star,
  Trash2,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Upload,
  History,
  BookOpen,
  Target,
  TrendingUp,
  Cpu,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface ControlPanelProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  collapsible?: boolean;
}

function ControlPanel({ title, icon, children, collapsible = false }: ControlPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
        className={`w-full p-4 flex items-center gap-3 ${collapsible ? 'hover:bg-accent' : ''} transition-colors`}
        disabled={!collapsible}
      >
        <div className="w-5 h-5 text-primary">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-card-foreground flex-1 text-left">{title}</h3>
        {collapsible && (
          <div className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
            <SkipForward className="w-4 h-4" />
          </div>
        )}
      </button>
      {isExpanded && children && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}

interface RightSidebarProps {
  currentStep?: string;
}

export function RightSidebarUpdated({ currentStep = "Choose Content Source" }: RightSidebarProps) {
  const isTextCleaningStep = currentStep === "Text Cleaning And Segmentation";
  const isVoiceTTSStep = currentStep === "Voice & Text-to-speech Settings";
  const isBackgroundAudioStep = currentStep === "Background Audio & Music";
  const isVisualElementsStep = currentStep === "Visual Elements";
  const isAudioVideoMixingStep = currentStep === "Audio & Video & Mixing Settings";
  const isOutputConfigurationStep = currentStep === "Output Configuration";
  const isResultStep = currentStep === "Result";
  
  // Enhanced state management
  const [outputFormats, setOutputFormats] = useState({
    wholeBook: true,
    chapters: false,
    shortForm: false
  });
  const [fileName, setFileName] = useState("my-narration");
  const [saveLocation, setSaveLocation] = useState("/Documents/AI Narrator");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [currentPreview, setCurrentPreview] = useState("");

  const handleFormatChange = (format: keyof typeof outputFormats, checked: boolean) => {
    setOutputFormats(prev => ({ ...prev, [format]: checked }));
  };

  return (
    <div className="bg-sidebar border-l border-sidebar-border w-80 flex flex-col h-full">
      {/* Header with connection status */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-medium text-sidebar-foreground">Control Panel</h2>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Wifi className="w-4 h-4 text-chart-3" />
            ) : (
              <WifiOff className="w-4 h-4 text-destructive" />
            )}
            <Badge variant={isProcessing ? "default" : "outline"} className="text-xs">
              {isProcessing ? "Processing" : "Ready"}
            </Badge>
          </div>
        </div>
        {isProcessing && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-sidebar-foreground/70">
              <span>Processing...</span>
              <span>67%</span>
            </div>
            <Progress value={67} className="h-2" />
          </div>
        )}
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* Global controls - always visible */}
          <ControlPanel 
            title="Quick Actions" 
            icon={<Zap className="w-5 h-5" />}
            collapsible={true}
          >
            <div className="space-y-2">
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Play className="w-4 h-4 mr-2" />
                Preview Current Step
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Current Step
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <History className="w-4 h-4 mr-2" />
                View History
              </Button>
            </div>
          </ControlPanel>

          {/* Step-specific controls */}
          {isTextCleaningStep && (
            <>
              <ControlPanel 
                title="Output Format" 
                icon={<FileOutput className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="wholeBook" 
                      checked={outputFormats.wholeBook}
                      onCheckedChange={(checked) => handleFormatChange('wholeBook', checked as boolean)}
                    />
                    <label htmlFor="wholeBook" className="text-sm text-card-foreground">Whole Book</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="chapters" 
                      checked={outputFormats.chapters}
                      onCheckedChange={(checked) => handleFormatChange('chapters', checked as boolean)}
                    />
                    <label htmlFor="chapters" className="text-sm text-card-foreground">Chapters</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="shortForm" 
                      checked={outputFormats.shortForm}
                      onCheckedChange={(checked) => handleFormatChange('shortForm', checked as boolean)}
                    />
                    <label htmlFor="shortForm" className="text-sm text-card-foreground">Short Form</label>
                  </div>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Text Analysis" 
                icon={<BarChart3 className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Word Count: 12,345
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Est. Duration: 45 min
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Complexity: Medium
                  </div>
                  <Button size="sm" className="w-full">
                    Analyze Text
                  </Button>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="File Settings" 
                icon={<Settings2 className="w-5 h-5" />}
              >
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-card-foreground mb-2 block">File Name</label>
                    <Input
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      className="bg-input-background border-border text-foreground"
                      placeholder="Enter file name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-card-foreground mb-2 block">Save Location</label>
                    <div className="flex gap-2">
                      <Input
                        value={saveLocation}
                        onChange={(e) => setSaveLocation(e.target.value)}
                        className="bg-input-background border-border text-foreground flex-1"
                        placeholder="Choose location"
                      />
                      <Button size="sm" variant="outline">
                        <FolderOpen className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Actions" 
                icon={<Wand2 className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                    onClick={() => setIsProcessing(true)}
                  >
                    <Wand2 className="w-4 h-4" />
                    Apply Text Cleaning
                  </Button>
                  <Button 
                    className="w-full bg-chart-2 hover:bg-chart-3 text-primary-foreground flex items-center gap-2"
                    onClick={() => console.log('Apply segmentation')}
                  >
                    <Scissors className="w-4 h-4" />
                    Apply Segmentation
                  </Button>
                  <Button 
                    className="w-full bg-chart-3 hover:bg-chart-4 text-primary-foreground flex items-center gap-2"
                    onClick={() => console.log('Save files')}
                  >
                    <Save className="w-4 h-4" />
                    Save Files
                  </Button>
                </div>
              </ControlPanel>
            </>
          )}

          {isVoiceTTSStep && (
            <>
              <ControlPanel 
                title="Voice Library" 
                icon={<Monitor className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Available Voices: 25
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Languages: 7
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Premium Voices: 5
                  </div>
                  <Button size="sm" className="w-full">
                    Browse All Voices
                  </Button>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Voice Preview" 
                icon={<Play className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Current: David (Professional)
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Pause className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Sample: "Hello, this is a preview..."
                  </div>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Voice Presets" 
                icon={<Settings2 className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    Audiobook Narrator
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    Documentary Style
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    Conversational
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    Educational
                  </Button>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Export Settings" 
                icon={<Download className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm text-card-foreground">Audio Quality</label>
                    <select className="w-full bg-input-background border border-border rounded px-2 py-1 text-sm text-foreground">
                      <option>High (48kHz)</option>
                      <option>Standard (44kHz)</option>
                      <option>Compressed (22kHz)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-card-foreground">Format</label>
                    <select className="w-full bg-input-background border border-border rounded px-2 py-1 text-sm text-foreground">
                      <option>WAV</option>
                      <option>MP3</option>
                      <option>AAC</option>
                    </select>
                  </div>
                </div>
              </ControlPanel>
            </>
          )}

          {isBackgroundAudioStep && (
            <>
              <ControlPanel 
                title="Music Categories" 
                icon={<Music className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    🌿 Nature & Ambient
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    🎼 Classical & Orchestral
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    🧘 Meditation & Relaxation
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    🎹 Piano & Minimal
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    🌊 Soundscapes
                  </Button>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Audio Quality" 
                icon={<Volume2 className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm text-card-foreground">Sample Rate</label>
                    <select className="w-full bg-input-background border border-border rounded px-2 py-1 text-sm text-foreground">
                      <option>48 kHz (Professional)</option>
                      <option>44.1 kHz (CD Quality)</option>
                      <option>22 kHz (Compressed)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-card-foreground">Bit Depth</label>
                    <select className="w-full bg-input-background border border-border rounded px-2 py-1 text-sm text-foreground">
                      <option>24-bit</option>
                      <option>16-bit</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <Checkbox id="normalize" />
                    <label htmlFor="normalize" className="text-sm text-card-foreground">Auto-normalize volume</label>
                  </div>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Layer Management" 
                icon={<Layers3 className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Active Layers: 1
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Max Layers: 8
                  </div>
                  <Button size="sm" className="w-full">
                    Manage All Layers
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    Save as Preset
                  </Button>
                </div>
              </ControlPanel>
            </>
          )}

          {isVisualElementsStep && (
            <>
              <ControlPanel 
                title="Quick Templates" 
                icon={<Image className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    📚 Educational
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    🎬 Cinematic
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    🧘 Minimal
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    ✨ Modern
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    🌟 Premium
                  </Button>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Color Schemes" 
                icon={<Palette className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-8 rounded flex items-center justify-center text-xs cursor-pointer bg-gradient-to-r from-chart-1 to-primary text-primary-foreground">
                      Cool
                    </div>
                    <div className="h-8 rounded flex items-center justify-center text-xs cursor-pointer bg-gradient-to-r from-chart-4 to-destructive text-primary-foreground">
                      Warm
                    </div>
                    <div className="h-8 rounded flex items-center justify-center text-xs cursor-pointer bg-gradient-to-r from-muted to-muted-foreground text-primary-foreground">
                      Mono
                    </div>
                    <div className="h-8 rounded flex items-center justify-center text-xs cursor-pointer bg-gradient-to-r from-chart-2 to-chart-3 text-primary-foreground">
                      Nature
                    </div>
                  </div>
                  <Button size="sm" className="w-full">
                    Custom Palette
                  </Button>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Asset Library" 
                icon={<Eye className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Stock Images: 1,200+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Video Loops: 340+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Animations: 85+
                  </div>
                  <Button size="sm" className="w-full">
                    Browse All Assets
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    Upload Custom
                  </Button>
                </div>
              </ControlPanel>
            </>
          )}

          {isAudioVideoMixingStep && (
            <>
              <ControlPanel 
                title="Audio Levels" 
                icon={<Volume2 className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm text-card-foreground">Master Volume</label>
                    <input type="range" className="w-full accent-primary" min="0" max="100" defaultValue="80" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-card-foreground">Voice Level</label>
                    <input type="range" className="w-full accent-primary" min="0" max="100" defaultValue="85" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-card-foreground">Background Music</label>
                    <input type="range" className="w-full accent-primary" min="0" max="100" defaultValue="30" />
                  </div>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Effects" 
                icon={<Zap className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="reverb" />
                    <label htmlFor="reverb" className="text-sm text-card-foreground">Reverb</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="compression" />
                    <label htmlFor="compression" className="text-sm text-card-foreground">Dynamic Compression</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="eq" />
                    <label htmlFor="eq" className="text-sm text-card-foreground">Auto EQ</label>
                  </div>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Video Settings" 
                icon={<Video className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm text-card-foreground">Resolution</label>
                    <select className="w-full bg-input-background border border-border rounded px-2 py-1 text-sm text-foreground">
                      <option>4K (3840x2160)</option>
                      <option>1080p (1920x1080)</option>
                      <option>720p (1280x720)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-card-foreground">Frame Rate</label>
                    <select className="w-full bg-input-background border border-border rounded px-2 py-1 text-sm text-foreground">
                      <option>60 fps</option>
                      <option>30 fps</option>
                      <option>24 fps</option>
                    </select>
                  </div>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Performance" 
                icon={<Cpu className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    CPU Usage: 34%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Memory: 2.1GB / 8GB
                  </div>
                  <div className="text-sm text-muted-foreground">
                    GPU Acceleration: On
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Optimize Performance
                  </Button>
                </div>
              </ControlPanel>
            </>
          )}

          {isOutputConfigurationStep && (
            <>
              <ControlPanel 
                title="Export Format" 
                icon={<FileOutput className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm text-card-foreground">Output Type</label>
                    <select className="w-full bg-input-background border border-border rounded px-2 py-1 text-sm text-foreground">
                      <option>Video (MP4)</option>
                      <option>Audio Only (MP3)</option>
                      <option>Audio Only (WAV)</option>
                      <option>Podcast (RSS)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-card-foreground">Quality</label>
                    <select className="w-full bg-input-background border border-border rounded px-2 py-1 text-sm text-foreground">
                      <option>High Quality</option>
                      <option>Standard Quality</option>
                      <option>Compressed</option>
                    </select>
                  </div>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Sharing Options" 
                icon={<Share className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Share className="w-4 h-4 mr-2" />
                    Upload to Cloud
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Save Locally
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Star className="w-4 h-4 mr-2" />
                    Add to Portfolio
                  </Button>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Metadata" 
                icon={<Info className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-card-foreground mb-2 block">Title</label>
                    <Input
                      className="bg-input-background border-border text-foreground"
                      placeholder="Enter title"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-card-foreground mb-2 block">Description</label>
                    <textarea 
                      className="w-full bg-input-background border border-border rounded px-2 py-1 text-sm text-foreground resize-none"
                      rows={3}
                      placeholder="Enter description"
                    />
                  </div>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Final Review" 
                icon={<Target className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Est. File Size: 156 MB
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Est. Processing Time: 3 min
                  </div>
                  <Button className="w-full">
                    Start Final Export
                  </Button>
                </div>
              </ControlPanel>
            </>
          )}

          {isResultStep && (
            <>
              <ControlPanel 
                title="Project Status" 
                icon={<CheckCircle className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-chart-2" />
                    <span className="text-sm text-card-foreground">Processing Complete</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Duration: 24 minutes
                  </div>
                  <div className="text-sm text-muted-foreground">
                    File Size: 156 MB
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Created: Just now
                  </div>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Quality Metrics" 
                icon={<TrendingUp className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-card-foreground">Audio Quality</span>
                    <span className="text-chart-3">Excellent</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-card-foreground">Voice Clarity</span>
                    <span className="text-chart-3">95%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-card-foreground">Sync Quality</span>
                    <span className="text-chart-3">Perfect</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    View Full Report
                  </Button>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Download Options" 
                icon={<Download className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <Button size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Video
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Audio Only
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Transcript
                  </Button>
                </div>
              </ControlPanel>

              <ControlPanel 
                title="Actions" 
                icon={<Settings2 className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <Button size="sm" variant="outline" className="w-full">
                    <Star className="w-4 h-4 mr-2" />
                    Save to Favorites
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <Share className="w-4 h-4 mr-2" />
                    Share Project
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Create New Project
                  </Button>
                  <Button size="sm" variant="outline" className="w-full text-destructive border-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Project
                  </Button>
                </div>
              </ControlPanel>
            </>
          )}
        </div>
      </div>

      {/* Footer with project info */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/70 space-y-1">
          <div className="flex justify-between">
            <span>Project:</span>
            <span>{fileName}</span>
          </div>
          <div className="flex justify-between">
            <span>Step:</span>
            <span>{currentStep.split(' ')[0]}...</span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className={isConnected ? 'text-chart-3' : 'text-destructive'}>
              {isConnected ? 'Connected' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}