export {};

interface PaystackTransaction {
  reference: string;
  status: string;
  message: string;
  trans: string;
  transaction: string;
}

interface PaystackSetupOptions {
  key: string;
  email: string;
  amount: number; // smallest currency unit (pesewas for GHS)
  currency?: string;
  ref?: string;
  metadata?: Record<string, unknown>;
  onClose?: () => void;
  callback: (response: PaystackTransaction) => void;
}

interface PaystackHandler {
  openIframe: () => void;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: PaystackSetupOptions) => PaystackHandler;
    };
  }
}
