import React, { useState, useEffect, useRef } from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.svg";
import searchIcon from "../assets/search.png";
import userIcon from "../assets/user.png";
import cartIcon from "../assets/shopping-bag.png";

const NAV_LINKS = [
  { name: "Home", href: "#home", active: true },
  { name: "Collections", href: "#collections" },
  { name: "New Arrivals", href: "#new-arrivals", badge: "New" },
  { name: "About", href: "#about" },
];

const SEARCH_SUGGESTIONS = [
  "Silk Evening Dresses",
  "Rose Gold Pendants",
  "Handcrafted Leather Tote",
  "Summer Linen Collection",
  "Velvet Blazer",
];

const SAMPLE_CART_ITEMS = [
  {
    id: 1,
    name: "Rose Gold Mirage Pendant",
    price: 185,
    quantity: 1,
    category: "Fine Jewelry",
  },
  {
    id: 2,
    name: "Sama Signature Silk Dress",
    price: 290,
    quantity: 1,
    category: "Apparel",
  },
];

const Navbar = ({
  cartItems: propCartItems,
  onUpdateCart,
  isCartOpen: propIsCartOpen,
  setIsCartOpen: propSetIsCartOpen,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [internalIsCartOpen, setInternalIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [internalCartItems, setInternalCartItems] = useState(SAMPLE_CART_ITEMS);

  const cartItems = propCartItems !== undefined ? propCartItems : internalCartItems;
  const setCartItems = onUpdateCart || setInternalCartItems;
  const isCartOpen = propIsCartOpen !== undefined ? propIsCartOpen : internalIsCartOpen;
  const setIsCartOpen = propSetIsCartOpen || setInternalIsCartOpen;

  const searchInputRef = useRef(null);
  const userMenuRef = useRef(null);
  const cartDrawerRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Total cart count & subtotal
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Sticky header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Handle outside clicks to close menus & dropdowns
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // User dropdown
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
      // Search dropdown / overlay
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
      // Cart drawer
      if (
        cartDrawerRef.current &&
        !cartDrawerRef.current.contains(event.target) &&
        !event.target.closest(".nav-btn--cart")
      ) {
        setIsCartOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setIsUserMenuOpen(false);
        setIsCartOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsCartOpen]);

  // Lock body scroll when mobile menu or cart is open
  useEffect(() => {
    if (isMobileMenuOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isCartOpen]);

  // Cart item management
  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching Sama Collection for: "${searchQuery}"`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className={`header-wrapper ${isScrolled ? "header--scrolled" : ""}`}>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <p className="announcement-text">
          Complimentary Worldwide Shipping on Orders Over $250 &bull; <span className="announcement-highlight">Discover Spring/Summer 2026</span>
        </p>
      </div>

      {/* Main Navbar */}
      <nav className="navbar" aria-label="Main Navigation">
        <div className="navbar-container">
          {/* Mobile Menu Toggle (Hamburger) */}
          <button
            type="button"
            className={`mobile-toggle-btn ${isMobileMenuOpen ? "is-active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* 1. Shop Logo (Left) */}
          <div className="navbar-brand">
            <a href="/" className="brand-link" aria-label="Sama Collection Home">
              <img
                src={logo}
                alt="Sama Collection"
                className="brand-logo"
                loading="eager"
              />
            </a>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <ul className="navbar-nav" role="menubar">
            {NAV_LINKS.map((link) => (
              <li key={link.name} className="nav-item" role="none">
                <a
                  href={link.href}
                  className={`nav-link ${link.active ? "nav-link--active" : ""}`}
                  role="menuitem"
                >
                  <span>{link.name}</span>
                  {link.badge && <span className="nav-link-badge">{link.badge}</span>}
                </a>
              </li>
            ))}
          </ul>

          {/* 2. Top Right Actions (Search, User, Cart) */}
          <div className="navbar-actions">
            {/* Search Button & Expandable Search Box */}
            <div className="action-item" ref={searchContainerRef}>
              <button
                type="button"
                className={`nav-action-btn nav-btn--search ${isSearchOpen ? "active" : ""}`}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search items"
                title="Search"
                aria-expanded={isSearchOpen}
              >
                <img src={searchIcon} alt="" className="nav-icon" />
              </button>

              {/* Search Dropdown / Floating Search Bar */}
              {isSearchOpen && (
                <div className="search-dropdown" role="dialog" aria-label="Site Search">
                  <form className="search-form" onSubmit={handleSearchSubmit}>
                    <img src={searchIcon} alt="" className="search-input-icon" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      className="search-input"
                      placeholder="Search for dresses, jewelry, bags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        className="search-clear-btn"
                        onClick={() => setSearchQuery("")}
                        aria-label="Clear search input"
                      >
                        &times;
                      </button>
                    )}
                    <button type="submit" className="search-submit-btn">
                      Search
                    </button>
                  </form>

                  <div className="search-suggestions">
                    <span className="suggestions-label">Popular Searches:</span>
                    <div className="suggestions-list">
                      {SEARCH_SUGGESTIONS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          className="suggestion-tag"
                          onClick={() => {
                            setSearchQuery(tag);
                            searchInputRef.current?.focus();
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Account Button & Dropdown */}
            <div className="action-item" ref={userMenuRef}>
              <button
                type="button"
                className={`nav-action-btn nav-btn--user ${isUserMenuOpen ? "active" : ""}`}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="My Account"
                title="Account"
                aria-expanded={isUserMenuOpen}
              >
                <img src={userIcon} alt="" className="nav-icon" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="user-dropdown" role="menu">
                  <div className="user-dropdown-header">
                    <span className="user-welcome">Welcome to Sama</span>
                    <p className="user-subtitle">Access your orders and wishlist</p>
                  </div>
                  <div className="user-dropdown-actions">
                    <button
                      type="button"
                      className="btn-auth-primary"
                      onClick={() => alert("Sign In modal")}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      className="btn-auth-secondary"
                      onClick={() => alert("Register modal")}
                    >
                      Create Account
                    </button>
                  </div>
                  <div className="user-dropdown-divider"></div>
                  <ul className="user-dropdown-links">
                    <li>
                      <a href="#orders" className="user-menu-link">
                        <span>My Orders</span>
                      </a>
                    </li>
                    <li>
                      <a href="#wishlist" className="user-menu-link">
                        <span>Wishlist &amp; Saved</span>
                        <span className="user-menu-count">3</span>
                      </a>
                    </li>
                    <li>
                      <a href="#settings" className="user-menu-link">
                        <span>Account Details</span>
                      </a>
                    </li>
                    <li>
                      <a href="#help" className="user-menu-link">
                        <span>Customer Concierge</span>
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Cart Button with Animated Badge */}
            <div className="action-item">
              <button
                type="button"
                className={`nav-action-btn nav-btn--cart ${isCartOpen ? "active" : ""}`}
                onClick={() => setIsCartOpen(!isCartOpen)}
                aria-label={`Shopping cart with ${cartCount} items`}
                title="Shopping Bag"
                aria-expanded={isCartOpen}
              >
                <img src={cartIcon} alt="" className="nav-icon" />
                {cartCount > 0 && (
                  <span className="cart-badge" aria-hidden="true">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-over Mini Cart Drawer */}
      <div
        className={`cart-drawer-overlay ${isCartOpen ? "is-visible" : ""}`}
        aria-hidden={!isCartOpen}
      >
        <aside
          className={`cart-drawer ${isCartOpen ? "is-open" : ""}`}
          ref={cartDrawerRef}
          role="dialog"
          aria-label="Shopping Cart Drawer"
        >
          <div className="cart-drawer-header">
            <div className="cart-drawer-title-group">
              <h3 className="cart-drawer-title">Shopping Bag</h3>
              <span className="cart-drawer-count">({cartCount} items)</span>
            </div>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart drawer"
            >
              &times;
            </button>
          </div>

          <div className="cart-drawer-body">
            {cartItems.length === 0 ? (
              <div className="cart-empty-state">
                <p>Your shopping bag is empty.</p>
                <button
                  type="button"
                  className="btn-continue-shopping"
                  onClick={() => setIsCartOpen(false)}
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              <ul className="cart-item-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <span className="cart-item-cat">{item.category}</span>
                      <h4 className="cart-item-name">{item.name}</h4>
                      <span className="cart-item-price">${item.price}</span>
                    </div>
                    <div className="cart-item-actions">
                      <div className="qty-controller">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="cart-item-total">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-drawer-footer">
              <div className="cart-subtotal-row">
                <span className="subtotal-label">Subtotal</span>
                <span className="subtotal-amount">${cartSubtotal}</span>
              </div>
              <p className="cart-tax-notice">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                type="button"
                className="btn-checkout"
                onClick={() => alert("Proceeding to checkout...")}
              >
                Proceed to Checkout
              </button>
              <button
                type="button"
                className="btn-view-cart"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`mobile-drawer-backdrop ${isMobileMenuOpen ? "is-visible" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <aside
        className={`mobile-drawer ${isMobileMenuOpen ? "is-open" : ""}`}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-header">
          <img src={logo} alt="Sama Collection" className="mobile-drawer-logo" />
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation"
          >
            &times;
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="mobile-search-wrapper">
          <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
            <img src={searchIcon} alt="" className="mobile-search-icon" />
            <input
              type="text"
              className="mobile-search-input"
              placeholder="Search Sama Collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <ul className="mobile-nav-list">
          {NAV_LINKS.map((link) => (
            <li key={link.name} className="mobile-nav-item">
              <a
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{link.name}</span>
                {link.badge && <span className="mobile-nav-badge">{link.badge}</span>}
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-drawer-footer">
          <div className="mobile-user-actions">
            <button
              type="button"
              className="btn-mobile-auth"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsUserMenuOpen(true);
              }}
            >
              <img src={userIcon} alt="" className="mobile-btn-icon" />
              <span>Sign In / My Account</span>
            </button>
          </div>
          <div className="mobile-contact-info">
            <p className="mobile-contact-item">support@samacollection.com</p>
            <p className="mobile-contact-item">+1 (800) 555-SAMA</p>
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;
