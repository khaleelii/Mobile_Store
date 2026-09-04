import { NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) {
    return NextResponse.json({ message: "Order not found." }, { status: 404 });
  }
  return NextResponse.json(order);
}
