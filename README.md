# AluTerm — Manta térmica de emergencia

Landing de venta en Astro. SEO estático, checkout con Mercado Pago, Yape y contraentrega.

## Packs

| Pack | Precio | Unidad | Envío |
| --- | --- | --- | --- |
| 1 unidad | S/ 15 | S/ 15 | S/ 10 Lima · S/ 15 provincias |
| Pack x3 | S/ 42 | S/ 14 | igual |
| Pack x5 | S/ 65 | S/ 13 | **gratis** |

## Local

```bash
cp .env.example .env
npm install
npm run dev
```

Abre `http://localhost:4321`.

## Producción

1. Copia `.env.example` y llena las claves.
2. Mercado Pago: crea una app en [developers](https://www.mercadopago.com.pe/developers), pega `MP_ACCESS_TOKEN` y `PUBLIC_MP_PUBLIC_KEY`. Activa Yape dentro de Checkout Pro.
3. Yape directo: pon tu número en `PUBLIC_YAPE_PHONE` y reemplaza `public/images/yape-qr.svg` por el QR real (`yape-qr.png` y cambia la ruta en `Checkout.astro` si hace falta).
4. WhatsApp: `PUBLIC_WHATSAPP=51XXXXXXXXX`.
5. Publicidad: GTM, GA4, Meta Pixel, Google Ads y TikTok. Si un ID va vacío, no se inyecta el script.
6. `PUBLIC_SITE_URL` debe ser `https` para que Mercado Pago acepte `back_urls` y el webhook.

```bash
npm run build
npm start
```

Railway / Docker: el `Dockerfile` expone el `4321`.

## Pedidos

Se guardan en `.data/orders.json`. El webhook de Mercado Pago está en `/api/webhook`. Si pones `ORDER_NOTIFY_WEBHOOK`, cada pedido se reenvía ahí (Make, n8n, Slack).

## SEO

- `sitemap-index.xml`, `robots.txt`, `llms.txt`
- JSON-LD: Product, Offer, FAQ, HowTo, Organization
- Open Graph + Twitter + hreflang `es-PE`
- Páginas legales listas para Google Ads y Meta
