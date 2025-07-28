import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMealById } from '../services/mealApi'

export default function MealDetail() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)

  useEffect(() => {
    getMealById(id).then(res => setMeal(res.data.meals[0]))
  }, [id])

  if (!meal) return <p className="text-center mt-20 text-gray-500 text-lg">Loading...</p>

  return (
    <div className="p-5 md:p-10 max-w-7xl mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-red-600 mb-8">{meal.strMeal}</h2>

      <div className="flex flex-col md:flex-row gap-8 items-start">
  
        <div className="w-full md:w-1/4">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>

 
        <div className="w-full md:w-3/4 text-gray-800">
          <p className="mb-2"><span className="font-semibold">Category:</span> {meal.strCategory}</p>
          <p className="mb-2"><span className="font-semibold">Origin:</span> {meal.strArea}</p>
          <span className="font-semibold text-red-600">Instruction</span><p className="mt-4 leading-relaxed text-sm">{meal.strInstructions}</p>
        </div>
      </div>

 {meal.strYoutube && (
  <div className="mt-12 w-full">
    <h3 className="text-2xl font-semibold mb-4 text-red-600">Watch Recipe</h3>
    <div className="w-full md:w-4/5  h-[400px] rounded-lg overflow-hidden shadow-md">
      <iframe
        src={`https://www.youtube.com/embed/${meal.strYoutube.split('=')[1]}`}
        title="YouTube video"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  </div>
)}

    </div>
  )
}
