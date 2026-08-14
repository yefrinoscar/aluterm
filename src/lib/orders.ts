import type { PackId } from "../data/product";

export type PaymentMethod = "mercadopago" | "yape" | "contraentrega";

export type Order = {
  id: string;
  createdAt: string;
  packId: PackId;
  units: number;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: "pending" | "paid" | "cod" | "cancelled";
  buyer: {
    name: string;
    phone: string;
    email: string;
    dni?: string;
    department: string;
    district: string;
    address: string;
    reference?: string;
  };
  mpPreferenceId?: string;
  mpPaymentId?: string;
  notes?: string;
};

export type OrderStore = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

export type RuntimeEnv = Record<string, unknown>;

const orderKey = (id: string) => `order:${id}`;

async function filePath(): Promise<string> {
  const path = await import("node:path");
  return path.join(process.cwd(), ".data", "orders.json");
}

async function load(): Promise<Order[]> {
  try {
    const { readFile } = await import("node:fs/promises");
    const raw = await readFile(await filePath(), "utf8");
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

async function save(orders: Order[]): Promise<void> {
  const { mkdir, writeFile } = await import("node:fs/promises");
  const path = await import("node:path");
  const target = await filePath();
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, JSON.stringify(orders, null, 2), "utf8");
}

export function makeOrderId(): string {
  const day = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AT-${day}-${rand}`;
}

export async function createOrder(order: Order, store?: OrderStore): Promise<Order> {
  if (store) {
    await store.put(orderKey(order.id), JSON.stringify(order));
    return order;
  }
  const orders = await load();
  orders.push(order);
  await save(orders);
  return order;
}

export async function updateOrder(
  id: string,
  patch: Partial<Order>,
  store?: OrderStore,
): Promise<Order | undefined> {
  if (store) {
    const current = await findOrder(id, store);
    if (!current) return undefined;
    const updated = { ...current, ...patch };
    await store.put(orderKey(id), JSON.stringify(updated));
    return updated;
  }
  const orders = await load();
  const index = orders.findIndex((item) => item.id === id);
  if (index < 0) return undefined;
  orders[index] = { ...orders[index], ...patch };
  await save(orders);
  return orders[index];
}

export async function findOrder(id: string, store?: OrderStore): Promise<Order | undefined> {
  if (store) {
    const raw = await store.get(orderKey(id));
    return raw ? (JSON.parse(raw) as Order) : undefined;
  }
  const orders = await load();
  return orders.find((item) => item.id === id);
}

export function isValidPhone(phone: string): boolean {
  return /^9\d{8}$/.test(phone.replace(/\s+/g, ""));
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function notifyOrder(order: Order, env?: RuntimeEnv): Promise<void> {
  const hook = typeof env?.ORDER_NOTIFY_WEBHOOK === "string"
    ? env.ORDER_NOTIFY_WEBHOOK
    : typeof process !== "undefined"
      ? process.env.ORDER_NOTIFY_WEBHOOK
      : undefined;
  if (!hook) return;
  try {
    await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
  } catch (error) {
    console.error("notifyOrder failed", error);
  }
}
