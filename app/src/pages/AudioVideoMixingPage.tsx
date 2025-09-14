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
  Video, 
  Play, 
  Pause, 
  Download, 
  RotateCcw,
  Eye,
  EyeOff,
  Waves,
  Grid,
  List,
  Trash2
} from 'lucide-react';

interface AudioVideoTrack {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'narration' | 'music' | 'sfx';
  url: string;
  startTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  visible: boolean;
  layer: number;
  offset: number;
  fadeIn: number;
  fadeOut: number;
}

interface MixSettings {
  outputResolution: string;
  frameRate: number;
  videoCodec: string;
  audioCodec: string;
  bitrate: number;
  quality: string;
  format: string;
  transition: string;
  crossfade: number;
}

const tracks: AudioVideoTrack[] = [
  {
    id: '1',
    name: 'Main Video',
    type: 'video',
    url: '/video/main.mp4',
    startTime: 0,
    duration: 180,
    volume: 100,
    muted: false,
    visible: true,
    layer: 1,
    offset: 0,
    fadeIn: 0,
    fadeOut: 0
  },
  {
    id: '2',
    name: 'Narration',
    type: 'narration',
    url: '/audio/narration.wav',
    startTime: 2,
    duration: 175,
    volume: 90,
    muted: false,
    visible: true,
    layer: 2,
    offset: 0,
    fadeIn: 1,
    fadeOut: 2
  },
  {
    id: '3',
    name: 'Background Music',
    type: 'music',
    url: '/audio/music.mp3',
    startTime: 0,
    duration: 180,
    volume: 60,
    muted: false,
    visible: true,
    layer: 3,
    offset: 0,
    fadeIn: 3,
    fadeOut: 5
  },
  {
    id: '4',
    name: 'Sound Effects',
    type: 'sfx',
    url: '/audio/sfx.mp3',
    startTime: 30,
    duration: 5,
    volume: 80,
    muted: false,
    visible: true,
    layer: 4,
    offset: 0,
    fadeIn: 0.5,
    fadeOut: 0.5
  }
];

const outputResolutions = [
  '1080p (1920x1080)', '720p (1280x720)', '4K (3840x2160)', 'Instagram Story (1080x1920)', 'YouTube Short (1080x1920)', 'Custom'
];

const videoCodecs = [
  'H.264', 'H.265', 'VP9', 'AV1', 'MPEG-4', 'ProRes', 'DNxHD'
];

const audioCodecs = [
  'AAC', 'MP3', 'WAV', 'FLAC', 'Opus', 'AC3', 'PCM'
];

const qualityOptions = [
  'Low', 'Medium', 'High', 'Very High', 'Lossless'
];

const formatOptions = [
  'MP4', 'MOV', 'MKV', 'AVI', 'WebM', 'GIF', 'MP3', 'WAV'
];

const transitionOptions = [
  'None', 'Fade', 'Crossfade', 'Slide', 'Zoom', 'Blur', 'Wipe', 'Glitch'
];

export default function AudioVideoMixingPage() {
  const [mixTracks, setMixTracks] = useState<AudioVideoTrack[]>(tracks);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [settings, setSettings] = useState<MixSettings>({
    outputResolution: '1080p (1920x1080)',
    frameRate: 30,
    videoCodec: 'H.264',
    audioCodec: 'AAC',
    bitrate: 8000,
    quality: 'High',
    format: 'MP4',
    transition: 'Fade',
    crossfade: 1
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showWaveforms, setShowWaveforms] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const selectedTrackData = mixTracks.find(t => t.id === selectedTrack);

  const handleAddTrack = (type: AudioVideoTrack['type']) => {
    const newTrack: AudioVideoTrack = {
      id: Date.now().toString(),
      name: `New ${type}`,
      type,
      url: '',
      startTime: 0,
      duration: 0,
      volume: type === 'video' ? 100 : type === 'narration' ? 90 : 70,
      muted: false,
      visible: true,
      layer: mixTracks.length + 1,
      offset: 0,
      fadeIn: 1,
      fadeOut: 1
    };
    setMixTracks([...mixTracks, newTrack]);
    setSelectedTrack(newTrack.id);
  };

  const handleDeleteTrack = (id: string) => {
    setMixTracks(mixTracks.filter(t => t.id !== id));
    if (selectedTrack === id) {
      setSelectedTrack(null);
    }
  };

  const updateTrack = (id: string, updates: Partial<AudioVideoTrack>) => {
    setMixTracks(mixTracks.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const updateSetting = (key: keyof MixSettings, value: string | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePlay = async () => {
    setIsPlaying(true);
    // Simulate playback
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setCurrentTime(elapsed % 180); // Assuming 3min max duration
      
      if (elapsed >= 180) {
        clearInterval(interval);
        setIsPlaying(false);
        setCurrentTime(0);
      }
    }, 100);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const getTrackIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <span className="h-4 w-4" />;
      case 'narration': return <Waves className="h-4 w-4" />;
      case 'music': return <span className="h-4 w-4" />;
        case 'sfx': return <span className="h-4 w-4" />;
      default: return <span className="h-4 w-4" />;
    }
  };

  const getTrackColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-500/10 text-blue-500';
      case 'audio': return 'bg-green-500/10 text-green-500';
      case 'narration': return 'bg-purple-500/10 text-purple-500';
      case 'music': return 'bg-orange-500/10 text-orange-500';
      case 'sfx': return 'bg-red-500/10 text-red-500';
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
          <h1 className="text-3xl font-bold text-foreground">Audio-Video Mixing</h1>
          <p className="text-muted-foreground">
            Final mixing and synchronization of audio and video tracks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowWaveforms(!showWaveforms)}>
            {showWaveforms ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            Waveforms
          </Button>
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button 
            onClick={isPlaying ? handleStop : handlePlay} 
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Timeline Tracks */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Timeline Tracks</CardTitle>
            <CardDescription>
              Manage your audio and video tracks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="flex-col h-16"
                onClick={() => handleAddTrack('video')}
              >
                <Video className="h-5 w-5 mb-1" />
                <span className="text-xs">Video</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-col h-16"
                onClick={() => handleAddTrack('narration')}
              >
                <Waves className="h-5 w-5 mb-1" />
                <span className="text-xs">Narration</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-col h-16"
                onClick={() => handleAddTrack('music')}
              >
                <span className="h-5 w-5 mb-1" />
                <span className="text-xs">Music</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-col h-16"
                onClick={() => handleAddTrack('sfx')}
              >
                <span className="h-5 w-5 mb-1" />
                <span className="text-xs">SFX</span>
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <Label>View Mode</Label>
              <div className="flex gap-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-3 w-3" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {mixTracks
                .sort((a, b) => a.layer - b.layer)
                .map((track) => (
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
                      <span>Start: {formatTime(track.startTime)}</span>
                      <span>{track.volume}% vol</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Duration: {formatTime(track.duration)}</span>
                      <span>Layer: {track.layer}</span>
                    </div>
                  </div>
                  
                  {!track.visible && (
                    <span className="mt-2 text-xs px-2 py-1 border rounded-full text-muted-foreground">
                      {track.duration}
                    </span>
                  )}
                  {track.muted && (
                    <span className="mt-2 text-xs border rounded px-2 py-1 text-muted-foreground">
                      {track.duration}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline Canvas */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>
              Current time: {formatTime(currentTime)} / {formatTime(180)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-96 bg-black rounded-lg border relative overflow-hidden">
              {/* Timeline ruler */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 border-b flex items-center px-4">
                <div className="text-xs text-white">
                  {formatTime(currentTime)}
                </div>
                <div className="absolute top-1/2 left-1/2 w-px h-4 bg-red-500 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2" />
                </div>
              </div>

              {/* Track lanes */}
              <div className="absolute top-8 left-0 right-0 bottom-0 overflow-y-auto">
                {mixTracks
                  .sort((a, b) => a.layer - b.layer)
                  .map((track) => (
                  <div
                    key={track.id}
                    className="h-12 border-b border-gray-700 flex items-center px-4 relative"
                    style={{ 
                      backgroundColor: selectedTrack === track.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                    }}
                  >
                    <div className="flex items-center gap-2 w-32">
                      <div className={getTrackColor(track.type)}>
                        {getTrackIcon(track.type)}
                      </div>
                      <span className="text-sm text-white truncate">{track.name}</span>
                    </div>

                    {/* Track content */}
                    <div className="flex-1 relative h-8">
                      <div
                        className="absolute h-6 rounded bg-blue-500 cursor-move flex items-center justify-center"
                        style={{
                          left: `${(track.startTime / 180) * 100}%`,
                          width: `${(track.duration / 180) * 100}%`,
                          minWidth: '20px',
                          opacity: track.visible ? 1 : 0.5
                        }}
                        onClick={() => setSelectedTrack(track.id)}
                      >
                        {showWaveforms && track.type !== 'video' && (
                          <div className="w-full h-2 flex items-center justify-center px-1">
                            <div className="w-full h-full flex items-end gap-px">
                              {[...Array(20)].map((_, i) => (
                                <div
                                  key={i}
                                  className="flex-1 bg-white/30 rounded-sm"
                                  style={{ 
                                    height: `${Math.random() * 80 + 20}%` 
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {track.type === 'video' && (
                          <div className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                            <Video className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Playhead */}
              <div
                className="absolute top-8 w-px h-full bg-red-500"
                style={{ left: `${(currentTime / 180) * 100}%` }}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2" />
              </div>
            </div>

            {/* Timeline controls */}
            <div className="flex items-center gap-4 mt-4">
              <Button size="sm" onClick={handlePlay} disabled={isPlaying}>
                <Play className="h-3 w-3 mr-1" /> Play
              </Button>
              <Button size="sm" onClick={handleStop} disabled={!isPlaying}>
                <Pause className="h-3 w-3 mr-1" /> Stop
              </Button>
              <div className="flex-1">
                <Slider
                  value={[currentTime]}
                  onValueChange={([value]) => setCurrentTime(value)}
                  min={0}
                  max={180}
                  step={1}
                />
              </div>
              <span className="text-sm text-muted-foreground">
                {formatTime(currentTime)} / {formatTime(180)}
              </span>
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
          <CardContent className="space-y-4">
            {selectedTrackData ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Time (seconds)</Label>
                    <Input
                      type="number"
                      value={selectedTrackData.startTime}
                      onChange={(e) => updateTrack(selectedTrackData.id, { startTime: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Duration (seconds)</Label>
                    <Input
                      type="number"
                      value={selectedTrackData.duration}
                      onChange={(e) => updateTrack(selectedTrackData.id, { duration: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                  <div>
                    <Label>Layer: {selectedTrackData.layer}</Label>
                    <Input
                      type="number"
                      value={selectedTrackData.layer}
                      onChange={(e) => updateTrack(selectedTrackData.id, { layer: parseInt(e.target.value) })}
                      min={1}
                      max={10}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Fade In: {selectedTrackData.fadeIn}s</Label>
                    <Slider
                      value={[selectedTrackData.fadeIn]}
                      onValueChange={([value]) => updateTrack(selectedTrackData.id, { fadeIn: value })}
                      min={0}
                      max={10}
                      step={0.1}
                    />
                  </div>
                  <div>
                    <Label>Fade Out: {selectedTrackData.fadeOut}s</Label>
                    <Slider
                      value={[selectedTrackData.fadeOut]}
                      onValueChange={([value]) => updateTrack(selectedTrackData.id, { fadeOut: value })}
                      min={0}
                      max={10}
                      step={0.1}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor={`visible-${selectedTrackData.id}`}>Visible</Label>
                  <Switch
                    id={`visible-${selectedTrackData.id}`}
                    checked={selectedTrackData.visible}
                    onCheckedChange={(checked) => updateTrack(selectedTrackData.id, { visible: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor={`muted-${selectedTrackData.id}`}>Muted</Label>
                  <Switch
                    id={`muted-${selectedTrackData.id}`}
                    checked={selectedTrackData.muted}
                    onCheckedChange={(checked) => updateTrack(selectedTrackData.id, { muted: checked })}
                  />
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <span className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a track to edit</p>
                <p className="text-sm">Choose from the timeline or add a new track</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Export Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Export Settings</CardTitle>
            <CardDescription>
              Configure output format and quality settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Output Resolution</Label>
                <Select 
                  value={settings.outputResolution} 
                  onValueChange={(value) => updateSetting('outputResolution', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    {outputResolutions.map(res => (
                      <SelectItem key={res} value={res}>
                        {res}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Frame Rate: {settings.frameRate} FPS</Label>
                <Slider
                  value={[settings.frameRate]}
                  onValueChange={([value]) => updateSetting('frameRate', value)}
                  min={1}
                  max={60}
                  step={1}
                />
              </div>

              <div>
                <Label>Video Codec</Label>
                <Select 
                  value={settings.videoCodec} 
                  onValueChange={(value) => updateSetting('videoCodec', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select codec" />
                  </SelectTrigger>
                  <SelectContent>
                    {videoCodecs.map(codec => (
                      <SelectItem key={codec} value={codec}>
                        {codec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Audio Codec</Label>
                <Select 
                  value={settings.audioCodec} 
                  onValueChange={(value) => updateSetting('audioCodec', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select codec" />
                  </SelectTrigger>
                  <SelectContent>
                    {audioCodecs.map(codec => (
                      <SelectItem key={codec} value={codec}>
                        {codec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Bitrate: {settings.bitrate} kbps</Label>
                <Slider
                  value={[settings.bitrate]}
                  onValueChange={([value]) => updateSetting('bitrate', value)}
                  min={1000}
                  max={20000}
                  step={1000}
                />
              </div>

              <div>
                <Label>Quality</Label>
                <Select 
                  value={settings.quality} 
                  onValueChange={(value) => updateSetting('quality', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualityOptions.map(quality => (
                      <SelectItem key={quality} value={quality}>
                        {quality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Output Format</Label>
                <Select 
                  value={settings.format} 
                  onValueChange={(value) => updateSetting('format', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {formatOptions.map(format => (
                      <SelectItem key={format} value={format}>
                        {format}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Transition</Label>
                <Select 
                  value={settings.transition} 
                  onValueChange={(value) => updateSetting('transition', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transition" />
                  </SelectTrigger>
                  <SelectContent>
                    {transitionOptions.map(transition => (
                      <SelectItem key={transition} value={transition}>
                        {transition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {settings.transition !== 'None' && (
                <div>
                  <Label>Crossfade: {settings.crossfade}s</Label>
                  <Slider
                    value={[settings.crossfade]}
                    onValueChange={([value]) => updateSetting('crossfade', value)}
                    min={0}
                    max={5}
                    step={0.1}
                  />
                </div>
              )}
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <div className="text-sm text-primary">
                <div className="font-medium mb-2">Export Summary</div>
                <div className="space-y-1">
                  <div>Format: {settings.format} • {settings.outputResolution}</div>
                  <div>Video: {settings.videoCodec} • {settings.frameRate} FPS</div>
                  <div>Audio: {settings.audioCodec} • {settings.bitrate} kbps</div>
                  <div>Quality: {settings.quality}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}