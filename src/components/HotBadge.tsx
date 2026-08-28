export default function HotBadge() {
  return (
    <div style={styles.gradientWrap}>
      <span style={styles.pill}>Hot</span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  // Outer div paints the gradient; 2px of padding shows through as the
  // "border" around the inner white pill.
  gradientWrap: {
    display: "inline-flex",
    padding: 2,
    borderRadius: 999,
    background:
      "linear-gradient(90deg, #FF8A00 0%, #FFD400 35%, #22D3EE 70%, #C9A227 100%)",
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    background: "#FFFFFF",
    color: "#0A0A0A",
    fontWeight: 700,
    fontSize: "0.56rem",
    lineHeight: 1,
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    padding: "3px 7px",
    borderRadius: 999,
  },
};
