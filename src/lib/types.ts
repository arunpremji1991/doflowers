export type Localized = { en: string; ar: string };

export type ProductGroup = "flowers" | "chocolates" | "combo" | "gifts";

export type Badge = "bestSeller" | "new" | "limited" | "seasonal";

export type ProductOption = {
  id: string;
  label: Localized;
  priceDelta: number;
};

export type ProductOptionGroup = {
  id: string;
  label: Localized;
  options: ProductOption[];
};

export type AddOn = {
  id: string;
  name: Localized;
  price: number;
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  group: ProductGroup;
  categoryIds: string[];
  occasionIds: string[];
  collectionIds: string[];
  name: Localized;
  subtitle: Localized;
  description: Localized;
  price: number;
  compareAtPrice?: number;
  images: string[];
  badges: Badge[];
  inStock: boolean;
  sameDayDelivery: boolean;
  createdAt: string;
  salesRank: number;
  optionGroups?: ProductOptionGroup[];
  addOnIds?: string[];
  details?: { label: Localized; value: Localized }[];
  ingredients?: Localized;
  allergens?: Localized;
  weight?: Localized;
  stems?: number;
  pieces?: number;
  storage?: Localized;
  freshness?: Localized;
  whatsIncluded?: Localized[];
};

export type Category = {
  id: string;
  slug: string;
  group: ProductGroup;
  name: Localized;
  description: Localized;
  image: string;
  parentId?: string;
};

export type Occasion = {
  id: string;
  slug: string;
  name: Localized;
  description: Localized;
  image: string;
};

export type Collection = {
  id: string;
  slug: string;
  name: Localized;
  description: Localized;
  image: string;
};
