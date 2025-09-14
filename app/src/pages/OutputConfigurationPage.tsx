import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';

import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { 
  Settings,
  Download,
  FolderOpen,
  Monitor,
  Smartphone,
  Tablet,
  CheckCircle,
  Info,
  FileText,
  Video,
  Volume2
} from 'lucide-react';

function OutputConfigurationPage() {
  const [outputSettings, setOutputSettings] = useState({
    format: 'mp4',
    resolution: '1080p',
    frameRate: 30,
    bitrate: 8000,
    audioQuality: 'high',
    includeSubtitles: true,
    includeMetadata: true,
    outputPath: 'C:\\Users\\Documents\\Narrator\\Output',
    autoOpenFolder: true,
    compressionLevel: 5
  });

  const formats = [
    { id: 'mp4', name: 'MP4', description: 'Standard video format', icon: Video },
    { id: 'mov', name: 'MOV', description: 'Apple QuickTime format', icon: Video },
    { id: 'webm', name: 'WebM', description: 'Web-optimized format', icon: Video },
    { id: 'mp3', name: 'MP3', description: 'Audio only', icon: Volume2 },
    { id: 'wav', name: 'WAV', description: 'Lossless audio', icon: Volume2 }
  ];

  const resolutions = [
    { id: '720p', name: '720p HD', width: 1280, height: 720 },
    { id: '1080p', name: '1080p Full HD', width: 1920, height: 1080 },
    { id: '1440p', name: '1440p QHD', width: 2560, height: 1440 },
    { id: '2160p', name: '4K UHD', width: 3840, height: 2160 }
  ];

  const devices = [
    { id: 'desktop', name: 'Desktop', icon: Monitor, recommended: true },
    { id: 'mobile', name: 'Mobile', icon: Smartphone, recommended: false },
    { id: 'tablet', name: 'Tablet', icon: Tablet, recommended: false }
  ];

  const updateSetting = (key: string, value: any) => {
    setOutputSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const currentFormat = formats.find(f => f.id === outputSettings.format);
  const currentResolution = resolutions.find(r => r.id === outputSettings.resolution);

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Settings className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle className="text-2xl font-semibold">Output Configuration</CardTitle>
                  <CardDescription>
                    Configure output format, quality, and destination settings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Format Selection */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Output Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formats.map((format) => {
                  const Icon = format.icon;
                  return (
                    <Card
                      key={format.id}
                      className={`cursor-pointer transition-all ${
                        outputSettings.format === format.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => updateSetting('format', format.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className="w-5 h-5" />
                          <div className="font-medium">{format.name}</div>
                          {outputSettings.format === format.id && (
                            <Badge variant="secondary">Selected</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {format.description}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quality Settings */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Quality Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Resolution */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Resolution</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {resolutions.map((resolution) => (
                      <Button
                        key={resolution.id}
                        variant={outputSettings.resolution === resolution.id ? "default" : "outline"}
                        className="flex-col h-16"
                        onClick={() => updateSetting('resolution', resolution.id)}
                      >
                        <span className="font-medium">{resolution.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {resolution.width}x{resolution.height}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Frame Rate */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Frame Rate: {outputSettings.frameRate} FPS
                  </Label>
                  <Slider
                    value={[outputSettings.frameRate]}
                    onValueChange={([value]) => updateSetting('frameRate', value)}
                    min={24}
                    max={60}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>24 FPS (Cinematic)</span>
                    <span>60 FPS (Smooth)</span>
                  </div>
                </div>

                {/* Bitrate */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Bitrate: {outputSettings.bitrate} kbps
                  </Label>
                  <Slider
                    value={[outputSettings.bitrate]}
                    onValueChange={([value]) => updateSetting('bitrate', value)}
                    min={1000}
                    max={20000}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1000 kbps (Low)</span>
                    <span>20000 kbps (High)</span>
                  </div>
                </div>

                {/* Compression Level */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Compression Level: {outputSettings.compressionLevel}/10
                  </Label>
                  <Slider
                    value={[outputSettings.compressionLevel]}
                    onValueChange={([value]) => updateSetting('compressionLevel', value)}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1 (Fastest)</span>
                    <span>10 (Smallest)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Audio Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Audio Quality</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {['low', 'medium', 'high'].map((quality) => (
                      <Button
                        key={quality}
                        variant={outputSettings.audioQuality === quality ? "default" : "outline"}
                        className="capitalize"
                        onClick={() => updateSetting('audioQuality', quality)}
                      >
                        {quality}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={outputSettings.includeSubtitles}
                      onCheckedChange={(checked) => updateSetting('includeSubtitles', checked)}
                    />
                    <Label>Include Subtitles</Label>
                  </div>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={outputSettings.includeMetadata}
                      onCheckedChange={(checked) => updateSetting('includeMetadata', checked)}
                    />
                    <Label>Include Metadata</Label>
                  </div>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Output Destination */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                Output Destination
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Output Folder</Label>
                  <div className="flex gap-2">
                    <Input
                      value={outputSettings.outputPath}
                      onChange={(e) => updateSetting('outputPath', e.target.value)}
                      placeholder="C:\\path\\to\\output"
                      className="flex-1"
                    />
                    <Button variant="secondary">
                      <FolderOpen className="w-4 h-4 mr-2" />
                      Browse
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={outputSettings.autoOpenFolder}
                      onCheckedChange={(checked) => updateSetting('autoOpenFolder', checked)}
                    />
                    <Label>Open folder after completion</Label>
                  </div>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Device Optimization */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Device Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label className="text-sm font-medium mb-3 block">Optimize for</Label>
              <div className="grid grid-cols-3 gap-4">
                {devices.map((device) => {
                  const Icon = device.icon;
                  return (
                    <Card
                      key={device.id}
                      className={`cursor-pointer transition-all ${
                        device.recommended
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <CardContent className="p-4 text-center">
                        <Icon className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-medium">{device.name}</div>
                        {device.recommended && (
                          <Badge variant="default" className="mt-2">Recommended</Badge>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Summary and Actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Configuration Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium ml-2">{currentFormat?.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Resolution:</span>
                    <span className="font-medium ml-2">{currentResolution?.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Frame Rate:</span>
                    <span className="font-medium ml-2">{outputSettings.frameRate} FPS</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Bitrate:</span>
                    <span className="font-medium ml-2">{outputSettings.bitrate} kbps</span>
                  </div>
                </div>

                <div className="bg-success/20 border border-success/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="font-medium">Estimated Output Quality: Excellent</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Estimated file size: ~156MB for 10 minutes of content
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Save Configuration
                  </Button>
                  <Button variant="outline">Reset to Defaults</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OutputConfigurationPage;