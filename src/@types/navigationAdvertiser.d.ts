export type NavigationProps = {
  id?: string;
  action?: "update";
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      AdvertiserDashboard: undefined;
      RegisterAdvertisement: NavigationProps;
      HomeCategory: undefined;
      Category: NavigationProps;
      HomeProduct: undefined;
      Product: NavigationProps;
      HomeAdvertiseProducts: undefined;
      HomeAnnouncedProducts: undefined;
    }
  }
}