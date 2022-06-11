export type CategoryNavigationProps = {
  id?: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      AdvertiserDashboard: undefined;
      RegisterAdvertisement: undefined;
      HomeCategory: undefined;
      Category: CategoryNavigationProps;
    }
  }
}