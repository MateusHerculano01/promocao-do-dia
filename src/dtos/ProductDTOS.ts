import { AdvertiserDTOS } from "./AdvertiserDTOS";
import { CategoryDTOS } from "./CategoryDTOS";

export interface ProductDTOS {
  _id: string;
  advertiser: AdvertiserDTOS;
  name: string;
  size: string;
  brand: string;
  category: CategoryDTOS;
  price: string;
  announced: boolean;
  adValue?: string;
  description: string;
  photos: string[];
  photos_url: string[];
}