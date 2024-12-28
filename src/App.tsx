import { ThemeProvider } from './contexts/ThemeContext';
import { MainView } from './components/MainView/MainView';
import { TopHeader } from './components/MainView/TopHeader';
import { BackgroundEffects } from './components/MainView/BackgroundEffects';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen w-screen bg-gradient-to-br from-slate-100 to-white dark:from-gray-900 dark:to-gray-800 pb-6 relative overflow-hidden">
        <BackgroundEffects />
        <TopHeader />
        <MainView />
      </div>
    </ThemeProvider>
  );
}

export default App;
