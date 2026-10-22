// Все тексты и моковые данные сайта собраны здесь — меняйте в одном месте.
// Меню (товары каталога) — в ./menu.ts
import { findProduct, menu, type Product } from "./menu";

export type { Product } from "./menu";

export const site = {
  name: "Maki Maki",
  tagline: "Доставка суши и роллов",
  city: "Алматы",
  currency: "₸",
  phone: "+7 (000) 000-00-00",
  phoneHref: "tel:+70000000000",
  telegramChannel: "Maki Maki",
  telegramHref: "https://t.me/",
  whatsappHref: "https://wa.me/70000000000",
  vkHref: "https://vk.com/",
  okHref: "https://ok.ru/",
  email: "hello@maki-maki.kz",
  address: "г. Алматы, пр. Абая, 1",
  hours: [
    ["Пн—Чт", "с 11:00 до 23:00"],
    ["Пт—Вс", "с 11:00 до 00:00"],
  ] as [string, string][],
  legal: "ТОО «Maki Maki» · БИН 000000000000",
  /** Координаты для карты [долгота, широта] */
  mapCenter: [76.9286, 43.2383] as [number, number],
  year: 2026,
};

export const navLinks = [
  { href: "/catalog", label: "Меню" },
  { href: "/about", label: "О нас" },
  { href: "/payment", label: "Оплата" },
  { href: "/delivery", label: "Доставка" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/promo", label: "Акции" },
  { href: "/contacts", label: "Контакты" },
];


export const heroCategories = [
  {
    title: "Роллы",
    slug: "rolls",
    text: "Большой выбор\nна любой вкус",
    image: "/images/cat-rolls.webp",
    theme: "dark" as const,
  },
  {
    title: "Сеты",
    slug: "sets",
    text: "Вкусно и\nвыгодно",
    image: "/images/cat-sets.webp",
    theme: "light" as const,
  },
  {
    title: "Суши",
    slug: "sushi",
    text: "Классика\nЯпонии",
    image: "/images/cat-sushi.webp",
    theme: "dark" as const,
  },
  {
    title: "Напитки\nи соусы",
    slug: "drinks",
    text: "",
    image: "/images/cat-drinks.webp",
    theme: "accent" as const,
  },
];

export const advantages = [
  { icon: "snowflake", title: "Свежесть", text: "Только свежие ингредиенты" },
  { icon: "award", title: "Качество", text: "Контроль качества на каждом этапе" },
  { icon: "thumbs", title: "Любимый вкус", text: "готовим так, чтобы хотелось еще" },
] as const;

export const categoryTiles = [
  { title: "Роллы", slug: "rolls", image: "/images/tile-rolls.webp" },
  { title: "Суши", slug: "sushi", image: "/images/tile-sushi.webp" },
  { title: "Сеты", slug: "sets", image: "/images/tile-sets.webp" },
  { title: "Сашими", slug: "sashimi", image: "/images/tile-sashimi.webp" },
];

export const popularProducts: Product[] = ["philadelphia", "nigiri-salmon", "set-tokyo", "california"]
  .map((id) => findProduct(id))
  .filter((p): p is Product => Boolean(p));

const dragon = menu.find((p) => p.id === "dragon")!;
export const rollOfTheDay: Product = {
  ...dragon,
  id: "roll-of-day",
  title: "Ролл дня · Дракон",
  options: [{ ...dragon.options[0], price: 2690, oldPrice: dragon.options[0].price }],
  tags: ["promo"],
};

export const reasons = [
  {
    icon: "fish",
    title: "Собственное\nпроизводство",
    text: "Готовим сами на собственной чистой кухне",
  },
  {
    icon: "delivery",
    title: `Быстрая доставка\nпо ${site.city}`,
    text: `Доставка за 30–60 минут по ${site.city}`,
  },
  {
    icon: "payment",
    title: "Удобная оплата",
    text: "Оплата любым удобным способом",
  },
  {
    icon: "smile",
    title: "Программа\nлояльности",
    text: "Копите баллы и получайте скидки",
  },
] as const;

export const aboutParagraphs = [
  `Мы — небольшая семейная доставка суши и роллов в ${site.city}, которая готовит с душой и вниманием к деталям.`,
  "Работаем на собственной кухне, используем только свежие продукты и строго соблюдаем все стандарты качества. Готовим быстро, доставляем аккуратно и всегда стараемся радовать вкусом.",
  "На нашем сайте удобно выбирать блюда: подробное меню, полный состав каждого ролла, новинки и готовые сеты на любое количество человек — от ужина вдвоём до заказа на большую компанию. Заказывать онлайн выгодно — все актуальные акции и скидки всегда под рукой.",
  "А главное — суши и роллы создают особое настроение. Они превращают обычный вечер в уютный, а встречу с близкими — в тёплый маленький праздник. Именно поэтому мы делаем всё, чтобы вкусная еда приезжала вовремя и приносила только положительные эмоции.",
  "Просто вкусные суши от тех, кто в этом действительно разбирается",
];

export const steps = ["Выбираете блюда", "Оформляете заказ", "Мы готовим", "Курьер привозит"];

export const reviews = [
  {
    name: "Ольга",
    role: "Постоянный клиент",
    avatar: "/images/avatar-olga.webp",
    text: `Лучшие роллы в ${site.city}! Заказываем уже третий месяц, ни разу не разочаровались. Калифорния — просто объедение!`,
  },
  {
    name: "Михаил",
    role: "Заказывает 2-3 раза в неделю",
    avatar: "/images/avatar-mikhail.webp",
    text: "Очень вкусно и быстро привозят. Курьер всегда вежливый. Отдельное спасибо за васаби — настоящий, японский!",
  },
  {
    name: "Валентина",
    role: "Новый клиент",
    avatar: "/images/avatar-valentina.webp",
    text: `Вкусные наборы по акции. Получили 30% скидку на день рождения — приятный бонус! Рекомендую ${site.name}.`,
  },
  {
    name: "Василий",
    role: "Новый клиент",
    avatar: "/images/avatar-vasiliy.webp",
    text: "Вы превзошли мои ожидания! Не могу не отметить ваше внимание к деталям и стремление к постоянному совершенствованию, что отличает вас от других.",
  },
];

export const formatPrice = (value: number) =>
  `${value.toLocaleString("ru-RU").replace(/\s/g, "\u00a0")}\u00a0${site.currency}`;
