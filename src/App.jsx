import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MealDetail from './pages/MealDetail'
import Header from './components/Header'
import Footer from './components/Footer';
import Favorites from './pages/Favorites'


function App() {
  return (
    <BrowserRouter>
      <Header />
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetail />} />
         <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
