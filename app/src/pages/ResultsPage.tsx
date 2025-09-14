import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  CheckCircle,
  AlertCircle,
  Clock,
  Play,
  Pause,
  Download,
  Share,
  Edit,
  Trash2,
  BarChart3,
  Eye,
  Volume2,
  FileText,
  Video,
  Calendar,
  Volume as VolumeIcon
} from 'lucide-react';

function ResultsPage() {
  const [selectedProject, setSelectedProject] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime] = useState(0);

  const projects = [
    {
      id: 1,
      title: 'Product Demo Video',
      description: 'Showcase of new product features',
      duration: '24:15',
      fileSize: '156MB',
      format: 'MP4',
      resolution: '1080p',
      status: 'completed',
      quality: 'excellent',
      createdAt: '2024-01-15',
      progress: 100,
      metrics: {
        voiceClarity: 95,
        audioSync: 98,
        visualQuality: 92,
        overall: 94
      },
      files: [
        { type: 'video', name: 'product_demo_final.mp4', size: '156MB' },
        { type: 'audio', name: 'product_demo_audio.mp3', size: '24MB' },
        { type: 'subtitle', name: 'product_demo_subtitles.srt', size: '0.2MB' }
      ]
    },
    {
      id: 2,
      title: 'Tutorial Series',
      description: 'Complete beginner tutorial series',
      duration: '1:32:45',
      fileSize: '1.2GB',
      format: 'MP4',
      resolution: '720p',
      status: 'processing',
      quality: 'good',
      createdAt: '2024-01-14',
      progress: 75,
      metrics: {
        voiceClarity: 88,
        audioSync: 92,
        visualQuality: 85,
        overall: 87
      },
      files: []
    },
    {
      id: 3,
      title: 'Documentary Narration',
      description: 'Historical documentary voiceover',
      duration: '45:30',
      fileSize: '420MB',
      format: 'MP4',
      resolution: '1080p',
      status: 'completed',
      quality: 'good',
      createdAt: '2024-01-13',
      progress: 100,
      metrics: {
        voiceClarity: 92,
        audioSync: 94,
        visualQuality: 89,
        overall: 91
      },
      files: [
        { type: 'video', name: 'documentary_final.mp4', size: '420MB' }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getQualityBadge = (quality: string) => {
    const variants = {
      excellent: 'default',
      good: 'secondary',
      fair: 'outline',
      poor: 'destructive'
    } as const;

    return (
      <Badge variant={variants[quality as keyof typeof variants] || 'outline'}>
        {quality}
      </Badge>
    );
  };

  const currentProject = projects[selectedProject];

  return (
    <div className="flex-1 flex bg-background">
      {/* Sidebar - Project List */}
      <div className="w-80 border-r border-border bg-muted/20">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="text-sm text-muted-foreground">
            {projects.length} projects total
          </p>
        </div>
        
        <div className="p-4 space-y-3">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`cursor-pointer transition-all ${
                selectedProject === index
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:bg-muted/50'
              }`}
              onClick={() => setSelectedProject(index)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(project.status)}
                    <span className="font-medium text-sm">{project.title}</span>
                  </div>
                  {getQualityBadge(project.quality)}
                </div>
                
                <div className="text-xs text-muted-foreground mb-3">
                  {project.description}
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span>{project.duration}</span>
                  <span>{project.fileSize}</span>
                </div>
                
                {project.status === 'processing' && (
                  <div className="mt-3">
                    <Progress value={project.progress} className="h-1" />
                    <div className="text-xs text-muted-foreground mt-1">
                      {project.progress}% complete
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                  <Calendar className="w-3 h-3" />
                  {project.createdAt}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content - Project Details */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Project Header */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-semibold">
                    {currentProject.title}
                  </CardTitle>
                  <CardDescription>
                    {currentProject.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(currentProject.status)}
                  {getQualityBadge(currentProject.quality)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-6 text-sm">
                <div>
                  <div className="text-muted-foreground">Duration</div>
                  <div className="font-medium">{currentProject.duration}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">File Size</div>
                  <div className="font-medium">{currentProject.fileSize}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Format</div>
                  <div className="font-medium">{currentProject.format}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Resolution</div>
                  <div className="font-medium">{currentProject.resolution}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Media Player */}
          {currentProject.status === 'completed' && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-4">
                  <div className="text-white text-center">
                    <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm opacity-70">Video Preview</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button
                    variant={isPlaying ? "secondary" : "default"}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </>
                    )}
                  </Button>
                  
                  <div className="flex-1">
                    <Progress value={(currentTime / 1455) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0:00</span>
                      <span>{currentProject.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    <Progress value={80} className="w-20 h-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quality Metrics */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Quality Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(currentProject.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-2xl font-bold text-primary">{value}%</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <Progress value={value} className="h-1 mt-2" />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-success/20 border border-success/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="font-medium">Overall Quality: Excellent</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  This project meets all quality standards for professional use.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Files */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Generated Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentProject.files.map((file, index) => {
                  const Icon = file.type === 'video' ? Video : file.type === 'audio' ? VolumeIcon : FileText;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">{file.name}</div>
                          <div className="text-xs text-muted-foreground">{file.size}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                
                {currentProject.files.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Files will be available after processing completes</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button className="flex-col h-14">
                  <Download className="w-4 h-4 mb-1" />
                  Download All
                </Button>
                <Button variant="outline" className="flex-col h-14">
                  <Share className="w-4 h-4 mb-1" />
                  Share
                </Button>
                <Button variant="outline" className="flex-col h-14">
                  <Edit className="w-4 h-4 mb-1" />
                  Edit Project
                </Button>
                <Button variant="destructive" className="flex-col h-14">
                  <Trash2 className="w-4 h-4 mb-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;