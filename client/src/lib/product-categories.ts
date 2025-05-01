// Jenis kategori produk
export type ProductCategoryType = "games" | "social-media";
export type SubCategory = "ml" | "ff" | "instagram" | "tiktok";

// Interface untuk kategori
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
  category: ProductCategoryType;
  subcategory: SubCategory;
}

// Interface untuk opsi produk (seperti jumlah diamond/follower)
export interface ProductOption {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

// Interface untuk kategori produk dengan opsi-opsinya
export interface ProductCategoryDetail {
  id: string;
  category: SubCategory;
  name: string;
  description: string;
  image: string;
  options: ProductOption[];
}

// Data kategori
export const categories: Category[] = [
  {
    id: "ml",
    name: "Mobile Legends",
    icon: "gamepad",
    description: "Top up Diamond untuk game Mobile Legends: Bang Bang",
    image:
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    category: "games",
    subcategory: "ml",
  },
  {
    id: "ff",
    name: "Free Fire",
    icon: "fire",
    description: "Top up Diamond untuk game Free Fire",
    image:
      "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    category: "games",
    subcategory: "ff",
  },
  {
    id: "ig-followers",
    name: "Instagram Followers",
    icon: "users",
    description: "Tambah followers untuk akun Instagram Anda",
    image:
      "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    category: "social-media",
    subcategory: "instagram",
  },
  {
    id: "ig-likes",
    name: "Instagram Likes",
    icon: "heart",
    description: "Tambah likes untuk postingan Instagram Anda",
    image:
      "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    category: "social-media",
    subcategory: "instagram",
  },
  {
    id: "tiktok-followers",
    name: "TikTok Followers",
    icon: "users",
    description: "Tambah followers untuk akun TikTok Anda",
    image:
      "https://images.unsplash.com/photo-1596560548464-f010549e45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    category: "social-media",
    subcategory: "tiktok",
  },
  {
    id: "tiktok-likes",
    name: "TikTok Likes",
    icon: "heart",
    description: "Tambah likes untuk postingan TikTok Anda",
    image:
      "https://images.unsplash.com/photo-1596560548464-f010549e45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    category: "social-media",
    subcategory: "tiktok",
  },
];

// Data produk (ML, FF, Instagram, TikTok) dengan opsi-opsinya
export const productCategories: ProductCategoryDetail[] = [
  {
    id: "mobile-legends",
    category: "ml",
    name: "Mobile Legends: Bang Bang",
    description:
      "Top up Diamond untuk Mobile Legends: Bang Bang dengan harga terbaik",
    image:
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    options: [
      { id: "ml-1", name: "5 Diamonds", quantity: 5, price: 1500 },
      { id: "ml-2", name: "12 Diamonds", quantity: 12, price: 3500 },
      { id: "ml-3", name: "28 Diamonds", quantity: 28, price: 8000 },
      { id: "ml-4", name: "36 Diamonds", quantity: 36, price: 10000 },
      { id: "ml-5", name: "59 Diamonds", quantity: 59, price: 15000 },
      { id: "ml-6", name: "86 Diamonds", quantity: 86, price: 20000 },
      { id: "ml-7", name: "114 Diamonds", quantity: 114, price: 27000 },
      { id: "ml-8", name: "172 Diamonds", quantity: 172, price: 39000 },
      { id: "ml-9", name: "257 Diamonds", quantity: 257, price: 59000 },
      { id: "ml-10", name: "344 Diamonds", quantity: 344, price: 78000 },
      { id: "ml-11", name: "429 Diamonds", quantity: 429, price: 98000 },
      { id: "ml-12", name: "514 Diamonds", quantity: 514, price: 117000 },
      { id: "ml-13", name: "600 Diamonds", quantity: 600, price: 136000 },
      { id: "ml-14", name: "706 Diamonds", quantity: 706, price: 156000 },
      { id: "ml-15", name: "792 Diamonds", quantity: 792, price: 175000 },
      { id: "ml-16", name: "878 Diamonds", quantity: 878, price: 195000 },
      { id: "ml-17", name: "963 Diamonds", quantity: 963, price: 214000 },
      { id: "ml-18", name: "1050 Diamonds", quantity: 1050, price: 234000 },
      { id: "ml-19", name: "1220 Diamonds", quantity: 1220, price: 273000 },
      { id: "ml-20", name: "1412 Diamonds", quantity: 1412, price: 312000 },
      { id: "ml-21", name: "1669 Diamonds", quantity: 1669, price: 370000 },
      { id: "ml-22", name: "2195 Diamonds", quantity: 2195, price: 468000 },
      { id: "ml-23", name: "2901 Diamonds", quantity: 2901, price: 624000 },
      { id: "ml-24", name: "3688 Diamonds", quantity: 3688, price: 780000 },
      { id: "ml-25", name: "5532 Diamonds", quantity: 5532, price: 1170000 },
      { id: "ml-26", name: "6238 Diamonds", quantity: 6238, price: 1320000 },
      { id: "ml-27", name: "7727 Diamonds", quantity: 7727, price: 1650000 },
      { id: "ml-28", name: "9288 Diamonds", quantity: 9288, price: 1980000 },
      { id: "ml-29", name: "12976 Diamonds", quantity: 12976, price: 2750000 },
    ],
  },
  {
    id: "free-fire",
    category: "ff",
    name: "Free Fire",
    description: "Top up Diamond untuk Free Fire dengan harga terbaik",
    image:
      "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    options: [
      { id: "ff-1", name: "5 Diamonds", quantity: 5, price: 1000 },
      { id: "ff-2", name: "10 Diamonds", quantity: 10, price: 2000 },
      { id: "ff-3", name: "20 Diamonds", quantity: 20, price: 3500 },
      { id: "ff-4", name: "50 Diamonds", quantity: 50, price: 7500 },
      { id: "ff-5", name: "70 Diamonds", quantity: 70, price: 10000 },
      { id: "ff-6", name: "100 Diamonds", quantity: 100, price: 15000 },
      { id: "ff-7", name: "140 Diamonds", quantity: 140, price: 20000 },
      { id: "ff-8", name: "210 Diamonds", quantity: 210, price: 30000 },
      { id: "ff-9", name: "280 Diamonds", quantity: 280, price: 40000 },
      { id: "ff-10", name: "355 Diamonds", quantity: 355, price: 50000 },
      { id: "ff-11", name: "425 Diamonds", quantity: 425, price: 60000 },
      { id: "ff-12", name: "530 Diamonds", quantity: 530, price: 75000 },
      { id: "ff-13", name: "640 Diamonds", quantity: 640, price: 90000 },
      { id: "ff-14", name: "720 Diamonds", quantity: 720, price: 100000 },
      { id: "ff-15", name: "860 Diamonds", quantity: 860, price: 120000 },
      { id: "ff-16", name: "1060 Diamonds", quantity: 1060, price: 145000 },
      { id: "ff-17", name: "1285 Diamonds", quantity: 1285, price: 175000 },
      { id: "ff-18", name: "1585 Diamonds", quantity: 1585, price: 215000 },
    ],
  },
  {
    id: "instagram-followers",
    category: "instagram",
    name: "Instagram Followers",
    description: "Tambah followers Instagram dengan harga terbaik",
    image:
      "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    options: [
      { id: "igf-1", name: "100 Followers", quantity: 100, price: 10000 },
      { id: "igf-2", name: "250 Followers", quantity: 250, price: 25000 },
      { id: "igf-3", name: "500 Followers", quantity: 500, price: 45000 },
      { id: "igf-4", name: "1000 Followers", quantity: 1000, price: 80000 },
      { id: "igf-5", name: "2000 Followers", quantity: 2000, price: 150000 },
      { id: "igf-6", name: "3000 Followers", quantity: 3000, price: 210000 },
      { id: "igf-7", name: "5000 Followers", quantity: 5000, price: 350000 },
      { id: "igf-8", name: "10000 Followers", quantity: 10000, price: 650000 },
      { id: "igf-9", name: "15000 Followers", quantity: 15000, price: 950000 },
      {
        id: "igf-10",
        name: "25000 Followers",
        quantity: 25000,
        price: 1500000,
      },
    ],
  },
  {
    id: "instagram-likes",
    category: "instagram",
    name: "Instagram Likes",
    description:
      "Tambah likes untuk postingan Instagram Anda dengan harga terbaik",
    image:
      "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    options: [
      { id: "igl-1", name: "100 Likes", quantity: 100, price: 5000 },
      { id: "igl-2", name: "250 Likes", quantity: 250, price: 12500 },
      { id: "igl-3", name: "500 Likes", quantity: 500, price: 22500 },
      { id: "igl-4", name: "1000 Likes", quantity: 1000, price: 40000 },
      { id: "igl-5", name: "2000 Likes", quantity: 2000, price: 75000 },
      { id: "igl-6", name: "3000 Likes", quantity: 3000, price: 105000 },
      { id: "igl-7", name: "5000 Likes", quantity: 5000, price: 175000 },
      { id: "igl-8", name: "10000 Likes", quantity: 10000, price: 325000 },
      { id: "igl-9", name: "15000 Likes", quantity: 15000, price: 475000 },
      { id: "igl-10", name: "25000 Likes", quantity: 25000, price: 750000 },
    ],
  },
  {
    id: "tiktok-followers",
    category: "tiktok",
    name: "TikTok Followers",
    description: "Tambah followers TikTok dengan harga terbaik",
    image:
      "https://images.unsplash.com/photo-1596560548464-f010549e45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    options: [
      { id: "tkf-1", name: "100 Followers", quantity: 100, price: 12000 },
      { id: "tkf-2", name: "250 Followers", quantity: 250, price: 27500 },
      { id: "tkf-3", name: "500 Followers", quantity: 500, price: 50000 },
      { id: "tkf-4", name: "1000 Followers", quantity: 1000, price: 90000 },
      { id: "tkf-5", name: "2000 Followers", quantity: 2000, price: 170000 },
      { id: "tkf-6", name: "3000 Followers", quantity: 3000, price: 250000 },
      { id: "tkf-7", name: "5000 Followers", quantity: 5000, price: 400000 },
      { id: "tkf-8", name: "10000 Followers", quantity: 10000, price: 750000 },
      { id: "tkf-9", name: "15000 Followers", quantity: 15000, price: 1100000 },
      {
        id: "tkf-10",
        name: "25000 Followers",
        quantity: 25000,
        price: 1800000,
      },
    ],
  },
  {
    id: "tiktok-likes",
    category: "tiktok",
    name: "TikTok Likes",
    description: "Tambah likes untuk video TikTok Anda dengan harga terbaik",
    image:
      "https://images.unsplash.com/photo-1596560548464-f010549e45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    options: [
      { id: "tkl-1", name: "100 Likes", quantity: 100, price: 6000 },
      { id: "tkl-2", name: "250 Likes", quantity: 250, price: 14000 },
      { id: "tkl-3", name: "500 Likes", quantity: 500, price: 25000 },
      { id: "tkl-4", name: "1000 Likes", quantity: 1000, price: 45000 },
      { id: "tkl-5", name: "2000 Likes", quantity: 2000, price: 85000 },
      { id: "tkl-6", name: "3000 Likes", quantity: 3000, price: 125000 },
      { id: "tkl-7", name: "5000 Likes", quantity: 5000, price: 200000 },
      { id: "tkl-8", name: "10000 Likes", quantity: 10000, price: 375000 },
      { id: "tkl-9", name: "15000 Likes", quantity: 15000, price: 550000 },
      { id: "tkl-10", name: "25000 Likes", quantity: 25000, price: 900000 },
    ],
  },
];

// Fungsi utilitas untuk mendapatkan kategori berdasarkan ID
export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

// Fungsi utilitas untuk mendapatkan produk kategori berdasarkan ID
export function getProductCategoryById(
  id: string,
): ProductCategoryDetail | undefined {
  // Coba langsung cari berdasarkan ID
  const directMatch = productCategories.find((prod) => prod.id === id);
  if (directMatch) return directMatch;
  
  // Jika tidak ada, coba dengan pemetaan ID
  let mappedId = '';
  
  if (id === 'ml') mappedId = 'mobile-legends';
  else if (id === 'ff') mappedId = 'free-fire';
  else if (id === 'ig-followers') mappedId = 'instagram-followers';
  else if (id === 'ig-likes') mappedId = 'instagram-likes';
  else if (id === 'tiktok-followers') mappedId = 'tiktok-followers';
  else if (id === 'tiktok-likes') mappedId = 'tiktok-likes';
  else return undefined;
  
  return productCategories.find((prod) => prod.id === mappedId);
}

// Fungsi utilitas untuk mendapatkan opsi produk berdasarkan ID kategori dan ID opsi
export function getProductOption(
  categoryId: string,
  optionId: string,
): ProductOption | undefined {
  const category = getProductCategoryById(categoryId);
  if (!category) return undefined;

  return category.options.find((opt: ProductOption) => opt.id === optionId);
}
