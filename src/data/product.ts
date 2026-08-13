export const brand = {
  name: "AluTerm",
  legalName: "AluTerm Perú",
  tagline: "Manta térmica de emergencia",
  email: "hola@mantatermica.pe",
  city: "Lima, Perú",
};

export const siteUrl = (
  import.meta.env.PUBLIC_SITE_URL || "https://mantatermica.pe"
).replace(/\/$/, "");

export const product = {
  sku: "AT-140-210",
  name: "Manta térmica de emergencia Mylar AluTerm",
  shortName: "Manta térmica AluTerm",
  headline: "Conserva el 90% de tu calor. Cabe en la palma de tu mano.",
  subhead:
    "Manta aluminizada de Mylar 140 × 210 cm. Impermeable, cortaviento y ultraligera. Para sismos, auto, trekking y camping en todo el Perú.",
  description:
    "Manta térmica aluminizada de Mylar de emergencia de 140 × 210 cm. Refleja hasta el 90% del calor corporal para prevenir la hipotermia. Impermeable, cortaviento, ~52 g y se pliega al tamaño de una billetera. Ideal para kit de sismo, guantera del auto, mochila de trekking y camping.",
  material: "Mylar aluminizado (poliéster metalizado)",
  color: "Plateado reflectante",
  widthCm: 210,
  heightCm: 140,
  weightG: 52,
  heatRetention: 90,
  condition: "Nuevo",
  origin: "Importado",
  gtin: undefined as string | undefined,
};

export type PackId = "unit" | "pack3" | "pack5";

export type Pack = {
  id: PackId;
  units: number;
  title: string;
  subtitle: string;
  price: number;
  compareAt: number;
  unitPrice: number;
  badge?: string;
  highlight?: boolean;
  freeShipping: boolean;
};

export const packs: Pack[] = [
  {
    id: "unit",
    units: 1,
    title: "1 unidad",
    subtitle: "Para la mochila o el auto",
    price: 15,
    compareAt: 15,
    unitPrice: 15,
    freeShipping: false,
  },
  {
    id: "pack3",
    units: 3,
    title: "Pack x3",
    subtitle: "Casa + auto + mochila",
    price: 42,
    compareAt: 45,
    unitPrice: 14,
    freeShipping: false,
  },
  {
    id: "pack5",
    units: 5,
    title: "Pack x5",
    subtitle: "La familia y el kit de 72 h",
    price: 65,
    compareAt: 75,
    unitPrice: 13,
    badge: "Más vendido",
    highlight: true,
    freeShipping: true,
  },
];

export const shipping = {
  lima: Number(import.meta.env.PUBLIC_SHIPPING_LIMA || 10),
  provincia: Number(import.meta.env.PUBLIC_SHIPPING_PROVINCIA || 15),
  freeFromUnits: 5,
};

export function getPack(id: string): Pack | undefined {
  return packs.find((pack) => pack.id === id);
}

export function shippingFor(pack: Pack, department: string): number {
  if (pack.freeShipping || pack.units >= shipping.freeFromUnits) return 0;
  const lima = department === "Lima" || department === "Callao";
  return lima ? shipping.lima : shipping.provincia;
}

export const departments = [
  "Amazonas",
  "Áncash",
  "Apurímac",
  "Arequipa",
  "Ayacucho",
  "Cajamarca",
  "Callao",
  "Cusco",
  "Huancavelica",
  "Huánuco",
  "Ica",
  "Junín",
  "La Libertad",
  "Lambayeque",
  "Lima",
  "Loreto",
  "Madre de Dios",
  "Moquegua",
  "Pasco",
  "Piura",
  "Puno",
  "San Martín",
  "Tacna",
  "Tumbes",
  "Ucayali",
] as const;

export const benefits = [
  {
    title: "Retiene el 90% del calor",
    text: "El Mylar aluminizado refleja tu propio calor corporal. Es la misma tecnología que usan rescatistas y maratonistas para evitar la hipotermia.",
  },
  {
    title: "140 × 210 cm",
    text: "Cubre a un adulto completo. También sirve como suelo, techo improvisado o señal de rescate por su brillo.",
  },
  {
    title: "52 gramos",
    text: "Pesa menos que una manzana y se pliega al tamaño de una billetera. Entra en la guantera, la riñonera o el kit de 72 horas.",
  },
  {
    title: "Agua, viento y sol",
    text: "Impermeable y cortaviento. La cara plateada también refleja el sol si necesitas sombra o protegerte del calor extremo.",
  },
];

export const uses = [
  {
    id: "sismo",
    title: "Kit de sismo",
    text: "En el Perú un temblor no avisa. Métela en la mochila de 72 horas: abriga si hay que dormir afuera, tapa la lluvia y no ocupa casi nada.",
  },
  {
    id: "auto",
    title: "Guantera y carretera",
    text: "Atasco en la sierra, panne de madrugada o un rescate en la vía. La manta de emergencia es el ítem que más falta cuando hace frío.",
  },
  {
    id: "trekking",
    title: "Trekking y altura",
    text: "Andes, Salkantay, Ausangate o un cerro cerca de Lima. Si baja la temperatura o te mojas, esta manta te compra tiempo.",
  },
  {
    id: "camping",
    title: "Camping y primeros auxilios",
    text: "Suelo aislante, techo improvisado, protector solar o inmovilización de emergencia. Un solo ítem, varios usos.",
  },
];

export const steps = [
  {
    n: "01",
    title: "Ábrela y envuélvete",
    text: "Despliégala y cúbrete dejando la cara plateada hacia adentro para devolver el calor al cuerpo.",
  },
  {
    n: "02",
    title: "Sella el viento",
    text: "Tápate la cabeza si puedes y evita que entre aire por los pies. El viento es lo que más te enfría.",
  },
  {
    n: "03",
    title: "Señala o protégete",
    text: "Si necesitas que te vean, deja la cara plateada afuera: refleja linternas y sol. También sirve de toldo o suelo seco.",
  },
];

export const specs = [
  { label: "Material", value: "Mylar aluminizado" },
  { label: "Medidas", value: "140 × 210 cm" },
  { label: "Peso", value: "52 g aprox." },
  { label: "Color", value: "Plateado reflectante" },
  { label: "Retención de calor", value: "Hasta 90%" },
  { label: "Resistencia", value: "Impermeable y cortaviento" },
  { label: "Plegado", value: "Tamaño billetera" },
  { label: "Usos", value: "Emergencia, trekking, auto, sismo" },
];

export const faqs = [
  {
    q: "¿Qué tamaño tiene la manta térmica?",
    a: "Mide 140 × 210 cm. Cubre a un adulto recostado o sentado envuelto. Plegada cabe en la palma de la mano.",
  },
  {
    q: "¿De qué material es?",
    a: "Mylar aluminizado: una película de poliéster metalizada, la misma que usan los equipos de rescate. Es liviana, reflectante e impermeable.",
  },
  {
    q: "¿Sirve para el kit de sismo en Perú?",
    a: "Sí. Es uno de los ítems más recomendados para la mochila de 72 horas: abriga, tapa la lluvia y no pesa. El pack de 5 alcanza para la familia.",
  },
  {
    q: "¿Cómo se paga?",
    a: "Puedes pagar con Mercado Pago (tarjeta, Yape, Plin y más), Yape directo al número de la tienda, o contraentrega al recibir el pedido.",
  },
  {
    q: "¿Hacen contraentrega?",
    a: "Sí, en Lima y provincias. Pagas en efectivo al courier cuando llega el paquete.",
  },
  {
    q: "¿El envío es gratis?",
    a: `El pack de 5 unidades incluye envío gratis a todo el Perú. En 1 o 3 unidades el envío es S/ ${shipping.lima} en Lima/Callao y S/ ${shipping.provincia} en provincias.`,
  },
  {
    q: "¿Cuánto tarda en llegar?",
    a: "Lima y Callao: 24 a 48 horas hábiles. Provincias: 2 a 5 días hábiles, según el destino.",
  },
  {
    q: "¿Se puede reutilizar?",
    a: "Sí, si no se rompe. Doblala con cuidado. En una emergencia real es descartable; para el auto o la mochila puedes tenerla lista y volver a guardarla.",
  },
  {
    q: "¿Cubre el frío de la sierra?",
    a: "Refleja tu calor, no genera calor propio. En trekking o un atasco te ayuda a no perder temperatura. No reemplaza un saco de dormir de alta montaña.",
  },
  {
    q: "¿Hay cambios o devoluciones?",
    a: "Tienes 7 días si el producto llega fallado o no es el que pediste. Al ser un artículo de emergencia, no aceptamos devoluciones por uso o cambio de opinión una vez abierto el sobre.",
  },
];

export const seo = {
  title:
    "Manta Térmica de Emergencia Mylar 140x210 | Conserva el 90% del calor | AluTerm Perú",
  description:
    "Manta térmica aluminizada de Mylar 140×210 cm. Refleja el 90% del calor, pesa 52 g y cabe en la palma. Packs x3 y x5. Envío gratis desde 5 unidades. Yape, Mercado Pago y contraentrega a todo el Perú.",
  keywords: [
    "manta térmica",
    "manta térmica de emergencia",
    "manta mylar",
    "manta aluminizada",
    "manta térmica trekking",
    "manta térmica camping",
    "manta de supervivencia",
    "manta isotérmica",
    "kit emergencia sismo Perú",
    "manta térmica auto",
    "manta térmica 140x210",
    "manta emergencia Lima",
    "space blanket Perú",
  ].join(", "),
};
