import { useState } from 'react';
import { 
  Upload, 
  FolderOpen, 
  Play, 
  Pause, 
  Square,
  Volume2,
  VolumeX,
  Trash2,
  Plus,
  RotateCcw,
  Save,
  Music,
  Clock,
  Layers
} from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Card } from './ui/card';

interface AudioTrack {
  id: string;
  name: string;
  duration: string;
  volume: number;
  isMuted: boolean;
}

export function BackgroundAudioPage() {
  const [volume, setVolume] = useState([70]);
  const [fadeInDuration, setFadeInDuration] = useState([2]);
  const [fadeOutDuration, setFadeOutDuration] = useState([2]);
  const [voiceMusicBalance, setVoiceMusicBalance] = useState([65]);
  const [loopTrack, setLoopTrack] = useState(false);
  const [enableMultipleLayers, setEnableMultipleLayers] = useState(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<string>('');

  const [audioLayers, setAudioLayers] = useState<AudioTrack[]>([
    { id: '1', name: 'Ambient Forest', duration: '5:32', volume: 60, isMuted: false }
  ]);

  const availableTracks = [
    { id: '1', name: 'Ambient Forest', duration: '5:32', genre: 'Nature' },
    { id: '2', name: 'Gentle Piano', duration: '4:15', genre: 'Classical' },
    { id: '3', name: 'Ocean Waves', duration: '8:20', genre: 'Nature' },
    { id: '4', name: 'Soft Strings', duration: '3:45', genre: 'Classical' },
    { id: '5', name: 'Rain Drops', duration: '6:10', genre: 'Nature' },
    { id: '6', name: 'Meditation Bells', duration: '7:30', genre: 'Ambient' }
  ];

  const handlePlayPreview = () => {
    setIsPreviewPlaying(!isPreviewPlaying);
    if (!isPreviewPlaying) {
      setTimeout(() => setIsPreviewPlaying(false), 5000);
    }
  };

  const handleTrackVolumeChange = (trackId: string, newVolume: number[]) => {
    setAudioLayers(prev => prev.map(track => 
      track.id === trackId ? { ...track, volume: newVolume[0] } : track
    ));
  };

  const handleToggleMute = (trackId: string) => {
    setAudioLayers(prev => prev.map(track => 
      track.id === trackId ? { ...track, isMuted: !track.isMuted } : track
    ));
  };

  const handleDeleteTrack = (trackId: string) => {
    setAudioLayers(prev => prev.filter(track => track.id !== trackId));
  };

  const handleAddTrack = (track: any) => {
    if (enableMultipleLayers || audioLayers.length === 0) {
      const newTrack: AudioTrack = {
        id: Date.now().toString(),
        name: track.name,
        duration: track.duration,
        volume: 50,
        isMuted: false
      };
      setAudioLayers(prev => [...prev, newTrack]);
    } else {
      // Replace existing track if multiple layers not enabled
      const newTrack: AudioTrack = {
        id: Date.now().toString(),
        name: track.name,
        duration: track.duration,
        volume: 50,
        isMuted: false
      };
      setAudioLayers([newTrack]);
    }
  };

  const resetChanges = () => {
    setVolume([70]);
    setFadeInDuration([2]);
    setFadeOutDuration([2]);
    setVoiceMusicBalance([65]);
    setLoopTrack(false);
    setEnableMultipleLayers(false);
    setSelectedTrack('');
    setAudioLayers([]);
  };

  return (
    <div className="flex-1 bg-background p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-medium text-foreground">Background Audio and Music</h1>
          <p className="text-muted-foreground">Select and configure background music or ambient audio for narration.</p>
        </div>

        {/* Music Library */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground mb-4">Music Library</h2>
            
            <div className="flex gap-4 mb-6">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Audio File
              </Button>
              <Button 
                variant="outline"
                className="flex items-center gap-2"
              >
                <FolderOpen className="w-4 h-4" />
                Browse Library
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableTracks.map((track) => (
                <div 
                  key={track.id}
                  className="bg-input-background border border-border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-foreground mb-1">{track.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{track.duration}</span>
                        <span>•</span>
                        <span>{track.genre}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => console.log('Play track:', track.name)}
                    >
                      <Play className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-chart-2 hover:bg-chart-3 text-primary-foreground"
                      onClick={() => handleAddTrack(track)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Audio Controls */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground mb-4">Audio Controls</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-card-foreground">Volume</label>
                  <span className="text-sm text-muted-foreground">{volume[0]}%</span>
                </div>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  min={0}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-card-foreground">Fade In</label>
                  <span className="text-sm text-muted-foreground">{fadeInDuration[0]}s</span>
                </div>
                <Slider
                  value={fadeInDuration}
                  onValueChange={setFadeInDuration}
                  min={0}
                  max={10}
                  step={0.5}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-card-foreground">Fade Out</label>
                  <span className="text-sm text-muted-foreground">{fadeOutDuration[0]}s</span>
                </div>
                <Slider
                  value={fadeOutDuration}
                  onValueChange={setFadeOutDuration}
                  min={0}
                  max={10}
                  step={0.5}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-card-foreground">Voice ↔ Music</label>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Music className="w-5 h-5 text-card-foreground" />
                  <label className="text-sm font-medium text-card-foreground">Loop Track</label>
                </div>
                <Switch 
                  checked={loopTrack} 
                  onCheckedChange={setLoopTrack}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-card-foreground" />
                  <label className="text-sm font-medium text-card-foreground">Enable Multiple Layers</label>
                </div>
                <Switch 
                  checked={enableMultipleLayers} 
                  onCheckedChange={setEnableMultipleLayers}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Layer Management */}
        {audioLayers.length > 0 && (
          <Card className="bg-card border-border p-6">
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-card-foreground mb-4">Audio Layers</h2>
              
              <div className="space-y-4">
                {audioLayers.map((track) => (
                  <div 
                    key={track.id}
                    className="bg-input-background border border-border rounded-lg p-4 flex items-center gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{track.name}</span>
                        <span className="text-xs text-muted-foreground">{track.duration}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <Slider
                            value={[track.volume]}
                            onValueChange={(value) => handleTrackVolumeChange(track.id, value)}
                            min={0}
                            max={100}
                            step={1}
                            className="[&_[role=slider]]:bg-chart-2 [&_[role=slider]]:border-chart-2"
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">{track.volume}%</span>
                      </div>
                    </div>
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
                        {track.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteTrack(track.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {enableMultipleLayers && (
                <Button 
                  variant="outline"
                  className="w-full border-dashed flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Track
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Preview Section */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground mb-4">Preview</h2>
            
            <div className="text-sm text-muted-foreground mb-4">
              Preview narration with background music
            </div>

            <div className="flex items-center gap-4">
              <Button 
                onClick={handlePlayPreview}
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
              >
                {isPreviewPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPreviewPlaying ? 'Pause Preview' : 'Play Preview'}
              </Button>

              {isPreviewPlaying && (
                <div className="flex items-center gap-4 flex-1">
                  <Button
                    onClick={() => setIsPreviewPlaying(false)}
                    size="sm"
                    variant="outline"
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 bg-input-background h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-1/3 transition-all duration-1000"></div>
                  </div>
                  <div className="text-sm text-muted-foreground">1:23 / 4:15</div>
                </div>
              )}
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