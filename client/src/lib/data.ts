// Product categories
export type ProductCategory = 'ml' | 'ff' | 'instagram' | 'tiktok';

// Product interface
export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  description: string;
  price: number;
  image: string;
}

// Products data
export const products: Product[] = [
  // Mobile Legends Products
  {
    id: 'ml001',
    category: 'ml',
    name: 'Mobile Legends: 86 Diamonds',
    description: 'Top up 86 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ml002',
    category: 'ml',
    name: 'Mobile Legends: 172 Diamonds',
    description: 'Top up 172 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 39000,
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ml003',
    category: 'ml',
    name: 'Mobile Legends: 257 Diamonds',
    description: 'Top up 257 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 59000,
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ml004',
    category: 'ml',
    name: 'Mobile Legends: 344 Diamonds',
    description: 'Top up 344 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 78000,
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ml005',
    category: 'ml',
    name: 'Mobile Legends: 514 Diamonds',
    description: 'Top up 514 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 117000,
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ml006',
    category: 'ml',
    name: 'Mobile Legends: 706 Diamonds',
    description: 'Top up 706 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 156000,
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ml007',
    category: 'ml',
    name: 'Mobile Legends: 878 Diamonds',
    description: 'Top up 878 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 195000,
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ml008',
    category: 'ml',
    name: 'Mobile Legends: 1050 Diamonds',
    description: 'Top up 1050 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 234000,
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ml009',
    category: 'ml',
    name: 'Mobile Legends: 1412 Diamonds',
    description: 'Top up 1412 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 312000,
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ml010',
    category: 'ml',
    name: 'Mobile Legends: 2195 Diamonds',
    description: 'Top up 2195 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 468000,
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ml011',
    category: 'ml',
    name: 'Mobile Legends: 3688 Diamonds',
    description: 'Top up 3688 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 780000,
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  
  // Free Fire Products
  {
    id: 'ff001',
    category: 'ff',
    name: 'Free Fire: 100 Diamonds',
    description: 'Top up 100 Diamonds untuk game Free Fire.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff002',
    category: 'ff',
    name: 'Free Fire: 210 Diamonds',
    description: 'Top up 210 Diamonds untuk game Free Fire.',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff003',
    category: 'ff',
    name: 'Free Fire: 355 Diamonds',
    description: 'Top up 355 Diamonds untuk game Free Fire.',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff004',
    category: 'ff',
    name: 'Free Fire: 530 Diamonds',
    description: 'Top up 530 Diamonds untuk game Free Fire.',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff005',
    category: 'ff',
    name: 'Free Fire: 720 Diamonds',
    description: 'Top up 720 Diamonds untuk game Free Fire.',
    price: 100000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff006',
    category: 'ff',
    name: 'Free Fire: 1060 Diamonds',
    description: 'Top up 1060 Diamonds untuk game Free Fire.',
    price: 145000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff007',
    category: 'ff',
    name: 'Free Fire: 1585 Diamonds',
    description: 'Top up 1585 Diamonds untuk game Free Fire.',
    price: 215000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff008',
    category: 'ff',
    name: 'Free Fire: 2180 Diamonds',
    description: 'Top up 2180 Diamonds untuk game Free Fire.',
    price: 290000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff009',
    category: 'ff',
    name: 'Free Fire: 3640 Diamonds',
    description: 'Top up 3640 Diamonds untuk game Free Fire.',
    price: 485000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  
  // Instagram Products
  {
    id: 'ig001',
    category: 'instagram',
    name: 'Instagram: 100 Followers',
    description: 'Tambah 100 Followers untuk akun Instagram Anda.',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ig002',
    category: 'instagram',
    name: 'Instagram: 250 Followers',
    description: 'Tambah 250 Followers untuk akun Instagram Anda.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ig003',
    category: 'instagram',
    name: 'Instagram: 500 Followers',
    description: 'Tambah 500 Followers untuk akun Instagram Anda.',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ig004',
    category: 'instagram',
    name: 'Instagram: 1000 Followers',
    description: 'Tambah 1000 Followers untuk akun Instagram Anda.',
    price: 80000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ig005',
    category: 'instagram',
    name: 'Instagram: 2000 Followers',
    description: 'Tambah 2000 Followers untuk akun Instagram Anda.',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ig006',
    category: 'instagram',
    name: 'Instagram: 5000 Followers',
    description: 'Tambah 5000 Followers untuk akun Instagram Anda.',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ig007',
    category: 'instagram',
    name: 'Instagram: 100 Likes',
    description: 'Tambah 100 Likes untuk foto/video Instagram Anda.',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ig008',
    category: 'instagram',
    name: 'Instagram: 300 Likes',
    description: 'Tambah 300 Likes untuk foto/video Instagram Anda.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ig009',
    category: 'instagram',
    name: 'Instagram: 500 Likes',
    description: 'Tambah 500 Likes untuk foto/video Instagram Anda.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ig010',
    category: 'instagram',
    name: 'Instagram: 1000 Likes',
    description: 'Tambah 1000 Likes untuk foto/video Instagram Anda.',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  
  // TikTok Products
  {
    id: 'tt001',
    category: 'tiktok',
    name: 'TikTok: 100 Followers',
    description: 'Tambah 100 Followers untuk akun TikTok Anda.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'tt002',
    category: 'tiktok',
    name: 'TikTok: 300 Followers',
    description: 'Tambah 300 Followers untuk akun TikTok Anda.',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'tt003',
    category: 'tiktok',
    name: 'TikTok: 500 Followers',
    description: 'Tambah 500 Followers untuk akun TikTok Anda.',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'tt004',
    category: 'tiktok',
    name: 'TikTok: 1000 Followers',
    description: 'Tambah 1000 Followers untuk akun TikTok Anda.',
    price: 90000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'tt005',
    category: 'tiktok',
    name: 'TikTok: 2000 Followers',
    description: 'Tambah 2000 Followers untuk akun TikTok Anda.',
    price: 170000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'tt006',
    category: 'tiktok',
    name: 'TikTok: 5000 Followers',
    description: 'Tambah 5000 Followers untuk akun TikTok Anda.',
    price: 400000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'tt007',
    category: 'tiktok',
    name: 'TikTok: 100 Likes',
    description: 'Tambah 100 Likes untuk video TikTok Anda.',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'tt008',
    category: 'tiktok',
    name: 'TikTok: 300 Likes',
    description: 'Tambah 300 Likes untuk video TikTok Anda.',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'tt009',
    category: 'tiktok',
    name: 'TikTok: 500 Likes',
    description: 'Tambah 500 Likes untuk video TikTok Anda.',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'tt010',
    category: 'tiktok',
    name: 'TikTok: 1000 Likes',
    description: 'Tambah 1000 Likes untuk video TikTok Anda.',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
];

// Payment method data
export const paymentMethods = [
  {
    id: 'dana',
    name: 'DANA',
    accountNumber: '082211944285',
    accountName: 'Muhamad Ali batubara'
  },
  {
    id: 'gopay',
    name: 'Gopay',
    accountNumber: '082211944285',
    accountName: 'LiboyyStore'
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay',
    accountNumber: '082211944285',
    accountName: 'liboyy_store'
  }
];
