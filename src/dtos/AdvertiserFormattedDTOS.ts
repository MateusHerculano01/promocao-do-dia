export interface AdvertiserFormattedDTOS {
  size: string;
  title: string;
  announces: [{
    _id: string;
    user: string;
    photo_url: string;
    phone: number | string;
    title: string;
    link: string;
    size: string;
  }]
}