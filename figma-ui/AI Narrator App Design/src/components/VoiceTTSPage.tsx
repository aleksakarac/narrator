import { useState } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Save, 
  ChevronDown,
  Settings
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Card } from './ui/card';

export function VoiceTTSPage() {
  const [selectedVoice, setSelectedVoice] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [speed, setSpeed] = useState([1.0]);
  const [pitch, setPitch] = useState([1.0]);
  const [emotion, setEmotion] = useState([0.5]);
  const [clarity, setClarity] = useState([0.8]);
  const [pronunciation, setPronunciation] = useState([0.9]);
  const [modelVersion, setModelVersion] = useState('');
  const [advancedSettings, setAdvancedSettings] = useState(false);
  const [sampleText, setSampleText] = useState('This is a sample text for voice preview.');
  const [isPlaying, setIsPlaying] = useState(false);

  const voices = [
    'Emily - Natural Female Voice',
    'Marcus - Professional Male Voice',
    'Sarah - Expressive Female Voice',
    'David - Deep Male Voice',
    'Alex - Neutral Voice'
  ];

  const languages = [
    'English (US)',
    'English (UK)',
    'German',
    'Serbian',
    'Spanish',
    'French',
    'Italian'
  ];

  const modelVersions = [
    'Standard v2.1',
    'Enhanced v3.0',
    'Premium v3.5'
  ];

  const handlePlayPreview = () => {
    setIsPlaying(!isPlaying);
    // Simulate audio playback
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const resetToDefaults = () => {
    setSelectedVoice('');
    setSelectedGender('');
    setSelectedLanguage('');
    setSpeed([1.0]);
    setPitch([1.0]);
    setEmotion([0.5]);
    setClarity([0.8]);
    setPronunciation([0.9]);
    setModelVersion('');
    setAdvancedSettings(false);
    setSampleText('This is a sample text for voice preview.');
  };

  return (
    <div className="flex-1 bg-background p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-medium text-foreground">Voice and Text-to-Speech Settings</h1>
          <p className="text-muted-foreground">Select a voice, adjust parameters, and preview narration.</p>
        </div>

        {/* Voice Selection */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground mb-4">Voice Selection</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Choose Voice</label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger className="bg-input-background border-border text-foreground">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {voices.map((voice) => (
                      <SelectItem key={voice} value={voice} className="text-popover-foreground focus:bg-accent">
                        {voice}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Gender</label>
                <Select value={selectedGender} onValueChange={setSelectedGender}>
                  <SelectTrigger className="bg-input-background border-border text-foreground">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="male" className="text-popover-foreground focus:bg-accent">Male</SelectItem>
                    <SelectItem value="female" className="text-popover-foreground focus:bg-accent">Female</SelectItem>
                    <SelectItem value="neutral" className="text-popover-foreground focus:bg-accent">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Language</label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="bg-input-background border-border text-foreground">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {languages.map((language) => (
                      <SelectItem key={language} value={language} className="text-popover-foreground focus:bg-accent">
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* Voice Controls */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground mb-4">Voice Controls</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-card-foreground">Speed</label>
                  <span className="text-sm text-muted-foreground">{speed[0].toFixed(1)}x</span>
                </div>
                <Slider
                  value={speed}
                  onValueChange={setSpeed}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Slow</span>
                  <span>Fast</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-card-foreground">Pitch</label>
                  <span className="text-sm text-muted-foreground">{pitch[0].toFixed(1)}</span>
                </div>
                <Slider
                  value={pitch}
                  onValueChange={setPitch}
                  min={0.5}
                  max={1.5}
                  step={0.1}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-card-foreground">Emotion / Style</label>
                  <span className="text-sm text-muted-foreground">{Math.round(emotion[0] * 100)}%</span>
                </div>
                <Slider
                  value={emotion}
                  onValueChange={setEmotion}
                  min={0}
                  max={1}
                  step={0.1}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Calm</span>
                  <span>Energetic</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-card-foreground" />
                <label className="text-sm font-medium text-card-foreground">Enable Advanced Settings</label>
              </div>
              <Switch 
                checked={advancedSettings} 
                onCheckedChange={setAdvancedSettings}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>
        </Card>

        {/* Advanced Settings */}
        {advancedSettings && (
          <Card className="bg-card border-border p-6">
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-card-foreground mb-4">Advanced Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-card-foreground">Clarity</label>
                    <span className="text-sm text-muted-foreground">{Math.round(clarity[0] * 100)}%</span>
                  </div>
                  <Slider
                    value={clarity}
                    onValueChange={setClarity}
                    min={0}
                    max={1}
                    step={0.1}
                    className="[&_[role=slider]]:bg-chart-2 [&_[role=slider]]:border-chart-2"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-card-foreground">Pronunciation Accuracy</label>
                    <span className="text-sm text-muted-foreground">{Math.round(pronunciation[0] * 100)}%</span>
                  </div>
                  <Slider
                    value={pronunciation}
                    onValueChange={setPronunciation}
                    min={0}
                    max={1}
                    step={0.1}
                    className="[&_[role=slider]]:bg-chart-2 [&_[role=slider]]:border-chart-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Model Version</label>
                <Select value={modelVersion} onValueChange={setModelVersion}>
                  <SelectTrigger className="bg-input-background border-border text-foreground max-w-xs">
                    <SelectValue placeholder="Select model version" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {modelVersions.map((version) => (
                      <SelectItem key={version} value={version} className="text-popover-foreground focus:bg-accent">
                        {version}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}

        {/* Preview Section */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground mb-4">Voice Preview</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Sample Text</label>
                <Input
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  className="bg-input-background border-border text-foreground"
                  placeholder="Enter sample text for preview"
                />
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  onClick={handlePlayPreview}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pause Preview' : 'Play Preview'}
                </Button>

                {isPlaying && (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setIsPlaying(false)}
                      size="sm"
                      variant="outline"
                    >
                      <Square className="w-4 h-4" />
                    </Button>
                    <div className="text-sm text-muted-foreground">Playing preview...</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Button 
            onClick={resetToDefaults}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </Button>
          
          <Button 
            className="flex items-center gap-2 bg-chart-3 hover:bg-chart-4 text-primary-foreground"
          >
            <Save className="w-4 h-4" />
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}