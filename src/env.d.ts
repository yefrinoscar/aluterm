/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_WHATSAPP: string;
  readonly PUBLIC_YAPE_PHONE: string;
  readonly PUBLIC_YAPE_NAME: string;
  readonly PUBLIC_MP_PUBLIC_KEY: string;
  readonly PUBLIC_SHIPPING_LIMA: string;
  readonly PUBLIC_SHIPPING_PROVINCIA: string;
  readonly PUBLIC_GTM_ID: string;
  readonly PUBLIC_GA4_ID: string;
  readonly PUBLIC_META_PIXEL_ID: string;
  readonly PUBLIC_GOOGLE_ADS_ID: string;
  readonly PUBLIC_GOOGLE_ADS_CONVERSION_LABEL: string;
  readonly PUBLIC_TIKTOK_PIXEL_ID: string;
  readonly MP_ACCESS_TOKEN: string;
  readonly MP_WEBHOOK_SECRET: string;
  readonly ORDER_NOTIFY_WEBHOOK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
