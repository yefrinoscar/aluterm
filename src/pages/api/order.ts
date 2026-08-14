import type { APIRoute } from "astro";
import { departments, getPack, shippingFor } from "../../data/product";
import {
  createOrder,
  isValidEmail,
  isValidPhone,
  makeOrderId,
  notifyOrder,
  type OrderStore,
  type PaymentMethod,
  type RuntimeEnv,
} from "../../lib/orders";
import { createPreference, mercadoPagoReady } from "../../lib/mercadopago";

export const prerender = false;

const methods: PaymentMethod[] = ["mercadopago", "yape", "contraentrega"];

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as { runtime?: { env?: RuntimeEnv } }).runtime?.env;
  const store = env?.ORDERS as OrderStore | undefined;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Pedido inválido" }, 400);
  }

  const pack = getPack(String(body.packId || ""));
  if (!pack) return json({ error: "Elige un pack" }, 400);

  const paymentMethod = String(body.paymentMethod || "") as PaymentMethod;
  if (!methods.includes(paymentMethod)) {
    return json({ error: "Elige un método de pago" }, 400);
  }

  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").replace(/\s+/g, "");
  const email = String(body.email || "").trim();
  const department = String(body.department || "").trim();
  const district = String(body.district || "").trim();
  const address = String(body.address || "").trim();
  const dni = String(body.dni || "").trim();
  const reference = String(body.reference || "").trim();

  if (name.length < 3) return json({ error: "Escribe tu nombre completo" }, 400);
  if (!isValidPhone(phone)) return json({ error: "Celular inválido. Usa 9 dígitos." }, 400);
  if (!isValidEmail(email)) return json({ error: "Correo inválido" }, 400);
  if (!departments.includes(department as (typeof departments)[number])) {
    return json({ error: "Elige un departamento" }, 400);
  }
  if (district.length < 2) return json({ error: "Escribe tu distrito" }, 400);
  if (address.length < 5) return json({ error: "Escribe tu dirección" }, 400);
  if (dni && !/^\d{8}$/.test(dni)) return json({ error: "DNI debe tener 8 dígitos" }, 400);

  if (paymentMethod === "mercadopago" && !mercadoPagoReady(env)) {
    return json(
      {
        error:
          "Mercado Pago aún no está configurado. Paga con Yape o contraentrega, o agrega MP_ACCESS_TOKEN.",
      },
      400,
    );
  }

  const ship = shippingFor(pack, department);
  const order = await createOrder({
    id: makeOrderId(),
    createdAt: new Date().toISOString(),
    packId: pack.id,
    units: pack.units,
    subtotal: pack.price,
    shipping: ship,
    total: pack.price + ship,
    paymentMethod,
    status: paymentMethod === "contraentrega" ? "cod" : "pending",
    buyer: { name, phone, email, dni: dni || undefined, department, district, address, reference },
    notes: JSON.stringify(body.attribution || {}),
  }, store);

  await notifyOrder(order, env);

  if (paymentMethod === "mercadopago") {
    try {
      const pref = await createPreference(order, env);
      return json({
        orderId: order.id,
        status: order.status,
        initPoint: pref.initPoint,
        preferenceId: pref.id,
      });
    } catch (error) {
      console.error(error);
      return json(
        { error: "No se pudo abrir Mercado Pago. Prueba Yape o contraentrega." },
        502,
      );
    }
  }

  return json({
    orderId: order.id,
    status: order.status,
    total: order.total,
    paymentMethod,
  });
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
