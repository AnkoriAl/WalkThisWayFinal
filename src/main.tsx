import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CardPage from './pages/CardPage';
import TheoryPage from './pages/TheoryPage';
import AboutPage from './pages/AboutPage';
import WorksCitedPage from './pages/WorksCitedPage';
import './index.css';

// Update document title
document.title = "Walking the Text: Jewish Steps through Solnit, Debord & de Certeau";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/card/:slug" element={<CardPage />} />
          <Route path="/theory" element={<TheoryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/works" element={<WorksCitedPage />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);