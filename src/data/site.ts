// Все тексты и моковые данные сайта собраны здесь — меняйте в одном месте.

export const site = {
  name: "Maki Maki",
  tagline: "Доставка суши и роллов",
  city: "Москве",
  currency: "₽",
  phone: "+7 (000) 000-00-00",
  phoneHref: "tel:+70000000000",
  telegramChannel: "Maki Maki",
  telegramHref: "https://t.me/",
  vkHref: "https://vk.com/",
  okHref: "https://ok.ru/",
  year: 2026,
};

export type Product = {
  id: string;
  title: string;
  category: "rolls" | "sushi" | "sets" | "sashimi" | "drinks";
  portion: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
};

export const heroCategories = [
  {
    title: "Роллы",
    text: "Большой выбор\nна любой вкус",
    image: "/images/cat-rolls.webp",
    theme: "dark" as const,
    href: "#popular",
  },
  {
    title: "Сеты",
    text: "Вкусно и\nвыгодно",
    image: "/images/cat-sets.webp",
    theme: "light" as const,
    href: "#popular",
  },
  {
    title: "Суши",
    text: "Классика\nЯпонии",
    image: "/images/cat-sushi.webp",
    theme: "dark" as const,
    href: "#popular",
  },
  {
    title: "Напитки\nи соусы",
    text: "",
    image: "/images/cat-drinks.webp",
    theme: "accent" as const,
    href: "#popular",
  },
];

export const advantages = [
  { icon: "snowflake", title: "Свежесть", text: "Только свежие ингредиенты" },
  { icon: "award", title: "Качество", text: "Контроль качества на каждом этапе" },
  { icon: "thumbs", title: "Любимый вкус", text: "готовим так, чтобы хотелось еще" },
] as const;

export const categoryTiles = [
  { title: "Роллы", image: "/images/tile-rolls.webp" },
  { title: "Суши", image: "/images/tile-sushi.webp" },
  { title: "Сеты", image: "/images/tile-sets.webp" },
  { title: "Сашими", image: "/images/tile-sashimi.webp" },
];

export const popularProducts: Product[] = [
  {
    id: "philadelphia",
    title: "Филадельфия классик",
    category: "rolls",
    portion: "8 шт · 260 г",
    description: "Лосось, сливочный сыр, огурец, рис, нори",
    price: 590,
    image: "/images/p-philadelphia.webp",
    badge: "Хит",
  },
  {
    id: "nigiri-salmon",
    title: "Нигири с лососем",
    category: "sushi",
    portion: "2 шт · 70 г",
    description: "Охлаждённый лосось на рисе с тонким слоем васаби",
    price: 240,
    image: "/images/p-nigiri.webp",
  },
  {
    id: "set-tokyo",
    title: "Сет «Токио»",
    category: "sets",
    portion: "32 шт · 960 г",
    description: "Филадельфия, Калифорния, маки с огурцом и лососем",
    price: 1890,
    image: "/images/p-set-tokyo.webp",
    badge: "−15%",
  },
  {
    id: "california",
    title: "Калифорния с крабом",
    category: "rolls",
    portion: "8 шт · 240 г",
    description: "Снежный краб, авокадо, огурец, икра тобико",
    price: 520,
    image: "/images/p-california.webp",
  },
];

export const rollOfTheDay: Product = {
  id: "roll-of-day",
  title: "Ролл дня · Дракон",
  category: "rolls",
  portion: "8 шт · 280 г",
  description: "Угорь, сливочный сыр, огурец, соус унаги, кунжут",
  price: 450,
  image: "/images/p-dragon.webp",
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
  `${value >= 10000 ? value.toLocaleString("ru-RU").replace(/\s/g, " ") : value} ${site.currency}`;
