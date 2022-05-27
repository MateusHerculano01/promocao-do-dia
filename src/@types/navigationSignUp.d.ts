type Data = {
  name: string;
  email: string;
  password: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      CreateAcount: undefined;
      CreatePassword: {
        name: string;
        email: string;
      };
      VerifyCode: Data;
    }
  }
}