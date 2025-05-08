import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCard from './Components/ProductCard';
import Home from './Components/Home';
import FarmFresh from './Components/FarmFresh';
import Cleaners from './Components/Cleaners';
import Cosmetics from './Components/Cosmetics';
import DailyBasket from './Components/DailyBasket';
import Decoratives from './Components/Decoratives';
import Electronics from './Components/Electronics';

function App() {
  // States for different product categories
  const [farmFreshProducts, setFarmFreshProducts] = useState([]);
  const [cleanersProducts, setCleanersProducts] = useState([]);
  const [cosmeticsProducts, setCosmeticsProducts] = useState([]);
  const [dailyBasketProducts, setDailyBasketProducts] = useState([]);
  const [decorativesProducts, setDecorativesProducts] = useState([]);
  const [electronicsProducts, setElectronicsProducts] = useState([]);

  // Fetching data for each category
  useEffect(() => {
    fetch("http://localhost:8080/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        // Categorize products based on their type
        setFarmFreshProducts(data.filter(product => product.productType === 'FarmFresh'));
        setCleanersProducts(data.filter(product => product.productType === 'Cleaners'));
        setCosmeticsProducts(data.filter(product => product.productType === 'Cosmetics'));
        setDailyBasketProducts(data.filter(product => product.productType === 'DailyBasket'));
        setDecorativesProducts(data.filter(product => product.productType === 'Decoratives'));
        setElectronicsProducts(data.filter(product => product.productType === 'Electronics'));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/farmfresh"
          element={<FarmFresh products={farmFreshProducts} />}
        />
        <Route
          path="/cleaners"
          element={<Cleaners products={cleanersProducts} />}
        />
        <Route
          path="/cosmetics"
          element={<Cosmetics products={cosmeticsProducts} />}
        />
        <Route
          path="/dailybasket"
          element={<DailyBasket products={dailyBasketProducts} />}
        />
        <Route
          path="/decoratives"
          element={<Decoratives products={decorativesProducts} />}
        />
        <Route
          path="/electronics"
          element={<Electronics products={electronicsProducts} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
