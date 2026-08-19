import { products, getProductBySlug } from "./products";
import { categories, occasions, collections, addOns, groupMeta } from "./taxonomy";
import type { Product, ProductGroup } from "@/lib/types";

export { products, getProductBySlug, categories, occasions, collections, addOns, groupMeta };

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
export function getOccasionBySlug(slug: string) {
  return occasions.find((o) => o.slug === slug);
}
export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}
export function getCategoriesForGroup(group: ProductGroup) {
  return categories.filter((c) => c.group === group);
}
export function getAddOnsByIds(ids: string[] = []) {
  return addOns.filter((a) => ids.includes(a.id));
}

export function getProductsForGroup(group: ProductGroup): Product[] {
  return products.filter((p) => p.group === group);
}
export function getProductsForCategory(categorySlug: string): Product[] {
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return [];
  return products.filter((p) => p.categoryIds.includes(cat.id));
}
export function getProductsForOccasion(occasionSlug: string): Product[] {
  const occ = getOccasionBySlug(occasionSlug);
  if (!occ) return [];
  return products.filter((p) => p.occasionIds.includes(occ.id));
}
export function getProductsForCollection(collectionSlug: string): Product[] {
  if (collectionSlug === "new") return [...products].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 12);
  if (collectionSlug === "best-sellers") return [...products].sort((a, b) => a.salesRank - b.salesRank).slice(0, 12);
  const col = getCollectionBySlug(collectionSlug);
  if (!col) return [];
  return products.filter((p) => p.collectionIds.includes(col.id));
}

export type SortKey = "recommended" | "newest" | "bestselling" | "price-asc" | "price-desc";

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const arr = [...list];
  switch (sort) {
    case "newest":
      return arr.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    case "bestselling":
      return arr.sort((a, b) => a.salesRank - b.salesRank);
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    default:
      return arr;
  }
}

export type ProductFilters = {
  category?: string[];
  occasion?: string[];
  badge?: string[];
  maxPrice?: number;
};

export function filterProducts(list: Product[], filters: ProductFilters): Product[] {
  return list.filter((p) => {
    if (filters.category?.length && !p.categoryIds.some((id) => filters.category!.includes(id))) return false;
    if (filters.occasion?.length && !p.occasionIds.some((id) => filters.occasion!.includes(id))) return false;
    if (filters.badge?.length && !p.badges.some((b) => filters.badge!.includes(b))) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    return true;
  });
}

export function searchProducts(query: string, locale: "en" | "ar"): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name[locale].toLowerCase().includes(q) ||
      p.subtitle[locale].toLowerCase().includes(q) ||
      p.name.en.toLowerCase().includes(q)
  );
}
