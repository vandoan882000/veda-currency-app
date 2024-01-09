import type { Plan, Setting } from "~/type";

export const defaultSetting: Setting = {
  variant: 'style1',
  placement: 'bottom_left',
  backgroundColor: '#fff',
  color: '#111',
  font: 'Roboto',
  bottom: 100,
  right: 10,
  top: 10,
  left: 10,
  currencies: ['USD', 'GBP', 'EUR'],
  allCurrency: false,
  currenciesVariant: 'select',
  location: ['header', 'other'],
  css: '/* theme supply  */ div.grid-item.large--one-half.text-center.large--text-right{display:flex;position:relative;align-items:center;right:0;margin-right:0;float:initial;width:100%} /* theme Narrative  */ div.site-header__section.site-header__section--button{display:inline-flex;align-items:center} /* theme brooklyn  */li.site-nav__item.site-nav__item--compressed{display:inline-flex;align-items:center}ul#AccessibleNav.site-nav.site-nav--init{display:inline-flex;align-items:center}  .site-header__section.site-header__section--button{display:inline-flex;align-content:center}.site-header__section.site-header__section--button .currency-slot{align-items:center;display:flex} .header-wrapper .header__icons {display: inline-flex;align-items: center;} .header-section div.grid-item.large--one-half.text-center.large--text-right {display: flex;position: relative;align-items: center;margin-right: 0;float: initial;width: 100%;}.header-section div.grid-item.large--one-half.text-center.large--text-right > .site-header--text-links {position: absolute;z-index: 10;top: -20px;}body#mypeonyl .header-section div.grid-item.large--one-half.text-center.large--text-right {padding-top: 100px;}',
  autoDetectCurrency: true,
  size: 'md',
  headerSelector: '',
  roundSettingsEnabled: false,
  roundSettings: [],
  payment: false,
  notification: {
    enable: false,
    backgroundColor: '#ffffff',
    color: '#222222',
    message:
      'All payments will be made in USD. Currently, the prices in the cart are displayed in {myshopkit.currentCurrency}, and they will be automatically converted to USD based on the current exchange rate when you proceed to checkout.',
  },
};

export const defaultPlan: Plan = {
  id: 1,
  name: "Free",
  handle: "free",
  regularPrice: 0,
  features: [
    {
      key: "number_of_currencies",
      value: "3",
      label: "Number of Currencies"
    },
    {
      key: "checkout_notification",
      value: "disable",
      label: "Checkout Notification"
    },
    {
      key: "auto_detect",
      value: "disable",
      label: "Auto Detect"
    }
  ]
}
