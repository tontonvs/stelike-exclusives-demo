import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../components/ProductCard";
import {
  WHATSAPP_ORDER_NUMBER,
  PAYSTACK_PUBLIC_KEY,
  isPaystackKeyConfigured,
} from "../config";
import type { CartItem } from "../types";

function lineLabel(item: CartItem): string {
  const variant = item.product.variants?.find((v) => v.id === item.variantId);
  return variant ? `${item.product.name} — ${variant.label}` : item.product.name;
}

function linePrice(item: CartItem): number {
  const variant = item.product.variants?.find((v) => v.id === item.variantId);
  return variant ? variant.price : item.product.price;
}

function buildWhatsAppMessage(items: CartItem[], total: number): string {
  const lines = items.map(
    (item) =>
      `- ${item.quantity}x ${lineLabel(item)} (${formatPrice(linePrice(item))} each)`
  );
  return [
    "Hi Stelike Exclusives! I'd like to order:",
    "",
    ...lines,
    "",
    `Total: ${formatPrice(total)}`,
    "",
    "Name: ",
    "Delivery address: ",
  ].join("\n");
}

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total, clearCart } =
    useCart();
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  const emailValid = /^\S+@\S+\.\S+$/.test(email);

  function handlePaystack() {
    setPayError(null);

    if (!emailValid) {
      setEmailTouched(true);
      return;
    }

    if (!isPaystackKeyConfigured()) {
      setPayError(
        "Payments aren't switched on for this demo yet — the Paystack key still needs to be added. Use \u201cOrder via WhatsApp\u201d for now, or plug in the real key in src/config.ts."
      );
      return;
    }

    if (!window.PaystackPop) {
      setPayError(
        "Payment popup didn't load. Check your connection and try again."
      );
      return;
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: Math.round(total * 100), // GHS -> pesewas
      currency: "GHS",
      metadata: {
        items: items.map((item) => ({
          name: lineLabel(item),
          quantity: item.quantity,
        })),
      },
      callback: (response) => {
        setConfirmedRef(response.reference);
        clearCart();
      },
      onClose: () => {
        // user closed the popup without paying — nothing to do
      },
    });
    handler.openIframe();
  }

  function handleWhatsAppOrder() {
    const text = encodeURIComponent(buildWhatsAppMessage(items, total));
    window.open(
      `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${text}`,
      "_blank"
    );
  }

  if (confirmedRef) {
    return (
      <div style={styles.confirmWrap}>
        <CheckIcon />
        <h1 style={styles.confirmTitle}>Order Confirmed!</h1>
        <p style={styles.confirmText}>
          Reference: <strong>{confirmedRef}</strong>
        </p>
        <p style={styles.confirmSubtext}>
          We'll reach out on WhatsApp to arrange delivery.
        </p>
        <Link to="/" style={styles.startBtn}>
          Back to Home
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={styles.emptyState}>
        <CartGlyph />
        <p style={styles.emptyTitle}>Your cart is empty</p>
        <p style={styles.emptyText}>
          Browse the shop and add a few pieces you like.
        </p>
        <Link to="/shop" style={styles.startBtn}>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.wrap}>
      <h1 style={styles.heading}>Your Cart</h1>
      <p style={styles.subheading}>
        {items.reduce((n, i) => n + i.quantity, 0)} item(s)
      </p>

      <div style={styles.list}>
        {items.map((item) => {
          const image = item.product.images[0];
          return (
            <div key={`${item.product.id}-${item.variantId ?? ""}`} style={styles.row}>
              <div style={styles.thumb}>
                {image ? (
                  <img src={image} alt={item.product.name} style={styles.thumbImage} />
                ) : (
                  <span style={styles.thumbPlaceholder}>No photo</span>
                )}
              </div>

              <div style={styles.rowBody}>
                <p style={styles.rowName}>{lineLabel(item)}</p>
                <p style={styles.rowPrice}>{formatPrice(linePrice(item))}</p>

                <div style={styles.qtyRow}>
                  <div style={styles.stepper}>
                    <button
                      aria-label="Decrease quantity"
                      style={styles.stepperBtn}
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.variantId,
                          item.quantity - 1
                        )
                      }
                    >
                      −
                    </button>
                    <span style={styles.stepperValue}>{item.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      style={styles.stepperBtn}
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.variantId,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    style={styles.removeBtn}
                    onClick={() => removeFromCart(item.product.id, item.variantId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p style={styles.deliveryNote}>
        Delivery within Accra, Achimota &amp; East Legon — confirmed after
        checkout.
      </p>

      <div style={styles.summary}>
        <span style={styles.summaryLabel}>Total</span>
        <span style={styles.summaryValue}>{formatPrice(total)}</span>
      </div>

      <div style={styles.emailField}>
        <label style={styles.emailLabel} htmlFor="checkout-email">
          Email for receipt (needed for card/Mobile Money payment)
        </label>
        <input
          id="checkout-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          placeholder="you@example.com"
          style={styles.emailInput}
        />
        {emailTouched && !emailValid && (
          <p style={styles.emailError}>Enter a valid email to pay by card or Mobile Money.</p>
        )}
      </div>

      {payError && <p style={styles.payError}>{payError}</p>}

      <button style={styles.payBtn} onClick={handlePaystack}>
        Pay with Paystack
      </button>
      <button style={styles.whatsappBtn} onClick={handleWhatsAppOrder}>
        Order via WhatsApp
      </button>
      <p style={styles.whatsappHint}>
        Opens WhatsApp with your order pre-filled — just hit send.
      </p>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="var(--color-accent-green)" strokeWidth="2" />
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="var(--color-accent-green)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartGlyph() {
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 3h2l2.4 12.4a2 2 0 002 1.6h7.2a2 2 0 002-1.6L20 7H6"
        stroke="var(--color-text-muted)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="21" r="1.4" fill="var(--color-text-muted)" />
      <circle cx="17" cy="21" r="1.4" fill="var(--color-text-muted)" />
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
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    marginBottom: 18,
  },
  row: {
    display: "flex",
    gap: 12,
  },
  thumb: {
    width: 68,
    height: 68,
    flexShrink: 0,
    borderRadius: "var(--radius-sm)",
    background: "#F1EEE6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  thumbImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  thumbPlaceholder: {
    fontSize: "0.58rem",
    color: "#A9A297",
    textAlign: "center",
    padding: "0 4px",
  },
  rowBody: {
    flex: 1,
  },
  rowName: {
    margin: 0,
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--color-text-dark)",
  },
  rowPrice: {
    margin: "2px 0 8px",
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "var(--color-brand)",
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #E7E1D3",
    borderRadius: "var(--radius-sm)",
  },
  stepperBtn: {
    width: 28,
    height: 28,
    border: "none",
    background: "none",
    fontSize: "1rem",
    color: "var(--color-text-dark)",
  },
  stepperValue: {
    minWidth: 22,
    textAlign: "center",
    fontSize: "0.82rem",
    fontWeight: 600,
    color: "var(--color-text-dark)",
  },
  removeBtn: {
    background: "none",
    border: "none",
    fontSize: "0.76rem",
    fontWeight: 600,
    color: "var(--color-accent-red)",
  },
  deliveryNote: {
    fontSize: "0.74rem",
    color: "var(--color-text-muted)",
    margin: "0 0 14px",
  },
  summary: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    borderTop: "1px solid #E7E1D3",
    borderBottom: "1px solid #E7E1D3",
    padding: "12px 0",
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "var(--color-text-dark)",
  },
  summaryValue: {
    fontFamily: "var(--font-display)",
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "var(--color-text-dark)",
  },
  emailField: {
    marginBottom: 14,
  },
  emailLabel: {
    display: "block",
    fontSize: "0.74rem",
    fontWeight: 600,
    color: "var(--color-text-muted)",
    marginBottom: 6,
  },
  emailInput: {
    width: "100%",
    border: "1px solid #E7E1D3",
    borderRadius: "var(--radius-sm)",
    padding: "10px 12px",
    fontSize: "0.85rem",
    color: "var(--color-text-dark)",
    background: "var(--color-card)",
    outline: "none",
  },
  emailError: {
    margin: "6px 0 0",
    fontSize: "0.72rem",
    color: "var(--color-accent-red)",
  },
  payError: {
    fontSize: "0.76rem",
    color: "var(--color-accent-red)",
    background: "#FBEAEA",
    border: "1px solid #F3CACA",
    borderRadius: "var(--radius-sm)",
    padding: "10px 12px",
    marginBottom: 12,
  },
  payBtn: {
    width: "100%",
    background: "var(--color-brand)",
    color: "white",
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "14px 0",
    fontSize: "0.92rem",
    fontWeight: 700,
    marginBottom: 10,
  },
  whatsappBtn: {
    width: "100%",
    background: "none",
    color: "var(--color-text-dark)",
    border: "1.5px solid var(--color-text-dark)",
    borderRadius: "var(--radius-sm)",
    padding: "13px 0",
    fontSize: "0.92rem",
    fontWeight: 700,
  },
  whatsappHint: {
    margin: "8px 0 0",
    fontSize: "0.7rem",
    color: "var(--color-text-muted)",
    textAlign: "center",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  emptyTitle: {
    margin: "16px 0 4px",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "1.05rem",
    color: "var(--color-text-dark)",
  },
  emptyText: {
    margin: "0 0 22px",
    fontSize: "0.85rem",
    color: "var(--color-text-muted)",
  },
  startBtn: {
    display: "inline-block",
    background: "var(--color-brand)",
    color: "white",
    fontWeight: 600,
    fontSize: "0.88rem",
    padding: "12px 28px",
    borderRadius: "var(--radius-sm)",
  },
  confirmWrap: {
    padding: "70px 24px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  confirmTitle: {
    margin: "16px 0 6px",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "1.2rem",
    color: "var(--color-text-dark)",
  },
  confirmText: {
    margin: "0 0 4px",
    fontSize: "0.85rem",
    color: "var(--color-text-dark)",
  },
  confirmSubtext: {
    margin: "0 0 22px",
    fontSize: "0.8rem",
    color: "var(--color-text-muted)",
  },
};
