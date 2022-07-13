import { AdvertiserDTOS } from "./AdvertiserDTOS";

export interface NotificationDTOS {
    _id: string;
    advertiser?: AdvertiserDTOS;
    notificationTitle?: string;
    notificationMessage?: string;
    users?: [{
        user: string;
        visualized: boolean;
    }];
}