import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SettingsPage from './pages/SettingsPage';
import TimerPage from './pages/TimerPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<TimerPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
