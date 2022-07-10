export interface ProductDTOS {
  _id: string;
  advertiser: string;
  name: string;
  size: string;
  brand: string;
  category: string;
  price: string;
  adValue?: string;
  description: string;
  photos_url: string[];
}