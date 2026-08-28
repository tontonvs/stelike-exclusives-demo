import { categoryShortcuts } from "../data/products";
import type { ProductCategory } from "../types";

// Real product photography now available for each category circle.
const imageByCategory: Record<ProductCategory, string> = {
  "center-tables": "/products/wood-glass-center-table.jpg",
  "tv-stands": "/products/fluted-walnut-tv-console.jpg",
  mirrors: "/products/round-led-mirror.jpg",
  "bed-frames": "/products/platform-bed-nightstands.jpg",
  dressers: "/products/white-6-drawer-dresser.jpg",
};

export default function CategoryCircles() {
  return (
    <section style={styles.wrap}>
      <h2 style={styles.heading}>Shop by Category</h2>
      <div style={styles.scrollArea} className="category-scroll">
        {categoryShortcuts.map((shortcut) => {
          const image = imageByCategory[shortcut.category];
          return (
            <button key={shortcut.id} style={styles.item}>
              <div style={styles.circle}>
                <img
                  src={image}
                  alt={shortcut.label}
                  style={styles.circleImg}
                />
              </div>
              <span style={styles.label}>{shortcut.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    padding: "18px 0 4px",
  },
  heading: {
    margin: "0 16px 14px",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "0.95rem",
    color: "var(--color-text-dark)",
  },
  scrollArea: {
    display: "flex",
    justifyContent: "flex-start",
    gap: 12,
    overflowX: "auto",
    scrollSnapType: "x proximity",
    padding: "0 16px 4px",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    background: "none",
    border: "none",
    flex: "0 0 auto",
    scrollSnapAlign: "start",
  },
  circle: {
    width: 84,
    height: 84,
    borderRadius: "50%",
    background: "var(--color-card)",
    border: "1px solid #E7E1D3",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(43,33,29,0.08)",
  },
  circleImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  label: {
    fontSize: "0.72rem",
    fontWeight: 500,
    color: "var(--color-text-muted)",
    textAlign: "center",
    maxWidth: 84,
  },
};
