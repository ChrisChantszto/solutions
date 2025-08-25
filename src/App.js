import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import CleanUpPtrArrVisualization from './components/CleanUpPtrArrVisualization';
import Problem3Explanation from './components/Problem3Explanation';
import Problem5BitVisualization from './components/Problem5BitVisualization';
import Problem4Visualization from './components/Problem4Visualization';
import Problem5CorrectVisualization from './components/Problem5CorrectVisualization';
import MidtermSolutions from './components/MidtermSolutions';
import Problem6Visualization from './components/Problem6Visualization';
import PointerCastingExplanation from './components/PointerCastingExplanation';

const getRoute = () => {
  const hash = window.location.hash || '#/visualization';
  // Normalize: ensure starts with #/
  if (!hash.startsWith('#/')) return '#/visualization';
  return hash;
};

function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    // Ensure initial hash if none
    if (!window.location.hash) {
      window.location.hash = '#/visualization';
    }
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderRoute = () => {
    switch (route) {
      case '#/problem3':
        return <Problem3Explanation />;
      case '#/problem4':
        return <Problem4Visualization />;
      case '#/problem5':
        return <Problem5BitVisualization />;
      case '#/problem5-correct':
        return <Problem5CorrectVisualization />;
      case '#/midterm-answers':
        return <MidtermSolutions />;
      case '#/problem6':
        return <Problem6Visualization />;
      case '#/pointer-casting':
        return <PointerCastingExplanation />;
      case '#/visualization':
      case '#/':
      default:
        return <CleanUpPtrArrVisualization />;
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container mx-auto py-4">
        {renderRoute()}
      </div>
    </div>
  );
}

export default App;
