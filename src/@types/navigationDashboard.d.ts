import { CategoryDTOS } from "@dtos/CategoryDTOS";

type NavigationProps = {
  category?: CategoryDTOS;
  advertiser_id: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      HomeScreen: undefined;
      OffersByCategory: NavigationProps;
      ProductsForCategory: NavigationProps;
      InfoProduct: {
        advertiser_id: string;
        product_id: string;
      };
    }
  }
}