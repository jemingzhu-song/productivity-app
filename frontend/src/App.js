import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SettingsPage from './pages/SettingsPage';
import TimerPage from './pages/TimerPage';
import Cookies from 'js-cookie';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState('');

  const handleLogin = (accessToken) => {
    Cookies.set('token', accessToken);
    setToken(accessToken);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setToken('');
  };

  return (
    <div className='App'>
      <Router>
        <Navigation token={token} handleLogout={handleLogout} />
        <Routes>
          <Route path='/' element={<TimerPage />} />
          <Route path='/login' element={<LoginPage handleLogin={handleLogin} />} />
          <Route path='/register' element={<RegisterPage handleLogin={handleLogin} />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
