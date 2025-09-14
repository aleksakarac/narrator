import { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw,
  Download,
  Share,
  Save,
  Volume2,
  Image,
  Music,
  Video,
  CheckCircle,
  Upload,
  FolderOpen,
  Scissors,
  Mic,
  Palette,
  Sliders,
  FileOutput
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { RightSidebar } from '../components/RightSidebar';



export default ManualMode;







function ManualMode() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([1]));

  const steps = [
    { 
      id: 1, 
      name: 'Choose Content Source', 
      completed: true,
      icon: <FolderOpen className="w-5 h-5" />,
      description: 'Select your content source file or URL'
    },
    { 
      id: 2, 
      name: 'Text Cleaning And Segmentation', 
      completed: false,
      icon: <Scissors className="w-5 h-5" />,
      description: 'Clean and segment your text content'
    },
    { 
      id: 3, 
      name: 'Voice & Text-to-speech Settings', 
      completed: false,
      icon: <Mic className="w-5 h-5" />,
      description: 'Configure voice and TTS settings'
    },
    { 
      id: 4, 
      name: 'Background Audio & Music', 
      completed: false,
      icon: <Music className="w-5 h-5" />,
      description: 'Add background music and audio effects'
    },
    { 
      id: 5, 
      name: 'Visual Elements', 
      completed: false,
      icon: <Palette className="w-5 h-5" />,
      description: 'Customize visual style and elements'
    },
    { 
      id: 6, 
      name: 'Audio & Video & Mixing Settings', 
      completed: false,
      icon: <Sliders className="w-5 h-5" />,
      description: 'Configure audio/video mixing settings'
    },
    { 
      id: 7, 
      name: 'Output Configuration', 
      completed: false,
      icon: <FileOutput className="w-5 h-5" />,
      description: 'Set output format and quality settings'
    },
    { 
      id: 8, 
      name: 'Result', 
      completed: false,
      icon: <CheckCircle className="w-5 h-5" />,
      description: 'Review and export your final content'
    }
  ];

  const currentStepData = steps[currentStep - 1];
  const progress = (currentStep / steps.length) * 100;

  const handleStepComplete = (stepName: string) => {
    const stepIndex = steps.findIndex(step => step.name === stepName);
    if (stepIndex !== -1) {
      setCompletedSteps(prev => new Set([...prev, stepIndex + 1]));
      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Upload className="w-6 h-6 mb-2" />
                Upload File
                <span className="text-xs text-muted-foreground mt-1">.txt, .md</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <FolderOpen className="w-6 h-6 mb-2" />
                Import URL
                <span className="text-xs text-muted-foreground mt-1">Web content</span>
              </Button>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Recent Files</div>
              <div className="text-xs text-muted-foreground">No recent files</div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Remove punctuation</span>
                <Badge variant="secondary">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Fix grammar errors</span>
                <Badge variant="secondary">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Split into paragraphs</span>
                <Badge variant="outline">200 chars max</Badge>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Text Preview</div>
              <div className="text-xs text-muted-foreground">
                Upload content to see preview
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-3 text-center">
                <div className="text-lg font-medium">Wavenet A</div>
                <div className="text-xs text-muted-foreground">US English</div>
              </div>
              <div className="bg-muted rounded-lg p-3 text-center opacity-50">
                <div className="text-lg font-medium">Wavenet B</div>
                <div className="text-xs text-muted-foreground">US English</div>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Voice Preview</div>
              <div className="text-xs text-muted-foreground">
                Select a voice to hear preview
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Music className="w-6 h-6 mb-2" />
                Add Music
                <span className="text-xs text-muted-foreground mt-1">MP3, WAV</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Volume2 className="w-6 h-6 mb-2" />
                Sound Effects
                <span className="text-xs text-muted-foreground mt-1">SFX library</span>
              </Button>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Audio Mix</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Voice</span>
                  <span>100%</span>
                </div>
                <Progress value={100} className="h-1" />
                <div className="flex justify-between text-xs">
                  <span>Music</span>
                  <span>50%</span>
                </div>
                <Progress value={50} className="h-1" />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Image className="w-6 h-6 mb-2" />
                Backgrounds
                <span className="text-xs text-muted-foreground mt-1">Images</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Video className="w-6 h-6 mb-2" />
                Video Backgrounds
                <span className="text-xs text-muted-foreground mt-1">MP4, WebM</span>
              </Button>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Theme Preview</div>
              <div className="text-xs text-muted-foreground">
                Dark theme with blue accent
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-3 text-center">
                <div className="text-lg font-medium">1080p</div>
                <div className="text-xs text-muted-foreground">HD Quality</div>
              </div>
              <div className="bg-muted rounded-lg p-3 text-center">
                <div className="text-lg font-medium">30 FPS</div>
                <div className="text-xs text-muted-foreground">Smooth</div>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Estimated Output</div>
              <div className="text-xs text-muted-foreground">
                Size: ~150MB | Duration: 5min
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-3 text-center">
                <div className="text-lg font-medium">MP4</div>
                <div className="text-xs text-muted-foreground">Video</div>
              </div>
              <div className="bg-muted rounded-lg p-3 text-center">
                <div className="text-lg font-medium">High</div>
                <div className="text-xs text-muted-foreground">Quality</div>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Export Settings</div>
              <div className="text-xs text-muted-foreground">
                Ready for export
              </div>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-4">
            <div className="bg-success/20 border border-success/30 rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
              <div className="text-lg font-medium mb-2">Processing Complete!</div>
              <div className="text-sm text-muted-foreground">
                Your content is ready for download
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
                Save
              </Button>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-muted rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-muted-foreground">
              Step content will be displayed here
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="flex-1 flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Progress Header */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  {currentStepData.icon}
                  <div>
                    <CardTitle className="text-xl font-semibold">Manual Mode</CardTitle>
                    <CardDescription>
                      {currentStepData.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Step {currentStep} of {steps.length}</span>
                    <span>{Math.round(progress)}% Complete</span>
                  </div>
                  
                  {/* Step Indicators */}
                  <div className="flex justify-between">
                    {steps.map((step) => (
                      <div
                        key={step.id}
                        className={`w-3 h-3 rounded-full ${
                          step.completed || completedSteps.has(step.id)
                            ? 'bg-primary'
                            : currentStep === step.id
                            ? 'bg-primary/50'
                            : 'bg-muted'
                        }`}
                        title={step.name}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Step Content */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary">Step {currentStep}</Badge>
                  {currentStepData.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getStepContent(currentStep)}
              </CardContent>
            </Card>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
              >
                <SkipBack className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button 
                  variant={isPlaying ? "secondary" : "default"}
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
              
              <Button 
                onClick={() => {
                  if (currentStep < steps.length) {
                    setCurrentStep(prev => prev + 1);
                  }
                }}
                disabled={currentStep === steps.length}
              >
                Next
                <SkipForward className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <RightSidebar 
          currentStep={currentStepData.name}
          onStepComplete={handleStepComplete}
        />
      </div>
    </div>
  );
}
