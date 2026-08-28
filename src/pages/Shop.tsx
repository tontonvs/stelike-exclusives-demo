import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

const PAGE_SIZE = 8;

export default function Shop() {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const pageItems = products.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  function goTo(targetPage: number) {
    const clamped = Math.min(Math.max(targetPage, 1), totalPages);
    setPage(clamped);
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.searchWrap}>
        <SearchBar />
      </div>

      <div style={styles.headRow}>
        <h1 style={styles.heading}>All Products</h1>
        <span style={styles.count}>{products.length} items</span>
      </div>

      <div style={styles.grid}>
        {pageItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div style={styles.pager}>
          <button
            aria-label="Previous page"
            style={styles.pagerArrow}
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
          >
            &#8249;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              style={{
                ...styles.pagerNum,
                ...(num === page ? styles.pagerNumActive : {}),
              }}
              onClick={() => goTo(num)}
            >
              {num}
            </button>
          ))}
          <button
            aria-label="Next page"
            style={styles.pagerArrow}
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    padding: "16px 16px 32px",
  },
  searchWrap: {
    marginBottom: 16,
  },
  headRow: {
    display: "flex",
    alignItems: "baseline",
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
  count: {
    fontSize: "0.78rem",
    color: "var(--color-text-muted)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 20,
  },
  pager: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  pagerArrow: {
    width: 30,
    height: 30,
    borderRadius: "var(--radius-sm)",
    border: "1px solid #E7E1D3",
    background: "var(--color-card)",
    color: "var(--color-text-dark)",
    fontSize: "1rem",
  },
  pagerNum: {
    width: 30,
    height: 30,
    borderRadius: "var(--radius-sm)",
    border: "1px solid #E7E1D3",
    background: "var(--color-card)",
    color: "var(--color-text-dark)",
    fontSize: "0.82rem",
    fontWeight: 600,
  },
  pagerNumActive: {
    background: "var(--color-navy)",
    color: "white",
    borderColor: "var(--color-navy)",
  },
};
