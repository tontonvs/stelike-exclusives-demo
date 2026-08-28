import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/", icon: HomeIcon },
  { label: "Shop", path: "/shop", icon: ShopIcon },
  { label: "Orders", path: "/orders", icon: OrdersIcon },
  { label: "About Us", path: "/about", icon: AboutIcon },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav style={styles.nav}>
      {navItems.map(({ label, path, icon: Icon }) => {
        const active = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            style={{
              ...styles.item,
              color: active ? "var(--color-navy)" : "var(--color-text-muted)",
            }}
          >
            <Icon active={active} />
            <span style={styles.label}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

interface IconProps {
  active: boolean;
}

function iconColor(active: boolean) {
  return active ? "var(--color-navy)" : "#8A96A0";
}

function HomeIcon({ active }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-8z"
        stroke={iconColor(active)}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShopIcon({ active }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 8l1.5-4h13L20 8"
        stroke={iconColor(active)}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x="4"
        y="8"
        width="16"
        height="12"
        rx="1"
        stroke={iconColor(active)}
        strokeWidth="2"
      />
    </svg>
  );
}

function OrdersIcon({ active }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect
        x="5"
        y="4"
        width="14"
        height="17"
        rx="1"
        stroke={iconColor(active)}
        strokeWidth="2"
      />
      <line
        x1="8"
        y1="9"
        x2="16"
        y2="9"
        stroke={iconColor(active)}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="13"
        x2="16"
        y2="13"
        stroke={iconColor(active)}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AboutIcon({ active }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke={iconColor(active)} strokeWidth="2" />
      <line
        x1="12"
        y1="11"
        x2="12"
        y2="16"
        stroke={iconColor(active)}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="8" r="1" fill={iconColor(active)} />
    </svg>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    height: 64, // ~1.7cm
    background: "var(--color-card)",
    borderTop: "1px solid #EAE5D9",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 480,
    zIndex: 40,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
  },
  label: {
    fontSize: "0.65rem",
    fontWeight: 600,
  },
};
