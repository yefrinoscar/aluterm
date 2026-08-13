import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
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

const filePath = path.join(process.cwd(), ".data", "orders.json");

async function load(): Promise<Order[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

async function save(orders: Order[]): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(orders, null, 2), "utf8");
}

export function makeOrderId(): string {
  const day = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AT-${day}-${rand}`;
}

export async function createOrder(order: Order): Promise<Order> {
  const orders = await load();
  orders.push(order);
  await save(orders);
  return order;
}

export async function updateOrder(
  id: string,
  patch: Partial<Order>,
): Promise<Order | undefined> {
  const orders = await load();
  const index = orders.findIndex((item) => item.id === id);
  if (index < 0) return undefined;
  orders[index] = { ...orders[index], ...patch };
  await save(orders);
  return orders[index];
}

export async function findOrder(id: string): Promise<Order | undefined> {
  const orders = await load();
  return orders.find((item) => item.id === id);
}

export function isValidPhone(phone: string): boolean {
  return /^9\d{8}$/.test(phone.replace(/\s+/g, ""));
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function notifyOrder(order: Order): Promise<void> {
  const hook = process.env.ORDER_NOTIFY_WEBHOOK;
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
