export interface ProductDTOS {
  _id: string;
  advertiser: string;
  name: string;
  size: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  photos_url: string[];
}