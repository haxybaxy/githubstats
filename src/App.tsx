import { ComparisonView } from './components/ComparisonView/ComparisonView';

function App() {
  return (
    <div className="min-h-screen w-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl text-center">
          GitHub Stats
        </h1>
        <ComparisonView />
      </div>
    </div>
  );
}

export default App;
