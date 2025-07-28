import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, HeartIcon } from 'lucide-react'


export default function MealCard({ meal }) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || []
    setIsFavorite(favs.some((m) => m.idMeal === meal.idMeal))
  }, [meal.idMeal])

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || []
    const alreadyFav = favs.some((m) => m.idMeal === meal.idMeal)
    let updatedFavs

    if (alreadyFav) {
      updatedFavs = favs.filter((m) => m.idMeal !== meal.idMeal)
    } else {
      updatedFavs = [...favs, meal]
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavs))
    setIsFavorite(!alreadyFav)
  }

  return (
    <div className="bg-white shadow-md border border-red-150 rounded overflow-hidden relative">
      <Link to={`/meal/${meal.idMeal}`}>
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-53 object-cover" />
        <div className="p-4">
            <hr class="w-15 bg-red-500 h-0.5" />
          <h2 className="text-lg text-red-600 text-center font-bold">{meal.strMeal}</h2>
        </div>
      </Link>
 <button onClick={toggleFavorite} className="absolute top-2 right-2 p-1">
  <Heart
    className="w-5 h-5"
    stroke="red"
    fill={isFavorite ? 'red' : 'none'}
  />
</button>
    </div>
  )
}
