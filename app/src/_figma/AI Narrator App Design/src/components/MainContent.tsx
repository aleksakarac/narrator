import { Upload, FileText, Plus } from 'lucide-react';

interface ContentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

function ContentCard({ title, description, icon, onClick }: ContentCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-6 hover:bg-accent hover:border-primary/50 transition-all duration-200 text-left group"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground group-hover:bg-primary/80 transition-colors">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-card-foreground">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </button>
  );
}

export function MainContent() {
  const contentSources = [
    {
      title: 'Upload Text File',
      description: 'Upload a text file (.txt, .md, .docx) to generate narration from your content.',
      icon: <Upload className="w-5 h-5" />
    },
    {
      title: 'Paste Text',
      description: 'Directly paste or type text content that you want to convert to speech.',
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: 'URL Import',
      description: 'Import content from a webpage URL to automatically extract and narrate text.',
      icon: <Plus className="w-5 h-5" />
    }
  ];

  return (
    <div className="flex-1 bg-background p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Choose Content Source</h1>
          <p className="text-muted-foreground">
            Select how you'd like to provide the content for your AI narrator to process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {contentSources.map((source, index) => (
            <ContentCard
              key={index}
              title={source.title}
              description={source.description}
              icon={source.icon}
            />
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-medium text-card-foreground mb-4">Quick Start</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0 mt-0.5">1</div>
              <p>Choose your content source from the options above</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-chart-2 rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0 mt-0.5">2</div>
              <p>Configure text processing and voice settings</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-chart-3 rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0 mt-0.5">3</div>
              <p>Add background music and visual elements</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-chart-4 rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0 mt-0.5">4</div>
              <p>Export your final narrated content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}