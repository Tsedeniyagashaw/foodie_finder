import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

export default function SearchBanner({ value, onChange, onSubmit }) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
        setMeal(response.data.meals[0]);
      } catch (error) {
        console.error("Error fetching meal:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMeal();
  }, []);

  return (
    <div className="relative w-full h-[220px] md:h-[280px] lg:h-[320px]">
      {meal && !loading && (
        <>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="absolute inset-0 w-full h-full object-cover brightness-75 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 pointer-events-none" />
        </>
      )}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-lg font-semibold">
          Loading...
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-lg">
          Find Your Favorite Meal
        </h2>
        {meal && !loading && (
          <p className="text-sm sm:text-base text-white/80 italic mb-6 max-w-xl drop-shadow">
            Try searching or get inspired by "{meal.strMeal}" from {meal.strArea}
          </p>
        )}
        <form
          onSubmit={onSubmit}
          className="w-full max-w-xl mx-auto"
          role="search"
          aria-label="Search meals"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="w-5 h-5 text-white opacity-70" />
            </div>
            <input
              type="search"
              className="block w-full p-4 pl-12 text-sm sm:text-base text-white rounded-full bg-black/30 backdrop-blur-sm placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              placeholder="Search meals by ingredient, country, or name..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              aria-label="Search meals"
              spellCheck="false"
              autoComplete="off"
            />
           <button
  type="submit"
  className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 font-semibold rounded-full text-xs sm:text-sm px-4 py-1.5 text-white shadow-lg transition"
  aria-label="Submit search"
>
  Search
</button>

          </div>
        </form>
      </div>
    </div>
  );
}
