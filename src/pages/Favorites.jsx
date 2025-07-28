import { useEffect, useState } from 'react'
import MealCard from '../components/MealCard'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(favs)
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold  text-center mb-4">Your Favorite Meals</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map(meal => <MealCard key={meal.idMeal} meal={meal} />)}
        </div>
      ) : (
        <p className="text-center text-gray-500">You haven't added any favorites yet.</p>
      )}
    </div>
  )
}
