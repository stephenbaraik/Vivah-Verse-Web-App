import React from 'react';
import ReactDOM from 'react-dom/client';

export const TestApp: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(-45deg, #fffbfd, #fff0f6, #fbf7f0, #fff9f0)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Outfit, sans-serif',
      color: '#4A0E28'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Vivah Verse</h1>
      <p style={{ fontSize: '1.2rem' }}>Test Page - If you see this, React is working!</p>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <TestApp />
    </React.StrictMode>
  );
  console.log('React rendered successfully!');
}

