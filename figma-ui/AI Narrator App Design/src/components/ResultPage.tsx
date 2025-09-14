import { useState } from 'react';
import { 
  Play, 
  Pause,
  Square,
  FolderOpen,
  ExternalLink,
  Download,
  Copy,
  Share,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  RotateCcw,
  Flag,
  Clock,
  FileVideo,
  FileAudio,
  FileText,
  Monitor,
  Youtube,
  Cloud,
  Wifi,
  ChevronDown
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface LogEntry {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
}

interface ExportResult {
  fileName: string;
  fileType: 'video' | 'audio' | 'transcript';
  duration?: string;
  resolution?: string;
  frameRate?: string;
  fileSize: string;
  status: 'success' | 'warning' | 'error';
  filePath: string;
}

export function ResultPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration] = useState(245); // 4:05 minutes

  // Mock export result data
  const exportResult: ExportResult = {
    fileName: 'Chapter_01_Complete_Narration.mp4',
    fileType: 'video',
    duration: '4:05',
    resolution: '1920x1080',
    frameRate: '30 fps',
    fileSize: '142.7 MB',
    status: 'success',
    filePath: '/Users/username/Documents/AI Narrator Exports/Chapter_01_Complete_Narration.mp4'
  };

  // Mock log entries
  const [logEntries] = useState<LogEntry[]>([
    {
      id: '1',
      type: 'info',
      message: 'Export process started',
      timestamp: '14:32:15'
    },
    {
      id: '2',
      type: 'info',
      message: 'Processing narration track (85% voice, 45% music)',
      timestamp: '14:32:16'
    },
    {
      id: '3',
      type: 'info',
      message: 'Rendering visual elements with background images',
      timestamp: '14:32:28'
    },
    {
      id: '4',
      type: 'warning',
      message: 'Audio normalization applied - peak level was -2.1 dB',
      timestamp: '14:33:45'
    },
    {
      id: '5',
      type: 'info',
      message: 'Encoding video with H.264 codec',
      timestamp: '14:34:01'
    },
    {
      id: '6',
      type: 'success',
      message: 'Export completed successfully',
      timestamp: '14:35:22'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-chart-3 text-primary-foreground hover:bg-chart-3/80"><CheckCircle className="w-3 h-3 mr-1" />Success</Badge>;
      case 'warning':
        return <Badge className="bg-chart-4 text-primary-foreground hover:bg-chart-4/80"><AlertTriangle className="w-3 h-3 mr-1" />Warning</Badge>;
      case 'error':
        return <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/80"><XCircle className="w-3 h-3 mr-1" />Error</Badge>;
      default:
        return null;
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video': return <FileVideo className="w-5 h-5 text-primary" />;
      case 'audio': return <FileAudio className="w-5 h-5 text-chart-2" />;
      case 'transcript': return <FileText className="w-5 h-5 text-chart-3" />;
      default: return <FileVideo className="w-5 h-5 text-primary" />;
    }
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-chart-3" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-chart-4" />;
      case 'error': return <XCircle className="w-4 h-4 text-destructive" />;
      default: return <Flag className="w-4 h-4 text-primary" />;
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate playback
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            clearInterval(interval);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOpenFolder = () => {
    // In a real app, this would open the file explorer
    console.log('Opening folder:', exportResult.filePath);
  };

  const handleOpenInPlayer = () => {
    // In a real app, this would open the file in the default media player
    console.log('Opening in default player:', exportResult.filePath);
  };

  const handleDownload = () => {
    // In a real app, this would trigger a download
    console.log('Downloading file:', exportResult.fileName);
  };

  const handleCopyPath = async () => {
    try {
      await navigator.clipboard.writeText(exportResult.filePath);
      // Could show a toast notification here
    } catch (err) {
      console.error('Failed to copy path:', err);
    }
  };

  return (
    <div className="flex-1 bg-background p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-medium text-foreground">Result</h1>
          <p className="text-muted-foreground">Review the final output, play previews, and manage export files.</p>
        </div>

        {/* Export Summary */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-card-foreground">Export Summary</h2>
              {getStatusBadge(exportResult.status)}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getFileIcon(exportResult.fileType)}
                  <span className="text-sm font-medium text-card-foreground">File Name</span>
                </div>
                <p className="text-sm text-muted-foreground break-all">{exportResult.fileName}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-card-foreground">Duration</span>
                </div>
                <p className="text-sm text-muted-foreground">{exportResult.duration}</p>
              </div>

              {exportResult.fileType === 'video' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-card-foreground">Resolution</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{exportResult.resolution} @ {exportResult.frameRate}</p>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-card-foreground">File Size</span>
                </div>
                <p className="text-sm text-muted-foreground">{exportResult.fileSize}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Preview Section */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground">Preview</h2>
            
            <div className="relative bg-input-background border border-border rounded-lg aspect-video flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-muted-foreground text-sm mb-4">
                    {exportResult.fileType === 'video' ? 'Video Preview' : 
                     exportResult.fileType === 'audio' ? 'Audio Preview' : 'Text Preview'}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={handlePlayPause}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>

                    {isPlaying && (
                      <Button
                        onClick={handleStop}
                        size="sm"
                        variant="outline"
                      >
                        <Square className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {isPlaying && (
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

            <div className="flex gap-3">
              <Button
                onClick={handleOpenFolder}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FolderOpen className="w-4 h-4" />
                Open Containing Folder
              </Button>

              <Button
                onClick={handleOpenInPlayer}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Play in Default Player
              </Button>
            </div>
          </div>
        </Card>

        {/* Log & Notifications */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground">Export Log</h2>
            
            <ScrollArea className="h-64 w-full">
              <div className="space-y-2">
                {logEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start gap-3 p-3 bg-input-background border border-border rounded-lg"
                  >
                    {getLogIcon(entry.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-card-foreground">{entry.message}</p>
                        <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>

        {/* Download & Share Options */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground">Download & Share</h2>
            
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleDownload}
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download File
              </Button>

              <Button
                onClick={handleCopyPath}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy File Path
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Share className="w-4 h-4" />
                    Share to...
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover border-border">
                  <DropdownMenuItem className="text-popover-foreground focus:bg-accent">
                    <Youtube className="w-4 h-4 mr-2" />
                    YouTube
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-popover-foreground focus:bg-accent">
                    <Wifi className="w-4 h-4 mr-2" />
                    Local Network
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-popover-foreground focus:bg-accent">
                    <Cloud className="w-4 h-4 mr-2" />
                    Cloud Storage
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Output Configuration
          </Button>

          <div className="flex gap-3">
            <Button 
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Export Again
            </Button>
            
            <Button 
              className="flex items-center gap-2 bg-chart-3 hover:bg-chart-4 text-primary-foreground"
            >
              <CheckCircle className="w-4 h-4" />
              Finish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}