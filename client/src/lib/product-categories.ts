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
      "https://vexagame.com/wp-content/uploads/2021/10/wp4020373-1.jpg",
    category: "games",
    subcategory: "ml",
  },
  {
    id: "ff",
    name: "Free Fire",
    icon: "fire",
    description: "Top up Diamond untuk game Free Fire",
    image:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/laptop-skin-decal/k/4/r/hd-printed-laptop-decal-sticker-freswh-fruit-point-art-15-6-original-imaggn9pzh7hygyw.jpeg?q=20&crop=false",
    category: "games",
    subcategory: "ff",
  },
  {
    id: "ig-followers",
    name: "Instagram Followers",
    icon: "users",
    description: "Tambah followers untuk akun Instagram Anda",
    image:
      "https://plus.unsplash.com/premium_photo-1683121583302-54a92800a301?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvbGxvd2VycyUyMGluc3RhZ3JhbXxlbnwwfHwwfHx8MA%3D%3D",
    category: "social-media",
    subcategory: "instagram",
  },
  {
    id: "ig-likes",
    name: "Instagram Likes",
    icon: "heart",
    description: "Tambah likes untuk postingan Instagram Anda",
    image:
      "https://media.istockphoto.com/id/1200899039/photo/one-like-social-media-notification-with-thumb-up-icon.webp?a=1&b=1&s=612x612&w=0&k=20&c=oAfH1-YEsng29b5S9OTs_WF4VRumWISXZDSS0uzhzio=",
    category: "social-media",
    subcategory: "instagram",
  },
  {
    id: "tiktok-followers",
    name: "TikTok Followers",
    icon: "users",
    description: "Tambah followers untuk akun TikTok Anda",
    image:
      "data:image/png;base64,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",
    category: "social-media",
    subcategory: "tiktok",
  },
  {
    id: "tiktok-likes",
    name: "TikTok Likes",
    icon: "heart",
    description: "Tambah likes untuk postingan TikTok Anda",
    image:
      "data:image/png;base64,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",
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkAE1OehCrdXWIKHUyxkca8J7OIa53K2AanA&s",
    options: [
      { id: "ml-1", name: "50 Diamonds", quantity: 17, price: 17000 },
      { id: "ml-2", name: "128 Diamonds", quantity: 128, price: 43000 },
      { id: "ml-3", name: "220 Diamonds", quantity: 220, price: 68000 },
      { id: "ml-4", name: "257 Diamonds", quantity: 257, price: 79000 },
      { id: "ml-5", name: "366 Diamonds", quantity: 366, price: 110000 },
      { id: "ml-6", name: "568 Diamonds", quantity: 569, price: 159000 },
      { id: "ml-7", name: "606 Diamonds", quantity: 606, price: 169000 },
      { id: "ml-8", name: "685 Diamonds", quantity: 685, price: 190000 },
      { id: "ml-9", name: "712 Diamonds", quantity: 712, price: 196000 },
      { id: "ml-10", name: "750 Diamonds", quantity: 750, price: 210000 },
      { id: "ml-11", name: "829 Diamonds", quantity: 829, price: 225000 },
      { id: "ml-12", name: "875 Diamonds", quantity: 875, price: 235000 },
      { id: "ml-13", name: "965 Diamonds", quantity: 965, price: 265000 },
      { id: "ml-14", name: "1412 Diamonds", quantity: 1412, price: 379000 },
      { id: "ml-15", name: "1506 Diamonds", quantity: 1506, price: 415000 },
      { id: "ml-16", name: "1672 Diamonds", quantity: 1672, price: 455000 },
      { id: "ml-17", name: "2010 Diamonds", quantity: 2010, price: 510000 },
      { id: "ml-18", name: "2350 Diamonds", quantity: 2350, price: 599000 },
      { id: "ml-19", name: "3453 Diamonds", quantity: 3453, price: 895000 },
      { id: "ml-20", name: "3738 Diamonds", quantity: 3738, price: 965000 },
      { id: "ml-21", name: "4830 Diamonds", quantity: 4840, price: 1125000 },
      { id: "ml-22", name: "5398 Diamonds", quantity: 5398, price: 1365000 },
      { id: "ml-23", name: "6480 Diamonds", quantity: 6480, price: 1699000 },
      { id: "ml-24", name: "7727 Diamonds", quantity: 7727, price: 1958000 },
      { id: "ml-25", name: "8850 Diamonds", quantity: 8850, price: 2239000 },
      { id: "ml-26", name: "9660 Diamonds", quantity: 9660, price: 2399000 },
      { id: "ml-27", name: "13680 Diamonds", quantity: 13680, price: 3435000 },
      { id: "ml-28", name: "21330 Diamonds", quantity: 21330, price: 5355000 },
      { id: "ml-29", name: "27864 Diamonds", quantity: 27864, price: 7100000 },
    ],
  },
  {
    id: "free-fire",
    category: "ff",
    name: "Free Fire",
    description: "Top up Diamond untuk Free Fire dengan harga terbaik",
    image:
      "data:image/jpeg;base64,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",
    options: [
      { id: "ff-1", name: "50 Diamonds", quantity: 50, price: 7500 },
      { id: "ff-2", name: "70 Diamonds", quantity: 70, price: 9500 },
      { id: "ff-3", name: "100 Diamonds", quantity: 100, price: 15000 },
      { id: "ff-4", name: "150 Diamonds", quantity: 150, price: 27000 },
      { id: "ff-5", name: "210 Diamonds", quantity: 210, price: 30000 },
      { id: "ff-6", name: "280 Diamonds", quantity: 280, price: 39000 },
      { id: "ff-7", name: "355 Diamonds", quantity: 355, price: 48000 },
      { id: "ff-8", name: "420 Diamonds", quantity: 420, price: 60000 },
      { id: "ff-9", name: "565 Diamonds", quantity: 565, price: 77000 },
      { id: "ff-10", name: "635 Diamonds", quantity: 635, price: 88000 },
      { id: "ff-11", name: "720 Diamonds", quantity: 720, price: 96000 },
      { id: "ff-12", name: "860 Diamonds", quantity: 860, price: 115000 },
      { id: "ff-13", name: "930 Diamonds", quantity: 930, price: 124000 },
      { id: "ff-14", name: "1000 Diamonds", quantity: 1000, price: 133000 },
      { id: "ff-15", name: "1075 Diamonds", quantity: 1075, price: 138000 },
      { id: "ff-16", name: "1450 Diamonds", quantity: 1450, price: 188000 },
      { id: "ff-17", name: "Weekly Membership", quantity: 160, price: 27500 },
      { id: "ff-18", name: "Mounthly Membership", quantity: 400, price: 84500 },
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
      { id: "igf-1", name: "100 Followers", quantity: 100, price: 8000 },
      { id: "igf-2", name: "200 Followers", quantity: 200, price: 17000 },
      { id: "igf-3", name: "300 Followers", quantity: 300, price: 25000 },
      { id: "igf-4", name: "400 Followers", quantity: 400, price: 38000 },
      { id: "igf-5", name: "500 Followers", quantity: 500, price: 48000 },
      { id: "igf-6", name: "1000 Followers", quantity: 1000, price: 78000 },
      { id: "igf-7", name: "2000 Followers", quantity: 2000, price: 148000 },
      { id: "igf-8", name: "3000 Followers", quantity: 3000, price: 220000 },
      { id: "igf-9", name: "4000 Followers", quantity: 4000, price: 300000 },
      {
        id: "igf-10",
        name: "5000 Followers",
        quantity: 5000,
        price: 370000,
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
      { id: "igl-2", name: "200 Likes", quantity: 200, price: 8000 },
      { id: "igl-3", name: "300 Likes", quantity: 300, price: 10000 },
      { id: "igl-4", name: "400 Likes", quantity: 400, price: 13000 },
      { id: "igl-5", name: "500 Likes", quantity: 500, price: 15000 },
      { id: "igl-6", name: "1000 Likes", quantity: 1000, price: 20000 },
      { id: "igl-7", name: "2000 Likes", quantity: 2000, price: 25000 },
      { id: "igl-8", name: "3000 Likes", quantity: 3000, price: 35000 },
      { id: "igl-9", name: "4000 Likes", quantity: 4000, price: 45000 },
      { id: "igl-10", name: "5000 Likes", quantity: 5000, price: 65000 },
    ],
  },
  {
    id: "tiktok-followers",
    category: "tiktok",
    name: "TikTok Followers",
    description: "Tambah followers TikTok dengan harga terbaik",
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPsAAADJCAMAAADSHrQyAAABNVBMVEUAAAD///8l9O7+LFXW/Psfz8om9/H/LFX+prahHDb+GkvWJUcm+fMdBQl2FSf8///+kqP+N13/2eBs9/L+IU9bEB4Tgn74K1MeyMP/9ffrKU//+vsdwbz+FUrDIkEj5uAKQkH+AEL+wMsh2tUDExOTGTFvEyXJI0O5ID7+sL1gESCrHjnmKE0NVlQi3tgPY2AbtK/+cIj+hJj+epAXmJQZo58IODcvCBD/5ek+7egkBgwTAwbt/v4Sd3T/4+hUDhzW5+cFIiGk+vf/yNEGLCpcgoJbAA0+CxXooa3wUG73YXrznKzt5Obpa4HvusP1RWbheIm9mZ+8z86Z4N1d4t7Y4uKA4+CA+fTe+Pen4uCyh4+AAB81GB7D+/nl193K7ey45eSy+/ivaneNyMZv0c6Mb3TwhZYi+F3NAAAMPUlEQVR4nO2d/VsaOxbHGUYnCFTepiIggviKgqKClVb0Cr3XqrdLd+0t7d51u93t7v//J+y88JKZSTIJzJCZwe9vt891nvMhyclJcnISCvHWshQmK97gbaJrsmff4G2ia7Jll5Z5m+ia7Nm3eZvoml7YSezH73nb6JZs2cOlOm8b3dKEPYPTr7+91nR4x9tYhzVhXxISaH2Qs5rEA97GOiyYHaNeFGhaRPZEFIia9nkb67Ao2IV7WWeP8TbWYdGwf4jq7HnexjosGva0CBaWvfCgd/r8G97WOisaduFR6/Qge8jbWmdFxf57Ue/0u7ytdVZU7MJHvdMf8bbWWdGx9wAI4CRHxy5o3g6I73ib66go2Xt6bBcsZ0fJPpzmghXRU7ILaW2aqwWq09OyC+dKwwOwx9teJ0XNfpkCQev01OzCX4qqp+dtr5OiZ9d6faBCOwb23/sKfCxA3o6BXUhnlSEfIG/Hwi58UNY0AYprmdiFRxmAVd4mOyY2duFTUazxNtkxMbInPsniCm+bnRIjuwqffc3baIfEyi4kHotBcXfM7IIQAQHp9VOwJ9Lyb7zNdkRTsCsR3sdA7FZPxS4U/rrD23AHNB27IPytzNvy2TUtu/DcKvO2fVZNzS48Hbd83vGnZxeew1Lrgrf9s2gGdgU+Xlqv3/JGmFqzsAvf21I8ftw44Q0xpWZiFxKfw2EpHg6vr52U/Tf4Z2MXEk/a3yvNX1pebzQ7J/Wyf8bAjOyC8DWjf0FS+DWt8Uai1szswtVTOwxJWiR2Qfjji7Sw7ErHH4SlRWVX6H8uLruib5nFZRcSV9+U+X4x2TX+73//0y+55k6zC0JSTTmPHRyt7Hr9N3CDHehZWaLXT3DcYNczj8ELu4f1wv7C/sL+wv7CvujsucLiskdOF5h9K1VZWPYoAGe5RWUXQVSMLCq7AiLf9xaVXRRl+TztF/bb8klnrdlqbChqtJrNtU4Z9b9RsytNX3ygoefLvnPRaSxvl8JxozZQJ2b07Grbi6f29BzZy2uNkgIqSeZCFvH1WdljeVFp+6pNrMOLvd4staU4unyHNDP7SmgfAFnuJ9MkfD7sa+txDLdT7KFV9cJQVD6NXHqJ/aSl9HQsuFPsodBRVnV70Wi/mkYHPHNnr2+EieDOsYcOaxqZEu/cn1URC505s9c3yE3uKLvS8WvDSU8uFvvn1cp1gRv7hX2b6+z/uLt78/bV7OyhV7v50b8p3V9O9e/Pk9Xepapc7myO7M2SDXl70H1+Xlr6+s9aPl+LxfY3NyGjpmIPhd6uZMezPlCdv9IFinIq1e/fp8C82OvbBNceznSfr8YQ6ZFVYmzS+FOyK9qNiSIQYYFhDaA5sTfx3b09WLoyQDjMHnq3ty8S5DJ7eRlL3rWiOM0eUrt+TDS3/nzYOyVMdx98TyAgXGBXGv/mqJadP3sTOdKlcPcrGsIVdlWH6tC3tL+b7OvI/t5+QjW5u+yqbo5iw5gHuO7n328g0btXGAK32RW9eb26sg/3f5fYy9so9AGB3H32oe6Un+Do4OBgc9Ode3TlYwR62+ZkZU7sLusChd7FDvQgsd9ao1ip/YsNeTDYdxBu7otdoweEHTG5PduTB4K9ZUFvf6dBDwB7x4pOnNkCxF4PmwPZAe35uO/ZLTHNZwovFwx2y2Af0JL7nv3ERC7RzG0BYT82DfbPLLkw/mY39/gMpYcPAHvZ1ONpJ7cgsJsDOrqQJhDsHVOzf2ND9zW78WkI6QsFbi5dqUYi1Wrv2t/sJ8Ye37Zz8deV8756YhKNyrIMwH2y6l9204sgNoO9cp4qypN9Q6Cem40YfMduXMNIT6Rmz1VVcBErv7EbNyyIPb7SJ4H7j/3C2OyEzYrcaVEmgfuP3RDSST8JjZ6yI/cb++22wdNhTp0UVUV7dJ+xGyY4qYtFT26hRrr53/zF3oDZj7FxfBLj5PK1g9W91zc3rw/3VvbzWX+xG06bsRFdtWhBV/4hu7JqLKh7A/2399mNexa40V5BtHp2/5BYSdj77E2oy2MD+UuEh9+3eynA++yGePYPjJEPJnQg1uwLKHue/Rb2dBlcjy+ah/oBRWVFz7PXYfZ/oU3M9U2DPUtVLt3z7HBQ18bszEIp/jr6DdWnPc++Dg13nKdLgWnQvc8OB7SYdXs1OhW659nLUGSD2ZstnBqcPP2LX15nhyMbTJe/hMMawPAqhNfZ1yBXh1m4Vw0THMNLKH5ix6TVGLp89i39t73ODk1xbbR9BcPkzpLT53V2aAH7GW3fNTzDMZWH9zr7ZJtSwpzF9ODtCaZ0Rq+zT+wrYWb3ijxls/uIvY1ZusORDdurR15nn4Q29sE8yLJVTvMPewZzJAEtZBgfwvANO3bLBmJnfOjL6+wT+3Cb09B4p13EWL7tTfbJEhaXbjDx86xvNm/bsie9Mb9LmD0baH5nfJ/+omTPLvNkH8d1Eu7QfRLXMT7oWC+F7djPubJP4nnsOVx/SnZomYRjP+XKPjZQwl6OGDcOo30te/bJMokHe8eefbxBzWgftCOEYc/xZR/v2+DZc6MBz2YfnNGAYYeWiDzYL0ZptHh2YXTjns2+lj07tETksk87DkDw7L3oFL7uPZybjGGvTh0yOqPRBI+d4xT1ZXZ2Q+4WZg6ZTO982MfHsIQUo6G3Y4pt4GbH5WRDJ5xcnoYtj9qdkEI73KGvMcS08Mk2LhU/B21+U2/6O6mdkZ9/wrMLaT3pgn4t896QzIFZJqW3xuisyySHNBzw5PxhfdFBv0lryOHBubrJSgaIfOrJj3on8T5YQRua1HsXa2GDSN/UxTKcHFR95JCIV4PSWcXQ/Cv7z6m6NV60w2Q0wJvfvJ4AH3pk3F7lCF7Nm6abicqmOiGYLl+BNkEZl0mOadTpydf7E1VA+VD3remOIW4TFM7hOXIbEqNRp8dtXozUk2Uad2wpHvAD/bkcfMTJ6+X3neG+ld1FkUS6L9s3fN18sxR34woKaIFI6Uic17DTl2zYFe/0ULSb5jqWQlCYZjdkNOTnwonU0Er70g5CJEX80MWGpSYQLm0tHQX8h3toHInYDXhVl/8mfGcNUfINN3ucw6f6HKsM1/UX6r5Q3YD9Twf9kVuF3FoICrdCuoRPtvN8IlpdesPjJiOjEpnjpuXxytt6q2SpWkvyn0m42bk++q7vL5UoBrwKr7iz5UZn8nRtea2xjK7gOsD9mjkAJ3NwWbyPpTU81XVIRVcZ9fFOpZm3l9eXjyX1JUt0wTcsunBmSNnjNsNp0uMb2/uQo5YfvmApSdbyzLCLx6Ib8lj4dvnQaGeRqpaNCj/AE4/1A//3xmxFvl1+tNmASTdC6IcdeZvwO8KbFoqXZ0hbc0faAY2Euztg1VKGiE4q+ZYz3kTgtYaDpN7+J25cmfWMp88Q14QReBXDa8vGIG3VzVTq4QpDPyC7jWvjnbpN3uCqtF6PvxqIxu+a8Qc/bH6+3L1saHZ3KhCySpvkGYraaEpcPXczmbaqzKC7dGX790ljNj7vCW4o7RiJseHHP0GC8kfrGS7aAT4b8wiVwxJrcRdWXZvuGHrAyQ+lHqJRBrbTKWe+aMdnbxopNbxz6rE3lB5MN654l24zSIGnD+6YZfJzYo17SGfQRpy5sA+1Isa71N5xdCMpMx1jQSdaWW7Qc9ymw2gjzlS+jVoR8w16jruzWDXiXRfgkyZ0wOnc2UYtUp2X6VRIRs3FAzz6BFyzRD6YZFbu1FIywhNrGJROnA3vrvuWsgmMicnz1MVP1kUNQT1rxQhOyQaU+tUp8gKiMA5rKv689V/8W2YsSpvjWBXda0GNRXvV2ckLERlRCMqTs5tRf36ke74Trx6q5FveG1s1NtoVH2eJcq7PUI3uD3Sl20dlwhOGduRbqBJYMb4nUAw6rMn9R4YXmyFyVLE7IG563MPDehMDxez/WMd97yyKLnvmvaUbUUcikMX76iVtsFO4jvQBmjzLK59qau1l1UeLUx8rNH3/MnIqFgGKHIgxDxzBsOrVgai92VzsP/YIzV9I95KpLUxnpy0E5T2t5rWDJDkq9x8+VXu5XAGe+wqF3GUvefaQkgkFXGM+CGjQenekl6bUKjEXt1L9h7NkMhKJVCPJ5PlDHxSLUbU6M5a85tHVOp3uNqE3zNTXO+WoLpkIrQ30/C6nPGnHdLhJIiRoZd4+7v/AT2s6cgxgMQAAAABJRU5ErkJggg==",
    options: [
      { id: "tkf-1", name: "100 Followers", quantity: 100, price: 15000 },
      { id: "tkf-2", name: "200 Followers", quantity: 200, price: 25000 },
      { id: "tkf-3", name: "300 Followers", quantity: 300, price: 30000 },
      { id: "tkf-4", name: "400 Followers", quantity: 400, price: 35000 },
      { id: "tkf-5", name: "500 Followers", quantity: 500, price: 40000 },
      { id: "tkf-6", name: "1000 Followers", quantity: 1000, price: 55000 },
      { id: "tkf-7", name: "2000 Followers", quantity: 2000, price: 85000 },
      { id: "tkf-8", name: "3000 Followers", quantity: 3000, price: 120000 },
      { id: "tkf-9", name: "4000 Followers", quantity: 4000, price: 150000 },
      {
        id: "tkf-10",
        name: "5000 Followers",
        quantity: 5000,
        price: 190000,
      },
    ],
  },
  {
    id: "tiktok-likes",
    category: "tiktok",
    name: "TikTok Likes",
    description: "Tambah likes untuk video TikTok Anda dengan harga terbaik",
    image:
      "data:image/png;base64,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",
    options: [
      { id: "tkl-1", name: "1000 Likes", quantity: 1000, price: 10000 },
      { id: "tkl-2", name: "1500 Likes", quantity: 1500, price: 15000 },
      { id: "tkl-3", name: "2000 Likes", quantity: 2000, price: 20000 },
      { id: "tkl-4", name: "2500 Likes", quantity: 2500, price: 25000 },
      { id: "tkl-5", name: "3000 Likes", quantity: 3000, price: 30000 },
      { id: "tkl-6", name: "3500 Likes", quantity: 3500, price: 35000 },
      { id: "tkl-7", name: "4000 Likes", quantity: 4000, price: 40000 },
      { id: "tkl-8", name: "4500 Likes", quantity: 4500, price: 45000 },
      { id: "tkl-9", name: "5000 Likes", quantity: 5000, price: 50000 },
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
  // Pastikan id tidak undefined
  if (!id) {
    console.error("getProductCategoryById called with undefined/empty ID");
    return undefined;
  }
  
  console.log("Looking for product category with ID:", id);
  
  // Coba langsung cari berdasarkan ID
  const directMatch = productCategories.find((prod) => prod.id === id);
  if (directMatch) {
    console.log("Found direct match for ID:", id);
    return directMatch;
  }
  
  // Jika tidak ada, coba dengan pemetaan ID
  let mappedId = '';
  
  if (id === 'ml') mappedId = 'mobile-legends';
  else if (id === 'ff') mappedId = 'free-fire';
  else if (id === 'ig-followers') mappedId = 'instagram-followers';
  else if (id === 'ig-likes') mappedId = 'instagram-likes';
  else if (id === 'tiktok-followers') mappedId = 'tiktok-followers';
  else if (id === 'tiktok-likes') mappedId = 'tiktok-likes';
  else {
    console.warn("No mapping found for ID:", id);
    return undefined;
  }
  
  console.log("Mapped ID", id, "to", mappedId);
  const mappedMatch = productCategories.find((prod) => prod.id === mappedId);
  
  if (!mappedMatch) {
    console.error("No product found for mapped ID:", mappedId);
  }
  
  return mappedMatch;
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
