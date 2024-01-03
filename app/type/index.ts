import type { useAppBridge } from '@shopify/app-bridge-react';
import type { store } from '~/store/configureStore';

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type Status = 'idle' | 'loading' | 'success' | 'failure';

export type AppBridge = ReturnType<typeof useAppBridge>;

interface Block {
  type: string;
  disabled: boolean;
  settings: Record<string, any>;
}

export type Blocks = undefined | null | Record<string, Block>;

export interface State {
  statusInitialization: Status;
  statusGetShopCurrencies: Status;
  statusGetThemeAppExtensionStatus: Status;
  isInvalidToken: boolean;
  appBridge: AppBridge | null;
  shopDomain: string | null;
  email: string | null;
  themeId: number | null;
  appExtensionActived: boolean | null;
  currencyCode: string;
  currencyFormats: {
    moneyFormat: String;
    moneyWithCurrencyFormat: string;
  };
  enabledPresentmentCurrencies: string[];
}
