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
  Trash2
} from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';

interface ControlPanelProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

function ControlPanel({ title, icon, children }: ControlPanelProps) {
  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-5 h-5 text-primary">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-card-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

interface RightSidebarProps {
  currentStep?: string;
}

export function RightSidebar({ currentStep = "Choose Content Source" }: RightSidebarProps) {
  const isTextCleaningStep = currentStep === "Text Cleaning And Segmentation";
  const isVoiceTTSStep = currentStep === "Voice & Text-to-speech Settings";
  const isBackgroundAudioStep = currentStep === "Background Audio & Music";
  const isVisualElementsStep = currentStep === "Visual Elements";
  const isAudioVideoMixingStep = currentStep === "Audio & Video & Mixing Settings";
  const isOutputConfigurationStep = currentStep === "Output Configuration";
  const isResultStep = currentStep === "Result";
  
  // State for text cleaning page controls
  const [outputFormats, setOutputFormats] = useState({
    wholeBook: true,
    chapters: false,
    shortForm: false
  });
  const [fileName, setFileName] = useState("my-narration");
  const [saveLocation, setSaveLocation] = useState("/Documents/AI Narrator");

  const handleFormatChange = (format: keyof typeof outputFormats, checked: boolean) => {
    setOutputFormats(prev => ({ ...prev, [format]: checked }));
  };

  return (
    <div className="bg-sidebar border-l border-sidebar-border w-80 p-4 h-full overflow-y-auto">
      <div className="space-y-4">
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
                    <Button 
                      size="sm" 
                      variant="outline"
                    >
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
                  onClick={() => console.log('Apply text cleaning')}
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
                <Button 
                  size="sm"
                  className="w-full"
                >
                  Browse All Voices
                </Button>
              </div>
            </ControlPanel>

            <ControlPanel 
              title="Voice Presets" 
              icon={<Settings2 className="w-5 h-5" />}
            >
              <div className="space-y-3">
                <Button 
                  size="sm"
                  variant="outline"
                  className="w-full justify-start"
                >
                  Audiobook Narrator
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  className="w-full justify-start"
                >
                  Documentary Style
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  className="w-full justify-start"
                >
                  Conversational
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  className="w-full justify-start"
                >
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
  );
}