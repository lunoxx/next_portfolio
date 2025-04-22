// components/Header.js
import { useState } from 'react';
import Link from 'next/link';

const Header = ({ constants }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-slate-900 text-gray-100">
      <div className="mx-auto max-w-screen-lg px-3 py-6">
        <div className="flex flex-row justify-between items-center gap-y-3">
          {/* Logo */}
            <Link href="/" className="flex items-center bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
              <svg
                className="mr-1 h-10 w-10 stroke-cyan-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none"></path>
                <rect x="3" y="12" width="6" height="8" rx="1"></rect>
                <rect x="9" y="8" width="6" height="12" rx="1"></rect>
                <rect x="15" y="4" width="6" height="16" rx="1"></rect>
                <path d="M4 20h14"></path>
              </svg>
              {constants.SEO.nav_title}
          </Link>

          {/* Navbar buttons */}
          <nav>
            {/* Desktop navigation */}
            <div className="sm:hidden z-10">
              <button onClick={toggleMenu}>
                <i className="fa-solid fa-bars text-sky-400 mt-1" id="toggleButton"></i>
              </button>
            </div>
            <ul className="hidden sm:flex gap-x-3 font-medium text-gray-200">
              <li className="hover:text-white">
                <Link href="/projects">Projects</Link>
              </li>
              <li className="hover:text-white">
                <Link href={constants.author.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile navigation */}
          {isMobileMenuOpen && (
            <div className="sm:hidden absolute top-16 right-0 z-10 w-2/3 h-full backdrop-blur-3xl bg-sky-900/5" id="nav_panel">
              <ul className="p-2">
                <li className="hover:bg-slate-300/30 focus:ring-4 focus:outline-none focus:ring-gray-800 text-white backdrop-blur-xl bg-slate-100/5 shadow-sm">
                  <button
                    className="w-full text-left"
                    onClick={() => location.href = '/projects'}
                  >
                    <i className="bg-slate-100/10 w-12 fa-solid fa-list-check opacity-80 p-4"></i>
                    <span className="px-3">Projects</span>
                  </button>
                </li>
                <li className="hover:bg-slate-300/30 focus:ring-4 focus:outline-none focus:ring-gray-800 text-white backdrop-blur-xl bg-slate-100/5 shadow-sm mt-1">
                  <button
                    className="w-full text-left"
                    onClick={() => window.open(constants.author.github, '_blank')}
                  >
                    <i className="bg-slate-100/10 w-12 fa-brands fa-github opacity-80 p-4"></i>
                    <span className="px-3">GitHub</span>
                  </button>
                </li>
                <li className="hover:bg-slate-300/30 focus:ring-4 focus:outline-none focus:ring-gray-800 text-white backdrop-blur-xl bg-slate-100/5 shadow-sm mt-1">
                  <button
                    className="w-full text-left"
                    onClick={() => location.href = '/contact'}
                  >
                    <i className="bg-slate-100/10 w-12 fa-regular fa-comments opacity-80 p-4"></i>
                    <span className="px-3">Contact</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;