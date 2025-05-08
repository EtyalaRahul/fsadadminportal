import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import ProductCard from './Components/ProductCard';

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
    <>
      <Navbar />
      <div className="product-container">
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
      </div>
    </>
  );
}

export default App;
