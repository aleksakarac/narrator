import { useState } from 'react';
import { TopBar } from './components/TopBar';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { MainContent } from './components/MainContent';
import { TextCleaningPage } from './components/TextCleaningPage';
import { VoiceTTSPage } from './components/VoiceTTSPage';
import { BackgroundAudioPage } from './components/BackgroundAudioPage';
import { VisualElementsPage } from './components/VisualElementsPage';
import { AudioVideoMixingPage } from './components/AudioVideoMixingPage';
import { OutputConfigurationPage } from './components/OutputConfigurationPage';
import { ResultPage } from './components/ResultPage';
import { DashboardPage } from './components/DashboardPage';
import { ThemeProvider } from './components/ThemeProvider';

export default function App() {
  const [currentMode, setCurrentMode] = useState("Dashboard");
  const [currentStep, setCurrentStep] = useState("Choose Content Source");

  const renderMainContent = () => {
    if (currentMode === "Dashboard") {
      return <DashboardPage />;
    }
    
    if (currentMode === "Auto Mode") {
      // Auto Mode content - could be a separate component
      return (
        <div className="flex-1 flex items-center justify-center bg-background text-foreground p-8">
          <div className="text-center">
            <h2 className="text-2xl mb-4">Auto Mode</h2>
            <p className="text-muted-foreground mb-6">Automated workflow processing coming soon...</p>
            <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      );
    }

    // Manual Mode (existing workflow)
    switch (currentStep) {
      case "Text Cleaning And Segmentation":
        return <TextCleaningPage />;
      case "Voice & Text-to-speech Settings":
        return <VoiceTTSPage />;
      case "Background Audio & Music":
        return <BackgroundAudioPage />;
      case "Visual Elements":
        return <VisualElementsPage />;
      case "Audio & Video & Mixing Settings":
        return <AudioVideoMixingPage />;
      case "Output Configuration":
        return <OutputConfigurationPage />;
      case "Result":
        return <ResultPage />;
      default:
        return <MainContent />;
    }
  };

  const shouldShowSidebars = currentMode === "Manual Mode";

  return (
    <ThemeProvider defaultTheme="solarized">
      <div className="h-screen flex flex-col bg-background text-foreground">
        <TopBar currentMode={currentMode} onModeChange={setCurrentMode} />
        <div className="flex flex-1 overflow-hidden">
          {shouldShowSidebars && (
            <LeftSidebar currentStep={currentStep} onStepChange={setCurrentStep} />
          )}
          {renderMainContent()}
          {shouldShowSidebars && (
            <RightSidebar currentStep={currentStep} />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}