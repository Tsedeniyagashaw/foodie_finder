import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MealCard from '../components/MealCard'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('favorites')) || []
      setFavorites(favs)
    } catch (err) {
      console.error("Error fetching favorites:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-[60vh]">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-red-600">Your Favorite Meals</h1>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading your favorite meals...</p>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map(meal => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg">🍽️ You haven't added any favorites yet.</p>
          <p className="text-sm mt-2 mb-4">Explore meals and click the ❤️ icon to save them here!</p>

          <Link
            to="/"
            className="inline-block bg-red-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Explore Meals
          </Link>
        </div>
      )}
    </div>
  )
}
