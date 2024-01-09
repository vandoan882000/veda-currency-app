import type { Setting, Settings } from '~/type';


export const toPMSettings = (settings: Settings) => {
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
      addToHeader: settings.mobile.location.includes('header'),
      autoDetectCurrency: settings.mobile.autoDetectCurrency,
      backgroundColor: settings.mobile.backgroundColor,
      bottom: settings.mobile.bottom,
      left: settings.mobile.left,
      right: settings.mobile.right,
      top: settings.mobile.top,
      color: settings.mobile.color,
      css: settings.mobile.css,
      currencies: settings.desktop.currencies,
      allCurrency: settings.mobile.allCurrency,
      headerSelector: settings.mobile.headerSelector,
      placement: settings.mobile.location.includes('other') ? settings.mobile.placement : undefined,
      payment: settings.mobile.payment,
      size: settings.mobile.size,
      roundSettingsEnabled: settings.mobile.roundSettingsEnabled,
      roundSettings: settings.mobile.roundSettings,
      variant: settings.mobile.variant,
      notification: settings.mobile.notification,
    },
  };
};

export const toPMSettingDesktop = (settings: Setting) => {
  return {
    addToHeader: settings.location.includes('header'),
    autoDetectCurrency: settings.autoDetectCurrency,
    backgroundColor: settings.backgroundColor,
    bottom: settings.bottom,
    left: settings.left,
    right: settings.right,
    top: settings.top,
    color: settings.color,
    css: settings.css,
    currencies: settings.currencies,
    allCurrency: settings.allCurrency,
    headerSelector: settings.headerSelector,
    placement: settings.location.includes('other') ? settings.placement : undefined,
    payment: settings.payment,
    size: settings.size,
    roundSettingsEnabled: settings.roundSettingsEnabled,
    roundSettings: settings.roundSettings,
    variant: settings.variant,
    notification: settings.notification,
  }
};
