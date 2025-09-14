import { useState, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Textarea } from '../components/ui/textarea';
import { 
  Play, 
  Pause, 
  Settings, 
  Download, 
  RotateCcw,
  Headphones,
  Sparkles,
  Zap,
  Clock
} from 'lucide-react';

interface Voice {
  id: string;
  name: string;
  language: string;
  gender: 'male' | 'female' | 'neutral';
  style: string;
  quality: 'standard' | 'premium' | 'neural';
  previewUrl?: string;
}

interface VoiceSettings {
  speed: number;
  pitch: number;
  volume: number;
  emotion: string;
  emphasis: string;
}

const voices: Voice[] = [
  {
    id: 'en-us-amy',
    name: 'Amy',
    language: 'English (US)',
    gender: 'female',
    style: 'Friendly, Conversational',
    quality: 'neural'
  },
  {
    id: 'en-us-david',
    name: 'David',
    language: 'English (US)',
    gender: 'male',
    style: 'Professional, Authoritative',
    quality: 'neural'
  },
  {
    id: 'en-us-lisa',
    name: 'Lisa',
    language: 'English (US)',
    gender: 'female',
    style: 'Warm, Empathetic',
    quality: 'premium'
  },
  {
    id: 'en-gb-charlotte',
    name: 'Charlotte',
    language: 'English (UK)',
    gender: 'female',
    style: 'Elegant, Sophisticated',
    quality: 'neural'
  },
  {
    id: 'en-au-liam',
    name: 'Liam',
    language: 'English (AU)',
    gender: 'male',
    style: 'Casual, Friendly',
    quality: 'premium'
  }
];

const emotions = [
  'Neutral', 'Happy', 'Sad', 'Excited', 'Calm', 'Serious', 'Friendly', 'Professional'
];

const emphasisOptions = [
  'Normal', 'Moderate', 'Strong', 'Very Strong'
];

export default function VoiceTTSPage() {
  const [selectedVoice, setSelectedVoice] = useState(voices[0].id);
  const [inputText, setInputText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [settings, setSettings] = useState<VoiceSettings>({
    speed: 1.0,
    pitch: 0,
    volume: 100,
    emotion: 'Neutral',
    emphasis: 'Normal'
  });
  const [advancedSettings, setAdvancedSettings] = useState({
    useSSML: false,
    optimizeForLongForm: true,
    addPauses: true,
    pronunciationCorrection: true
  });
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const selectedVoiceData = voices.find(v => v.id === selectedVoice);

  const handlePlay = async () => {
    if (!inputText.trim()) return;
    
    setIsPlaying(true);
    // Simulate TTS generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    // In a real app, this would play actual audio
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleDownload = () => {
    if (!inputText.trim()) return;
    // Simulate download
    console.log('Downloading audio...');
  };

  const updateSetting = (key: keyof VoiceSettings, value: number | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleAdvancedSetting = (key: keyof typeof advancedSettings) => {
    setAdvancedSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'neural': return 'bg-purple-500/10 text-purple-500';
      case 'premium': return 'bg-blue-500/10 text-blue-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'male': return '♂';
      case 'female': return '♀';
      default: return '⚧';
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Voice & TTS</h1>
          <p className="text-muted-foreground">
            Configure voice settings and generate high-quality narration
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button 
            onClick={isPlaying ? handleStop : handlePlay} 
            disabled={!inputText.trim()}
            className="min-w-[120px]"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Preview
              </>
            )}
          </Button>
          <Button onClick={handleDownload} disabled={!inputText.trim()}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Text Input</CardTitle>
            <CardDescription>
              Enter the text you want to convert to speech
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Type or paste text to narrate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[150px] font-mono"
            />
            {inputText && (
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <span>{inputText.length} characters</span>
                <span>{Math.ceil(inputText.length / 1500)} minutes approx.</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Voice Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Voice Selection</CardTitle>
            <CardDescription>
              Choose a voice and configure basic settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Select Voice</Label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{getGenderIcon(voice.gender)}</span>
                          <span className="font-medium">{voice.name}</span>
                        </div>
                        <span className={`border rounded px-2 py-1 text-xs ${getQualityColor(voice.quality)}`}>
                          {voice.quality}
                        </span>
                        <span className="text-muted-foreground text-sm">{voice.language}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedVoiceData && (
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{selectedVoiceData.name}</span>
                  <span className={`px-2 py-1 border rounded-full text-xs ${getQualityColor(selectedVoiceData.quality)}`}>
                    {selectedVoiceData.quality}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedVoiceData.language} • {selectedVoiceData.style}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{getGenderIcon(selectedVoiceData.gender)} {selectedVoiceData.gender}</span>
                  <span>•</span>
                  <span>Neural TTS</span>
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Speed: {settings.speed}x</Label>
                <span className="text-sm text-muted-foreground">
                  {settings.speed < 1 ? 'Slower' : settings.speed > 1 ? 'Faster' : 'Normal'}
                </span>
              </div>
              <Slider
                value={[settings.speed]}
                onValueChange={([value]) => updateSetting('speed', value)}
                min={0.5}
                max={2.0}
                step={0.1}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Pitch: {settings.pitch}</Label>
                <span className="text-sm text-muted-foreground">
                  {settings.pitch < 0 ? 'Lower' : settings.pitch > 0 ? 'Higher' : 'Normal'}
                </span>
              </div>
              <Slider
                value={[settings.pitch]}
                onValueChange={([value]) => updateSetting('pitch', value)}
                min={-12}
                max={12}
                step={1}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Volume: {settings.volume}%</Label>
              </div>
              <Slider
                value={[settings.volume]}
                onValueChange={([value]) => updateSetting('volume', value)}
                min={0}
                max={100}
                step={1}
              />
            </div>
          </CardContent>
        </Card>

        {/* Advanced Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>
              Fine-tune the narration output quality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Emotion</Label>
              <Select 
                value={settings.emotion} 
                onValueChange={(value) => updateSetting('emotion', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select emotion" />
                </SelectTrigger>
                <SelectContent>
                  {emotions.map(emotion => (
                    <SelectItem key={emotion} value={emotion}>
                      {emotion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Emphasis</Label>
              <Select 
                value={settings.emphasis} 
                onValueChange={(value) => updateSetting('emphasis', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select emphasis" />
                </SelectTrigger>
                <SelectContent>
                  {emphasisOptions.map(emphasis => (
                    <SelectItem key={emphasis} value={emphasis}>
                      {emphasis}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="optimize-long-form" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Optimize for Long Form
                </Label>
                <Switch
                  id="optimize-long-form"
                  checked={advancedSettings.optimizeForLongForm}
                  onCheckedChange={() => toggleAdvancedSetting('optimizeForLongForm')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="add-pauses" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Add Natural Pauses
                </Label>
                <Switch
                  id="add-pauses"
                  checked={advancedSettings.addPauses}
                  onCheckedChange={() => toggleAdvancedSetting('addPauses')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="pronunciation" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Pronunciation Correction
                </Label>
                <Switch
                  id="pronunciation"
                  checked={advancedSettings.pronunciationCorrection}
                  onCheckedChange={() => toggleAdvancedSetting('pronunciationCorrection')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="use-ssml" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Use SSML Tags
                </Label>
                <Switch
                  id="use-ssml"
                  checked={advancedSettings.useSSML}
                  onCheckedChange={() => toggleAdvancedSetting('useSSML')}
                />
              </div>
            </div>

            {advancedSettings.useSSML && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <div className="text-sm text-amber-700">
                  SSML (Speech Synthesis Markup Language) allows advanced control over speech output.
                  Use tags like &lt;prosody&gt;, &lt;break&gt;, and &lt;emphasis&gt; for precise control.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      {inputText && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              Estimated output based on current settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Audio Preview</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.ceil(inputText.length / 1500)} min • {Math.ceil(inputText.length * 0.002)} MB
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Button 
                    size="sm" 
                    onClick={isPlaying ? handleStop : handlePlay}
                    disabled={isPlaying}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: isPlaying ? '60%' : '0%' }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {isPlaying ? 'Playing...' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>
            
            <audio ref={audioRef} className="hidden" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}