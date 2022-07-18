import { AdvertiserDTOS } from "./AdvertiserDTOS";

export interface ProductDTOS {
  _id: string;
  advertiser: AdvertiserDTOS;
  name: string;
  size: string;
  brand: string;
  category: string;
  price: string;
  announced: boolean;
  adValue?: string;
  description: string;
  photos_url: string[];
}