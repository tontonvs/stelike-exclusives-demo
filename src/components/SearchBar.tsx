import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({
  placeholder = "Search for what you need",
}: SearchBarProps) {
  const [value, setValue] = useState("");

  return (
    <div style={styles.wrap}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        style={styles.input}
      />
      <button aria-label="Search" style={styles.button}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
          <line
            x1="21"
            y1="21"
            x2="16.65"
            y2="16.65"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    display: "flex",
    alignItems: "stretch",
    border: "1px solid #E7E1D3",
    borderRadius: "var(--radius-sm)",
    overflow: "hidden",
    background: "var(--color-card)",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "10px 14px",
    fontSize: "0.85rem",
    fontFamily: "var(--font-body)",
    background: "transparent",
    color: "var(--color-text-dark)",
  },
  button: {
    background: "var(--color-navy)",
    border: "none",
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
