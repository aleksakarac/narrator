import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { TopBar } from './components/TopBar';
import { LeftSidebar } from './components/LeftSidebar';
import { MainContent } from './components/MainContent';
import DashboardPage from './pages/DashboardPage';
import ManualMode from './pages/ManualMode';
import AutoMode from './pages/AutoMode';
import OutputConfigurationPage from './pages/OutputConfigurationPage';
import ResultsPage from './pages/ResultsPage';
import TextCleaningPage from './pages/TextCleaningPage';
import VoiceTTSPage from './pages/VoiceTTSPage';
import VisualElementsPage from './pages/VisualElementsPage';
import BackgroundAudioPage from './pages/BackgroundAudioPage';
import AudioVideoMixingPage from './pages/AudioVideoMixingPage';

function App() {
  return (
    /*<ThemeProvider defaultTheme="solarized">*/
    <ThemeProvider defaultTheme="dark">
      <Router>
        <div className="flex flex-col h-screen bg-background text-foreground p-8 text-xl">
          <TopBar />
          <div className="flex flex-1 overflow-hidden">
            <LeftSidebar />
            <MainContent>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/manual-mode" element={<ManualMode />} />
                <Route path="/auto-mode" element={<AutoMode />} />
                <Route path="/output-configuration" element={<OutputConfigurationPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/text-cleaning" element={<TextCleaningPage />} />
                <Route path="/voice-tts" element={<VoiceTTSPage />} />
                <Route path="/visual-elements" element={<VisualElementsPage />} />
                <Route path="/background-audio" element={<BackgroundAudioPage />} />
                <Route path="/audio-video-mixing" element={<AudioVideoMixingPage />} />
              </Routes>
            </MainContent>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
