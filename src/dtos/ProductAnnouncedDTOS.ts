import { AdvertiserDTOS } from "./AdvertiserDTOS";
import { ProductDTOS } from "./ProductDTOS";

export interface ProductAnnouncedInterface {
    _id?: string | object;
    advertiser?: AdvertiserDTOS;
    product: ProductDTOS;
    adValue: string;
}
