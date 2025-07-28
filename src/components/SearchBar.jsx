import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

export default function SearchBanner({ value, onChange, onSubmit }) {
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
        setMeal(response.data.meals[0]);
      } catch (error) {
        console.error("Error fetching meal:", error);
      }
    }

    fetchMeal();
  }, []);

  return (
    <div className="relative w-full h-[200px]">
      {meal && (
         <img
        src="https://www.themealdb.com/images/media/meals/vtqxtu1511784197.jpg"
        alt="Spaghetti Bolognese"
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <h2 className="text-white text-3xl font-bold mb-4 drop-shadow-lg">Find Your Favorite Meal</h2>
     <form onSubmit={onSubmit} className="w-full max-w-xl mx-auto px-4 py-6">
      <div className="relative">
  
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-white opacity-70" />
        </div>

  
        <input
          type="search"
          className="block w-full p-4 pl-10 text-sm text-white border border-white/30 rounded-full bg-transparent backdrop-blur-sm placeholder-white/70 focus:ring-white focus:border-white"
          placeholder="Search meals..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

    
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </form>

      </div>
    </div>
  );
}
