import { useState, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { 
  Music, 
  Play, 
  Pause, 
  Download, 
  RotateCcw,
  Headphones,
  Trash2,
  Mic,
  Library
} from 'lucide-react';

interface AudioTrack {
  id: string;
  name: string;
  type: 'music' | 'ambient' | 'sfx' | 'custom';
  url: string;
  duration: number;
  volume: number;
  fadeIn: number;
  fadeOut: number;
  loop: boolean;
  visible: boolean;
  bpm?: number;
  mood?: string;
  genre?: string;
}

interface AudioSettings {
  masterVolume: number;
  duckingEnabled: boolean;
  duckingThreshold: number;
  crossfadeDuration: number;
  outputFormat: string;
  sampleRate: number;
  bitDepth: number;
}

const audioTracks: AudioTrack[] = [
  {
    id: '1',
    name: 'Epic Cinematic',
    type: 'music',
    url: '/audio/epic-cinematic.mp3',
    duration: 180,
    volume: 70,
    fadeIn: 3,
    fadeOut: 5,
    loop: true,
    visible: true,
    bpm: 120,
    mood: 'Epic',
    genre: 'Cinematic'
  },
  {
    id: '2',
    name: 'Calm Ambient',
    type: 'ambient',
    url: '/audio/calm-ambient.mp3',
    duration: 300,
    volume: 60,
    fadeIn: 2,
    fadeOut: 4,
    loop: true,
    visible: true,
    mood: 'Calm',
    genre: 'Ambient'
  },
  {
    id: '3',
    name: 'Rain Sounds',
    type: 'sfx',
    url: '/audio/rain-sounds.mp3',
    duration: 600,
    volume: 50,
    fadeIn: 5,
    fadeOut: 8,
    loop: true,
    visible: false,
    mood: 'Relaxing',
    genre: 'Nature'
  }
];

const audioMoods = [
  'Epic', 'Calm', 'Energetic', 'Relaxing', 'Mysterious', 'Happy', 'Sad', 'Suspenseful', 'Inspiring'
];

const audioGenres = [
  'Cinematic', 'Ambient', 'Electronic', 'Orchestral', 'Nature', 'Urban', 'SFX', 'Custom'
];

const outputFormats = [
  'MP3', 'WAV', 'FLAC', 'AAC', 'OGG', 'M4A'
];

export default function BackgroundAudioPage() {
  const [tracks, setTracks] = useState<AudioTrack[]>(audioTracks);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [settings, setSettings] = useState<AudioSettings>({
    masterVolume: 100,
    duckingEnabled: true,
    duckingThreshold: -12,
    crossfadeDuration: 2,
    outputFormat: 'MP3',
    sampleRate: 44100,
    bitDepth: 16
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const selectedTrackData = tracks.find(t => t.id === selectedTrack);

  const handleAddTrack = (type: AudioTrack['type']) => {
    const newTrack: AudioTrack = {
      id: Date.now().toString(),
      name: `New ${type}`,
      type,
      url: '',
      duration: 0,
      volume: 70,
      fadeIn: 2,
      fadeOut: 3,
      loop: true,
      visible: true,
      mood: 'Calm',
      genre: type === 'music' ? 'Cinematic' : type === 'ambient' ? 'Ambient' : 'SFX'
    };
    setTracks([...tracks, newTrack]);
    setSelectedTrack(newTrack.id);
  };

  const handleDeleteTrack = (id: string) => {
    setTracks(tracks.filter(t => t.id !== id));
    if (selectedTrack === id) {
      setSelectedTrack(null);
    }
  };

  const updateTrack = (id: string, updates: Partial<AudioTrack>) => {
    setTracks(tracks.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const updateSetting = (key: keyof AudioSettings, value: number | string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePlay = async () => {
    if (!selectedTrackData) return;
    
    setIsPlaying(true);
    // Simulate audio playback
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setCurrentTime(elapsed % selectedTrackData.duration);
      
      if (elapsed >= selectedTrackData.duration && !selectedTrackData.loop) {
        clearInterval(interval);
        setIsPlaying(false);
        setCurrentTime(0);
      }
    }, 100);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const getTrackIcon = (type: string) => {
    switch (type) {
      case 'music': return <Music className="h-4 w-4" />;
      case 'ambient': return <span className="h-4 w-4" />;
      case 'sfx': return <Mic className="h-4 w-4" />;
      case 'custom': return <Library className="h-4 w-4" />;
      default: return <Headphones className="h-4 w-4" />;
    }
  };

  const getTrackColor = (type: string) => {
    switch (type) {
      case 'music': return 'bg-purple-500/10 text-purple-500';
      case 'ambient': return 'bg-blue-500/10 text-blue-500';
      case 'sfx': return 'bg-orange-500/10 text-orange-500';
      case 'custom': return 'bg-green-500/10 text-green-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Background Audio</h1>
          <p className="text-muted-foreground">
            Manage background music and sound effects for your narration
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button 
            onClick={isPlaying ? handleStop : handlePlay} 
            disabled={!selectedTrackData}
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
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audio Library */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Audio Library</CardTitle>
            <CardDescription>
              Manage your audio tracks and effects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="flex-col h-16"
                onClick={() => handleAddTrack('music')}
              >
                <Music className="h-5 w-5 mb-1" />
                <span className="text-xs">Music</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-col h-16"
                onClick={() => handleAddTrack('ambient')}
              >
                <span className="h-5 w-5 mb-1" />
                <span className="text-xs">Ambient</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-col h-16"
                onClick={() => handleAddTrack('sfx')}
              >
                <Mic className="h-5 w-5 mb-1" />
                <span className="text-xs">SFX</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-col h-16"
                onClick={() => handleAddTrack('custom')}
              >
                <Library className="h-5 w-5 mb-1" />
                <span className="text-xs">Custom</span>
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTrack === track.id
                      ? 'bg-primary/10 border-primary'
                      : 'bg-muted/50 hover:bg-muted/80'
                  }`}
                  onClick={() => setSelectedTrack(track.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={getTrackColor(track.type)}>
                        {getTrackIcon(track.type)}
                      </div>
                      <span className="text-sm font-medium">{track.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTrack(track.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>{track.mood}</span>
                      <span>{track.genre}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{formatTime(track.duration)}</span>
                      <span>{track.volume}% vol</span>
                    </div>
                  </div>
                  
                  {track.bpm && (
                    <span className="mt-2 text-xs border rounded px-2 py-1 text-muted-foreground">
                      {track.bpm} BPM
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Track Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Track Editor</CardTitle>
            <CardDescription>
              {selectedTrackData ? `Editing: ${selectedTrackData.name}` : 'Select a track to edit'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedTrackData ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Track Name</Label>
                    <Input
                      value={selectedTrackData.name}
                      onChange={(e) => updateTrack(selectedTrackData.id, { name: e.target.value })}
                      placeholder="Enter track name"
                    />
                  </div>
                  <div>
                    <Label>Mood</Label>
                    <Select 
                      value={selectedTrackData.mood} 
                      onValueChange={(value) => updateTrack(selectedTrackData.id, { mood: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select mood" />
                      </SelectTrigger>
                      <SelectContent>
                        {audioMoods.map(mood => (
                          <SelectItem key={mood} value={mood}>
                            {mood}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Genre</Label>
                    <Select 
                      value={selectedTrackData.genre} 
                      onValueChange={(value) => updateTrack(selectedTrackData.id, { genre: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {audioGenres.map(genre => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedTrackData.bpm !== undefined && (
                    <div>
                      <Label>BPM: {selectedTrackData.bpm}</Label>
                      <Slider
                        value={[selectedTrackData.bpm]}
                        onValueChange={([value]) => updateTrack(selectedTrackData.id, { bpm: value })}
                        min={60}
                        max={200}
                        step={1}
                      />
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label>Volume: {selectedTrackData.volume}%</Label>
                    <Slider
                      value={[selectedTrackData.volume]}
                      onValueChange={([value]) => updateTrack(selectedTrackData.id, { volume: value })}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Fade In: {selectedTrackData.fadeIn}s</Label>
                      <Slider
                        value={[selectedTrackData.fadeIn]}
                        onValueChange={([value]) => updateTrack(selectedTrackData.id, { fadeIn: value })}
                        min={0}
                        max={10}
                        step={0.5}
                      />
                    </div>
                    <div>
                      <Label>Fade Out: {selectedTrackData.fadeOut}s</Label>
                      <Slider
                        value={[selectedTrackData.fadeOut]}
                        onValueChange={([value]) => updateTrack(selectedTrackData.id, { fadeOut: value })}
                        min={0}
                        max={10}
                        step={0.5}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor={`loop-${selectedTrackData.id}`}>Loop</Label>
                    <Switch
                      id={`loop-${selectedTrackData.id}`}
                      checked={selectedTrackData.loop}
                      onCheckedChange={(checked) => updateTrack(selectedTrackData.id, { loop: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor={`visible-${selectedTrackData.id}`}>Visible in Mix</Label>
                    <Switch
                      id={`visible-${selectedTrackData.id}`}
                      checked={selectedTrackData.visible}
                      onCheckedChange={(checked) => updateTrack(selectedTrackData.id, { visible: checked })}
                    />
                  </div>
                </div>

                {/* Audio Preview */}
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Headphones className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Audio Preview</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatTime(currentTime)} / {formatTime(selectedTrackData.duration)}
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
                          style={{ 
                            width: `${(currentTime / selectedTrackData.duration) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select an audio track to edit</p>
                <p className="text-sm">Choose from the library or add a new track</p>
              </div>
            )}
            
            <audio ref={audioRef} className="hidden" />
          </CardContent>
        </Card>

        {/* Global Audio Settings */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Global Audio Settings</CardTitle>
            <CardDescription>
              Configure overall audio output settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Label>Master Volume: {settings.masterVolume}%</Label>
                <Slider
                  value={[settings.masterVolume]}
                  onValueChange={([value]) => updateSetting('masterVolume', value)}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>

              <div>
                <Label>Crossfade Duration: {settings.crossfadeDuration}s</Label>
                <Slider
                  value={[settings.crossfadeDuration]}
                  onValueChange={([value]) => updateSetting('crossfadeDuration', value)}
                  min={0}
                  max={10}
                  step={0.5}
                />
              </div>

              <div>
                <Label>Output Format</Label>
                <Select 
                  value={settings.outputFormat} 
                  onValueChange={(value) => updateSetting('outputFormat', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {outputFormats.map(format => (
                      <SelectItem key={format} value={format}>
                        {format}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Sample Rate: {settings.sampleRate} Hz</Label>
                <Select 
                  value={settings.sampleRate.toString()} 
                  onValueChange={(value) => updateSetting('sampleRate', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sample rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="44100">44.1 kHz</SelectItem>
                    <SelectItem value="48000">48 kHz</SelectItem>
                    <SelectItem value="96000">96 kHz</SelectItem>
                    <SelectItem value="192000">192 kHz</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Bit Depth: {settings.bitDepth}-bit</Label>
                <Select 
                  value={settings.bitDepth.toString()} 
                  onValueChange={(value) => updateSetting('bitDepth', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select bit depth" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16">16-bit</SelectItem>
                    <SelectItem value="24">24-bit</SelectItem>
                    <SelectItem value="32">32-bit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ducking-enabled">Voice Ducking</Label>
                  <Switch
                    id="ducking-enabled"
                    checked={settings.duckingEnabled}
                    onCheckedChange={(checked) => updateSetting('duckingEnabled', checked)}
                  />
                </div>
                
                {settings.duckingEnabled && (
                  <div>
                    <Label>Ducking Threshold: {settings.duckingThreshold} dB</Label>
                    <Slider
                      value={[settings.duckingThreshold]}
                      onValueChange={([value]) => updateSetting('duckingThreshold', value)}
                      min={-24}
                      max={0}
                      step={1}
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}