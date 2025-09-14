import { useState } from 'react';
import { 
  Sliders, 
  Download, 
  Info,
  Settings2,
  FileOutput,
  FolderOpen,
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
  CheckCircle,
  Share,
  Upload,
  BookOpen,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface ControlPanelProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function ControlPanel({ title, icon, children, className = '' }: ControlPanelProps) {
  return (
    <Card className={`bg-card border-border ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {children}
      </CardContent>
    </Card>
  );
}

interface RightSidebarProps {
  currentStep: string;
  onStepComplete?: (step: string) => void;
}

export function RightSidebar({ currentStep, onStepComplete }: RightSidebarProps) {
  const [selectedVoice, setSelectedVoice] = useState('en-US-Wavenet-A');
  const [speakingRate, setSpeakingRate] = useState(1.0);
  const [pitch, setPitch] = useState(0);
  const [volumeGain, setVolumeGain] = useState(0);
  const [backgroundMusic, setBackgroundMusic] = useState(true);
  const [musicVolume, setMusicVolume] = useState(50);
  const [outputFormat, setOutputFormat] = useState('mp4');
  const [resolution, setResolution] = useState('1080p');
  const [frameRate, setFrameRate] = useState('30');

  const isContentSourceStep = currentStep === 'Choose Content Source';
  const isTextCleaningStep = currentStep === 'Text Cleaning And Segmentation';
  const isVoiceSettingsStep = currentStep === 'Voice & Text-to-speech Settings';
  const isBackgroundAudioStep = currentStep === 'Background Audio & Music';
  const isVisualElementsStep = currentStep === 'Visual Elements';
  const isMixingSettingsStep = currentStep === 'Audio & Video & Mixing Settings';
  const isOutputConfigStep = currentStep === 'Output Configuration';
  const isResultStep = currentStep === 'Result';

  return (
    <div className="bg-sidebar border-l border-sidebar-border w-80 flex flex-col h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Content Source Step */}
        {isContentSourceStep && (
          <>
            <ControlPanel 
              title="Content Source" 
              icon={<FolderOpen className="w-4 h-4" />}
            >
              <div className="space-y-3">
                <Button size="sm" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Text File
                </Button>
                <Button size="sm" variant="outline" className="w-full">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Import from URL
                </Button>
                <div className="text-xs text-muted-foreground">
                  Supported formats: .txt, .md, plain text
                </div>
              </div>
            </ControlPanel>

            <ControlPanel 
              title="Content Preview" 
              icon={<Eye className="w-4 h-4" />}
            >
              <div className="space-y-2">
                <div className="text-sm text-card-foreground">
                  No content selected
                </div>
                <div className="text-xs text-muted-foreground">
                  Upload a file or enter a URL to preview content
                </div>
              </div>
            </ControlPanel>
          </>
        )}

        {/* Text Cleaning Step */}
        {isTextCleaningStep && (
          <>
            <ControlPanel 
              title="Text Processing" 
              icon={<Scissors className="w-4 h-4" />}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="remove-punctuation" className="text-sm">
                    Remove Punctuation
                  </Label>
                  <Switch id="remove-punctuation" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="fix-grammar" className="text-sm">
                    Fix Grammar
                  </Label>
                  <Switch id="fix-grammar" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="split-paragraphs" className="text-sm">
                    Split into Paragraphs
                  </Label>
                  <Switch id="split-paragraphs" defaultChecked />
                </div>
              </div>
            </ControlPanel>

            <ControlPanel 
              title="Segmentation Settings" 
              icon={<Layers3 className="w-4 h-4" />}
            >
              <div className="space-y-3">
                <div>
                  <Label htmlFor="max-paragraph-length" className="text-sm mb-2 block">
                    Max Paragraph Length
                  </Label>
                  <Slider 
                    id="max-paragraph-length"
                    defaultValue={[200]} 
                    max={500} 
                    step={10} 
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    200 characters
                  </div>
                </div>
                <div>
                  <Label htmlFor="min-pause-duration" className="text-sm mb-2 block">
                    Min Pause Duration
                  </Label>
                  <Slider 
                    id="min-pause-duration"
                    defaultValue={[500]} 
                    max={2000} 
                    step={100} 
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    500ms
                  </div>
                </div>
              </div>
            </ControlPanel>
          </>
        )}

        {/* Voice Settings Step */}
        {isVoiceSettingsStep && (
          <>
            <ControlPanel 
              title="Voice Selection" 
              icon={<Mic className="w-4 h-4" />}
            >
              <div className="space-y-3">
                <div>
                  <Label htmlFor="voice-select" className="text-sm mb-2 block">
                    Voice Model
                  </Label>
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger id="voice-select">
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US-Wavenet-A">Wavenet A (US English)</SelectItem>
                      <SelectItem value="en-US-Wavenet-B">Wavenet B (US English)</SelectItem>
                      <SelectItem value="en-US-Wavenet-C">Wavenet C (US English)</SelectItem>
                      <SelectItem value="en-GB-Wavenet-A">Wavenet A (British English)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="speaking-rate" className="text-sm mb-2 block">
                    Speaking Rate
                  </Label>
                  <Slider 
                    id="speaking-rate"
                    value={[speakingRate]} 
                    onValueChange={([value]) => setSpeakingRate(value)}
                    max={2} 
                    step={0.1} 
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {speakingRate.toFixed(1)}x
                  </div>
                </div>
                <div>
                  <Label htmlFor="pitch" className="text-sm mb-2 block">
                    Pitch
                  </Label>
                  <Slider 
                    id="pitch"
                    value={[pitch]} 
                    onValueChange={([value]) => setPitch(value)}
                    min={-20} 
                    max={20} 
                    step={1} 
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {pitch} semitones
                  </div>
                </div>
              </div>
            </ControlPanel>

            <ControlPanel 
              title="Audio Enhancements" 
              icon={<Volume2 className="w-4 h-4" />}
            >
              <div className="space-y-3">
                <div>
                  <Label htmlFor="volume-gain" className="text-sm mb-2 block">
                    Volume Gain
                  </Label>
                  <Slider 
                    id="volume-gain"
                    value={[volumeGain]} 
                    onValueChange={([value]) => setVolumeGain(value)}
                    min={-12} 
                    max={12} 
                    step={1} 
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {volumeGain > 0 ? '+' : ''}{volumeGain}dB
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="noise-reduction" className="text-sm">
                    Noise Reduction
                  </Label>
                  <Switch id="noise-reduction" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="normalize-audio" className="text-sm">
                    Normalize Audio
                  </Label>
                  <Switch id="normalize-audio" defaultChecked />
                </div>
              </div>
            </ControlPanel>
          </>
        )}

        {/* Background Audio Step */}
        {isBackgroundAudioStep && (
          <>
            <ControlPanel 
              title="Background Music" 
              icon={<Music className="w-4 h-4" />}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-music" className="text-sm">
                    Enable Background Music
                  </Label>
                  <Switch 
                    id="enable-music" 
                    checked={backgroundMusic} 
                    onCheckedChange={setBackgroundMusic} 
                  />
                </div>
                {backgroundMusic && (
                  <>
                    <div>
                      <Label htmlFor="music-volume" className="text-sm mb-2 block">
                        Music Volume
                      </Label>
                      <Slider 
                        id="music-volume"
                        value={[musicVolume]} 
                        onValueChange={([value]) => setMusicVolume(value)}
                        max={100} 
                        step={5} 
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {musicVolume}%
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      <FolderOpen className="w-4 h-4 mr-2" />
                      Choose Music Track
                    </Button>
                  </>
                )}
              </div>
            </ControlPanel>

            <ControlPanel 
              title="Audio Mix" 
              icon={<Sliders className="w-4 h-4" />}
            >
              <div className="space-y-3">
                <div className="text-sm text-card-foreground">
                  Voice: 100%
                </div>
                <Progress value={100} className="h-2" />
                {backgroundMusic && (
                  <>
                    <div className="text-sm text-card-foreground">
                      Music: {musicVolume}%
                    </div>
                    <Progress value={musicVolume} className="h-2" />
                  </>
                )}
                <div className="text-xs text-muted-foreground">
                  Drag handles to adjust mix levels
                </div>
              </div>
            </ControlPanel>
          </>
        )}

        {/* Visual Elements Step */}
        {isVisualElementsStep && (
          <>
            <ControlPanel 
              title="Visual Style" 
              icon={<Palette className="w-4 h-4" />}
            >
              <div className="space-y-3">
                <div>
                  <Label htmlFor="theme-select" className="text-sm mb-2 block">
                    Theme
                  </Label>
                  <Select defaultValue="dark">
                    <SelectTrigger id="theme-select">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="color-scheme" className="text-sm mb-2 block">
                    Color Scheme
                  </Label>
                  <Select defaultValue="blue">
                    <SelectTrigger id="color-scheme">
                      <SelectValue placeholder="Select color scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </ControlPanel>

            <ControlPanel 
              title="Background Elements" 
              icon={<Image className="w-4 h-4" />}
            >
              <div className="space-y-3">
                <Button size="sm" variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Background Image
                </Button>
                <Button size="sm" variant="outline" className="w-full">
                  <Video className="w-4 h-4 mr-2" />
                  Choose Video Background
                </Button>
                <div className="text-xs text-muted-foreground">
                  Supported: JPG, PNG, MP4, WebM
                </div>
              </div>
            </ControlPanel>
          </>
        )}

        {/* Mixing Settings Step */}
        {isMixingSettingsStep && (
          <>
            <ControlPanel 
              title="Video Settings" 
              icon={<Video className="w-4 h-4" />}
            >
              <div className="space-y-3">
                <div>
                  <Label htmlFor="resolution-select" className="text-sm mb-2 block">
                    Resolution
                  </Label>
                  <Select value={resolution} onValueChange={setResolution}>
                    <SelectTrigger id="resolution-select">
                      <SelectValue placeholder="Select resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4K">4K (3840x2160)</SelectItem>
                      <SelectItem value="1080p">1080p (1920x1080)</SelectItem>
                      <SelectItem value="720p">720p (1280x720)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="frame-rate-select" className="text-sm mb-2 block">
                    Frame Rate
                  </Label>
                  <Select value={frameRate} onValueChange={setFrameRate}>
                    <SelectTrigger id="frame-rate-select">
                      <SelectValue placeholder="Select frame rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60 fps</SelectItem>
                      <SelectItem value="30">30 fps</SelectItem>
                      <SelectItem value="24">24 fps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </ControlPanel>

            <ControlPanel 
              title="Export Settings" 
              icon={<Settings2 className="w-4 h-4" />}
            >
              <div className="space-y-3">
                <div>
                  <Label htmlFor="format-select" className="text-sm mb-2 block">
                    Output Format
                  </Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger id="format-select">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp4">MP4</SelectItem>
                      <SelectItem value="webm">WebM</SelectItem>
                      <SelectItem value="mov">MOV</SelectItem>
                      <SelectItem value="avi">AVI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-watermark" className="text-sm">
                    Include Watermark
                  </Label>
                  <Switch id="include-watermark" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="optimize-size" className="text-sm">
                    Optimize for Size
                  </Label>
                  <Switch id="optimize-size" defaultChecked />
                </div>
              </div>
            </ControlPanel>
          </>
        )}

        {/* Output Configuration Step */}
        {isOutputConfigStep && (
          <>
            <ControlPanel 
              title="Export Format" 
              icon={<FileOutput className="w-4 h-4" />}
            >
              <div className="space-y-3">
                <div>
                  <Label htmlFor="final-format" className="text-sm mb-2 block">
                    Output Type
                  </Label>
                  <Select defaultValue="video">
                    <SelectTrigger id="final-format">
                      <SelectValue placeholder="Select output type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video File</SelectItem>
                      <SelectItem value="audio">Audio Only</SelectItem>
                      <SelectItem value="both">Both Video & Audio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quality" className="text-sm mb-2 block">
                    Quality
                  </Label>
                  <Select defaultValue="high">
                    <SelectTrigger id="quality">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="ultra">Ultra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </ControlPanel>

            <ControlPanel 
              title="Metadata" 
              icon={<Info className="w-4 h-4" />}
            >
              <div className="space-y-3">
                <div>
                  <Label htmlFor="title-input" className="text-sm text-card-foreground mb-2 block">
                    Title
                  </Label>
                  <Input
                    id="title-input"
                    className="bg-input-background border-border text-foreground"
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <Label htmlFor="description-input" className="text-sm text-card-foreground mb-2 block">
                    Description
                  </Label>
                  <textarea 
                    id="description-input"
                    className="w-full bg-input-background border border-border rounded px-2 py-1 text-sm text-foreground resize-none"
                    rows={3}
                    placeholder="Enter description"
                  />
                </div>
              </div>
            </ControlPanel>
          </>
        )}

        {/* Result Step */}
        {isResultStep && (
          <>
            <ControlPanel 
              title="Project Status" 
              icon={<CheckCircle className="w-4 h-4" />}
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
              title="Download Options" 
              icon={<Download className="w-4 h-4" />}
            >
              <div className="space-y-3">
                <Button size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Video
                </Button>
                <Button size="sm" variant="outline" className="w-full">
                  <Share className="w-4 h-4 mr-2" />
                  Share Online
                </Button>
                <Button size="sm" variant="outline" className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Project
                </Button>
              </div>
            </ControlPanel>
          </>
        )}

        {/* Step Actions */}
        <div className="pt-4 border-t border-sidebar-border">
          <Button 
            className="w-full" 
            onClick={() => onStepComplete?.(currentStep)}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete {currentStep}
          </Button>
        </div>
      </div>
    </div>
  );
}