import { useMemo, useState } from "react";
import { products, categoryShortcuts } from "../data/products";
import type { ProductCategory } from "../types";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

const PAGE_SIZE = 8;
type CategoryFilter = ProductCategory | "all";

export default function Shop() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description?.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE)
  );
  const pageItems = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  function goTo(targetPage: number) {
    const clamped = Math.min(Math.max(targetPage, 1), totalPages);
    setPage(clamped);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  function handleCategoryChange(value: CategoryFilter) {
    setCategory(value);
    setPage(1);
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.searchWrap}>
        <SearchBar value={query} onChange={handleQueryChange} />
      </div>

      <div style={styles.filterRow} className="category-scroll">
        <button
          style={{
            ...styles.filterChip,
            ...(category === "all" ? styles.filterChipActive : {}),
          }}
          onClick={() => handleCategoryChange("all")}
        >
          All
        </button>
        {categoryShortcuts.map((shortcut) => (
          <button
            key={shortcut.id}
            style={{
              ...styles.filterChip,
              ...(category === shortcut.category
                ? styles.filterChipActive
                : {}),
            }}
            onClick={() => handleCategoryChange(shortcut.category)}
          >
            {shortcut.label}
          </button>
        ))}
      </div>

      <div style={styles.headRow}>
        <h1 style={styles.heading}>All Products</h1>
        <span style={styles.count}>{filteredProducts.length} items</span>
      </div>

      {pageItems.length > 0 ? (
        <div style={styles.grid}>
          {pageItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p style={styles.empty}>No products match your search.</p>
      )}

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
    marginBottom: 12,
  },
  filterRow: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    paddingBottom: 4,
    marginBottom: 16,
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  filterChip: {
    flex: "0 0 auto",
    background: "var(--color-card)",
    color: "var(--color-text-dark)",
    border: "1px solid #E7E1D3",
    borderRadius: 999,
    padding: "7px 14px",
    fontSize: "0.76rem",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  filterChipActive: {
    background: "var(--color-navy)",
    color: "white",
    borderColor: "var(--color-navy)",
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
  empty: {
    fontSize: "0.85rem",
    color: "var(--color-text-muted)",
    textAlign: "center",
    padding: "32px 0",
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
