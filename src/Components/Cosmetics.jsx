import React from 'react';
import ProductCard from './ProductCard';

function Cosmetics({ products }) {
  return (
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
  );
}

export default Cosmetics;
