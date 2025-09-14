import { useState } from 'react';
import { 
  Upload, 
  Play, 
  Pause,
  RotateCcw,
  Save,
  Image as ImageIcon,
  Video,
  Sparkles,
  Type,
  Palette,
  Monitor,
  Settings
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function VisualElementsPage() {
  const [activeTab, setActiveTab] = useState('image');
  const [selectedBackground, setSelectedBackground] = useState('');
  const [animationStyle, setAnimationStyle] = useState('');
  const [showCaptions, setShowCaptions] = useState(false);
  const [enableTitleScreen, setEnableTitleScreen] = useState(false);
  const [enableEndingScreen, setEnableEndingScreen] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [fontStyle, setFontStyle] = useState('');
  const [fontColor, setFontColor] = useState('#ffffff');
  const [themeStyle, setThemeStyle] = useState('');
  const [opacity, setOpacity] = useState([80]);
  const [transitionSpeed, setTransitionSpeed] = useState([1.0]);
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  const stockImages = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NTc3NTk0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Abstract Gradient',
      category: 'Abstract'
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1749350144286-6881c1d8de9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbmF0dXJlJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NzgxNTExM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Minimalist Nature',
      category: 'Nature'
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1676496220000-e2b2b09a906f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZWxlZ2FudCUyMHRleHR1cmV8ZW58MXx8fHwxNzU3ODE1MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Dark Elegant',
      category: 'Texture'
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1636260794335-e4ea0cf82cd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBib2tlaCUyMGxpZ2h0c3xlbnwxfHx8fDE3NTc4MTUxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Cinematic Bokeh',
      category: 'Cinematic'
    }
  ];

  const videoBackgrounds = [
    { id: '1', name: 'Subtle Particles', duration: '0:30', thumbnail: '/api/placeholder/200/120' },
    { id: '2', name: 'Floating Bubbles', duration: '1:00', thumbnail: '/api/placeholder/200/120' },
    { id: '3', name: 'Soft Waves', duration: '0:45', thumbnail: '/api/placeholder/200/120' },
    { id: '4', name: 'Abstract Flow', duration: '0:30', thumbnail: '/api/placeholder/200/120' }
  ];

  const animationStyles = [
    'Gradient Flow',
    'Particle Effect',
    'Abstract Motion',
    'Geometric Patterns',
    'Liquid Motion',
    'Light Rays'
  ];

  const fontStyles = [
    'Arial',
    'Georgia',
    'Times New Roman',
    'Helvetica',
    'Open Sans',
    'Lato',
    'Roboto',
    'Montserrat'
  ];

  const themeStyles = [
    'Minimal',
    'Classic',
    'Modern',
    'Elegant',
    'Bold',
    'Custom'
  ];

  const handlePlayPreview = () => {
    setIsPreviewPlaying(!isPreviewPlaying);
    if (!isPreviewPlaying) {
      setTimeout(() => setIsPreviewPlaying(false), 8000);
    }
  };

  const resetToDefaults = () => {
    setActiveTab('image');
    setSelectedBackground('');
    setAnimationStyle('');
    setShowCaptions(false);
    setEnableTitleScreen(false);
    setEnableEndingScreen(false);
    setTitle('');
    setSubtitle('');
    setFontStyle('');
    setFontColor('#ffffff');
    setThemeStyle('');
    setOpacity([80]);
    setTransitionSpeed([1.0]);
    setEnableAnimations(true);
  };

  return (
    <div className="flex-1 bg-background p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-medium text-foreground">Visual Elements</h1>
          <p className="text-muted-foreground">Choose image, video, or animation backgrounds, and configure visual styles.</p>
        </div>

        {/* Background Type Selector */}
        <Card className="bg-card border-border p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-input-background">
              <TabsTrigger 
                value="image" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <ImageIcon className="w-4 h-4" />
                Image Background
              </TabsTrigger>
              <TabsTrigger 
                value="video" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Video className="w-4 h-4" />
                Video Background
              </TabsTrigger>
              <TabsTrigger 
                value="animated" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Sparkles className="w-4 h-4" />
                Animated Background
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="image" className="space-y-6">
                <div className="space-y-4">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </Button>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stockImages.map((image) => (
                      <div 
                        key={image.id}
                        className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                          selectedBackground === image.id 
                            ? 'border-primary' 
                            : 'border-border hover:border-border/60'
                        }`}
                        onClick={() => setSelectedBackground(image.id)}
                      >
                        <ImageWithFallback
                          src={image.url}
                          alt={image.name}
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-sm font-medium">{image.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="video" className="space-y-6">
                <div className="space-y-4">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Video
                  </Button>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {videoBackgrounds.map((video) => (
                      <div 
                        key={video.id}
                        className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                          selectedBackground === video.id 
                            ? 'border-primary' 
                            : 'border-border hover:border-border/60'
                        }`}
                        onClick={() => setSelectedBackground(video.id)}
                      >
                        <div className="w-full h-24 bg-input-background flex items-center justify-center">
                          <Video className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2">
                          <div className="text-xs font-medium">{video.name}</div>
                          <div className="text-xs text-muted-foreground">{video.duration}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="animated" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-card-foreground">Choose Animation Style</label>
                    <Select value={animationStyle} onValueChange={setAnimationStyle}>
                      <SelectTrigger className="bg-input-background border-border text-foreground max-w-xs">
                        <SelectValue placeholder="Select animation style" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {animationStyles.map((style) => (
                          <SelectItem key={style} value={style} className="text-popover-foreground focus:bg-accent">
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {animationStyles.map((style, index) => (
                      <div 
                        key={style}
                        className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                          animationStyle === style 
                            ? 'border-primary' 
                            : 'border-border hover:border-border/60'
                        }`}
                        onClick={() => setAnimationStyle(style)}
                      >
                        <div className="w-full h-20 bg-gradient-to-br from-primary/30 to-chart-2/30 flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-primary" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2">
                          <div className="text-xs font-medium">{style}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </Card>

        {/* Overlay Controls */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground mb-4">Overlay Controls</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Type className="w-5 h-5 text-card-foreground" />
                  <label className="text-sm font-medium text-card-foreground">Show Captions / Subtitles</label>
                </div>
                <Switch 
                  checked={showCaptions} 
                  onCheckedChange={setShowCaptions}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-card-foreground" />
                  <label className="text-sm font-medium text-card-foreground">Enable Title Screen</label>
                </div>
                <Switch 
                  checked={enableTitleScreen} 
                  onCheckedChange={setEnableTitleScreen}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-card-foreground" />
                  <label className="text-sm font-medium text-card-foreground">Enable Ending Screen</label>
                </div>
                <Switch 
                  checked={enableEndingScreen} 
                  onCheckedChange={setEnableEndingScreen}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>

            {(enableTitleScreen || enableEndingScreen) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-input-background border-border text-foreground"
                    placeholder="Enter title text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Subtitle</label>
                  <Input
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="bg-input-background border-border text-foreground"
                    placeholder="Enter subtitle text"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Font Style</label>
                <Select value={fontStyle} onValueChange={setFontStyle}>
                  <SelectTrigger className="bg-input-background border-border text-foreground">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {fontStyles.map((font) => (
                      <SelectItem key={font} value={font} className="text-popover-foreground focus:bg-accent">
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Font Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                    className="w-12 h-10 rounded border border-border bg-input-background cursor-pointer"
                  />
                  <Input
                    value={fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                    className="bg-input-background border-border text-foreground flex-1"
                    placeholder="#ffffff"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Visual Style Settings */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground mb-4">Visual Style Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Theme Style</label>
                <Select value={themeStyle} onValueChange={setThemeStyle}>
                  <SelectTrigger className="bg-input-background border-border text-foreground">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {themeStyles.map((theme) => (
                      <SelectItem key={theme} value={theme} className="text-popover-foreground focus:bg-accent">
                        {theme}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-card-foreground">Opacity</label>
                  <span className="text-sm text-muted-foreground">{opacity[0]}%</span>
                </div>
                <Slider
                  value={opacity}
                  onValueChange={setOpacity}
                  min={0}
                  max={100}
                  step={5}
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
                  min={0.5}
                  max={3.0}
                  step={0.1}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Slow</span>
                  <span>Fast</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-card-foreground" />
                  <label className="text-sm font-medium text-card-foreground">Enable Animations</label>
                </div>
                <Switch 
                  checked={enableAnimations} 
                  onCheckedChange={setEnableAnimations}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Preview Section */}
        <Card className="bg-card border-border p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-card-foreground mb-4">Preview</h2>
            
            <div className="relative bg-input-background border border-border rounded-lg aspect-video flex items-center justify-center overflow-hidden">
              {selectedBackground && activeTab === 'image' && (
                <ImageWithFallback
                  src={stockImages.find(img => img.id === selectedBackground)?.url || ''}
                  alt="Background preview"
                  className="w-full h-full object-cover"
                />
              )}
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  {!isPreviewPlaying ? (
                    <>
                      <div className="text-muted-foreground text-sm mb-4">Preview narration with visual elements</div>
                      <Button 
                        onClick={handlePlayPreview}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Play Preview
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="text-white text-lg mb-2">{title || 'Sample Title'}</div>
                      <div className="text-white/80 text-sm mb-4">{subtitle || 'Sample subtitle text'}</div>
                      <Button 
                        onClick={() => setIsPreviewPlaying(false)}
                        className="bg-card/80 hover:bg-muted/40 text-card-foreground flex items-center gap-2"
                      >
                        <Pause className="w-4 h-4" />
                        Pause Preview
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {showCaptions && isPreviewPlaying && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white p-3 rounded text-center">
                  <div className="text-sm">Sample narration caption text appears here...</div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Button 
            onClick={resetToDefaults}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
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