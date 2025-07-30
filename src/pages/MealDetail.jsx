import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMealById, getMealsByCategory } from '../services/mealApi'
import MealCard from '../components/MealCard'
import { UtensilsCrossed, Globe } from 'lucide-react'

export default function MealDetail() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [relatedMeals, setRelatedMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    getMealById(id)
      .then(res => {
        const fetchedMeal = res.data.meals?.[0]
        if (!fetchedMeal) {
          setError("Meal not found.")
          return
        }
        setMeal(fetchedMeal)

        return getMealsByCategory(fetchedMeal.strCategory)
      })
      .then(res => {
        if (res?.data?.meals) {
          const filtered = res.data.meals.filter(m => m.idMeal !== id)
          setRelatedMeals(filtered.slice(0, 6))
        }
      })
      .catch(() => {
        setError("Something went wrong while fetching data.")
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-solid"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg mt-20 font-medium">
        {error}
      </div>
    )
  }

 return (
  <>

    <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto bg-yellow-50 shadow-lg rounded-xl font-inter text-gray-800">
      <h2 className="text-4xl md:text-5xl font-extrabold text-left text-red-600 mb-10 tracking-tight">
        {meal.strMeal}
      </h2>

    
      <div className="flex flex-col md:flex-row gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[600px]">

        <div className="md:w-1/3 flex flex-col gap-8">
      
          <div className="rounded-lg shadow-md overflow-hidden flex-shrink-0">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          <div className="flex gap-4">
           
            <div className="flex items-center gap-3 bg-gray-50 rounded-md p-4 shadow-sm flex-1">
              <UtensilsCrossed className="text-red-500 w-5 h-5" />
              <p className="text-base text-gray-800 font-medium">{meal.strCategory}</p>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 rounded-md p-4 shadow-sm flex-1">
              <Globe className="text-red-500 w-5 h-5" />
              <p className="text-base text-gray-800 font-medium">{meal.strArea}</p>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto max-h-[350px]">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ingredients</h2>
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 20 }, (_, i) => {
                const ingredient = meal[`strIngredient${i + 1}`]
                const measure = meal[`strMeasure${i + 1}`]
                return (
                  ingredient &&
                  ingredient.trim() && (
                    <span
                      key={i}
                      className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full border border-amber-300 shadow-sm"
                    >
                      {measure} {ingredient}
                    </span>
                  )
                )
              })}
            </div>
          </div>
        </div>

        <div className="md:w-2/3 flex flex-col flex-grow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Instructions</h2>
          <div className="bg-gray-50 rounded-md p-5 shadow-sm text-gray-700 flex-grow overflow-y-auto">
            {meal.strInstructions
              .split(/(?:\r?\n|\.\s+)/)
              .filter(Boolean)
              .map((step, idx) => (
                <p key={idx} className="mb-4 leading-relaxed text-justify">
                  <span className="font-semibold text-red-600 mr-2">Step {idx + 1}:</span>
                  {step.trim()}
                  {step.trim().endsWith('.') ? '' : '.'}
                </p>
              ))}
          </div>
        </div>
      </div>

      {meal.strYoutube && (
        <div className="mt-14 max-w-4xl">
          <h3 className="text-2xl font-semibold text-red-600 mb-4 text-left">Watch Recipe</h3>
          <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-md">
            <iframe
              src={`https://www.youtube.com/embed/${meal.strYoutube.split('=')[1]}`}
              title="YouTube video"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>

    <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h3 className="text-2xl font-semibold text-red-600 mb-6">Related Meals</h3>
      {relatedMeals.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {relatedMeals.map(m => (
            <MealCard key={m.idMeal} meal={m} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No related meals found.</p>
      )}
    </div>
  </>
)

}
