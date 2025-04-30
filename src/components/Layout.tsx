import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Footprints, Menu } from 'lucide-react';

const Layout: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f0e6]">
      <header className="sticky top-0 z-50 bg-[#10142a] bg-opacity-90 text-white">
        <div className="max-w-[1440px] mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-[#cba95b] hover:text-white transition-colors">
            <Footprints size={24} />
            <h1 className="text-xl font-semibold">Walking the Text</h1>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-[#cba95b] transition-colors">Home</Link>
            <Link to="/theory" className="hover:text-[#cba95b] transition-colors">Theory</Link>
            <Link to="/about" className="hover:text-[#cba95b] transition-colors">About</Link>
            <Link to="/works" className="hover:text-[#cba95b] transition-colors">Works Cited</Link>
          </div>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
      
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#10142a] bg-opacity-95 md:hidden">
          <div className="flex flex-col items-center justify-center h-full">
            <button 
              className="absolute top-4 right-4 text-white"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <Menu size={24} />
            </button>
            <nav className="flex flex-col items-center space-y-8 text-xl text-white">
              <Link 
                to="/" 
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#cba95b] transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/theory" 
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#cba95b] transition-colors"
              >
                Theory
              </Link>
              <Link 
                to="/about" 
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#cba95b] transition-colors"
              >
                About
              </Link>
              <Link 
                to="/works" 
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#cba95b] transition-colors"
              >
                Works Cited
              </Link>
            </nav>
          </div>
        </div>
      )}
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <footer className="bg-[#1c2340] text-white py-6">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-sm text-center">
            <p>Walking the Text: Jewish Steps through Solnit, Debord & de Certeau</p>
            <p className="mt-2">Creative Commons CC BY-NC-SA 4.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;