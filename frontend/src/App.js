import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import TimerPage from './pages/TimerPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<TimerPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
