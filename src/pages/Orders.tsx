import { useState } from "react";
import { Link } from "react-router-dom";

export default function Orders() {
  const [query, setQuery] = useState("");

  return (
    <div style={styles.wrap}>
      <h1 style={styles.heading}>My Orders</h1>
      <p style={styles.subheading}>Track all your orders in one place</p>

      <div style={styles.searchRow}>
        <div style={styles.searchInputWrap}>
          <SearchGlyph />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by order ID, tracking..."
            style={styles.searchInput}
          />
        </div>
        <button style={styles.searchBtn}>Search</button>
        <button aria-label="Filter" style={styles.filterBtn}>
          <FilterGlyph />
        </button>
      </div>

      <div style={styles.emptyState}>
        <p style={styles.emptyTitle}>No orders yet</p>
        <p style={styles.emptyText}>
          Your orders and deliveries will appear here.
        </p>
        <Link to="/shop" style={styles.startBtn}>
          Start Shopping
        </Link>
      </div>
    </div>
  );
}

function SearchGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="#8A96A0" strokeWidth="2" />
      <line
        x1="21"
        y1="21"
        x2="16.65"
        y2="16.65"
        stroke="#8A96A0"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FilterGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="var(--color-text-dark)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    padding: "20px 16px 32px",
  },
  heading: {
    margin: 0,
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "1.2rem",
    color: "var(--color-text-dark)",
  },
  subheading: {
    margin: "4px 0 18px",
    fontSize: "0.82rem",
    color: "var(--color-text-muted)",
  },
  searchRow: {
    display: "flex",
    gap: 8,
    marginBottom: 28,
  },
  searchInputWrap: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid #E7E1D3",
    borderRadius: "var(--radius-sm)",
    padding: "0 10px",
    background: "var(--color-card)",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "10px 0",
    fontSize: "0.8rem",
    background: "transparent",
    color: "var(--color-text-dark)",
  },
  searchBtn: {
    background: "var(--color-navy)",
    color: "white",
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "0 16px",
    fontSize: "0.82rem",
    fontWeight: 600,
  },
  filterBtn: {
    width: 40,
    border: "1px solid #E7E1D3",
    borderRadius: "var(--radius-sm)",
    background: "var(--color-card)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    textAlign: "center",
    padding: "36px 12px",
  },
  emptyTitle: {
    margin: "0 0 6px",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "0.98rem",
    color: "var(--color-text-dark)",
  },
  emptyText: {
    margin: "0 0 22px",
    fontSize: "0.82rem",
    color: "var(--color-text-muted)",
  },
  startBtn: {
    display: "inline-block",
    background: "var(--color-navy)",
    color: "white",
    fontWeight: 600,
    fontSize: "0.88rem",
    padding: "12px 28px",
    borderRadius: "var(--radius-sm)",
  },
};
