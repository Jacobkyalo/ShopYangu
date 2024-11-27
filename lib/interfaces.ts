export interface Shop {
  id?: number;
  name: string;
  description: string;
  logo: string;
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  image: string;
  price: number;
  stockLevel: number;
  shop?: string;
}
