export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      ResponseScreen: {
        nextScreenRoute: string;
        title: string;
        message: string;
        type: "sucess" | "error";
      };
    }
  }
}