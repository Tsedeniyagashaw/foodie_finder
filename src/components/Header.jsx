import { Link } from 'react-router-dom'
import { Pizza } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-black shadow p-6  flex justify-between items-center">
      <Link
        to="/"
        className="flex items-center gap-3 text-2xl font-extrabold text-white hover:opacity-90 transition"
      >
        <Pizza className="w-7 h-7 text-red-600" />
        Foodie Finder
      </Link>
      
      <nav className="space-x-6">
        <Link
          to="/"
          className="text-red-500 text-lg font-semibold hover:underline hover:text-white transition"
        >
          Home
        </Link>
        <Link
          to="/favorites"
          className="text-red-500 text-lg font-semibold hover:underline hover:text-white transition"
        >
          Favorites
        </Link>
      </nav>
    </header>
  )
}
