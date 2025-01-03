import { ThemeProvider } from './contexts/ThemeContext';
import { MainView } from './components/MainView/MainView';

function App() {
  return (
    <ThemeProvider>
        <MainView />
    </ThemeProvider>
  );
}

export default App;
