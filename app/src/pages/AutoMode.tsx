import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { 
  Play, 
  Pause, 
  RotateCcw,
  Download,
  Share,
  Upload,
  FolderOpen,
  Zap,
  CheckCircle,
  Settings,
  Wand2,
  Save
} from 'lucide-react';

function AutoMode() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inputUrl, setInputUrl] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('standard');

  const presets = [
    {
      id: 'standard',
      name: 'Standard',
      description: 'Balanced quality and speed',
      quality: 'High',
      speed: 'Medium',
      size: 'Medium'
    },
    {
      id: 'fast',
      name: 'Fast',
      description: 'Quick processing with good quality',
      quality: 'Good',
      speed: 'Fast',
      size: 'Small'
    },
    {
      id: 'high-quality',
      name: 'High Quality',
      description: 'Best quality with slower processing',
      quality: 'Excellent',
      speed: 'Slow',
      size: 'Large'
    },
    {
      id: 'custom',
      name: 'Custom',
      description: 'Configure your own settings',
      quality: 'Custom',
      speed: 'Custom',
      size: 'Custom'
    }
  ];

  const startProcessing = () => {
    setIsProcessing(true);
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 100);
  };

  const currentPreset = presets.find(p => p.id === selectedPreset);

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle className="text-2xl font-semibold">Auto Mode</CardTitle>
                  <CardDescription>
                    Automated content processing with AI-powered optimization
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Input Section */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                Content Source
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Upload className="w-6 h-6 mb-2" />
                    Upload File
                    <span className="text-xs text-muted-foreground mt-1">.txt, .md, .docx</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <FolderOpen className="w-6 h-6 mb-2" />
                    Import Folder
                    <span className="text-xs text-muted-foreground mt-1">Batch processing</span>
                  </Button>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Or enter URL
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://example.com/article"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="secondary">Fetch</Button>
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-sm font-medium mb-2">Supported Sources</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Text files (.txt, .md, .docx)</div>
                    <div>• Web pages and articles</div>
                    <div>• RSS feeds</div>
                    <div>• YouTube transcripts</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preset Selection */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Processing Preset
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {presets.map((preset) => (
                  <Card
                    key={preset.id}
                    className={`cursor-pointer transition-all ${
                      selectedPreset === preset.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedPreset(preset.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="font-medium">{preset.name}</div>
                        {selectedPreset === preset.id && (
                          <Badge variant="secondary">Selected</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        {preset.description}
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Quality:</span>
                          <span className="font-medium">{preset.quality}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Speed:</span>
                          <span className="font-medium">{preset.speed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Size:</span>
                          <span className="font-medium">{preset.size}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {selectedPreset === 'custom' && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="text-sm font-medium mb-3">Custom Settings</div>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Voice Quality</Label>
                      <Progress value={75} className="h-1 mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Processing Speed</Label>
                      <Progress value={60} className="h-1 mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Output Size</Label>
                      <Progress value={40} className="h-1 mt-1" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Processing Controls */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Process Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isProcessing ? (
                  <>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Processing... {Math.round(progress)}%</span>
                      <span>{progress < 25 ? 'Analyzing' : progress < 50 ? 'Generating' : progress < 75 ? 'Rendering' : 'Finalizing'}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div className="text-center">
                        <div className="font-medium">Voice Synthesis</div>
                        <div className="text-muted-foreground">
                          {progress > 20 ? 'Complete' : 'In progress'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">Audio Mixing</div>
                        <div className="text-muted-foreground">
                          {progress > 50 ? 'Complete' : progress > 30 ? 'In progress' : 'Pending'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">Video Rendering</div>
                        <div className="text-muted-foreground">
                          {progress > 80 ? 'Complete' : progress > 60 ? 'In progress' : 'Pending'}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Zap className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Ready to process your content with {currentPreset?.name} preset
                    </p>
                  </div>
                )}
                
                <div className="flex justify-center gap-3">
                  <Button
                    variant={isProcessing ? "secondary" : "default"}
                    onClick={isProcessing ? () => setIsProcessing(false) : startProcessing}
                    disabled={!inputUrl && !isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Processing
                      </>
                    )}
                  </Button>
                  
                  <Button variant="outline" onClick={() => setProgress(0)}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Preview */}
          {progress === 100 && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  Processing Complete!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">24:15</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">156MB</div>
                      <div className="text-xs text-muted-foreground">File Size</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">1080p</div>
                      <div className="text-xs text-muted-foreground">Resolution</div>
                    </div>
                  </div>
                  
                  <div className="bg-success/20 border border-success/30 rounded-lg p-4">
                    <div className="text-sm font-medium mb-2">Quality Report</div>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span>Voice Clarity:</span>
                        <span className="font-medium">Excellent</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Audio Sync:</span>
                        <span className="font-medium">Perfect</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Visual Quality:</span>
                        <span className="font-medium">High</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button size="sm" className="flex-col h-14">
                      <Download className="w-4 h-4 mb-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="flex-col h-14">
                      <Share className="w-4 h-4 mb-1" />
                      Share
                    </Button>
                    <Button size="sm" variant="outline" className="flex-col h-14">
                      <Save className="w-4 h-4 mb-1" />
                      Save Project
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Label component for form elements
function Label({ children, className = '', ...props }: { children: React.ReactNode, className?: string }) {
  return (
    <label className={`text-sm font-medium leading-none ${className}`} {...props}>
      {children}
    </label>
  );
}

export default AutoMode;