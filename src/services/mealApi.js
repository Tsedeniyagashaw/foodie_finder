import axios from 'axios'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export const searchMeals = (query) => axios.get(`${BASE_URL}/search.php?s=${query}`)
export const getMealById = (id) => axios.get(`${BASE_URL}/lookup.php?i=${id}`)
export const getRandomMeal = () => axios.get(`${BASE_URL}/random.php`)
export const getCategories = () => axios.get(`${BASE_URL}/categories.php`)
export const filterByCategory = (cat) => axios.get(`${BASE_URL}/filter.php?c=${cat}`)
export const getMealsByCategory = (category) => {
  return axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
}
