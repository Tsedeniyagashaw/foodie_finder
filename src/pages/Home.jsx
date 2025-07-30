import { useEffect, useState } from 'react'

import {
  searchMeals,
  getCategories,
  filterByCategory,
  getRandomMeal,
} from '../services/mealApi'
import SearchBar from '../components/SearchBar'
import MealCard from '../components/MealCard'

export default function Home() {
  const [query, setQuery] = useState('')
  const [meals, setMeals] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await getCategories()
        setCategories(categoryRes.data.categories)

        const randomMeals = []
        for (let i = 0; i < 10; i++) {
          const res = await getRandomMeal()
          if (res.data.meals && res.data.meals[0]) {
            randomMeals.push(res.data.meals[0])
          }
        }
        setMeals(randomMeals)
      } catch{
        setError('Failed to load meals. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await searchMeals(query)
      setMeals(res.data.meals || [])
    } catch {
      setError('Search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCategory = async (cat) => {
    setLoading(true)
    setError('')
    try {
      const res = await filterByCategory(cat)
      setMeals(res.data.meals || [])
    } catch {
      setError('Category fetch failed.')
    } finally {
      setLoading(false)
    }
  }

  const handleRandom = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getRandomMeal()
      setMeals([res.data.meals[0]])
    } catch {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="relative z-10">
        <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
      </div>

      <div className="px-4 md:px-16 mt-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.idCategory}
              onClick={() => handleCategory(cat.strCategory)}
              className="px-4 py-1.5 bg-white border border-red-300 rounded-full text-sm font-semibold shadow-sm hover:bg-red-100 transition"
            >
              {cat.strCategory}
            </button>
          ))}
          <button
            onClick={handleRandom}
            className="px-4 py-1.5 bg-red-100 text-red-800 rounded-full text-sm font-semibold hover:bg-red-200 transition"
          >
            Surprise Meal🎉
          </button>
        </div>
      </div>

      <div className="px-4 md:px-16 mt-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-dashed border-red-400 rounded-full animate-spin" />
            <p className="mt-4 text-gray-500">Loading meals...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 font-medium mt-10">
            {error}
          </div>
        ) : meals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-10">
            {meals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-gray-600 mt-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10437/10437090.png"
              alt="No result"
              className="w-20 h-20 mb-4 opacity-70"
            />
            <p className="text-lg font-medium">No meals found.</p>
            <p className="text-sm mt-1">Try a different search term or refresh.</p>
          </div>
        )}
      </div>
    </div>
  )
}
