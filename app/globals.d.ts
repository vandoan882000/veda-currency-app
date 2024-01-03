declare module "*.css";

declare global {
  type Status = 'idle' | 'loading' | 'success' | 'failure';
  type AppState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;

  type AppBridge = ReturnType<typeof useAppBridge>;

  interface Window {
    ENV: {
      SHOPIFY_THEME_APP_EXTENSION_ID: string;
    }
    __SHOPIFY_DEV_HOST: string;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    tidioChatApi?: any;
    _APP_: any;
    __CURRENCY_SETTINGS__: Setting[];
    Shopify?: {
      shop: string;
      locale: string;
      currency: { active: string; rate: string };
      theme: {
        name: string;
      };
      Checkout: {
        currency: string;
      };
    };
  }
}
