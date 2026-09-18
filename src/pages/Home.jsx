import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Collection from "../components/Collection";
import About from "../components/about";
import "../styles/Home.css";



const INITIAL_CART_ITEMS = [
  {
    id: 101,
    name: "Gulmohar Chanderi Silk Anarkali Kurti",
    price: 1899,
    quantity: 1,
    category: "Kurtis",
  },
  {
    id: 102,
    name: "Sama Vintage Heavy Rayon Co-ord Set",
    price: 2199,
    quantity: 1,
    category: "Co-ord Sets",
  },
];

const Home = () => {
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          category: product.category,
        },
      ];
    });
  };

  return (
    <div className="home-container">
      {/* 1. Navbar at top of the page with synchronized cart */}
      <Navbar
        cartItems={cartItems}
        onUpdateCart={setCartItems}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Main Page Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section" id="home">
          <div className="hero-pattern"></div>
          <div className="hero-content">
            <span className="hero-tagline">Exclusively Curated &bull; SS 2026</span>
            <h1 className="hero-title">
              Sama Collections, <br />
              Where <br />
              <em>Tradition meets modern grace</em>
            </h1>
            <p className="hero-subtitle">
              Immerse yourself in modern luxury. Explore handcrafted Kurtis,
              exclusive co-ord sets, and tailored essentials designed for discerning
              tastes.
            </p>
            <div className="hero-actions">
              <a href="#collection" className="btn-primary">
                Explore Collection
              </a>
              <a href="#about" className="btn-outline">
                View Lookbook
              </a>
            </div>
          </div>
        </section>

        {/* Brand Values Strip */}
        <section className="values-strip">
          <div className="values-container">
            <div className="value-card">
              <h3 className="value-title">Nationwide Express Delivery</h3>
              <p className="value-desc">
                Complimentary tracked courier shipping on all orders over ₹999.
              </p>
            </div>
            <div className="value-card">
              <h3 className="value-title">Bespoke Craftsmanship</h3>
              <p className="value-desc">
                Meticulously designed with premium silk fabrics and precious stitches.
              </p>
            </div>
            <div className="value-card">
              <h3 className="value-title">Advance Payment</h3>
              <p className="value-desc">
                Secure online UPI &amp; Cards checkout (COD is currently not available).
              </p>
            </div>
          </div>
        </section>

        {/* Featured Categories Strip */}
        <section className="categories-section" id="collections">
          <div className="section-header">
            <span className="section-eyebrow">Signature Curations</span>
            <h2 className="section-title">Explore The Sama Universe</h2>
          </div>

          <div className="categories-grid">
            <article className="category-card">
              <span className="category-badge">Kurtis</span>
              <h3>Short Kurtis &amp; Long Kurtis</h3>
              <p>Flowing silhouettes, hand-draped kurtis, and tailored separates.</p>
              <a href="#collection" className="category-link">
                Shop Kurtis <span>&rarr;</span>
              </a>
            </article>

            <article className="category-card">
              <span className="category-badge">T-shirts</span>
              <h3>T-shirts &amp; Tops</h3>
              <p>Your everyday ethnic essentials and chic tunics.</p>
              <a href="#collection" className="category-link">
                Shop T-shirts &amp; Tops <span>&rarr;</span>
              </a>
            </article>

            <article className="category-card">
              <span className="category-badge">Co-ord Sets</span>
              <h3>Cotton &amp; Heavy Rayon Co-ord Sets</h3>
              <p>The matching set your wardrobe has been waiting for.</p>
              <a href="#collection" className="category-link">
                Shop Co-ord Sets <span>&rarr;</span>
              </a>
            </article>

            <article className="category-card">
              <span className="category-badge">Bottom Wear</span>
              <h3>Jeans, Pants &amp; Palazzo</h3>
              <p>Comfort silhouettes, Schiffli embroidery &amp; tailored trousers.</p>
              <a href="#collection" className="category-link">
                Shop Bottom Wear <span>&rarr;</span>
              </a>
            </article>
          </div>
        </section>

        {/* 2. Interactive Collection Showcase Section */}
        <Collection onAddToCart={handleAddToCart} />

        {/* 3. About Section — Store Info, WhatsApp & Map */}
        <About />
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-brand">SAMA COLLECTION</div>
          <p className="footer-tagline">Artisan Luxury &amp; Modern Haute Couture</p>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Sama Collection. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
