import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import type { Order } from "./orders";
import { product, siteUrl } from "../data/product";

function client() {
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) return null;
  return new MercadoPagoConfig({ accessToken: token });
}

export function mercadoPagoReady(): boolean {
  return Boolean(process.env.MP_ACCESS_TOKEN);
}

export async function createPreference(order: Order) {
  const mp = client();
  if (!mp) throw new Error("Mercado Pago no está configurado");

  const preference = new Preference(mp);
  const result = await preference.create({
    body: {
      items: [
        {
          id: order.packId,
          title: `${product.shortName} · ${order.units} unidad${order.units > 1 ? "es" : ""}`,
          description: product.description,
          quantity: 1,
          currency_id: "PEN",
          unit_price: order.total,
          category_id: "others",
        },
      ],
      payer: {
        name: order.buyer.name,
        email: order.buyer.email,
        phone: { number: order.buyer.phone },
        identification: order.buyer.dni
          ? { type: "DNI", number: order.buyer.dni }
          : undefined,
        address: {
          street_name: order.buyer.address,
          zip_code: "",
        },
      },
      back_urls: {
        success: `${siteUrl}/gracias?order=${order.id}&status=success`,
        failure: `${siteUrl}/gracias?order=${order.id}&status=failure`,
        pending: `${siteUrl}/gracias?order=${order.id}&status=pending`,
      },
      auto_return: "approved",
      notification_url: `${siteUrl}/api/webhook`,
      external_reference: order.id,
      statement_descriptor: "ALUTERM",
      metadata: {
        order_id: order.id,
        pack_id: order.packId,
        units: String(order.units),
      },
      payment_methods: {
        installments: 6,
      },
    },
  });

  return {
    id: result.id,
    initPoint: result.init_point || result.sandbox_init_point,
  };
}

export async function getPayment(paymentId: string) {
  const mp = client();
  if (!mp) return null;
  const api = new Payment(mp);
  return api.get({ id: paymentId });
}
