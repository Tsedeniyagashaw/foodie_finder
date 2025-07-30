import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

export default function MealCard({ meal }) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || []
    setIsFavorite(favs.some((m) => m.idMeal === meal.idMeal))
  }, [meal.idMeal])

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || []
    const alreadyFav = favs.some((m) => m.idMeal === meal.idMeal)
    const updatedFavs = alreadyFav
      ? favs.filter((m) => m.idMeal !== meal.idMeal)
      : [...favs, meal]

    localStorage.setItem('favorites', JSON.stringify(updatedFavs))
    setIsFavorite(!alreadyFav)
  }

  return (
    <div className="bg-white shadow-lg border rounded-xl overflow-hidden hover:scale-[1.015] transition-all duration-300 group relative">
      <Link to={`/meal/${meal.idMeal}`}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-52 object-cover group-hover:brightness-90 transition"
        />
        <div className="p-4">
          <hr className="w-10 bg-red-500 h-0.5 mb-2 mx-auto" />
          <h2 className="text-lg text-center text-red-600 font-semibold">
            {meal.strMeal}
          </h2>
        </div>
      </Link>
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3    shadow hover:scale-110 transition"
      >
        <Heart
          className="w-5 h-5"
          stroke="red"
          fill={isFavorite ? 'red' : 'none'}
        />
      </button>
    </div>
  )
}
