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
  // Mobile Legends Products - 25 products
  {
    id: 'ml001',
    category: 'ml',
    name: 'Mobile Legends: 5 Diamonds',
    description: 'Top up 5 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 1500,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml002',
    category: 'ml',
    name: 'Mobile Legends: 12 Diamonds',
    description: 'Top up 12 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 3500,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml003',
    category: 'ml',
    name: 'Mobile Legends: 28 Diamonds',
    description: 'Top up 28 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 8000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml004',
    category: 'ml',
    name: 'Mobile Legends: 36 Diamonds',
    description: 'Top up 36 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 10000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml005',
    category: 'ml',
    name: 'Mobile Legends: 59 Diamonds',
    description: 'Top up 59 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 15000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml006',
    category: 'ml',
    name: 'Mobile Legends: 86 Diamonds',
    description: 'Top up 86 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 20000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml007',
    category: 'ml',
    name: 'Mobile Legends: 114 Diamonds',
    description: 'Top up 114 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 27000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml008',
    category: 'ml',
    name: 'Mobile Legends: 172 Diamonds',
    description: 'Top up 172 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 39000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml009',
    category: 'ml',
    name: 'Mobile Legends: 257 Diamonds',
    description: 'Top up 257 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 59000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml010',
    category: 'ml',
    name: 'Mobile Legends: 344 Diamonds',
    description: 'Top up 344 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 78000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml011',
    category: 'ml',
    name: 'Mobile Legends: 429 Diamonds',
    description: 'Top up 429 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 98000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml012',
    category: 'ml',
    name: 'Mobile Legends: 514 Diamonds',
    description: 'Top up 514 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 117000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml013',
    category: 'ml',
    name: 'Mobile Legends: 600 Diamonds',
    description: 'Top up 600 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 136000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml014',
    category: 'ml',
    name: 'Mobile Legends: 706 Diamonds',
    description: 'Top up 706 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 156000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml015',
    category: 'ml',
    name: 'Mobile Legends: 792 Diamonds',
    description: 'Top up 792 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 175000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml016',
    category: 'ml',
    name: 'Mobile Legends: 878 Diamonds',
    description: 'Top up 878 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 195000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml017',
    category: 'ml',
    name: 'Mobile Legends: 963 Diamonds',
    description: 'Top up 963 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 214000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml018',
    category: 'ml',
    name: 'Mobile Legends: 1050 Diamonds',
    description: 'Top up 1050 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 234000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml019',
    category: 'ml',
    name: 'Mobile Legends: 1220 Diamonds',
    description: 'Top up 1220 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 273000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml020',
    category: 'ml',
    name: 'Mobile Legends: 1412 Diamonds',
    description: 'Top up 1412 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 312000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml021',
    category: 'ml',
    name: 'Mobile Legends: 1669 Diamonds',
    description: 'Top up 1669 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 370000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml022',
    category: 'ml',
    name: 'Mobile Legends: 2195 Diamonds',
    description: 'Top up 2195 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 468000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml023',
    category: 'ml',
    name: 'Mobile Legends: 2901 Diamonds',
    description: 'Top up 2901 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 624000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml024',
    category: 'ml',
    name: 'Mobile Legends: 3688 Diamonds',
    description: 'Top up 3688 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 780000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  {
    id: 'ml025',
    category: 'ml',
    name: 'Mobile Legends: 5532 Diamonds',
    description: 'Top up 5532 Diamonds untuk Mobile Legends: Bang Bang.',
    price: 1170000,
    image: 'https://i.pinimg.com/736x/c9/13/7e/c9137e7a2879f90e22df9fc5cd3bf85f.jpg'
  },
  
  // Free Fire Products - 22 products
  {
    id: 'ff001',
    category: 'ff',
    name: 'Free Fire: 5 Diamonds',
    description: 'Top up 5 Diamonds untuk game Free Fire.',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff002',
    category: 'ff',
    name: 'Free Fire: 10 Diamonds',
    description: 'Top up 10 Diamonds untuk game Free Fire.',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff003',
    category: 'ff',
    name: 'Free Fire: 20 Diamonds',
    description: 'Top up 20 Diamonds untuk game Free Fire.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff004',
    category: 'ff',
    name: 'Free Fire: 50 Diamonds',
    description: 'Top up 50 Diamonds untuk game Free Fire.',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff005',
    category: 'ff',
    name: 'Free Fire: 70 Diamonds',
    description: 'Top up 70 Diamonds untuk game Free Fire.',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff006',
    category: 'ff',
    name: 'Free Fire: 100 Diamonds',
    description: 'Top up 100 Diamonds untuk game Free Fire.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff007',
    category: 'ff',
    name: 'Free Fire: 140 Diamonds',
    description: 'Top up 140 Diamonds untuk game Free Fire.',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff008',
    category: 'ff',
    name: 'Free Fire: 210 Diamonds',
    description: 'Top up 210 Diamonds untuk game Free Fire.',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff009',
    category: 'ff',
    name: 'Free Fire: 280 Diamonds',
    description: 'Top up 280 Diamonds untuk game Free Fire.',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff010',
    category: 'ff',
    name: 'Free Fire: 355 Diamonds',
    description: 'Top up 355 Diamonds untuk game Free Fire.',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff011',
    category: 'ff',
    name: 'Free Fire: 425 Diamonds',
    description: 'Top up 425 Diamonds untuk game Free Fire.',
    price: 60000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff012',
    category: 'ff',
    name: 'Free Fire: 530 Diamonds',
    description: 'Top up 530 Diamonds untuk game Free Fire.',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff013',
    category: 'ff',
    name: 'Free Fire: 640 Diamonds',
    description: 'Top up 640 Diamonds untuk game Free Fire.',
    price: 90000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff014',
    category: 'ff',
    name: 'Free Fire: 720 Diamonds',
    description: 'Top up 720 Diamonds untuk game Free Fire.',
    price: 100000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff015',
    category: 'ff',
    name: 'Free Fire: 860 Diamonds',
    description: 'Top up 860 Diamonds untuk game Free Fire.',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff016',
    category: 'ff',
    name: 'Free Fire: 1060 Diamonds',
    description: 'Top up 1060 Diamonds untuk game Free Fire.',
    price: 145000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff017',
    category: 'ff',
    name: 'Free Fire: 1285 Diamonds',
    description: 'Top up 1285 Diamonds untuk game Free Fire.',
    price: 175000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff018',
    category: 'ff',
    name: 'Free Fire: 1585 Diamonds',
    description: 'Top up 1585 Diamonds untuk game Free Fire.',
    price: 215000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff019',
    category: 'ff',
    name: 'Free Fire: 2180 Diamonds',
    description: 'Top up 2180 Diamonds untuk game Free Fire.',
    price: 290000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff020',
    category: 'ff',
    name: 'Free Fire: 3640 Diamonds',
    description: 'Top up 3640 Diamonds untuk game Free Fire.',
    price: 485000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff021',
    category: 'ff',
    name: 'Free Fire: 5000 Diamonds',
    description: 'Top up 5000 Diamonds untuk game Free Fire.',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ff022',
    category: 'ff',
    name: 'Free Fire: 7290 Diamonds',
    description: 'Top up 7290 Diamonds untuk game Free Fire.',
    price: 940000,
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  
  // Instagram Followers - 10 products
  {
    id: 'igf001',
    category: 'instagram',
    name: 'Instagram: 100 Followers',
    description: 'Tambah 100 Followers untuk akun Instagram Anda.',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igf002',
    category: 'instagram',
    name: 'Instagram: 250 Followers',
    description: 'Tambah 250 Followers untuk akun Instagram Anda.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igf003',
    category: 'instagram',
    name: 'Instagram: 500 Followers',
    description: 'Tambah 500 Followers untuk akun Instagram Anda.',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igf004',
    category: 'instagram',
    name: 'Instagram: 1000 Followers',
    description: 'Tambah 1000 Followers untuk akun Instagram Anda.',
    price: 80000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igf005',
    category: 'instagram',
    name: 'Instagram: 2000 Followers',
    description: 'Tambah 2000 Followers untuk akun Instagram Anda.',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igf006',
    category: 'instagram',
    name: 'Instagram: 3000 Followers',
    description: 'Tambah 3000 Followers untuk akun Instagram Anda.',
    price: 220000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igf007',
    category: 'instagram',
    name: 'Instagram: 5000 Followers',
    description: 'Tambah 5000 Followers untuk akun Instagram Anda.',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igf008',
    category: 'instagram',
    name: 'Instagram: 7500 Followers',
    description: 'Tambah 7500 Followers untuk akun Instagram Anda.',
    price: 500000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igf009',
    category: 'instagram',
    name: 'Instagram: 10000 Followers',
    description: 'Tambah 10000 Followers untuk akun Instagram Anda.',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igf010',
    category: 'instagram',
    name: 'Instagram: 15000 Followers',
    description: 'Tambah 15000 Followers untuk akun Instagram Anda.',
    price: 950000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },

  // Instagram Likes - 10 products
  {
    id: 'igl001',
    category: 'instagram',
    name: 'Instagram: 100 Likes',
    description: 'Tambah 100 Likes untuk foto/video Instagram Anda.',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igl002',
    category: 'instagram',
    name: 'Instagram: 300 Likes',
    description: 'Tambah 300 Likes untuk foto/video Instagram Anda.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igl003',
    category: 'instagram',
    name: 'Instagram: 500 Likes',
    description: 'Tambah 500 Likes untuk foto/video Instagram Anda.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igl004',
    category: 'instagram',
    name: 'Instagram: 750 Likes',
    description: 'Tambah 750 Likes untuk foto/video Instagram Anda.',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igl005',
    category: 'instagram',
    name: 'Instagram: 1000 Likes',
    description: 'Tambah 1000 Likes untuk foto/video Instagram Anda.',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igl006',
    category: 'instagram',
    name: 'Instagram: 1500 Likes',
    description: 'Tambah 1500 Likes untuk foto/video Instagram Anda.',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igl007',
    category: 'instagram',
    name: 'Instagram: 2500 Likes',
    description: 'Tambah 2500 Likes untuk foto/video Instagram Anda.',
    price: 100000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igl008',
    category: 'instagram',
    name: 'Instagram: 5000 Likes',
    description: 'Tambah 5000 Likes untuk foto/video Instagram Anda.',
    price: 185000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igl009',
    category: 'instagram',
    name: 'Instagram: 7500 Likes',
    description: 'Tambah 7500 Likes untuk foto/video Instagram Anda.',
    price: 260000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'igl010',
    category: 'instagram',
    name: 'Instagram: 10000 Likes',
    description: 'Tambah 10000 Likes untuk foto/video Instagram Anda.',
    price: 330000,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  
  // TikTok Followers - 10 products
  {
    id: 'ttf001',
    category: 'tiktok',
    name: 'TikTok: 100 Followers',
    description: 'Tambah 100 Followers untuk akun TikTok Anda.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttf002',
    category: 'tiktok',
    name: 'TikTok: 300 Followers',
    description: 'Tambah 300 Followers untuk akun TikTok Anda.',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttf003',
    category: 'tiktok',
    name: 'TikTok: 500 Followers',
    description: 'Tambah 500 Followers untuk akun TikTok Anda.',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttf004',
    category: 'tiktok',
    name: 'TikTok: 1000 Followers',
    description: 'Tambah 1000 Followers untuk akun TikTok Anda.',
    price: 90000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttf005',
    category: 'tiktok',
    name: 'TikTok: 2000 Followers',
    description: 'Tambah 2000 Followers untuk akun TikTok Anda.',
    price: 170000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttf006',
    category: 'tiktok',
    name: 'TikTok: 3000 Followers',
    description: 'Tambah 3000 Followers untuk akun TikTok Anda.',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttf007',
    category: 'tiktok',
    name: 'TikTok: 5000 Followers',
    description: 'Tambah 5000 Followers untuk akun TikTok Anda.',
    price: 400000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttf008',
    category: 'tiktok',
    name: 'TikTok: 7000 Followers',
    description: 'Tambah 7000 Followers untuk akun TikTok Anda.',
    price: 550000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttf009',
    category: 'tiktok',
    name: 'TikTok: 10000 Followers',
    description: 'Tambah 10000 Followers untuk akun TikTok Anda.',
    price: 750000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttf010',
    category: 'tiktok',
    name: 'TikTok: 15000 Followers',
    description: 'Tambah 15000 Followers untuk akun TikTok Anda.',
    price: 1100000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  
  // TikTok Likes - 10 products
  {
    id: 'ttl001',
    category: 'tiktok',
    name: 'TikTok: 100 Likes',
    description: 'Tambah 100 Likes untuk video TikTok Anda.',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttl002',
    category: 'tiktok',
    name: 'TikTok: 300 Likes',
    description: 'Tambah 300 Likes untuk video TikTok Anda.',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttl003',
    category: 'tiktok',
    name: 'TikTok: 500 Likes',
    description: 'Tambah 500 Likes untuk video TikTok Anda.',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttl004',
    category: 'tiktok',
    name: 'TikTok: 750 Likes',
    description: 'Tambah 750 Likes untuk video TikTok Anda.',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttl005',
    category: 'tiktok',
    name: 'TikTok: 1000 Likes',
    description: 'Tambah 1000 Likes untuk video TikTok Anda.',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttl006',
    category: 'tiktok',
    name: 'TikTok: 1500 Likes',
    description: 'Tambah 1500 Likes untuk video TikTok Anda.',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttl007',
    category: 'tiktok',
    name: 'TikTok: 2500 Likes',
    description: 'Tambah 2500 Likes untuk video TikTok Anda.',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttl008',
    category: 'tiktok',
    name: 'TikTok: 5000 Likes',
    description: 'Tambah 5000 Likes untuk video TikTok Anda.',
    price: 220000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttl009',
    category: 'tiktok',
    name: 'TikTok: 7500 Likes',
    description: 'Tambah 7500 Likes untuk video TikTok Anda.',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
  {
    id: 'ttl010',
    category: 'tiktok',
    name: 'TikTok: 10000 Likes',
    description: 'Tambah 10000 Likes untuk video TikTok Anda.',
    price: 420000,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80'
  },
];

// Payment method data
export const paymentMethods = [
  {
    id: 'dana',
    name: 'DANA',
    accountNumber: '082211944285',
    accountName: 'Muhamad Ali batubara',
    iconClass: 'text-blue-500 fas fa-wallet'
  },
  {
    id: 'gopay',
    name: 'Gopay',
    accountNumber: '082211944285',
    accountName: 'LiboyyStore',
    iconClass: 'text-green-500 fas fa-wallet'
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay',
    accountNumber: '082211944285',
    accountName: 'liboyy_store',
    iconClass: 'text-red-500 fas fa-wallet'
  }
];
