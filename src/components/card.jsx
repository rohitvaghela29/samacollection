import React, { useState } from "react";
import "../styles/card.css";
import cartIcon from "../assets/shopping-bag.png";

const Card = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "M");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdded(true);
    if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedSize,
      });
    }
    setTimeout(() => {
      setIsAdded(false);
    }, 1400);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="product-card">
      {/* Product Image Container */}
      <div className="card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="card-image"
          loading="lazy"
        />

        {/* Product Badges */}
        <div className="card-badges">
          {product.tag && (
            <span className={`card-badge badge--${product.tag.toLowerCase().replace(/\s+/g, "-")}`}>
              {product.tag}
            </span>
          )}
          {product.discount && (
            <span className="card-badge badge--discount">
              {product.discount}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          className={`card-wishlist-btn ${isWishlisted ? "is-active" : ""}`}
          onClick={toggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg
            viewBox="0 0 24 24"
            className="wishlist-icon"
            fill={isWishlisted ? "#e05353" : "none"}
            stroke={isWishlisted ? "#e05353" : "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        {/* Quick Add Overlay on Hover (Desktop) */}
        <div className="card-quick-actions">
          <button
            type="button"
            className={`btn-quick-add ${isAdded ? "btn-quick-add--added" : ""}`}
            onClick={handleAddToCart}
          >
            <img src={cartIcon} alt="" className="quick-add-icon" />
            <span>{isAdded ? "Added to Bag!" : "Quick Add"}</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="card-content">
        <div className="card-meta">
          <span className="card-category">{product.category}</span>
          <div className="card-rating">
            <span className="star-icon">&#9733;</span>
            <span className="rating-score">{product.rating}</span>
            <span className="rating-count">({product.reviews})</span>
          </div>
        </div>

        <h3 className="card-title" title={product.name}>
          {product.name}
        </h3>

        {/* Size Selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="card-sizes">
            <span className="size-label">Size:</span>
            <div className="size-pill-list">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-pill ${selectedSize === size ? "is-selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pricing & Add Button */}
        <div className="card-footer">
          <div className="card-pricing">
            <span className="current-price">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && (
              <span className="original-price">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <button
            type="button"
            className={`btn-card-add ${isAdded ? "btn-card-add--success" : ""}`}
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to shopping bag`}
          >
            {isAdded ? "Added ✓" : "Add to Bag"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
