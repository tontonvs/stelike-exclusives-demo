import type { Product } from "../types";
import { useProductOverlay } from "../context/ProductOverlayContext";
import ConditionBadge from "./ConditionBadge";
import HotBadge from "./HotBadge";

interface ProductCardProps {
  product: Product;
  showHotBadge?: boolean;
}

export function formatPrice(value: number): string {
  return `GH₵${value.toLocaleString("en-GH")}`;
}

export default function ProductCard({
  product,
  showHotBadge = false,
}: ProductCardProps) {
  const { openProduct } = useProductOverlay();
  const soldOut = Boolean(product.soldOut);
  const coverImage = product.images[0];

  return (
    <button
      style={styles.card}
      onClick={() => openProduct(product)}
      aria-label={`View details for ${product.name}`}
    >
      <div style={styles.imageWrap}>
        {coverImage ? (
          <img src={coverImage} alt={product.name} style={styles.image} />
        ) : (
          <div style={styles.imagePlaceholder}>Image coming soon</div>
        )}
        <div style={styles.conditionTagPosition}>
          <ConditionBadge condition={product.condition} />
        </div>
        {showHotBadge && (
          <div style={styles.hotTagPosition}>
            <HotBadge />
          </div>
        )}
        {soldOut && (
          <div style={styles.soldOutOverlay}>
            <span style={styles.soldOutText}>Sold Out</span>
          </div>
        )}
      </div>

      <div style={styles.body}>
        <p style={styles.name}>{product.name}</p>

        <div style={styles.priceRow}>
          <span style={styles.price}>{formatPrice(product.price)}</span>
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
              ? "One-of-a-kind piece"
              : `${product.stock} in stock`}
        </p>
      </div>
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    width: "100%",
    aspectRatio: "2.7 / 3.9",
    background: "var(--color-card)",
    borderRadius: "var(--radius-sm)",
    border: "none",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 1px 4px rgba(43,33,29,0.06)",
    padding: 0,
    textAlign: "left",
    cursor: "pointer",
  },
  imageWrap: {
    position: "relative",
    flex: "0 0 56%",
    background: "#F1EEE6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  imagePlaceholder: {
    fontSize: "0.64rem",
    color: "#A9A297",
  },
  conditionTagPosition: {
    position: "absolute",
    top: 6,
    left: 6,
  },
  hotTagPosition: {
    position: "absolute",
    top: 6,
    right: 6,
  },
  soldOutOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(43,33,29,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  soldOutText: {
    color: "white",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "0.75rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    border: "2px solid white",
    padding: "4px 10px",
    borderRadius: "var(--radius-sm)",
  },
  body: {
    padding: "6px 7px 7px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    gap: 2,
  },
  name: {
    margin: 0,
    fontSize: "0.72rem",
    fontWeight: 600,
    color: "var(--color-text-dark)",
    lineHeight: 1.25,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  priceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 5,
    marginTop: 3,
    flexWrap: "wrap",
  },
  price: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "0.8rem",
    color: "var(--color-text-dark)",
  },
  originalPrice: {
    fontSize: "0.64rem",
    fontWeight: 300,
    color: "var(--color-text-dark)",
    textDecoration: "line-through",
  },
  stockLine: {
    margin: "2px 0 0",
    fontSize: "0.64rem",
    fontWeight: 300,
    color: "var(--color-text-dark)",
  },
};
