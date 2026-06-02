import { useState } from "react";
import { Search, X, Package, Plus, Edit, Trash2, Save } from "lucide-react";
import { formatPeso } from "../../../utils/dashboardUtils";

const PRODUCTS = [
  {
    id: "PROD-001",
    name: "Red Rose Bouquet",
    category: "Fresh Flowers",
    price: 1200,
    deluxePrice: 1800,
    premiumPrice: 2500,
    promoPrice: 999,
    stock: 45,
    status: "active",
    featured: true,
    seasonal: false,
    images: ["/images/rose1.jpg", "/images/rose2.jpg"],
    variants: {
      colors: ["Red", "Pink", "White"],
      wrappers: ["Classic", "Premium"],
      ribbons: ["Silk", "Satin"],
      sizes: ["Small", "Medium", "Large"]
    }
  },
  {
    id: "PROD-002",
    name: "Preserved Tulip Arrangement",
    category: "Preserved Flowers",
    price: 2400,
    deluxePrice: 3200,
    premiumPrice: 4000,
    promoPrice: null,
    stock: 20,
    status: "active",
    featured: true,
    seasonal: true,
    images: ["/images/tulip1.jpg"],
    variants: {
      colors: ["Yellow", "Purple", "Pink"],
      wrappers: ["Elegant"],
      ribbons: ["Lace"],
      sizes: ["Medium", "Large"]
    }
  },
  {
    id: "PROD-003",
    name: "Bridal Bouquet",
    category: "Wedding Flowers",
    price: 3500,
    deluxePrice: 4500,
    premiumPrice: 5500,
    promoPrice: 2999,
    stock: 8,
    status: "active",
    featured: true,
    seasonal: false,
    images: ["/images/wedding1.jpg"],
    variants: {
      colors: ["White", "Ivory", "Blush"],
      wrappers: ["Tulle", "Lace"],
      ribbons: ["Organza", "Satin"],
      sizes: ["Bridal"]
    }
  },
  {
    id: "PROD-004",
    name: "Graduation Stunner",
    category: "Graduation Bouquets",
    price: 1800,
    deluxePrice: 2400,
    premiumPrice: 3000,
    promoPrice: null,
    stock: 15,
    status: "active",
    featured: false,
    seasonal: true,
    images: ["/images/grad1.jpg"],
    variants: {
      colors: ["Gold", "Black", "Blue"],
      wrappers: ["Shimmer"],
      ribbons: ["Satin"],
      sizes: ["Small", "Medium"]
    }
  },
  {
    id: "PROD-005",
    name: "Sympathy Wreath",
    category: "Sympathy Flowers",
    price: 2800,
    deluxePrice: 3600,
    premiumPrice: 4400,
    promoPrice: null,
    stock: 12,
    status: "archived",
    featured: false,
    seasonal: false,
    images: ["/images/sympathy1.jpg"],
    variants: {
      colors: ["White", "Cream"],
      wrappers: ["Traditional"],
      ribbons: ["Mourning"],
      sizes: ["Standard", "Large"]
    }
  }
];

const CATEGORIES = [
  "Fresh Flowers",
  "Preserved Flowers",
  "Wedding Flowers",
  "Graduation Bouquets",
  "Sympathy Flowers"
];

const initialProductState = {
  name: "",
  category: CATEGORIES[0],
  price: "",
  deluxePrice: "",
  premiumPrice: "",
  promoPrice: "",
  stock: "",
  status: "active",
  featured: false,
  seasonal: false,
  images: [],
  variants: {
    colors: [],
    wrappers: [],
    ribbons: [],
    sizes: []
  }
};

function ProductCard({ product, onClick, onEdit, onDelete }) {
  const isLowStock = product.stock > 0 && product.stock < 10;
  const isOutOfStock = product.stock === 0;
  const stockPct = Math.min(100, Math.round((product.stock / 50) * 100));

  const stockBarClass = isOutOfStock || isLowStock
    ? "pm-card__stock-fill pm-card__stock-fill--low"
    : product.stock < 25
    ? "pm-card__stock-fill pm-card__stock-fill--mid"
    : "pm-card__stock-fill pm-card__stock-fill--ok";

  const discountPct = product.promoPrice
    ? Math.round(((product.price - product.promoPrice) / product.price) * 100)
    : null;

  const allVariants = [
    ...(product.variants?.colors ?? []),
    ...(product.variants?.sizes ?? []),
  ];
  const visibleVariants = allVariants.slice(0, 3);
  const extraCount = allVariants.length - visibleVariants.length;

  return (
    <div className="pm-card" onClick={() => onClick?.(product)}>
      {/* Image */}
      <div className="pm-card__img">
        {product.images[0]
          ? <img src={product.images[0]} alt={product.name} />
          : <div className="pm-card__img-placeholder" />
        }

        {/* Status pill — top left */}
        <span className={`pm-card__status-overlay pm-card__status-overlay--${product.status}`}>
          <span className="pm-card__status-dot" />
          {product.status === "active" ? "Active" : "Archived"}
        </span>

        {/* Hover quick-actions — top right */}
        <div className="pm-card__quick-actions">
          <button
            className="pm-card__qa-btn"
            aria-label="Edit product"
            onClick={(e) => { e.stopPropagation(); onEdit?.(product); }}
          >
            <Edit size={13} />
          </button>
          <button
            className="pm-card__qa-btn"
            aria-label="View product"
            onClick={(e) => { e.stopPropagation(); onClick?.(product); }}
          >
            <Search size={13} />
          </button>
        </div>

        {/* Flags — bottom left */}
        <div className="pm-card__img-flags">
          {product.featured && <span className="pm-badge pm-badge--featured">★ Featured</span>}
          {product.seasonal && <span className="pm-badge pm-badge--seasonal">❀ Seasonal</span>}
          {isLowStock && <span className="pm-badge pm-badge--low-stock">⚠ Low Stock</span>}
          {isOutOfStock && <span className="pm-badge pm-badge--out-of-stock">✕ Out of Stock</span>}
        </div>
      </div>

      {/* Body */}
      <div className="pm-card__content">
        <h3 className="pm-card__title">{product.name}</h3>
        <p className="pm-card__category">{product.category}</p>

        {/* Pricing */}
        <div className="pm-card__pricing">
          <span className="pm-card__price">{formatPeso(product.price)}</span>
          {product.promoPrice && (
            <>
              <span className="pm-card__promo">{formatPeso(product.promoPrice)}</span>
              <span className="pm-card__discount">-{discountPct}%</span>
            </>
          )}
        </div>

        {/* Stock bar */}
        <div className="pm-card__stock">
          <div className="pm-card__stock-label">
            <span className={isLowStock || isOutOfStock ? "pm-card__stock-warn" : ""}>
              {isOutOfStock ? "Out of stock" : isLowStock ? `Only ${product.stock} left!` : "Stock"}
            </span>
            <span className="pm-card__stock-count">{product.stock} units</span>
          </div>
          <div className="pm-card__stock-bg">
            <div className={stockBarClass} style={{ width: `${stockPct}%` }} />
          </div>
        </div>

        {/* Variant chips */}
        {visibleVariants.length > 0 && (
          <div className="pm-card__chips">
            {visibleVariants.map((v, i) => (
              <span key={i} className="pm-chip">{v}</span>
            ))}
            {extraCount > 0 && <span className="pm-chip pm-chip--more">+{extraCount}</span>}
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="pm-card__footer">
        <button
          className="pm-card__edit-btn"
          onClick={(e) => { e.stopPropagation(); onEdit?.(product); }}
        >
          <Edit size={12} />
          Edit product
        </button>
        <button
          className="pm-card__delete-btn"
          aria-label="Delete product"
          onClick={(e) => { e.stopPropagation(); onDelete?.(product); }}
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose, onEdit, onDelete }) {
  if (!product) return null;

  return (
    <div className="pm-modal">
      <div className="cd-modal__overlay" onClick={onClose} />
      <div className="cd-modal__content">
        <div className="cd-modal__header">
          <h2 className="cd-modal__title">Product Details</h2>
          <button className="cd-modal__close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="cd-modal__body scrollbar">
          <div className="cd-section">
            <div className="pm-modal__avatar">
              {product.images && product.images[0] ? (
                <img src={product.images[0]} alt={product.name} />
              ) : (
                <div className="pm-modal__skeleton" />
              )}
            </div>
          </div>

          <div className="cd-section">
            <h4 className="cd-section__title">Product Information</h4>
            <div className="cd-info-grid">
              <div className="cd-info-item">
                <p className="pm-card__id">{product.id}</p>
              </div>
              <div className="cd-info-item">
                <span>{product.category}</span>
              </div>
              <div className="cd-info-item cd-info-item--full">
                <span>Price: {formatPeso(product.price)}</span>
              </div>
              <div className="cd-info-item">
                <span>Stock: {product.stock}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="cd-modal__footer">
          <button type="button" className="db-outline-btn" onClick={() => onEdit?.(product)}>
            <Edit size={14} />
            Edit
          </button>
          <button type="button" className="db-outline-btn text-destructive" onClick={() => onDelete?.(product)}>
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function AddProductModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({ ...initialProductState });
  const [variantInput, setVariantInput] = useState({
    colors: "",
    wrappers: "",
    ribbons: "",
    sizes: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleVariantChange = (e) => {
    setVariantInput(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addVariant = (type) => {
    if (variantInput[type].trim()) {
      setFormData(prev => ({
        ...prev,
        variants: {
          ...prev.variants,
          [type]: [...prev.variants[type], variantInput[type].trim()]
        }
      }));
      setVariantInput(prev => ({ ...prev, [type]: "" }));
    }
  };

  const removeVariant = (type, index) => {
    setFormData(prev => ({
      ...prev,
      variants: {
        ...prev.variants,
        [type]: prev.variants[type].filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      id: `PROD-${String(Date.now()).slice(-3)}`,
      price: Number(formData.price),
      deluxePrice: Number(formData.deluxePrice),
      premiumPrice: Number(formData.premiumPrice),
      promoPrice: formData.promoPrice ? Number(formData.promoPrice) : null,
      stock: Number(formData.stock)
    };
    onSave?.(newProduct);
    onClose();
  };

  return (
    <div className="pm-modal">
      <div className="cd-modal__overlay" onClick={onClose} />
      <div className="cd-modal__content" style={{ maxWidth: "600px" }}>
        <div className="cd-modal__header">
          <h2 className="cd-modal__title">Add New Product</h2>
          <button className="cd-modal__close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="cd-modal__body scrollbar">
            <div className="cd-section">
              <h4 className="cd-section__title">Basic Information</h4>
              <div className="pm-form-grid">
                <div className="pm-form-group">
                  <label className="pm-label">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pm-input"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="pm-select"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="cd-section">
              <h4 className="cd-section__title">Pricing</h4>
              <div className="pm-pricing-form">
                <div className="pm-form-group">
                  <label className="pm-label">Standard Price (₱)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="pm-input"
                    placeholder="0"
                    required
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Deluxe Price (₱)</label>
                  <input
                    type="number"
                    name="deluxePrice"
                    value={formData.deluxePrice}
                    onChange={handleChange}
                    className="pm-input"
                    placeholder="0"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Premium Price (₱)</label>
                  <input
                    type="number"
                    name="premiumPrice"
                    value={formData.premiumPrice}
                    onChange={handleChange}
                    className="pm-input"
                    placeholder="0"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Promotional Price (₱) - Optional</label>
                  <input
                    type="number"
                    name="promoPrice"
                    value={formData.promoPrice}
                    onChange={handleChange}
                    className="pm-input"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="cd-section">
              <h4 className="cd-section__title">Inventory</h4>
              <div className="pm-form-grid">
                <div className="pm-form-group">
                  <label className="pm-label">Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="pm-input"
                    placeholder="0"
                    required
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="pm-select"
                  >
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="cd-section">
              <h4 className="cd-section__title">Product Flags</h4>
              <div className="pm-flags">
                <label className="pm-checkbox">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />
                  <span>Featured Product</span>
                </label>
                <label className="pm-checkbox">
                  <input
                    type="checkbox"
                    name="seasonal"
                    checked={formData.seasonal}
                    onChange={handleChange}
                  />
                  <span>Seasonal Product</span>
                </label>
              </div>
            </div>

            <div className="cd-section">
              <h4 className="cd-section__title">Variants</h4>
              {["colors", "wrappers", "ribbons", "sizes"].map((type) => (
                <div key={type} className="pm-variant-input">
                  <label className="pm-label">{type.charAt(0).toUpperCase() + type.slice(1)}</label>
                  <div className="pm-variant-row">
                    <input
                      type="text"
                      name={type}
                      value={variantInput[type]}
                      onChange={handleVariantChange}
                      className="pm-input"
                      placeholder={`Add ${type}`}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addVariant(type))}
                    />
                    <button
                      type="button"
                      className="db-outline-btn"
                      onClick={() => addVariant(type)}
                    >
                      Add
                    </button>
                  </div>
                  <div className="pm-tags">
                    {formData.variants[type].map((v, i) => (
                      <span key={i} className="pm-tag">
                        {v}
                        <button
                          type="button"
                          className="pm-tag-remove"
                          onClick={() => removeVariant(type, i)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="cd-section">
              <h4 className="cd-section__title">Images (Max 2)</h4>
              <div className="pm-image-upload">
                <input
                  type="url"
                  placeholder="Enter image URL and press Enter"
                  className="pm-input"
                  disabled={formData.images.length >= 2}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim() && formData.images.length < 2) {
                      setFormData(prev => ({
                        ...prev,
                        images: [...prev.images, e.target.value.trim()]
                      }));
                      e.target.value = "";
                    }
                  }}
                />
                <p className="pm-image-hint">
                  {formData.images.length}/2 images added
                </p>
                <div className="pm-gallery">
                  {formData.images.map((img, i) => (
                    <div key={i} className="pm-gallery-img">
                      <img src={img} alt={`Product ${i + 1}`} />
                      <button
                        type="button"
                        className="pm-img-remove"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          images: prev.images.filter((_, idx) => idx !== i)
                        }))}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="cd-modal__footer">
            <button type="button" className="db-outline-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="db-header__btn flex items-center gap-1">
              <Save size={14} />
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ProductsManagement({ products = PRODUCTS }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    const matchesStatus = status === "all" || p.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleViewProduct = (product) => setSelectedProduct(product);
  const handleEditProduct = (product) => {
    console.log("Edit product:", product.id);
  };
  const handleDeleteProduct = (product) => {
    console.log("Delete product:", product.id);
  };
  const handleCloseModal = () => setSelectedProduct(null);

  const handleSaveProduct = (newProduct) => {
    console.log("New product:", newProduct);
  };

  return (
    <div className="pm-page scrollbar">
      <div className="pm-page__head">
        <div>
          <p className="cm-card__title">Products</p>
          <p className="cm-card__subtitle">{products.length} total products</p>
        </div>
        <div className="cm-card__actions">
          <div className="cm-search">
            <Search size={16} className="cm-search__icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="cm-search__input"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="cm-filter"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="cm-filter"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
          <button className="db-header__btn flex items-center gap-1" onClick={() => setShowAddModal(true)}>
            <Plus size={14} />
            Add Product
          </button>
        </div>
      </div>

      <div className="pm-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={handleViewProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="pm-empty">
          <Package size={48} className="pm-empty__icon" />
          <p className="pm-empty__text">No products found</p>
        </div>
      )}

      <div className="pm-page__foot">
        <p className="cm-card__foot-text">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      )}

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}