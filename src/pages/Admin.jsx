import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/Admin.css";

const CATEGORIES = ["Kurtis", "Co-ord Sets", "T-shirts & Tops", "Bottom Wear"];
const TAGS = ["Bestseller", "Trending", "New Season", "Limited Edition", ""];

const EMPTY_FORM = {
  name: "",
  category: "Kurtis",
  price: "",
  originalPrice: "",
  discount: "",
  rating: "",
  reviews: "",
  tag: "",
  sizes: "",
  image: "",
};

const API_BASE = "/api/products";

const Admin = () => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("sama_admin_auth") === "true"
  );
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Data state
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  // Show toast
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated, fetchProducts]);

  // Auth handler
  const handleLogin = (e) => {
    e.preventDefault();
    // Default password: "sama2026" or from env
    const validPassword = "sama2026";
    if (password === validPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("sama_admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("sama_admin_auth");
    setPassword("");
  };

  // Modal handlers
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(EMPTY_FORM);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      originalPrice: String(product.originalPrice || ""),
      discount: product.discount || "",
      rating: String(product.rating || ""),
      reviews: String(product.reviews || ""),
      tag: product.tag || "",
      sizes: (product.sizes || []).join(", "),
      image: product.image || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData(EMPTY_FORM);
  };

  // Form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice) || 0,
      discount: formData.discount,
      rating: Number(formData.rating) || 0,
      reviews: Number(formData.reviews) || 0,
      tag: formData.tag,
      sizes: formData.sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      image: formData.image,
    };

    try {
      if (editingProduct) {
        // Update
        const res = await fetch(`${API_BASE}?id=${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update product");
        showToast(`"${payload.name}" updated successfully`);
      } else {
        // Create
        const res = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create product");
        showToast(`"${payload.name}" added to catalogue`);
      }
      closeModal();
      fetchProducts();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`${API_BASE}?id=${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      showToast(`"${deleteTarget.name}" removed from catalogue`);
      setDeleteTarget(null);
      fetchProducts();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // Derived data
  const filteredProducts = useMemo(() => {
    let result = products;

    if (filterCategory !== "All") {
      result = result.filter((p) => p.category === filterCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tag && p.tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [products, filterCategory, searchQuery]);

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const categories = [...new Set(products.map((p) => p.category))].length;
    const avgPrice =
      totalProducts > 0
        ? Math.round(products.reduce((s, p) => s + p.price, 0) / totalProducts)
        : 0;
    const totalValue = products.reduce((s, p) => s + p.price, 0);
    return { totalProducts, categories, avgPrice, totalValue };
  }, [products]);

  const getTagClass = (tag) => {
    if (!tag) return "table-tag--default";
    const t = tag.toLowerCase();
    if (t.includes("bestseller")) return "table-tag--bestseller";
    if (t.includes("trending")) return "table-tag--trending";
    if (t.includes("new")) return "table-tag--new-season";
    return "table-tag--default";
  };

  // -------- RENDER --------

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-wrapper">
        <div className="admin-login">
          <div className="login-card">
            <div className="login-brand">SAMA</div>
            <h1 className="login-title">Vendor Portal</h1>
            <p className="login-subtitle">
              Enter your admin password to manage the product catalogue.
            </p>
            <form className="login-form" onSubmit={handleLogin}>
              <div className="login-input-group">
                <input
                  type="password"
                  className="login-input"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              </div>
              {loginError && <p className="login-error">{loginError}</p>}
              <button type="submit" className="login-btn">
                Access Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Main Admin Panel
  return (
    <div className="admin-wrapper">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-header-left">
            <span className="admin-header-brand">SAMA</span>
            <span className="admin-header-divider"></span>
            <span className="admin-header-title">Product Manager</span>
          </div>
          <div className="admin-header-right">
            <Link to="/" className="admin-storefront-link">
              ← View Storefront
            </Link>
            <button className="admin-logout-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="admin-content">
        {/* Stats Cards */}
        <div className="admin-stats">
          <div className="stat-card stat-card--products">
            <div className="stat-icon">📦</div>
            <div className="stat-value">{stats.totalProducts}</div>
            <div className="stat-label">Total Products</div>
          </div>
          <div className="stat-card stat-card--categories">
            <div className="stat-icon">🏷️</div>
            <div className="stat-value">{stats.categories}</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat-card stat-card--avg-price">
            <div className="stat-icon">💰</div>
            <div className="stat-value">₹{stats.avgPrice.toLocaleString("en-IN")}</div>
            <div className="stat-label">Average Price</div>
          </div>
          <div className="stat-card stat-card--total-value">
            <div className="stat-icon">📊</div>
            <div className="stat-value">₹{stats.totalValue.toLocaleString("en-IN")}</div>
            <div className="stat-label">Catalogue Value</div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="admin-toolbar">
          <div className="toolbar-search">
            <span className="toolbar-search-icon">🔍</span>
            <input
              type="text"
              className="toolbar-search-input"
              placeholder="Search products by name, category, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="toolbar-actions">
            <select
              className="toolbar-filter-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button className="btn-add-product" onClick={openAddModal}>
              + Add Product
            </button>
          </div>
        </div>

        {/* Products Table */}
        {isLoading ? (
          <div className="admin-loading">
            <div className="admin-spinner"></div>
          </div>
        ) : error ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">⚠️</div>
            <h3 className="admin-empty-title">Error Loading Products</h3>
            <p className="admin-empty-desc">{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="admin-table-wrapper">
            <div className="admin-empty-state">
              <div className="admin-empty-icon">📋</div>
              <h3 className="admin-empty-title">No products found</h3>
              <p className="admin-empty-desc">
                {searchQuery || filterCategory !== "All"
                  ? "Try adjusting your search or filter."
                  : "Add your first product to get started."}
              </p>
            </div>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Tag</th>
                  <th>Sizes</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="table-product-cell">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="table-product-thumb"
                          />
                        )}
                        <div className="table-product-info">
                          <span className="table-product-name" title={product.name}>
                            {product.name}
                          </span>
                          <span className="table-product-id">ID: {product.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="table-category-badge">{product.category}</span>
                    </td>
                    <td>
                      <span className="table-price">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice > 0 && (
                        <span className="table-original-price">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </td>
                    <td>
                      {product.tag && (
                        <span className={`table-tag ${getTagClass(product.tag)}`}>
                          {product.tag}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="table-sizes">
                        {(product.sizes || []).map((size) => (
                          <span key={size} className="table-size-chip">
                            {size}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      ⭐ {product.rating} ({product.reviews})
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn-table-action btn-table-action--edit"
                          onClick={() => openEditModal(product)}
                          title="Edit product"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-table-action btn-table-action--delete"
                          onClick={() => setDeleteTarget(product)}
                          title="Delete product"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button className="admin-modal-close" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="admin-modal-body">
              <form className="admin-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Gulmohar Chanderi Silk Kurti"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      className="form-select"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tag</label>
                    <select
                      className="form-select"
                      value={formData.tag}
                      onChange={(e) =>
                        setFormData({ ...formData, tag: e.target.value })
                      }
                    >
                      <option value="">No Tag</option>
                      {TAGS.filter(Boolean).map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Price (₹) *</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="1899"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Original Price (₹)</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="2499"
                      value={formData.originalPrice}
                      onChange={(e) =>
                        setFormData({ ...formData, originalPrice: e.target.value })
                      }
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Discount Label</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 24% OFF"
                      value={formData.discount}
                      onChange={(e) =>
                        setFormData({ ...formData, discount: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sizes</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="S, M, L, XL, XXL"
                      value={formData.sizes}
                      onChange={(e) =>
                        setFormData({ ...formData, sizes: e.target.value })
                      }
                    />
                    <span className="form-hint">Comma-separated values</span>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Rating</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="4.9"
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({ ...formData, rating: e.target.value })
                      }
                      min="0"
                      max="5"
                      step="0.1"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Reviews Count</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="142"
                      value={formData.reviews}
                      onChange={(e) =>
                        setFormData({ ...formData, reviews: e.target.value })
                      }
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Image URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-form-cancel"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-form-submit">
                    {editingProduct ? "Save Changes" : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className="admin-modal-overlay"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="admin-modal delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-modal-body">
              <div className="delete-icon">🗑️</div>
              <h3 className="delete-title">Delete Product?</h3>
              <p className="delete-desc">
                Are you sure you want to remove{" "}
                <span className="delete-product-name">
                  "{deleteTarget.name}"
                </span>{" "}
                from the catalogue? This action cannot be undone.
              </p>
              <div className="delete-actions">
                <button
                  className="btn-delete-cancel"
                  onClick={() => setDeleteTarget(null)}
                >
                  Keep Product
                </button>
                <button className="btn-delete-confirm" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`}>
          <span>{toast.type === "success" ? "✓" : "✕"}</span>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Admin;
