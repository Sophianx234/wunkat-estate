export interface PaystackResponse {
  reference: string;
  trans: string;
  status: "success" | "failed" | "abandoned";
  message: string;
  transaction: string;
  trxref: string;
}

export async function startPaystackPayment({
  email,
  amount,
  onSuccess,
  onClose,
}: {
  email: string;
  amount: number; // in GHS
  onSuccess: (ref: PaystackResponse) => void;
  onClose: () => void;
}) {
  if (typeof window === "undefined") return;

  const { default: loadPaystackScript } = await import("@paystack/inline-js");
  await new loadPaystackScript();

  interface PaystackPop {
    setup(options: {
      key: string;
      email: string;
      amount: number;
      currency: string;
      callback: (response: PaystackResponse) => void;
      onClose: () => void;
    }): { openIframe: () => void };
  }

  const handler = ((window as unknown as { PaystackPop: PaystackPop }).PaystackPop).setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    email,
    amount: amount * 100, // convert GHS → pesewas
    currency: "GHS",
    callback: onSuccess,
    onClose,
  });

  handler.openIframe();
}
