
import { v4 } from 'uuid';
import type { Settings } from '~/type';
import { moneyFormats } from './moneyFormats';
import { defaultSetting } from '~/reducers/reducerSettings';

export const toSettings = (settings: any): Settings => {
  let location: ('header' | 'other')[] = [];

  if (settings.desktop.addToHeader) {
    location.push('header');
  }
  if (!settings.desktop.addToHeader && settings.desktop.placement) {
    location.push('other');
  }
  if (settings.desktop.addToHeader && settings.desktop.placement) {
    location = ['header', 'other'];
  }

  let locationMobile: ('header' | 'other')[] = [];

  if (settings.mobile.addToHeader) {
    locationMobile.push('header');
  }
  if (!settings.mobile.addToHeader && settings.mobile.placement) {
    locationMobile.push('other');
  }
  if (settings.mobile.addToHeader && settings.mobile.placement) {
    locationMobile = ['header', 'other'];
  }

  return {
    desktop: {
      backgroundColor: settings.desktop.backgroundColor,
      bottom: settings.desktop.bottom,
      top: settings.desktop.top,
      left: settings.desktop.left,
      right: settings.desktop.right,
      color: settings.desktop.color,
      placement: settings.desktop.placement,
      variant: settings.desktop.variant,
      currenciesVariant: settings.desktop.currencies === 'all' ? 'all' : 'select',
      currencies:
        settings.desktop.currencies === 'all'
          ? []
          : settings.desktop.currencies.filter((currency: any) => moneyFormats.hasOwnProperty(currency)),
      allCurrency: settings.desktop.allCurrency,
      location: location,
      font: 'Roboto',
      css: settings.desktop.css,
      autoDetectCurrency: settings.desktop.autoDetectCurrency,
      size: settings.desktop.size,
      headerSelector: settings.desktop.headerSelector,
      roundSettingsEnabled: settings.desktop.roundSettingsEnabled,
      roundSettings: (settings.desktop.roundSettings ?? [])?.map((item: any) => ({ ...item, id: v4() })),
      payment: settings.desktop.payment,
      notification: settings.desktop.notification ?? defaultSetting.notification,
    },
    mobile: {
      backgroundColor: settings.mobile.backgroundColor,
      bottom: settings.mobile.bottom,
      top: settings.mobile.top,
      left: settings.mobile.left,
      right: settings.mobile.right,
      color: settings.mobile.color,
      placement: settings.mobile.placement,
      variant: settings.mobile.variant,
      currenciesVariant: settings.mobile.currencies === 'all' ? 'all' : 'select',
      currencies:
        settings.mobile.currencies === 'all'
          ? []
          : settings.mobile.currencies.filter((currency: any) => moneyFormats.hasOwnProperty(currency)),
      allCurrency: settings.mobile.allCurrency,
      location: locationMobile,
      font: 'Roboto',
      css: settings.mobile.css,
      autoDetectCurrency: settings.mobile.autoDetectCurrency,
      size: settings.mobile.size,
      headerSelector: settings.mobile.headerSelector,
      roundSettingsEnabled: settings.mobile.roundSettingsEnabled,
      roundSettings: (settings.mobile.roundSettings ?? [])?.map((item: any) => ({ ...item, id: v4() })),
      payment: settings.mobile.payment,
      notification: settings.desktop.notification ?? defaultSetting.notification,
    },
  };
};
