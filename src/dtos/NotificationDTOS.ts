import { AdvertiserDTOS } from "./AdvertiserDTOS";

export interface NotificationDTOS {
    advertiser?: AdvertiserDTOS;
    notificationTitle?: string;
    notificationMessage?: string;
    users?: [{
        user: string;
        visualized: boolean;
    }];
}