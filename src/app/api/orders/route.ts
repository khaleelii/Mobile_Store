import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";
import type { CheckoutPayload } from "@/lib/types";

export async function POST(request: Request) {
  let body: CheckoutPayload;
  try {
    body = (await request.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const result = createOrder(body);
  if (result.errors?.length) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  return NextResponse.json({ orderId: result.order!.id }, { status: 201 });
}
