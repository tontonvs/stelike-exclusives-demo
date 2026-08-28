import { useEffect, useState } from "react";

interface Slide {
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    title: "Stelike Exclusives",
    subtitle: "Curated furniture and interior pieces for homes across Accra.",
  },
  {
    title: "Style That Lasts",
    subtitle: "Living room, bedroom & dining — delivered across Accra, Achimota & East Legon.",
  },
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={styles.hero}>
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          style={{
            ...styles.slide,
            opacity: index === activeIndex ? 1 : 0,
            pointerEvents: index === activeIndex ? "auto" : "none",
          }}
        >
          <div style={styles.panel}>
            <h1 style={styles.title}>{slide.title}</h1>
            <p style={styles.subtitle}>{slide.subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    position: "relative",
    height: 104,
    background:
      "linear-gradient(135deg, #C9A98C 0%, #8B6A57 50%, #4B362C 100%)",
    display: "flex",
    alignItems: "center",
    padding: "0 14px",
    overflow: "hidden",
  },
  slide: {
    position: "absolute",
    left: 14,
    right: 14,
    transition: "opacity 0.6s ease",
  },
  panel: {
    background: "var(--glass-bg-light)",
    WebkitBackdropFilter: "blur(var(--glass-blur))",
    backdropFilter: "blur(var(--glass-blur))",
    border: "1px solid var(--glass-border)",
    borderRadius: "var(--radius-lg)",
    padding: "10px 16px",
  },
  title: {
    margin: 0,
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "1.1rem",
    color: "white",
    letterSpacing: "0.02em",
  },
  subtitle: {
    margin: "4px 0 0",
    fontFamily: "var(--font-body)",
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.88)",
    lineHeight: 1.35,
  },
};
