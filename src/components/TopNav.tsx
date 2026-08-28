import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface TopNavProps {
  notificationCount?: number;
}

export default function TopNav({ notificationCount = 0 }: TopNavProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { itemCount } = useCart();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header style={styles.nav}>
      <Link to="/" style={styles.logoWrap}>
        <span style={styles.logoText}>STELIKE</span>
      </Link>

      <div style={styles.icons}>
        <button aria-label="Search" style={styles.iconBtn}>
          <SearchIcon />
        </button>

        <Link to="/cart" aria-label="Cart" style={styles.iconBtn}>
          <CartIcon />
          {itemCount > 0 && <span style={styles.badge}>{itemCount}</span>}
        </Link>

        <button aria-label="Notifications" style={styles.iconBtn}>
          <BellIcon />
          {notificationCount > 0 && (
            <span style={styles.badge}>{notificationCount}</span>
          )}
        </button>

        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            aria-label="Profile menu"
            style={styles.iconBtn}
            onClick={() => setProfileOpen((v) => !v)}
          >
            <ProfileIcon />
            <ChevronIcon open={profileOpen} />
          </button>

          {profileOpen && (
            <div style={styles.dropdown}>
              <Link
                to="/profile"
                style={styles.dropdownItem}
                onClick={() => setProfileOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/orders"
                style={styles.dropdownItem}
                onClick={() => setProfileOpen(false)}
              >
                My Orders
              </Link>
              <div style={styles.dropdownDivider} />
              <button
                style={{ ...styles.dropdownItem, ...styles.logoutItem }}
                onClick={() => setProfileOpen(false)}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 3h2l2.4 12.4a2 2 0 002 1.6h7.2a2 2 0 002-1.6L20 7H6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="21" r="1.4" fill="white" />
      <circle cx="17" cy="21" r="1.4" fill="white" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9a6 6 0 0112 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9z"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 17a2.5 2.5 0 005 0"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="white" strokeWidth="2" />
      <path
        d="M4.5 20c1.5-4 5-5.5 7.5-5.5s6 1.5 7.5 5.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        marginLeft: 2,
        transition: "transform 0.2s",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    height: 60,
    background: "var(--glass-bg-dark)",
    WebkitBackdropFilter: "blur(var(--glass-blur))",
    backdropFilter: "blur(var(--glass-blur))",
    borderBottom: "1px solid var(--glass-border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    position: "sticky",
    top: 0,
    zIndex: 40,
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  logoText: {
    color: "white",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "1.1rem",
    letterSpacing: "0.14em",
  },
  icons: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  iconBtn: {
    position: "relative",
    background: "none",
    border: "none",
    display: "flex",
    alignItems: "center",
    padding: 4,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    background: "var(--color-badge)",
    color: "white",
    fontSize: "0.62rem",
    fontWeight: 700,
    borderRadius: "999px",
    minWidth: 15,
    height: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 3px",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 10px)",
    right: 0,
    background: "rgba(255,255,255,0.92)",
    WebkitBackdropFilter: "blur(16px)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.5)",
    borderRadius: "var(--radius-md)",
    boxShadow: "0 10px 30px rgba(43,33,29,0.22)",
    minWidth: 170,
    overflow: "hidden",
    zIndex: 50,
  },
  dropdownItem: {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "12px 16px",
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "var(--color-text-dark)",
    background: "none",
    border: "none",
  },
  dropdownDivider: {
    height: 1,
    background: "rgba(36,30,26,0.1)",
  },
  logoutItem: {
    color: "var(--color-accent-red)",
  },
};
