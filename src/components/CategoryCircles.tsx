import type { ReactElement } from "react";
import { categoryShortcuts } from "../data/products";
import type { ProductCategory } from "../types";

// No dedicated category photography yet — using line icons instead of the
// photo circles the old repo used, until real category shots come in.
const iconByCategory: Record<ProductCategory, () => ReactElement> = {
  "center-tables": TableIcon,
  "tv-stands": TvIcon,
  mirrors: MirrorIcon,
  "bed-frames": BedIcon,
  dressers: DresserIcon,
};

export default function CategoryCircles() {
  return (
    <section style={styles.wrap}>
      <h2 style={styles.heading}>Shop by Category</h2>
      <div style={styles.scrollArea} className="category-scroll">
        {categoryShortcuts.map((shortcut) => {
          const Icon = iconByCategory[shortcut.category];
          return (
            <button key={shortcut.id} style={styles.item}>
              <div style={styles.circle}>
                <Icon />
              </div>
              <span style={styles.label}>{shortcut.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function TableIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 8h18M5 8v10M19 8v10M8 8V5.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V8"
        stroke="var(--color-brand)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TvIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="5"
        width="18"
        height="12"
        rx="1.5"
        stroke="var(--color-brand)"
        strokeWidth="1.6"
      />
      <path
        d="M8 20h8M12 17v3"
        stroke="var(--color-brand)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MirrorIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <ellipse
        cx="12"
        cy="10"
        rx="7"
        ry="8.5"
        stroke="var(--color-brand)"
        strokeWidth="1.6"
      />
      <path
        d="M12 18.5V21"
        stroke="var(--color-brand)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 19v-7a2 2 0 012-2h14a2 2 0 012 2v7M3 19v-2.5M21 19v-2.5M3 14.5h18"
        stroke="var(--color-brand)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12v-2a2 2 0 012-2h3a2 2 0 012 2v2"
        stroke="var(--color-brand)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DresserIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="1.5"
        stroke="var(--color-brand)"
        strokeWidth="1.6"
      />
      <path
        d="M6 9.5h5M6 13h5M6 16.5h5"
        stroke="var(--color-brand)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
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
  label: {
    fontSize: "0.72rem",
    fontWeight: 500,
    color: "var(--color-text-muted)",
    textAlign: "center",
    maxWidth: 84,
  },
};
