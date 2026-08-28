export default function HeroBanner() {
  return (
    <section style={styles.hero}>
      <div style={styles.overlay} />
      <div style={styles.content}>
        <h1 style={styles.title}>
          <span style={styles.gold}>Welcome</span>
          <br />
          to Stelike Exclusives
        </h1>
        <p style={styles.subtitle}>
          Curated center tables, TV stands &amp; units, mirrors and bed
          frames — delivered across Accra, Achimota &amp; East Legon.
        </p>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    position: "relative",
    height: "4.5cm",
    backgroundImage: "url(/banner/hero-tv-unit.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "flex-end",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(20,15,13,0.15) 0%, rgba(20,15,13,0.35) 55%, rgba(15,11,9,0.82) 100%)",
  },
  content: {
    position: "relative",
    zIndex: 1,
    padding: "16px 18px 18px",
  },
  title: {
    margin: 0,
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "1.5rem",
    lineHeight: 1.15,
    color: "white",
  },
  gold: {
    background: "var(--gradient-gold)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },
  subtitle: {
    margin: "8px 0 0",
    fontFamily: "var(--font-body)",
    fontSize: "0.78rem",
    lineHeight: 1.4,
    color: "rgba(255,255,255,0.85)",
    maxWidth: 300,
  },
};
