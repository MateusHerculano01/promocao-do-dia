import { CategoryDTOS } from "@dtos/CategoryDTOS";

type NavigationProps = {
  category: CategoryDTOS;
  advertiser_id: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      HomeScreen: undefined;
      OffersByCategory: undefined;
      ProductsForCategory: NavigationProps;
      InfoProduct: undefined;
    }
  }
}