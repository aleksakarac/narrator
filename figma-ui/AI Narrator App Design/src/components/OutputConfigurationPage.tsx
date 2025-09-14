import { useState } from 'react';
import { 
  Download,
  Save,
  RotateCcw,
  FolderOpen,
  FileVideo,
  FileAudio,
  FileText,
  Settings,
  Zap,
  Play,
  HardDrive,
  Info
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function OutputConfigurationPage() {
  const [outputType, setOutputType] = useState('');
  const [videoCodec, setVideoCodec] = useState('H.264');
  const [audioCodec, setAudioCodec] = useState('AAC');
  const [resolution, setResolution] = useState('1080p');
  const [frameRate, setFrameRate] = useState('30');
  const [quality, setQuality] = useState([75]);
  const [hardwareAcceleration, setHardwareAcceleration] = useState(true);
  const [saveLocation, setSaveLocation] = useState('');
  const [overwriteExisting, setOverwriteExisting] = useState(false);
  const [separateTracks, setSeparateTracks] = useState(false);
  const [generateSubtitles, setGenerateSubtitles] = useState(true);
  const [batchExport, setBatchExport] = useState(false);
  const [exportPreset, setExportPreset] = useState('Custom');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const outputTypes = [
    { value: 'video-mp4', label: 'Video (MP4)', icon: <FileVideo className="w-4 h-4" /> },
    { value: 'video-mkv', label: 'Video (MKV)', icon: <FileVideo className="w-4 h-4" /> },
    { value: 'audio-mp3', label: 'Audio Only (MP3)', icon: <FileAudio className="w-4 h-4" /> },
    { value: 'audio-wav', label: 'Audio Only (WAV)', icon: <FileAudio className="w-4 h-4" /> },
    { value: 'audio-flac', label: 'Audio Only (FLAC)', icon: <FileAudio className="w-4 h-4" /> },
    { value: 'text-txt', label: 'Text Transcript (TXT)', icon: <FileText className="w-4 h-4" /> },
    { value: 'text-srt', label: 'Text Transcript (SRT)', icon: <FileText className="w-4 h-4" /> }
  ];

  const videoCodecs = ['H.264', 'H.265', 'VP9', 'AV1'];
  const audioCodecs = ['AAC', 'MP3', 'WAV', 'FLAC'];
  const resolutions = ['720p', '1080p', '4K'];
  const frameRates = ['24', '30', '60'];
  const exportPresets = ['YouTube', 'Instagram', 'Podcast', 'Custom'];

  const getQualityLabel = (value: number) => {
    if (value < 33) return 'Low';
    if (value < 66) return 'Medium';
    return 'High';
  };

  const getEstimatedFileSize = () => {
    const baseSize = outputType.includes('video') ? 150 : 5; // MB for 5 minutes
    const qualityMultiplier = quality[0] / 50;
    const resolutionMultiplier = resolution === '4K' ? 4 : resolution === '1080p' ? 1.5 : 1;
    return Math.round(baseSize * qualityMultiplier * resolutionMultiplier);
  };

  const resetToDefaults = () => {
    setOutputType('');
    setVideoCodec('H.264');
    setAudioCodec('AAC');
    setResolution('1080p');
    setFrameRate('30');
    setQuality([75]);
    setHardwareAcceleration(true);
    setSaveLocation('');
    setOverwriteExisting(false);
    setSeparateTracks(false);
    setGenerateSubtitles(true);
    setBatchExport(false);
    setExportPreset('Custom');
  };

  const handleBrowseFolder = () => {
    // In a real app, this would open a file dialog
    setSaveLocation('/Users/username/Documents/AI Narrator Exports');
  };

  const isVideoOutput = outputType.includes('video');
  const isAudioOutput = outputType.includes('audio');
  const isTextOutput = outputType.includes('text');

  return (
    <div className="flex-1 bg-background p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-medium text-foreground">Output Configuration</h1>
          <p className="text-muted-foreground">Choose file format, quality, and export options for the final output.</p>
        </div>

        {/* File Format Settings */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground mb-4">File Format Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Output Type</label>
                <Select value={outputType} onValueChange={setOutputType}>
                  <SelectTrigger className="bg-input-background border-border text-foreground">
                    <SelectValue placeholder="Select output type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {outputTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="text-popover-foreground focus:bg-accent">
                        <div className="flex items-center gap-2">
                          {type.icon}
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {isVideoOutput && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Video Codec</label>
                  <Select value={videoCodec} onValueChange={setVideoCodec}>
                    <SelectTrigger className="bg-input-background border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {videoCodecs.map((codec) => (
                        <SelectItem key={codec} value={codec} className="text-popover-foreground focus:bg-accent">
                          <div className="flex items-center gap-2">
                            {codec}
                            {codec === 'H.265' && <Badge className="bg-primary text-primary-foreground text-xs">Better compression</Badge>}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {(isVideoOutput || isAudioOutput) && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Audio Codec</label>
                  <Select value={audioCodec} onValueChange={setAudioCodec}>
                    <SelectTrigger className="bg-input-background border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {audioCodecs.map((codec) => (
                        <SelectItem key={codec} value={codec} className="text-popover-foreground focus:bg-accent">
                          <div className="flex items-center gap-2">
                            {codec}
                            {codec === 'FLAC' && <Badge className="bg-chart-2 text-primary-foreground text-xs">Lossless</Badge>}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Quality & Performance Settings */}
        {(isVideoOutput || isAudioOutput) && (
          <Card className="bg-card border-border p-6">
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-card-foreground mb-4">Quality & Performance Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isVideoOutput && (
                  <>
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
                  </>
                )}

                <div className="space-y-4 md:col-span-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-card-foreground">Bitrate / Quality</label>
                    <span className="text-sm text-primary">{getQualityLabel(quality[0])}</span>
                  </div>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    min={1}
                    max={100}
                    step={1}
                    className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hardware-acceleration" 
                    checked={hardwareAcceleration}
                    onCheckedChange={setHardwareAcceleration}
                  />
                  <label htmlFor="hardware-acceleration" className="text-sm text-card-foreground flex items-center gap-2">
                    <Zap className="w-4 h-4 text-chart-4" />
                    Enable Hardware Acceleration
                  </label>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Export Options */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground mb-4">Export Options</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Save To...</label>
                <div className="flex gap-2">
                  <Input
                    value={saveLocation}
                    onChange={(e) => setSaveLocation(e.target.value)}
                    className="bg-input-background border-border text-foreground flex-1"
                    placeholder="Choose export folder..."
                  />
                  <Button
                    onClick={handleBrowseFolder}
                    variant="outline"
                  >
                    <FolderOpen className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="overwrite" 
                    checked={overwriteExisting}
                    onCheckedChange={setOverwriteExisting}
                  />
                  <label htmlFor="overwrite" className="text-sm text-card-foreground">Overwrite Existing File</label>
                </div>

                {isVideoOutput && (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="separate-tracks" 
                      checked={separateTracks}
                      onCheckedChange={setSeparateTracks}
                    />
                    <label htmlFor="separate-tracks" className="text-sm text-card-foreground">Export Separate Audio and Video Tracks</label>
                  </div>
                )}

                {(isVideoOutput || isAudioOutput) && (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="subtitles" 
                      checked={generateSubtitles}
                      onCheckedChange={setGenerateSubtitles}
                    />
                    <label htmlFor="subtitles" className="text-sm text-card-foreground">Generate Subtitle File</label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Batch / Advanced Settings */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-card-foreground">Batch / Advanced Settings</h2>
              <Button
                onClick={() => setShowAdvanced(!showAdvanced)}
                variant="outline"
                size="sm"
              >
                <Settings className="w-4 h-4 mr-2" />
                {showAdvanced ? 'Hide' : 'Show'} Advanced
              </Button>
            </div>
            
            {showAdvanced && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="batch-export" 
                    checked={batchExport}
                    onCheckedChange={setBatchExport}
                  />
                  <label htmlFor="batch-export" className="text-sm text-card-foreground">Batch Export (multiple formats)</label>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Export Preset</label>
                  <Select value={exportPreset} onValueChange={setExportPreset}>
                    <SelectTrigger className="bg-input-background border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {exportPresets.map((preset) => (
                        <SelectItem key={preset} value={preset} className="text-popover-foreground focus:bg-accent">
                          {preset}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Preview & File Size Estimate */}
        {outputType && (
          <Card className="bg-card border-border p-6">
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-card-foreground mb-4">Preview & File Size Estimate</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-input-background border border-border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Info className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-card-foreground">Export Summary</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Format:</span>
                        <span className="text-card-foreground">{outputTypes.find(t => t.value === outputType)?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estimated Size:</span>
                        <span className="text-primary">~{getEstimatedFileSize()} MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="text-card-foreground">4:05</span>
                      </div>
                      {isVideoOutput && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Resolution:</span>
                          <span className="text-card-foreground">{resolution} @ {frameRate}fps</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Test Export (5 sec sample)
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex gap-3">
            <Button 
              onClick={resetToDefaults}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Defaults
            </Button>

            <Button 
              variant="outline"
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </Button>
          </div>
          
          <Button 
            disabled={!outputType || !saveLocation}
            className="flex items-center gap-2 bg-chart-3 hover:bg-chart-4 text-primary-foreground disabled:bg-muted disabled:text-muted-foreground"
          >
            <Download className="w-4 h-4" />
            Start Export
          </Button>
        </div>
      </div>
    </div>
  );
}