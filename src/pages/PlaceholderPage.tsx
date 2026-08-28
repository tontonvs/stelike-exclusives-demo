import { useEffect, useState } from "react";

interface PlaceholderPageProps {
  title: string;
}

const SKELETON_DURATION_MS = 1400;

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), SKELETON_DURATION_MS);
    return () => clearTimeout(timer);
  }, [title]);

  if (loading) {
    return (
      <div style={styles.wrap}>
        <div style={{ ...styles.skeletonBlock, width: "40%", height: 18 }} />
        <div style={{ ...styles.skeletonBlock, width: "70%", height: 12 }} />

        <div style={styles.skeletonRow}>
          <div style={{ ...styles.skeletonBlock, flex: 1, height: 120 }} />
          <div style={{ ...styles.skeletonBlock, flex: 1, height: 120 }} />
        </div>

        <div style={{ ...styles.skeletonBlock, width: "90%", height: 14 }} />
        <div style={{ ...styles.skeletonBlock, width: "60%", height: 14 }} />
        <div style={{ ...styles.skeletonBlock, width: "80%", height: 14 }} />
      </div>
    );
  }

  return (
    <div style={styles.constructionWrap}>
      <ConstructionIcon />
      <h1 style={styles.title}>{title}</h1>
      <p style={styles.text}>This page is under construction.</p>
      <p style={styles.subtext}>Check back soon.</p>
    </div>
  );
}

function ConstructionIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 20h20"
        stroke="var(--color-text-muted)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 20V10l8-6 8 6v10"
        stroke="var(--color-navy)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 20v-6h6v6"
        stroke="var(--color-navy)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="1.4" fill="var(--color-navy)" />
    </svg>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  skeletonBlock: {
    borderRadius: "var(--radius-sm)",
    background:
      "linear-gradient(90deg, #ECE7DA 25%, #F5F1E6 37%, #ECE7DA 63%)",
    backgroundSize: "400% 100%",
    animation: "shimmer 1.4s ease infinite",
  },
  skeletonRow: {
    display: "flex",
    gap: 12,
    margin: "6px 0",
  },
  constructionWrap: {
    padding: "60px 24px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    margin: "16px 0 4px",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "1.15rem",
    color: "var(--color-text-dark)",
  },
  text: {
    margin: "0 0 2px",
    color: "var(--color-text-muted)",
    fontSize: "0.88rem",
  },
  subtext: {
    margin: 0,
    color: "var(--color-text-muted)",
    fontSize: "0.8rem",
    fontWeight: 300,
  },
};
