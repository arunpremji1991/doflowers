import type { Category, Collection, Occasion, ProductGroup } from "@/lib/types";

export const groupMeta: Record<
  ProductGroup,
  { slug: string; name: { en: string; ar: string }; description: { en: string; ar: string } }
> = {
  flowers: {
    slug: "flowers",
    name: { en: "Flowers", ar: "الورد" },
    description: {
      en: "Hand-tied bouquets and arrangements, sourced for form, colour and freshness.",
      ar: "باقات وتنسيقات ورد مُنسَّقة يدويًا، مُختارة بعناية لشكلها ولونها ونضارتها.",
    },
  },
  chocolates: {
    slug: "chocolates",
    name: { en: "Chocolates", ar: "الشوكولاتة" },
    description: {
      en: "Small-batch chocolate, crafted slowly and finished by hand.",
      ar: "شوكولاتة مصنوعة بكميات محدودة، بعناية فائقة وتشطيب يدوي.",
    },
  },
  combo: {
    slug: "flowers-chocolates",
    name: { en: "Flowers & Chocolates", ar: "ورد وشوكولاتة" },
    description: {
      en: "Our most-requested pairing — two gifts, one gesture.",
      ar: "أكثر تنسيقاتنا طلبًا — هديتان في لفتة واحدة.",
    },
  },
  gifts: {
    slug: "gifts",
    name: { en: "Gifts", ar: "الهدايا" },
    description: {
      en: "Considered gift sets for every relationship and occasion.",
      ar: "مجموعات هدايا مدروسة تناسب كل علاقة ومناسبة.",
    },
  },
};

export const categories: Category[] = [
  // Flowers
  { id: "cat-bouquets", slug: "bouquets", group: "flowers", name: { en: "Bouquets", ar: "باقات الورد" }, description: { en: "Hand-tied, ready to gift.", ar: "مُنسّقة يدويًا وجاهزة للإهداء." }, image: "cat-bouquets" },
  { id: "cat-flower-boxes", slug: "flower-boxes", group: "flowers", name: { en: "Flower Boxes", ar: "بوكسات الورد" }, description: { en: "Arranged in signature keepsake boxes.", ar: "مُنسّقة في علب دو المميزة." }, image: "cat-flower-boxes" },
  { id: "cat-arrangements", slug: "arrangements", group: "flowers", name: { en: "Flower Arrangements", ar: "تنسيقات الورد" }, description: { en: "Statement arrangements for the home or office.", ar: "تنسيقات لافتة للمنزل أو المكتب." }, image: "cat-arrangements" },
  { id: "cat-roses", slug: "roses", group: "flowers", name: { en: "Roses", ar: "الورد الجوري" }, description: { en: "Classic roses, dozens and beyond.", ar: "الورد الجوري الكلاسيكي بمختلف الكميات." }, image: "cat-roses" },
  { id: "cat-premium-flowers", slug: "premium-flowers", group: "flowers", name: { en: "Premium Flowers", ar: "ورد فاخر" }, description: { en: "Rare and imported blooms.", ar: "أزهار نادرة ومستوردة." }, image: "cat-premium-flowers" },
  { id: "cat-preserved-flowers", slug: "preserved-flowers", group: "flowers", name: { en: "Preserved Flowers", ar: "ورد محفوظ" }, description: { en: "Real flowers, preserved to last for years.", ar: "ورد طبيعي محفوظ ليدوم لسنوات." }, image: "cat-preserved-flowers" },
  // Chocolates
  { id: "cat-chocolate-boxes", slug: "chocolate-boxes", group: "chocolates", name: { en: "Chocolate Boxes", ar: "علب الشوكولاتة" }, description: { en: "Curated boxes in various sizes.", ar: "علب مُنتقاة بأحجام مختلفة." }, image: "cat-chocolate-boxes" },
  { id: "cat-signature-chocolates", slug: "signature-chocolates", group: "chocolates", name: { en: "Signature Chocolates", ar: "شوكولاتة دو المُوقّعة" }, description: { en: "The DO house recipe.", ar: "وصفة دو الخاصة." }, image: "cat-signature-chocolates" },
  { id: "cat-premium-chocolates", slug: "premium-chocolates", group: "chocolates", name: { en: "Premium Chocolates", ar: "شوكولاتة فاخرة" }, description: { en: "Single-origin and couverture selections.", ar: "مختارات من كاكاو أحادي المصدر." }, image: "cat-premium-chocolates" },
  { id: "cat-seasonal-chocolates", slug: "seasonal-chocolates", group: "chocolates", name: { en: "Seasonal Chocolates", ar: "شوكولاتة موسمية" }, description: { en: "Limited seasonal flavours.", ar: "نكهات موسمية محدودة." }, image: "cat-seasonal-chocolates" },
  // Combo
  { id: "cat-signature-combinations", slug: "signature-combinations", group: "combo", name: { en: "Signature Combinations", ar: "تنسيقات دو المُوقّعة" }, description: { en: "Flowers and chocolate, paired by our stylists.", ar: "ورد وشوكولاتة، ينسقها فريقنا بعناية." }, image: "cat-signature-combinations" },
  { id: "cat-premium-gift-sets", slug: "premium-gift-sets", group: "combo", name: { en: "Premium Gift Sets", ar: "مجموعات هدايا فاخرة" }, description: { en: "Our most generous pairings.", ar: "أكثر تنسيقاتنا سخاءً." }, image: "cat-premium-gift-sets" },
  // Gifts
  { id: "cat-luxury-gifts", slug: "luxury-gifts", group: "gifts", name: { en: "Luxury Gifts", ar: "هدايا فاخرة" }, description: { en: "For the moments that call for more.", ar: "للحظات التي تستحق الأفضل." }, image: "cat-luxury-gifts" },
  { id: "cat-gift-sets", slug: "gift-sets", group: "gifts", name: { en: "Gift Sets", ar: "مجموعات الهدايا" }, description: { en: "Thoughtfully bundled gifting.", ar: "هدايا مُجهّزة بعناية." }, image: "cat-gift-sets" },
  { id: "cat-personalised-gifts", slug: "personalised-gifts", group: "gifts", name: { en: "Personalised Gifts", ar: "هدايا مُخصّصة" }, description: { en: "Made a little more personal.", ar: "هدايا بلمسة شخصية." }, image: "cat-personalised-gifts" },
  { id: "cat-corporate-gifts", slug: "corporate-gifts", group: "gifts", name: { en: "Corporate Gifts", ar: "هدايا الشركات" }, description: { en: "For clients, teams and partners.", ar: "للعملاء والفرق والشركاء." }, image: "cat-corporate-gifts" },
];

export const occasions: Occasion[] = [
  { id: "occ-birthday", slug: "birthday", name: { en: "Birthday", ar: "عيد ميلاد" }, description: { en: "Mark another year, beautifully.", ar: "احتفلي بعام جديد بأسلوب راقٍ." }, image: "occ-birthday" },
  { id: "occ-anniversary", slug: "anniversary", name: { en: "Anniversary", ar: "ذكرى سنوية" }, description: { en: "For the years worth celebrating.", ar: "للسنوات التي تستحق الاحتفال." }, image: "occ-anniversary" },
  { id: "occ-love", slug: "love", name: { en: "Love & Romance", ar: "الحب والرومانسية" }, description: { en: "Say it with something beautiful.", ar: "عبّري بشيء جميل." }, image: "occ-love" },
  { id: "occ-congratulations", slug: "congratulations", name: { en: "Congratulations", ar: "تهنئة" }, description: { en: "Celebrate their win.", ar: "احتفلي بإنجازهم." }, image: "occ-congratulations" },
  { id: "occ-thank-you", slug: "thank-you", name: { en: "Thank You", ar: "شكرًا" }, description: { en: "A gesture that says it well.", ar: "لفتة تُعبّر عن امتنانك." }, image: "occ-thank-you" },
  { id: "occ-new-baby", slug: "new-baby", name: { en: "New Baby", ar: "مولود جديد" }, description: { en: "Welcome the newest arrival.", ar: "رحّبي بالقادم الجديد." }, image: "occ-new-baby" },
  { id: "occ-wedding", slug: "wedding", name: { en: "Wedding", ar: "زفاف" }, description: { en: "For the beginning of something new.", ar: "لبداية جديدة." }, image: "occ-wedding" },
  { id: "occ-engagement", slug: "engagement", name: { en: "Engagement", ar: "خطوبة" }, description: { en: "Celebrate the promise.", ar: "احتفلي بالوعد." }, image: "occ-engagement" },
  { id: "occ-graduation", slug: "graduation", name: { en: "Graduation", ar: "تخرّج" }, description: { en: "Celebrate the milestone.", ar: "احتفلي بهذا الإنجاز." }, image: "occ-graduation" },
  { id: "occ-get-well", slug: "get-well-soon", name: { en: "Get Well Soon", ar: "سلامتك" }, description: { en: "Brighten a difficult day.", ar: "أضيئي يومًا صعبًا." }, image: "occ-get-well" },
  { id: "occ-new-home", slug: "new-home", name: { en: "New Home", ar: "منزل جديد" }, description: { en: "Warm their new beginning.", ar: "أضفي الدفء على بدايتهم الجديدة." }, image: "occ-new-home" },
  { id: "occ-corporate", slug: "corporate", name: { en: "Corporate", ar: "مؤسسي" }, description: { en: "For clients, teams and partners.", ar: "للعملاء والفرق والشركاء." }, image: "occ-corporate" },
  { id: "occ-just-because", slug: "just-because", name: { en: "Just Because", ar: "بلا مناسبة" }, description: { en: "No reason needed.", ar: "بدون سبب، فقط لأنك تستحق." }, image: "occ-just-because" },
];

export const collections: Collection[] = [
  { id: "col-new", slug: "new", name: { en: "New Arrivals", ar: "وصل حديثًا" }, description: { en: "Freshly added to the collection.", ar: "أُضيفت مؤخرًا إلى المجموعة." }, image: "col-new" },
  { id: "col-best-sellers", slug: "best-sellers", name: { en: "Best Sellers", ar: "الأكثر مبيعًا" }, description: { en: "Our most-loved pieces.", ar: "أكثر تنسيقاتنا رواجًا." }, image: "col-best-sellers" },
  { id: "col-signature", slug: "signature", name: { en: "The Signature Collection", ar: "المجموعة المُوقّعة" }, description: { en: "DO's most coveted creations, in one place.", ar: "أكثر إبداعات دو رغبةً، في مكان واحد." }, image: "col-signature" },
  { id: "col-seasonal", slug: "seasonal", name: { en: "Seasonal Collection", ar: "مجموعة الموسم" }, description: { en: "Limited-time, made for the season.", ar: "مجموعة محدودة، صُنعت لهذا الموسم." }, image: "col-seasonal" },
];

export const addOns = [
  { id: "addon-card", name: { en: "Greeting Card", ar: "بطاقة تهنئة" }, price: 1.5, image: "addon-card" },
  { id: "addon-extra-choco", name: { en: "Extra Chocolate Box", ar: "علبة شوكولاتة إضافية" }, price: 6, image: "addon-extra-choco" },
  { id: "addon-wrap", name: { en: "Luxury Gift Wrap", ar: "تغليف فاخر" }, price: 3, image: "addon-wrap" },
  { id: "addon-balloon", name: { en: "Balloon", ar: "بالون" }, price: 2.5, image: "addon-balloon" },
  { id: "addon-teddy", name: { en: "Small Teddy Bear", ar: "دبدوب صغير" }, price: 5, image: "addon-teddy" },
];
