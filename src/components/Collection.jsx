import React, { useState, useEffect, useMemo } from "react";
import Card from "./card";
import "../styles/Collection.css";

const PRODUCTS_DATA = [
  {
    id: 101,
    name: "Gulmohar Chanderi Silk Anarkali Kurti",
    category: "Kurtis",
    price: 1899,
    originalPrice: 2499,
    discount: "24% OFF",
    rating: 4.9,
    reviews: 142,
    tag: "Bestseller",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 102,
    name: "Sama Vintage Heavy Rayon Printed Co-ord Set",
    category: "Co-ord Sets",
    price: 2199,
    originalPrice: 2999,
    discount: "26% OFF",
    rating: 4.9,
    reviews: 210,
    tag: "Bestseller",
    sizes: ["M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 103,
    name: "Zahra Hand-Block Printed Cotton Straight Kurti",
    category: "Kurtis",
    price: 1249,
    originalPrice: 1799,
    discount: "30% OFF",
    rating: 4.8,
    reviews: 88,
    tag: "Trending",
    sizes: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 104,
    name: "Ivory Schiffli Embroidered Cotton Flared Palazzo",
    category: "Bottom Wear",
    price: 1199,
    originalPrice: 1599,
    discount: "25% OFF",
    rating: 4.9,
    reviews: 180,
    tag: "Bestseller",
    sizes: ["Free Size", "M", "XL"],
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 105,
    name: "Summer Breathable Pure Cotton 2-Piece Co-ord Set",
    category: "Co-ord Sets",
    price: 1699,
    originalPrice: 2299,
    discount: "26% OFF",
    rating: 4.8,
    reviews: 95,
    tag: "Trending",
    sizes: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 106,
    name: "Ikat Yoke Cotton Peplum Tunic Top",
    category: "T-shirts & Tops",
    price: 849,
    originalPrice: 1199,
    discount: "29% OFF",
    rating: 4.8,
    reviews: 114,
    tag: "Trending",
    sizes: ["XS", "S", "M", "L"],
    image:
      "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 107,
    name: "Noor Embroidered Muslin Short Kurti",
    category: "Kurtis",
    price: 999,
    originalPrice: 1399,
    discount: "28% OFF",
    rating: 4.7,
    reviews: 64,
    tag: "New Season",
    sizes: ["S", "M", "L"],
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 108,
    name: "Stretch Tailored Cigarette Pants with Lace Hem",
    category: "Bottom Wear",
    price: 999,
    originalPrice: 1399,
    discount: "28% OFF",
    rating: 4.8,
    reviews: 102,
    tag: "Trending",
    sizes: ["28", "30", "32", "34", "36"],
    image:
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 109,
    name: "Minimalist Embroidered Rayon Everyday Top",
    category: "T-shirts & Tops",
    price: 799,
    originalPrice: 1099,
    discount: "27% OFF",
    rating: 4.7,
    reviews: 76,
    tag: "New Season",
    sizes: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 110,
    name: "Monochrome Geometric Rayon Tunic & Trouser Set",
    category: "Co-ord Sets",
    price: 1899,
    originalPrice: 2599,
    discount: "27% OFF",
    rating: 4.6,
    reviews: 52,
    tag: "New Season",
    sizes: ["M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80",
  },
];

const CATEGORIES = [
  "All",
  "Kurtis",
  "Co-ord Sets",
  "T-shirts & Tops",
  "Bottom Wear",
];

const Collection = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [addedNotification, setAddedNotification] = useState(null);
  const [productsData, setProductsData] = useState(PRODUCTS_DATA);

  // Fetch products from API, fallback to hardcoded data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProductsData(data);
          }
        }
      } catch {
        // API unavailable (local dev without serverless), keep hardcoded data
      }
    };
    fetchProducts();
  }, []);


  // Handle add to cart with toast notification
  const handleItemAdded = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    setAddedNotification(product);
    setTimeout(() => {
      setAddedNotification(null);
    }, 2800);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = productsData;

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    const sorted = [...result];
    if (sortBy === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    return sorted;
  }, [activeCategory, sortBy, productsData]);

  return (
    <section className="collection-section" id="collection">
      {/* Toast Notification when adding item */}
      {addedNotification && (
        <div className="collection-toast">
          <span className="toast-check">✓</span>
          <div className="toast-text">
            <strong>{addedNotification.name}</strong> added to shopping bag!
          </div>
        </div>
      )}

      <div className="collection-container">
        {/* Section Header */}
        <div className="collection-header">
          <div className="collection-header-text">
            <span className="collection-eyebrow">Handcrafted Elegance</span>
            <h2 className="collection-title">The Sama Collection</h2>
            <p className="collection-description">
              Explore our curated showcase of artisan Kurtis, premium Rayon
              co-ord sets, stylish tops, and versatile bottom wear crafted for
              grace and timeless comfort.
            </p>
          </div>
        </div>

        {/* Filter Controls & Sorting Toolbar */}
        <div className="collection-toolbar">
          {/* Category Tabs */}
          <div className="category-tabs" role="tablist">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`category-tab ${activeCategory === cat ? "is-active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span>{cat}</span>
                {cat === "All" ? (
                  <span className="tab-count">{productsData.length}</span>
                ) : (
                  <span className="tab-count">
                    {productsData.filter((p) => p.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Sort & Count */}
          <div className="toolbar-sort-wrap">
            <span className="product-count-label">
              Showing <strong>{filteredProducts.length}</strong> items
            </span>
            <div className="sort-dropdown-wrap">
              <label htmlFor="sort-select" className="sort-label">
                Sort by:
              </label>
              <select
                id="sort-select"
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              product={product}
              onAddToCart={handleItemAdded}
            />
          ))}
        </div>

        {/* Spotlight Banner / Brand Feature */}
        <div className="collection-spotlight">
          <div className="spotlight-content">
            <span className="spotlight-tag">Artisan Heritage</span>
            <h3 className="spotlight-title">Custom Tailoring &amp; Bulk Enquiries</h3>
            <p className="spotlight-desc">
              Looking for tailored sizes, customized embroidery, or festive bulk orders?
              Our in-house master artisans bring your dream wardrobe to life.
            </p>
            <a href="#about" className="btn-spotlight">
              Connect With Our Stylist
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
