import loadPaystackScript from "@paystack/inline-js";

export type PaystackSuccessResponse = {
  reference: string;
  trans: string;
  status: string;
  message: string;
  // ...other Paystack return fields you may use
};

export async function startPaystackPayment({
  email,
  amount,
  onSuccess,
  onClose,
}: {
  email: string;
  amount: number; // amount in Ghana Cedis
  onSuccess: (ref: PaystackSuccessResponse) => void;
  onClose: () => void;
}) {
  await new loadPaystackScript();

  interface PaystackPop {
    setup(options: {
      key: string;
      email: string;
      amount: number;
      currency: string;
      callback: (response: PaystackSuccessResponse) => void;
      onClose: () => void;
    }): { openIframe: () => void };
  }

  const handler = ((window as unknown) as { PaystackPop: PaystackPop }).PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    email,
    amount: amount * 100, // GHS to pesewas
    currency: "GHS",
    callback: onSuccess,
    onClose,
  });

  handler.openIframe();
}
