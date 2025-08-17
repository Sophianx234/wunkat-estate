export async function startPaystackPayment({
  email,
  amount,
  onSuccess,
  onClose,
}: {
  email: string;
  amount: number; // in GHS
  onSuccess: (ref: any) => void;
  onClose: () => void;
}) {
  // Dynamically import Paystack script only on client
  if (typeof window === "undefined") return;

  const { default: loadPaystackScript } = await import("@paystack/inline-js");
  await new loadPaystackScript();

  interface PaystackPop {
    setup(options: {
      key: string;
      email: string;
      amount: number;
      currency: string;
      callback: (response: any) => void;
      onClose: () => void;
    }): { openIframe: () => void };
  }

  const handler = ((window as any).PaystackPop as PaystackPop).setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!, // ✅ Make sure this is set in .env.local
    email,
    amount: amount * 100, // convert GHS → pesewas
    currency: "GHS",
    callback: onSuccess,
    onClose,
  });

  handler.openIframe();
}
