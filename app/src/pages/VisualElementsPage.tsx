import { useState, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { 
  Image, 
  Video, 
  Layout, 
  Eye, 
  EyeOff,
  Download,
  RotateCcw,
  Grid,
  List,
  Trash2,
  Crop
} from 'lucide-react';

interface VisualElement {
  id: string;
  type: 'image' | 'video' | 'text' | 'shape';
  name: string;
  url: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  opacity: number;
  visible: boolean;
  layer: number;
}

interface VisualSettings {
  backgroundColor: string;
  aspectRatio: string;
  resolution: string;
  frameRate: number;
  transitionStyle: string;
  animationPreset: string;
}

const visualElements: VisualElement[] = [
  {
    id: '1',
    type: 'image',
    name: 'Background.jpg',
    url: '/placeholder.jpg',
    position: { x: 0, y: 0 },
    size: { width: 1920, height: 1080 },
    opacity: 100,
    visible: true,
    layer: 1
  },
  {
    id: '2',
    type: 'text',
    name: 'Title Text',
    url: '',
    position: { x: 960, y: 200 },
    size: { width: 800, height: 100 },
    opacity: 100,
    visible: true,
    layer: 2
  },
  {
    id: '3',
    type: 'shape',
    name: 'Overlay Shape',
    url: '',
    position: { x: 400, y: 300 },
    size: { width: 600, height: 400 },
    opacity: 50,
    visible: true,
    layer: 3
  }
];

const aspectRatios = [
  '16:9', '9:16', '1:1', '4:3', '21:9', 'Custom'
];

const resolutions = [
  '1080p (1920x1080)', '720p (1280x720)', '4K (3840x2160)', 'Instagram Story (1080x1920)', 'YouTube Short (1080x1920)', 'Custom'
];

const transitionStyles = [
  'None', 'Fade', 'Slide', 'Zoom', 'Blur', 'Glitch', 'Morph', 'Wipe'
];

const animationPresets = [
  'None', 'Bounce', 'Fade In', 'Slide In', 'Zoom In', 'Rotate', 'Pulse', 'Typewriter'
];

export default function VisualElementsPage() {
  const [elements, setElements] = useState<VisualElement[]>(visualElements);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [settings, setSettings] = useState<VisualSettings>({
    backgroundColor: '#000000',
    aspectRatio: '16:9',
    resolution: '1080p (1920x1080)',
    frameRate: 30,
    transitionStyle: 'Fade',
    animationPreset: 'Fade In'
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showPreview, setShowPreview] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);

  const selectedElementData = elements.find(e => e.id === selectedElement);

  const handleAddElement = (type: VisualElement['type']) => {
    const newElement: VisualElement = {
      id: Date.now().toString(),
      type,
      name: `New ${type}`,
      url: type === 'text' ? '' : '/placeholder.jpg',
      position: { x: 100, y: 100 },
      size: { width: 200, height: type === 'text' ? 50 : 200 },
      opacity: 100,
      visible: true,
      layer: elements.length + 1
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
  };

  const handleDeleteElement = (id: string) => {
    setElements(elements.filter(e => e.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const updateElement = (id: string, updates: Partial<VisualElement>) => {
    setElements(elements.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const updateSetting = (key: keyof VisualSettings, value: string | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const getElementIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'text': return <Layout className="h-4 w-4" />;
      case 'shape': return <Crop className="h-4 w-4" />;
      default: return <Grid className="h-4 w-4" />;
    }
  };

  const getElementColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-blue-500/10 text-blue-500';
      case 'video': return 'bg-purple-500/10 text-purple-500';
      case 'text': return 'bg-green-500/10 text-green-500';
      case 'shape': return 'bg-orange-500/10 text-orange-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Visual Elements</h1>
          <p className="text-muted-foreground">
            Manage and configure visual assets for your narration
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Elements Library */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Elements Library</CardTitle>
            <CardDescription>
              Add and manage visual elements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="flex-col h-16"
                onClick={() => handleAddElement('image')}
              >
                <Image className="h-5 w-5 mb-1" />
                <span className="text-xs">Image</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-col h-16"
                onClick={() => handleAddElement('video')}
              >
                <Video className="h-5 w-5 mb-1" />
                <span className="text-xs">Video</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-col h-16"
                onClick={() => handleAddElement('text')}
              >
                <Layout className="h-5 w-5 mb-1" />
                <span className="text-xs">Text</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-col h-16"
                onClick={() => handleAddElement('shape')}
              >
                <Crop className="h-5 w-5 mb-1" />
                <span className="text-xs">Shape</span>
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
              {elements.map((element) => (
                <div
                  key={element.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedElement === element.id
                      ? 'bg-primary/10 border-primary'
                      : 'bg-muted/50 hover:bg-muted/80'
                  }`}
                  onClick={() => setSelectedElement(element.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={getElementColor(element.type)}>
                        {getElementIcon(element.type)}
                      </div>
                      <span className="text-sm font-medium">{element.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteElement(element.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  {element.type !== 'text' && (
                    <div className="text-xs text-muted-foreground mt-2">
                      {element.size.width}x{element.size.height}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Canvas Preview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Canvas Preview</CardTitle>
            <CardDescription>
              {selectedElement ? `Editing: ${selectedElementData?.name}` : 'Select an element to edit'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              ref={canvasRef}
              className="w-full aspect-video bg-black rounded-lg border relative overflow-hidden"
              style={{ backgroundColor: settings.backgroundColor }}
            >
              {elements
                .filter(e => e.visible)
                .sort((a, b) => a.layer - b.layer)
                .map((element) => (
                  <div
                    key={element.id}
                    className="absolute border-2 border-dashed border-transparent hover:border-primary transition-all"
                    style={{
                      left: `${element.position.x}px`,
                      top: `${element.position.y}px`,
                      width: `${element.size.width}px`,
                      height: `${element.size.height}px`,
                      opacity: element.opacity / 100,
                      zIndex: element.layer,
                      borderColor: selectedElement === element.id ? 'hsl(var(--primary))' : 'transparent'
                    }}
                    onClick={() => setSelectedElement(element.id)}
                  >
                    {element.type === 'image' && (
                      <img
                        src={element.url}
                        alt={element.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {element.type === 'text' && (
                      <div className="w-full h-full flex items-center justify-center bg-white/10">
                        <span className="text-white text-sm">Text Element</span>
                      </div>
                    )}
                    {element.type === 'shape' && (
                      <div className="w-full h-full bg-blue-500/50 flex items-center justify-center">
                        <span className="text-white text-sm">Shape</span>
                      </div>
                    )}
                  </div>
                ))}
              
              {!elements.length && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Image className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No visual elements added</p>
                    <p className="text-sm">Add elements from the library</p>
                  </div>
                </div>
              )}
            </div>

            {selectedElementData && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Position X</Label>
                    <Input
                      type="number"
                      value={selectedElementData.position.x}
                      onChange={(e) => updateElement(selectedElementData.id, {
                        position: { ...selectedElementData.position, x: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <Label>Position Y</Label>
                    <Input
                      type="number"
                      value={selectedElementData.position.y}
                      onChange={(e) => updateElement(selectedElementData.id, {
                        position: { ...selectedElementData.position, y: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Width</Label>
                    <Input
                      type="number"
                      value={selectedElementData.size.width}
                      onChange={(e) => updateElement(selectedElementData.id, {
                        size: { ...selectedElementData.size, width: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <Label>Height</Label>
                    <Input
                      type="number"
                      value={selectedElementData.size.height}
                      onChange={(e) => updateElement(selectedElementData.id, {
                        size: { ...selectedElementData.size, height: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Opacity: {selectedElementData.opacity}%</Label>
                  <Slider
                    value={[selectedElementData.opacity]}
                    onValueChange={([value]) => updateElement(selectedElementData.id, { opacity: value })}
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor={`visible-${selectedElementData.id}`}>Visible</Label>
                  <Switch
                    id={`visible-${selectedElementData.id}`}
                    checked={selectedElementData.visible}
                    onCheckedChange={(checked) => updateElement(selectedElementData.id, { visible: checked })}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Global Settings */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Global Settings</CardTitle>
            <CardDescription>
              Configure overall visual output settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Label>Background Color</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    type="color"
                    value={settings.backgroundColor}
                    onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input
                    value={settings.backgroundColor}
                    onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label>Aspect Ratio</Label>
                <Select 
                  value={settings.aspectRatio} 
                  onValueChange={(value) => updateSetting('aspectRatio', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select aspect ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    {aspectRatios.map(ratio => (
                      <SelectItem key={ratio} value={ratio}>
                        {ratio}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Resolution</Label>
                <Select 
                  value={settings.resolution} 
                  onValueChange={(value) => updateSetting('resolution', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    {resolutions.map(res => (
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
                <Label>Transition Style</Label>
                <Select 
                  value={settings.transitionStyle} 
                  onValueChange={(value) => updateSetting('transitionStyle', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transition" />
                  </SelectTrigger>
                  <SelectContent>
                    {transitionStyles.map(style => (
                      <SelectItem key={style} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Animation Preset</Label>
                <Select 
                  value={settings.animationPreset} 
                  onValueChange={(value) => updateSetting('animationPreset', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select animation" />
                  </SelectTrigger>
                  <SelectContent>
                    {animationPresets.map(preset => (
                      <SelectItem key={preset} value={preset}>
                        {preset}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}