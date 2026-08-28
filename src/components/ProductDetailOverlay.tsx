import { useState } from "react";
import { useProductOverlay } from "../context/ProductOverlayContext";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { formatPrice } from "./ProductCard";
import ConditionBadge from "./ConditionBadge";
import type { Product } from "../types";

export default function ProductDetailOverlay() {
  const { activeProduct, closeProduct } = useProductOverlay();

  if (!activeProduct) return null;

  return <OverlayContent product={activeProduct} onClose={closeProduct} />;
}

function OverlayContent({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addToCart } = useCart();
  const { openProduct } = useProductOverlay();
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    product.variants?.[0]?.id
  );
  const [justAdded, setJustAdded] = useState(false);

  const soldOut = Boolean(product.soldOut);
  const selectedVariant = product.variants?.find(
    (v) => v.id === selectedVariantId
  );
  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const images = product.images.length > 0 ? product.images : [];

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  function handleAddToCart() {
    if (soldOut) return;
    addToCart(product, selectedVariantId);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div style={styles.backdrop}>
      <div style={styles.sheet}>
        <div style={styles.header}>
          <button
            aria-label="Close"
            style={styles.closeBtn}
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <div style={styles.scrollArea}>
          {/* Image carousel */}
          <div style={styles.carousel}>
            {images.length > 0 ? (
              <img
                src={images[imageIndex]}
                alt={product.name}
                style={styles.carouselImage}
              />
            ) : (
              <div style={styles.carouselPlaceholder}>Image coming soon</div>
            )}
            <div style={styles.conditionTagPosition}>
              <ConditionBadge condition={product.condition} size="lg" />
            </div>
            {soldOut && (
              <div style={styles.soldOutBadgeWrap}>
                <span style={styles.soldOutBadge}>Sold Out</span>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div style={styles.thumbRow}>
              {images.map((img, i) => (
                <button
                  key={img}
                  style={{
                    ...styles.thumb,
                    borderColor:
                      i === imageIndex ? "var(--color-navy)" : "#E7E1D3",
                  }}
                  onClick={() => setImageIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                >
                  <img src={img} alt="" style={styles.thumbImage} />
                </button>
              ))}
            </div>
          )}

          {/* Title + price */}
          <div style={styles.infoBlock}>
            <h1 style={styles.title}>{product.name}</h1>
            <div style={styles.priceRow}>
              <span style={styles.price}>{formatPrice(displayPrice)}</span>
              {product.originalPrice && (
                <span style={styles.originalPrice}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p style={styles.stockLine}>
              {soldOut
                ? "Sold out"
                : product.stock === null
                  ? "One time deal"
                  : `${product.stock} in stock`}
            </p>
            {product.description && (
              <p style={styles.description}>{product.description}</p>
            )}
          </div>

          {/* Variant picker */}
          {product.variants && (
            <div style={styles.section}>
              <h2 style={styles.sectionHeading}>Options</h2>
              <div style={styles.variantRow}>
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    style={{
                      ...styles.variantChip,
                      ...(variant.id === selectedVariantId
                        ? styles.variantChipActive
                        : {}),
                    }}
                    onClick={() => setSelectedVariantId(variant.id)}
                  >
                    <span>{variant.label}</span>
                    <span style={styles.variantPrice}>
                      {formatPrice(variant.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Specs */}
          {product.specs && product.specs.length > 0 && (
            <div style={styles.section}>
              <h2 style={styles.sectionHeading}>Specifications</h2>
              <div style={styles.specTable}>
                {product.specs.map((spec) => (
                  <div key={spec.label} style={styles.specRow}>
                    <span style={styles.specLabel}>{spec.label}</span>
                    <span style={styles.specValue}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related items */}
          {related.length > 0 && (
            <div style={styles.section}>
              <h2 style={styles.sectionHeading}>You may also like</h2>
              <div style={styles.relatedRow}>
                {related.map((item) => (
                  <button
                    key={item.id}
                    style={styles.relatedCard}
                    onClick={() => openProduct(item)}
                  >
                    <div style={styles.relatedImageWrap}>
                      {item.images[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          style={styles.relatedImage}
                        />
                      ) : (
                        <div style={styles.relatedImagePlaceholder}>
                          No image
                        </div>
                      )}
                    </div>
                    <p style={styles.relatedName}>{item.name}</p>
                    <p style={styles.relatedPrice}>
                      {formatPrice(item.price)}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ height: 90 }} />
        </div>

        {/* Sticky add to cart bar */}
        <div style={styles.actionBar}>
          <div style={styles.actionPrice}>
            <span style={styles.actionPriceLabel}>Price</span>
            <span style={styles.actionPriceValue}>
              {formatPrice(displayPrice)}
            </span>
          </div>
          <button
            style={{
              ...styles.addToCartBtn,
              ...(soldOut ? styles.addToCartBtnDisabled : {}),
            }}
            onClick={handleAddToCart}
            disabled={soldOut}
          >
            {soldOut ? "Sold Out" : justAdded ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="var(--color-text-dark)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(16,32,43,0.4)",
    zIndex: 100,
    display: "flex",
    justifyContent: "center",
  },
  sheet: {
    width: "100%",
    maxWidth: 480,
    background: "var(--color-bg)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    display: "flex",
    justifyContent: "flex-end",
    padding: "12px 12px 0",
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "var(--color-card)",
    border: "1px solid #E7E1D3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(14,42,61,0.12)",
  },
  scrollArea: {
    flex: 1,
    overflowY: "auto",
  },
  carousel: {
    position: "relative",
    margin: "0 16px",
    marginTop: 4,
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    background: "#F1EEE6",
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  carouselPlaceholder: {
    fontSize: "0.85rem",
    color: "#A9A297",
  },
  conditionTagPosition: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  soldOutBadgeWrap: {
    position: "absolute",
    inset: 0,
    background: "rgba(16,32,43,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  soldOutBadge: {
    color: "white",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "1rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    border: "2px solid white",
    padding: "6px 16px",
    borderRadius: "var(--radius-sm)",
  },
  thumbRow: {
    display: "flex",
    gap: 8,
    padding: "10px 16px 0",
  },
  thumb: {
    width: 52,
    height: 52,
    borderRadius: "var(--radius-sm)",
    overflow: "hidden",
    border: "2px solid #E7E1D3",
    padding: 0,
    background: "var(--color-card)",
  },
  thumbImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  infoBlock: {
    padding: "16px 16px 0",
  },
  title: {
    margin: 0,
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "1.1rem",
    color: "var(--color-text-dark)",
  },
  priceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    marginTop: 8,
  },
  price: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "1.15rem",
    color: "var(--color-text-dark)",
  },
  originalPrice: {
    fontSize: "0.85rem",
    fontWeight: 300,
    color: "var(--color-text-muted)",
    textDecoration: "line-through",
  },
  stockLine: {
    margin: "4px 0 0",
    fontSize: "0.78rem",
    color: "var(--color-text-muted)",
  },
  description: {
    margin: "10px 0 0",
    fontSize: "0.85rem",
    lineHeight: 1.5,
    color: "var(--color-text-dark)",
  },
  section: {
    padding: "18px 16px 0",
  },
  sectionHeading: {
    margin: "0 0 10px",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "0.92rem",
    color: "var(--color-text-dark)",
  },
  variantRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  variantChip: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
    padding: "8px 14px",
    borderRadius: "var(--radius-sm)",
    border: "1.5px solid #E7E1D3",
    background: "var(--color-card)",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "var(--color-text-dark)",
  },
  variantChipActive: {
    borderColor: "var(--color-navy)",
    background: "#F0E6DC",
  },
  variantPrice: {
    fontSize: "0.72rem",
    fontWeight: 400,
    color: "var(--color-text-muted)",
  },
  specTable: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "var(--radius-sm)",
    overflow: "hidden",
    border: "1px solid #E7E1D3",
  },
  specRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 12px",
    background: "var(--color-card)",
    borderBottom: "1px solid #EFEAE0",
    fontSize: "0.8rem",
  },
  specLabel: {
    color: "var(--color-text-muted)",
    fontWeight: 500,
  },
  specValue: {
    color: "var(--color-text-dark)",
    fontWeight: 600,
  },
  relatedRow: {
    display: "flex",
    gap: 10,
    overflowX: "auto",
    paddingBottom: 4,
  },
  relatedCard: {
    flex: "0 0 auto",
    width: 110,
    background: "var(--color-card)",
    borderRadius: "var(--radius-sm)",
    border: "none",
    padding: 8,
    textAlign: "left",
  },
  relatedImageWrap: {
    width: "100%",
    height: 80,
    borderRadius: "var(--radius-sm)",
    overflow: "hidden",
    background: "#F1EEE6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  relatedImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  relatedImagePlaceholder: {
    fontSize: "0.55rem",
    color: "#A9A297",
  },
  relatedName: {
    margin: 0,
    fontSize: "0.68rem",
    fontWeight: 600,
    color: "var(--color-text-dark)",
    lineHeight: 1.25,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  relatedPrice: {
    margin: "3px 0 0",
    fontSize: "0.68rem",
    fontWeight: 700,
    color: "var(--color-text-dark)",
  },
  actionBar: {
    position: "sticky",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 16px",
    background: "var(--color-card)",
    borderTop: "1px solid #E7E1D3",
  },
  actionPrice: {
    display: "flex",
    flexDirection: "column",
  },
  actionPriceLabel: {
    fontSize: "0.62rem",
    color: "var(--color-text-muted)",
  },
  actionPriceValue: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "1rem",
    color: "var(--color-text-dark)",
  },
  addToCartBtn: {
    flex: 1,
    background: "var(--color-navy)",
    color: "white",
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "13px 0",
    fontSize: "0.9rem",
    fontWeight: 700,
  },
  addToCartBtnDisabled: {
    background: "#B9C0C6",
  },
};
