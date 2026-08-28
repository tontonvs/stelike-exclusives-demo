// WhatsApp order channel — Stelike Exclusives' number, in wa.me format
// (digits only, country code, no leading + or spaces).
export const WHATSAPP_ORDER_NUMBER = "233508783594";

// TODO(stelike): replace with the real Paystack public key from Stelike's
// own Paystack dashboard before this goes live. This placeholder key will
// not process a real charge — Paystack will reject it, and the Cart page
// shows a warning instead of opening the payment popup while it's unset.
export const PAYSTACK_PUBLIC_KEY = "pk_test_REPLACE_WITH_REAL_KEY";

export function isPaystackKeyConfigured(): boolean {
  return !PAYSTACK_PUBLIC_KEY.includes("REPLACE_WITH_REAL_KEY");
}
