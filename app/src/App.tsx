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

function App() {
  return (
    <ThemeProvider defaultTheme="solarized">
      <Router>
        <div className="flex flex-col h-screen bg-background text-foreground">
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
              </Routes>
            </MainContent>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
