import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './LoginForm';

// PUBLIC_INTERFACE
const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Dummy login handler can be replaced with real login API in the future
  // PUBLIC_INTERFACE
  const handleLogin = (credentials: { usernameOrEmail: string; password: string }) => {
    // For now, simply output to console (replace with API logic later)
    // eslint-disable-next-line no-console
    console.log('Login attempt:', credentials);
  };

  return (
    <div className="App">
      <header className="App-header" style={{ padding: 0, justifyContent: "flex-start", minHeight: "100vh" }}>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <LoginForm onLogin={handleLogin} />
      </header>
    </div>
  );
};

export default App;
