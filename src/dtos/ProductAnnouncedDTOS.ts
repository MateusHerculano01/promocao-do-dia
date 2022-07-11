import { AdvertiserDTOS } from "./AdvertiserDTOS";
import { ProductDTOS } from "./ProductDTOS";

export interface ProductAnnouncedDTOS {
    _id?: string | object;
    advertiser?: AdvertiserDTOS;
    product: ProductDTOS;
    adValue: string;
}
