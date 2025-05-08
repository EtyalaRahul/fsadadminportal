import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({
    image,
    name,
    description,
    originalPrice,
    discountedPrice,
    discountPercentage,
    productType
}) => {
    return (
        <div className="product-card" style={styles.card}>
            <img src={image} alt={name} style={styles.image} />
            <h3 style={styles.name}>{name}</h3>
            <p style={styles.description}>{description}</p>
            <p style={styles.price}>
                <span style={styles.discountedPrice}>₹{discountedPrice}</span>
                <span style={styles.originalPrice}>₹{originalPrice}</span>
            </p>
            <p style={styles.discount}>{discountPercentage}% off</p>
            <p style={styles.type}>{productType}</p>
        </div>
    );
};

ProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    originalPrice: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number.isRequired,
    productType: PropTypes.string.isRequired,
};

const styles = {
    card: {
        width: '240px',
        padding: '16px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '12px',
        objectFit: 'cover',
    },
    name: {
        fontSize: '18px',
        margin: '8px 0 4px',
    },
    description: {
        fontSize: '14px',
        color: '#555',
        marginBottom: '8px',
    },
    price: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '6px',
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
        marginTop: '6px',
    },
    type: {
        marginTop: '10px',
        fontSize: '13px',
        color: '#666',
    },
};

// Add this CSS globally or via styled-components or a stylesheet
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
    .product-card:hover {
        transform: scale(1.03);
        box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
`;
document.head.appendChild(styleSheet);

export default ProductCard;
