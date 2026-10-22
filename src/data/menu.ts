// Моковое меню для каталога. В рабочей версии эти данные придут из API / CMS.

export type CategorySlug = "rolls" | "sets" | "sushi" | "sashimi" | "drinks";

/** Метки на карточке товара (как в шаблоне: ЗАПЕЧЕННОЕ, НОВИНКА, ОСТРОЕ, ВЕГАН, АКЦИЯ) */
export type ProductTag = "hit" | "new" | "spicy" | "veg" | "baked" | "promo";

export type ProductOption = { label: string; price: number; oldPrice?: number };

export type Product = {
  id: string;
  title: string;
  category: CategorySlug;
  /** Подраздел внутри категории, например rolls → classic */
  sub?: string;
  /** Первый вариант — по умолчанию. Цена товара = цена выбранного варианта */
  options: ProductOption[];
  description: string;
  composition: string;
  kcal: number;
  /** Белки / жиры / углеводы на 100 г */
  nutrition: [number, number, number];
  image: string;
  gallery?: string[];
  tags?: ProductTag[];
  /** Чем больше, тем выше в выдаче */
  popularity?: number;
};

export type Category = {
  slug: CategorySlug;
  title: string;
  image: string;
  subs?: { slug: string; title: string }[];
};

export const categories: Category[] = [
  {
    slug: "rolls",
    title: "Роллы",
    image: "/images/tile-rolls.webp",
    subs: [
      { slug: "classic", title: "Классические" },
      { slug: "baked", title: "Запечённые" },
      { slug: "maki", title: "Маки" },
    ],
  },
  { slug: "sets", title: "Сеты", image: "/images/tile-sets.webp" },
  {
    slug: "sushi",
    title: "Суши",
    image: "/images/tile-sushi.webp",
    subs: [
      { slug: "nigiri", title: "Нигири" },
      { slug: "gunkan", title: "Гунканы" },
    ],
  },
  { slug: "sashimi", title: "Сашими", image: "/images/tile-sashimi.webp" },
  { slug: "drinks", title: "Напитки и соусы", image: "/images/menu/green-tea.webp" },
];

export const tagLabels: Record<ProductTag, string> = {
  hit: "Хит",
  new: "Новинка",
  spicy: "Острое",
  veg: "Веган",
  baked: "Запечённое",
  promo: "Акция",
};

/** Цвета меток — как в шаблоне */
export const tagColors: Record<ProductTag | "discount", string> = {
  hit: "bg-accent",
  new: "bg-[#4cb35b]",
  spicy: "bg-[#e5211b]",
  veg: "bg-[#2a9c3c]",
  baked: "bg-[#f26a1b]",
  promo: "bg-[#8a5cf6]",
  discount: "bg-accent",
};

const img = (name: string) => `/images/menu/${name}.webp`;

export const menu: Product[] = [
  // ——— Роллы · классические
  {
    id: "philadelphia",
    title: "Филадельфия классик",
    category: "rolls",
    sub: "classic",
    options: [
      { label: "8 шт. / 260 г", price: 3490 },
      { label: "16 шт. / 520 г", price: 6690 },
    ],
    description: "Нежный охлаждённый лосось и сливочный сыр — ролл, с которого начинается знакомство с японской кухней.",
    composition: "Лосось, сливочный сыр, огурец, рис, нори",
    kcal: 214,
    nutrition: [8.4, 9.1, 24.6],
    image: img("philadelphia"),
    gallery: [img("philadelphia"), img("philadelphia-light")],
    tags: ["hit"],
    popularity: 100,
  },
  {
    id: "california",
    title: "Калифорния с крабом",
    category: "rolls",
    sub: "classic",
    options: [
      { label: "8 шт. / 240 г", price: 3190 },
      { label: "16 шт. / 480 г", price: 5990 },
    ],
    description: "Классика с мягким снежным крабом, спелым авокадо и хрустящей икрой тобико снаружи.",
    composition: "Снежный краб, авокадо, огурец, икра тобико, японский майонез, рис, нори",
    kcal: 198,
    nutrition: [6.2, 7.8, 26.1],
    image: img("california"),
    tags: ["hit"],
    popularity: 92,
  },
  {
    id: "dragon",
    title: "Дракон",
    category: "rolls",
    sub: "classic",
    options: [{ label: "8 шт. / 280 г", price: 4190 }],
    description: "Угорь сверху, сливочный сыр и огурец внутри, соус унаги и кунжут — сладковато-копчёный вкус.",
    composition: "Угорь, сливочный сыр, огурец, авокадо, соус унаги, кунжут, рис, нори",
    kcal: 236,
    nutrition: [7.9, 10.4, 27.3],
    image: img("dragon"),
    tags: ["new"],
    popularity: 80,
  },
  {
    id: "philadelphia-light",
    title: "Филадельфия лайт",
    category: "rolls",
    sub: "classic",
    options: [{ label: "8 шт. / 230 г", price: 2990, oldPrice: 3290 }],
    description: "Облегчённая версия любимой классики — больше рыбы, меньше сыра.",
    composition: "Лосось, сливочный сыр, кунжут, рис, нори",
    kcal: 182,
    nutrition: [9.2, 6.1, 23.8],
    image: img("philadelphia-light"),
    tags: ["promo"],
    popularity: 70,
  },
  {
    id: "ikura-roll",
    title: "Ролл с икрой лосося",
    category: "rolls",
    sub: "classic",
    options: [{ label: "8 шт. / 250 г", price: 4690 }],
    description: "Праздничный ролл: лосось и сливочный сыр, сверху — щедрая шапка красной икры.",
    composition: "Лосось, огурец, сливочный сыр, икра лосося, рис, нори",
    kcal: 205,
    nutrition: [10.1, 8.6, 22.4],
    image: img("ikura-roll"),
    tags: ["new"],
    popularity: 64,
  },
  {
    id: "midori",
    title: "Мидори",
    category: "rolls",
    sub: "classic",
    options: [{ label: "8 шт. / 220 г", price: 2390 }],
    description: "Свежий овощной ролл с авокадо и кунжутом для тех, кто не ест рыбу.",
    composition: "Огурец, авокадо, сливочный сыр, такуан, кунжут, рис, нори",
    kcal: 168,
    nutrition: [3.4, 6.9, 25.2],
    image: img("midori"),
    tags: ["veg"],
    popularity: 40,
  },

  // ——— Роллы · маки
  {
    id: "hosomaki-mix",
    title: "Хосомаки ассорти",
    category: "rolls",
    sub: "maki",
    options: [{ label: "18 шт. / 270 г", price: 3390 }],
    description: "Три вида тонких маки: с лососем, тунцом и огурцом — удобно делить на компанию.",
    composition: "Лосось, тунец, огурец, рис, нори",
    kcal: 152,
    nutrition: [7.1, 2.3, 27.5],
    image: img("hosomaki-mix"),
    popularity: 48,
  },

  // ——— Роллы · запечённые
  {
    id: "baked-salmon",
    title: "Запечённый с лососем",
    category: "rolls",
    sub: "baked",
    options: [
      { label: "8 шт. / 290 г", price: 3690, oldPrice: 4090 },
      { label: "16 шт. / 580 г", price: 7190, oldPrice: 8190 },
    ],
    description: "Тёплый ролл под румяной сырной шапкой с пикантным соусом спайси.",
    composition: "Лосось, сливочный сыр, огурец, сырный соус, соус спайси, рис, нори",
    kcal: 246,
    nutrition: [8.8, 12.6, 24.1],
    image: img("baked-salmon"),
    tags: ["baked", "spicy"],
    popularity: 88,
  },
  {
    id: "tempura-ebi",
    title: "Темпура с креветкой",
    category: "rolls",
    sub: "baked",
    options: [{ label: "8 шт. / 300 г", price: 3790 }],
    description: "Хрустящий ролл в кляре темпура с тигровой креветкой и сливочным сыром.",
    composition: "Тигровая креветка, сливочный сыр, огурец, кляр темпура, соус унаги, рис, нори",
    kcal: 264,
    nutrition: [7.6, 13.2, 28.4],
    image: img("tempura-ebi"),
    tags: ["baked", "new"],
    popularity: 60,
  },

  // ——— Сеты
  {
    id: "set-tokyo",
    title: "Сет «Токио»",
    category: "sets",
    options: [{ label: "32 шт. / 960 г", price: 11290, oldPrice: 13290 }],
    description: "Самый популярный сет на 2–3 человек: четыре любимых ролла в одной коробке.",
    composition: "Филадельфия, Калифорния, маки с огурцом, маки с лососем",
    kcal: 196,
    nutrition: [7.4, 7.2, 25.9],
    image: img("set-tokyo"),
    tags: ["hit"],
    popularity: 96,
  },
  {
    id: "set-samurai",
    title: "Сет «Самурай»",
    category: "sets",
    options: [{ label: "28 шт. / 900 г", price: 12990 }],
    description: "Роллы и нигири в одном наборе — для тех, кто хочет попробовать всё.",
    composition: "Дракон, Филадельфия, нигири с лососем, тунцом и креветкой",
    kcal: 204,
    nutrition: [8.1, 7.9, 25.2],
    image: img("set-samurai"),
    popularity: 76,
  },
  {
    id: "set-kyoto",
    title: "Сет «Киото»",
    category: "sets",
    options: [{ label: "24 шт. / 780 г", price: 9490 }],
    description: "Лёгкий сет на двоих: классика, нигири и один тёплый ролл.",
    composition: "Филадельфия с кунжутом, нигири с лососем, запечённый ролл",
    kcal: 211,
    nutrition: [7.8, 8.6, 25.4],
    image: img("set-kyoto"),
    tags: ["new"],
    popularity: 58,
  },
  {
    id: "set-imperial",
    title: "Сет «Императорский»",
    category: "sets",
    options: [{ label: "40 шт. / 1300 г", price: 19690, oldPrice: 22690 }],
    description: "Большой сет на компанию из 4–5 человек — роллы с тобико, маки и нигири ассорти.",
    composition: "Калифорния, Филадельфия, хосомаки ассорти, нигири ассорти",
    kcal: 199,
    nutrition: [7.6, 7.1, 26.2],
    image: img("set-imperial"),
    tags: ["promo"],
    popularity: 66,
  },

  // ——— Суши · нигири
  {
    id: "nigiri-salmon",
    title: "Нигири с лососем",
    category: "sushi",
    sub: "nigiri",
    options: [{ label: "2 шт. / 70 г", price: 1390 }],
    description: "Охлаждённый лосось на тёплом рисе с тонким слоем васаби.",
    composition: "Лосось, рис, васаби",
    kcal: 158,
    nutrition: [9.8, 4.6, 19.3],
    image: img("nigiri"),
    tags: ["hit"],
    popularity: 90,
  },
  {
    id: "nigiri-tuna",
    title: "Нигири лосось и тунец",
    category: "sushi",
    sub: "nigiri",
    options: [{ label: "2 шт. / 70 г", price: 1690 }],
    description: "Пара нигири для сравнения: нежный лосось и плотный тунец.",
    composition: "Лосось, тунец, рис, васаби",
    kcal: 149,
    nutrition: [11.2, 3.1, 19.1],
    image: img("nigiri-tuna"),
    popularity: 54,
  },
  {
    id: "nigiri-ebi",
    title: "Нигири с креветкой",
    category: "sushi",
    sub: "nigiri",
    options: [{ label: "2 шт. / 60 г", price: 1490 }],
    description: "Сладковатая тигровая креветка эби на рисе.",
    composition: "Тигровая креветка, рис, васаби",
    kcal: 131,
    nutrition: [9.4, 1.2, 20.6],
    image: img("nigiri-ebi"),
    popularity: 44,
  },
  {
    id: "nigiri-mix",
    title: "Нигири ассорти",
    category: "sushi",
    sub: "nigiri",
    options: [{ label: "6 шт. / 210 г", price: 4690 }],
    description: "Шесть разных нигири — лучший способ попробовать всю рыбу из меню.",
    composition: "Лосось, тунец, креветка, гребешок, окунь, угорь, рис",
    kcal: 152,
    nutrition: [10.3, 3.8, 19.7],
    image: img("nigiri-mix"),
    popularity: 62,
  },

  // ——— Суши · гунканы
  {
    id: "gunkan-ikura",
    title: "Гункан с икрой",
    category: "sushi",
    sub: "gunkan",
    options: [{ label: "2 шт. / 60 г", price: 1990 }],
    description: "Рис в полоске нори и сверху — крупная икра лосося.",
    composition: "Икра лосося, рис, нори",
    kcal: 164,
    nutrition: [11.6, 5.2, 18.2],
    image: img("gunkan-ikura"),
    tags: ["new"],
    popularity: 50,
  },

  // ——— Сашими
  {
    id: "sashimi-mix",
    title: "Сашими ассорти",
    category: "sashimi",
    options: [{ label: "9 ломтиков / 180 г", price: 5290 }],
    description: "Ломтики свежей рыбы без риса на подушке из дайкона.",
    composition: "Лосось, тунец, масляная рыба, дайкон, лимон",
    kcal: 142,
    nutrition: [19.4, 7.1, 0.6],
    image: img("sashimi-mix"),
    popularity: 52,
  },
  {
    id: "sashimi-salmon",
    title: "Сашими из лосося",
    category: "sashimi",
    options: [{ label: "5 ломтиков / 100 г", price: 3090 }],
    description: "Пять толстых ломтиков охлаждённого лосося.",
    composition: "Лосось, дайкон, васаби, имбирь",
    kcal: 154,
    nutrition: [20.1, 8.1, 0.3],
    image: img("sashimi-salmon"),
    tags: ["hit"],
    popularity: 68,
  },

  // ——— Напитки и соусы
  {
    id: "green-tea",
    title: "Лимонад «Юдзу-лайм»",
    category: "drinks",
    options: [
      { label: "500 мл", price: 1290 },
      { label: "1 л", price: 2190 },
    ],
    description: "Домашний лимонад на зелёном чае с лаймом и мятой.",
    composition: "Зелёный чай, лайм, мята, тростниковый сахар, вода",
    kcal: 38,
    nutrition: [0, 0, 9.4],
    image: img("green-tea"),
    tags: ["new", "veg"],
    popularity: 46,
  },
  {
    id: "soy-sauce",
    title: "Соевый соус",
    category: "drinks",
    options: [{ label: "50 мл", price: 300 }],
    description: "Классический японский соевый соус естественного брожения.",
    composition: "Вода, соевые бобы, пшеница, соль",
    kcal: 53,
    nutrition: [6.3, 0, 6.6],
    image: img("soy-sauce"),
    tags: ["veg"],
    popularity: 30,
  },
  {
    id: "ginger-wasabi",
    title: "Имбирь и васаби",
    category: "drinks",
    options: [{ label: "30 г + 15 г", price: 400 }],
    description: "Дополнительная порция маринованного имбиря и васаби.",
    composition: "Маринованный имбирь, васаби",
    kcal: 51,
    nutrition: [0.6, 0.4, 11.2],
    image: img("ginger-wasabi"),
    tags: ["veg", "spicy"],
    popularity: 34,
  },
];

export const findProduct = (id: string) => menu.find((p) => p.id === id);
export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const priceOf = (p: Product, optionIndex = 0) => p.options[optionIndex] ?? p.options[0];

/** Скидка в процентах для варианта со старой ценой */
export const discountOf = (o: ProductOption) =>
  o.oldPrice ? Math.round((1 - o.price / o.oldPrice) * 100) : 0;

export const byPopularity = (a: Product, b: Product) => (b.popularity ?? 0) - (a.popularity ?? 0);
