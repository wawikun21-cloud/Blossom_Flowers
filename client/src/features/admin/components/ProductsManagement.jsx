import { useState } from "react";
import { Search, Eye, X, Package, Archive, Plus, Edit, Trash2, Save } from "lucide-react";
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

function ProductRow({ product, onViewProduct, onEditProduct, onDeleteProduct }) {
  const statusColors = {
    active: "bg-success/20 text-success",
    archived: "bg-muted-foreground/20 text-muted-foreground"
  };

  const stockStatus = product.stock === 0 ? "bg-destructive/20 text-destructive" :
                      product.stock < 10 ? "bg-destructive/20 text-destructive" :
                      "bg-success/20 text-success";

  return (
    <tr className="pm-tr">
      <td className="pm-td pm-td--mono">{product.id}</td>
      <td className="pm-td pm-td--name">
        <div className="pm-product-info">
          <div className="pm-product-img">
            <img src={product.images[0]} alt={product.name} />
          </div>
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.category}</p>
          </div>
        </div>
      </td>
      <td className="pm-td pm-td--r pm-td--bold">{formatPeso(product.price)}</td>
      <td className="pm-td pm-td--r">
        <span className={`pm-badge ${stockStatus}`}>
          {product.stock} in stock
        </span>
      </td>
      <td className="pm-td">
        <span className="pm-featured-tag">
          {product.featured && "Featured"}
          {product.seasonal && "Seasonal"}
          {!product.featured && !product.seasonal && "-"}
        </span>
      </td>
      <td className="pm-td">
        <span className={`pm-badge ${statusColors[product.status]}`}>
          {product.status.toUpperCase()}
        </span>
      </td>
      <td className="pm-td">
        <div className="pm-actions">
          <button
            className="db-ghost-btn flex items-center gap-1"
            type="button"
            onClick={() => onViewProduct?.(product)}
          >
            <Eye size={12} />
            View
          </button>
          <button
            className="db-ghost-btn flex items-center gap-1"
            type="button"
            onClick={() => onEditProduct?.(product)}
          >
            <Edit size={12} />
            Edit
          </button>
          <button
            className="db-ghost-btn flex items-center gap-1 text-destructive"
            type="button"
            onClick={() => onDeleteProduct?.(product)}
          >
            <Trash2 size={12} />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

function ProductModal({ product, onClose }) {
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
          <div className="cd-profile">
            <div className="pm-modal__avatar">
              <img src={product.images[0]} alt={product.name} />
            </div>
            <div className="cd-profile__info">
              <h3 className="cd-profile__name">{product.name}</h3>
              <p className="cd-profile__email">{product.category}</p>
            </div>
          </div>

          <div className="cd-section">
            <h4 className="cd-section__title">Pricing</h4>
            <div className="pm-pricing-grid">
              <div className="pm-price-item">
                <p className="pm-price-label">Standard</p>
                <p className="pm-price-value">{formatPeso(product.price)}</p>
              </div>
              <div className="pm-price-item">
                <p className="pm-price-label">Deluxe</p>
                <p className="pm-price-value">{formatPeso(product.deluxePrice)}</p>
              </div>
              <div className="pm-price-item">
                <p className="pm-price-label">Premium</p>
                <p className="pm-price-value">{formatPeso(product.premiumPrice)}</p>
              </div>
              {product.promoPrice && (
                <div className="pm-price-item">
                  <p className="pm-price-label">Promotional</p>
                  <p className="pm-price-value text-primary">{formatPeso(product.promoPrice)}</p>
                </div>
              )}
            </div>
          </div>

          <div className="cd-section">
            <h4 className="cd-section__title">Inventory & Status</h4>
            <div className="cd-info-grid">
              <div className="cd-info-item">
                <Package size={14} />
                <span>Stock: {product.stock}</span>
              </div>
              <div className="cd-info-item">
                <Archive size={14} />
                <span>Status: {product.status}</span>
              </div>
            </div>
          </div>

          <div className="cd-section">
            <h4 className="cd-section__title">Variants</h4>
            <div className="pm-variants">
              <div className="pm-variant-group">
                <p className="pm-variant-label">Colors</p>
                <div className="pm-tags">
                  {product.variants.colors.map((c, i) => (
                    <span key={i} className="pm-tag">{c}</span>
                  ))}
                </div>
              </div>
              <div className="pm-variant-group">
                <p className="pm-variant-label">Wrappers</p>
                <div className="pm-tags">
                  {product.variants.wrappers.map((w, i) => (
                    <span key={i} className="pm-tag">{w}</span>
                  ))}
                </div>
              </div>
              <div className="pm-variant-group">
                <p className="pm-variant-label">Ribbons</p>
                <div className="pm-tags">
                  {product.variants.ribbons.map((r, i) => (
                    <span key={i} className="pm-tag">{r}</span>
                  ))}
                </div>
              </div>
              <div className="pm-variant-group">
                <p className="pm-variant-label">Sizes</p>
                <div className="pm-tags">
                  {product.variants.sizes.map((s, i) => (
                    <span key={i} className="pm-tag">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="cd-section">
              <h4 className="cd-section__title">Gallery</h4>
              <div className="pm-gallery">
                {product.images.map((img, i) => (
                  <div key={i} className="pm-gallery-img">
                    <img src={img} alt={`${product.name} ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="cd-modal__footer">
          <button className="db-outline-btn" type="button" onClick={onClose}>
            Close
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
    <div className="pm-card">
      <div className="cm-card__head">
        <div>
          <p className="cm-card__title">Products Management</p>
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

      <div className="cm-table-wrap">
        <table className="cm-table">
          <thead>
            <tr>
              <th className="cm-th">Product ID</th>
              <th className="cm-th">Name & Category</th>
              <th className="cm-th cm-th--r">Price</th>
              <th className="cm-th">Stock</th>
              <th className="cm-th">Tags</th>
              <th className="cm-th">Status</th>
              <th className="cm-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onViewProduct={handleViewProduct}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="cm-card__foot">
        <p className="cm-card__foot-text">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
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