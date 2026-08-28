export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.logoRow}>
        <span style={styles.logoText}>STELIKE</span>
      </div>

      <p style={styles.tagline}>
        Curated center tables, TV stands and units, mirrors and bed frames —
        exclusive furniture pieces for homes across Accra.
      </p>

      <div style={styles.columns}>
        <div style={styles.column}>
          <h4 style={styles.colHeading}>Company</h4>
          <p style={styles.colText}>Landing Page</p>
          <p style={styles.colText}>About Us</p>
        </div>

        <div style={styles.column}>
          <h4 style={styles.colHeading}>Services</h4>
          <p style={styles.colText}>Shop</p>
          <p style={styles.colText}>Delivery</p>
        </div>

        <div style={styles.column}>
          <h4 style={styles.colHeading}>Locations</h4>
          <p style={styles.colText}>Accra</p>
          <p style={styles.colText}>Achimota</p>
          <p style={styles.colText}>East Legon</p>
        </div>

        <div style={styles.column}>
          <h4 style={styles.colHeading}>Support</h4>
          <p style={styles.colText}>Help Center</p>
          <p style={styles.colText}>Delivery Policy</p>
          <p style={styles.colText}>Privacy Policy</p>
          <p style={styles.colText}>Terms of Service</p>
        </div>
      </div>

      <div style={styles.divider} />

      <p style={styles.copyright}>
        &copy; 2026 Stelike Exclusives. All rights reserved.
      </p>

      <div style={styles.paymentRow}>
        <span style={styles.paymentBadge}>Visa</span>
        <span style={styles.paymentBadge}>Mastercard</span>
        <span style={styles.paymentBadge}>Mobile Money</span>
        <span style={styles.paymentBadge}>WhatsApp Order</span>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    background: "var(--color-navy-dark)",
    color: "#D9CFC5",
    padding: "24px 16px 20px",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 49, // ~1.3cm space below logo row
  },
  logoText: {
    color: "white",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "1.05rem",
    letterSpacing: "0.12em",
  },
  tagline: {
    margin: "0 0 24px",
    fontSize: "0.8rem",
    lineHeight: 1.6,
    color: "#D9CFC5",
    maxWidth: 340,
  },
  columns: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: 16,
    rowGap: 22,
  },
  column: {},
  colHeading: {
    margin: "0 0 8px",
    color: "white",
    fontFamily: "var(--font-display)",
    fontSize: "0.82rem",
    fontWeight: 700,
  },
  colText: {
    margin: "0 0 6px",
    fontSize: "0.76rem",
    lineHeight: 1.6,
    color: "#B5A79A",
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.12)",
    margin: "24px 0 14px",
  },
  copyright: {
    margin: "0 0 16px",
    fontSize: "0.7rem",
    color: "#9C8D80",
    textAlign: "center",
  },
  paymentRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  paymentBadge: {
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "var(--radius-sm)",
    padding: "6px 12px",
    fontSize: "0.68rem",
    fontWeight: 600,
    color: "#EDE6DD",
  },
};
