import React, { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              <Link to="/">Blog Demo</Link>
            </h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link 
                    to="/" 
                    className={`px-3 py-2 rounded-md ${location.pathname === '/' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/create" 
                    className={`px-3 py-2 rounded-md ${location.pathname === '/create' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    Create Post
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-100 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">© 2026 Blog Demo</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;