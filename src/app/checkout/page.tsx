import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your MobileStore order with shipping and payment.",
};

export default function CheckoutPage() {
  return (
    <>
      <h1 className="page-title">Checkout</h1>
      <CheckoutForm />
    </>
  );
}
