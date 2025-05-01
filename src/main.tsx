import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div style={{ padding: '2rem', color: 'black', fontFamily: 'sans-serif' }}>
      <h1>Welcome to Walking the Text</h1>
      <p>This is a live preview of your deployed site.</p>
      <p>If you're seeing this, your Vite app has deployed correctly to GitHub Pages.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);