import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { 
  Wand2, 
  Sparkles, 
  Settings, 
  Copy, 
  RotateCcw,
  List,
  Pilcrow,
  Type
} from 'lucide-react';

interface CleaningRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'formatting' | 'content' | 'structure' | 'enhancement';
}

const defaultRules: CleaningRule[] = [
  {
    id: 'remove-extra-spaces',
    name: 'Remove Extra Spaces',
    description: 'Remove multiple consecutive spaces and trim whitespace',
    enabled: true,
    category: 'formatting'
  },
  {
    id: 'fix-quotes',
    name: 'Fix Smart Quotes',
    description: 'Convert straight quotes to curly quotes',
    enabled: true,
    category: 'formatting'
  },
  {
    id: 'remove-empty-lines',
    name: 'Remove Empty Lines',
    description: 'Remove lines with only whitespace',
    enabled: true,
    category: 'formatting'
  },
  {
    id: 'detect-headings',
    name: 'Detect Headings',
    description: 'Identify and format heading sections',
    enabled: true,
    category: 'structure'
  },
  {
    id: 'fix-lists',
    name: 'Fix Lists',
    description: 'Format numbered and bulleted lists',
    enabled: true,
    category: 'structure'
  },
  {
    id: 'remove-urls',
    name: 'Remove URLs',
    description: 'Remove web addresses and links',
    enabled: false,
    category: 'content'
  },
  {
    id: 'enhance-readability',
    name: 'Enhance Readability',
    description: 'Improve sentence structure and flow',
    enabled: true,
    category: 'enhancement'
  }
];

export default function TextCleaningPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [rules, setRules] = useState<CleaningRule[]>(defaultRules);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState({
    characters: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    changes: 0
  });

  const toggleRule = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const processText = async () => {
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple cleaning logic (in a real app, this would be more sophisticated)
    let cleaned = inputText;
    let changes = 0;
    
    if (rules.find(r => r.id === 'remove-extra-spaces')?.enabled) {
      const before = cleaned.length;
      cleaned = cleaned.replace(/\s+/g, ' ').trim();
      changes += before - cleaned.length;
    }
    
    if (rules.find(r => r.id === 'remove-empty-lines')?.enabled) {
      const before = cleaned.length;
      cleaned = cleaned.replace(/^\s*[\r\n]+/gm, '\n');
      changes += before - cleaned.length;
    }
    
    setOutputText(cleaned);
    
    // Update stats
    setStats({
      characters: cleaned.length,
      words: cleaned.split(/\s+/).filter(word => word.length > 0).length,
      sentences: cleaned.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
      paragraphs: cleaned.split(/\n\n+/).filter(p => p.trim().length > 0).length,
      changes
    });
    
    setIsProcessing(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const resetAll = () => {
    setInputText('');
    setOutputText('');
    setRules(defaultRules.map(rule => ({ ...rule, enabled: true })));
    setStats({ characters: 0, words: 0, sentences: 0, paragraphs: 0, changes: 0 });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'formatting': return <Pilcrow className="h-4 w-4" />;
      case 'content': return <Type className="h-4 w-4" />;
      case 'structure': return <List className="h-4 w-4" />;
      case 'enhancement': return <Sparkles className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'formatting': return 'bg-blue-500/10 text-blue-500';
      case 'content': return 'bg-green-500/10 text-green-500';
      case 'structure': return 'bg-purple-500/10 text-purple-500';
      case 'enhancement': return 'bg-amber-500/10 text-amber-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Text Cleaning</h1>
          <p className="text-muted-foreground">
            Prepare and enhance your text content for optimal narration
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetAll}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset All
          </Button>
          <Button onClick={processText} disabled={!inputText.trim() || isProcessing}>
            <Wand2 className="h-4 w-4 mr-2" />
            {isProcessing ? 'Processing...' : 'Clean Text'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
            <CardDescription>
              Paste or type the text you want to clean and enhance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[300px] font-mono"
            />
            {inputText && (
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <span>{inputText.length} chars</span>
                <span>{inputText.split(/\s+/).filter(w => w.length > 0).length} words</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Cleaned Text</span>
              {outputText && (
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </CardTitle>
            <CardDescription>
              Enhanced and cleaned version of your input text
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] rounded-md border p-4 font-mono bg-muted/50 overflow-auto">
              {outputText ? (
                <pre className="whitespace-pre-wrap break-words">{outputText}</pre>
              ) : (
                <p className="text-muted-foreground text-center py-12">
                  Cleaned text will appear here after processing
                </p>
              )}
            </div>
            
            {stats.changes > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div className="text-center p-2 bg-green-500/10 rounded-lg">
                  <div className="font-semibold text-green-600">{stats.changes}</div>
                  <div className="text-muted-foreground">Changes Made</div>
                </div>
                <div className="text-center p-2 bg-blue-500/10 rounded-lg">
                  <div className="font-semibold text-blue-600">{stats.words}</div>
                  <div className="text-muted-foreground">Words</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Cleaning Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Cleaning Rules</CardTitle>
          <CardDescription>
            Configure how your text should be processed and enhanced
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={getCategoryColor(rule.category) + " p-2 rounded-full"}>
                      {getCategoryIcon(rule.category)}
                    </div>
                    <div>
                      <div className="font-medium">{rule.name}</div>
                      <div className="text-sm text-muted-foreground">{rule.description}</div>
                    </div>
                  </div>
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={() => toggleRule(rule.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      {outputText && (
        <Card>
          <CardHeader>
            <CardTitle>Text Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.characters}</div>
                <div className="text-sm text-muted-foreground">Characters</div>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.words}</div>
                <div className="text-sm text-muted-foreground">Words</div>
              </div>
              <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{stats.sentences}</div>
                <div className="text-sm text-muted-foreground">Sentences</div>
              </div>
              <div className="text-center p-4 bg-amber-500/10 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">{stats.paragraphs}</div>
                <div className="text-sm text-muted-foreground">Paragraphs</div>
              </div>
              <div className="text-center p-4 bg-red-500/10 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{stats.changes}</div>
                <div className="text-sm text-muted-foreground">Changes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}