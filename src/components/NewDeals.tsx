import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function NewDeals() {
  return (
    <section style={styles.wrap}>
      <div style={styles.headRow}>
        <h2 style={styles.heading}>Featured Pieces</h2>
        <button style={styles.showAll}>
          Show all
          <ArrowIcon />
        </button>
      </div>

      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="var(--color-text-dark)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    padding: "20px 16px 32px",
  },
  headRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  heading: {
    margin: 0,
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "1.05rem",
    color: "var(--color-text-dark)",
  },
  showAll: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#FFFFFF",
    color: "var(--color-text-dark)",
    border: "1px solid #E7E1D3",
    borderRadius: "var(--radius-sm)",
    padding: "8px 14px",
    fontSize: "0.78rem",
    fontWeight: 600,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
};
