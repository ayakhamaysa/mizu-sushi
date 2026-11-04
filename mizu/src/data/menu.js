// ======================================================
// The only file you edit for a new restaurant
// Every text has an Arabic and an English version
// ======================================================

export const restaurant = {
  name: "MIZU",
  kanji: "水", // "water" in Japanese
  phone: "+971 50 000 0000", // shown big at the bottom (change it)
  whatsapp: "971500000000", // the same number for WhatsApp links (change it)
  instagram: "https://www.instagram.com/oneclick.ps",
  ar: { tagline: "سوشي ومطبخ آسيوي", city: "دبي", currency: "د.إ", address: "دبي، جميرا، شارع جميرا بيتش", hours: "كل يوم 12:00 - 24:00" },
  en: { tagline: "Sushi & Asian Kitchen", city: "Dubai", currency: "AED", address: "Jumeirah Beach Road, Jumeirah, Dubai", hours: "Daily 12:00 - 24:00" },
};

// Texts of the page in both languages
export const ui = {
  ar: {
    switchTo: "English",
    services: ["سوشي", "رامن", "بولز", "حلويات"],
    featured: "اختيار الشيف",
    order: "للحجز والطلبات",
    askChef: "اسأل الشيف",
    madeBy: "تصميم وتطوير",
  },
  en: {
    switchTo: "عربي",
    services: ["Sushi", "Ramen", "Bowls", "Dessert"],
    featured: "Chef's Selection",
    order: "Book & Order",
    askChef: "Ask the Chef",
    madeBy: "Designed & built by",
  },
};

// Tags shown on each dish. The AI assistant reads them too.
export const tags = {
  raw: { icon: "🐟", ar: "سمك نيء", en: "Raw fish" },
  cooked: { icon: "🔥", ar: "مطبوخ", en: "Cooked" },
  spicy: { icon: "🌶️", ar: "حار", en: "Spicy" },
  veg: { icon: "🌿", ar: "نباتي", en: "Vegetarian" },
};

// Every section: id, image (photo at the start of the section), title / titleAr, note / noteAr (optional)
// Every dish: name (Arabic), nameEn, price, description / descriptionEn (optional), tags
// image (optional): put the photo in public/menu and write "/menu/photo-name.jpg"
// chefPick: true shows the dish in "Chef's selection" at the top
export const categories = [
  {
    id: "rolls",
    image: "/menu/section-rolls.webp",
    title: "Rolls",
    titleAr: "رولز",
    note: "8 pieces",
    noteAr: "8 قطع",
    items: [
      { name: "دراغون", nameEn: "Dragon Roll", image: "/menu/dragon.webp", price: 48, chefPick: true, tags: ["cooked"], description: "روبيان تمبورا من جوا، أنقليس وأفوكادو من برا", descriptionEn: "Shrimp tempura inside, eel and avocado on top" },
      { name: "سبايسي تونا", nameEn: "Spicy Tuna", image: "/menu/spicy-tuna.webp", price: 40, tags: ["raw", "spicy"], description: "تونا مع مايونيز حار وبصل أخضر", descriptionEn: "Tuna with spicy mayo and spring onion" },
      { name: "فيلادلفيا", nameEn: "Philadelphia", image: "/menu/philadelphia.webp", price: 42, tags: ["raw"], description: "سالمون، جبنة كريمية وأفوكادو", descriptionEn: "Salmon, cream cheese and avocado" },
      { name: "كاليفورنيا", nameEn: "California", image: "/menu/california.webp", price: 34, tags: ["cooked"], description: "كابوريا، أفوكادو، خيار وسمسم", descriptionEn: "Crab stick, avocado, cucumber and sesame" },
      { name: "كرنشي سالمون", nameEn: "Crunchy Salmon", image: "/menu/crunchy-salmon.webp", price: 44, tags: ["cooked", "spicy"], description: "سالمون مطبوخ، تمبورا مقرمشة وصوص سبايسي مايو", descriptionEn: "Cooked salmon, crispy tempura and spicy mayo" },
      { name: "رول خضار", nameEn: "Veggie Roll", image: "/menu/veggie-roll.webp", price: 28, tags: ["veg"], description: "أفوكادو، خيار، جزر ومانجا", descriptionEn: "Avocado, cucumber, carrot and mango" },
    ],
  },
  {
    id: "nigiri",
    image: "/menu/section-nigiri.webp",
    title: "Nigiri",
    titleAr: "نيغيري",
    note: "2 pieces: rice topped with a slice",
    noteAr: "قطعتين: رز سوشي وفوقه شريحة",
    items: [
      { name: "سالمون", nameEn: "Salmon", price: 24, tags: ["raw"] },
      { name: "تونا", nameEn: "Tuna", price: 28, tags: ["raw"] },
      { name: "روبيان", nameEn: "Ebi (Shrimp)", price: 22, tags: ["cooked"], description: "روبيان مسلوق", descriptionEn: "Boiled shrimp" },
      { name: "أنقليس", nameEn: "Unagi (Eel)", price: 30, tags: ["cooked"], description: "أنقليس مشوي مع صوص حلو", descriptionEn: "Grilled eel with sweet sauce" },
    ],
  },
  {
    id: "sashimi",
    image: "/menu/section-sashimi.webp",
    title: "Sashimi",
    titleAr: "ساشيمي",
    note: "5 slices of raw fish, no rice",
    noteAr: "5 شرايح سمك نيء بدون رز",
    items: [
      { name: "ساشيمي سالمون", nameEn: "Salmon Sashimi", price: 38, tags: ["raw"] },
      { name: "ساشيمي تونا", nameEn: "Tuna Sashimi", price: 44, tags: ["raw"] },
      { name: "ساشيمي مشكّل", nameEn: "Mixed Sashimi", price: 52, tags: ["raw"], description: "سالمون، تونا وسمك أبيض", descriptionEn: "Salmon, tuna and white fish" },
    ],
  },
  {
    id: "starters",
    image: "/menu/section-starters.webp",
    title: "Starters",
    titleAr: "مقبلات",
    items: [
      { name: "إيدامامي", nameEn: "Edamame", price: 18, tags: ["veg", "cooked"], description: "فول الصويا الأخضر مع ملح البحر", descriptionEn: "Green soybeans with sea salt" },
      { name: "شوربة ميسو", nameEn: "Miso Soup", price: 15, tags: ["cooked"], description: "مرق داشي، ميسو، توفو وأعشاب بحرية", descriptionEn: "Dashi broth, miso, tofu and seaweed" },
      { name: "غيوزا دجاج", nameEn: "Chicken Gyoza", price: 28, tags: ["cooked"], description: "5 قطع زلابية يابانية", descriptionEn: "5 Japanese dumplings" },
      { name: "روبيان تمبورا", nameEn: "Shrimp Tempura", price: 38, tags: ["cooked"], description: "روبيان بعجينة خفيفة مقرمشة", descriptionEn: "Shrimp in a light, crispy batter" },
    ],
  },
  {
    id: "bowls",
    image: "/menu/section-bowls.webp",
    title: "Ramen & Bowls",
    titleAr: "رامن وبولز",
    items: [
      { name: "رامن ميسو حار", nameEn: "Spicy Miso Ramen", image: "/menu/spicy-ramen.webp", price: 48, chefPick: true, tags: ["cooked", "spicy"], description: "مرق ميسو حار، دجاج، نودلز وفطر", descriptionEn: "Spicy miso broth, chicken, noodles and mushrooms" },
      { name: "بوكي سالمون", nameEn: "Salmon Poke", image: "/menu/salmon-poke.webp", price: 52, chefPick: true, tags: ["raw"], description: "رز سوشي، سالمون، أفوكادو، إيدامامي ومانجا", descriptionEn: "Sushi rice, salmon, avocado, edamame and mango" },
      { name: "رامن دجاج", nameEn: "Chicken Ramen", image: "/menu/chicken-ramen.webp", price: 45, tags: ["cooked"], description: "مرق دجاج، نودلز، بيضة متبلة وذرة", descriptionEn: "Chicken broth, noodles, marinated egg and corn" },
      { name: "تيرياكي دجاج", nameEn: "Chicken Teriyaki", image: "/menu/teriyaki.webp", price: 46, tags: ["cooked"], description: "دجاج مشوي بصوص التيرياكي على رز", descriptionEn: "Grilled teriyaki chicken on rice" },
      { name: "ياكيسوبا خضار", nameEn: "Veggie Yakisoba", image: "/menu/yakisoba.webp", price: 38, tags: ["veg", "cooked"], description: "نودلز مقلية مع خضار", descriptionEn: "Stir-fried noodles with vegetables" },
    ],
  },
  {
    id: "boxes",
    image: "/menu/section-boxes.webp",
    title: "Sushi Boxes",
    titleAr: "بوكسات",
    items: [
      { name: "بوكس لشخصين", nameEn: "Box for Two", image: "/menu/box-for-two.webp", price: 120, chefPick: true, tags: ["raw", "cooked"], description: "24 قطعة مشكّلة نيغيري ورولز وساشيمي", descriptionEn: "24 mixed pieces of nigiri, rolls and sashimi" },
      { name: "بوكس أول مرة", nameEn: "First Timer Box", price: 65, tags: ["cooked"], description: "16 قطعة كلها مطبوخة", descriptionEn: "16 pieces, all cooked" },
    ],
  },
  {
    id: "desserts",
    image: "/menu/section-desserts.webp",
    title: "Desserts",
    titleAr: "حلويات",
    items: [
      { name: "موتشي", nameEn: "Mochi", price: 22, tags: ["veg"], description: "3 قطع: ماتشا، مانجا وفراولة", descriptionEn: "3 pieces: matcha, mango and strawberry" },
      { name: "تشيزكيك ماتشا", nameEn: "Matcha Cheesecake", price: 26, tags: ["veg"] },
    ],
  },
  {
    id: "drinks",
    image: "/menu/section-drinks.webp",
    title: "Drinks",
    titleAr: "مشروبات",
    items: [
      { name: "ماتشا لاتيه", nameEn: "Matcha Latte", price: 18, tags: ["veg"] },
      { name: "ليمونادة يوزو", nameEn: "Yuzu Lemonade", price: 16, tags: ["veg"] },
      { name: "شاي أخضر", nameEn: "Green Tea", price: 10, tags: ["veg"] },
      { name: "كولا", nameEn: "Cola", price: 6, tags: ["veg"] },
      { name: "مياه غازية", nameEn: "Sparkling Water", price: 8, tags: ["veg"] },
      { name: "مياه", nameEn: "Water", price: 5, tags: ["veg"] },
    ],
  },
];

// Helper: find a section by its id
export const section = (id) => categories.find((c) => c.id === id);
