import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCard from './Components/ProductCard';
import Home from './Components/Home';
import FarmFresh from './Components/FarmFresh';
import Cleaners from './Components/Cleaners';  // Renamed import
import Cosmetics from './Components/Cosmetics';
import DailyBasket from './Components/DailyBasket';
import Decoratives from './Components/Decoratives';
import Electronics from './Components/Electronics';

function App() {
  const [products, setProducts] = useState([]);

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
        setProducts(data);
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
        <Route path='/farmfresh' element={<FarmFresh />} />
        <Route path='/cleaners' element={<Cleaners />} />
        <Route path='/cosmetics' element={<Cosmetics />} />
        <Route path='/dailybasket' element={<DailyBasket />} />
        <Route path='/decoratives' element={<Decoratives />} />
        <Route path='/electronics' element={<Electronics />} />
      </Routes>
      {/* Show products only on the /farmfresh route */}
      {/* <div className="product-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.productName}
            description={product.subTitle}
            originalPrice={product.originalPrice}
            discountedPrice={product.discountedPrice}
            discountPercentage={product.offerPercentage}
            productType={product.productType}
          />
        ))}
      </div> */}
    </Router>
  );
}

export default App;
