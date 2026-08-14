import type { APIRoute } from "astro";
import { getPayment } from "../../lib/mercadopago";
import { updateOrder, type OrderStore, type RuntimeEnv } from "../../lib/orders";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as { runtime?: { env?: RuntimeEnv } }).runtime?.env;
  const store = env?.ORDERS as OrderStore | undefined;
  let payload: Record<string, unknown> = {};
  try {
    payload = await request.json();
  } catch {
    return new Response("ok", { status: 200 });
  }

  const type = String(payload.type || payload.topic || "");
  const data = payload.data as { id?: string } | undefined;
  const paymentId = data?.id || new URL(request.url).searchParams.get("data.id");

  if ((type === "payment" || type.includes("payment")) && paymentId) {
    try {
      const payment = await getPayment(String(paymentId), env);
      const ref = String(payment?.external_reference || "");
      const status = String(payment?.status || "");
      if (ref) {
        await updateOrder(ref, {
          status: status === "approved" ? "paid" : status === "rejected" ? "cancelled" : "pending",
          mpPaymentId: String(paymentId),
        }, store);
      }
    } catch (error) {
      console.error("webhook payment", error);
    }
  }

  return new Response("ok", { status: 200 });
};
