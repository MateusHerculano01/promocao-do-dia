export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Splash: undefined;
      LoginEmail: undefined;
      LoginPassword: {
        email: string;
      };
      SignUp: undefined;
      ResetPassword: {
        email: string;
      };
    }
  }
}