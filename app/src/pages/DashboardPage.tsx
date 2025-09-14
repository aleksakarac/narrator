import { useState, useEffect, useRef } from 'react';
import {
  Search,
  Plus,
  Calendar,
  HelpCircle,
  Pause,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Activity,
  TrendingUp,
  TrendingDown,
  FolderOpen,
  Download,
  RotateCcw,
  Share,
  Copy,
  Settings,
  AlertCircle,
  Video,
  Upload,
  BarChart3,
  RefreshCw,
  Bell,
  BellOff,
  Server,
  Sparkles,
  Database,
  CloudUpload,
  ChevronDown,
  ChevronUp,
  Loader2,
  PlayCircle,
  StopCircle,
  SkipForward,
  Calendar as CalendarIcon,
  User,
  Star,
  ExternalLink,
  Import,
  X,
  Grid3X3,
  List,
  Monitor,
  Eye,
  Archive,
  Clock,
  Minus,
  Hash,
  Trash2,
  Tag,
  Timer
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Skeleton } from '../components/ui/skeleton';
import { Switch } from '../components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';

interface JobCard {
  id: string;
  title: string;
  type: 'Manual' | 'Auto';
  status: 'Running' | 'Queued' | 'Completed' | 'Failed' | 'Scheduled' | 'Paused' | 'Processing';
  progress?: number;
  stage?: string;
  eta?: string;
  createdAt: string;
  finishedAt?: string;
  duration?: string;
  owner?: string;
  priority?: 'Low' | 'Normal' | 'High' | 'Urgent';
  scheduledTime?: string;
  fileSize?: string;
  outputType?: string;
  resolution?: string;
  dependencies?: string[];
  tags?: string[];
  starred?: boolean;
  estimatedCost?: string;
  gpuUsage?: number;
  memoryUsage?: number;
}

interface KPICard {
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  sparkline: number[];
  isLoading?: boolean;
}

interface SystemMetric {
  name: string;
  value: number;
  max: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: number[];
}

interface Worker {
  id: string;
  name: string;
  status: 'Online' | 'Busy' | 'Idle' | 'Offline' | 'Maintenance';
  task: string | null;
  type: 'local' | 'remote' | 'cloud';
  performance: number;
  uptime: string;
  location?: string;
  version?: string;
}

interface Alert {
  id: number;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  time: string;
  jobId?: string;
  dismissed?: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
}

const mockJobs: JobCard[] = [
  {
    id: 'job_001',
    title: 'Gutenberg: Alice in Wonderland',
    type: 'Manual',
    status: 'Running',
    progress: 62,
    stage: 'Audio mixing and synchronization',
    eta: '18 min',
    createdAt: '2024-01-15 14:30',
    owner: 'Alice Johnson',
    priority: 'High',
    tags: ['Literature', 'Long-form'],
    starred: true,
    estimatedCost: '$2.45',
    gpuUsage: 78,
    memoryUsage: 85
  },
  {
    id: 'job_002', 
    title: 'Project Gutenberg: Pride and Prejudice',
    type: 'Auto',
    status: 'Processing',
    progress: 34,
    stage: 'Neural voice synthesis (Chapter 12/23)',
    eta: '45 min',
    createdAt: '2024-01-15 13:15',
    owner: 'Bob Smith',
    priority: 'Normal',
    tags: ['Classic', 'Romance'],
    estimatedCost: '$3.20',
    gpuUsage: 92,
    memoryUsage: 67
  },
  {
    id: 'job_003',
    title: 'Daily News Summary',
    type: 'Auto',
    status: 'Scheduled',
    scheduledTime: '22:00 Today',
    priority: 'High',
    createdAt: '2024-01-15 12:00',
    owner: 'System',
    tags: ['News', 'Daily'],
    estimatedCost: '$0.85'
  },
  {
    id: 'job_004',
    title: 'Educational: The Great Gatsby',
    type: 'Manual',
    status: 'Completed',
    createdAt: '2024-01-15 09:30',
    finishedAt: '2024-01-15 11:45',
    duration: '2h 15m',
    fileSize: '145 MB',
    outputType: 'MP4',
    resolution: '1080p',
    owner: 'Carol Davis',
    priority: 'Normal',
    tags: ['Education', 'Literature'],
    starred: false
  },
  {
    id: 'job_005',
    title: 'Podcast: Tech Weekly #34',
    type: 'Manual',
    status: 'Failed',
    createdAt: '2024-01-15 08:00',
    finishedAt: '2024-01-15 08:23',
    duration: '23m',
    owner: 'Dave Wilson',
    priority: 'Normal',
    tags: ['Podcast', 'Technology']
  },
  {
    id: 'job_006',
    title: 'Corporate Training Module 3',
    type: 'Auto',
    status: 'Queued',
    priority: 'Low',
    createdAt: '2024-01-15 16:22',
    owner: 'Training Bot',
    tags: ['Corporate', 'Training'],
    estimatedCost: '$1.65'
  }
];

const kpiData: KPICard[] = [
  {
    title: 'Active Jobs',
    value: 3,
    change: +1,
    trend: 'up',
    sparkline: [1, 1, 2, 1, 3, 2, 3],
    isLoading: false
  },
  {
    title: 'Queued / Scheduled',
    value: 8,
    change: +3,
    trend: 'up', 
    sparkline: [5, 6, 4, 8, 6, 7, 8],
    isLoading: false
  },
  {
    title: 'Completed (24h)',
    value: 24,
    change: -2,
    trend: 'down',
    sparkline: [26, 24, 28, 25, 26, 27, 24],
    isLoading: false
  },
  {
    title: 'Success Rate',
    value: 94,
    change: +2,
    trend: 'up',
    sparkline: [92, 93, 91, 94, 93, 95, 94],
    isLoading: false
  }
];

const systemMetrics: SystemMetric[] = [
  {
    name: 'CPU',
    value: 34,
    max: 100,
    unit: '%',
    status: 'normal',
    trend: [30, 32, 35, 34, 36, 34, 34]
  },
  {
    name: 'GPU',
    value: 67,
    max: 100,
    unit: '%',
    status: 'warning',
    trend: [65, 68, 70, 67, 69, 67, 67]
  },
  {
    name: 'RAM',
    value: 52,
    max: 100,
    unit: '%',
    status: 'normal',
    trend: [48, 50, 52, 54, 52, 51, 52]
  },
  {
    name: 'Storage',
    value: 78,
    max: 100,
    unit: '%',
    status: 'warning',
    trend: [75, 76, 77, 78, 78, 78, 78]
  }
];

const workers: Worker[] = [
  { 
    id: 'worker_01', 
    name: 'Local Workstation', 
    status: 'Busy', 
    task: 'TTS Generation', 
    type: 'local',
    performance: 87,
    uptime: '12d 4h',
    version: 'v2.1.3'
  },
  { 
    id: 'worker_02', 
    name: 'Cloud Node Alpha', 
    status: 'Idle', 
    task: null, 
    type: 'cloud',
    performance: 95,
    uptime: '30d 12h',
    location: 'US-East',
    version: 'v2.1.4'
  },
  { 
    id: 'worker_03', 
    name: 'Cloud Node Beta', 
    status: 'Busy', 
    task: 'Audio Processing', 
    type: 'cloud',
    performance: 91,
    uptime: '15d 8h',
    location: 'EU-West',
    version: 'v2.1.4'
  },
  { 
    id: 'worker_04', 
    name: 'Remote Server', 
    status: 'Maintenance', 
    task: null, 
    type: 'remote',
    performance: 0,
    uptime: '0h',
    version: 'v2.1.2'
  }
];

const alerts: Alert[] = [
  { 
    id: 1, 
    type: 'warning', 
    message: 'GPU temperature elevated on Cloud Node Beta', 
    time: '2 min ago', 
    jobId: undefined,
    priority: 'medium',
    category: 'Hardware'
  },
  { 
    id: 2, 
    type: 'error', 
    message: 'Job failed: insufficient GPU memory for 4K rendering', 
    time: '23 min ago', 
    jobId: 'job_005',
    priority: 'high',
    category: 'Processing'
  },
  { 
    id: 3, 
    type: 'info', 
    message: 'Scheduled maintenance window starts in 2 hours', 
    time: '1h ago', 
    jobId: undefined,
    priority: 'low',
    category: 'Maintenance'
  },
  {
    id: 4,
    type: 'success',
    message: 'New worker node successfully provisioned',
    time: '2h ago',
    jobId: undefined,
    priority: 'low',
    category: 'Infrastructure'
  }
];

function AnimatedSparkline({ data, trend, className = "" }: { data: number[], trend: 'up' | 'down' | 'stable', className?: string }) {
  const [animatedData, setAnimatedData] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setAnimatedData(data);
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [data]);

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = (animatedData.length > 0 ? animatedData : data).map((value, index) => {
    const x = (index / (data.length - 1)) * 60;
    const y = 20 - ((value - min) / range) * 16;
    return `${x},${y}`;
  }).join(' ');

  const trendColor = trend === 'up' ? '#22c55e' : trend === 'down' ? '#ef4444' : '#6b7280';

  return (
    <div className={`relative ${className}`}>
      <svg width="60" height="20" className="opacity-80">
        <defs>
          <linearGradient id={`gradient-${Math.random()}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={trendColor} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={trendColor} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polyline
          points={points}
          fill="none"
          stroke={trendColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-all duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
        />
        <polygon
          points={`0,20 ${points} 60,20`}
          fill={`url(#gradient-${Math.random()})`}
          className="opacity-30"
        />
      </svg>
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}



function EnhancedKPICard({ data, onRefresh }: { data: KPICard, onRefresh: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const TrendIcon = data.trend === 'up' ? TrendingUp : data.trend === 'down' ? TrendingDown : Minus;
  const trendColor = data.trend === 'up' ? 'text-chart-3' : data.trend === 'down' ? 'text-destructive' : 'text-muted-foreground';
  const changePrefix = data.change > 0 ? '+' : '';

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onRefresh();
    setIsRefreshing(false);
  };

  return (
    <Card 
      className="bg-card border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
            {data.title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <AnimatedSparkline 
          data={data.sparkline} 
          trend={data.trend} 
          className={`transform transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            {data.isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <span className="text-3xl font-bold transition-all duration-300 group-hover:text-primary">
                {data.value}
                {data.title === 'Success Rate' && '%'}
              </span>
            )}
          </div>
          <div className={`flex items-center text-xs ${trendColor} transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
            <TrendIcon className="h-4 w-4 mr-1" />
            <span className="font-medium">
              {changePrefix}{data.change}{data.title === 'Success Rate' ? '%' : ''}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SystemHealthCard({ metric }: { metric: SystemMetric }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'warning': return 'text-chart-4';
      case 'critical': return 'text-destructive';
      default: return 'text-chart-3';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'warning': return '[&>div]:bg-chart-4';
      case 'critical': return '[&>div]:bg-destructive';
      default: return '[&>div]:bg-chart-3';
    }
  };

  return (
    <div className="space-y-2 group">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            {metric.name}
          </span>
          {metric.status !== 'normal' && (
            <AlertTriangle className={`h-3 w-3 ${getStatusColor(metric.status)}`} />
          )}
        </div>
        <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
          {metric.value}{metric.unit}
        </span>
      </div>
      <div className="relative">
        <Progress 
          value={metric.value} 
          className={`h-2 transition-all duration-300 group-hover:h-3 ${getProgressColor(metric.status)}`} 
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>0</span>
          <span>{metric.max}{metric.unit}</span>
        </div>
      </div>
    </div>
  );
}

function EnhancedJobCard({ job, viewMode, onStatusChange }: { 
  job: JobCard, 
  viewMode: 'card' | 'table',
  onStatusChange: (jobId: string, newStatus: string) => void 
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Running: 'bg-chart-4 text-card-foreground animate-pulse',
      Processing: 'bg-primary text-primary-foreground animate-pulse',
      Queued: 'bg-muted text-muted-foreground',
      Scheduled: 'bg-chart-1 text-card-foreground',
      Completed: 'bg-chart-3 text-card-foreground',
      Failed: 'bg-destructive text-destructive-foreground',
      Paused: 'bg-chart-2 text-card-foreground'
    };
    return <Badge className={variants[status] || 'bg-muted'}>{status}</Badge>;
  };

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null;
    const variants: Record<string, string> = {
      Urgent: 'bg-destructive text-destructive-foreground animate-pulse',
      High: 'bg-chart-4 text-card-foreground',
      Normal: 'bg-muted text-muted-foreground',
      Low: 'bg-chart-2 text-card-foreground'
    };
    return (
      <Badge variant="outline" className={variants[priority] || 'bg-muted'}>
        {priority}
      </Badge>
    );
  };

  const getStepChips = () => {
    const steps = ['Content', 'Cleaning', 'TTS', 'Music', 'Visuals', 'Mix', 'Export'];
    const getCurrentStep = () => {
      if (job.stage?.includes('Audio mixing')) return 5;
      if (job.stage?.includes('Neural voice')) return 2;
      if (job.stage?.includes('Processing')) return 3;
      return 0;
    };
    
    const currentStepIndex = getCurrentStep();
    
    return (
      <div className="flex gap-1 flex-wrap">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              index < currentStepIndex
                ? 'bg-chart-3 text-card-foreground shadow-sm'
                : index === currentStepIndex
                ? 'bg-chart-4 text-card-foreground shadow-md animate-pulse'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    );
  };

  const handleAction = async (action: string) => {
    setActionLoading(action);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (action === 'pause') {
      onStatusChange(job.id, job.status === 'Running' ? 'Paused' : 'Running');
    }
    
    setActionLoading(null);
  };

  if (viewMode === 'table') {
    return (
      <tr className={`border-b border-border hover:bg-accent/30 transition-all duration-200 ${isHovered ? 'shadow-sm' : ''}`}>
        <td className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {job.starred && <Star className="h-4 w-4 text-chart-4 fill-chart-4" />}
            </div>
            <div>
              <div className="font-medium text-card-foreground">{job.title}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <Hash className="h-3 w-3" />
                {job.id}
                {job.tags && (
                  <div className="flex gap-1">
                    {job.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </td>
        <td className="p-4">{getStatusBadge(job.status)}</td>
        <td className="p-4">
          {job.progress !== undefined ? (
            <div className="flex items-center gap-3">
              <Progress value={job.progress} className="w-24" />
              <span className="text-sm font-medium">{job.progress}%</span>
            </div>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">{job.owner || '—'}</span>
          </div>
        </td>
        <td className="p-4 text-sm text-muted-foreground">{job.createdAt}</td>
        <td className="p-4 text-sm text-muted-foreground">{job.finishedAt || '—'}</td>
        <td className="p-4 text-sm text-muted-foreground">{job.duration || '—'}</td>
        <td className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      </tr>
    );
  }

  return (
    <Card 
      className={`bg-card border-border transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1 ${
        job.status === 'Running' || job.status === 'Processing' ? 'ring-1 ring-primary/20' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {job.starred && (
                <Star className="h-4 w-4 text-chart-4 fill-chart-4 transition-transform hover:scale-125" />
              )}
              <CardTitle className="text-base line-clamp-1 group-hover:text-primary transition-colors">
                {job.title}
              </CardTitle>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1">
                <Hash className="h-3 w-3" />
                {job.id}
              </span>
              <Separator orientation="vertical" className="h-3" />
              <span className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                {job.createdAt}
              </span>
              <Separator orientation="vertical" className="h-3" />
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {job.owner}
              </span>
            </div>
            {job.tags && (
              <div className="flex gap-1 flex-wrap mt-2">
                {job.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="h-2 w-2 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {getPriorityBadge(job.priority)}
            {getStatusBadge(job.status)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {(job.status === 'Running' || job.status === 'Processing') && (
          <>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  {job.stage}
                </span>
                <span className="font-medium text-foreground">{job.progress}%</span>
              </div>
              <div className="relative">
                <Progress value={job.progress} className="w-full h-2" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Timer className="h-3 w-3" />
                  ETA: {job.eta}
                </span>
                {job.estimatedCost && (
                  <span className="text-muted-foreground">Cost: {job.estimatedCost}</span>
                )}
              </div>
              {(job.gpuUsage || job.memoryUsage) && (
                <div className="grid grid-cols-2 gap-4 text-xs">
                  {job.gpuUsage && (
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">GPU</span>
                        <span>{job.gpuUsage}%</span>
                      </div>
                      <Progress value={job.gpuUsage} className="h-1" />
                    </div>
                  )}
                  {job.memoryUsage && (
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">RAM</span>
                        <span>{job.memoryUsage}%</span>
                      </div>
                      <Progress value={job.memoryUsage} className="h-1" />
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 max-h-0 overflow-hidden'}`}>
              {getStepChips()}
            </div>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleAction('pause')}
                disabled={actionLoading === 'pause'}
                className="transition-all duration-200 hover:scale-105"
              >
                {actionLoading === 'pause' ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Pause className="h-4 w-4 mr-1" />
                )}
                Pause
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleAction('stop')}
                disabled={actionLoading === 'stop'}
              >
                {actionLoading === 'stop' ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <StopCircle className="h-4 w-4 mr-1" />
                )}
                Stop
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 mr-1" />
                ) : (
                  <ChevronDown className="h-4 w-4 mr-1" />
                )}
                {isExpanded ? 'Less' : 'More'}
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View detailed job information</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="px-2">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate Job
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download Logs
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Output
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}

        {job.status === 'Scheduled' && (
          <>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Starts:</span>
              <span className="font-medium">{job.scheduledTime}</span>
            </div>
            {job.estimatedCost && (
              <div className="text-sm text-muted-foreground">
                Estimated cost: {job.estimatedCost}
              </div>
            )}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                <PlayCircle className="h-4 w-4 mr-1" />
                Start Now
              </Button>
              <Button size="sm" variant="outline">
                <Calendar className="h-4 w-4 mr-1" />
                Reschedule
              </Button>
              <Button size="sm" variant="outline">
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </>
        )}

        {(job.status === 'Completed' || job.status === 'Failed') && (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Finished:</span>
                <div className="font-medium">{job.finishedAt}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Duration:</span>
                <div className="font-medium">{job.duration}</div>
              </div>
            </div>
            {job.status === 'Completed' && job.outputType && (
              <div className="flex items-center gap-4 text-sm p-3 bg-muted/30 rounded-lg">
                <Video className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <div className="font-medium">{job.outputType} • {job.resolution}</div>
                  <div className="text-muted-foreground">{job.fileSize}</div>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              {job.status === 'Completed' ? (
                <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                  <FolderOpen className="h-4 w-4 mr-1" />
                  Open Result
                </Button>
              ) : (
                <Button size="sm" variant="outline">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  View Error
                </Button>
              )}
              <Button size="sm" variant="outline">
                <RotateCcw className="h-4 w-4 mr-1" />
                Re-Run
              </Button>
              <Button size="sm" variant="outline">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </>
        )}

        {job.status === 'Queued' && (
          <>
            {job.estimatedCost && (
              <div className="text-sm text-muted-foreground">
                Estimated cost: {job.estimatedCost}
              </div>
            )}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                <SkipForward className="h-4 w-4 mr-1" />
                Priority Boost
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </Button>
              <Button size="sm" variant="outline">
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function EmptyStateIllustration({ type }: { type: 'running' | 'queued' | 'history' }) {
  const config = {
    running: {
      icon: Zap,
      title: "No Active Jobs",
      description: "Start processing a job to see real-time progress here.",
      actionText: "Create New Job"
    },
    queued: {
      icon: Clock,
      title: "No Queued Jobs", 
      description: "Schedule jobs or add them to the queue to optimize your workflow.",
      actionText: "Schedule Job"
    },
    history: {
      icon: CheckCircle2,
      title: "No Completed Jobs",
      description: "Finished jobs will appear here with detailed results and analytics.",
      actionText: "View Documentation"
    }
  };

  const { icon: Icon, title, description, actionText } = config[type];

  return (
    <Card className="bg-card border-border p-16 text-center border-2 border-dashed transition-all duration-300 hover:border-primary/50">
      <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:bg-primary/10 hover:scale-110">
        <Icon className="h-10 w-10 text-muted-foreground transition-colors duration-300 hover:text-primary" />
      </div>
      <h3 className="text-xl mb-3">{title}</h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      <div className="flex gap-3 justify-center">
        <Button className="hover:scale-105 transition-transform">
          <Plus className="h-4 w-4 mr-2" />
          {actionText}
        </Button>
        {type === 'running' && (
          <Button variant="outline">
            <Import className="h-4 w-4 mr-2" />
            Import Job
          </Button>
        )}
      </div>
    </Card>
  );
}

export function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [activeTab, setActiveTab] = useState('current');
  const [jobs, setJobs] = useState(mockJobs);
  const [kpiCards, setKpiCards] = useState(kpiData);
  const [isDragOver, setIsDragOver] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.owner?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    const matchesType = typeFilter === 'All' || job.type === typeFilter;
    const matchesPriority = priorityFilter === 'All' || job.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const runningJobs = filteredJobs.filter(job => job.status === 'Running' || job.status === 'Processing' || job.status === 'Paused');
  const queuedJobs = filteredJobs.filter(job => job.status === 'Queued' || job.status === 'Scheduled');
  const historyJobs = filteredJobs.filter(job => job.status === 'Completed' || job.status === 'Failed');

  const handleJobStatusChange = (jobId: string, newStatus: string) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId ? { ...job, status: newStatus as any } : job
      )
    );
  };

  const handleKpiRefresh = () => {
    setKpiCards(prevCards =>
      prevCards.map(card => ({
        ...card,
        isLoading: true
      }))
    );
    
    setTimeout(() => {
      setKpiCards(prevCards =>
        prevCards.map(card => ({
          ...card,
          isLoading: false,
          value: card.value + Math.floor(Math.random() * 3) - 1
        }))
      );
    }, 1000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const textFiles = files.filter(file => 
      file.type === 'text/plain' || 
      file.name.endsWith('.txt') || 
      file.name.endsWith('.md')
    );
    
    if (textFiles.length > 0) {
      // Handle file upload logic here
      console.log('Text files dropped:', textFiles);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setTypeFilter('All');
    setPriorityFilter('All');
  };

  return (
    <div 
      className="flex-1 flex relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag Overlay */}
      {isDragOver && (
        <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary z-50 flex items-center justify-center">
          <div className="text-center p-8 bg-card rounded-xl shadow-2xl border">
            <Upload className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl mb-2">Drop your files here</h3>
            <p className="text-muted-foreground">Text files will create new Manual jobs</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-background text-foreground">
        {/* Enhanced Header Bar */}
        <div className="p-6 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl">Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Monitor and manage your AI narrator jobs</p>
                </div>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setNotifications(!notifications)}
                className="relative"
              >
                {notifications ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                {alerts.filter(a => !a.dismissed).length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
                )}
              </Button>
              <Button className="hover:scale-105 transition-transform shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                New Job
              </Button>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <Import className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, owners, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input-background border-border transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Running">Running</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Queued">Queued</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="Auto">Auto</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Priority</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>

            {(searchQuery || statusFilter !== 'All' || typeFilter !== 'All' || priorityFilter !== 'All') && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Enhanced KPI Summary */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiCards.map((kpi, index) => (
              <EnhancedKPICard key={index} data={kpi} onRefresh={handleKpiRefresh} />
            ))}
          </div>

          {/* Enhanced Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-6">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="current" className="relative">
                  Current
                  {runningJobs.length > 0 && (
                    <Badge className="ml-2 bg-primary text-primary-foreground animate-pulse">
                      {runningJobs.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="queued" className="relative">
                  Queue
                  {queuedJobs.length > 0 && (
                    <Badge variant="outline" className="ml-2">
                      {queuedJobs.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="history">
                  History
                  {historyJobs.length > 0 && (
                    <Badge variant="outline" className="ml-2">
                      {historyJobs.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">View:</span>
                  <Button
                    variant={viewMode === 'card' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('card')}
                    className="transition-all duration-200"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className="transition-all duration-200"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={handleKpiRefresh}>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
              </div>
            </div>

            <TabsContent value="current" className="space-y-6">
              {runningJobs.length === 0 ? (
                <EmptyStateIllustration type="running" />
              ) : viewMode === 'card' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {runningJobs.map(job => (
                    <EnhancedJobCard 
                      key={job.id} 
                      job={job} 
                      viewMode="card" 
                      onStatusChange={handleJobStatusChange}
                    />
                  ))}
                </div>
              ) : (
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border bg-muted/20">
                        <tr>
                          <th className="text-left p-4 text-muted-foreground">Name</th>
                          <th className="text-left p-4 text-muted-foreground">Status</th>
                          <th className="text-left p-4 text-muted-foreground">Progress</th>
                          <th className="text-left p-4 text-muted-foreground">Owner</th>
                          <th className="text-left p-4 text-muted-foreground">Created</th>
                          <th className="text-left p-4 text-muted-foreground">Finished</th>
                          <th className="text-left p-4 text-muted-foreground">Duration</th>
                          <th className="text-left p-4 text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {runningJobs.map(job => (
                          <EnhancedJobCard 
                            key={job.id} 
                            job={job} 
                            viewMode="table" 
                            onStatusChange={handleJobStatusChange}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="queued" className="space-y-6">
              {queuedJobs.length === 0 ? (
                <EmptyStateIllustration type="queued" />
              ) : viewMode === 'card' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {queuedJobs.map(job => (
                    <EnhancedJobCard 
                      key={job.id} 
                      job={job} 
                      viewMode="card" 
                      onStatusChange={handleJobStatusChange}
                    />
                  ))}
                </div>
              ) : (
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border bg-muted/20">
                        <tr>
                          <th className="text-left p-4 text-muted-foreground">Name</th>
                          <th className="text-left p-4 text-muted-foreground">Status</th>
                          <th className="text-left p-4 text-muted-foreground">Priority</th>
                          <th className="text-left p-4 text-muted-foreground">Owner</th>
                          <th className="text-left p-4 text-muted-foreground">Scheduled</th>
                          <th className="text-left p-4 text-muted-foreground">Cost Est.</th>
                          <th className="text-left p-4 text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {queuedJobs.map(job => (
                          <EnhancedJobCard 
                            key={job.id} 
                            job={job} 
                            viewMode="table" 
                            onStatusChange={handleJobStatusChange}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              {historyJobs.length === 0 ? (
                <EmptyStateIllustration type="history" />
              ) : viewMode === 'card' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {historyJobs.map(job => (
                    <EnhancedJobCard 
                      key={job.id} 
                      job={job} 
                      viewMode="card" 
                      onStatusChange={handleJobStatusChange}
                    />
                  ))}
                </div>
              ) : (
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border bg-muted/20">
                        <tr>
                          <th className="text-left p-4 text-muted-foreground">Name</th>
                          <th className="text-left p-4 text-muted-foreground">Status</th>
                          <th className="text-left p-4 text-muted-foreground">Result</th>
                          <th className="text-left p-4 text-muted-foreground">Owner</th>
                          <th className="text-left p-4 text-muted-foreground">Finished</th>
                          <th className="text-left p-4 text-muted-foreground">Duration</th>
                          <th className="text-left p-4 text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyJobs.map(job => (
                          <EnhancedJobCard 
                            key={job.id} 
                            job={job} 
                            viewMode="table" 
                            onStatusChange={handleJobStatusChange}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Enhanced Quick Actions Strip */}
        <div className="mt-auto p-6 border-t border-border bg-card/30 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <Plus className="h-4 w-4 mr-2" />
                New Job
              </Button>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <Calendar className="h-4 w-4 mr-2" />
                Bulk Schedule
              </Button>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <Database className="h-4 w-4 mr-2" />
                Clean Cache
              </Button>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <FolderOpen className="h-4 w-4 mr-2" />
                Output Folder
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".txt,.md,text/plain"
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  console.log('Files selected:', files);
                }}
              />
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                className="hover:scale-105 transition-transform"
              >
                <CloudUpload className="h-4 w-4 mr-2" />
                Import Files
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Drag & drop text files to create jobs instantly</span>
              </div>
              <Badge variant="outline" className="animate-pulse">
                Live Updates
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Right Sidebar */}
      <div className="w-80 bg-sidebar border-l border-sidebar-border overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* System Health */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  System Health
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemMetrics.map(metric => (
                <SystemHealthCard key={metric.name} metric={metric} />
              ))}
              <Separator />
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Storage:</span>
                  <span className="font-medium">145 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Queue Capacity:</span>
                  <span className="font-medium">23 / 50</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Workers */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Workers
                </div>
                <Badge variant="outline" className="text-xs">
                  {workers.filter(w => w.status === 'Online' || w.status === 'Busy').length}/{workers.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {workers.map(worker => (
                <div key={worker.id} className="group hover:bg-accent/20 p-3 rounded-lg transition-all duration-200 -mx-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {worker.type === 'local' ? (
                          <Monitor className="h-4 w-4 text-muted-foreground" />
                        ) : worker.type === 'cloud' ? (
                          <CloudUpload className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Server className="h-4 w-4 text-muted-foreground" />
                        )}
                        <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                          worker.status === 'Online' || worker.status === 'Busy' 
                            ? 'bg-chart-3' 
                            : worker.status === 'Maintenance'
                            ? 'bg-chart-4'
                            : 'bg-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{worker.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {worker.location && `${worker.location} • `}
                          {worker.version}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline"
                      className={`text-xs ${
                        worker.status === 'Busy' 
                          ? 'bg-chart-4 text-card-foreground animate-pulse' 
                          : worker.status === 'Idle'
                          ? 'bg-chart-3 text-card-foreground'
                          : worker.status === 'Online'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {worker.status}
                    </Badge>
                  </div>
                  
                  {worker.task && (
                    <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      {worker.task}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">Performance:</span>
                      <div className="flex items-center gap-1">
                        <Progress value={worker.performance} className="w-12 h-1" />
                        <span className="font-medium">{worker.performance}%</span>
                      </div>
                    </div>
                    <span className="text-muted-foreground">
                      ↑ {worker.uptime}
                    </span>
                  </div>
                </div>
              ))}
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  <Pause className="h-3 w-3 mr-1" />
                  Pause All
                </Button>
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Restart
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Alerts */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Alerts
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {alerts.filter(a => !a.dismissed).length}
                  </Badge>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.filter(alert => !alert.dismissed).map(alert => (
                <div key={alert.id} className="group hover:bg-accent/20 p-3 rounded-lg transition-all duration-200 -mx-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      alert.type === 'error' ? 'bg-destructive animate-pulse' : 
                      alert.type === 'warning' ? 'bg-chart-4' : 
                      alert.type === 'success' ? 'bg-chart-3' : 'bg-chart-1'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm text-card-foreground line-clamp-2">{alert.message}</p>
                        <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                          {alert.category}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {alert.jobId && (
                            <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                              View Job
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {alerts.filter(a => !a.dismissed).length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">All clear! No active alerts.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
