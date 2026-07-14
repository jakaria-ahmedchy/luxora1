export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  category: string;
  images: string[];
  brand: string;
  rating: number;
  featured: boolean;
}