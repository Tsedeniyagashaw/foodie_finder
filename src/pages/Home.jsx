import { useEffect, useState } from 'react'
import { searchMeals, getCategories, filterByCategory, getRandomMeal } from '../services/mealApi'
import SearchBar from '../components/SearchBar'
import MealCard from '../components/MealCard'

export default function Home() {
  const [query, setQuery] = useState('')
  const [meals, setMeals] = useState([])
  const [categories, setCategories] = useState([])
  

 useEffect(() => {
  getCategories().then(res => setCategories(res.data.categories))

 
  const fetchRandomMeals = async () => {
    const randomMeals = []
    for (let i = 0; i < 11; i++) {
      const res = await getRandomMeal()
      if (res.data.meals && res.data.meals[0]) {
        randomMeals.push(res.data.meals[0])
      }
    }
    setMeals(randomMeals)
  }

  fetchRandomMeals()
}, [])


  const handleSearch = async (e) => {
    e.preventDefault()
    const res = await searchMeals(query)
    setMeals(res.data.meals || [])
  }

  const handleCategory = async (cat) => {
    const res = await filterByCategory(cat)
    setMeals(res.data.meals || [])
  }

  const handleRandom = async () => {
    const res = await getRandomMeal()
    setMeals([res.data.meals[0]])
  }

  return (
 <div className="min-h-screen bg-gray-50">
  <div className="relative">
    <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
  </div>


  <div className="px-4 md:px-20 mt-6">
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map(cat => (
        <button
          key={cat.idCategory}
          onClick={() => handleCategory(cat.strCategory)}
          className="px-4 py-1.5 bg-white border border-red-300 rounded-full text-sm font-medium shadow-sm hover:bg-red-100 transition"
        >
          {cat.strCategory}
        </button>
      ))}
      <button
        onClick={handleRandom}
        className="px-4 py-1.5 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200 transition"
      >
        Random Meal
      </button>
    </div>
  </div>

  <div className="px-4 md:px-20 mt-10">
    {meals.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-12">
        {meals.map(meal => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500 text-lg mt-10">No meals found.</p>
    )}
  </div>
</div>

  )
}
