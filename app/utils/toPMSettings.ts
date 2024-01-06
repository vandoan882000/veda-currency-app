import type { EmitMessage, Settings } from '~/type';


export const toPMSettings = (settings: Settings): EmitMessage['@currencySettings'] => {
  return {
    desktop: {
      addToHeader: settings.desktop.location.includes('header'),
      autoDetectCurrency: settings.desktop.autoDetectCurrency,
      backgroundColor: settings.desktop.backgroundColor,
      bottom: settings.desktop.bottom,
      left: settings.desktop.left,
      right: settings.desktop.right,
      top: settings.desktop.top,
      color: settings.desktop.color,
      css: settings.desktop.css,
      currencies: settings.desktop.currencies,
      allCurrency: settings.desktop.allCurrency,
      headerSelector: settings.desktop.headerSelector,
      placement: settings.desktop.location.includes('other') ? settings.desktop.placement : undefined,
      payment: settings.desktop.payment,
      size: settings.desktop.size,
      roundSettingsEnabled: settings.desktop.roundSettingsEnabled,
      roundSettings: settings.desktop.roundSettings,
      variant: settings.desktop.variant,
      notification: settings.desktop.notification,
    },
    mobile: {
      currencies: settings.desktop.currencies,
      placement: settings.mobile.location.includes('other') ? settings.mobile.placement : undefined,
      variant: settings.mobile.variant,
      backgroundColor: settings.mobile.backgroundColor,
      allCurrency: settings.mobile.allCurrency,
      bottom: settings.mobile.bottom,
      color: settings.mobile.color,
      left: settings.mobile.left,
      right: settings.mobile.right,
      size: settings.mobile.size,
      top: settings.mobile.top,
      addToHeader: settings.mobile.location.includes('header'),
      autoDetectCurrency: settings.mobile.autoDetectCurrency,
      css: settings.mobile.css,
      headerSelector: settings.mobile.headerSelector,
      roundSettingsEnabled: settings.mobile.roundSettingsEnabled,
      roundSettings: settings.mobile.roundSettings,
      payment: settings.mobile.payment,
      notification: settings.mobile.notification,
    },
  };
};
