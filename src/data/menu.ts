// Моковое меню для каталога. В рабочей версии эти данные придут из API / CMS.

export type CategorySlug = "rolls" | "baked" | "sets" | "sushi" | "sashimi" | "drinks";
export type ProductTag = "hit" | "new" | "spicy" | "veg";

export type Product = {
  id: string;
  title: string;
  category: CategorySlug;
  portion: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  tags?: ProductTag[];
  /** Чем больше, тем выше в сортировке «Популярные» */
  popularity?: number;
};

export const categories: { slug: CategorySlug; title: string }[] = [
  { slug: "rolls", title: "Роллы" },
  { slug: "baked", title: "Запечённые" },
  { slug: "sets", title: "Сеты" },
  { slug: "sushi", title: "Суши" },
  { slug: "sashimi", title: "Сашими" },
  { slug: "drinks", title: "Напитки и соусы" },
];

export const tagLabels: Record<ProductTag, string> = {
  hit: "Хит",
  new: "Новинка",
  spicy: "Острое",
  veg: "Без рыбы",
};

const img = (name: string) => `/images/menu/${name}.webp`;

export const menu: Product[] = [
  // Роллы
  {
    id: "philadelphia",
    title: "Филадельфия классик",
    category: "rolls",
    portion: "8 шт · 260 г",
    description: "Лосось, сливочный сыр, огурец, рис, нори",
    price: 590,
    image: img("philadelphia"),
    tags: ["hit"],
    popularity: 100,
  },
  {
    id: "california",
    title: "Калифорния с крабом",
    category: "rolls",
    portion: "8 шт · 240 г",
    description: "Снежный краб, авокадо, огурец, икра тобико",
    price: 520,
    image: img("california"),
    tags: ["hit"],
    popularity: 92,
  },
  {
    id: "dragon",
    title: "Дракон",
    category: "rolls",
    portion: "8 шт · 280 г",
    description: "Угорь, сливочный сыр, огурец, авокадо, соус унаги, кунжут",
    price: 690,
    image: img("dragon"),
    tags: ["new"],
    popularity: 80,
  },
  {
    id: "philadelphia-light",
    title: "Филадельфия лайт",
    category: "rolls",
    portion: "8 шт · 230 г",
    description: "Лосось, сливочный сыр, кунжут — облегчённая версия классики",
    price: 490,
    image: img("philadelphia-light"),
    popularity: 70,
  },
  {
    id: "ikura-roll",
    title: "Ролл с икрой лосося",
    category: "rolls",
    portion: "8 шт · 250 г",
    description: "Лосось, огурец, сливочный сыр, красная икра сверху",
    price: 790,
    image: img("ikura-roll"),
    tags: ["new"],
    popularity: 64,
  },
  {
    id: "midori",
    title: "Мидори",
    category: "rolls",
    portion: "8 шт · 220 г",
    description: "Огурец, авокадо, сливочный сыр, такуан, кунжут",
    price: 390,
    image: img("midori"),
    tags: ["veg"],
    popularity: 40,
  },
  {
    id: "hosomaki-mix",
    title: "Хосомаки ассорти",
    category: "rolls",
    portion: "18 шт · 270 г",
    description: "Маки с лососем, тунцом и огурцом",
    price: 560,
    image: img("hosomaki-mix"),
    popularity: 48,
  },

  // Запечённые
  {
    id: "baked-salmon",
    title: "Запечённый с лососем",
    category: "baked",
    portion: "8 шт · 290 г",
    description: "Лосось, сливочный сыр, огурец, сырная шапочка, соус спайси",
    price: 620,
    oldPrice: 690,
    image: img("baked-salmon"),
    tags: ["spicy", "hit"],
    popularity: 88,
  },
  {
    id: "tempura-ebi",
    title: "Темпура с креветкой",
    category: "baked",
    portion: "8 шт · 300 г",
    description: "Тигровая креветка, сливочный сыр, огурец, хрустящий кляр",
    price: 640,
    image: img("tempura-ebi"),
    popularity: 60,
  },

  // Сеты
  {
    id: "set-tokyo",
    title: "Сет «Токио»",
    category: "sets",
    portion: "32 шт · 960 г",
    description: "Филадельфия, Калифорния, маки с огурцом и лососем",
    price: 1890,
    oldPrice: 2220,
    image: img("set-tokyo"),
    tags: ["hit"],
    popularity: 96,
  },
  {
    id: "set-samurai",
    title: "Сет «Самурай»",
    category: "sets",
    portion: "28 шт · 900 г",
    description: "Дракон, Филадельфия, нигири с лососем, тунцом и креветкой",
    price: 2190,
    image: img("set-samurai"),
    popularity: 76,
  },
  {
    id: "set-kyoto",
    title: "Сет «Киото»",
    category: "sets",
    portion: "24 шт · 780 г",
    description: "Филадельфия с кунжутом, нигири с лососем, запечённый ролл",
    price: 1590,
    image: img("set-kyoto"),
    tags: ["new"],
    popularity: 58,
  },
  {
    id: "set-imperial",
    title: "Сет «Императорский»",
    category: "sets",
    portion: "40 шт · 1300 г",
    description: "Большой сет на компанию: роллы с тобико, маки, нигири ассорти",
    price: 3290,
    oldPrice: 3790,
    image: img("set-imperial"),
    popularity: 66,
  },

  // Суши
  {
    id: "nigiri-salmon",
    title: "Нигири с лососем",
    category: "sushi",
    portion: "2 шт · 70 г",
    description: "Охлаждённый лосось на рисе с тонким слоем васаби",
    price: 240,
    image: img("nigiri"),
    tags: ["hit"],
    popularity: 90,
  },
  {
    id: "nigiri-tuna",
    title: "Нигири лосось и тунец",
    category: "sushi",
    portion: "2 шт · 70 г",
    description: "Пара нигири: охлаждённый лосось и тунец",
    price: 280,
    image: img("nigiri-tuna"),
    popularity: 54,
  },
  {
    id: "nigiri-ebi",
    title: "Нигири с креветкой",
    category: "sushi",
    portion: "2 шт · 60 г",
    description: "Тигровая креветка эби на рисе",
    price: 260,
    image: img("nigiri-ebi"),
    popularity: 44,
  },
  {
    id: "gunkan-ikura",
    title: "Гункан с икрой",
    category: "sushi",
    portion: "2 шт · 60 г",
    description: "Рис в нори с икрой лосося",
    price: 340,
    image: img("gunkan-ikura"),
    tags: ["new"],
    popularity: 50,
  },
  {
    id: "nigiri-mix",
    title: "Нигири ассорти",
    category: "sushi",
    portion: "6 шт · 210 г",
    description: "Лосось, тунец, креветка, гребешок, окунь, угорь",
    price: 790,
    image: img("nigiri-mix"),
    popularity: 62,
  },

  // Сашими
  {
    id: "sashimi-mix",
    title: "Сашими ассорти",
    category: "sashimi",
    portion: "9 ломтиков · 180 г",
    description: "Лосось, тунец и масляная рыба, дайкон, лимон",
    price: 890,
    image: img("sashimi-mix"),
    popularity: 52,
  },
  {
    id: "sashimi-salmon",
    title: "Сашими из лосося",
    category: "sashimi",
    portion: "5 ломтиков · 100 г",
    description: "Охлаждённый лосось, васаби, имбирь",
    price: 520,
    image: img("sashimi-salmon"),
    tags: ["hit"],
    popularity: 68,
  },

  // Напитки и соусы
  {
    id: "green-tea",
    title: "Лимонад «Юдзу-лайм»",
    category: "drinks",
    portion: "500 мл",
    description: "Домашний лимонад с зелёным чаем, лаймом и мятой",
    price: 290,
    image: img("green-tea"),
    tags: ["new"],
    popularity: 46,
  },
  {
    id: "soy-sauce",
    title: "Соевый соус",
    category: "drinks",
    portion: "50 мл",
    description: "Классический японский соевый соус",
    price: 50,
    image: img("soy-sauce"),
    tags: ["veg"],
    popularity: 30,
  },
  {
    id: "ginger-wasabi",
    title: "Имбирь и васаби",
    category: "drinks",
    portion: "30 г + 15 г",
    description: "Маринованный имбирь и васаби — дополнительная порция",
    price: 70,
    image: img("ginger-wasabi"),
    tags: ["veg"],
    popularity: 34,
  },
];

export const findProduct = (id: string) => menu.find((p) => p.id === id);
