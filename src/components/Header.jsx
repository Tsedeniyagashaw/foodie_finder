import { Link, useLocation } from 'react-router-dom'
import { Pizza } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-black shadow p-4 md:p-6 flex justify-between items-center relative">
      <Link
        to="/"
        className="flex items-center gap-3 text-2xl font-extrabold text-white hover:opacity-90 transition"
        aria-label="Foodie Finder Home"
      >
        <Pizza className="w-7 h-7 text-red-600" />
        Foodie Finder
      </Link>

   
      <nav className="hidden md:flex space-x-6" aria-label="Primary navigation">
        <Link
          to="/"
          className={`text-lg font-semibold transition 
            ${
              isActive('/')
                ? 'text-white underline'
                : 'text-red-500 hover:text-white hover:underline'
            }`}
        >
          Home
        </Link>
        <Link
          to="/favorites"
          className={`text-lg font-semibold transition 
            ${
              isActive('/favorites')
                ? 'text-white underline'
                : 'text-red-500 hover:text-white hover:underline'
            }`}
        >
          Favorites
        </Link>
      </nav>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-red-500 "
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile nav menu */}
      {isOpen && (
        <nav className="absolute top-full right-0 mt-2 w-40 bg-black rounded shadow-md flex flex-col z-50">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2 transition 
              ${
                isActive('/')
                  ? 'text-white underline'
                  : 'text-red-500 hover:text-white hover:underline'
              }`}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2 transition 
              ${
                isActive('/favorites')
                  ? 'text-white underline'
                  : 'text-red-500 hover:text-white hover:underline'
              }`}
          >
            Favorites
          </Link>
        </nav>
      )}
    </header>
  )
}
