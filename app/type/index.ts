import type { useAppBridge } from '@shopify/app-bridge-react';
import type { store } from '~/store/configureStore';
import type { moneyFormats } from '~/utils/moneyFormats';

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

export type Variant = 'style1' | 'style2' | 'style3' | 'style4' | 'style5' | 'style6';

export type CurrencyKey = keyof typeof moneyFormats;

export type Placement =
  | 'top_left'
  | 'top_right'
  | 'bottom_left'
  | 'bottom_right'
  | 'top_left_bar'
  | 'top_right_bar'
  | 'bottom_left_bar'
  | 'bottom_right_bar';

export type Size = 'sm' | 'md' | 'lg';

export interface RoundSetting {
  from: number;
  to: number;
  value: number;
  integer: 'default' | 'down';
  currencies: CurrencyKey[];
}

export interface CheckoutNotificationSetting {
  enable: boolean;
  message: string;
  color: string;
  backgroundColor: string;
}

export interface CurrencySettings {
  variant: Variant;
  currencies: CurrencyKey[] | 'all';
  allCurrency: boolean;
  backgroundColor: string;
  color: string;
  top: number;
  right: number;
  bottom: number;
  left: number;
  size: Size;
  css: string;
  addToHeader: boolean;
  autoDetectCurrency: boolean;
  headerSelector: string;
  placement: Placement | undefined;
  roundSettingsEnabled: boolean | undefined;
  roundSettings: RoundSetting[] | undefined;
  payment: boolean;
  notification: CheckoutNotificationSetting | undefined;
}

export interface Setting {
  location: ('header' | 'other')[];
  variant: 'style1' | 'style2' | 'style3' | 'style4' | 'style5' | 'style6';
  placement:
    | undefined
    | 'top_left'
    | 'top_right'
    | 'bottom_left'
    | 'bottom_right'
    | 'top_left_bar'
    | 'top_right_bar'
    | 'bottom_left_bar'
    | 'bottom_right_bar';
  font: string;
  backgroundColor: CurrencySettings['backgroundColor'];
  color: CurrencySettings['color'];
  top: CurrencySettings['top'];
  right: CurrencySettings['right'];
  bottom: CurrencySettings['bottom'];
  left: CurrencySettings['left'];
  currencies: CurrencyKey[];
  allCurrency: boolean;
  currenciesVariant: 'all' | 'select';
  css: CurrencySettings['css'];
  autoDetectCurrency: CurrencySettings['autoDetectCurrency'];
  size: CurrencySettings['size'];
  headerSelector: CurrencySettings['headerSelector'];
  roundSettingsEnabled: CurrencySettings['roundSettingsEnabled'];
  roundSettings: Array<Exclude<CurrencySettings['roundSettings'], undefined>[number] & { id: number | string }>;
  payment: CurrencySettings['payment'];
  notification: {
    enable: boolean;
    message: string;
    color: string;
    backgroundColor: string;
  };
}

export type DeviceDisplay = 'desktop' | 'mobile';

export type Settings = Record<DeviceDisplay, Setting>;
