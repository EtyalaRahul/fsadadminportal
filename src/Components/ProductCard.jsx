import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ image, name, description, originalPrice, discountedPrice, discountPercentage, productType }) => {
    return (
        <div className="product-card" style={styles.card}>
            <img src={image} alt={name} style={styles.image} />
            <h3>{name}</h3>
            <p>{description}</p>
            <p style={styles.price}>
                <span style={styles.discountedPrice}>₹{discountedPrice}</span>
                <span style={styles.originalPrice}>₹{originalPrice}</span>
            </p>
            <p style={styles.discount}> {discountPercentage}% off</p>
            <p>{productType}</p>
        </div>
    );
};

ProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    originalPrice: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number.isRequired, // ✅ added this
    discountPercentage: PropTypes.number.isRequired,
};

const styles = {
    card: {
        width: '200px',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        marginBottom: '20px',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '10px',
    },
    price: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '10px',
    },
    discountedPrice: {
        color: '#28a745',
    },
    originalPrice: {
        textDecoration: 'line-through',
        color: '#999',
        marginLeft: '10px',
    },
    discount: {
        color: '#ff4500',
        fontSize: '14px',
        fontWeight: 'bold',
        marginTop: '5px',
    }
};

export default ProductCard;
