import { useState } from 'react';
import { 
  Play, 
  Pause,
  Square,
  RotateCcw,
  Save,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Music,
  Mic,
  Video,
  Settings,
  Sliders
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Checkbox } from './ui/checkbox';
import { Card } from './ui/card';

interface TrackData {
  id: string;
  name: string;
  type: 'narration' | 'music' | 'visual';
  volume: number;
  isMuted: boolean;
  isSolo: boolean;
  duration: number;
  color: string;
}

export function AudioVideoMixingPage() {
  const [mixingMode, setMixingMode] = useState('');
  const [voiceMusicBalance, setVoiceMusicBalance] = useState([65]);
  const [overallVolume, setOverallVolume] = useState([85]);
  const [transitionSpeed, setTransitionSpeed] = useState([1.0]);
  const [normalizeAudio, setNormalizeAudio] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [manualSync, setManualSync] = useState(false);
  const [timeOffset, setTimeOffset] = useState('0.0');
  const [frameRate, setFrameRate] = useState('30');
  const [resolution, setResolution] = useState('1080p');
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration] = useState(245); // 4:05 minutes

  const [tracks, setTracks] = useState<TrackData[]>([
    {
      id: 'narration',
      name: 'Narration Track',
      type: 'narration',
      volume: 85,
      isMuted: false,
      isSolo: false,
      duration: 245,
      color: 'hsl(var(--primary))'
    },
    {
      id: 'music',
      name: 'Background Music',
      type: 'music',
      volume: 45,
      isMuted: false,
      isSolo: false,
      duration: 245,
      color: 'hsl(var(--chart-2))'
    },
    {
      id: 'visual',
      name: 'Visual Track',
      type: 'visual',
      volume: 100,
      isMuted: false,
      isSolo: false,
      duration: 245,
      color: 'hsl(var(--chart-3))'
    }
  ]);

  const mixingModes = [
    'Standard',
    'Crossfade',
    'Sidechain (voice prioritized)',
    'Manual'
  ];

  const frameRates = ['24', '30', '60'];
  const resolutions = ['720p', '1080p', '4K'];

  const handleTrackVolumeChange = (trackId: string, newVolume: number[]) => {
    setTracks(prev => prev.map(track => 
      track.id === trackId ? { ...track, volume: newVolume[0] } : track
    ));
  };

  const handleToggleMute = (trackId: string) => {
    setTracks(prev => prev.map(track => 
      track.id === trackId ? { ...track, isMuted: !track.isMuted } : track
    ));
  };

  const handleToggleSolo = (trackId: string) => {
    setTracks(prev => prev.map(track => 
      track.id === trackId ? { ...track, isSolo: !track.isSolo } : track
    ));
  };

  const handlePlayPreview = () => {
    setIsPreviewPlaying(!isPreviewPlaying);
    if (!isPreviewPlaying) {
      // Simulate playback
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalDuration) {
            setIsPreviewPlaying(false);
            clearInterval(interval);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetChanges = () => {
    setMixingMode('');
    setVoiceMusicBalance([65]);
    setOverallVolume([85]);
    setTransitionSpeed([1.0]);
    setNormalizeAudio(true);
    setAutoSync(true);
    setManualSync(false);
    setTimeOffset('0.0');
    setFrameRate('30');
    setResolution('1080p');
    setTracks(prev => prev.map(track => ({
      ...track,
      volume: track.type === 'narration' ? 85 : track.type === 'music' ? 45 : 100,
      isMuted: false,
      isSolo: false
    })));
  };

  const getTrackIcon = (type: string) => {
    switch (type) {
      case 'narration': return <Mic className="w-4 h-4" />;
      case 'music': return <Music className="w-4 h-4" />;
      case 'visual': return <Video className="w-4 h-4" />;
      default: return <Volume2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex-1 bg-background p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-medium text-foreground">Audio, Video, and Mixing Settings</h1>
          <p className="text-muted-foreground">Configure how narration, background audio, and visuals are combined into the final output.</p>
        </div>

        {/* Timeline/Layer View */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground mb-4">Timeline & Layers</h2>
            
            <div className="space-y-4">
              {tracks.map((track) => (
                <div key={track.id} className="bg-input-background border border-border rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    {/* Track Info */}
                    <div className="flex items-center gap-3 min-w-48">
                      <div className="flex items-center gap-2">
                        {getTrackIcon(track.type)}
                        <span className="text-sm font-medium text-foreground">{track.name}</span>
                      </div>
                    </div>

                    {/* Timeline Visualization */}
                    <div className="flex-1 relative">
                      <div className="h-8 bg-card rounded-lg overflow-hidden relative">
                        <div 
                          className="h-full rounded-lg opacity-80"
                          style={{
                            backgroundColor: track.color,
                            width: '100%'
                          }}
                        />
                        {/* Playhead indicator */}
                        {isPreviewPlaying && (
                          <div 
                            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg transition-all duration-1000"
                            style={{
                              left: `${(currentTime / totalDuration) * 100}%`
                            }}
                          />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{formatTime(track.duration)}</div>
                    </div>

                    {/* Track Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleMute(track.id)}
                        className={`${
                          track.isMuted 
                            ? 'bg-destructive border-destructive text-destructive-foreground hover:bg-destructive/80' 
                            : ''
                        }`}
                      >
                        {track.isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleSolo(track.id)}
                        className={`${
                          track.isSolo 
                            ? 'bg-chart-4 border-chart-4 text-primary-foreground hover:bg-chart-4/80' 
                            : ''
                        }`}
                      >
                        {track.isSolo ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      </Button>

                      <div className="w-24">
                        <Slider
                          value={[track.volume]}
                          onValueChange={(value) => handleTrackVolumeChange(track.id, value)}
                          min={0}
                          max={100}
                          step={1}
                          className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">{track.volume}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Mixing Controls */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground mb-4">Mixing Controls</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Mixing Mode</label>
                <Select value={mixingMode} onValueChange={setMixingMode}>
                  <SelectTrigger className="bg-input-background border-border text-foreground">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {mixingModes.map((mode) => (
                      <SelectItem key={mode} value={mode} className="text-popover-foreground focus:bg-accent">
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-card-foreground">Voice/Music Balance</label>
                  <span className="text-sm text-muted-foreground">{voiceMusicBalance[0]}%</span>
                </div>
                <Slider
                  value={voiceMusicBalance}
                  onValueChange={setVoiceMusicBalance}
                  min={0}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-chart-2 [&_[role=slider]]:border-chart-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Voice</span>
                  <span>Music</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-card-foreground">Overall Volume</label>
                  <span className="text-sm text-muted-foreground">{overallVolume[0]}%</span>
                </div>
                <Slider
                  value={overallVolume}
                  onValueChange={setOverallVolume}
                  min={0}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-card-foreground">Transition Speed</label>
                  <span className="text-sm text-muted-foreground">{transitionSpeed[0].toFixed(1)}x</span>
                </div>
                <Slider
                  value={transitionSpeed}
                  onValueChange={setTransitionSpeed}
                  min={0.1}
                  max={3.0}
                  step={0.1}
                  className="[&_[role=slider]]:bg-chart-3 [&_[role=slider]]:border-chart-3"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="normalize" 
                  checked={normalizeAudio}
                  onCheckedChange={setNormalizeAudio}
                />
                <label htmlFor="normalize" className="text-sm text-card-foreground">Normalize Audio Levels</label>
              </div>
            </div>
          </div>
        </Card>

        {/* Video & Audio Sync Settings */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground mb-4">Video & Audio Sync Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-card-foreground" />
                  <label className="text-sm font-medium text-card-foreground">Auto-sync voice with visuals</label>
                </div>
                <Switch 
                  checked={autoSync} 
                  onCheckedChange={setAutoSync}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sliders className="w-5 h-5 text-card-foreground" />
                  <label className="text-sm font-medium text-card-foreground">Manual sync</label>
                </div>
                <Switch 
                  checked={manualSync} 
                  onCheckedChange={setManualSync}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Frame Rate</label>
                <Select value={frameRate} onValueChange={setFrameRate}>
                  <SelectTrigger className="bg-input-background border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {frameRates.map((rate) => (
                      <SelectItem key={rate} value={rate} className="text-popover-foreground focus:bg-accent">
                        {rate} fps
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Resolution</label>
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger className="bg-input-background border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {resolutions.map((res) => (
                      <SelectItem key={res} value={res} className="text-popover-foreground focus:bg-accent">
                        {res}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Aspect Ratio</label>
                {/* Single aspect ratio selection for single output type */}
                {true && ( // This would be: selectedOutputTypes.length === 1
                  <Select value="16:9" onValueChange={() => {}}>
                    <SelectTrigger className="bg-input-background border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="16:9" className="text-popover-foreground focus:bg-accent">
                        16:9 (Widescreen)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {/* Multiple aspect ratio selection for multiple output types */}
                {false && ( // This would be: selectedOutputTypes.length > 1
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="aspect-16-9" 
                          checked={true} // aspectRatios['16:9']
                          onCheckedChange={() => {}} // handleAspectRatioChange('16:9')
                        />
                        <label htmlFor="aspect-16-9" className="text-xs text-card-foreground">16:9 (Whole Book/Chapters)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="aspect-9-16" 
                          checked={false} // aspectRatios['9:16']
                          onCheckedChange={() => {}} // handleAspectRatioChange('9:16')
                        />
                        <label htmlFor="aspect-9-16" className="text-xs text-card-foreground">9:16 (Short Form)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="aspect-1-1" 
                          checked={false} // aspectRatios['1:1']
                          onCheckedChange={() => {}} // handleAspectRatioChange('1:1')
                        />
                        <label htmlFor="aspect-1-1" className="text-xs text-card-foreground">1:1 (Square)</label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {manualSync && (
              <div className="pt-4 border-t border-border">
                <div className="max-w-xs space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Time Offset (seconds)</label>
                  <Input
                    value={timeOffset}
                    onChange={(e) => setTimeOffset(e.target.value)}
                    className="bg-input-background border-border text-foreground"
                    placeholder="0.0"
                    type="number"
                    step="0.1"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Preview Section */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground mb-4">Preview</h2>
            
            <div className="relative bg-input-background border border-border rounded-lg aspect-video flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-muted-foreground text-sm mb-4">Combined audio/video preview</div>
                  
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={handlePlayPreview}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                    >
                      {isPreviewPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPreviewPlaying ? 'Pause' : 'Play Preview'}
                    </Button>

                    {isPreviewPlaying && (
                      <Button
                        onClick={() => {
                          setIsPreviewPlaying(false);
                          setCurrentTime(0);
                        }}
                        size="sm"
                        variant="outline"
                      >
                        <Square className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {isPreviewPlaying && (
                    <div className="w-full max-w-md mx-auto">
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
                        <div className="flex-1 bg-card h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full transition-all duration-1000"
                            style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{formatTime(totalDuration)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Button 
            onClick={resetChanges}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Changes
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