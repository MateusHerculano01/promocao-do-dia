export type NavigationProps = {
  id?: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      AdvertiserDashboard: undefined;
      RegisterAdvertisement: undefined;
      HomeCategory: undefined;
      Category: NavigationProps;
      HomeProduct: undefined;
      Product: NavigationProps;
    }
  }
}