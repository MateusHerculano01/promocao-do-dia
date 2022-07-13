import { AdvertiserDTOS } from "./AdvertiserDTOS";

export interface CategoryDTOS {
  _id: string;
  advertiser: AdvertiserDTOS;
  categoryName: string;
  photo_url: string;
}